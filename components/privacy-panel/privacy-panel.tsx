import Link from "next/link";
import type { Dictionary } from "@/dictionaries/en";

interface PrivacyPanelProps {
  dict: Pick<Dictionary, "privacy">;
  homeHref: string;
}

// Shared between the English (/privacy) and German (/de/datenschutz)
// pages: the exact look the old full-screen welcome-screen modal had
// (see .privacy-panel/.welcome-screen-content/.welcome-screen-text in
// globals.css), as normal page content instead of a gate.
export function PrivacyPanel({ dict, homeHref }: PrivacyPanelProps) {
  return (
    <section className="privacy-panel">
      {/* Visually hidden: the panel below never showed a heading of its
          own in the old modal — this exists only so the page has a
          real, accessible/indexable title. */}
      <h1 className="sr-only">{dict.privacy.title}</h1>
      <div className="welcome-screen-content">
        <div className="welcome-screen-text">
          {dict.privacy.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        {/* Same Continue graphic the old modal used to dismiss itself —
            here it's a real navigation link back to the site instead,
            since there's nothing to dismiss on a standalone page. */}
        <Link href={homeHref} className="welcome-screen-continue">
          <span className="welcome-screen-continue-icon-wrap">
            {/* eslint-disable @next/next/no-img-element */}
            <img
              src="/welcome/button-continue-default.svg"
              alt={dict.privacy.homeLinkLabel}
              width={187}
              height={44}
              className="welcome-screen-continue-icon welcome-screen-continue-icon-default"
            />
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
        </Link>
      </div>
    </section>
  );
}
