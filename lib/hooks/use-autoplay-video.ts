import { useCallback, useEffect, useRef, type RefObject } from "react";

interface UseAutoplayVideoOptions {
  // Set false (e.g. once the video has errored) to stop trying to sync
  // playback entirely.
  enabled: boolean;
  // Seeds opt-in to playback under prefers-reduced-motion. Only read once,
  // on mount — pass the persisted "already opted in before" value so a
  // returning reduced-motion visitor isn't stuck with no way to unblock
  // playback (see markUserStarted).
  initialUserOptIn: boolean;
}

// Keeps a background <video> playing across the situations a plain
// `autoPlay` attribute doesn't handle on its own, and respects
// prefers-reduced-motion unless the user has explicitly opted in (see
// `markUserStarted`).
export function useAutoplayVideo(
  videoRef: RefObject<HTMLVideoElement | null>,
  { enabled, initialUserOptIn }: UseAutoplayVideoOptions,
) {
  const userStartedPlaybackRef = useRef(initialUserOptIn);

  const markUserStarted = useCallback(() => {
    userStartedPlaybackRef.current = true;
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !enabled) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncPlayback = async (reason: string) => {
      if (reducedMotion.matches && !userStartedPlaybackRef.current) {
        video.pause();
        return;
      }

      if (!video.paused) return;

      try {
        await video.play();
      } catch (error) {
        // NotAllowedError is the expected Safari-autoplay-policy rejection
        // when there's no genuine user gesture yet (recovered via the
        // overlay/first-interaction fallback below) — only surface
        // anything else, since that would indicate a real media problem.
        if (error instanceof Error && error.name === "NotAllowedError") return;

        console.error("[BackgroundVideo] video.play() failed", {
          reason,
          error,
        });
      }
    };

    const handleVisibilityChange = () => {
      void syncPlayback("visibilitychange");
    };

    const handlePageShow = (event: PageTransitionEvent) => {
      void syncPlayback(
        event.persisted ? "pageshow:bfcache-restore" : "pageshow",
      );
    };

    const handleReducedMotionChange = () => {
      void syncPlayback("reduced-motion-change");
    };

    const retryOnFirstInteraction = () => {
      void syncPlayback("first-user-interaction");

      window.removeEventListener("touchend", retryOnFirstInteraction);
      window.removeEventListener("pointerdown", retryOnFirstInteraction);
    };

    void syncPlayback("initial");

    reducedMotion.addEventListener("change", handleReducedMotionChange);

    // iOS Safari pauses autoplaying video when the tab is backgrounded
    // (app switch, screen lock, incoming call banner) and, unlike desktop
    // browsers, does not resume it automatically when the page becomes
    // visible again — nor after a bfcache restore (e.g. swipe-back
    // navigation), which fires "pageshow" without remounting this
    // component. Without re-triggering play() here, the video is left
    // frozen on whatever frame it was paused at.
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pageshow", handlePageShow);

    // iOS blocks autoplay outright (even muted) while Low Power Mode is
    // on, with no event or API to detect it beforehand — the play()
    // promise above just rejects silently. A user-initiated play() isn't
    // subject to that restriction, so retry once on the first tap
    // anywhere on the page as a best-effort recovery. Harmless no-op if
    // autoplay already succeeded.
    window.addEventListener("touchend", retryOnFirstInteraction, {
      once: true,
    });
    window.addEventListener("pointerdown", retryOnFirstInteraction, {
      once: true,
    });

    return () => {
      reducedMotion.removeEventListener("change", handleReducedMotionChange);

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );

      window.removeEventListener("pageshow", handlePageShow);

      window.removeEventListener("touchend", retryOnFirstInteraction);
      window.removeEventListener("pointerdown", retryOnFirstInteraction);
    };
  }, [enabled, videoRef]);

  return { markUserStarted };
}
