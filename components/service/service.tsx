import { CardGrid } from "@/components/card-grid/card-grid";
import { en } from "@/dictionaries/en";

// Widest heading logo below (quotes-are-based-on.svg, 355x23) — see
// CardGrid's maxLogoAspectRatio doc comment. Keep in sync with the
// logo width/height below.
const MAX_LOGO_ASPECT_RATIO = 355 / 23;

// Logo asset per card — same key set as en.services.cards (see the
// German equivalent, components/service/service-de.tsx, which follows
// the same pattern against public/service/*.svg).
const CARD_LOGOS = {
  services: { src: "/service/services.svg", width: 154, height: 23 },
  cuttingServices: { src: "/service/project_size.svg", width: 222, height: 23 },
  quotesAreBasedOn: { src: "/service/quotes-are-based-on.svg", width: 355, height: 23 },
  deliveryOptions: { src: "/service/delivery-options.svg", width: 287, height: 23 },
} as const;

const CARD_ORDER = ["services", "cuttingServices", "quotesAreBasedOn", "deliveryOptions"] as const;

// Server Component: the primary on-page copy, rendered as part of the
// initial HTML response so it's readable independently of the video and
// indexable without client-side JavaScript.
export function Service() {
  const { cards } = en.services;

  return (
    <CardGrid
      headingId="about-heading"
      title={en.pages.services.title}
      maxLogoAspectRatio={MAX_LOGO_ASPECT_RATIO}
      cards={CARD_ORDER.map((key) => ({
        key,
        heading: cards[key].heading,
        items: cards[key].items,
        logo: CARD_LOGOS[key],
      }))}
      // TODO: owner copy — see dictionaries/en.ts's readMore.services comment
      readMoreText={en.readMore.services}
    />
  );
}
