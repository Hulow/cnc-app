import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, renderHook } from "@testing-library/react";
import { usePersistedFlag } from "./use-persisted-flag";

const KEY = "test-flag";

beforeEach(() => {
  window.localStorage.clear();
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("usePersistedFlag", () => {
  it("starts false when nothing is persisted", () => {
    const { result } = renderHook(() => usePersistedFlag(KEY));
    expect(result.current[0]).toBe(false);
  });

  it("starts true when the key was previously persisted", () => {
    window.localStorage.setItem(KEY, "1");
    const { result } = renderHook(() => usePersistedFlag(KEY));
    expect(result.current[0]).toBe(true);
  });

  it("starts false if reading localStorage throws", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    const { result } = renderHook(() => usePersistedFlag(KEY));
    expect(result.current[0]).toBe(false);
  });

  it("flips to true and persists it when set() is called", () => {
    const { result } = renderHook(() => usePersistedFlag(KEY));

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBe(true);
    expect(window.localStorage.getItem(KEY)).toBe("1");
  });

  it("still flips to true even if persisting throws", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("quota exceeded");
    });
    const { result } = renderHook(() => usePersistedFlag(KEY));

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBe(true);
  });
});
