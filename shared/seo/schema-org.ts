import type { Dictionary } from "@/dictionaries/en";
import { siteConfig } from "../site-config";
import { absoluteUrl, routes, type Lang, type RouteKey } from "../routes";
import { assetUrl, businessCore, businessRef, CONTEXT, postalAddress, schemaIds, websiteRef } from "./schemas/common";
import { buildProfessionalService, buildWebSite } from "./schemas/home";
import { buildBusinessContact } from "./schemas/contact";
import { buildBusinessWorkshop } from "./schemas/workshop";
import { buildServices } from "./schemas/services";
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
// page — see `pageSections` below for which page carries what. Most of
// those builders live one per page in ./schemas/ (home, contact, services,
// workshop); the entities below are the ones shared across more than one
// page (Person, WebPage, BreadcrumbList) or scoped to the two pages
// simple enough not to need their own file (impressum, privacy).
//
// Entities that a page merely points at (the business as a Service's
// `provider`, the WebSite a WebPage `isPartOf`) are small inline
// references — { "@type", "@id", name } — not full nodes. The `@id`s are
// stable across pages and languages, so crawlers still recognise ONE
// business, ONE person, ONE website.
//
// The builders also know about properties the site has no content for yet
// (phone, opening hours, service descriptions, …). Those live in the
// dictionaries as `TODO` (see ./todo.ts) and are dropped from the output
// by `prune` until they have a real value — so this file (and ./schemas/)
// doubles as the checklist of what content to add.

export { schemaIds } from "./schemas/common";
export { buildProfessionalService, buildWebSite } from "./schemas/home";
export { buildBusinessContact } from "./schemas/contact";
export { buildBusinessWorkshop } from "./schemas/workshop";
export { buildServices } from "./schemas/services";

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

// WebPage subtypes where one fits the page better than plain WebPage.
const PAGE_TYPE: Partial<Record<RouteKey, string>> = {
  workshop: "AboutPage",
  contact: "ContactPage",
};

// Pages that are about the business itself; the legal/utility pages
// (privacy, impressum) aren't "about" it in any useful sense.
const ABOUT_BUSINESS: readonly RouteKey[] = ["home", "services", "workshop", "contact"];

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

type Node = { "@context": string } & Record<string, unknown>;

// What each page carries besides its own WebPage + breadcrumb: only the
// entities whose content a visitor can see on that page.
const pageSections: Record<RouteKey, (lang: Lang, dict: Dictionary) => Node[]> = {
  // The business is what the home page is about; it also hosts the WebSite.
  home: (lang, dict) => [buildProfessionalService(dict), buildWebSite(lang, dict)],
  // The three services the page lists.
  services: (lang, dict) => buildServices(lang, dict),
  // Materials/applications/machine specs, and the person who works with them.
  workshop: (_lang, dict) => [buildBusinessWorkshop(dict), buildPerson(dict, { profile: true })],
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
