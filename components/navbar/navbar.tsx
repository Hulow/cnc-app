"use client";

import { useEffect } from "react";
import { useNavBar } from "./use-navbar";

const MENU_ID = "site-nav-menu";
const EXIT_ANIMATION_NAME = "site-nav-item-out";

// Plain <a> anchors, not next/link: these are same-page hash links, not
// route navigation (matches the mailto: link pattern in Contact). `view`
// is an opaque string PageView maps to a section — CNC doesn't have its
// own content yet, so it uses the "placeholder" view.
const NAV_LINKS = [
  { href: "#home", label: "Home", view: "logo" },
  { href: "#service", label: "Service", view: "service" },
  { href: "#contact", label: "Contact", view: "contact" },
  { href: "#cnc", label: "CNC", view: "placeholder" },
] as const;

interface NavbarProps {
  onNavigate?: (view: string) => void;
  // Fired whenever the menu opens or closes — lets a page layout react
  // (e.g. make room for the menu overlaying its content) without knowing
  // anything about Navbar's own state or animation lifecycle.
  onOpenChange?: (isOpen: boolean) => void;
}

// Rendering only: open/closed state and the mount-until-exit-animation-
// finishes lifecycle live in useNavBar.
export function Navbar({ onNavigate, onOpenChange }: NavbarProps) {
  const { isOpen, isRendered, toggle, close, handleAnimationEnd } = useNavBar({
    exitAnimationName: EXIT_ANIMATION_NAME,
  });

  useEffect(() => {
    onOpenChange?.(isOpen);
  }, [isOpen, onOpenChange]);

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
          {NAV_LINKS.map(({ href, label, view }) => (
            <li key={href}>
              <a
                href={href}
                onClick={(event) => {
                  if (view) {
                    event.preventDefault();
                    onNavigate?.(view);
                  }
                  close();
                }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
