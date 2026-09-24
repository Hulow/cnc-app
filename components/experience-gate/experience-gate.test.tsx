import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { ExperienceGate } from "./experience-gate";

// Composition-level tests: check that ExperienceGate wires BackgroundVideo,
// the page's children, and WelcomeScreen together. WelcomeScreen's own
// rendering is covered in components/welcome-screen/welcome-screen.test.tsx,
// BackgroundVideo's in components/background-video/background-video.test.tsx.

function getVideo(container: HTMLElement) {
  return container.querySelector("video") as HTMLVideoElement;
}

function getWelcomeScreen(container: HTMLElement) {
  return container.querySelector(".welcome-screen") as HTMLElement;
}

beforeEach(() => {
  vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue(undefined);
  vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("Given a visitor loads the page", () => {
  describe("When ExperienceGate mounts", () => {
    it("Then it renders the background video, the page content, and a visible welcome screen", () => {
      const { container } = render(
        <ExperienceGate>
          <main>Page content</main>
        </ExperienceGate>,
      );

      expect(getVideo(container)).toBeInTheDocument();
      expect(screen.getByText("Page content")).toBeInTheDocument();
      expect(getWelcomeScreen(container)).not.toHaveAttribute("hidden");
    });
  });

  describe("When the visitor clicks Continue", () => {
    it("Then the background video starts playing", () => {
      const { container } = render(
        <ExperienceGate>
          <main>Page content</main>
        </ExperienceGate>,
      );
      const video = getVideo(container);

      fireEvent.click(screen.getByRole("button", { name: "Continue" }));

      expect(video.play).toHaveBeenCalled();
    });

    it("Then the welcome screen is hidden", () => {
      const { container } = render(
        <ExperienceGate>
          <main>Page content</main>
        </ExperienceGate>,
      );

      fireEvent.click(screen.getByRole("button", { name: "Continue" }));

      expect(getWelcomeScreen(container)).toHaveAttribute("hidden");
    });
  });
});

describe("Given a visitor already clicked Continue during an earlier page load", () => {
  describe("When the page is loaded again (a fresh mount)", () => {
    it("Then the welcome screen shows again, not persisted from the earlier visit", () => {
      const first = render(
        <ExperienceGate>
          <main>Page content</main>
        </ExperienceGate>,
      );
      fireEvent.click(screen.getByRole("button", { name: "Continue" }));
      expect(getWelcomeScreen(first.container)).toHaveAttribute("hidden");
      first.unmount();

      const second = render(
        <ExperienceGate>
          <main>Page content</main>
        </ExperienceGate>,
      );

      expect(getWelcomeScreen(second.container)).not.toHaveAttribute("hidden");
    });
  });
});
