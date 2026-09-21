"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/site-config";

// Full-screen background video, decorative only. Content elsewhere on the
// page must remain fully usable if this never loads or plays.

const VIDEO_OVERLAY_DISMISSED_KEY = "video-overlay-dismissed";

export function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window === "undefined") return false;

    try {
      return (
        window.localStorage.getItem(VIDEO_OVERLAY_DISMISSED_KEY) === "1"
      );
    } catch {
      // Storage unavailable (private mode, quota) — treat as "not
      // dismissed" and just skip persisting later.
      return false;
    }
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video || failed) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const logState = (label: string, extra?: Record<string, unknown>) => {
      const buffered = [];

      for (let i = 0; i < video.buffered.length; i++) {
        buffered.push({
          start: video.buffered.start(i),
          end: video.buffered.end(i),
        });
      }

      console.log(`[BackgroundVideo] ${label}`, {
        ...extra,

        // Media state
        readyState: video.readyState,
        readyStateLabel: {
          0: "HAVE_NOTHING",
          1: "HAVE_METADATA",
          2: "HAVE_CURRENT_DATA",
          3: "HAVE_FUTURE_DATA",
          4: "HAVE_ENOUGH_DATA",
        }[video.readyState],

        networkState: video.networkState,
        networkStateLabel: {
          0: "NETWORK_EMPTY",
          1: "NETWORK_IDLE",
          2: "NETWORK_LOADING",
          3: "NETWORK_NO_SOURCE",
        }[video.networkState],

        paused: video.paused,
        ended: video.ended,
        muted: video.muted,
        autoplay: video.autoplay,
        playsInline: video.playsInline,
        loop: video.loop,

        currentTime: video.currentTime,
        duration: video.duration,

        buffered,

        error: video.error
          ? {
              code: video.error.code,
              message: video.error.message,
            }
          : null,

        // Browser/page state
        visibilityState: document.visibilityState,
        reducedMotion: reducedMotion.matches,
        online: navigator.onLine,

        // Source
        currentSrc: video.currentSrc,
        src: video.src,
      });
    };

    const syncPlayback = async (reason: string) => {
      logState("syncPlayback()", { reason });

      if (reducedMotion.matches) {
        console.log("[BackgroundVideo] Reduced motion enabled → pause()");
        video.pause();
        return;
      }

      if (!video.paused) {
        console.log("[BackgroundVideo] Video is already playing");
        return;
      }

      console.log("[BackgroundVideo] Calling video.play()", { reason });

      try {
        await video.play();

        console.log("[BackgroundVideo] video.play() SUCCESS", {
          reason,
        });

        logState("After successful play()");
      } catch (error) {
        console.error("[BackgroundVideo] video.play() FAILED", {
          reason,
          errorName: error instanceof Error ? error.name : undefined,
          errorMessage: error instanceof Error ? error.message : undefined,
          error,
        });

        logState("After failed play()");
      }
    };

    const mediaEvents = [
      "loadstart",
      "durationchange",
      "loadedmetadata",
      "loadeddata",
      "progress",
      "canplay",
      "canplaythrough",
      "play",
      "playing",
      "pause",
      "waiting",
      "stalled",
      "suspend",
      "abort",
      "emptied",
      "seeking",
      "seeked",
      "timeupdate",
      "ratechange",
      "ended",
      "error",
    ] as const;

    const handleMediaEvent = (event: Event) => {
      logState(`media event: ${event.type}`);

      if (event.type === "error") {
        console.error("[BackgroundVideo] Media error", {
          mediaError: video.error
            ? {
                code: video.error.code,
                message: video.error.message,
              }
            : null,
        });
      }
    };

    mediaEvents.forEach((eventName) => {
      video.addEventListener(eventName, handleMediaEvent);
    });

    const handleVisibilityChange = () => {
      console.log("[BackgroundVideo] visibilitychange", {
        visibilityState: document.visibilityState,
      });

      void syncPlayback("visibilitychange");
    };

    const handlePageShow = (event: PageTransitionEvent) => {
      console.log("[BackgroundVideo] pageshow", {
        persisted: event.persisted,
        reason: event.persisted ? "bfcache restore" : "normal page show",
      });

      void syncPlayback(
        event.persisted ? "pageshow:bfcache-restore" : "pageshow",
      );
    };

    const handleReducedMotionChange = () => {
      console.log("[BackgroundVideo] prefers-reduced-motion changed", {
        matches: reducedMotion.matches,
      });

      void syncPlayback("reduced-motion-change");
    };

    const retryOnFirstInteraction = () => {
      console.log("[BackgroundVideo] First user interaction");

      void syncPlayback("first-user-interaction");

      window.removeEventListener("touchend", retryOnFirstInteraction);
      window.removeEventListener("pointerdown", retryOnFirstInteraction);
    };

    const handleOnline = () => {
      console.log("[BackgroundVideo] Browser is online");

      logState("online");
    };

    const handleOffline = () => {
      console.warn("[BackgroundVideo] Browser is offline");

      logState("offline");
    };

    // Log the initial state before attempting playback.
    logState("Initial video state");

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

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      reducedMotion.removeEventListener("change", handleReducedMotionChange);

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );

      window.removeEventListener("pageshow", handlePageShow);

      window.removeEventListener("touchend", retryOnFirstInteraction);
      window.removeEventListener("pointerdown", retryOnFirstInteraction);

      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);

      mediaEvents.forEach((eventName) => {
        video.removeEventListener(eventName, handleMediaEvent);
      });
    };
  }, [failed]);

  if (failed) {
    // Fall back to the plain page background rather than a broken player.
    return null;
  }

  return (
    <>
      {!playing && !dismissed && (
        <div className="video-overlay" role="note">
          <p>
            Diese Website verwendet keine Analyse-, Werbe- oder
            Tracking-Cookies und keine Benutzerkonten. Sie wird von Vercel
            gehostet und nutzt Cloudinary zur Auslieferung von
            Videoinhalten. Diese Anbieter können dabei technische Daten wie
            IP-Adressen und Anfrageinformationen verarbeiten.
          </p>
          <button
            type="button"
            onClick={() => {
              // Must be the first statement in this handler: Safari only
              // treats play() as a genuine user gesture if it's called
              // synchronously within the trusted click event, not after
              // an await or a state update.
              videoRef.current?.play().catch(() => {});

              setDismissed(true);

              try {
                window.localStorage.setItem(VIDEO_OVERLAY_DISMISSED_KEY, "1");
              } catch {
                // Best-effort only — the overlay just reappears next visit.
              }
            }}
          >
            Verstanden
          </button>
        </div>
      )}
      <video
        ref={videoRef}
        className="full-bleed object-cover background-video"
        src={siteConfig.video.src}
        poster={siteConfig.video.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
        data-playing={playing}
        onPlaying={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEmptied={() => setPlaying(false)}
        onError={() => {
          console.error("[BackgroundVideo] React onError fired", {
            error: videoRef.current?.error
              ? {
                  code: videoRef.current.error.code,
                  message: videoRef.current.error.message,
                }
              : null,
          });

          setFailed(true);
        }}
      />
    </>
  );
}