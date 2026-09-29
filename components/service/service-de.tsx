import type { CSSProperties } from "react";
import type { Dictionary } from "@/dictionaries/en";
import { ReadMoreButton } from "@/components/read-more-button/read-more-button";

interface ServiceDeProps {
  dict: Pick<Dictionary, "services" | "pages" | "intro">;
}

// Widest heading logo below (angebot-basieren-auf.svg, 385x23) — feeds
// .card-heading-logo's shrink formula in globals.css so every heading in
// this grid shrinks by the same factor if the grid gets too narrow for
// this one, instead of only this one shrinking. Keep in sync with the
// img width/height attributes below.
const MAX_LOGO_ASPECT_RATIO = 385 / 23;

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
        <div className="service-card">
          <h2>
            {/* Real text node for crawlers/SEO (see P1.3 in SEO-SPEC.md);
                the SVG stays the visible heading — same technique on
                every card below. */}
            <span className="sr-only">{cards.servicesCanInclude.heading}</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/service/leistungen.svg"
              alt=""
              aria-hidden="true"
              width={190}
              height={23}
              className="card-heading-logo"
            />
          </h2>
          <ul>
            {cards.servicesCanInclude.items.map((item) => (
              <li className="service-item" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="service-card">
          <h2>
            <span className="sr-only">{cards.cuttingServices.heading}</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/service/projektumfang.svg"
              alt=""
              aria-hidden="true"
              width={270}
              height={23}
              className="card-heading-logo"
            />
          </h2>
          <ul>
            {cards.cuttingServices.items.map((item) => (
              <li className="service-item" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="service-card">
          <h2>
            <span className="sr-only">{cards.quotesAreBasedOn.heading}</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/service/angebot-basieren-auf.svg"
              alt=""
              aria-hidden="true"
              width={385}
              height={23}
              className="card-heading-logo"
            />
          </h2>
          <ul>
            {cards.quotesAreBasedOn.items.map((item) => (
              <li className="service-item" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="service-card">
          <h2>
            <span className="sr-only">{cards.deliveryOptions.heading}</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/service/lieferoptionen.svg"
              alt=""
              aria-hidden="true"
              width={254}
              height={23}
              className="card-heading-logo"
            />
          </h2>
          <ul>
            {cards.deliveryOptions.items.map((item) => (
              <li className="service-item" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="read-more-end">
        {/* TODO: owner copy — see dictionaries/de.ts's intro.services comment */}
        <ReadMoreButton text={dict.intro.services} />
      </div>
    </section>
  );
}
