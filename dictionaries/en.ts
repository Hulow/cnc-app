// English dictionary — the source-of-truth wording; German is a drafted
// translation of this. Keep both languages' shapes identical (see the
// Dictionary type below) so a missing German key is a type error, not a
// silent English fallback in a German page.
//
// Content lives in one file per page (./pages/*) plus the site-wide
// chrome (./site, ./meta, ./nav, ./footer, ./not-found), each holding
// English and German side by side — this file (and ./de.ts) only pulls
// its own language out of each and assembles the Dictionary shape every
// component actually reads from.
//
// Each page is one object with exactly three concerns: `metadata`
// (<title>/<meta description>), `websiteContent` (what's rendered on the
// page) and `schemas` (what feeds that page's JSON-LD, see
// shared/seo/schema-org.ts). Editing a page's content, metadata or
// structured-data inputs means opening exactly that page's file in
// ./pages — nothing is split across a separate business-facts or
// schema-copy file.
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
import { site, type Site } from "./site";

interface PageMetadata {
  // Page portion only — the root layout's title.template appends
  // " · Atelier Cut" automatically. Keep title + " · Atelier Cut" under
  // 60 characters total, and description between 140-160 characters.
  title: string;
  description: string;
}

interface PageDates {
  published: string;
  modified: string;
}

export interface Dictionary {
  site: Site;
  meta: {
    description: string;
    ogLocale: string;
    ogAlternateLocale: string;
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
  home: {
    metadata: PageMetadata;
    websiteContent: {
      readMore: string;
    };
    schemas: {
      slogan: string;
      foundingDate: string;
      priceRange: string;
      image: string;
      pageDates: PageDates;
    };
  };
  services: {
    metadata: PageMetadata;
    websiteContent: {
      readMore: string;
      cards: {
        cuttingServices: { heading: string; descriptions: string[] };
        services: { heading: string; descriptions: string[] };
        quotesAreBasedOn: { heading: string; descriptions: string[] };
        deliveryOptions: { heading: string; descriptions: string[] };
      };
    };
    schemas: {
      audience: string;
      descriptions: string[];
      termsOfServiceUrl: string;
      pageDates: PageDates;
    };
  };
  workshop: {
    metadata: PageMetadata;
    websiteContent: {
      readMore: string;
      cards: {
        machineCapabilities: { heading: string; items: string[] };
        materials: { heading: string; items: string[] };
        applications: { heading: string; items: string[] };
        technology: { heading: string; items: string[] };
      };
      imageAlt: string;
    };
    schemas: {
      jobTitle: string;
      description: string;
      personImage: string;
      pageDates: PageDates;
    };
  };
  contact: {
    metadata: PageMetadata;
    websiteContent: {
      readMore: string;
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
    schemas: {
      email: string;
      phone: string;
      geo: { latitude: string; longitude: string };
      hasMapUrl: string;
      openingHours: string[];
      pageDates: PageDates;
    };
  };
  privacy: {
    metadata: PageMetadata;
    websiteContent: {
      title: string;
      paragraphs: string[];
      homeLinkLabel: string;
    };
    schemas: {
      pageDates: PageDates;
    };
  };
  impressum: {
    metadata: PageMetadata;
    websiteContent: {
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
    schemas: {
      email: string;
      phone: string;
      registeredName: string;
      vatId: string;
      pageDates: PageDates;
    };
  };
  notFound: {
    heading: string;
    body: string;
    homeLinkLabel: string;
  };
}

export const en: Dictionary = {
  site,
  meta: meta.en,
  nav: nav.en,
  footer: footer.en,
  home: homePage.en,
  services: servicesPage.en,
  workshop: workshopPage.en,
  contact: contactPage.en,
  privacy: privacyPage.en,
  impressum: impressumPage.en,
  notFound: notFoundPage.en,
};
