import { TODO } from "../../shared/seo/todo";

// Contact page (app/(en)/contact/page.tsx, app/[lang]/kontakt/page.tsx) —
// also feeds components/contact/contact-form.tsx's fields and messages.
// Both languages live here side by side so they stay easy to compare and
// keep in sync.
export const contactPage = {
  en: {
    metadata: {
      title: "Request a quote",
      description:
        "Request a CNC machining quote in Berlin: send your CAD file, sketch, dimensions, material and quantity — get workshop pickup or shipping options.",
    },
    websiteContent: {
      readMore:
        "To request a quote, send me your project by email or through the form below. It helps to include:\n\n- A CAD file (DXF, DWG or STEP) or a sketch as a PDF or image\n- The dimensions\n- The material you'd like to use\n- The quantity.\n\nThe more details you share, the faster I can get back to you.\n\nNot sure about everything yet? Even if you only have a rough idea, or nothing at all, just get in touch and we'll figure it out together.",
      // The four cards rendered on the contact page (see
      // components/contact/contact-route.tsx): Workshop, What to
      // include, Contact me and Help.
      cards: {
        workshop: {
          heading: "Workshop",
          addressHeading: "Address",
          addressLines: ["Atelier Cut", "Coppistraße 17", "10365 Berlin"],
          hoursHeading: "Opening Times:",
          hoursText: "From Monday to Friday\n9h30-12h30 and 13h30-17h30.\nVisits by appointment only.",
          emailHeading: "Email:",
          email: "victor@atelier-cut.com",
        },
        whatToInclude: { heading: "What to include" },
        contactMe: { heading: "Contact me" },
        help: { heading: "Help" },
      },
      fields: {
        company: "Company",
        firstName: "First name",
        lastName: "Last name",
        email: "Email",
        phone: "Phone",
        message: "Message",
        attachment: "Attachment",
      },
      attachmentHint: (maxMb: string) => `Max ${maxMb} MB`,
      attachmentTooLarge: (mb: string) => `The attachment is too large (${mb} MB).`,
      removeAttachment: "Remove attachment",
      sending: "Sending…",
      success: "Thanks for reaching out! I will get back to you soon.",
      help: "If you are experiencing any issues while filling out the form, please email me at victor@atelier-cut.com.",
    },
    schemas: {
      // → ContactPoint/LocalBusiness.email.
      email: "victor@atelier-cut.com",
      // → ContactPoint/LocalBusiness.telephone.
      phone: TODO,
      // → GeoCoordinates.
      geo: { latitude: TODO, longitude: TODO },
      // → LocalBusiness.hasMap.
      hasMapUrl: TODO,
      // → LocalBusiness.openingHours, schema.org day-range syntax (e.g.
      // "Mo-Fr 09:00-17:00"). Empty, not TODO, since it's a list rather
      // than a single value with no real content yet.
      openingHours: [] as string[],
      pageDates: { published: TODO, modified: TODO },
    },
  },
  de: {
    metadata: {
      title: "Angebot anfordern",
      description:
        "CNC-Fertigungsanfrage in Berlin: CAD-Datei, Skizze, Maße, Material und gewünschte Menge senden — Abholung in der Werkstatt oder Versand möglich.",
    },
    websiteContent: {
      readMore:
        "Um ein Angebot anzufragen, schick mir dein Projekt per Kontakt Formular oder per E-Mail. Bitte füge foldende informationen hinzu:\n\n- Eine CAD-Datei (DXF, DWG oder STEP) oder eine Skizze als PDF oder Bild\n- Die Maße\n- Das gewünschte Material\n- Die gewünschte Stückzahl\n\nJe mehr Infos du mir gibst, desto schneller kann ich deine Anfrage beantworten.\n\nDu bist dir noch nicht bei allem sicher? Auch wenn du nur eine grobe Idee hast, oder noch gar nichts Konkretes, melde dich einfach. Wir finden gemeinsam heraus, was möglich ist.",
      cards: {
        workshop: {
          heading: "Werkstatt",
          addressHeading: "Adresse",
          addressLines: ["Atelier Cut", "Coppistraße 17", "10365 Berlin"],
          hoursHeading: "Öffnungszeiten:",
          hoursText: "Montag bis Freitag\n9:30–12:30 Uhr und 13:30–17:30 Uhr.\nBesuche nur nach Terminvereinbarung.",
          emailHeading: "E-Mail:",
          email: "victor@atelier-cut.com",
        },
        whatToInclude: { heading: "Was du hast" },
        contactMe: { heading: "Schreib mir" },
        help: { heading: "Hilfe" },
      },
      fields: {
        company: "Firma",
        firstName: "Vorname",
        lastName: "Nachname",
        email: "E-Mail",
        phone: "Telefon",
        message: "Nachricht",
        attachment: "Anhang",
      },
      attachmentHint: (maxMb: string) => `Max. ${maxMb} MB`,
      attachmentTooLarge: (mb: string) => `Der Anhang ist zu groß (${mb} MB).`,
      removeAttachment: "Anhang entfernen",
      sending: "Wird gesendet…",
      success: "Vielen Dank für Ihre Nachricht! Ich melde mich in Kürze bei Ihnen.",
      help: "Falls beim Ausfüllen des Formulars Probleme auftreten, schreiben Sie mir bitte eine E-Mail an victor@atelier-cut.com.",
    },
    schemas: {
      email: "victor@atelier-cut.com",
      phone: TODO,
      geo: { latitude: TODO, longitude: TODO },
      hasMapUrl: TODO,
      openingHours: [] as string[],
      pageDates: { published: TODO, modified: TODO },
    },
  },
};
