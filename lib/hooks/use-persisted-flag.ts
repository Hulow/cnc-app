import { useCallback, useState } from "react";

// Tracks a one-way boolean flag (e.g. "user dismissed X") backed by
// localStorage, so it survives reloads. Read/write are both best-effort:
// storage can be unavailable (private mode, quota, disabled) and callers
// shouldn't have to handle that themselves.
export function usePersistedFlag(key: string): [boolean, () => void] {
  const [flag, setFlag] = useState(() => {
    if (typeof window === "undefined") return false;

    try {
      return window.localStorage.getItem(key) === "1";
    } catch {
      return false;
    }
  });

  const set = useCallback(() => {
    setFlag(true);

    try {
      window.localStorage.setItem(key, "1");
    } catch {
      // Best-effort only — the flag just reverts next visit.
    }
  }, [key]);

  return [flag, set];
}
