// Canonical route map: every public page's path in each language. Single
// source of truth for hreflang/canonical alternates (per-page metadata,
// sitemap.ts, schema-org.ts) and for the language switcher's
// reverse lookup — keep this in sync whenever a route is added, removed
// or its slug changes.

import { siteConfig } from "./site-config";

export const SUPPORTED_LANGS = ["en", "de"] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];

export const routes = {
  home: { en: "/", de: "/de" },
  services: { en: "/services", de: "/de/leistungen" },
  workshop: { en: "/workshop", de: "/de/werkstatt" },
  contact: { en: "/contact", de: "/de/kontakt" },
  privacy: { en: "/privacy", de: "/de/datenschutz" },
  impressum: { en: "/impressum", de: "/de/impressum" },
} as const;

export type RouteKey = keyof typeof routes;

// Every path this route key resolves to, keyed by language — used to
// build a page's `alternates.languages` (hreflang) set. "x-default"
// points at the English version (the international default).
export function languageAlternates(key: RouteKey): Record<string, string> {
  return {
    en: routes[key].en,
    de: routes[key].de,
    "x-default": routes[key].en,
  };
}

// Given the current pathname, finds its route key and returns the
// equivalent path in the other language — used by the language switcher.
// Falls back to that language's home page if the current path isn't a
// known route (e.g. a 404).
export function alternateLanguagePath(pathname: string, currentLang: Lang): string {
  const targetLang: Lang = currentLang === "en" ? "de" : "en";
  const entry = Object.values(routes).find((route) => route[currentLang] === pathname);
  return entry ? entry[targetLang] : routes.home[targetLang];
}

// Resolves a site-relative path ("/", "/de/leistungen", …) to its full
// https://atelier-cut.com/... URL — sitemap.ts and schema-org.ts
// both need this (sitemap URLs and JSON-LD `url`/`item` values must be
// absolute; unlike page metadata, neither goes through metadataBase).
export function absoluteUrl(path: string): string {
  return path === "/" ? siteConfig.siteUrl : `${siteConfig.siteUrl}${path}`;
}
