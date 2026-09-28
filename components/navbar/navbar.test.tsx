import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { Navbar } from "./navbar";

const { usePathname } = vi.hoisted(() => ({ usePathname: vi.fn() }));

vi.mock("next/navigation", () => ({
  usePathname,
}));

afterEach(() => {
  cleanup();
});

describe("Given the current route is /services", () => {
  beforeEach(() => {
    usePathname.mockReturnValue("/services");
  });

  describe("When the navbar renders", () => {
    it("Then the Service link is marked as the current page", () => {
      render(<Navbar />);

      expect(screen.getByRole("link", { name: "Service" })).toHaveAttribute(
        "aria-current",
        "page",
      );
    });

    it("Then the other links are not marked as the current page", () => {
      render(<Navbar />);

      expect(screen.getByRole("link", { name: "Home" })).not.toHaveAttribute("aria-current");
      expect(screen.getByRole("link", { name: "Contact" })).not.toHaveAttribute("aria-current");
      expect(screen.getByRole("link", { name: "Cutting Salon" })).not.toHaveAttribute(
        "aria-current",
      );
    });
  });
});

describe("Given the current route is /", () => {
  beforeEach(() => {
    usePathname.mockReturnValue("/");
  });

  describe("When the navbar renders", () => {
    it("Then the Home link is marked as the current page", () => {
      render(<Navbar />);

      expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("aria-current", "page");
    });
  });
});

describe("Given the current route is /workshop", () => {
  beforeEach(() => {
    usePathname.mockReturnValue("/workshop");
  });

  describe("When the navbar renders", () => {
    it("Then the Cutting Salon link is marked as the current page", () => {
      render(<Navbar />);

      expect(screen.getByRole("link", { name: "Cutting Salon" })).toHaveAttribute(
        "aria-current",
        "page",
      );
    });
  });
});
