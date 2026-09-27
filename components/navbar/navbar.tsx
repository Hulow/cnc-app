"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { useNavBar } from "./use-navbar";

const MENU_ID = "site-nav-menu";

// Plain <a> anchors, not next/link: these are same-page hash links, not
// route navigation (matches the mailto: link pattern in Contact). `view`
// is an opaque string PageView maps to a section.
const NAV_LINKS = [
  {
    href: "#home",
    label: "Home",
    view: "logo",
    icon: {
      src: "/menu/button-home-default.svg",
      hoverSrc: "/menu/button-home-hover.svg",
      activeSrc: "/menu/button-home-active.svg",
      width: 91,
      height: 21,
    },
  },
  {
    href: "#service",
    label: "Service",
    view: "service",
    icon: {
      src: "/menu/button-service-default.svg",
      hoverSrc: "/menu/button-service-hover.svg",
      activeSrc: "/menu/button-service-active.svg",
      width: 133,
      height: 21,
    },
  },
  {
    href: "#contact",
    label: "Contact",
    view: "contact",
    icon: {
      src: "/menu/button-contact-default.svg",
      hoverSrc: "/menu/button-contact-hover.svg",
      activeSrc: "/menu/button-contact-active.svg",
      width: 149,
      height: 21,
    },
  },
  {
    href: "#cnc",
    label: "Cutting Salon",
    view: "cutting-salon",
    icon: {
      src: "/menu/button-cutting-salon-default.svg",
      hoverSrc: "/menu/button-cutting-salon-hover.svg",
      activeSrc: "/menu/button-cutting-salon-active.svg",
      width: 243,
      height: 21,
    },
  },
] as const;

// The widest item's own ratio (Cutting Salon) — used as a single shared
// scale for every item's height (see .site-nav-icon-wrap in globals.css),
// so if the widest logo has to shrink to fit a narrow screen, every item
// shrinks by that same factor instead of just the one that would
// otherwise overflow.
const MAX_ICON_ASPECT_RATIO = Math.max(
  ...NAV_LINKS.map(({ icon }) => icon.width / icon.height),
);

interface NavbarProps {
  currentView?: string;
  onNavigate?: (view: string) => void;
}

// Rendering only: open/closed state lives in useNavBar. The menu markup
// itself is always rendered (server-renderable — see .site-nav-menu
// below) rather than mounted on open, so it ships in the initial HTML
// and doesn't pay a mount/unmount cost on every toggle.
export function Navbar({ currentView, onNavigate }: NavbarProps) {
  const { isOpen, hasOpened, toggle, close } = useNavBar();
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
        {/* All three stacked and swapped with opacity (see .site-nav-toggle-icon-*
            in globals.css) instead of conditionally rendered, matching the
            menu list's own always-rendered approach — the toggle is
            already permanently mounted (unlike the old menu list), so
            this is purely about the closed-state hover crossfade, not
            server-rendering. close_menu.svg is unchanged (open/closed
            still swaps by data-open, not by hover); button-menu-
            default.svg/-active.svg are the new closed-state icon, with
            -active.svg used as the hover graphic — see the nav icons for
            why (its stroke is the same pink used elsewhere for hover,
            not the "active" pink used for a persistent nav selection). */}
        {/* eslint-disable @next/next/no-img-element */}
        <img
          src="/close_menu.svg"
          alt=""
          width={52}
          height={52}
          className="site-nav-toggle-icon site-nav-toggle-icon-close"
        />
        <img
          src="/menu/button-menu-default.svg"
          alt=""
          width={52}
          height={36}
          className="site-nav-toggle-icon site-nav-toggle-icon-menu-default"
        />
        <img
          src="/menu/button-menu-active.svg"
          alt=""
          width={52}
          height={36}
          className="site-nav-toggle-icon site-nav-toggle-icon-menu-hover"
        />
        {/* eslint-enable @next/next/no-img-element */}
      </button>
      <ul
        id={MENU_ID}
        className="site-nav-menu"
        data-open={isOpen}
        data-has-opened={hasOpened}
        // Excludes the (visually hidden while closed) links from focus
        // and the accessibility tree without unmounting them — the exit
        // animation can still play while inert, since inert doesn't
        // affect painting, only interaction/focus/AT exposure.
        inert={!isOpen}
        style={
          {
            "--site-nav-icon-max-ratio": MAX_ICON_ASPECT_RATIO,
          } as CSSProperties
        }
      >
        {NAV_LINKS.map(({ href, label, view, icon }) => (
          <li key={href}>
            <a
              href={href}
              className="site-nav-icon-link"
              aria-current={view === currentView ? "page" : undefined}
              onClick={(event) => {
                if (view) {
                  event.preventDefault();
                  onNavigate?.(view);
                }
                close();
              }}
            >
              <span
                className="site-nav-icon-wrap"
                style={{ aspectRatio: `${icon.width} / ${icon.height}` }}
              >
                {/* Plain <img>, not next/image: these are already
                    unoptimized SVGs, so Image buys nothing here, and its
                    IntersectionObserver/wrapper overhead isn't worth
                    paying x12 (4 items x 3 states) now that they're
                    always mounted (see the menu's data-has-opened). */}
                {/* eslint-disable @next/next/no-img-element */}
                <img
                  src={icon.src}
                  alt={label}
                  width={icon.width}
                  height={icon.height}
                  className="site-nav-icon site-nav-icon-default"
                />
                <img
                  src={icon.hoverSrc}
                  alt=""
                  aria-hidden="true"
                  width={icon.width}
                  height={icon.height}
                  className="site-nav-icon site-nav-icon-hover"
                />
                <img
                  src={icon.activeSrc}
                  alt=""
                  aria-hidden="true"
                  width={icon.width}
                  height={icon.height}
                  className="site-nav-icon site-nav-icon-active"
                />
                {/* eslint-enable @next/next/no-img-element */}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
