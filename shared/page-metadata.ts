import type { Metadata } from "next";
import type { Dictionary } from "@/dictionaries/en";
import { languageAlternates, routes, type Lang, type RouteKey } from "./routes";

// Per-page metadata: a unique title/description, self-referencing
// canonical, a complete hreflang set (en/de/x-default) and a correct
// openGraph.locale/alternateLocale. openGraph is set here in full
// (not just locale/url) because Next.js metadata merging replaces the
// *whole* openGraph object when a page defines one, rather than
// deep-merging it with the layout's — see the Metadata API's
// "Merging" docs.
//
// The brand suffix is appended here rather than via the root layout's
// title.template: template application has a documented gap — it does
// NOT apply to a title set by a page.tsx in the *same* folder as the
// layout.tsx that defines the template, which is exactly our home route
// in both trees (app/(en)/page.tsx next to app/(en)/layout.tsx, and
// app/[lang]/page.tsx next to app/[lang]/layout.tsx). Building the full
// title here sidesteps that gap for every route uniformly.
export function pageMetadata(key: RouteKey, lang: Lang, dict: Dictionary): Metadata {
  const path = routes[key][lang];
  const { title: pageTitle, description } = dict.pages[key];
  const title = `${pageTitle} · ${dict.business.name}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: languageAlternates(key),
    },
    openGraph: {
      title,
      description,
      siteName: dict.business.name,
      url: path,
      locale: dict.meta.ogLocale,
      alternateLocale: dict.meta.ogAlternateLocale,
      type: "website",
    },
  };
}
