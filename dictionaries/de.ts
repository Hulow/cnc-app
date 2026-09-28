// TODO: review — machine-drafted German translation. Needs a native
// speaker's review before this copy is treated as final (see P1.1 in
// SEO-SPEC.md). Shape must stay identical to en.ts's Dictionary type.

import type { Dictionary } from "./en";

export const de: Dictionary = {
  meta: {
    // Pre-existing copy from shared/site-config.ts (the site's original
    // description, before P0.1 — already real German, not machine-drafted).
    description:
      "Individuelle CNC-Fertigung in Berlin: CNC Fräsen, CNC Zuschnitt und CNC Holzfräsen für Ihre Projekte.",
    ogLocale: "de_DE",
    ogAlternateLocale: "en_US",
  },
  pages: {
    home: {
      title: "CNC-Designobjekte & Prototypen aus Berlin",
      description:
        "Atelier Cut entwirft und fertigt Prototypen, Einzelstücke und Kleinserien per CNC in Berlin — von der CAD-Datei, Skizze oder Idee bis zum fertigen Teil.",
    },
    services: {
      title: "Prototypen, Unikate & Kleinserien in Berlin",
      description:
        "CNC-Fertigungsleistungen in Berlin: Prototypen, Einzelstücke und Kleinserien, von CAD-Design über CNC-Bearbeitung bis Montage und Veredelung.",
    },
    workshop: {
      title: "3-Achs-CNC-Werkstatt in Berlin — 2,2 × 1,5 m",
      description:
        "Die CNC-Werkstatt in Berlin: eine 3-Achs-Maschine mit 2,2 × 1,5 m Arbeitsbereich, für Holz, Aluminium und Kunststoffe — für Akustik, Möbel und Kunst.",
    },
    contact: {
      title: "Anfrage & Angebot — CNC-Werkstatt Berlin",
      description:
        "CNC-Fertigungsanfrage in Berlin: CAD-Datei, Skizze, Maße, Material und gewünschte Menge senden — Abholung in der Werkstatt oder Versand möglich.",
    },
    privacy: {
      title: "Datenschutzerklärung",
      description:
        "Wie Atelier Cut mit Daten umgeht: keine Analyse- oder Tracking-Cookies, Kontaktformular-Nachrichten werden über Resend versendet, gehostet auf Vercel.",
    },
  },
  nav: {
    home: "Start",
    services: "Leistungen",
    workshop: "Werkstatt",
    contact: "Kontakt",
  },
  footer: {
    privacy: "Datenschutz",
  },
  languageSwitcher: {
    label: "English",
  },
  services: {
    cards: {
      cuttingServices: {
        heading: "Fräsleistungen",
        items: ["Prototypen", "Einzelstücke", "Kleinserien"],
      },
      servicesCanInclude: {
        heading: "Leistungen können beinhalten",
        items: ["CAD & Design", "CNC-Bearbeitung", "Montage & Veredelung"],
      },
      quotesAreBasedOn: {
        heading: "Angebote basieren auf",
        items: ["Material", "Größe & Menge", "Designkomplexität"],
      },
      deliveryOptions: {
        heading: "Lieferoptionen",
        items: ["Abholung in der Werkstatt", "Versand"],
      },
    },
    note: "Ob Sie mit einer CAD-Datei, einer Skizze oder einfach nur einer Idee kommen – ich helfe Ihnen herauszufinden, wie sie umgesetzt werden kann.",
  },
  workshop: {
    cards: {
      machineCapabilities: {
        heading: "Maschinenfähigkeiten",
        items: ["Arbeitsbereich: 2,2 m × 1,5 m", "3-Achs-CNC"],
      },
      materials: {
        heading: "Materialien",
        items: ["Holz", "Aluminium", "Kunststoffe"],
      },
      applications: {
        heading: "Anwendungen",
        items: ["Kunst", "Akustik", "Design", "Architektur", "Möbel", "Technik", "Und mehr"],
      },
      technology: {
        // ESP32/grblHAL/Universal Gcode Sender/Fusion 360 are product
        // names — left untranslated.
        heading: "Technologie",
        items: ["ESP32 · Dual-core 32-bit", "grblHAL", "Universal Gcode Sender", "Fusion 360"],
      },
    },
    imageAlt: "CNC-Maschine beim Fräsen von Material",
  },
  contact: {
    fields: {
      company: "Firma",
      firstName: "Vorname",
      lastName: "Nachname",
      email: "E-Mail",
      phone: "Telefon",
      message: "Nachricht",
      attachment: "Anhang",
    },
    attachmentHint: (maxMb) => `Max. ${maxMb} MB.`,
    attachmentTooLarge: (mb) => `Der Anhang ist zu groß (${mb} MB).`,
    removeAttachment: "Anhang entfernen",
    sending: "Wird gesendet…",
    success: "Vielen Dank für Ihre Nachricht! Ich melde mich in Kürze bei Ihnen.",
    help: "Falls beim Ausfüllen des Formulars Probleme auftreten, schreiben Sie mir bitte eine E-Mail an victor@gmail.com.",
  },
  privacy: {
    title: "Datenschutz",
    homeLinkLabel: "Zurück zur Startseite",
    paragraphs: [
      "Diese Website erfasst oder verfolgt keine personenbezogenen Daten und verwendet keine Analyse-, Werbe- oder Tracking-Cookies.",
      "Wenn Sie das Kontaktformular verwenden, werden Ihre Nachricht und Anhänge über Resend, einen E-Mail-Zustelldienst, versendet und nicht in einer Datenbank gespeichert.",
      "Die Website wird von Vercel gehostet und nutzt Cloudinary zur Auslieferung von Videoinhalten. Diese Anbieter verarbeiten möglicherweise technische Informationen wie Ihre IP-Adresse und Browserinformationen, um die Website und ihre Inhalte bereitzustellen.",
    ],
  },
  notFound: {
    heading: "Seite nicht gefunden",
    body: "Die gesuchte Seite existiert nicht.",
  },
};
