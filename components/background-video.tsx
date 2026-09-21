"use client";

import { useId, useRef, useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { usePersistedFlag } from "@/lib/hooks/use-persisted-flag";
import { useAutoplayVideo } from "@/lib/hooks/use-autoplay-video";
import { Video } from "./video";
import { VideoOverlay } from "./video-overlay";

// Orchestrates the full-screen background video: owns the video ref and
// playback/failure state, and wires the (presentational) <Video> and
// <VideoOverlay> together. Content elsewhere on the page must remain fully
// usable if this never loads or plays.

const VIDEO_OVERLAY_DISMISSED_KEY = "video-overlay-dismissed";

export function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayId = useId();
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [dismissed, dismiss] = usePersistedFlag(VIDEO_OVERLAY_DISMISSED_KEY);

  // The overlay's only action dismisses it *and* plays the video, so a
  // dismissal persisted from an earlier visit already means this browser
  // consented to playback once — seed the hook's opt-in from that instead
  // of always starting unset, otherwise a returning reduced-motion visitor
  // has no overlay left to click (it's already dismissed) and no way to
  // ever unblock the video again.
  const { markUserStarted } = useAutoplayVideo(videoRef, {
    enabled: !failed,
    initialUserOptIn: dismissed,
  });

  if (failed) {
    // Fall back to the plain page background rather than a broken player.
    return null;
  }

  return (
    <>
      <VideoOverlay
        id={overlayId}
        hidden={playing || dismissed}
        storageKey={VIDEO_OVERLAY_DISMISSED_KEY}
        onDismiss={() => {
          // Must be the first statement here: Safari only treats play() as
          // a genuine user gesture if it's called synchronously within the
          // trusted click event, not after an await or a state update.
          videoRef.current?.play().catch(() => {});
          markUserStarted();
          dismiss();
        }}
      />
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
    </>
  );
}
