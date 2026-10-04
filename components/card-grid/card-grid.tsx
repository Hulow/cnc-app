import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { Card, type CardLogo } from "@/components/card/card";
import { ReadMoreButton } from "@/components/read-more-button/read-more-button";

export interface CardGridCard {
  key: string;
  heading: string;
  // Optional — see Card's own doc comment: omit logo/descriptions for a
  // plain-text heading and arbitrary children (Contact's cards).
  logo?: CardLogo;
  descriptions?: readonly string[];
  children?: ReactNode;
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
  // for the widest one, instead of only that one shrinking. Omit when no
  // card in this grid has a logo (Contact) — the formula falls back to
  // its own default ratio, which never matters with no logo to size.
  maxLogoAspectRatio?: number;
  cards: readonly CardGridCard[];
  image?: CardGridImage;
  // Omit when this grid has no separate intro paragraph of its own
  // (Contact's cards carry all their own copy) — the trailing read-more
  // button then doesn't render at all.
  readMoreText?: string;
}

// Server Component: shared layout for the Services, Cutting Salon and
// Contact pages — a title, a single-column stack of collapsible cards,
// and an optional trailing image and closing "read more" button (neither
// used by Contact, which has no separate intro paragraph or photo).
// Rendered as part of the initial HTML response so it's readable
// independently of the video and indexable without client-side
// JavaScript. See globals.css's "Card Grid" section for the shared
// styles this renders into.
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
        {cards.map(({ key, heading, descriptions, logo, children }) => (
          <Card key={key} heading={heading} logo={logo} descriptions={descriptions}>
            {children}
          </Card>
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
      {readMoreText && (
        <div className="read-more-end">
          <ReadMoreButton text={readMoreText} />
        </div>
      )}
    </section>
  );
}
