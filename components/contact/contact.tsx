import { siteConfig } from "@/shared/site-config";
import { ContactButton } from "./contact-button";

// Server Component so the contact details (and mailto: link) are present
// in the server-rendered HTML, not dependent on client-side JavaScript.
// ContactButton is a client island for the interactive form; the mailto
// address above stays untouched as a no-JS fallback.
export function Contact() {
  return (
    <section aria-labelledby="contact-heading">
      <h2 id="contact-heading">Contact</h2>
      <address>
        <a href={`mailto:${siteConfig.contact.email}`}>
          {siteConfig.contact.email}
        </a>
        <br />
        {siteConfig.contact.address}
      </address>
      <ContactButton />
    </section>
  );
}
