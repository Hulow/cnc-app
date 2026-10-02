import type { Dictionary } from "@/dictionaries/en";
import { siteConfig } from "../site-config";
import { absoluteUrl, routes, SUPPORTED_LANGS, type Lang, type RouteKey } from "../routes";
import { prune } from "./todo";

// JSON-LD builders. Every value comes from siteConfig + the
// per-language dictionary, so English and German pages stay
// consistent with each other and with the visible page content.
//
// The entities form one linked graph (schema.org type hierarchy):
//
//   Thing
//   ├─ Organization → LocalBusiness → ProfessionalService   "who provides the service"
//   ├─ Person                                               worksFor, knowsAbout
//   ├─ Intangible → Service                                 "what the customer receives"
//   └─ CreativeWork → WebSite (whole site), WebPage (one page of it)
//
// Markup is PAGE-SCOPED: a page only carries the entities (and the
// properties of them) whose content a visitor can actually see on that
// page — see `pageSections` below for which page carries what. Entities
// that a page merely points at (the business as a Service's `provider`,
// the WebSite a WebPage `isPartOf`) are small inline references —
// { "@type", "@id", name } — not full nodes. The `@id`s are stable across
// pages and languages, so crawlers still recognise ONE business, ONE
// person, ONE website.
//
// The builders also know about properties the site has no content for yet
// (phone, opening hours, service descriptions, …). Those live in the
// dictionaries as `TODO` (see ./todo.ts) and are dropped from the output
// by `prune` until they have a real value — so this file doubles as the
// checklist of what content to add.

const CONTEXT = "https://schema.org";

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
const businessRef = (dict: Dictionary) => ({
  "@type": "ProfessionalService",
  "@id": schemaIds.business,
  name: dict.business.name,
});

const websiteRef = (lang: Lang, dict: Dictionary) => ({
  "@type": "WebSite",
  "@id": schemaIds.website(lang),
  url: absoluteUrl(routes.home[lang]),
  name: dict.business.name,
});

// Image fields in the dictionary are a path under /public ("/workshop.jpg")
// or already an absolute URL. JSON-LD wants absolute. (A TODO passes
// through unchanged and is pruned.)
function assetUrl(value: string): string {
  return value.startsWith("/") ? `${siteConfig.siteUrl}${value}` : value;
}

function postalAddress(dict: Dictionary) {
  return {
    "@type": "PostalAddress",
    streetAddress: dict.business.contact.address.split(", ")[0],
    postalCode: dict.business.contact.address.match(/\d{5}/)?.[0],
    addressLocality: dict.business.serviceArea,
    addressCountry: "DE",
  };
}

function areaServed(dict: Dictionary) {
  return [
    { "@type": "City", name: dict.business.serviceArea },
    { "@type": "Country", name: "Germany" },
  ];
}

// The business is described in four facets, each carrying only the
// properties the page that uses it actually shows. All share one `@id`.
//   identity — home page: name, tagline, logo, photo, address (footer), area, languages
//   contact  — contact page: how and when to reach you, and where you are
//   workshop — workshop page: materials, applications, machine capabilities
//   legal    — impressum: registered name, VAT ID, and the contact data it must list
function businessCore(dict: Dictionary) {
  return {
    "@context": CONTEXT,
    "@type": "ProfessionalService",
    "@id": schemaIds.business,
    name: dict.business.name,
    url: siteConfig.siteUrl,
  };
}

// Organization > LocalBusiness > ProfessionalService: who provides the service.
export function buildProfessionalService(dict: Dictionary) {
  return prune({
    ...businessCore(dict),
    description: dict.meta.description,
    slogan: dict.schema.slogan,
    // .svg, not a raster PNG — no PNG export of the logo exists yet.
    // Most rich-result consumers accept svg; revisit if that changes.
    logo: `${siteConfig.siteUrl}/logo.svg`,
    image: assetUrl(dict.business.image),
    foundingDate: dict.business.foundingDate,
    priceRange: dict.business.priceRange,
    address: postalAddress(dict),
    areaServed: areaServed(dict),
    // "fr" only if the owner confirms — not claimed here since nothing
    // on the site is actually in French yet.
    knowsLanguage: [...SUPPORTED_LANGS],
    // Populated once the owner provides real profile URLs — see
    // siteConfig.social's own comment.
    sameAs: [...siteConfig.social],
  });
}

export function buildBusinessContact(dict: Dictionary) {
  const { email, phone } = dict.business.contact;

  return prune({
    ...businessCore(dict),
    email,
    telephone: phone,
    address: postalAddress(dict),
    geo: {
      "@type": "GeoCoordinates",
      latitude: dict.business.geo.latitude,
      longitude: dict.business.geo.longitude,
    },
    hasMap: dict.business.hasMapUrl,
    openingHours: [...dict.business.openingHours],
    areaServed: areaServed(dict),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email,
      telephone: phone,
      availableLanguage: [...SUPPORTED_LANGS],
    },
  });
}

export function buildBusinessWorkshop(dict: Dictionary) {
  return prune({
    ...businessCore(dict),
    knowsAbout: [...dict.workshop.cards.materials.items, ...dict.workshop.cards.applications.items],
    additionalProperty: dict.workshop.cards.machineCapabilities.items.map((value) => ({
      "@type": "PropertyValue",
      name: dict.workshop.cards.machineCapabilities.heading,
      value,
    })),
  });
}

export function buildBusinessLegal(dict: Dictionary) {
  return prune({
    ...businessCore(dict),
    legalName: dict.business.registeredName,
    vatID: dict.business.vatId,
    email: dict.business.contact.email,
    telephone: dict.business.contact.phone,
    address: postalAddress(dict),
  });
}

// Person: the individual behind the business (the same natural person the
// Impressum names — dict.business.legalName). `profile` adds what a visitor
// reads in a "who I am" section — job title, bio, portrait, skills — which
// only belongs on the page that shows them (the workshop page).
export function buildPerson(dict: Dictionary, { profile }: { profile: boolean }) {
  return prune({
    "@context": CONTEXT,
    "@type": "Person",
    "@id": schemaIds.person,
    name: dict.business.legalName,
    worksFor: businessRef(dict),
    ...(profile && {
      jobTitle: dict.schema.person.jobTitle,
      description: dict.schema.person.description,
      image: assetUrl(dict.business.person.image),
      knowsAbout: [
        ...dict.workshop.cards.materials.items,
        ...dict.workshop.cards.technology.items,
      ],
    }),
    ...(siteConfig.social.length > 0 && { sameAs: [...siteConfig.social] }),
  });
}

// Intangible > Service: what the customer receives — one per entry in the
// services card ("CAD & design", "CNC machining", "Assembly & finishing").
export function buildServices(lang: Lang, dict: Dictionary) {
  return dict.services.cards.services.items.map((name, index) =>
    prune({
      "@context": CONTEXT,
      "@type": "Service",
      "@id": schemaIds.service(index),
      name,
      serviceType: name,
      // The three descriptions follow the order of the services card.
      description: dict.schema.services.descriptions[index],
      provider: businessRef(dict),
      areaServed: areaServed(dict),
      audience: { "@type": "Audience", audienceType: dict.schema.services.audience },
      // "Workshop pickup", "Shipping" — shown on the services page.
      availableChannel: dict.services.cards.deliveryOptions.items.map((channel) => ({
        "@type": "ServiceChannel",
        name: channel,
      })),
      termsOfService: assetUrl(dict.business.termsOfServiceUrl),
      url: absoluteUrl(routes.services[lang]),
    }),
  );
}

// CreativeWork > WebSite: the entire website (one per language version).
export function buildWebSite(lang: Lang, dict: Dictionary) {
  return prune({
    "@context": CONTEXT,
    ...websiteRef(lang, dict),
    description: dict.meta.description,
    inLanguage: lang,
    publisher: businessRef(dict),
  });
}

// Pages that are about the business itself; the legal/utility pages
// (privacy, impressum) aren't "about" it in any useful sense.
const ABOUT_BUSINESS: readonly RouteKey[] = ["home", "services", "workshop", "contact"];

// WebPage subtypes where one fits the page better than plain WebPage.
const PAGE_TYPE: Partial<Record<RouteKey, string>> = {
  workshop: "AboutPage",
  contact: "ContactPage",
};

// CreativeWork > WebPage: an individual page within that website.
export function buildWebPage(key: RouteKey, lang: Lang, dict: Dictionary) {
  const { title, description } = dict.pages[key];
  const { published, modified } = dict.business.pageDates[key];

  return prune({
    "@context": CONTEXT,
    "@type": PAGE_TYPE[key] ?? "WebPage",
    "@id": schemaIds.webPage(key, lang),
    url: absoluteUrl(routes[key][lang]),
    name: `${title} · ${dict.business.name}`,
    description,
    inLanguage: lang,
    datePublished: published,
    dateModified: modified,
    isPartOf: websiteRef(lang, dict),
    ...(ABOUT_BUSINESS.includes(key) && { about: businessRef(dict) }),
    // Home has no breadcrumb trail (see buildBreadcrumbs).
    ...(key !== "home" && { breadcrumb: { "@id": schemaIds.breadcrumb(key, lang) } }),
    // The services page is the one that is *about* the Service entities.
    ...(key === "services" && {
      mainEntity: dict.services.cards.services.items.map((_, index) => ({
        "@id": schemaIds.service(index),
      })),
    }),
  });
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
    "@context": CONTEXT,
    "@type": "BreadcrumbList",
    "@id": schemaIds.breadcrumb(key, lang),
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

type Node = { "@context": string } & Record<string, unknown>;

// What each page carries besides its own WebPage + breadcrumb: only the
// entities whose content a visitor can see on that page.
const pageSections: Record<RouteKey, (lang: Lang, dict: Dictionary) => Node[]> = {
  // The business is what the home page is about; it also hosts the WebSite.
  home: (lang, dict) => [buildProfessionalService(dict), buildWebSite(lang, dict)],
  // The three services the page lists.
  services: (lang, dict) => buildServices(lang, dict),
  // Materials/applications/machine specs, and the person who works with them.
  workshop: (_lang, dict) => [
    buildBusinessWorkshop(dict),
    buildPerson(dict, { profile: true }),
  ],
  // How, when and where to reach the business.
  contact: (_lang, dict) => [buildBusinessContact(dict)],
  // Utility page: nothing beyond WebPage + breadcrumb.
  privacy: () => [],
  // The legal notice names the business's legal facts and the person behind it.
  impressum: (_lang, dict) => [buildBusinessLegal(dict), buildPerson(dict, { profile: false })],
};

// Everything one page emits, as a single JSON-LD document: its page-scoped
// entities (pageSections) plus this page's own WebPage and breadcrumb.
export function buildPageGraph(key: RouteKey, lang: Lang, dict: Dictionary) {
  const nodes: Node[] = [
    ...pageSections[key](lang, dict),
    buildWebPage(key, lang, dict),
    ...(key === "home" ? [] : [buildBreadcrumbs(key, lang, dict)]),
  ];

  return {
    "@context": CONTEXT,
    // @context is hoisted to the top level, so drop it from each node.
    "@graph": nodes.map((node) => {
      const { "@context": _context, ...rest } = node;
      void _context;
      return rest;
    }),
  };
}
