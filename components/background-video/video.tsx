import type { Ref } from "react";

interface VideoProps {
  ref: Ref<HTMLVideoElement | null>;
  src: string;
  // Narrower encode for phones/small tablets — optional so callers
  // without one just get the single `src`.
  narrowSrc?: string;
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
  narrowSrc,
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
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      // "metadata" (not "auto"): fetches just enough to get dimensions
      // and start playback promptly, instead of eagerly downloading the
      // whole file before the browser even knows if/when it'll play.
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
      data-playing={playing}
      onPlaying={onPlaying}
      onPause={onPause}
      onEmptied={onEmptied}
      onError={(event) => onError(event.currentTarget.error)}
    >
      {/* The browser picks the first matching <source> at load time, no
          JS needed — same mobile breakpoint the rest of the site's
          layout uses (see globals.css). Must come before the
          unconditional wide `src` below: <source> election is
          first-match, not most-specific. */}
      {narrowSrc && <source src={narrowSrc} media="(max-width: 767px)" />}
      <source src={src} />
    </video>
  );
}
