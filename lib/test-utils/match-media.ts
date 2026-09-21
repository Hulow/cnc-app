import { vi } from "vitest";

export interface MatchMediaMock {
  matches: boolean;
  media: string;
  addEventListener: ReturnType<typeof vi.fn>;
  removeEventListener: ReturnType<typeof vi.fn>;
  dispatchChange: (matches: boolean) => void;
}

export function mockMatchMedia(initialMatches: boolean): MatchMediaMock {
  const listeners = new Set<(event: { matches: boolean }) => void>();

  const mql: MatchMediaMock = {
    matches: initialMatches,
    media: "(prefers-reduced-motion: reduce)",
    addEventListener: vi.fn((event: string, cb: (e: { matches: boolean }) => void) => {
      if (event === "change") listeners.add(cb);
    }),
    removeEventListener: vi.fn((event: string, cb: (e: { matches: boolean }) => void) => {
      if (event === "change") listeners.delete(cb);
    }),
    dispatchChange(matches: boolean) {
      mql.matches = matches;
      listeners.forEach((cb) => cb({ matches }));
    },
  };

  window.matchMedia = vi.fn().mockReturnValue(mql) as unknown as typeof window.matchMedia;

  return mql;
}
