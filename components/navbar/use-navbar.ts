import { useState } from "react";

interface UseNavBarResult {
  isOpen: boolean;
  // Whether the menu has ever been opened. The menu markup is always
  // rendered now (server-renderable — see navbar.tsx), so this instead
  // tells the caller's CSS whether to play the close animation: before
  // the first open there's nothing to animate away from, so the caller
  // can render statically hidden instead of firing a transition on
  // mount — see .site-nav-menu li in globals.css.
  hasOpened: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

// State machine behind an open/close menu. Knows nothing about what gets
// rendered, what the items are, or any actual CSS — see navbar.tsx.
export function useNavBar(): UseNavBarResult {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  function open() {
    setHasOpened(true);
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  function toggle() {
    if (isOpen) {
      close();
    } else {
      open();
    }
  }

  return { isOpen, hasOpened, open, close, toggle };
}
