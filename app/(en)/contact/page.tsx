import type { Metadata } from "next";
import { StructuredData } from "@/components/structured-data/structured-data";
import { ContactRoute } from "@/components/contact/contact-route";
import { en } from "@/dictionaries/en";
import { pageMetadata } from "@/shared/page-metadata";
import { buildBreadcrumbs } from "@/shared/structured-data";

export const metadata: Metadata = pageMetadata("contact", "en", en);

export default function ContactPage() {
  return (
    <>
      <StructuredData data={buildBreadcrumbs("contact", "en", en)} />
      <div className="contact-layout">
        {/* TODO: owner copy — see dictionaries/en.ts's intro.contact comment */}
        <ContactRoute lang="en" title={en.pages.contact.title} introText={en.intro.contact} />
      </div>
    </>
  );
}
