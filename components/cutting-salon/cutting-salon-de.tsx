import { CardGrid } from "@/components/card-grid/card-grid";
import type { Dictionary } from "@/dictionaries/en";

interface CuttingSalonDeProps {
  dict: Pick<Dictionary, "workshop" | "pages" | "readMore">;
}

// Widest heading logo below (maschinenleistung.svg, 322x23) — see
// CardGrid's maxLogoAspectRatio doc comment. Keep in sync with the
// logo width/height below.
const MAX_LOGO_ASPECT_RATIO = 322 / 23;

// Logo asset per card — same key set as dict.workshop.cards (see the
// English equivalent, components/cutting-salon/cutting-salon.tsx, which
// follows the same pattern against public/salon/*.svg).
const CARD_LOGOS = {
  machineCapabilities: { src: "/salon/maschinenleistung.svg", width: 322, height: 23 },
  materials: { src: "/salon/materialen.svg", width: 197, height: 23 },
  applications: { src: "/salon/anwendungen.svg", width: 229, height: 23 },
  technology: { src: "/salon/technologie.svg", width: 204, height: 23 },
} as const;

const CARD_ORDER = ["machineCapabilities", "materials", "applications", "technology"] as const;

// German equivalent of CuttingSalon (components/cutting-salon/cutting-salon.tsx),
// now that German heading logos exist (public/salon/*.svg).
export function CuttingSalonDe({ dict }: CuttingSalonDeProps) {
  const { cards, imageAlt } = dict.workshop;

  return (
    <CardGrid
      headingId="cutting-salon-heading"
      title={dict.pages.workshop.title}
      maxLogoAspectRatio={MAX_LOGO_ASPECT_RATIO}
      cards={CARD_ORDER.map((key) => ({
        key,
        heading: cards[key].heading,
        items: cards[key].items,
        logo: CARD_LOGOS[key],
      }))}
      image={{
        src: "/cnc.jpg",
        alt: imageAlt,
        width: 2400,
        height: 1800,
        sizes: "(min-width: 576px) 70vw, 90vw",
      }}
      // TODO: owner copy — see dictionaries/de.ts's readMore.workshop comment
      readMoreText={dict.readMore.workshop}
    />
  );
}
