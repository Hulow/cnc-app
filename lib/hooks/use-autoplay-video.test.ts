import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, renderHook, waitFor } from "@testing-library/react";
import { useAutoplayVideo } from "./use-autoplay-video";
import { mockMatchMedia } from "@/lib/test-utils/match-media";

function renderAutoplayVideo(options: { enabled?: boolean; initialUserOptIn?: boolean } = {}) {
  const video = document.createElement("video");
  const ref = { current: video };

  const hook = renderHook(() =>
    useAutoplayVideo(ref, {
      enabled: options.enabled ?? true,
      initialUserOptIn: options.initialUserOptIn ?? false,
    }),
  );

  return { video, ...hook };
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

describe("useAutoplayVideo", () => {
  it("attempts to play the video on mount", async () => {
    mockMatchMedia(false);
    renderAutoplayVideo();

    await waitFor(() => expect(HTMLMediaElement.prototype.play).toHaveBeenCalled());
  });

  it("does nothing when disabled", async () => {
    mockMatchMedia(false);
    renderAutoplayVideo({ enabled: false });

    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
  });

  it("does not autoplay and pauses when prefers-reduced-motion is active without prior opt-in", async () => {
    mockMatchMedia(true);
    const { video } = renderAutoplayVideo();

    await waitFor(() => expect(video.pause).toHaveBeenCalled());
    expect(video.play).not.toHaveBeenCalled();
  });

  it("still autoplays under reduced motion when seeded with a prior opt-in", async () => {
    mockMatchMedia(true);
    const { video } = renderAutoplayVideo({ initialUserOptIn: true });

    await waitFor(() => expect(video.play).toHaveBeenCalled());
    expect(video.pause).not.toHaveBeenCalled();
  });

  it("lets a subsequent reduced-motion re-sync succeed once markUserStarted() has been called", async () => {
    const mql = mockMatchMedia(true);
    const { video, result } = renderAutoplayVideo();

    await waitFor(() => expect(video.pause).toHaveBeenCalled());
    expect(video.play).not.toHaveBeenCalled();

    act(() => {
      result.current.markUserStarted();
      // Any re-sync trigger picks up the opt-in from here on — a
      // reduced-motion "change" event is used as a stand-in.
      mql.dispatchChange(true);
    });

    await waitFor(() => expect(video.play).toHaveBeenCalled());
  });

  it("re-syncs playback when prefers-reduced-motion changes mid-session", async () => {
    const mql = mockMatchMedia(false);
    const { video } = renderAutoplayVideo();

    await waitFor(() => expect(video.play).toHaveBeenCalled());
    vi.mocked(video.pause).mockClear();

    act(() => {
      mql.dispatchChange(true);
    });

    await waitFor(() => expect(video.pause).toHaveBeenCalled());
  });

  it("re-attempts playback on visibilitychange", async () => {
    mockMatchMedia(false);
    const { video } = renderAutoplayVideo();

    await waitFor(() => expect(video.play).toHaveBeenCalledTimes(1));

    act(() => {
      document.dispatchEvent(new Event("visibilitychange"));
    });

    await waitFor(() => expect(video.play).toHaveBeenCalledTimes(2));
  });

  it("re-attempts playback on pageshow, including bfcache restores", async () => {
    mockMatchMedia(false);
    const { video } = renderAutoplayVideo();

    await waitFor(() => expect(video.play).toHaveBeenCalledTimes(1));

    act(() => {
      const event = new Event("pageshow");
      Object.defineProperty(event, "persisted", { value: true });
      window.dispatchEvent(event);
    });

    await waitFor(() => expect(video.play).toHaveBeenCalledTimes(2));
  });

  it("retries playback once on the first touch/pointer interaction, cross-removing the sibling listener", async () => {
    mockMatchMedia(false);
    const { video } = renderAutoplayVideo();

    await waitFor(() => expect(video.play).toHaveBeenCalledTimes(1));

    act(() => {
      window.dispatchEvent(new Event("touchend"));
    });
    await waitFor(() => expect(video.play).toHaveBeenCalledTimes(2));

    act(() => {
      window.dispatchEvent(new Event("pointerdown"));
    });
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(video.play).toHaveBeenCalledTimes(2);
  });

  it("silently ignores a NotAllowedError from play()", async () => {
    mockMatchMedia(false);
    vi.spyOn(HTMLMediaElement.prototype, "play").mockRejectedValue(
      Object.assign(new Error("not allowed"), { name: "NotAllowedError" }),
    );

    renderAutoplayVideo();

    await waitFor(() => expect(HTMLMediaElement.prototype.play).toHaveBeenCalled());
    expect(console.error).not.toHaveBeenCalled();
  });

  it("logs unexpected play() failures with the triggering reason", async () => {
    mockMatchMedia(false);
    const error = new Error("media error");
    vi.spyOn(HTMLMediaElement.prototype, "play").mockRejectedValue(error);

    renderAutoplayVideo();

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        "[BackgroundVideo] video.play() failed",
        expect.objectContaining({ reason: "initial", error }),
      );
    });
  });

  it("removes all listeners on unmount", () => {
    const mql = mockMatchMedia(false);
    const docRemoveSpy = vi.spyOn(document, "removeEventListener");
    const winRemoveSpy = vi.spyOn(window, "removeEventListener");

    const { unmount } = renderAutoplayVideo();
    unmount();

    expect(mql.removeEventListener).toHaveBeenCalledWith("change", expect.any(Function));
    expect(docRemoveSpy).toHaveBeenCalledWith("visibilitychange", expect.any(Function));
    expect(winRemoveSpy).toHaveBeenCalledWith("pageshow", expect.any(Function));
    expect(winRemoveSpy).toHaveBeenCalledWith("touchend", expect.any(Function));
    expect(winRemoveSpy).toHaveBeenCalledWith("pointerdown", expect.any(Function));
  });
});
