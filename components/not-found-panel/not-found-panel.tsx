import Link from "next/link";
import type { Dictionary } from "@/dictionaries/en";

interface NotFoundPanelProps {
  dict: Pick<Dictionary, "notFound">;
  homeHref: string;
}

// Same visual treatment as PrivacyPanel/ImpressumPanel (see those files
// — the old full-screen welcome-screen modal's look, reused as normal
// page content). Shared by both app/(en)/not-found.tsx and
// app/[lang]/not-found.tsx: the 404 page is English-only by design (no
// German copy for it yet), so both render this with the English
// dictionary and the English home route regardless of which language
// section a lost URL falls under.
export function NotFoundPanel({ dict, homeHref }: NotFoundPanelProps) {
  return (
    <section className="privacy-panel">
      <div className="welcome-screen-content">
        <div className="welcome-screen-text">
          {/* Real text node for crawlers/screen readers; the logo (its
              wordmark already reads "Page Not Found") stays the visible
              content, same sr-only + decorative-img split used for the
              card headings in Service/CuttingSalon. */}
          <h1 className="sr-only">{dict.notFound.heading}</h1>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/menu/page_not_found.svg"
            alt=""
            aria-hidden="true"
            width={261}
            height={23}
            className="not-found-logo"
          />
          <p className="sr-only">{dict.notFound.body}</p>
        </div>
        {/* Same Continue graphic the old modal used to dismiss itself —
            here it's a real navigation link back to the home page instead,
            since there's nothing to dismiss on a standalone page. */}
        <Link href={homeHref} className="welcome-screen-continue">
          <span className="welcome-screen-continue-icon-wrap">
            {/* eslint-disable @next/next/no-img-element */}
            <img
              src="/welcome/button-continue-default.svg"
              alt={dict.notFound.homeLinkLabel}
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
