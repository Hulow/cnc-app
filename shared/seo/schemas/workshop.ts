import type { Dictionary } from "@/dictionaries/en";
import { businessCore } from "./common";

// What the workshop page shows: applications and machine capabilities.
// The person who works with them (buildPerson) is shared with the
// impressum page, so it stays in ../schema-org.ts instead.
export function buildBusinessWorkshop(dict: Dictionary) {
  return {
    ...businessCore(dict),
    knowsAbout: [...dict.workshop.schemas.knowsAbout],
    additionalProperty: dict.workshop.schemas.machineSpecs.map(({ name, value }) => ({
      "@type": "PropertyValue",
      name,
      value,
    })),
  };
}
