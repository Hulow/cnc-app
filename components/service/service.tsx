import type { CSSProperties } from "react";

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
      <div
        className="service-grid"
        style={
          {
            "--card-heading-logo-max-ratio": MAX_LOGO_ASPECT_RATIO,
          } as CSSProperties
        }
      >
        <div className="service-card">
          <h3>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/service/cutting-services.svg"
              alt="Cutting Services"
              width={289}
              height={23}
              className="card-heading-logo"
            />
          </h3>
          <div className="service-item">Prototypes</div>
          <div className="service-item">Unique products</div>
          <div className="service-item">Small production series</div>
        </div>

        <div className="service-card">
          <h3>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/service/services-can-include.svg"
              alt="Services Can Include"
              width={354}
              height={23}
              className="card-heading-logo"
            />
          </h3>
          <div className="service-item">CAD & design</div>
          <div className="service-item">CNC machining</div>
          <div className="service-item">Assembly & finishing</div>
        </div>

        <div className="service-card">
          <h3>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/service/quotes-are-based-on.svg"
              alt="Quotes Are Based On"
              width={355}
              height={23}
              className="card-heading-logo"
            />
          </h3>
          <div className="service-item">Material</div>
          <div className="service-item">Size & quantity</div>
          <div className="service-item">Design complexity</div>
        </div>

        <div className="service-card">
          <h3>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/service/delivery-options.svg"
              alt="Delivery Options"
              width={287}
              height={23}
              className="card-heading-logo"
            />
          </h3>
          <div className="service-item">Workshop pickup</div>
          <div className="service-item">Shipping</div>
        </div>
      </div>
      <p className="service-note">
        <strong>Whether you come with a CAD file, a sketch or simply an idea, I can help you figure out how to make it.</strong>
      </p>
    </section>
  );
}
