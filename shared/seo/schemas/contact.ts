import type { Dictionary } from "@/dictionaries/en";
import { SUPPORTED_LANGS } from "../../routes";
import { prune } from "../todo";
import { areaServed, businessCore, postalAddress } from "./common";

// What the contact page shows: how, when and where to reach the business.
export function buildBusinessContact(dict: Dictionary) {
  const { email, phone, geo, hasMapUrl, openingHours } = dict.contact.schemas;

  return prune({
    ...businessCore(dict),
    email,
    telephone: phone,
    address: postalAddress(dict),
    geo: {
      "@type": "GeoCoordinates",
      latitude: geo.latitude,
      longitude: geo.longitude,
    },
    hasMap: hasMapUrl,
    openingHours: [...openingHours],
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
