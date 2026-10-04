import type { Dictionary } from "@/dictionaries/en";
import { absoluteUrl, routes, type Lang } from "../../routes";
import { areaServed, businessCore, schemaIds } from "./common";

// Every card on the services page, in the order they're shown. Keep in
// sync with components/service/service.tsx's CARD_ORDER and
// dictionaries/pages/services.ts's cards.
export const SERVICE_CARD_KEYS = [
  "serviceOne",
  "serviceTwo",
  "serviceThree",
  "serviceFour",
  "serviceFive",
] as const;

// Of those cards, only these two are something sold as a distinct Service
// (schema.org sense). Materials/Quotes Based On/Delivery describe facts
// *about* the business rather than an offering of their own, so they
// become knowsAbout/additionalProperty on the ProfessionalService node
// below instead of a Service entity.
export const SERVICE_ENTITY_KEYS = ["serviceOne", "serviceTwo"] as const;

function buildServiceEntity(key: (typeof SERVICE_ENTITY_KEYS)[number], lang: Lang, dict: Dictionary) {
  const index = SERVICE_CARD_KEYS.indexOf(key);
  const { heading, descriptions } = dict.services.websiteContent.cards[key];

  return {
    // No `provider` here: nesting inside the ProfessionalService's own
    // hasOfferCatalog already says who provides it, so repeating the
    // ProfessionalService reference on every Service would be redundant.
    "@type": "Service",
    "@id": schemaIds.service(index),
    name: heading,
    serviceType: heading,
    description: descriptions.join(" "),
    areaServed: areaServed(dict),
    audience: { "@type": "Audience", audienceType: dict.services.schemas.audience },
    // termsOfService: assetUrl(dict.services.schemas.termsOfServiceUrl), TODO: add terms of service url
    url: absoluteUrl(routes.services[lang]),
    datePublished: dict.services.schemas.pageDates.published,
    dateModified: dict.services.schemas.pageDates.modified,
  };
}

// ProfessionalService: the facet of the business this page shows — what
// it offers (hasOfferCatalog), what it works with (knowsAbout), and how
// it quotes/delivers (additionalProperty). schema.org's own OfferCatalog
// example (ACME Home Cleaning) wraps every entry in an Offer rather than
// listing bare Service nodes, so we do the same.
export function buildServicesProfessionalService(lang: Lang, dict: Dictionary) {
  const { cards } = dict.services.websiteContent;

  return {
    ...businessCore(dict),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: dict.services.metadata.title,
      itemListElement: SERVICE_ENTITY_KEYS.map((key) => ({
        "@type": "Offer",
        itemOffered: buildServiceEntity(key, lang, dict),
      })),
    },
    knowsAbout: [...dict.services.schemas.knowsAbout],
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: cards.serviceFour.heading,
        value: cards.serviceFour.descriptions.join(" "),
      },
      {
        "@type": "PropertyValue",
        name: cards.serviceFive.heading,
        value: cards.serviceFive.descriptions.join(" "),
      },
    ],
    areaServed: areaServed(dict),
  };
}
