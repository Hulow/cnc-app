// Business identity facts — the same regardless of language, so unlike
// every other dictionary module this isn't split into en/de. Both
// dictionaries re-export this one object as their own `business` key so
// every consumer reads it off `dict.business` instead of a separate
// import.
export const business = {
  name: "Atelier Cut",
  serviceArea: "Berlin",
  // The natural person the footer copyright already names — reused here
  // (not invented) as the Impressum's operator name, flagged for the
  // owner to confirm, since an Impressum is a legal document, not just
  // a credit line.
  legalName: "Victor Le Fur",
  contact: {
    email: "victor@atelier-cut.com",
    address: "Coppistraße 17, 10365 Berlin",
  },
} as const;

export type Business = typeof business;
