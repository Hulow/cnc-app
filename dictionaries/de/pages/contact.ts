// Contact page (app/[lang]/kontakt/page.tsx) — also feeds
// components/contact/contact-form.tsx's fields and messages.
export const contactPage = {
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
};
