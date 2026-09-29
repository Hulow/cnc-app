import type { Dictionary } from "@/dictionaries/en";
import { ContinueLink } from "./continue-link";

interface PrivacyPanelProps {
  dict: Pick<Dictionary, "privacy">;
  homeHref: string;
  logoSrc: string;
  logoWidth: number;
  logoHeight: number;
}

// Shared between the English (/privacy) and German (/de/datenschutz)
// pages: the exact look the old full-screen welcome-screen modal had
// (see .privacy-panel/.welcome-screen-content/.welcome-screen-text in
// globals.css), as normal page content instead of a gate.
export function PrivacyPanel({
  dict,
  homeHref,
  logoSrc,
  logoWidth,
  logoHeight,
}: PrivacyPanelProps) {
  return (
    <section className="privacy-panel">
      <div className="welcome-screen-content">
        <div className="welcome-screen-text">
          {/* Real text node for crawlers/screen readers; the logo stays
              the visible content, same sr-only + decorative-img split
              NotFoundPanel uses for its own wordmark. */}
          <h1 className="sr-only">{dict.privacy.title}</h1>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc}
            alt=""
            aria-hidden="true"
            width={logoWidth}
            height={logoHeight}
            className="legal-panel-logo"
          />
          {dict.privacy.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        {/* Same Continue graphic the old modal used to dismiss itself —
            here it's a real navigation link back to the site instead,
            since there's nothing to dismiss on a standalone page. */}
        <ContinueLink href={homeHref} label={dict.privacy.homeLinkLabel} />
      </div>
    </section>
  );
}
