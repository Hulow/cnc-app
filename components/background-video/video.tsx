import type { Ref } from "react";

interface VideoProps {
  ref: Ref<HTMLVideoElement | null>;
  src: string;
  poster?: string;
  playing: boolean;
  onPlaying: () => void;
  onPause: () => void;
  onEmptied: () => void;
  onError: (error: MediaError | null) => void;
}

// The decorative background <video> element itself — purely presentational,
// with no opinion on autoplay, overlays, or persistence.
export function Video({
  ref,
  src,
  poster,
  playing,
  onPlaying,
  onPause,
  onEmptied,
  onError,
}: VideoProps) {
  return (
    <video
      ref={ref}
      className="full-bleed object-cover background-video"
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
      data-playing={playing}
      onPlaying={onPlaying}
      onPause={onPause}
      onEmptied={onEmptied}
      onError={(event) => onError(event.currentTarget.error)}
    />
  );
}
