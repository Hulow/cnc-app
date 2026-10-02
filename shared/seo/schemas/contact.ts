import type { Dictionary } from "@/dictionaries/en";
import { SUPPORTED_LANGS } from "../../routes";
import { prune } from "../todo";
import { areaServed, businessCore, postalAddress } from "./common";

// What the contact page shows: how, when and where to reach the business.
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
