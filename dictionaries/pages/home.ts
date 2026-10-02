import { TODO } from "../../shared/seo/todo";

// Home page (app/(en)/page.tsx, app/[lang]/page.tsx). Both languages
// live here side by side so they stay easy to compare and keep in sync.
//
// `schemas` fields set to `TODO` are left out of the JSON-LD
// (shared/seo/schema-org.ts) until they have a real value — they're
// language-independent facts (a founding date, a price range…) rather
// than copy, so en/de carry the same placeholder until the owner fills
// them in, at which point both should get the same real value.
export const homePage = {
  en: {
    metadata: {
      title: "CNC cutting services in Berlin",
      //description -> Is what i have on google
      description:
        "Atelier Cut designs and CNC-machines prototypes, unique objects and small production series in Berlin — from a CAD file, sketch or idea to finished part.",
    },
    websiteContent: {
      readMore:
        "I run a CNC workshop in Berlin, next to Ostkreuz, inside the Coppi community. I help companies, designers, and individuals turn ideas into real objects: precise cuts, complex designs, and consistent quality, thanks to automated machining. \n\n Whether you have a finished file or just a sketch, you can talk to me directly. No minimum order, flexible on timing, and I reply fast. One prototype or a small series, I'll help you get it done quickly. \n\n Send me your project, or come by the workshop.",
    },
    schemas: {
      // → ProfessionalService.slogan. One short tagline.
      slogan: TODO,
      // → ProfessionalService.foundingDate (year or YYYY-MM-DD).
      foundingDate: TODO,
      // → ProfessionalService.priceRange, e.g. "€€".
      priceRange: TODO,
      // → ProfessionalService.image, a photo of the business (workshop/work).
      image: TODO,
      // → WebPage.datePublished/dateModified. Search engines cross-check
      // this against <Last-Modified>/sitemap dates, so it should reflect
      // reality even though it isn't visible copy.
      pageDates: { published: TODO, modified: TODO },
    },
  },
  de: {
    metadata: {
      title: "CNC-Zuschnitt in Berlin",
      description:
        "Atelier Cut entwirft und fertigt Prototypen, Einzelstücke und Kleinserien per CNC in Berlin — von der CAD-Datei, Skizze oder Idee bis zum fertigen Teil.",
    },
    websiteContent: {
      readMore:
        "Ich betreibe eine CNC-Werkstatt in Berlin, nahe dem Ostkreuz, in der Coppi-Community. Ich helfe Unternehmen, Designer:innen und Privatpersonen dabei, ihre Ideen in echte Objekte zu verwandeln: präzise Zuschnitte, komplexe Designs und gleichbleibende Qualität dank automatisierter Fertigung. \n\n Ob du eine fertige Datei oder nur eine Skizze hast, du sprichst direkt mit mir. Keine Mindestbestellmenge, flexible Termine und schnelle Antworten. Ob einzelner Prototyp oder Kleinserie, ich helfe dir, es zügig umzusetzen. \n\n Schick mir dein Projekt oder komm einfach in der Werkstatt vorbei.",
    },
    schemas: {
      slogan: TODO,
      foundingDate: TODO,
      priceRange: TODO,
      image: TODO,
      pageDates: { published: TODO, modified: TODO },
    },
  },
};
