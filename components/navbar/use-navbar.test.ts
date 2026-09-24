import { afterEach, describe, expect, it } from "vitest";
import { act, cleanup, renderHook } from "@testing-library/react";
import { useNavBar } from "./use-navbar";

const EXIT_ANIMATION_NAME = "site-nav-item-out";
const ENTRANCE_ANIMATION_NAME = "site-nav-item-in";

function renderNavBar() {
  return renderHook(() => useNavBar({ exitAnimationName: EXIT_ANIMATION_NAME }));
}

afterEach(() => {
  cleanup();
});

describe("Given the menu has never been opened", () => {
  describe("When the hook is first rendered", () => {
    it("Then the menu is closed and unmounted", () => {
      const { result } = renderNavBar();

      expect(result.current.isOpen).toBe(false);
      expect(result.current.isRendered).toBe(false);
    });
  });
});

describe("Given the menu is closed", () => {
  describe("When open is called", () => {
    it("Then the menu is marked open and rendered immediately", () => {
      const { result } = renderNavBar();

      act(() => {
        result.current.open();
      });

      expect(result.current.isOpen).toBe(true);
      expect(result.current.isRendered).toBe(true);
    });
  });

  describe("When toggle is called", () => {
    it("Then the menu opens", () => {
      const { result } = renderNavBar();

      act(() => {
        result.current.toggle();
      });

      expect(result.current.isOpen).toBe(true);
      expect(result.current.isRendered).toBe(true);
    });
  });
});

describe("Given the menu is open", () => {
  describe("When close is called", () => {
    it("Then the menu is marked closed but stays rendered", () => {
      const { result } = renderNavBar();

      act(() => {
        result.current.open();
      });
      act(() => {
        result.current.close();
      });

      expect(result.current.isOpen).toBe(false);
      expect(result.current.isRendered).toBe(true);
    });
  });

  describe("When toggle is called", () => {
    it("Then the menu starts closing but stays rendered", () => {
      const { result } = renderNavBar();

      act(() => {
        result.current.open();
      });
      act(() => {
        result.current.toggle();
      });

      expect(result.current.isOpen).toBe(false);
      expect(result.current.isRendered).toBe(true);
    });
  });
});

describe("Given the menu is closing (closed but still rendered)", () => {
  describe("When handleAnimationEnd is called with the exit animation's name", () => {
    it("Then the menu is no longer rendered", () => {
      const { result } = renderNavBar();

      act(() => {
        result.current.open();
      });
      act(() => {
        result.current.close();
      });
      act(() => {
        result.current.handleAnimationEnd(EXIT_ANIMATION_NAME);
      });

      expect(result.current.isRendered).toBe(false);
    });
  });

  describe("When handleAnimationEnd is called with an unrelated animation's name", () => {
    it("Then the menu stays rendered", () => {
      const { result } = renderNavBar();

      act(() => {
        result.current.open();
      });
      act(() => {
        result.current.close();
      });
      act(() => {
        result.current.handleAnimationEnd(ENTRANCE_ANIMATION_NAME);
      });

      expect(result.current.isRendered).toBe(true);
    });
  });
});
