"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/shared/site-config";
import { useBackgroundVideo } from "./use-background-video";
import { Video } from "./video";

// Orchestrates the full-screen background video: owns the video ref and
// playback/failure state, and wires the (presentational) <Video> together
// with the autoplay hook. Content elsewhere on the page must remain fully
// usable if this never loads or plays. When the browser blocks autoplay
// (no user gesture yet, or a power-saving mode like iOS Low Power Mode),
// it just leaves the video paused on its poster frame — no "Play"
// affordance.

export function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);

  useBackgroundVideo(videoRef, { enabled: !failed });

  // The <video autoPlay> tag is in the server-rendered HTML, so the browser
  // can start playing it before this component finishes hydrating and
  // attaches the onPlaying listener below — most likely right after a fresh
  // deploy, when the JS bundle is a slow cold fetch but the video (served
  // from an untouched CDN) isn't. A "playing" event that fires in that gap
  // is missed permanently, leaving `playing` stuck at false and the video
  // stuck at opacity: 0 (see .background-video[data-playing="false"] in
  // globals.css) even though it's actually playing. Catch that on mount by
  // checking the video's actual state instead of only listening for future
  // events.
  useEffect(() => {
    const video = videoRef.current;
    if (video && !video.paused && !video.ended && video.readyState > 2) {
      setPlaying(true);
    }
  }, []);

  // In dev, skip the Cloudinary video entirely and show the poster —
  // avoids streaming the remote video on every reload while iterating
  // locally. Reuses the same fallback path as a Cloudinary failure.
  if (failed || process.env.NODE_ENV === "development") {
    // Cloudinary quota/outage fallback (see note.md): show the poster
    // image rather than an empty background.
    // Only falls through to a truly blank background if no poster is
    // configured at all.
    if (!siteConfig.video.poster) return null;

    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={siteConfig.video.poster}
        alt=""
        aria-hidden="true"
        className="full-bleed object-cover background-video"
      />
    );
  }

  return (
    <Video
      ref={videoRef}
      src={siteConfig.video.src}
      narrowSrc={siteConfig.video.narrowSrc}
      poster={siteConfig.video.poster}
      playing={playing}
      onPlaying={() => setPlaying(true)}
      onPause={() => setPlaying(false)}
      onEmptied={() => setPlaying(false)}
      onError={(error) => {
        console.error("[BackgroundVideo] React onError fired", {
          error: error ? { code: error.code, message: error.message } : null,
        });

        setFailed(true);
      }}
    />
  );
}
