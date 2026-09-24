import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, renderHook, waitFor } from "@testing-library/react";
import { useBackgroundVideo } from "./use-background-video";

function renderBackgroundVideo(options: { enabled?: boolean } = {}) {
  const video = document.createElement("video");
  const ref = { current: video };

  const hook = renderHook(() => useBackgroundVideo(ref, { enabled: options.enabled ?? true }));

  return { video, ...hook };
}

beforeEach(() => {
  vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue(undefined);
  vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
  vi.spyOn(HTMLMediaElement.prototype, "load").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("useBackgroundVideo", () => {
  it("attempts to play the video on mount", async () => {
    renderBackgroundVideo();

    await waitFor(() => expect(HTMLMediaElement.prototype.play).toHaveBeenCalled());
  });

  it("does nothing when disabled", async () => {
    renderBackgroundVideo({ enabled: false });

    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
  });

  it("re-attempts playback on visibilitychange", async () => {
    const { video } = renderBackgroundVideo();

    await waitFor(() => expect(video.play).toHaveBeenCalledTimes(1));

    act(() => {
      document.dispatchEvent(new Event("visibilitychange"));
    });

    await waitFor(() => expect(video.play).toHaveBeenCalledTimes(2));
  });

  it("re-attempts playback on pageshow, including bfcache restores", async () => {
    const { video } = renderBackgroundVideo();

    await waitFor(() => expect(video.play).toHaveBeenCalledTimes(1));

    act(() => {
      const event = new Event("pageshow");
      Object.defineProperty(event, "persisted", { value: true });
      window.dispatchEvent(event);
    });

    await waitFor(() => expect(video.play).toHaveBeenCalledTimes(2));
  });

  it("silently ignores a NotAllowedError from play()", async () => {
    vi.spyOn(HTMLMediaElement.prototype, "play").mockRejectedValue(
      Object.assign(new Error("not allowed"), { name: "NotAllowedError" }),
    );

    renderBackgroundVideo();

    await waitFor(() => expect(HTMLMediaElement.prototype.play).toHaveBeenCalled());
    expect(console.error).not.toHaveBeenCalled();
  });

  it("logs unexpected play() failures with the triggering reason", async () => {
    const error = new Error("media error");
    vi.spyOn(HTMLMediaElement.prototype, "play").mockRejectedValue(error);

    renderBackgroundVideo();

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        "[BackgroundVideo] video.play() failed",
        expect.objectContaining({ reason: "initial", error }),
      );
    });
  });

  it("reloads the source before playing when readyState is HAVE_NOTHING", async () => {
    // jsdom's videos default to readyState 0 (HAVE_NOTHING), matching a
    // real browser that's evicted a backgrounded video's buffered data.
    const { video } = renderBackgroundVideo();

    await waitFor(() => expect(video.load).toHaveBeenCalledTimes(1));
    expect(video.play).toHaveBeenCalledTimes(1);
  });

  it("does not reload the source when it already has data", async () => {
    const video = document.createElement("video");
    Object.defineProperty(video, "readyState", { value: 4 });
    const ref = { current: video };

    renderHook(() => useBackgroundVideo(ref, { enabled: true }));

    await waitFor(() => expect(video.play).toHaveBeenCalledTimes(1));
    expect(video.load).not.toHaveBeenCalled();
  });

  it("removes all listeners on unmount", () => {
    const docRemoveSpy = vi.spyOn(document, "removeEventListener");
    const winRemoveSpy = vi.spyOn(window, "removeEventListener");

    const { unmount } = renderBackgroundVideo();
    unmount();

    expect(docRemoveSpy).toHaveBeenCalledWith("visibilitychange", expect.any(Function));
    expect(winRemoveSpy).toHaveBeenCalledWith("pageshow", expect.any(Function));
  });
});
