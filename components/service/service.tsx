import type { CSSProperties } from "react";
import { ReadMoreButton } from "@/components/read-more-button/read-more-button";
import { en } from "@/dictionaries/en";

// Widest heading logo below (quotes-are-based-on.svg, 355x23) — feeds
// .card-heading-logo's shrink formula in globals.css so every heading in
// this grid shrinks by the same factor if the grid gets too narrow for
// this one, instead of only this one shrinking. Keep in sync with the
// img width/height attributes below.
const MAX_LOGO_ASPECT_RATIO = 355 / 23;

// Server Component: the primary on-page copy, rendered as part of the
// initial HTML response so it's readable independently of the video and
// indexable without client-side JavaScript.
export function Service() {
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
        <div className="service-card">
          <h2>
            {/* Real text node for crawlers/SEO (see P1.3 in SEO-SPEC.md);
                the SVG stays the visible heading — same technique on
                every card below. */}
            <span className="sr-only">Services Can Include</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/service/services.svg"
              alt=""
              aria-hidden="true"
              width={154}
              height={23}
              className="card-heading-logo"
            />
          </h2>
          <ul>
            <li className="service-item">CAD & design</li>
            <li className="service-item">CNC machining</li>
            <li className="service-item">Assembly & finishing</li>
          </ul>
        </div>

        <div className="service-card">
          <h2>
            <span className="sr-only">Cutting Services</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/service/project_size.svg"
              alt=""
              aria-hidden="true"
              width={222}
              height={23}
              className="card-heading-logo"
            />
          </h2>
          <ul>
            <li className="service-item">Prototypes</li>
            <li className="service-item">Unique products</li>
            <li className="service-item">Small production series</li>
          </ul>
        </div>

        <div className="service-card">
          <h2>
            <span className="sr-only">Quotes Are Based On</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/service/quotes-are-based-on.svg"
              alt=""
              aria-hidden="true"
              width={355}
              height={23}
              className="card-heading-logo"
            />
          </h2>
          <ul>
            <li className="service-item">Material</li>
            <li className="service-item">Size & quantity</li>
            <li className="service-item">Design complexity</li>
          </ul>
        </div>

        <div className="service-card">
          <h2>
            <span className="sr-only">Delivery Options</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/service/delivery-options.svg"
              alt=""
              aria-hidden="true"
              width={287}
              height={23}
              className="card-heading-logo"
            />
          </h2>
          <ul>
            <li className="service-item">Workshop pickup</li>
            <li className="service-item">Shipping</li>
          </ul>
        </div>
      </div>
      <div className="read-more-end">
        {/* TODO: owner copy — see dictionaries/en.ts's intro.services comment */}
        <ReadMoreButton text={en.intro.services} />
      </div>
    </section>
  );
}
