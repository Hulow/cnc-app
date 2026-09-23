"use client";

import { useState } from "react";

const MENU_ID = "site-nav-menu";

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

  return (
    <nav className="site-nav" aria-label="Main">
      <button
        type="button"
        className="site-nav-toggle"
        aria-expanded={isOpen}
        aria-controls={MENU_ID}
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "Close menu" : "Menu"}
      </button>
      {isOpen && (
        <ul id={MENU_ID} className="site-nav-menu">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a href={href} onClick={() => setIsOpen(false)}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
