import type { Metadata } from "next";
import { SchemaOrg } from "@/components/schema-org/schema-org";
import { ContactRoute } from "@/components/contact/contact-route";
import { en } from "@/dictionaries/en";
import { pageMetadata } from "@/shared/seo/page-metadata";
import { buildBreadcrumbs } from "@/shared/seo/schema-org";

export const metadata: Metadata = pageMetadata("contact", "en", en);

export default function ContactPage() {
  return (
    <>
      <SchemaOrg data={buildBreadcrumbs("contact", "en", en)} />
      <div className="contact-layout">
        {/* TODO: owner copy — see dictionaries/en.ts's readMore.contact comment */}
        <ContactRoute lang="en" title={en.pages.contact.title} introText={en.readMore.contact} />
      </div>
    </>
  );
}
