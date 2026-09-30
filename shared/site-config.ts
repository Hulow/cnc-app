// Single source of truth for technical/infra site config used across
// metadata, structured data, and page components. Business identity
// facts (name, legalName, contact, serviceArea) live in
// dictionaries/business.ts instead — see dict.business.

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://atelier-cut.com";

export const siteConfig = {
  siteUrl: rawSiteUrl.replace(/\/+$/, ""),
  // Cloudinary transformations: f_auto/q_auto let Cloudinary pick the
  // best format/quality per browser; w_1920/w_960 cap delivered
  // resolution so a phone isn't served desktop-size video.
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
  // Social profile URLs for structured data's `sameAs`. Empty until
  // the owner provides real profiles — an invented URL would be worse
  // than no sameAs claim at all.
  social: [] as readonly string[],
} as const;
