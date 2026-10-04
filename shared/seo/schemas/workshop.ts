import type { Dictionary } from "@/dictionaries/en";
import { businessCore } from "./common";

// What the workshop page shows: materials, applications and machine
// capabilities. The person who works with them (buildPerson) is shared
// with the impressum page, so it stays in ../schema-org.ts instead.
export function buildBusinessWorkshop(dict: Dictionary) {
  return {
    ...businessCore(dict),
    knowsAbout: [
      ...dict.workshop.websiteContent.cards.materials.items,
      ...dict.workshop.websiteContent.cards.applications.items,
    ],
    additionalProperty: dict.workshop.websiteContent.cards.machineCapabilities.items.map((value) => ({
      "@type": "PropertyValue",
      name: dict.workshop.websiteContent.cards.machineCapabilities.heading,
      value,
    })),
  };
}
