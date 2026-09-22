"use client";

import { useImperativeHandle, useRef, useState, type Ref } from "react";
import { siteConfig } from "@/lib/site-config";
import { useAutoplayVideo } from "@/lib/hooks/use-autoplay-video";
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

  // WelcomeScreen shows on every visit (not persisted — see
  // specs/007-specs.md), so there's no prior-visit opt-in to seed here: the
  // gesture-driven play() below is always what starts playback, including
  // under reduced motion.
  const { markUserStarted } = useAutoplayVideo(videoRef, {
    enabled: !failed,
    initialUserOptIn: false,
  });

  useImperativeHandle(
    ref,
    () => ({
      play: () => {
        // Callers must invoke this synchronously within a real user
        // gesture (e.g. first statement in a click handler) — Safari only
        // treats play() as genuine if there's no await/state-update
        // between the trusted event and this call.
        videoRef.current?.play().catch(() => {});
        markUserStarted();
      },
    }),
    [markUserStarted],
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
