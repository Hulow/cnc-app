import type { Dictionary } from "@/dictionaries/en";
import { absoluteUrl, routes, type Lang } from "../../routes";
import { prune } from "../todo";
import { areaServed, assetUrl, businessRef, CONTEXT, schemaIds } from "./common";

// What the services page shows: one Service entity per entry in the
// services card ("CAD & design", "CNC machining", "Assembly & finishing").
export function buildServices(lang: Lang, dict: Dictionary) {
  return dict.services.websiteContent.cards.services.descriptions.map((name, index) =>
    prune({
      "@context": CONTEXT,
      "@type": "Service",
      "@id": schemaIds.service(index),
      name,
      serviceType: name,
      // The three descriptions follow the order of the services card.
      description: dict.services.schemas.descriptions[index],
      provider: businessRef(dict),
      areaServed: areaServed(dict),
      audience: { "@type": "Audience", audienceType: dict.services.schemas.audience },
      // "Workshop pickup", "Shipping" — shown on the services page.
      availableChannel: dict.services.websiteContent.cards.deliveryOptions.descriptions.map((channel) => ({
        "@type": "ServiceChannel",
        name: channel,
      })),
      termsOfService: assetUrl(dict.services.schemas.termsOfServiceUrl),
      url: absoluteUrl(routes.services[lang]),
    }),
  );
}
