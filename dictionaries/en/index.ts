// English dictionary — the source-of-truth wording; German (dictionaries/de)
// is a drafted translation of this. Keep both directories' shapes
// identical (see the Dictionary type below) so a missing German key is a
// type error, not a silent English fallback in a German page.
//
// Content lives in one file per page (./pages/*) plus the site-wide chrome
// (./meta, ./nav, ./footer, ./not-found) — this file only assembles those
// pieces into the Dictionary shape every component actually reads from.

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

interface PageMeta {
  // Page portion only — the root layout's title.template appends
  // " · Atelier Cut" automatically. Keep title + " · Atelier Cut" under
  // 60 characters total, and description between 140-160 characters —
  // see P1.2 in SEO-SPEC.md.
  title: string;
  description: string;
}

export interface Dictionary {
  meta: {
    description: string;
    ogLocale: string;
    ogAlternateLocale: string;
  };
  // Per-page <title>/<meta description> — unique per page, each (except
  // privacy, a utility page with no search intent of its own) containing
  // its main term and "Berlin".
  pages: {
    home: PageMeta;
    services: PageMeta;
    workshop: PageMeta;
    contact: PageMeta;
    privacy: PageMeta;
    impressum: PageMeta;
  };
  intro: {
    home: string;
    services: string;
    workshop: string;
    contact: string;
  };
  nav: {
    home: string;
    services: string;
    workshop: string;
    contact: string;
  };
  footer: {
    privacy: string;
    impressum: string;
  };
  services: {
    cards: {
      cuttingServices: { heading: string; items: string[] };
      services: { heading: string; items: string[] };
      quotesAreBasedOn: { heading: string; items: string[] };
      deliveryOptions: { heading: string; items: string[] };
    };
  };
  workshop: {
    cards: {
      machineCapabilities: { heading: string; items: string[] };
      materials: { heading: string; items: string[] };
      applications: { heading: string; items: string[] };
      technology: { heading: string; items: string[] };
    };
    imageAlt: string;
  };
  contact: {
    fields: {
      company: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      message: string;
      attachment: string;
    };
    attachmentHint: (maxMb: string) => string;
    attachmentTooLarge: (mb: string) => string;
    removeAttachment: string;
    sending: string;
    success: string;
    help: string;
  };
  privacy: {
    title: string;
    paragraphs: string[];
    homeLinkLabel: string;
  };
  impressum: {
    title: string;
    fields: {
      name: string;
      address: string;
      email: string;
      phone: string;
      vatId: string;
      responsibleContent: string;
    };
    placeholder: string;
    homeLinkLabel: string;
  };
  notFound: {
    heading: string;
    body: string;
    homeLinkLabel: string;
  };
}

export const en: Dictionary = {
  meta,
  pages: {
    home: { title: homePage.metaTitle, description: homePage.metaDescription },
    services: { title: servicesPage.metaTitle, description: servicesPage.metaDescription },
    workshop: { title: workshopPage.metaTitle, description: workshopPage.metaDescription },
    contact: { title: contactPage.metaTitle, description: contactPage.metaDescription },
    privacy: { title: privacyPage.metaTitle, description: privacyPage.metaDescription },
    impressum: { title: impressumPage.metaTitle, description: impressumPage.metaDescription },
  },
  intro: {
    home: homePage.intro,
    services: servicesPage.intro,
    workshop: workshopPage.intro,
    contact: contactPage.intro,
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
