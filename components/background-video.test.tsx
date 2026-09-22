import { createRef } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render } from "@testing-library/react";
import { BackgroundVideo, type BackgroundVideoHandle } from "./background-video";
import { siteConfig } from "@/lib/site-config";

// These are composition-level tests: they check that BackgroundVideo wires
// the video element, the autoplay hook, and its imperative `play()` handle
// together correctly. The autoplay retry logic itself is covered in
// lib/hooks/use-autoplay-video.test.ts. BackgroundVideo no longer owns any
// overlay — that's WelcomeScreen/ExperienceGate's job now
// (components/welcome-screen.test.tsx, components/experience-gate.test.tsx).

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

    it("Then it renders no overlay of its own", () => {
      const { container } = render(<BackgroundVideo />);

      expect(container.querySelector(".video-overlay")).not.toBeInTheDocument();
      expect(container.querySelector(".welcome-screen")).not.toBeInTheDocument();
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

describe("Given a caller holds a ref to the background video", () => {
  describe("When the ref's play() is called", () => {
    it("Then the underlying video element's play() is invoked", () => {
      const ref = createRef<BackgroundVideoHandle>();
      const { container } = render(<BackgroundVideo ref={ref} />);
      const video = getVideo(container);

      act(() => {
        ref.current?.play();
      });

      expect(video.play).toHaveBeenCalled();
    });
  });
});
