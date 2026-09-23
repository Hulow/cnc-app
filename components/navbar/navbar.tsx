"use client";

import { useNavBar } from "./use-navbar";

const MENU_ID = "site-nav-menu";
const EXIT_ANIMATION_NAME = "site-nav-item-out";

// Plain <a> anchors, not next/link: these are same-page hash links, not
// route navigation (matches the mailto: link pattern in Contact).
const NAV_LINKS = [
  { href: "#service", label: "Service" },
  { href: "#contact", label: "Contact" },
  { href: "#projects", label: "Projects" },
  { href: "#cnc", label: "CNC" },
] as const;

// Rendering only: open/closed state, the stagger, and the mount-until-
// exit-animation-finishes lifecycle all live in useNavBar.
export function Navbar() {
  const { isOpen, isRendered, visibleCount, toggle, close, handleAnimationEnd } = useNavBar({
    itemCount: NAV_LINKS.length,
    exitAnimationName: EXIT_ANIMATION_NAME,
  });

  return (
    <nav className="site-nav" aria-label="Main">
      <button
        type="button"
        className="site-nav-toggle"
        data-open={isOpen}
        aria-expanded={isOpen}
        aria-controls={MENU_ID}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={toggle}
      >
        <span className="site-nav-toggle-bar" />
        <span className="site-nav-toggle-bar" />
      </button>
      {isRendered && (
        <ul
          id={MENU_ID}
          className="site-nav-menu"
          data-open={isOpen}
          onAnimationEnd={(event) => handleAnimationEnd(event.animationName)}
        >
          {NAV_LINKS.slice(0, isOpen ? visibleCount : NAV_LINKS.length).map(
            ({ href, label }) => (
              <li key={href}>
                <a href={href} onClick={close}>
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
