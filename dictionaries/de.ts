// German dictionary — a drafted translation of dictionaries/en (the
// source of truth). Shape must stay identical to Dictionary (see there),
// so a missing German key is a type error, not a silent English fallback
// in a German page.
//
// TODO: review — machine-drafted translation throughout. Needs a native
// speaker's review before this copy is treated as final.
//
// Content lives in one file per page (./pages/*) plus the site-wide
// chrome (./site, ./meta, ./nav, ./footer, ./not-found), each holding
// English and German side by side — this file (and ./en.ts) only pulls
// its own language out of each and assembles the Dictionary shape every
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
import { site } from "./site";

export const de: Dictionary = {
  site,
  meta: meta.de,
  nav: nav.de,
  footer: footer.de,
  home: homePage.de,
  services: servicesPage.de,
  workshop: workshopPage.de,
  contact: contactPage.de,
  privacy: privacyPage.de,
  impressum: impressumPage.de,
  notFound: notFoundPage.de,
};
