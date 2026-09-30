// Single source of truth for site-wide content used across metadata,
// structured data, and page components.

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://atelier-cut.com";

export const siteConfig = {
  name: "Atelier Cut",
  siteUrl: rawSiteUrl.replace(/\/+$/, ""),
  serviceArea: "Berlin",
  // The natural person the footer copyright already names — reused here
  // (not invented) as the Impressum's operator name. See P1.7 in
  // SEO-SPEC.md: flagged there for the owner to confirm, since an
  // Impressum is a legal document, not just a credit line.
  legalName: "Victor Le Fur",
  contact: {
    email: "victor@atelier-cut.com",
    address: "Coppistraße 17, 10365 Berlin",
  },
  // Cloudinary transformations (see P2.1 in SEO-SPEC.md): f_auto/q_auto
  // let Cloudinary pick the best format/quality per browser; w_1920/w_960
  // cap delivered resolution so a phone isn't served desktop-size video.
  // poster is a local copy (public/cnc-poster.jpg, the same so_0 frame at
  // 0s) rather than a Cloudinary URL: it's the fallback BackgroundVideo
  // shows when Cloudinary delivery fails (quota/outage), so it must not
  // depend on Cloudinary itself to load. Re-download from Cloudinary if
  // the source video ever changes.
  video: {
    src: "https://res.cloudinary.com/wkjycihi/video/upload/f_auto,q_auto,w_1920/v1789982751/cnc.mp4",
    narrowSrc: "https://res.cloudinary.com/wkjycihi/video/upload/f_auto,q_auto,w_960/v1789982751/cnc.mp4",
    poster: "/cnc-poster.jpg",
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
