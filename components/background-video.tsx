"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/site-config";

// Full-screen background video, decorative only. Content elsewhere on the
// page must remain fully usable if this never loads or plays.

export function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || failed) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncPlayback = () => {
      if (reducedMotion.matches) {
        video.pause();
      } else {
        video.play().catch(() => {
          // Autoplay can be blocked by the browser; the poster/background
          // stays visible and the page remains fully usable either way.
        });
      }
    };

    syncPlayback();
    reducedMotion.addEventListener("change", syncPlayback);

    // iOS Safari pauses autoplaying video when the tab is backgrounded
    // (app switch, screen lock, incoming call banner) and, unlike desktop
    // browsers, does not resume it automatically when the page becomes
    // visible again — nor after a bfcache restore (e.g. swipe-back
    // navigation), which fires "pageshow" without remounting this
    // component. Without re-triggering play() here, the video is left
    // frozen on whatever frame it was paused at.
    document.addEventListener("visibilitychange", syncPlayback);
    window.addEventListener("pageshow", syncPlayback);

    // iOS blocks autoplay outright (even muted) while Low Power Mode is
    // on, with no event or API to detect it beforehand — the play()
    // promise above just rejects silently. A user-initiated play() isn't
    // subject to that restriction, so retry once on the first tap
    // anywhere on the page as a best-effort recovery. Harmless no-op if
    // autoplay already succeeded.
    const retryOnFirstInteraction = () => {
      syncPlayback();
      window.removeEventListener("touchend", retryOnFirstInteraction);
      window.removeEventListener("pointerdown", retryOnFirstInteraction);
    };
    window.addEventListener("touchend", retryOnFirstInteraction, { once: true });
    window.addEventListener("pointerdown", retryOnFirstInteraction, { once: true });

    return () => {
      reducedMotion.removeEventListener("change", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
      window.removeEventListener("pageshow", syncPlayback);
      window.removeEventListener("touchend", retryOnFirstInteraction);
      window.removeEventListener("pointerdown", retryOnFirstInteraction);
    };
  }, [failed]);

  if (failed) {
    // Fall back to the plain page background rather than a broken player.
    return null;
  }

  return (
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
      onError={() => setFailed(true)}
    />
  );
}
