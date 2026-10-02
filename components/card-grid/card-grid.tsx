import Image from "next/image";
import type { CSSProperties } from "react";
import { ReadMoreButton } from "@/components/read-more-button/read-more-button";

export interface CardGridCard {
  key: string;
  heading: string;
  items: readonly string[];
  logo: { src: string; width: number; height: number };
}

export interface CardGridImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
}

interface CardGridProps {
  headingId: string;
  title: string;
  // Widest heading logo in `cards` (width / height) — feeds
  // .card-heading-logo's shrink formula in globals.css so every heading
  // in this grid shrinks by the same factor if the grid gets too narrow
  // for the widest one, instead of only that one shrinking.
  maxLogoAspectRatio: number;
  cards: readonly CardGridCard[];
  image?: CardGridImage;
  readMoreText: string;
}

// Server Component: shared layout for the Services and Cutting Salon
// pages — a title, a responsive grid of logo-headed cards, an optional
// trailing image, and a closing "read more" button. Rendered as part of
// the initial HTML response so it's readable independently of the video
// and indexable without client-side JavaScript. See globals.css's "Card
// Grid" section for the shared styles this renders into.
export function CardGrid({ headingId, title, maxLogoAspectRatio, cards, image, readMoreText }: CardGridProps) {
  return (
    <section aria-labelledby={headingId}>
      <h1 id={headingId} className="page-title">{title}</h1>
      <div
        className="card-grid"
        style={
          {
            "--card-heading-logo-max-ratio": maxLogoAspectRatio,
          } as CSSProperties
        }
      >
        {cards.map(({ key, heading, items, logo }) => (
          <div className="card" key={key}>
            <h2>
              {/* Real text node for crawlers/SEO; the SVG stays the
                  visible heading — same technique on every card. */}
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
                <li className="card-item" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {image && (
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          // Matches .card-grid-image's own width: 100% within
          // .content-layer's responsive width steps (see globals.css) —
          // 90% of viewport below 576px, 70% (capped at the 75rem/1200px
          // container max-width) from 576px up — so next/image requests
          // an appropriately-sized variant instead of always the largest.
          sizes={image.sizes}
          className="card-grid-image"
        />
      )}
      <div className="read-more-end">
        <ReadMoreButton text={readMoreText} />
      </div>
    </section>
  );
}
