import type { CSSProperties } from "react";
import type { Dictionary } from "@/dictionaries/en";
import { ReadMoreButton } from "@/components/read-more-button/read-more-button";

interface ServiceDeProps {
  dict: Pick<Dictionary, "services" | "pages" | "readMore">;
}

// Widest heading logo below (angebot-basieren-auf.svg, 385x23) — feeds
// .card-heading-logo's shrink formula in globals.css so every heading in
// this grid shrinks by the same factor if the grid gets too narrow for
// this one, instead of only this one shrinking. Keep in sync with the
// img width/height attributes below.
const MAX_LOGO_ASPECT_RATIO = 385 / 23;

// Logo asset per card — same key set as dict.services.cards (see the
// English equivalent, components/service/service.tsx, which follows the
// same pattern against public/service/*.svg).
const CARD_LOGOS = {
  services: { src: "/service/leistungen.svg", width: 190, height: 23 },
  cuttingServices: { src: "/service/projektumfang.svg", width: 270, height: 23 },
  quotesAreBasedOn: { src: "/service/angebot-basieren-auf.svg", width: 385, height: 23 },
  deliveryOptions: { src: "/service/lieferoptionen.svg", width: 254, height: 23 },
} as const;

const CARD_ORDER = ["services", "cuttingServices", "quotesAreBasedOn", "deliveryOptions"] as const;

// German equivalent of Service (components/service/service.tsx), now
// that German heading logos exist (public/service/*.svg) — see P1.1 in
// SEO-SPEC.md.
export function ServiceDe({ dict }: ServiceDeProps) {
  const { cards } = dict.services;

  return (
    <section aria-labelledby="about-heading">
      <h1 id="about-heading" className="page-title">{dict.pages.services.title}</h1>
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
        {/* TODO: owner copy — see dictionaries/de.ts's readMore.services comment */}
        <ReadMoreButton text={dict.readMore.services} />
      </div>
    </section>
  );
}
