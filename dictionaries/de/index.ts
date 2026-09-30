// German dictionary — a drafted translation of dictionaries/en (the
// source of truth). Shape must stay identical to Dictionary (see there),
// so a missing German key is a type error, not a silent English fallback
// in a German page.
//
// TODO: review — machine-drafted translation throughout. Needs a native
// speaker's review before this copy is treated as final (see P1.1 in
// SEO-SPEC.md).
//
// Content lives in one file per page (./pages/*) plus the site-wide
// chrome (./meta, ./nav, ./footer, ./not-found) — this file only
// assembles those pieces into the Dictionary shape every component
// actually reads from.

import type { Dictionary } from "../en";
import { footer } from "./footer";
import { meta } from "./meta";
import { nav } from "./nav";
import { notFoundPage } from "./not-found";
import { contactPage } from "./pages/contact";
import { homePage } from "./pages/home";
import { impressumPage } from "./pages/impressum";
import { privacyPage } from "./pages/privacy";
import { servicesPage } from "./pages/services";
import { workshopPage } from "./pages/workshop";

export const de: Dictionary = {
  meta,
  pages: {
    home: { title: homePage.metaTitle, description: homePage.metaDescription },
    services: { title: servicesPage.metaTitle, description: servicesPage.metaDescription },
    workshop: { title: workshopPage.metaTitle, description: workshopPage.metaDescription },
    contact: { title: contactPage.metaTitle, description: contactPage.metaDescription },
    privacy: { title: privacyPage.metaTitle, description: privacyPage.metaDescription },
    impressum: { title: impressumPage.metaTitle, description: impressumPage.metaDescription },
  },
  readMore: {
    home: homePage.readMore,
    services: servicesPage.readMore,
    workshop: workshopPage.readMore,
    contact: contactPage.readMore,
  },
  nav,
  footer,
  services: {
    cards: servicesPage.cards,
  },
  workshop: {
    cards: workshopPage.cards,
    imageAlt: workshopPage.imageAlt,
  },
  contact: {
    fields: contactPage.fields,
    attachmentHint: contactPage.attachmentHint,
    attachmentTooLarge: contactPage.attachmentTooLarge,
    removeAttachment: contactPage.removeAttachment,
    sending: contactPage.sending,
    success: contactPage.success,
    help: contactPage.help,
  },
  privacy: {
    title: privacyPage.title,
    paragraphs: privacyPage.paragraphs,
    homeLinkLabel: privacyPage.homeLinkLabel,
  },
  impressum: {
    title: impressumPage.title,
    fields: impressumPage.fields,
    placeholder: impressumPage.placeholder,
    homeLinkLabel: impressumPage.homeLinkLabel,
  },
  notFound: notFoundPage,
};
