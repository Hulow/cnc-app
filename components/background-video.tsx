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
    return () => reducedMotion.removeEventListener("change", syncPlayback);
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
