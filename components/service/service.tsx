import { CardGrid } from "@/components/card-grid/card-grid";
import { de } from "@/dictionaries/de";
import { en } from "@/dictionaries/en";
import type { Lang } from "@/shared/routes";

interface ServiceProps {
  lang: Lang;
}

// Widest heading logo per language (en: cnc-machining.svg, 239x23;
// de: angebot-basieren-auf.svg, 385x23) — see CardGrid's
// maxLogoAspectRatio doc comment. Keep in sync with CARD_LOGOS below.
const MAX_LOGO_ASPECT_RATIO: Record<Lang, number> = {
  en: 239 / 23,
  de: 385 / 23,
};

// Logo asset per card, per language — same key set as *.services.cards
// in both dictionaries, against public/service/*.svg.
const CARD_LOGOS = {
  en: {
    serviceOne: { src: "/service/cad-design.svg", width: 185, height: 23 },
    serviceTwo: { src: "/service/cnc-machining.svg", width: 239, height: 23 },
    serviceThree: { src: "/service/materials.svg", width: 179, height: 23 },
    serviceFour: { src: "/service/quotes.svg", width: 132, height: 23 },
    serviceFive: { src: "/service/delivery.svg", width: 151, height: 23 },
  },
  de: {
    serviceOne: { src: "/service/cad-design.svg", width: 185, height: 23 },
    serviceTwo: { src: "/service/cnc-leistungen.svg", width: 258, height: 23 },
    serviceThree: { src: "/service/materialen.svg", width: 197, height: 23 },
    serviceFour: { src: "/service/angebot-basieren-auf.svg", width: 385, height: 23 },
    serviceFive: { src: "/service/lieferung.svg", width: 169, height: 23 },
  },
} as const;

const CARD_ORDER = ["serviceOne", "serviceTwo", "serviceThree", "serviceFour", "serviceFive"] as const;

// Server Component: the primary on-page copy, rendered as part of the
// initial HTML response so it's readable independently of the video and
// indexable without client-side JavaScript.
export function Service({ lang }: ServiceProps) {
  const dict = lang === "en" ? en : de;
  const { cards } = dict.services.websiteContent;
  const logos = CARD_LOGOS[lang];

  return (
    <CardGrid
      headingId="about-heading"
      title={dict.services.metadata.title}
      maxLogoAspectRatio={MAX_LOGO_ASPECT_RATIO[lang]}
      cards={CARD_ORDER.map((key) => ({
        key,
        heading: cards[key].heading,
        descriptions: cards[key].descriptions,
        logo: logos[key],
      }))}
      // TODO: owner copy — see dictionaries/pages/services.ts's websiteContent.readMore comment
      readMoreText={dict.services.websiteContent.readMore}
    />
  );
}
