import { CardGrid } from "@/components/card-grid/card-grid";
import { en } from "@/dictionaries/en";

// Widest heading logo below (machine-capabilities.svg, 348x23) — see
// CardGrid's maxLogoAspectRatio doc comment. Keep in sync with the
// logo width/height below.
const MAX_LOGO_ASPECT_RATIO = 348 / 23;

// Logo asset per card — same key set as en.workshop.cards (see the
// German equivalent, components/cutting-salon/cutting-salon-de.tsx,
// which follows the same pattern against public/salon/*.svg).
const CARD_LOGOS = {
  machineCapabilities: { src: "/salon/machine-capabilities.svg", width: 348, height: 23 },
  materials: { src: "/salon/materials.svg", width: 179, height: 23 },
  applications: { src: "/salon/applications.svg", width: 224, height: 23 },
  technology: { src: "/salon/technology.svg", width: 199, height: 23 },
} as const;

const CARD_ORDER = ["machineCapabilities", "materials", "applications", "technology"] as const;

// Server Component: same rendering rationale as Service — see that file.
export function CuttingSalon() {
  const { cards, imageAlt } = en.workshop;

  return (
    <CardGrid
      headingId="cutting-salon-heading"
      title={en.pages.workshop.title}
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
      // TODO: owner copy — see dictionaries/en.ts's readMore.workshop comment
      readMoreText={en.readMore.workshop}
    />
  );
}
