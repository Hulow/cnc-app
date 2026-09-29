import { useEffect, type RefObject } from "react";

interface UseBackgroundVideoOptions {
  // Set false (e.g. once the video has errored) to stop trying to sync
  // playback entirely.
  enabled: boolean;
}

// Keeps a background <video> playing across the situations a plain
// `autoPlay` attribute doesn't handle on its own (backgrounded tabs,
// bfcache restores), and silently absorbs the expected Safari
// autoplay-policy rejection.
export function useBackgroundVideo(
  videoRef: RefObject<HTMLVideoElement | null>,
  { enabled }: UseBackgroundVideoOptions,
) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !enabled) return;

    const syncPlayback = async (reason: string) => {
      if (!video.paused) return;

      try {
        await video.play();
      } catch (error) {
        // NotAllowedError is the expected rejection when there's no
        // genuine user gesture yet (or a power-saving mode like iOS Low
        // Power Mode blocks autoplay outright) — only surface anything
        // else, since that would indicate a real media problem.
        if (error instanceof Error && error.name === "NotAllowedError") {
          return;
        }

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

    // Recovery path for a blocked autoplay (e.g. iOS Low Power Mode): the
    // video sits at z-index: 0 with .content-layer's translucent panel
    // covering the centered part of the screen above it (z-index: 1, see
    // globals.css), so WebKit's own "tap to start" affordance renders on
    // top of the video but is visually unreachable — taps there land on
    // .content-layer instead and never reach the video element. Rather
    // than fight that stacking, treat the visitor's first interaction
    // *anywhere* on the page as the trusted gesture: a click/touchend
    // still satisfies the browser's user-activation requirement even
    // though it didn't land on the video itself. { once: true } means
    // this is a no-op after the first tap, and syncPlayback's own
    // `!video.paused` guard makes it a cheap no-op if the video was
    // already playing by then anyway.
    const handleFirstGesture = () => {
      void syncPlayback("first-gesture");
    };

    void syncPlayback("initial");

    // iOS Safari pauses autoplaying video when the tab is backgrounded
    // (app switch, screen lock, incoming call banner) and, unlike desktop
    // browsers, does not resume it automatically when the page becomes
    // visible again — nor after a bfcache restore (e.g. swipe-back
    // navigation), which fires "pageshow" without remounting this
    // component. Without re-triggering play() here, the video is left
    // frozen on whatever frame it was paused at.
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pageshow", handlePageShow);
    document.addEventListener("pointerdown", handleFirstGesture, {
      once: true,
    });

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );

      window.removeEventListener("pageshow", handlePageShow);
      document.removeEventListener("pointerdown", handleFirstGesture);
    };
  }, [enabled, videoRef]);
}
