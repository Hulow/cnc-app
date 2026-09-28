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
    impressum: {
      title: "Impressum",
      description: "Impressum für Atelier Cut gemäß § 5 TMG.",
    },
  },
  intro: {
    home: "Atelier Cut ist eine CNC-Werkstatt in Berlin, geführt von Victor Le Fur, die Objekte, Prototypen und Kleinserien aus Holz, Aluminium und Kunststoff entwirft und fertigt. Die Arbeiten reichen von einzelnen Designobjekten und Kunstwerken bis zu funktionalen Teilen für Möbel, Architekturmodelle und Akustik — etwa Lautsprechergehäuse und Akustikpaneele. Jedes Projekt beginnt mit einer CAD-Datei, einer Skizze oder einfach einer Idee und wird selbst auf einer 3-Achs-CNC-Maschine gefertigt, bevor es in Berlin abgeholt oder verschickt wird.",
    services: "Jedes Projekt beginnt dort, wo Sie stehen: mit einer fertigen CAD-Datei, einer groben Skizze oder einfach einer Idee, die wir gemeinsam ausarbeiten. Atelier Cut fertigt Einzelstücke, Prototypen und Kleinserien in Berlin und passt den Prozess an das an, was Sie brauchen — ein einzelnes Unikat oder eine kleine Serie identischer Teile. Angebote basieren auf Material, Größe, Menge und Designkomplexität. Ist ein Teil fertig, können Sie es in der Werkstatt in Berlin abholen oder sich zuschicken lassen.",
    workshop: "Die Werkstatt arbeitet mit einer 3-Achs-CNC-Maschine mit 2,2 × 1,5 m Arbeitsbereich, die Holz, Aluminium und Kunststoffe bearbeitet, gesteuert mit grblHAL und Universal Gcode Sender, konstruiert in Fusion 360. Sie ist die Maschine hinter einer Vielzahl von Projekten: Lautsprechergehäuse, Akustikpaneele oder Diffusoren, Möbelteile, Kunstobjekte und Architekturmodelle, dazu Prototypen und Kleinserien für Design- und Technikprojekte — vom ersten Entwurf bis zum fertigen Teil.",
    contact: "Für ein Angebot senden Sie eine CAD-Datei (DXF, DWG, STEP oder STP) oder eine Skizze als PDF bzw. Bild von dem, was Sie brauchen, zusammen mit den Maßen, dem gewünschten Material und der Menge. Je mehr Details Sie im Voraus teilen, desto schneller kann ein Angebot zurückkommen — sind Sie sich noch nicht sicher, reichen eine grobe Skizze und eine kurze Beschreibung, um ins Gespräch zu kommen.",
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
  },
};
