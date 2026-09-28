import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { Navbar } from "./navbar";
import { en } from "@/dictionaries/en";
import { de } from "@/dictionaries/de";

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
      render(<Navbar lang="en" dict={en} />);

      expect(screen.getByRole("link", { name: "Service" })).toHaveAttribute(
        "aria-current",
        "page",
      );
    });

    it("Then the other links are not marked as the current page", () => {
      render(<Navbar lang="en" dict={en} />);

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
      render(<Navbar lang="en" dict={en} />);

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
      render(<Navbar lang="en" dict={en} />);

      expect(screen.getByRole("link", { name: "Cutting Salon" })).toHaveAttribute(
        "aria-current",
        "page",
      );
    });
  });
});

describe("Given lang is de and the current route is /de/werkstatt", () => {
  beforeEach(() => {
    usePathname.mockReturnValue("/de/werkstatt");
  });

  describe("When the navbar renders", () => {
    it("Then it uses German labels and hrefs, with Werkstatt marked current", () => {
      render(<Navbar lang="de" dict={de} />);

      const werkstattLink = screen.getByRole("link", { name: "Werkstatt" });
      expect(werkstattLink).toHaveAttribute("href", "/de/werkstatt");
      expect(werkstattLink).toHaveAttribute("aria-current", "page");
      expect(screen.getByRole("link", { name: "Leistungen" })).toHaveAttribute("href", "/de/leistungen");
    });
  });
});
