import Image from "next/image";
import type { CSSProperties } from "react";
import type { Dictionary } from "@/dictionaries/en";
import { ReadMoreButton } from "@/components/read-more-button/read-more-button";

interface CuttingSalonDeProps {
  dict: Pick<Dictionary, "workshop" | "pages" | "readMore">;
}

// Widest heading logo below (maschinenleistung.svg, 322x23) — feeds
// .card-heading-logo's shrink formula in globals.css so every heading in
// this grid shrinks by the same factor if the grid gets too narrow for
// this one, instead of only this one shrinking. Keep in sync with the
// img width/height attributes below.
const MAX_LOGO_ASPECT_RATIO = 322 / 23;

// German equivalent of CuttingSalon (components/cutting-salon/cutting-salon.tsx),
// now that German heading logos exist (public/salon/*.svg) — see P1.1 in
// SEO-SPEC.md.
export function CuttingSalonDe({ dict }: CuttingSalonDeProps) {
  const { cards, imageAlt } = dict.workshop;

  return (
    <section aria-labelledby="cutting-salon-heading">
      <h1 id="cutting-salon-heading" className="page-title">{dict.pages.workshop.title}</h1>
      <div
        className="cutting-salon-grid"
        style={
          {
            "--card-heading-logo-max-ratio": MAX_LOGO_ASPECT_RATIO,
          } as CSSProperties
        }
      >
        <div className="cutting-salon-card">
          <h2>
            {/* Real text node for crawlers/SEO (see P1.3 in
                SEO-SPEC.md); the SVG stays the visible heading — same
                technique on every card below. */}
            <span className="sr-only">{cards.machineCapabilities.heading}</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/salon/maschinenleistung.svg"
              alt=""
              aria-hidden="true"
              width={322}
              height={23}
              className="card-heading-logo"
            />
          </h2>
          <ul>
            {cards.machineCapabilities.items.map((item) => (
              <li className="cutting-salon-item" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="cutting-salon-card">
          <h2>
            <span className="sr-only">{cards.materials.heading}</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/salon/materialen.svg"
              alt=""
              aria-hidden="true"
              width={197}
              height={23}
              className="card-heading-logo"
            />
          </h2>
          <ul>
            {cards.materials.items.map((item) => (
              <li className="cutting-salon-item" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="cutting-salon-card">
          <h2>
            <span className="sr-only">{cards.applications.heading}</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/salon/anwendungen.svg"
              alt=""
              aria-hidden="true"
              width={229}
              height={23}
              className="card-heading-logo"
            />
          </h2>
          <ul>
            {cards.applications.items.map((item) => (
              <li className="cutting-salon-item" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="cutting-salon-card">
          <h2>
            <span className="sr-only">{cards.technology.heading}</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/salon/technologie.svg"
              alt=""
              aria-hidden="true"
              width={204}
              height={23}
              className="card-heading-logo"
            />
          </h2>
          <ul>
            {cards.technology.items.map((item) => (
              <li className="cutting-salon-item" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Image
        src="/cnc.jpg"
        alt={imageAlt}
        width={2400}
        height={1800}
        // Matches .cutting-salon-image's own width: 100% within
        // .content-layer's responsive width steps (see globals.css) —
        // 90% of viewport below 576px, 70% (capped at the 75rem/1200px
        // container max-width) from 576px up — so next/image requests
        // an appropriately-sized variant instead of always the largest.
        sizes="(min-width: 576px) 70vw, 90vw"
        className="cutting-salon-image"
      />
      <div className="read-more-end">
        {/* TODO: owner copy — see dictionaries/de.ts's readMore.workshop comment */}
        <ReadMoreButton text={dict.readMore.workshop} />
      </div>
    </section>
  );
}
