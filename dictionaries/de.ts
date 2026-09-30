// German dictionary — a drafted translation of dictionaries/en (the
// source of truth). Shape must stay identical to Dictionary (see there),
// so a missing German key is a type error, not a silent English fallback
// in a German page.
//
// TODO: review — machine-drafted translation throughout. Needs a native
// speaker's review before this copy is treated as final.
//
// Content lives in one file per page (./pages/*) plus the site-wide
// chrome (./meta, ./nav, ./footer, ./not-found), each holding English
// and German side by side — this file (and ./en.ts) only pulls its own
// language out of each and assembles the Dictionary shape every
// component actually reads from.

import type { Dictionary } from "./en";
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
  meta: meta.de,
  pages: {
    home: { title: homePage.de.metaTitle, description: homePage.de.metaDescription },
    services: { title: servicesPage.de.metaTitle, description: servicesPage.de.metaDescription },
    workshop: { title: workshopPage.de.metaTitle, description: workshopPage.de.metaDescription },
    contact: { title: contactPage.de.metaTitle, description: contactPage.de.metaDescription },
    privacy: { title: privacyPage.de.metaTitle, description: privacyPage.de.metaDescription },
    impressum: { title: impressumPage.de.metaTitle, description: impressumPage.de.metaDescription },
  },
  readMore: {
    home: homePage.de.readMore,
    services: servicesPage.de.readMore,
    workshop: workshopPage.de.readMore,
    contact: contactPage.de.readMore,
  },
  nav: nav.de,
  footer: footer.de,
  services: {
    cards: servicesPage.de.cards,
  },
  workshop: {
    cards: workshopPage.de.cards,
    imageAlt: workshopPage.de.imageAlt,
  },
  contact: {
    fields: contactPage.de.fields,
    attachmentHint: contactPage.de.attachmentHint,
    attachmentTooLarge: contactPage.de.attachmentTooLarge,
    removeAttachment: contactPage.de.removeAttachment,
    sending: contactPage.de.sending,
    success: contactPage.de.success,
    help: contactPage.de.help,
  },
  privacy: {
    title: privacyPage.de.title,
    paragraphs: privacyPage.de.paragraphs,
    homeLinkLabel: privacyPage.de.homeLinkLabel,
  },
  impressum: {
    title: impressumPage.de.title,
    fields: impressumPage.de.fields,
    placeholder: impressumPage.de.placeholder,
    homeLinkLabel: impressumPage.de.homeLinkLabel,
  },
  notFound: notFoundPage.de,
};
