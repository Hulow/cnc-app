import { useRef } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render } from "@testing-library/react";
import { Video } from "./video";

afterEach(() => {
  cleanup();
});

function Harness(props: Partial<React.ComponentProps<typeof Video>> = {}) {
  const ref = useRef<HTMLVideoElement>(null);
  return (
    <Video
      ref={ref}
      src="https://example.com/video.mp4"
      playing={false}
      onPlaying={() => {}}
      onPause={() => {}}
      onEmptied={() => {}}
      onError={() => {}}
      {...props}
    />
  );
}

describe("Video", () => {
  it("renders a wide <source>, poster, and decorative attributes", () => {
    const { container } = render(<Harness poster="https://example.com/poster.jpg" />);
    const video = container.querySelector("video") as HTMLVideoElement;
    const sources = video.querySelectorAll("source");

    expect(sources).toHaveLength(1);
    expect(sources[0].getAttribute("src")).toBe("https://example.com/video.mp4");
    expect(sources[0]).not.toHaveAttribute("media");
    expect(video.getAttribute("poster")).toBe("https://example.com/poster.jpg");
    expect(video.getAttribute("preload")).toBe("metadata");
    expect(video.autoplay).toBe(true);
    expect(video.muted).toBe(true);
    expect(video.loop).toBe(true);
    expect(video.playsInline).toBe(true);
    expect(video).toHaveAttribute("aria-hidden", "true");
    expect(video.tabIndex).toBe(-1);
  });

  it("puts a narrow, media-scoped <source> before the wide one when given a narrowSrc", () => {
    const { container } = render(<Harness narrowSrc="https://example.com/video-narrow.mp4" />);
    const sources = [...container.querySelectorAll("video source")];

    expect(sources).toHaveLength(2);
    expect(sources[0].getAttribute("src")).toBe("https://example.com/video-narrow.mp4");
    expect(sources[0].getAttribute("media")).toBe("(max-width: 767px)");
    expect(sources[1].getAttribute("src")).toBe("https://example.com/video.mp4");
    expect(sources[1]).not.toHaveAttribute("media");
  });

  it("reflects the playing prop via data-playing", () => {
    const { container, rerender } = render(<Harness playing={false} />);
    expect(container.querySelector("video")).toHaveAttribute("data-playing", "false");

    rerender(<Harness playing={true} />);
    expect(container.querySelector("video")).toHaveAttribute("data-playing", "true");
  });

  it("calls onPlaying/onPause/onEmptied for the matching DOM events", () => {
    const onPlaying = vi.fn();
    const onPause = vi.fn();
    const onEmptied = vi.fn();
    const { container } = render(
      <Harness onPlaying={onPlaying} onPause={onPause} onEmptied={onEmptied} />,
    );
    const video = container.querySelector("video") as HTMLVideoElement;

    fireEvent.playing(video);
    expect(onPlaying).toHaveBeenCalledTimes(1);

    fireEvent.pause(video);
    expect(onPause).toHaveBeenCalledTimes(1);

    fireEvent.emptied(video);
    expect(onEmptied).toHaveBeenCalledTimes(1);
  });

  it("calls onError with the underlying MediaError from the element", () => {
    const onError = vi.fn();
    const { container } = render(<Harness onError={onError} />);
    const video = container.querySelector("video") as HTMLVideoElement;

    const mediaError = { code: 4, message: "MEDIA_ELEMENT_ERROR" };
    Object.defineProperty(video, "error", { value: mediaError, configurable: true });

    act(() => {
      fireEvent.error(video);
    });

    expect(onError).toHaveBeenCalledWith(mediaError);
  });
});
