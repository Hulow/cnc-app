import { CardGrid } from "@/components/card-grid/card-grid";
import type { Dictionary } from "@/dictionaries/en";

interface ServiceDeProps {
  dict: Pick<Dictionary, "services" | "pages" | "readMore">;
}

// Widest heading logo below (angebot-basieren-auf.svg, 385x23) — see
// CardGrid's maxLogoAspectRatio doc comment. Keep in sync with the
// logo width/height below.
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
// that German heading logos exist (public/service/*.svg).
export function ServiceDe({ dict }: ServiceDeProps) {
  const { cards } = dict.services;

  return (
    <CardGrid
      headingId="about-heading"
      title={dict.pages.services.title}
      maxLogoAspectRatio={MAX_LOGO_ASPECT_RATIO}
      cards={CARD_ORDER.map((key) => ({
        key,
        heading: cards[key].heading,
        items: cards[key].items,
        logo: CARD_LOGOS[key],
      }))}
      // TODO: owner copy — see dictionaries/de.ts's readMore.services comment
      readMoreText={dict.readMore.services}
    />
  );
}
