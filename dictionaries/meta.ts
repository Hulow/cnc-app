// Site-wide <meta> content — shared across every page, unlike the
// per-page copy in ./pages/*. Both languages live here side by side so
// they stay easy to compare and keep in sync.
export const meta = {
  en: {
    description:
      "Custom CNC fabrication in Berlin: CNC milling, CNC cutting and CNC woodworking for your projects.",
    ogLocale: "en_US",
    ogAlternateLocale: "de_DE",
  },
  de: {
    // Pre-existing copy from shared/site-config.ts (the site's original
    // description, before P0.1 — already real German, not machine-drafted).
    description:
      "Individuelle CNC-Fertigung in Berlin: CNC Fräsen, CNC Zuschnitt und CNC Holzfräsen für Ihre Projekte.",
    ogLocale: "de_DE",
    ogAlternateLocale: "en_US",
  },
};
