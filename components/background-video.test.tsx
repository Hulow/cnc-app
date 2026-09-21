import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BackgroundVideo } from "./background-video";
import { siteConfig } from "@/lib/site-config";
import { mockMatchMedia } from "@/lib/test-utils/match-media";

// These are composition-level tests: they check that BackgroundVideo wires
// the video element, the persisted-dismissal flag, the autoplay hook, and
// the overlay together correctly. The autoplay retry/reduced-motion logic
// itself is covered in lib/hooks/use-autoplay-video.test.ts, and the
// overlay's own rendering in components/video-overlay.test.tsx.

const STORAGE_KEY = "video-overlay-dismissed";

function getVideo(container: HTMLElement) {
  return container.querySelector("video") as HTMLVideoElement;
}

function getOverlay(container: HTMLElement) {
  return container.querySelector(".video-overlay") as HTMLElement;
}

beforeEach(() => {
  window.localStorage.clear();
  vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue(undefined);
  vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("rendering", () => {
  it("renders the background video with the configured src and decorative attributes, plus the overlay", () => {
    mockMatchMedia(false);
    const { container } = render(<BackgroundVideo />);
    const video = getVideo(container);

    expect(video).toBeInTheDocument();
    expect(video.getAttribute("src")).toBe(siteConfig.video.src);
    expect(video.autoplay).toBe(true);
    expect(video.muted).toBe(true);
    expect(video.loop).toBe(true);
    expect(video.playsInline).toBe(true);
    expect(video).toHaveAttribute("aria-hidden", "true");
    expect(video.tabIndex).toBe(-1);
    expect(screen.getByRole("button", { name: "Verstanden" })).toBeInTheDocument();
  });
});

describe("overlay wiring", () => {
  it("is visible by default and hides once the video starts playing", () => {
    mockMatchMedia(false);
    const { container } = render(<BackgroundVideo />);
    const video = getVideo(container);

    expect(getOverlay(container).hidden).toBe(false);

    act(() => {
      fireEvent.playing(video);
    });
    expect(getOverlay(container).hidden).toBe(true);
  });

  it("is hidden on mount when a prior dismissal was persisted", () => {
    window.localStorage.setItem(STORAGE_KEY, "1");
    mockMatchMedia(false);
    const { container } = render(<BackgroundVideo />);
    expect(getOverlay(container).hidden).toBe(true);
  });

  it("dismisses on button click, plays the video, and persists the dismissal", () => {
    mockMatchMedia(false);
    const { container } = render(<BackgroundVideo />);
    const video = getVideo(container);

    fireEvent.click(screen.getByRole("button", { name: "Verstanden" }));

    expect(video.play).toHaveBeenCalled();
    expect(getOverlay(container).hidden).toBe(true);
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe("1");
  });

  it("seeds the autoplay hook's opt-in from a persisted dismissal, so a returning reduced-motion visitor still autoplays", async () => {
    window.localStorage.setItem(STORAGE_KEY, "1");
    mockMatchMedia(true);
    const { container } = render(<BackgroundVideo />);
    const video = getVideo(container);

    await waitFor(() => expect(video.play).toHaveBeenCalled());
    expect(video.pause).not.toHaveBeenCalled();
  });
});

describe("data-playing attribute", () => {
  it("tracks playing/pause/emptied events", () => {
    mockMatchMedia(false);
    const { container } = render(<BackgroundVideo />);
    const video = getVideo(container);

    expect(video).toHaveAttribute("data-playing", "false");

    fireEvent.playing(video);
    expect(video).toHaveAttribute("data-playing", "true");

    fireEvent.pause(video);
    expect(video).toHaveAttribute("data-playing", "false");
  });
});

describe("error handling", () => {
  it("logs the media error and falls back to rendering nothing", () => {
    mockMatchMedia(false);
    const { container } = render(<BackgroundVideo />);
    const video = getVideo(container);

    Object.defineProperty(video, "error", {
      value: { code: 4, message: "MEDIA_ELEMENT_ERROR" },
      configurable: true,
    });

    act(() => {
      fireEvent.error(video);
    });

    expect(console.error).toHaveBeenCalledWith(
      "[BackgroundVideo] React onError fired",
      expect.objectContaining({ error: { code: 4, message: "MEDIA_ELEMENT_ERROR" } }),
    );
    expect(container).toBeEmptyDOMElement();
  });
});
