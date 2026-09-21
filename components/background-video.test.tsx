import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BackgroundVideo } from "./background-video";
import { siteConfig } from "@/lib/site-config";

const STORAGE_KEY = "video-overlay-dismissed";

interface MatchMediaMock {
  matches: boolean;
  media: string;
  addEventListener: ReturnType<typeof vi.fn>;
  removeEventListener: ReturnType<typeof vi.fn>;
  dispatchChange: (matches: boolean) => void;
}

function mockMatchMedia(initialMatches: boolean): MatchMediaMock {
  const listeners = new Set<(event: { matches: boolean }) => void>();

  const mql: MatchMediaMock = {
    matches: initialMatches,
    media: "(prefers-reduced-motion: reduce)",
    addEventListener: vi.fn((event: string, cb: (e: { matches: boolean }) => void) => {
      if (event === "change") listeners.add(cb);
    }),
    removeEventListener: vi.fn((event: string, cb: (e: { matches: boolean }) => void) => {
      if (event === "change") listeners.delete(cb);
    }),
    dispatchChange(matches: boolean) {
      mql.matches = matches;
      listeners.forEach((cb) => cb({ matches }));
    },
  };

  window.matchMedia = vi.fn().mockReturnValue(mql) as unknown as typeof window.matchMedia;

  return mql;
}

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
  it("renders the background video with the configured src and decorative attributes", () => {
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
  });

  it("renders the informational overlay copy and dismiss button", () => {
    mockMatchMedia(false);
    render(<BackgroundVideo />);

    expect(
      screen.getByText(/Diese Website verwendet keine Analyse-/),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Verstanden" })).toBeInTheDocument();
  });
});

describe("overlay visibility", () => {
  it("is visible by default when there is no persisted dismissal", () => {
    mockMatchMedia(false);
    const { container } = render(<BackgroundVideo />);
    expect(getOverlay(container).hidden).toBe(false);
  });

  it("is hidden on mount when a prior dismissal was persisted", () => {
    window.localStorage.setItem(STORAGE_KEY, "1");
    mockMatchMedia(false);
    const { container } = render(<BackgroundVideo />);
    expect(getOverlay(container).hidden).toBe(true);
  });

  it("treats the overlay as not-dismissed if reading localStorage throws", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("storage blocked");
    });
    mockMatchMedia(false);
    const { container } = render(<BackgroundVideo />);
    expect(getOverlay(container).hidden).toBe(false);
  });

  it("hides itself once the video starts playing, and reappears if playback stops without a dismissal", () => {
    mockMatchMedia(false);
    const { container } = render(<BackgroundVideo />);
    const video = getVideo(container);

    act(() => {
      fireEvent.playing(video);
    });
    expect(getOverlay(container).hidden).toBe(true);

    act(() => {
      fireEvent.pause(video);
    });
    expect(getOverlay(container).hidden).toBe(false);
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

  it("still dismisses the overlay even if persisting to localStorage throws", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("quota exceeded");
    });
    mockMatchMedia(false);
    const { container } = render(<BackgroundVideo />);

    fireEvent.click(screen.getByRole("button", { name: "Verstanden" }));

    expect(getOverlay(container).hidden).toBe(true);
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

    fireEvent.playing(video);
    expect(video).toHaveAttribute("data-playing", "true");

    fireEvent.emptied(video);
    expect(video).toHaveAttribute("data-playing", "false");
  });
});

describe("autoplay orchestration", () => {
  it("attempts to play the video on mount", async () => {
    mockMatchMedia(false);
    render(<BackgroundVideo />);

    await waitFor(() => {
      expect(HTMLMediaElement.prototype.play).toHaveBeenCalled();
    });
  });

  it("does not autoplay and pauses when prefers-reduced-motion is active without prior opt-in", async () => {
    mockMatchMedia(true);
    const { container } = render(<BackgroundVideo />);
    const video = getVideo(container);

    await waitFor(() => {
      expect(video.pause).toHaveBeenCalled();
    });
    expect(video.play).not.toHaveBeenCalled();
  });

  it("still autoplays under reduced motion for a returning visitor who already dismissed the overlay", async () => {
    window.localStorage.setItem(STORAGE_KEY, "1");
    mockMatchMedia(true);
    const { container } = render(<BackgroundVideo />);
    const video = getVideo(container);

    await waitFor(() => {
      expect(video.play).toHaveBeenCalled();
    });
    expect(video.pause).not.toHaveBeenCalled();
  });

  it("re-syncs playback when prefers-reduced-motion changes mid-session", async () => {
    const mql = mockMatchMedia(false);
    const { container } = render(<BackgroundVideo />);
    const video = getVideo(container);

    await waitFor(() => expect(video.play).toHaveBeenCalled());
    vi.mocked(video.pause).mockClear();

    act(() => {
      mql.dispatchChange(true);
    });

    await waitFor(() => expect(video.pause).toHaveBeenCalled());
  });

  it("re-attempts playback on visibilitychange", async () => {
    mockMatchMedia(false);
    const { container } = render(<BackgroundVideo />);
    const video = getVideo(container);

    await waitFor(() => expect(video.play).toHaveBeenCalledTimes(1));

    act(() => {
      document.dispatchEvent(new Event("visibilitychange"));
    });

    await waitFor(() => expect(video.play).toHaveBeenCalledTimes(2));
  });

  it("re-attempts playback on pageshow, including bfcache restores", async () => {
    mockMatchMedia(false);
    const { container } = render(<BackgroundVideo />);
    const video = getVideo(container);

    await waitFor(() => expect(video.play).toHaveBeenCalledTimes(1));

    act(() => {
      const event = new Event("pageshow");
      Object.defineProperty(event, "persisted", { value: true });
      window.dispatchEvent(event);
    });

    await waitFor(() => expect(video.play).toHaveBeenCalledTimes(2));
  });

  it("retries playback once on the first touch/pointer interaction", async () => {
    mockMatchMedia(false);
    const { container } = render(<BackgroundVideo />);
    const video = getVideo(container);

    await waitFor(() => expect(video.play).toHaveBeenCalledTimes(1));

    act(() => {
      window.dispatchEvent(new Event("pointerdown"));
    });
    await waitFor(() => expect(video.play).toHaveBeenCalledTimes(2));

    act(() => {
      window.dispatchEvent(new Event("pointerdown"));
    });
    // listener is one-shot; a second dispatch must not trigger another play()
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(video.play).toHaveBeenCalledTimes(2);
  });

  it("removes the pointerdown listener once touchend fires first (and vice versa)", async () => {
    mockMatchMedia(false);
    const { container } = render(<BackgroundVideo />);
    const video = getVideo(container);

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

    render(<BackgroundVideo />);

    await waitFor(() => expect(HTMLMediaElement.prototype.play).toHaveBeenCalled());
    expect(console.error).not.toHaveBeenCalled();
  });

  it("logs unexpected play() failures with the triggering reason", async () => {
    mockMatchMedia(false);
    const error = new Error("media error");
    vi.spyOn(HTMLMediaElement.prototype, "play").mockRejectedValue(error);

    render(<BackgroundVideo />);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        "[BackgroundVideo] video.play() failed",
        expect.objectContaining({ reason: "initial", error }),
      );
    });
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

describe("cleanup", () => {
  it("removes all listeners it registered on unmount", () => {
    const mql = mockMatchMedia(false);
    const docRemoveSpy = vi.spyOn(document, "removeEventListener");
    const winRemoveSpy = vi.spyOn(window, "removeEventListener");

    const { unmount } = render(<BackgroundVideo />);
    unmount();

    expect(mql.removeEventListener).toHaveBeenCalledWith("change", expect.any(Function));
    expect(docRemoveSpy).toHaveBeenCalledWith("visibilitychange", expect.any(Function));
    expect(winRemoveSpy).toHaveBeenCalledWith("pageshow", expect.any(Function));
    expect(winRemoveSpy).toHaveBeenCalledWith("touchend", expect.any(Function));
    expect(winRemoveSpy).toHaveBeenCalledWith("pointerdown", expect.any(Function));
  });
});
