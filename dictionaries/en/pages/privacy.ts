// Privacy page (app/(en)/privacy/page.tsx, app/[lang]/datenschutz/page.tsx)
// — feeds components/privacy-panel/privacy-panel.tsx.
export const privacyPage = {
  metaTitle: "Privacy Policy",
  metaDescription:
    "How Atelier Cut handles data: no analytics or tracking cookies, contact form messages are sent via Resend, and the site is hosted on Vercel.",
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
};
