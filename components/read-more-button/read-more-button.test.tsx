import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { ReadMoreButton } from "./read-more-button";

afterEach(() => {
  cleanup();
});

describe("Given the read more button is rendered", () => {
  describe("When it renders", () => {
    it("Then it is an accessible, keyboard-operable button", () => {
      render(<ReadMoreButton text="Some intro copy." />);

      expect(screen.getByRole("button", { name: "Read more" })).toBeInTheDocument();
    });

    it("Then the overlay is not shown", () => {
      render(<ReadMoreButton text="Some intro copy." />);

      expect(screen.queryByText("Some intro copy.")).not.toBeInTheDocument();
    });
  });

  describe("When the button is clicked", () => {
    it("Then the overlay becomes visible with the given text", () => {
      render(<ReadMoreButton text="Some intro copy." />);

      fireEvent.click(screen.getByRole("button", { name: "Read more" }));

      expect(screen.getByText("Some intro copy.")).toBeInTheDocument();
    });
  });

  describe("When Continue is clicked in the overlay", () => {
    it("Then the overlay is dismissed", () => {
      render(<ReadMoreButton text="Some intro copy." />);

      fireEvent.click(screen.getByRole("button", { name: "Read more" }));
      fireEvent.click(screen.getByRole("button", { name: "Continue" }));

      expect(screen.queryByText("Some intro copy.")).not.toBeInTheDocument();
    });
  });
});
