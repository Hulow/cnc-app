import type { Metadata } from "next";
import { en } from "@/dictionaries/en";
import { siteConfig } from "@/shared/site-config";
import { routes } from "@/shared/routes";

// Handles URLs that match no route at all in either language tree (see
// app/(en) and app/[lang], two independent root layouts — Next has no
// single layout to compose a 404 from otherwise; see the "multiple root
// layouts" note in the layout docs and this file's own convention docs).
// app/(en)/not-found.tsx and app/[lang]/not-found.tsx still exist for an
// explicit notFound() call thrown *within* an already-matched route
// (e.g. a future /projects/[slug] page) — a different case from this
// one. Deliberately lightweight (no video/nav/full globals.css): this
// bypasses the normal layout tree entirely, so anything it needs it
// must import itself, and it's most often hit by dead links or typos.
// The blue/white look below is hand-copied from .welcome-screen/
// .welcome-screen-content/.welcome-screen-text in globals.css (same
// colors/spacing) rather than importing that file, to keep this page's
// own footprint small.
//
// English-only by design: a bad URL under /de/... still lands here
// (there's no separate German tree for unmatched routes), so this shows
// one English version rather than duplicating the copy per language.
export const metadata: Metadata = {
  title: `${siteConfig.name} — Not Found`,
};

const LOGO_COLOR = "#0030ff";

const srOnlyStyle = {
  position: "absolute" as const,
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden" as const,
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap" as const,
  border: 0,
};

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem",
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          color: "#171717",
          background: LOGO_COLOR,
        }}
      >
        {/* Scoped to this page (no globals.css import here — see the
            comment above) so the Continue button gets the same
            default/hover image-swap every other Continue button on the
            site uses. */}
        <style>{`
          .gnf-continue { display: inline-block; position: relative; width: 11.6875rem; aspect-ratio: 187 / 44; }
          .gnf-continue img { position: absolute; inset: 0; width: 100%; height: 100%; transition: opacity 150ms ease; }
          .gnf-continue-hover { opacity: 0; }
          @media (hover: hover) {
            .gnf-continue:hover .gnf-continue-default { opacity: 0; }
            .gnf-continue:hover .gnf-continue-hover { opacity: 1; }
          }
        `}</style>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.25rem",
            width: "100%",
            textAlign: "center",
          }}
        >
          {/* Full-bleed: breaks out to the real viewport width regardless
              of this flex column's own (unconstrained) width, same
              width: 100vw + negative-margin trick as .welcome-screen-text
              in globals.css. */}
          <div
            style={{
              boxSizing: "border-box",
              width: "100vw",
              marginLeft: "calc(50% - 50vw)",
              marginRight: "calc(50% - 50vw)",
              padding: "2rem 1.5rem",
              background: "#fff",
              borderTop: `2px solid ${LOGO_COLOR}`,
              borderBottom: `2px solid ${LOGO_COLOR}`,
            }}
          >
            <div style={{ maxWidth: "40rem", margin: "0 auto" }}>
              {/* Real text node for crawlers/screen readers; the logo (its
                  wordmark already reads "Page Not Found") is the visible
                  content. */}
              <h1 style={srOnlyStyle}>{en.notFound.heading}</h1>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/menu/page_not_found.svg"
                alt=""
                aria-hidden="true"
                width={261}
                height={23}
                style={{ width: "100%", maxWidth: "32rem", height: "auto" }}
              />
            </div>
          </div>
          <a href={routes.home.en} className="gnf-continue" aria-label={en.notFound.homeLinkLabel}>
            {/* eslint-disable @next/next/no-img-element */}
            <img
              src="/welcome/button-continue-default.svg"
              alt=""
              width={187}
              height={44}
              className="gnf-continue-default"
            />
            <img
              src="/welcome/button-continue-active.svg"
              alt=""
              aria-hidden="true"
              width={187}
              height={44}
              className="gnf-continue-hover"
            />
            {/* eslint-enable @next/next/no-img-element */}
          </a>
        </div>
      </body>
    </html>
  );
}
