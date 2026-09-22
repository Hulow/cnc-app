"use client";

import { useEffect, useImperativeHandle, useRef, useState, type Ref } from "react";
import { siteConfig } from "@/shared/site-config";
import { useBackgroundVideo } from "./use-background-video";
import { Video } from "./video";

// Orchestrates the full-screen background video: owns the video ref and
// playback/failure state, and wires the (presentational) <Video> together
// with the autoplay hook. Content elsewhere on the page must remain fully
// usable if this never loads or plays. Renders no overlay of its own —
// callers that need a gesture to unblock playback (e.g. ExperienceGate's
// WelcomeScreen) do so via the `play()` exposed on `ref`.

export interface BackgroundVideoHandle {
  play: () => void;
}

interface BackgroundVideoProps {
  ref?: Ref<BackgroundVideoHandle | null>;
}

export function BackgroundVideo({ ref }: BackgroundVideoProps) {
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

  useImperativeHandle(
    ref,
    () => ({
      play: () => {
        // Callers must invoke this synchronously within a real user
        // gesture (e.g. first statement in a click handler) — Safari only
        // treats play() as genuine if there's no await/state-update
        // between the trusted event and this call.
        videoRef.current?.play().catch(() => {});
      },
    }),
    [],
  );

  if (failed) {
    // Fall back to the plain page background rather than a broken player.
    return null;
  }

  return (
    <Video
      ref={videoRef}
      src={siteConfig.video.src}
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
