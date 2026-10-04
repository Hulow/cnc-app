import { CardGrid } from "@/components/card-grid/card-grid";
import { de } from "@/dictionaries/de";
import { en } from "@/dictionaries/en";
import type { Lang } from "@/shared/routes";

interface CuttingSalonProps {
  lang: Lang;
}

// Widest heading logo per language (en: machine-capabilities.svg,
// 348x23; de: maschinenleistung.svg, 322x23) — see CardGrid's
// maxLogoAspectRatio doc comment. Keep in sync with CARD_LOGOS below.
const MAX_LOGO_ASPECT_RATIO: Record<Lang, number> = {
  en: 348 / 23,
  de: 322 / 23,
};

// Logo asset per card, per language — same key set as *.workshop.cards
// in both dictionaries, against public/salon/*.svg.
const CARD_LOGOS = {
  en: {
    machineCapabilities: { src: "/salon/machine-capabilities.svg", width: 348, height: 23 },
    materials: { src: "/salon/materials.svg", width: 179, height: 23 },
    applications: { src: "/salon/applications.svg", width: 224, height: 23 },
    technology: { src: "/salon/technology.svg", width: 199, height: 23 },
  },
  de: {
    machineCapabilities: { src: "/salon/maschinenleistung.svg", width: 322, height: 23 },
    materials: { src: "/salon/materialen.svg", width: 197, height: 23 },
    applications: { src: "/salon/anwendungen.svg", width: 229, height: 23 },
    technology: { src: "/salon/technologie.svg", width: 204, height: 23 },
  },
} as const;

const CARD_ORDER = ["machineCapabilities", "materials", "applications", "technology"] as const;

// Server Component: same rendering rationale as Service — see that file.
export function CuttingSalon({ lang }: CuttingSalonProps) {
  const dict = lang === "en" ? en : de;
  const { cards, imageAlt } = dict.workshop.websiteContent;
  const logos = CARD_LOGOS[lang];

  return (
    <CardGrid
      headingId="cutting-salon-heading"
      title={dict.workshop.metadata.title}
      maxLogoAspectRatio={MAX_LOGO_ASPECT_RATIO[lang]}
      cards={CARD_ORDER.map((key) => ({
        key,
        heading: cards[key].heading,
        descriptions: cards[key].items,
        logo: logos[key],
      }))}
      image={{
        src: "/cnc.jpg",
        alt: imageAlt,
        width: 2400,
        height: 1800,
        sizes: "(min-width: 576px) 70vw, 90vw",
      }}
      // TODO: owner copy — see dictionaries/pages/workshop.ts's websiteContent.readMore comment
      readMoreText={dict.workshop.websiteContent.readMore}
    />
  );
}
