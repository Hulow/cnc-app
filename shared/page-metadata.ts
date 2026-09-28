import type { Metadata } from "next";
import type { Dictionary } from "@/dictionaries/en";
import { siteConfig } from "./site-config";
import { languageAlternates, routes, type Lang, type RouteKey } from "./routes";

// Per-page metadata: self-referencing canonical, a complete hreflang set
// (en/de/x-default) and a correct openGraph.locale/alternateLocale — see
// P1.1 in SEO-SPEC.md. openGraph is set here in full (not just
// locale/url) because Next.js metadata merging replaces the *whole*
// openGraph object when a page defines one, rather than deep-merging it
// with the layout's — see the Metadata API's "Merging" docs.
export function pageMetadata(key: RouteKey, lang: Lang, dict: Dictionary): Metadata {
  const path = routes[key][lang];

  return {
    description: dict.meta.description,
    alternates: {
      canonical: path,
      languages: languageAlternates(key),
    },
    openGraph: {
      title: siteConfig.name,
      description: dict.meta.description,
      siteName: siteConfig.name,
      url: path,
      locale: dict.meta.ogLocale,
      alternateLocale: dict.meta.ogAlternateLocale,
      type: "website",
    },
  };
}
