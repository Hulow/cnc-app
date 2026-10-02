// Facts needed outside any single page: root layout chrome (name, address),
// and JSON-LD helpers shared across more than one page (serviceArea, via
// shared/seo/schemas/common.ts's postalAddress/areaServed; legalName, via
// shared/seo/schema-org.ts's buildPerson). Everything else that used to live
// here (foundingDate, vatId, geo, phone, openingHours, pageDates…) now lives
// in the one page's own dictionaries/pages/*.ts that actually shows it.
export const site = {
  name: "Atelier Cut",
  serviceArea: "Berlin",
  address: "Coppistraße 17, 10365 Berlin",
  // The natural person the footer copyright already names — reused here
  // (not invented) as the Impressum's operator name and the workshop
  // page's Person.name, flagged for the owner to confirm, since an
  // Impressum is a legal document, not just a credit line.
  legalName: "Victor Le Fur",
} as const;

export type Site = typeof site;
