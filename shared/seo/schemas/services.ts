import type { Dictionary } from "@/dictionaries/en";
import { absoluteUrl, routes, type Lang } from "../../routes";
import { prune } from "../todo";
import { areaServed, assetUrl, businessRef, CONTEXT, schemaIds } from "./common";

// What the services page shows: one Service entity per entry in the
// services card ("CAD & design", "CNC machining", "Assembly & finishing").
export function buildServices(lang: Lang, dict: Dictionary) {
  return dict.services.cards.services.items.map((name, index) =>
    prune({
      "@context": CONTEXT,
      "@type": "Service",
      "@id": schemaIds.service(index),
      name,
      serviceType: name,
      // The three descriptions follow the order of the services card.
      description: dict.schema.services.descriptions[index],
      provider: businessRef(dict),
      areaServed: areaServed(dict),
      audience: { "@type": "Audience", audienceType: dict.schema.services.audience },
      // "Workshop pickup", "Shipping" — shown on the services page.
      availableChannel: dict.services.cards.deliveryOptions.items.map((channel) => ({
        "@type": "ServiceChannel",
        name: channel,
      })),
      termsOfService: assetUrl(dict.business.termsOfServiceUrl),
      url: absoluteUrl(routes.services[lang]),
    }),
  );
}
