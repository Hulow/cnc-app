import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { BackgroundVideo } from "./background-video";
import { siteConfig } from "@/shared/site-config";

// These are composition-level tests: they check that BackgroundVideo wires
// the video element together with the autoplay hook correctly. The autoplay
// retry logic itself is covered in use-background-video.test.ts.

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
      const sources = [...video.querySelectorAll("source")];
      expect(sources.map((source) => source.getAttribute("src"))).toEqual([
        siteConfig.video.narrowSrc,
        siteConfig.video.src,
      ]);
      expect(video.getAttribute("poster")).toBe(siteConfig.video.poster);
      expect(video.autoplay).toBe(true);
      expect(video.muted).toBe(true);
      expect(video.loop).toBe(true);
      expect(video.playsInline).toBe(true);
      expect(video).toHaveAttribute("aria-hidden", "true");
      expect(video.tabIndex).toBe(-1);
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
    it("Then it logs the media error and falls back to the poster image", () => {
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
      expect(container.querySelector("video")).not.toBeInTheDocument();
      const fallbackImg = container.querySelector("img");
      expect(fallbackImg).toHaveAttribute("src", siteConfig.video.poster);
      expect(fallbackImg).toHaveClass("full-bleed", "object-cover", "background-video");
    });
  });
});

describe("Given the browser blocks autoplay (e.g. no user gesture yet, or iOS Low Power Mode)", () => {
  beforeEach(() => {
    vi.spyOn(HTMLMediaElement.prototype, "play").mockRejectedValue(
      Object.assign(new Error("not allowed"), { name: "NotAllowedError" }),
    );
  });

  describe("When autoplay is rejected", () => {
    it("Then it renders no Play button or other recovery affordance", async () => {
      const { container } = render(<BackgroundVideo />);

      await waitFor(() => expect(HTMLMediaElement.prototype.play).toHaveBeenCalled());
      expect(container.querySelector("button")).not.toBeInTheDocument();
    });

    it("Then nothing is logged to console.error (this rejection is expected)", async () => {
      render(<BackgroundVideo />);

      await waitFor(() => expect(HTMLMediaElement.prototype.play).toHaveBeenCalled());
      expect(console.error).not.toHaveBeenCalled();
    });
  });
});
