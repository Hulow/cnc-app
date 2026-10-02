import type { Dictionary } from "@/dictionaries/en";
import { siteConfig } from "../../site-config";
import { SUPPORTED_LANGS, type Lang } from "../../routes";
import { prune } from "../todo";
import { areaServed, assetUrl, businessCore, businessRef, CONTEXT, postalAddress, websiteRef } from "./common";

// What the home page shows: the business as a whole (identity — name,
// tagline, logo, photo, address, area, languages) and the website itself.

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
