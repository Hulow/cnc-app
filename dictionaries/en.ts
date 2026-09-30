// English dictionary — the source-of-truth wording; German is a drafted
// translation of this. Keep both languages' shapes identical (see the
// Dictionary type below) so a missing German key is a type error, not a
// silent English fallback in a German page.
//
// Content lives in one file per page (./pages/*) plus the site-wide
// chrome (./meta, ./nav, ./footer, ./not-found), each holding English
// and German side by side — this file (and ./de.ts) only pulls its own
// language out of each and assembles the Dictionary shape every
// component actually reads from.

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
  readMore: {
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
  meta: meta.en,
  pages: {
    home: { title: homePage.en.metaTitle, description: homePage.en.metaDescription },
    services: { title: servicesPage.en.metaTitle, description: servicesPage.en.metaDescription },
    workshop: { title: workshopPage.en.metaTitle, description: workshopPage.en.metaDescription },
    contact: { title: contactPage.en.metaTitle, description: contactPage.en.metaDescription },
    privacy: { title: privacyPage.en.metaTitle, description: privacyPage.en.metaDescription },
    impressum: { title: impressumPage.en.metaTitle, description: impressumPage.en.metaDescription },
  },
  readMore: {
    home: homePage.en.readMore,
    services: servicesPage.en.readMore,
    workshop: workshopPage.en.readMore,
    contact: contactPage.en.readMore,
  },
  nav: nav.en,
  footer: footer.en,
  services: {
    cards: servicesPage.en.cards,
  },
  workshop: {
    cards: workshopPage.en.cards,
    imageAlt: workshopPage.en.imageAlt,
  },
  contact: {
    fields: contactPage.en.fields,
    attachmentHint: contactPage.en.attachmentHint,
    attachmentTooLarge: contactPage.en.attachmentTooLarge,
    removeAttachment: contactPage.en.removeAttachment,
    sending: contactPage.en.sending,
    success: contactPage.en.success,
    help: contactPage.en.help,
  },
  privacy: {
    title: privacyPage.en.title,
    paragraphs: privacyPage.en.paragraphs,
    homeLinkLabel: privacyPage.en.homeLinkLabel,
  },
  impressum: {
    title: impressumPage.en.title,
    fields: impressumPage.en.fields,
    placeholder: impressumPage.en.placeholder,
    homeLinkLabel: impressumPage.en.homeLinkLabel,
  },
  notFound: notFoundPage.en,
};
