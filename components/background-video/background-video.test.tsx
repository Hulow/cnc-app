import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BackgroundVideo } from "./background-video";
import { siteConfig } from "@/shared/site-config";

// These are composition-level tests: they check that BackgroundVideo wires
// the video element, the autoplay hook, and its own "blocked" recovery
// button together correctly. The autoplay retry logic itself is covered in
// use-background-video.test.ts.

function getVideo(container: HTMLElement) {
  return container.querySelector("video") as HTMLVideoElement;
}

beforeEach(() => {
  vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue(undefined);
  vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("Given the background video is rendered", () => {
  describe("When it mounts", () => {
    it("Then it renders a video with the configured src and decorative attributes", () => {
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
    });

    it("Then it renders no Play button while autoplay hasn't been blocked", () => {
      render(<BackgroundVideo />);

      expect(screen.queryByRole("button", { name: "Play background video" })).not.toBeInTheDocument();
    });
  });

  describe("When data-playing tracks playback events", () => {
    it("Then the attribute follows playing/pause/emptied events", () => {
      const { container } = render(<BackgroundVideo />);
      const video = getVideo(container);

      expect(video).toHaveAttribute("data-playing", "false");

      fireEvent.playing(video);
      expect(video).toHaveAttribute("data-playing", "true");

      fireEvent.pause(video);
      expect(video).toHaveAttribute("data-playing", "false");
    });

    it("Then it treats a video that started playing before hydration as playing", () => {
      // Simulates the native autoPlay attribute winning the race against a
      // slow (e.g. post-deploy, cold-cache) hydration: the browser already
      // started playback, and fired "playing" natively, before this
      // component's onPlaying listener existed to catch it.
      vi.spyOn(HTMLMediaElement.prototype, "paused", "get").mockReturnValue(false);
      vi.spyOn(HTMLMediaElement.prototype, "ended", "get").mockReturnValue(false);
      vi.spyOn(HTMLMediaElement.prototype, "readyState", "get").mockReturnValue(4);

      const { container } = render(<BackgroundVideo />);
      const video = getVideo(container);

      expect(video).toHaveAttribute("data-playing", "true");
    });
  });

  describe("When the video errors", () => {
    it("Then it logs the media error and falls back to rendering nothing", () => {
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
});

describe("Given the browser blocks autoplay (no user gesture yet)", () => {
  beforeEach(() => {
    vi.spyOn(HTMLMediaElement.prototype, "play").mockRejectedValue(
      Object.assign(new Error("not allowed"), { name: "NotAllowedError" }),
    );
  });

  describe("When autoplay is rejected", () => {
    it("Then a small Play button appears", async () => {
      render(<BackgroundVideo />);

      expect(
        await screen.findByRole("button", { name: "Play background video" }),
      ).toBeInTheDocument();
    });

    it("Then nothing is logged to console.error (this rejection is expected)", async () => {
      render(<BackgroundVideo />);

      await screen.findByRole("button", { name: "Play background video" });
      expect(console.error).not.toHaveBeenCalled();
    });
  });

  describe("When the visitor clicks the Play button", () => {
    it("Then the video's play() is invoked again and the button disappears", async () => {
      const { container } = render(<BackgroundVideo />);
      const video = getVideo(container);
      const playButton = await screen.findByRole("button", { name: "Play background video" });

      vi.mocked(video.play).mockClear().mockResolvedValue(undefined);
      fireEvent.click(playButton);

      expect(video.play).toHaveBeenCalled();
      await waitFor(() =>
        expect(
          screen.queryByRole("button", { name: "Play background video" }),
        ).not.toBeInTheDocument(),
      );
    });
  });
});
