// Impressum page (app/(en)/impressum/page.tsx, app/[lang]/impressum/page.tsx)
// — feeds components/impressum-panel/impressum-panel.tsx. Both languages
// live here side by side so they stay easy to compare and keep in sync.
//
// TODO: owner content — real German Impressum facts (§ 5 TMG), not
// drafted by the agent. Only `name`, `email` and `address` are filled
// in, because those are already public elsewhere on the site (footer,
// contact page) — not new facts.
// Everything else the law actually requires (phone, VAT ID/Kleinunternehmer
// note, register entry if any) is `placeholder` because it doesn't exist
// anywhere in this codebase to reuse.
export const impressumPage = {
  en: {
    metaTitle: "Legal Notice",
    metaDescription: "Legal notice (Impressum) for Atelier Cut, required under German law.",
    title: "Legal Notice",
    fields: {
      name: "Name",
      address: "Address",
      email: "Email",
      phone: "Phone",
      vatId: "VAT ID",
      responsibleContent: "Responsible for content (§ 18 (2) MStV)",
    },
    placeholder: "TODO — to be confirmed by the owner",
    homeLinkLabel: "Back to Home",
  },
  de: {
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
  },
};
