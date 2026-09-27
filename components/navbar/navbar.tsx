"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useNavBar } from "./use-navbar";

const MENU_ID = "site-nav-menu";
const EXIT_ANIMATION_NAME = "site-nav-item-out";

// Plain <a> anchors, not next/link: these are same-page hash links, not
// route navigation (matches the mailto: link pattern in Contact). `view`
// is an opaque string PageView maps to a section.
const NAV_LINKS = [
  {
    href: "#home",
    label: "Home",
    view: "logo",
    icon: {
      src: "/button-home-default.svg",
      hoverSrc: "/button-home-hover.svg",
      activeSrc: "/button-home-active.svg",
      width: 91,
      height: 21,
    },
  },
  {
    href: "#service",
    label: "Service",
    view: "service",
    icon: {
      src: "/button-service-default.svg",
      hoverSrc: "/button-service-hover.svg",
      activeSrc: "/button-service-active.svg",
      width: 133,
      height: 21,
    },
  },
  {
    href: "#contact",
    label: "Contact",
    view: "contact",
    icon: {
      src: "/button-contact-default.svg",
      hoverSrc: "/button-contact-hover.svg",
      activeSrc: "/button-contact-active.svg",
      width: 149,
      height: 21,
    },
  },
  {
    href: "#cnc",
    label: "Cutting Salon",
    view: "cutting-salon",
    icon: {
      src: "/button-cutting-salon-default.svg",
      hoverSrc: "/button-cutting-salon-hover.svg",
      activeSrc: "/button-cutting-salon-active.svg",
      width: 243,
      height: 21,
    },
  },
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
        <Image
          src={isOpen ? "/close_menu.svg" : "/open_menu.svg"}
          alt=""
          width={32}
          height={32}
          unoptimized
          className="site-nav-toggle-icon"
        />
      </button>
      {isRendered && (
        <ul
          id={MENU_ID}
          className="site-nav-menu"
          data-open={isOpen}
          onAnimationEnd={(event) => handleAnimationEnd(event.animationName)}
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
                  <Image
                    src={icon.src}
                    alt={label}
                    width={icon.width}
                    height={icon.height}
                    unoptimized
                    className="site-nav-icon site-nav-icon-default"
                  />
                  <Image
                    src={icon.hoverSrc}
                    alt=""
                    aria-hidden="true"
                    width={icon.width}
                    height={icon.height}
                    unoptimized
                    className="site-nav-icon site-nav-icon-hover"
                  />
                  <Image
                    src={icon.activeSrc}
                    alt=""
                    aria-hidden="true"
                    width={icon.width}
                    height={icon.height}
                    unoptimized
                    className="site-nav-icon site-nav-icon-active"
                  />
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
