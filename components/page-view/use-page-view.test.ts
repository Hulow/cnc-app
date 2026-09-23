import { describe, expect, it } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { usePageView } from "./use-page-view";

describe("Given the page has just loaded", () => {
  describe("When the hook is first rendered", () => {
    it("Then the logo view is shown", () => {
      const { result } = renderHook(() => usePageView());

      expect(result.current.view).toBe("logo");
    });
  });
});

describe("Given the logo view is showing", () => {
  describe('When navigate is called with "service"', () => {
    it("Then the service view is shown", () => {
      const { result } = renderHook(() => usePageView());

      act(() => {
        result.current.navigate("service");
      });

      expect(result.current.view).toBe("service");
    });
  });

  describe('When navigate is called with "contact"', () => {
    it("Then the contact view is shown", () => {
      const { result } = renderHook(() => usePageView());

      act(() => {
        result.current.navigate("contact");
      });

      expect(result.current.view).toBe("contact");
    });
  });

  describe('When navigate is called with "placeholder"', () => {
    it("Then the placeholder view is shown", () => {
      const { result } = renderHook(() => usePageView());

      act(() => {
        result.current.navigate("placeholder");
      });

      expect(result.current.view).toBe("placeholder");
    });
  });

  describe("When navigate is called with a target that has no view", () => {
    it("Then the logo view stays shown", () => {
      const { result } = renderHook(() => usePageView());

      act(() => {
        result.current.navigate("projects");
      });

      expect(result.current.view).toBe("logo");
    });
  });
});

describe("Given the service view is showing", () => {
  describe('When navigate is called with "contact"', () => {
    it("Then the view switches directly to contact", () => {
      const { result } = renderHook(() => usePageView());

      act(() => {
        result.current.navigate("service");
      });
      act(() => {
        result.current.navigate("contact");
      });

      expect(result.current.view).toBe("contact");
    });
  });

  describe('When navigate is called with "logo"', () => {
    it("Then the logo view is shown again", () => {
      const { result } = renderHook(() => usePageView());

      act(() => {
        result.current.navigate("service");
      });
      act(() => {
        result.current.navigate("logo");
      });

      expect(result.current.view).toBe("logo");
    });
  });
});

describe("Given the contact view is showing", () => {
  describe("When goHome is called", () => {
    it("Then the logo view is shown again", () => {
      const { result } = renderHook(() => usePageView());

      act(() => {
        result.current.navigate("contact");
      });
      act(() => {
        result.current.goHome();
      });

      expect(result.current.view).toBe("logo");
    });
  });
});

describe("Given the logo view is already showing", () => {
  describe("When goHome is called", () => {
    it("Then the logo view stays shown", () => {
      const { result } = renderHook(() => usePageView());

      act(() => {
        result.current.goHome();
      });

      expect(result.current.view).toBe("logo");
    });
  });
});
