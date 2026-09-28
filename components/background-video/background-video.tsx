"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { siteConfig } from "@/shared/site-config";
import { useBackgroundVideo } from "./use-background-video";
import { Video } from "./video";

// Orchestrates the full-screen background video: owns the video ref and
// playback/failure state, and wires the (presentational) <Video> together
// with the autoplay hook. Content elsewhere on the page must remain fully
// usable if this never loads or plays. Fully self-contained: when the
// browser blocks autoplay (no user gesture yet), it renders its own small
// "Play" button rather than depending on some other gesture elsewhere on
// the page (there's no mandatory welcome/consent gate to piggyback on
// anymore — see P0.4 in SEO-SPEC.md).

export function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);

  const handleBlocked = useCallback(() => setBlocked(true), []);

  useBackgroundVideo(videoRef, { enabled: !failed, onBlocked: handleBlocked });

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

  function handlePlayClick() {
    // Must call play() synchronously within the trusted click event, not
    // after an await or a state update — Safari only treats it as a
    // genuine user gesture otherwise.
    videoRef.current?.play().catch(() => {});
    setBlocked(false);
  }

  if (failed) {
    // Cloudinary quota/outage fallback (see P2.1 in SEO-SPEC.md and
    // note.md): show the poster image rather than an empty background.
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
    <>
      <Video
        ref={videoRef}
        src={siteConfig.video.src}
        narrowSrc={siteConfig.video.narrowSrc}
        poster={siteConfig.video.poster}
        playing={playing}
        onPlaying={() => {
          setPlaying(true);
          setBlocked(false);
        }}
        onPause={() => setPlaying(false)}
        onEmptied={() => setPlaying(false)}
        onError={(error) => {
          console.error("[BackgroundVideo] React onError fired", {
            error: error ? { code: error.code, message: error.message } : null,
          });

          setFailed(true);
        }}
      />
      {blocked && !playing && (
        <button
          type="button"
          className="background-video-play"
          onClick={handlePlayClick}
          aria-label="Play background video"
        >
          ▶
        </button>
      )}
    </>
  );
}
