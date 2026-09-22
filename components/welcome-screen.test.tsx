import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { WelcomeScreen } from "./welcome-screen";

afterEach(() => {
  cleanup();
});

describe("Given a visitor is viewing the welcome screen", () => {
  describe("When it renders", () => {
    it("Then both paragraphs of the disclosure copy are shown", () => {
      render(<WelcomeScreen hidden={false} onContinue={() => {}} />);

      expect(
        screen.getByText(
          /This website does not use analytics, advertising, or tracking cookies/,
        ),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/The website is hosted by Vercel and uses Cloudinary/),
      ).toBeInTheDocument();
    });

    it("Then a Continue button is shown", () => {
      render(<WelcomeScreen hidden={false} onContinue={() => {}} />);

      expect(screen.getByRole("button", { name: "Continue" })).toBeInTheDocument();
    });

    it("Then the disclosure text precedes the Continue button in document order", () => {
      const { container } = render(<WelcomeScreen hidden={false} onContinue={() => {}} />);

      const root = container.querySelector(".welcome-screen") as HTMLElement;
      const children = Array.from(root.querySelectorAll("p, button"));
      const tagNames = children.map((el) => el.tagName);

      expect(tagNames.indexOf("BUTTON")).toBeGreaterThan(tagNames.lastIndexOf("P"));
    });
  });

  describe("When the hidden prop is true", () => {
    it("Then the root element carries the hidden attribute", () => {
      const { container } = render(<WelcomeScreen hidden={true} onContinue={() => {}} />);

      expect(container.querySelector(".welcome-screen")).toHaveAttribute("hidden");
    });
  });

  describe("When the hidden prop is false", () => {
    it("Then the root element does not carry the hidden attribute", () => {
      const { container } = render(<WelcomeScreen hidden={false} onContinue={() => {}} />);

      expect(container.querySelector(".welcome-screen")).not.toHaveAttribute("hidden");
    });
  });

  describe("When the user clicks Continue", () => {
    it("Then onContinue is called", () => {
      const onContinue = vi.fn();
      render(<WelcomeScreen hidden={false} onContinue={onContinue} />);

      fireEvent.click(screen.getByRole("button", { name: "Continue" }));

      expect(onContinue).toHaveBeenCalledTimes(1);
    });
  });
});
