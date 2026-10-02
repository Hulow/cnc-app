import { TODO } from "../../shared/seo/todo";

// Impressum page (app/(en)/impressum/page.tsx, app/[lang]/impressum/page.tsx)
// — feeds components/impressum-panel/impressum-panel.tsx. Both languages
// live here side by side so they stay easy to compare and keep in sync.
//
// TODO: owner content — real German Impressum facts (§ 5 TMG), not
// drafted by the agent. `name` and `address` come from dictionaries/site.ts
// (already public elsewhere on the site: footer, contact page) — not new
// facts. `email` is repeated from the contact page's own schemas for the
// same reason. Phone and VAT ID are real German legal requirements this
// codebase has no source for, so they render the placeholder text below
// instead of a guess. This whole page needs the owner's (and ideally a
// legal source's) review before it's final — an incorrect or incomplete
// Impressum is a real legal liability in Germany (Abmahnung risk), not
// just a copy nit.
export const impressumPage = {
  en: {
    metadata: {
      title: "Legal Notice",
      description: "Legal notice (Impressum) for Atelier Cut, required under German law.",
    },
    websiteContent: {
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
    schemas: {
      email: "victor@atelier-cut.com",
      // → ContactPoint/LocalBusiness.telephone, same number as the
      // contact page.
      phone: TODO,
      // → ProfessionalService.legalName, the registered business name
      // if it differs from the trading name.
      registeredName: TODO,
      // → ProfessionalService.vatID.
      vatId: TODO,
      pageDates: { published: TODO, modified: TODO },
    },
  },
  de: {
    metadata: {
      title: "Impressum",
      description: "Impressum für Atelier Cut gemäß § 5 TMG.",
    },
    websiteContent: {
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
    schemas: {
      email: "victor@atelier-cut.com",
      phone: TODO,
      registeredName: TODO,
      vatId: TODO,
      pageDates: { published: TODO, modified: TODO },
    },
  },
};
