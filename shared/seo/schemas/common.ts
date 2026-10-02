import type { Dictionary } from "@/dictionaries/en";
import { siteConfig } from "../../site-config";
import { absoluteUrl, routes, type Lang, type RouteKey } from "../../routes";

// Primitives shared by every page's builders in this directory (and by
// the orchestrator in ../schema-org.ts, for the entities — Person,
// WebPage, BreadcrumbList — that aren't scoped to a single page). Kept
// separate from the page files themselves so none of them has to import
// from the orchestrator, which in turn imports the page files.

export const CONTEXT = "https://schema.org";

// "/" has no path segment, so absoluteUrl("/") has no trailing slash;
// an `@id` looks better as `https://host/#website` than `https://host#website`.
function fragmentId(path: string, fragment: string): string {
  const base = path === "/" ? `${siteConfig.siteUrl}/` : absoluteUrl(path);
  return `${base}#${fragment}`;
}

// Business, Person and Services are the same real-world things in both
// languages, so their ids are language-independent. WebSite, WebPage and
// BreadcrumbList describe a specific URL, so their ids are per-URL.
export const schemaIds = {
  business: `${siteConfig.siteUrl}/#business`,
  person: `${siteConfig.siteUrl}/#person`,
  service: (index: number) => `${siteConfig.siteUrl}/#service-${index + 1}`,
  website: (lang: Lang) => fragmentId(routes.home[lang], "website"),
  webPage: (key: RouteKey, lang: Lang) => fragmentId(routes[key][lang], "webpage"),
  breadcrumb: (key: RouteKey, lang: Lang) => fragmentId(routes[key][lang], "breadcrumb"),
};

// Inline references: enough for a consumer to know what is meant, without
// repeating (or exposing) the full node on a page that doesn't show it.
export const businessRef = (dict: Dictionary) => ({
  "@type": "ProfessionalService",
  "@id": schemaIds.business,
  name: dict.business.name,
});

export const websiteRef = (lang: Lang, dict: Dictionary) => ({
  "@type": "WebSite",
  "@id": schemaIds.website(lang),
  url: absoluteUrl(routes.home[lang]),
  name: dict.business.name,
});

// Image fields in the dictionary are a path under /public ("/workshop.jpg")
// or already an absolute URL. JSON-LD wants absolute. (A TODO passes
// through unchanged and is pruned.)
export function assetUrl(value: string): string {
  return value.startsWith("/") ? `${siteConfig.siteUrl}${value}` : value;
}

export function postalAddress(dict: Dictionary) {
  return {
    "@type": "PostalAddress",
    streetAddress: dict.business.contact.address.split(", ")[0],
    postalCode: dict.business.contact.address.match(/\d{5}/)?.[0],
    addressLocality: dict.business.serviceArea,
    addressCountry: "DE",
  };
}

export function areaServed(dict: Dictionary) {
  return [
    { "@type": "City", name: dict.business.serviceArea },
    { "@type": "Country", name: "Germany" },
  ];
}

// The business is described in several facets (one per page file in this
// directory, plus impressum in ../schema-org.ts), each carrying only the
// properties the page that uses it actually shows. All share one `@id`.
export function businessCore(dict: Dictionary) {
  return {
    "@context": CONTEXT,
    "@type": "ProfessionalService",
    "@id": schemaIds.business,
    name: dict.business.name,
    url: siteConfig.siteUrl,
  };
}
