import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { ContactButton } from "./contact-button";

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn());
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("Given the contact button is rendered", () => {
  describe("When it renders", () => {
    it("Then it is an accessible, keyboard-operable button", () => {
      render(<ContactButton />);

      expect(screen.getByRole("button", { name: "Send a message" })).toBeInTheDocument();
    });

    it("Then the form is not shown", () => {
      render(<ContactButton />);

      expect(screen.queryByLabelText("First name")).not.toBeInTheDocument();
    });
  });

  describe("When the button is clicked", () => {
    it("Then the form becomes visible", () => {
      render(<ContactButton />);

      fireEvent.click(screen.getByRole("button", { name: "Send a message" }));

      expect(screen.getByLabelText("First name")).toBeInTheDocument();
    });

    it("Then no request is sent just from opening it", () => {
      render(<ContactButton />);

      fireEvent.click(screen.getByRole("button", { name: "Send a message" }));

      expect(fetch).not.toHaveBeenCalled();
    });
  });

  describe("When the button is clicked a second time", () => {
    it("Then the form is hidden again", () => {
      render(<ContactButton />);

      fireEvent.click(screen.getByRole("button", { name: "Send a message" }));
      fireEvent.click(screen.getByRole("button", { name: "Close contact form" }));

      expect(screen.queryByLabelText("First name")).not.toBeInTheDocument();
    });
  });
});
