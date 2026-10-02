import { TODO } from "../shared/seo/todo";
import type { RouteKey } from "../shared/routes";

// Business identity facts — the same regardless of language, so unlike
// every other dictionary module this isn't split into en/de. Both
// dictionaries re-export this one object as their own `business` key so
// every consumer reads it off `dict.business` instead of a separate
// import.
//
// Like ./schema.ts, fields set to `TODO` are left out of the JSON-LD
// (shared/seo/schema-org.ts) until they have a real value — these are
// just the language-independent facts (coordinates, dates, legal IDs…)
// rather than copy, so there's only one of each instead of an en/de pair.
export const business = {
  name: "Atelier Cut",
  serviceArea: "Berlin",
  // The natural person the footer copyright already names — reused here
  // (not invented) as the Impressum's operator name, flagged for the
  // owner to confirm, since an Impressum is a legal document, not just
  // a credit line.
  legalName: "Victor Le Fur",
  // → ProfessionalService.foundingDate (year or YYYY-MM-DD).
  foundingDate: TODO,
  // → ProfessionalService.priceRange, e.g. "€€".
  priceRange: TODO,
  // → ProfessionalService.image, a photo of the business (workshop/work).
  // Shown on: home.
  image: TODO,
  contact: {
    email: "victor@atelier-cut.com",
    // → ContactPoint/LocalBusiness.telephone. Shown on: contact.
    phone: TODO,
    address: "Coppistraße 17, 10365 Berlin",
  },
  // → GeoCoordinates. Shown on: contact (map).
  geo: {
    latitude: TODO,
    longitude: TODO,
  },
  // → LocalBusiness.hasMap. Shown on: contact.
  hasMapUrl: TODO,
  // → LocalBusiness.openingHours, schema.org day-range syntax (e.g.
  // "Mo-Fr 09:00-17:00"). Shown on: contact. Empty, not TODO, since it's
  // a list rather than a single value with no real content yet.
  openingHours: [] as string[],
  person: {
    // → Person.image, a portrait. Shown on: workshop ("who I am").
    image: TODO,
  },
  // → ProfessionalService.legalName, the registered business name if it
  // differs from the trading name above. Shown on: impressum.
  registeredName: TODO,
  // → ProfessionalService.vatID. Shown on: impressum.
  vatId: TODO,
  // → Service.termsOfService, a URL. Shown on: services.
  termsOfServiceUrl: TODO,
  // → WebPage.datePublished/dateModified, per route. Shown on: every page
  // (not visible copy, but search engines cross-check it against
  // <Last-Modified>/sitemap dates, so it should still reflect reality).
  pageDates: {
    home: { published: TODO, modified: TODO },
    services: { published: TODO, modified: TODO },
    workshop: { published: TODO, modified: TODO },
    contact: { published: TODO, modified: TODO },
    privacy: { published: TODO, modified: TODO },
    impressum: { published: TODO, modified: TODO },
  } satisfies Record<RouteKey, { published: string; modified: string }>,
} as const;

export type Business = typeof business;
