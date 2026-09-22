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
  it("renders with the given src, poster, and decorative attributes", () => {
    const { container } = render(<Harness poster="https://example.com/poster.jpg" />);
    const video = container.querySelector("video") as HTMLVideoElement;

    expect(video.getAttribute("src")).toBe("https://example.com/video.mp4");
    expect(video.getAttribute("poster")).toBe("https://example.com/poster.jpg");
    expect(video.autoplay).toBe(true);
    expect(video.muted).toBe(true);
    expect(video.loop).toBe(true);
    expect(video.playsInline).toBe(true);
    expect(video).toHaveAttribute("aria-hidden", "true");
    expect(video.tabIndex).toBe(-1);
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
