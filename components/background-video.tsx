"use client";

import { useEffect, useId, useRef, useState } from "react";
import { siteConfig } from "@/lib/site-config";

// Full-screen background video, decorative only. Content elsewhere on the
// page must remain fully usable if this never loads or plays.

const VIDEO_OVERLAY_DISMISSED_KEY = "video-overlay-dismissed";

export function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayId = useId();
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

    const syncPlayback = async (reason: string) => {
      if (reducedMotion.matches) {
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
  }, [failed]);

  if (failed) {
    // Fall back to the plain page background rather than a broken player.
    return null;
  }

  // Whether the overlay div is present in the tree never changes between
  // server and client render (it's always mounted); only its `hidden`
  // attribute is state-driven. This avoids relying on hydration to
  // add/remove a whole subtree based on client-only localStorage, which
  // this Next.js version doesn't reliably reconcile — see "Preventing
  // flash before hydration" in the Next.js docs. The inline script below
  // sets `hidden` before first paint so there's no flash either.
  const overlayHidden = playing || dismissed;

  return (
    <>
      <div
        id={overlayId}
        className="video-overlay"
        role="note"
        hidden={overlayHidden}
        suppressHydrationWarning
      >
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
      <script
        type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: `{try{if(localStorage.getItem("${VIDEO_OVERLAY_DISMISSED_KEY}")==="1"){var el=document.getElementById("${overlayId}");if(el)el.hidden=true}}catch(e){}}`,
        }}
      />
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