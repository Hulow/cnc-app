// Single source of truth for site-wide content used across metadata,
// structured data, and page components.

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://atelier-cut.com";

export const siteConfig = {
  name: "Atelier Cut",
  description:
    "Individuelle CNC-Fertigung in Berlin: CNC Fräsen, CNC Zuschnitt und CNC Holzfräsen für Ihre Projekte.",
  siteUrl: rawSiteUrl.replace(/\/+$/, ""),
  serviceArea: "Berlin",
  // The natural person the footer copyright already names — reused here
  // (not invented) as the Impressum's operator name. See P1.7 in
  // SEO-SPEC.md: flagged there for the owner to confirm, since an
  // Impressum is a legal document, not just a credit line.
  legalName: "Victor Le Fur",
  contact: {
    email: "viq.hlw@gmail.com",
    address: "Coppistraße 17, 10365 Berlin",
  },
  video: {
    src: "https://res.cloudinary.com/wkjycihi/video/upload/v1789982751/cnc.mp4",
    // TODO: add a Cloudinary-hosted poster image once available.
    poster: undefined as string | undefined,
  },
  keywords: [
    "CNC Fräsen Berlin",
    "CNC Fertigung Berlin",
    "CNC Holzfräsen",
    "CNC Zuschnitt",
    "individuelle CNC-Fertigung",
  ],
  // Social profile URLs for structured data's `sameAs` (see P1.5 in
  // SEO-SPEC.md). Empty until the owner provides real profiles — an
  // invented URL would be worse than no sameAs claim at all.
  social: [] as readonly string[],
} as const;
