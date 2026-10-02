import { TODO } from "../../shared/seo/todo";

// Privacy page (app/(en)/privacy/page.tsx, app/[lang]/datenschutz/page.tsx)
// — feeds components/privacy-panel/privacy-panel.tsx. Both languages
// live here side by side so they stay easy to compare and keep in sync.
export const privacyPage = {
  en: {
    metadata: {
      title: "Privacy Policy",
      description:
        "How Atelier Cut handles data: no analytics or tracking cookies, contact form messages are sent via Resend, and the site is hosted on Vercel.",
    },
    websiteContent: {
      title: "Privacy",
      // Accessible name for the "back to home" link — describes the
      // destination, unlike the Continue graphic itself (an English-only
      // image asset kept as-is on both languages), so this is translated.
      homeLinkLabel: "Back to Home",
      paragraphs: [
        "This website does not collect or track your personal data and does not use analytics, advertising or tracking cookies.",
        "If you use the contact form, your message and attachments are sent via Resend, an email delivery service, and are not stored in any database.",
        "The website is hosted by Vercel and uses Cloudinary to deliver video content. These providers may process technical information, such as your IP address and browser information, to deliver the website and its content.",
      ],
    },
    schemas: {
      pageDates: { published: TODO, modified: TODO },
    },
  },
  de: {
    metadata: {
      title: "Datenschutzerklärung",
      description:
        "Wie Atelier Cut mit Daten umgeht: keine Analyse- oder Tracking-Cookies, Kontaktformular-Nachrichten werden über Resend versendet, gehostet auf Vercel.",
    },
    websiteContent: {
      title: "Datenschutz",
      homeLinkLabel: "Zurück zur Startseite",
      paragraphs: [
        "Diese Website erfasst oder verfolgt keine personenbezogenen Daten und verwendet keine Analyse-, Werbe- oder Tracking-Cookies.",
        "Wenn Sie das Kontaktformular verwenden, werden Ihre Nachricht und Anhänge über Resend, einen E-Mail-Zustelldienst, versendet und nicht in einer Datenbank gespeichert.",
        "Die Website wird von Vercel gehostet und nutzt Cloudinary zur Auslieferung von Videoinhalten. Diese Anbieter verarbeiten möglicherweise technische Informationen wie Ihre IP-Adresse und Browserinformationen, um die Website und ihre Inhalte bereitzustellen.",
      ],
    },
    schemas: {
      pageDates: { published: TODO, modified: TODO },
    },
  },
};
