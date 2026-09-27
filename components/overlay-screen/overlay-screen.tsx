import type { ReactNode } from "react";

interface OverlayScreenProps {
  hidden?: boolean;
  buttonLabel: string;
  onButtonClick: () => void;
  children: ReactNode;
}

// Shared shell behind WelcomeScreen and HelpOverlay: a full-screen, centered
// dialog over the .welcome-screen backdrop, with a text block and a single
// action button. Callers own their own copy and button behavior. Both
// callers currently pass buttonLabel="Continue", which is also the image's
// alt text (see below) — a different label would still work visually
// (the graphic doesn't change), but would read oddly to screen readers,
// since button-continue-*.svg is baked in either way.
export function OverlayScreen({ hidden = false, buttonLabel, onButtonClick, children }: OverlayScreenProps) {
  return (
    <div className="welcome-screen" role="dialog" aria-modal="true" hidden={hidden}>
      <div className="welcome-screen-content">
        <div className="welcome-screen-text">{children}</div>
        <button type="button" className="welcome-screen-continue" onClick={onButtonClick}>
          <span className="welcome-screen-continue-icon-wrap">
            {/* Plain <img>, not next/image — see the nav icons in Navbar
                for why: these are already unoptimized SVGs, so Image
                buys nothing here. */}
            {/* eslint-disable @next/next/no-img-element */}
            <img
              src="/welcome/button-continue-default.svg"
              alt={buttonLabel}
              width={187}
              height={44}
              className="welcome-screen-continue-icon welcome-screen-continue-icon-default"
            />
            {/* button-continue-active.svg is the pink asset for this set
                (its stroke matches the *-hover.svg pink used elsewhere,
                not the "active" pink used for a persistent nav
                selection) — there's no separate button-continue-
                hover.svg, so this is the hover graphic. */}
            <img
              src="/welcome/button-continue-active.svg"
              alt=""
              aria-hidden="true"
              width={187}
              height={44}
              className="welcome-screen-continue-icon welcome-screen-continue-icon-hover"
            />
            {/* eslint-enable @next/next/no-img-element */}
          </span>
        </button>
      </div>
    </div>
  );
}
