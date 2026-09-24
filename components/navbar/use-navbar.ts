import { useState } from "react";

interface UseNavBarOptions {
  // Name of the CSS exit animation, as it will show up on the
  // AnimationEvent the caller forwards to handleAnimationEnd — an opaque
  // string as far as this hook is concerned, just something to compare
  // against, not a stylesheet it knows about.
  exitAnimationName: string;
}

interface UseNavBarResult {
  isOpen: boolean;
  // Whether the menu should still be in the DOM. Stays true through the
  // close animation: the caller would otherwise unmount it the instant
  // isOpen flips false, before that animation gets a chance to play.
  isRendered: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  // Forward an AnimationEvent's animationName here (e.g. from an
  // onAnimationEnd on whatever element actually plays the exit
  // animation); once it matches exitAnimationName, isRendered flips false.
  handleAnimationEnd: (animationName: string) => void;
}

// State machine behind an open/close menu with a mount-until-exit-
// animation-finishes lifecycle. Knows nothing about what gets rendered,
// what the items are, or any actual CSS — see navbar.tsx.
export function useNavBar({ exitAnimationName }: UseNavBarOptions): UseNavBarResult {
  const [isOpen, setIsOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  function open() {
    setIsRendered(true);
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

  function handleAnimationEnd(animationName: string) {
    if (animationName === exitAnimationName) {
      setIsRendered(false);
    }
  }

  return { isOpen, isRendered, open, close, toggle, handleAnimationEnd };
}
