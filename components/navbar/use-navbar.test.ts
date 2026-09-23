import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, renderHook } from "@testing-library/react";
import { useNavBar } from "./use-navbar";

const ITEM_COUNT = 4;
const STAGGER_MS = 100;
const EXIT_ANIMATION_NAME = "site-nav-item-out";
const ENTRANCE_ANIMATION_NAME = "site-nav-item-in";

function renderNavBar() {
  return renderHook(() =>
    useNavBar({
      itemCount: ITEM_COUNT,
      exitAnimationName: EXIT_ANIMATION_NAME,
      staggerMs: STAGGER_MS,
    }),
  );
}

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("Given the menu has never been opened", () => {
  describe("When the hook is first rendered", () => {
    it("Then the menu is closed, unmounted, and no items are visible", () => {
      const { result } = renderNavBar();

      expect(result.current.isOpen).toBe(false);
      expect(result.current.isRendered).toBe(false);
      expect(result.current.visibleCount).toBe(0);
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

    it("Then no items are visible until the stagger interval elapses", () => {
      const { result } = renderNavBar();

      act(() => {
        result.current.open();
      });

      expect(result.current.visibleCount).toBe(0);
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

describe("Given the menu was just opened", () => {
  describe("When the stagger delay for each item elapses in turn", () => {
    it("Then items become visible one at a time, in order", () => {
      const { result } = renderNavBar();

      act(() => {
        result.current.open();
      });

      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(result.current.visibleCount).toBe(1);

      act(() => {
        vi.advanceTimersByTime(STAGGER_MS);
      });
      expect(result.current.visibleCount).toBe(2);

      act(() => {
        vi.advanceTimersByTime(STAGGER_MS);
      });
      expect(result.current.visibleCount).toBe(3);

      act(() => {
        vi.advanceTimersByTime(STAGGER_MS);
      });
      expect(result.current.visibleCount).toBe(4);
    });
  });

  describe("When enough time passes for every item's delay to elapse", () => {
    it("Then every item ends up visible", () => {
      const { result } = renderNavBar();

      act(() => {
        result.current.open();
      });
      act(() => {
        vi.advanceTimersByTime(ITEM_COUNT * STAGGER_MS);
      });

      expect(result.current.visibleCount).toBe(ITEM_COUNT);
    });
  });
});

describe("Given the menu was closed before every item had appeared", () => {
  describe("When the remaining stagger delays elapse", () => {
    it("Then no further items become visible", () => {
      const { result } = renderNavBar();

      act(() => {
        result.current.open();
      });
      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(result.current.visibleCount).toBe(1);

      act(() => {
        result.current.close();
      });

      act(() => {
        vi.advanceTimersByTime(ITEM_COUNT * STAGGER_MS);
      });

      expect(result.current.visibleCount).toBe(1);
    });
  });
});

describe("Given the menu is fully open", () => {
  describe("When close is called", () => {
    it("Then the menu is marked closed but stays rendered", () => {
      const { result } = renderNavBar();

      act(() => {
        result.current.open();
      });
      act(() => {
        vi.advanceTimersByTime(ITEM_COUNT * STAGGER_MS);
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
        vi.advanceTimersByTime(ITEM_COUNT * STAGGER_MS);
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
        vi.advanceTimersByTime(ITEM_COUNT * STAGGER_MS);
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
        vi.advanceTimersByTime(ITEM_COUNT * STAGGER_MS);
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

describe("Given the menu was closed while items were still appearing", () => {
  describe("When it is opened again", () => {
    it("Then the visible item count resets and the stagger restarts from the beginning", () => {
      const { result } = renderNavBar();

      act(() => {
        result.current.open();
      });
      act(() => {
        vi.advanceTimersByTime(STAGGER_MS + 1);
      });
      expect(result.current.visibleCount).toBe(2);

      act(() => {
        result.current.close();
      });

      act(() => {
        result.current.open();
      });
      expect(result.current.visibleCount).toBe(0);

      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(result.current.visibleCount).toBe(1);
    });
  });
});

describe("Given the menu is open with pending stagger timers", () => {
  describe("When the consuming component unmounts", () => {
    it("Then no state update leaks after unmount", () => {
      const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      const { result, unmount } = renderNavBar();

      act(() => {
        result.current.open();
      });

      unmount();

      act(() => {
        vi.advanceTimersByTime(ITEM_COUNT * STAGGER_MS);
      });

      expect(errorSpy).not.toHaveBeenCalled();
    });
  });
});
