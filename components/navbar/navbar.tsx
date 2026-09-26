"use client";

import { useEffect, useRef } from "react";
import { useNavBar } from "./use-navbar";

const MENU_ID = "site-nav-menu";
const EXIT_ANIMATION_NAME = "site-nav-item-out";

// Plain <a> anchors, not next/link: these are same-page hash links, not
// route navigation (matches the mailto: link pattern in Contact). `view`
// is an opaque string PageView maps to a section.
const NAV_LINKS = [
  { href: "#home", label: "Home", view: "logo" },
  { href: "#service", label: "Service", view: "service" },
  { href: "#contact", label: "Contact", view: "contact" },
  { href: "#cnc", label: "Cutting Salon", view: "cutting-salon" },
] as const;

interface NavbarProps {
  currentView?: string;
  onNavigate?: (view: string) => void;
}

// Rendering only: open/closed state and the mount-until-exit-animation-
// finishes lifecycle live in useNavBar.
export function Navbar({ currentView, onNavigate }: NavbarProps) {
  const { isOpen, isRendered, toggle, close, handleAnimationEnd } = useNavBar({
    exitAnimationName: EXIT_ANIMATION_NAME,
  });
  const navRef = useRef<HTMLElement>(null);

  // pointerdown (not click): fires before the toggle button's own click
  // handler would re-open a just-closed menu, and catching it on the way
  // down means a drag that starts inside the menu and ends outside it
  // doesn't count as an outside click.
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (!navRef.current?.contains(event.target as Node)) {
        close();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen, close]);

  return (
    <nav ref={navRef} className="site-nav" aria-label="Main">
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
                aria-current={view === currentView ? "page" : undefined}
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
