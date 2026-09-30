import type { Dictionary } from "@/dictionaries/en";
import { siteConfig } from "./site-config";
import { absoluteUrl, routes, SUPPORTED_LANGS, type Lang, type RouteKey } from "./routes";

// JSON-LD builders. Every value comes from siteConfig + the
// per-language dictionary, so English and German pages stay
// consistent with each other and with the visible page content.

export function buildLocalBusiness(dict: Dictionary) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.siteUrl}/#business`,
    name: siteConfig.name,
    description: dict.meta.description,
    url: siteConfig.siteUrl,
    // .svg, not a raster PNG — no PNG export of the logo exists yet.
    // Most rich-result consumers accept svg; revisit if that changes.
    logo: `${siteConfig.siteUrl}/logo.svg`,
    // TODO: `image` (a real OG image) once P1.6 ships one — omitted
    // rather than pointed at a placeholder.
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address.split(", ")[0],
      postalCode: siteConfig.contact.address.match(/\d{5}/)?.[0],
      addressLocality: siteConfig.serviceArea,
      addressCountry: "DE",
    },
    areaServed: [
      { "@type": "City", name: siteConfig.serviceArea },
      { "@type": "Country", name: "Germany" },
    ],
    // "fr" only if the owner confirms — not claimed here since nothing
    // on the site is actually in French yet.
    knowsLanguage: [...SUPPORTED_LANGS],
    // Populated once the owner provides real profile URLs — see
    // siteConfig.social's own comment.
    sameAs: [...siteConfig.social],
    knowsAbout: [
      ...dict.workshop.cards.materials.items,
      ...dict.workshop.cards.applications.items,
    ],
    additionalProperty: dict.workshop.cards.machineCapabilities.items.map((value) => ({
      "@type": "PropertyValue",
      value,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: dict.pages.services.title,
      itemListElement: dict.services.cards.services.items.map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
  };
}

export function buildWebSite(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: absoluteUrl(routes.home[lang]),
    inLanguage: lang,
  };
}

// Short label for a route in breadcrumbs — the nav's own short labels
// ("Service", not the full <title>), except privacy/impressum, which
// aren't in the nav (footer-only); their footer labels double as the
// breadcrumb label there.
function breadcrumbLabel(key: Exclude<RouteKey, "home">, dict: Dictionary): string {
  if (key === "privacy" || key === "impressum") return dict.footer[key];
  return dict.nav[key];
}


// It tells search engines: "This page belongs to this navigation hierarchy: Home → Services."
export function buildBreadcrumbs(key: Exclude<RouteKey, "home">, lang: Lang, dict: Dictionary) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: dict.nav.home,
        item: absoluteUrl(routes.home[lang]),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: breadcrumbLabel(key, dict),
        item: absoluteUrl(routes[key][lang]),
      },
    ],
  };
}
