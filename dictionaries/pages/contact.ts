// Contact page (app/(en)/contact/page.tsx, app/[lang]/kontakt/page.tsx) —
// also feeds components/contact/contact-form.tsx's fields and messages.
// Both languages live here side by side so they stay easy to compare and
// keep in sync.
export const contactPage = {
  en: {
    metaTitle: "Request a quote",
    metaDescription:
      "Request a CNC machining quote in Berlin: send your CAD file, sketch, dimensions, material and quantity — get workshop pickup or shipping options.",
    // TODO: owner copy.
    readMore:
      "To request a quote, send me your project by email or through the form below. It helps to include:\n\n- A CAD file (DXF, DWG or STEP) or a sketch as a PDF or image\n- The dimensions\n- The material you'd like to use\n- The quantity.\n\nThe more details you share, the faster I can get back to you.\n\nNot sure about everything yet? Even if you only have a rough idea, or nothing at all, just get in touch and we'll figure it out together.",
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
  de: {
    metaTitle: "Angebot anfordern",
    metaDescription:
      "CNC-Fertigungsanfrage in Berlin: CAD-Datei, Skizze, Maße, Material und gewünschte Menge senden — Abholung in der Werkstatt oder Versand möglich.",
    readMore:
      "Um ein Angebot anzufragen, schick mir dein Projekt per Kontakt Formular oder per E-Mail. Bitte füge foldende informationen hinzu:\n\n- Eine CAD-Datei (DXF, DWG oder STEP) oder eine Skizze als PDF oder Bild\n- Die Maße\n- Das gewünschte Material\n- Die gewünschte Stückzahl\n\nJe mehr Infos du mir gibst, desto schneller kann ich deine Anfrage beantworten.\n\nDu bist dir noch nicht bei allem sicher? Auch wenn du nur eine grobe Idee hast, oder noch gar nichts Konkretes, melde dich einfach. Wir finden gemeinsam heraus, was möglich ist.",
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
};
