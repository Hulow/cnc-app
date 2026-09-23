"use client";

import { useEffect, useState, type AnimationEvent } from "react";

const MENU_ID = "site-nav-menu";
const STAGGER_MS = 100;

// Plain <a> anchors, not next/link: these are same-page hash links, not
// route navigation (matches the mailto: link pattern in Contact).
const NAV_LINKS = [
  { href: "#service", label: "Service" },
  { href: "#contact", label: "Contact" },
  { href: "#projects", label: "Projects" },
  { href: "#cnc", label: "CNC" },
] as const;

// Purely a visibility toggle, same pattern as ContactButton: opening the
// menu has no side effects of its own.
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  // Stays true through the close animation: React would otherwise unmount
  // <ul> the instant isOpen flips false, before the exit animation (CSS,
  // keyed off isOpen via [data-open]) has a chance to play.
  const [isRendered, setIsRendered] = useState(false);
  // How many items are actually mounted so far while opening — items are
  // added to the DOM one at a time (not all four at once with only their
  // opacity staggered), so the list genuinely grows incrementally.
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    const timers = NAV_LINKS.map((_, index) =>
      setTimeout(
        () => setVisibleCount((count) => Math.max(count, index + 1)),
        index * STAGGER_MS,
      ),
    );
    return () => timers.forEach(clearTimeout);
  }, [isOpen]);

  function openMenu() {
    setVisibleCount(0);
    setIsRendered(true);
    setIsOpen(true);
  }

  function closeMenu() {
    setIsOpen(false);
  }

  function handleMenuAnimationEnd(event: AnimationEvent<HTMLUListElement>) {
    if (event.animationName === "site-nav-item-out") {
      setIsRendered(false);
    }
  }

  return (
    <nav className="site-nav" aria-label="Main">
      <button
        type="button"
        className="site-nav-toggle"
        data-open={isOpen}
        aria-expanded={isOpen}
        aria-controls={MENU_ID}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={() => (isOpen ? closeMenu() : openMenu())}
      >
        <span className="site-nav-toggle-bar" />
        <span className="site-nav-toggle-bar" />
      </button>
      {isRendered && (
        <ul
          id={MENU_ID}
          className="site-nav-menu"
          data-open={isOpen}
          onAnimationEnd={handleMenuAnimationEnd}
        >
          {NAV_LINKS.slice(0, isOpen ? visibleCount : NAV_LINKS.length).map(
            ({ href, label }) => (
              <li key={href}>
                <a href={href} onClick={closeMenu}>
                  {label}
                </a>
              </li>
            ),
          )}
        </ul>
      )}
    </nav>
  );
}
