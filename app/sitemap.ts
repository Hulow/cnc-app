import type { MetadataRoute } from "next";
import { absoluteUrl, routes, type RouteKey } from "@/shared/routes";

// Every public, indexable route key. Keep in sync with app/(en)/*/page.tsx
// and app/[lang]/*/page.tsx — update this list whenever a route is added
// or removed.
const ROUTE_KEYS: RouteKey[] = ["home", "services", "workshop", "contact", "privacy", "impressum"];

// One entry per route per language, each carrying the full hreflang set
// (including itself and x-default) via `alternates.languages` — see the
// Sitemap API's "Generate a localized Sitemap" docs.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTE_KEYS.flatMap((key) => {
    const { en, de } = routes[key];
    const alternates = {
      languages: {
        en: absoluteUrl(en),
        de: absoluteUrl(de),
        "x-default": absoluteUrl(en),
      },
    };

    return [
      { url: absoluteUrl(en), lastModified, alternates },
      { url: absoluteUrl(de), lastModified, alternates },
    ];
  });
}
