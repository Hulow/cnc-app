// Impressum page (app/[lang]/impressum/page.tsx) — feeds
// components/impressum-panel/impressum-panel.tsx. See dictionaries/en's
// pages/impressum.ts for why only name/email/address are filled in and
// the rest is `placeholder`.
export const impressumPage = {
  metaTitle: "Impressum",
  metaDescription: "Impressum für Atelier Cut gemäß § 5 TMG.",
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
};
