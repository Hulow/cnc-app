import { useState } from "react";

export type PageViewName = "logo" | "service" | "contact";

// Targets a nav item is allowed to switch to. "logo" is intentionally
// excluded — there's no nav item that links back to it, only goHome.
const NAVIGABLE_VIEWS: readonly PageViewName[] = ["service", "contact"];

const DEFAULT_VIEW: PageViewName = "logo";

interface UsePageViewResult {
  view: PageViewName;
  // Forward Navbar's onNavigate target here — an opaque string as far as
  // this hook is concerned. Unrecognized targets (e.g. "projects", which
  // has no view yet) are ignored, leaving the current view unchanged.
  navigate: (target: string) => void;
  // Returns to the default view — e.g. wired to ContactForm's onClose.
  goHome: () => void;
}

// Single-view state machine behind the page: exactly one section is
// "current" at a time, defaulting to "logo". Knows nothing about what
// gets rendered for each view or how navigation is triggered — see
// page-view.tsx.
export function usePageView(): UsePageViewResult {
  const [view, setView] = useState<PageViewName>(DEFAULT_VIEW);

  function navigate(target: string) {
    if ((NAVIGABLE_VIEWS as readonly string[]).includes(target)) {
      setView(target as PageViewName);
    }
  }

  function goHome() {
    setView(DEFAULT_VIEW);
  }

  return { view, navigate, goHome };
}
