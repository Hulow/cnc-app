import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { VideoOverlay } from "./video-overlay";

afterEach(() => {
  cleanup();
});

describe("VideoOverlay", () => {
  it("renders the informational copy and dismiss button", () => {
    render(
      <VideoOverlay id="overlay" hidden={false} storageKey="key" onDismiss={() => {}} />,
    );

    expect(
      screen.getByText(/Diese Website verwendet keine Analyse-/),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Verstanden" })).toBeInTheDocument();
  });

  it("reflects the hidden prop on the overlay element", () => {
    const { container, rerender } = render(
      <VideoOverlay id="overlay" hidden={false} storageKey="key" onDismiss={() => {}} />,
    );
    expect(container.querySelector(".video-overlay")).not.toHaveAttribute("hidden");

    rerender(<VideoOverlay id="overlay" hidden={true} storageKey="key" onDismiss={() => {}} />);
    expect(container.querySelector(".video-overlay")).toHaveAttribute("hidden");
  });

  it("calls onDismiss when the button is clicked", () => {
    const onDismiss = vi.fn();
    render(<VideoOverlay id="overlay" hidden={false} storageKey="key" onDismiss={onDismiss} />);

    fireEvent.click(screen.getByRole("button", { name: "Verstanden" }));

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("embeds an anti-flash script that checks the given storage key and element id", () => {
    const { container } = render(
      <VideoOverlay id="my-overlay-id" hidden={false} storageKey="my-key" onDismiss={() => {}} />,
    );

    const script = container.querySelector("script");
    expect(script?.innerHTML).toContain("my-key");
    expect(script?.innerHTML).toContain("my-overlay-id");
  });
});
