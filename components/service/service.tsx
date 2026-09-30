import type { CSSProperties } from "react";
import { ReadMoreButton } from "@/components/read-more-button/read-more-button";
import { en } from "@/dictionaries/en";

// Widest heading logo below (quotes-are-based-on.svg, 355x23) — feeds
// .card-heading-logo's shrink formula in globals.css so every heading in
// this grid shrinks by the same factor if the grid gets too narrow for
// this one, instead of only this one shrinking. Keep in sync with the
// img width/height attributes below.
const MAX_LOGO_ASPECT_RATIO = 355 / 23;

// Logo asset per card — same key set as en.services.cards (see the German
// equivalent, components/service/service-de.tsx, which follows the same
// pattern against public/service/*.svg).
const CARD_LOGOS = {
  services: { src: "/service/services.svg", width: 154, height: 23 },
  cuttingServices: { src: "/service/project_size.svg", width: 222, height: 23 },
  quotesAreBasedOn: { src: "/service/quotes-are-based-on.svg", width: 355, height: 23 },
  deliveryOptions: { src: "/service/delivery-options.svg", width: 287, height: 23 },
} as const;

const CARD_ORDER = ["services", "cuttingServices", "quotesAreBasedOn", "deliveryOptions"] as const;

// Server Component: the primary on-page copy, rendered as part of the
// initial HTML response so it's readable independently of the video and
// indexable without client-side JavaScript.
export function Service() {
  const { cards } = en.services;

  return (
    <section aria-labelledby="about-heading">
      <h1 id="about-heading" className="page-title">{en.pages.services.title}</h1>
      <div
        className="service-grid"
        style={
          {
            "--card-heading-logo-max-ratio": MAX_LOGO_ASPECT_RATIO,
          } as CSSProperties
        }
      >
        {CARD_ORDER.map((key) => {
          const { heading, items } = cards[key];
          const logo = CARD_LOGOS[key];
          return (
            <div className="service-card" key={key}>
              <h2>
                {/* Real text node for crawlers/SEO (see P1.3 in SEO-SPEC.md);
                    the SVG stays the visible heading — same technique on
                    every card below. */}
                <span className="sr-only">{heading}</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logo.src}
                  alt=""
                  aria-hidden="true"
                  width={logo.width}
                  height={logo.height}
                  className="card-heading-logo"
                />
              </h2>
              <ul>
                {items.map((item) => (
                  <li className="service-item" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <div className="read-more-end">
        {/* TODO: owner copy — see dictionaries/en.ts's intro.services comment */}
        <ReadMoreButton text={en.intro.services} />
      </div>
    </section>
  );
}
