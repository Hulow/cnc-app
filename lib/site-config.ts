// Single source of truth for site-wide content used across metadata,
// structured data, and page components. Replace placeholder values
// (siteUrl, contact) with real production values before launch.

export const siteConfig = {
  name: "CNC Berlin",
  description:
    "Individuelle CNC-Fertigung in Berlin: CNC Fräsen, CNC Zuschnitt und CNC Holzfräsen für Ihre Projekte.",
  // TODO: replace with the real production domain before launch.
  siteUrl: "https://example.com",
  serviceArea: "Berlin",
  contact: {
    email: "viq.hlw@gmail.com",
    address: "Coppistraße 17, 10963 Berlin",
  },
  video: {
    src: "https://res.cloudinary.com/wkjycihi/video/upload/v1789818952/cnc.mp4",
    // TODO: add a Cloudinary-hosted poster image once available.
    poster: undefined as string | undefined,
    // Tunable WebGL shader "look" — see components/background-video.tsx.
    // Kept here, not hardcoded in the shader, so the treatment can be
    // iterated without touching the video asset or the render code.
    shader: {
      grayscale: 1,
      brightness: -0.06,
      contrast: 1.15,
      gamma: 1,
      exposure: 0,
      saturation: 1,
    },
  },
  keywords: [
    "CNC Fräsen Berlin",
    "CNC Fertigung Berlin",
    "CNC Holzfräsen",
    "CNC Zuschnitt",
    "individuelle CNC-Fertigung",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
