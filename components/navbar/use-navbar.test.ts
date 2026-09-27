import { afterEach, describe, expect, it } from "vitest";
import { act, cleanup, renderHook } from "@testing-library/react";
import { useNavBar } from "./use-navbar";

function renderNavBar() {
  return renderHook(() => useNavBar());
}

afterEach(() => {
  cleanup();
});

describe("Given the menu has never been opened", () => {
  describe("When the hook is first rendered", () => {
    it("Then the menu is closed and has never opened", () => {
      const { result } = renderNavBar();

      expect(result.current.isOpen).toBe(false);
      expect(result.current.hasOpened).toBe(false);
    });
  });
});

describe("Given the menu is closed", () => {
  describe("When open is called", () => {
    it("Then the menu is marked open and has opened", () => {
      const { result } = renderNavBar();

      act(() => {
        result.current.open();
      });

      expect(result.current.isOpen).toBe(true);
      expect(result.current.hasOpened).toBe(true);
    });
  });

  describe("When toggle is called", () => {
    it("Then the menu opens", () => {
      const { result } = renderNavBar();

      act(() => {
        result.current.toggle();
      });

      expect(result.current.isOpen).toBe(true);
      expect(result.current.hasOpened).toBe(true);
    });
  });
});

describe("Given the menu is open", () => {
  describe("When close is called", () => {
    it("Then the menu is marked closed but stays marked as having opened", () => {
      const { result } = renderNavBar();

      act(() => {
        result.current.open();
      });
      act(() => {
        result.current.close();
      });

      expect(result.current.isOpen).toBe(false);
      expect(result.current.hasOpened).toBe(true);
    });
  });

  describe("When toggle is called", () => {
    it("Then the menu closes but stays marked as having opened", () => {
      const { result } = renderNavBar();

      act(() => {
        result.current.open();
      });
      act(() => {
        result.current.toggle();
      });

      expect(result.current.isOpen).toBe(false);
      expect(result.current.hasOpened).toBe(true);
    });
  });
});
