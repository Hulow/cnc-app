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
        // genuine user gesture yet (recovered once BackgroundVideo's
        // exposed play() is called from a real click) — only surface
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

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );

      window.removeEventListener("pageshow", handlePageShow);
    };
  }, [enabled, videoRef]);
}
