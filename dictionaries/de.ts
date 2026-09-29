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
      title: "CNC-Zuschnitt in Berlin",
      description:
        "Atelier Cut entwirft und fertigt Prototypen, Einzelstücke und Kleinserien per CNC in Berlin — von der CAD-Datei, Skizze oder Idee bis zum fertigen Teil.",
    },
    services: {
      title: "Mein Angebot",
      description:
        "CNC-Fertigungsleistungen in Berlin: Prototypen, Einzelstücke und Kleinserien, von CAD-Design über CNC-Bearbeitung bis Montage und Veredelung.",
    },
    workshop: {
      title: "Im Atelier",
      description:
        "Die CNC-Werkstatt in Berlin: eine 3-Achs-Maschine mit 2,2 × 1,5 m Arbeitsbereich, für Holz, Aluminium und Kunststoffe — für Akustik, Möbel und Kunst.",
    },
    contact: {
      title: "Angebot anfordern",
      description:
        "CNC-Fertigungsanfrage in Berlin: CAD-Datei, Skizze, Maße, Material und gewünschte Menge senden — Abholung in der Werkstatt oder Versand möglich.",
    },
    privacy: {
      title: "Datenschutzerklärung",
      description:
        "Wie Atelier Cut mit Daten umgeht: keine Analyse- oder Tracking-Cookies, Kontaktformular-Nachrichten werden über Resend versendet, gehostet auf Vercel.",
    },
    impressum: {
      title: "Impressum",
      description: "Impressum für Atelier Cut gemäß § 5 TMG.",
    },
  },
  intro: {
    home: "Ich betreibe eine CNC-Werkstatt in Berlin, nahe dem Ostkreuz, in der Coppi-Community. Ich helfe Unternehmen, Designer:innen und Privatpersonen dabei, ihre Ideen in echte Objekte zu verwandeln: präzise Zuschnitte, komplexe Designs und gleichbleibende Qualität dank automatisierter Fertigung. \n\n Ob du eine fertige Datei oder nur eine Skizze hast, du sprichst direkt mit mir. Keine Mindestbestellmenge, flexible Termine und schnelle Antworten. Ob einzelner Prototyp oder Kleinserie, ich helfe dir, es zügig umzusetzen. \n\n Schick mir dein Projekt oder komm einfach in der Werkstatt vorbei.",
    services: "Ich helfe dabei, Ideen in echte Objekte zu verwandeln: von präzisen Schnitten und komplexen Designs bis hin zu gleichbleibend Einzelteilen.\n\nEgal, ob du eine CAD-Datei, eine Skizze oder einfach nur eine Idee hast: Ich kann dir dabei helfen, herauszufinden, wie sie umgesetzt werden kann, von Design und CNC-Bearbeitung bis hin zu Montage und Nachbearbeitung.\n\nJedes Projekt ist anders, deshalb erstelle ich für jedes Projekt ein individuelles Angebot.\n\nDu kannst deine fertigen Teile in der Werkstatt abholen oder sie dir zuschicken lassen.",
    workshop: "Die Maschine verfügt über 3 Achsen und einen Arbeitsbereich von 2,2 × 1,5 m.\n\nDurch die präzise Steuerung von Spindeldrehzahl, Vorschub und Werkzeugen kann ich eine große Auswahl an Hölzern, Aluminium und Kunststoffen bearbeiten.\n\nIch bin offen für Projekte aller Art: für Kunden und Kundinnen in Berlin und ganz Deutschland.",
    contact: "Um ein Angebot anzufragen, schick mir dein Projekt per Kontakt Formular oder per E-Mail. Bitte füge foldende informationen hinzu:\n\n- Eine CAD-Datei (DXF, DWG oder STEP) oder eine Skizze als PDF oder Bild\n- Die Maße\n- Das gewünschte Material\n- Die gewünschte Stückzahl\n\nJe mehr Infos du mir gibst, desto schneller kann ich deine Anfrage beantworten.\n\nDu bist dir noch nicht bei allem sicher? Auch wenn du nur eine grobe Idee hast, oder noch gar nichts Konkretes, melde dich einfach. Wir finden gemeinsam heraus, was möglich ist.",
  },
  nav: {
    home: "Start",
    services: "Leistungen",
    workshop: "Werkstatt",
    contact: "Kontakt",
  },
  footer: {
    privacy: "Datenschutz",
    impressum: "Impressum",
  },
  services: {
    cards: {
      cuttingServices: {
        heading: "CNC-Zuschnitt",
        items: ["Prototypen", "Einzelstücke", "Kleinserien"],
      },
      servicesCanInclude: {
        heading: "Mögliche Leistungen",
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
  },
  workshop: {
    cards: {
      machineCapabilities: {
        heading: "Maschinenleistung",
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
    help: "Falls beim Ausfüllen des Formulars Probleme auftreten, schreiben Sie mir bitte eine E-Mail an victor@atelier-cut.com.",
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
  impressum: {
    title: "Impressum",
    fields: {
      name: "Name",
      address: "Anschrift",
      email: "E-Mail",
      phone: "Telefon",
      vatId: "USt-IdNr.",
      responsibleContent: "Verantwortlich für den Inhalt (§ 18 Abs. 2 MStV)",
    },
    placeholder: "TODO — vom Betreiber zu ergänzen",
    homeLinkLabel: "Zurück zur Startseite",
  },
  notFound: {
    heading: "Seite nicht gefunden",
    body: "Die gesuchte Seite existiert nicht.",
    homeLinkLabel: "Weiter",
  },
};
