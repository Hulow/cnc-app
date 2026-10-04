import type { Dictionary } from "@/dictionaries/en";
import { absoluteUrl, routes, type Lang } from "../../routes";
import { prune } from "../todo";
import { areaServed, assetUrl, businessRef, CONTEXT, schemaIds } from "./common";

// Every card on the services page becomes its own Service entity, in the
// order they're shown. Keep in sync with components/service/service.tsx's
// CARD_ORDER and dictionaries/pages/services.ts's cards.
export const SERVICE_CARD_KEYS = [
  "serviceOne",
  "serviceTwo",
  "serviceThree",
  "serviceFour",
  "serviceFive",
] as const;

export function buildServices(lang: Lang, dict: Dictionary) {
  return SERVICE_CARD_KEYS.map((key, index) => {
    const { heading, descriptions } = dict.services.websiteContent.cards[key];

    return prune({
      "@context": CONTEXT,
      "@type": "Service",
      "@id": schemaIds.service(index),
      name: heading,
      serviceType: heading,
      description: descriptions.join(" "),
      provider: businessRef(dict),
      areaServed: areaServed(dict),
      audience: { "@type": "Audience", audienceType: dict.services.schemas.audience },
      termsOfService: assetUrl(dict.services.schemas.termsOfServiceUrl),
      url: absoluteUrl(routes.services[lang]),
    });
  });
}
