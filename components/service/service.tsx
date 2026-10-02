import { CardGrid } from "@/components/card-grid/card-grid";
import { de } from "@/dictionaries/de";
import { en } from "@/dictionaries/en";
import type { Lang } from "@/shared/routes";

interface ServiceProps {
  lang: Lang;
}

// Widest heading logo per language (en: quotes-are-based-on.svg, 355x23;
// de: angebot-basieren-auf.svg, 385x23) — see CardGrid's
// maxLogoAspectRatio doc comment. Keep in sync with CARD_LOGOS below.
const MAX_LOGO_ASPECT_RATIO: Record<Lang, number> = {
  en: 355 / 23,
  de: 385 / 23,
};

// Logo asset per card, per language — same key set as *.services.cards
// in both dictionaries, against public/service/*.svg.
const CARD_LOGOS = {
  en: {
    services: { src: "/service/services.svg", width: 154, height: 23 },
    cuttingServices: { src: "/service/project_size.svg", width: 222, height: 23 },
    quotesAreBasedOn: { src: "/service/quotes-are-based-on.svg", width: 355, height: 23 },
    deliveryOptions: { src: "/service/delivery-options.svg", width: 287, height: 23 },
  },
  de: {
    services: { src: "/service/leistungen.svg", width: 190, height: 23 },
    cuttingServices: { src: "/service/projektumfang.svg", width: 270, height: 23 },
    quotesAreBasedOn: { src: "/service/angebot-basieren-auf.svg", width: 385, height: 23 },
    deliveryOptions: { src: "/service/lieferoptionen.svg", width: 254, height: 23 },
  },
} as const;

const CARD_ORDER = ["services", "cuttingServices", "quotesAreBasedOn", "deliveryOptions"] as const;

// Server Component: the primary on-page copy, rendered as part of the
// initial HTML response so it's readable independently of the video and
// indexable without client-side JavaScript.
export function Service({ lang }: ServiceProps) {
  const dict = lang === "en" ? en : de;
  const { cards } = dict.services;
  const logos = CARD_LOGOS[lang];

  return (
    <CardGrid
      headingId="about-heading"
      title={dict.pages.services.title}
      maxLogoAspectRatio={MAX_LOGO_ASPECT_RATIO[lang]}
      cards={CARD_ORDER.map((key) => ({
        key,
        heading: cards[key].heading,
        items: cards[key].items,
        logo: logos[key],
      }))}
      // TODO: owner copy — see dictionaries/en.ts's readMore.services comment
      readMoreText={dict.readMore.services}
    />
  );
}
