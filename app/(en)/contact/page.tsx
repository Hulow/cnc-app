import type { Metadata } from "next";
import { SchemaOrg } from "@/components/schema-org/schema-org";
import { ContactRoute } from "@/components/contact/contact-route";
import { en } from "@/dictionaries/en";
import { pageMetadata } from "@/shared/seo/page-metadata";
import { buildPageGraph } from "@/shared/seo/schema-org";

export const metadata: Metadata = pageMetadata("contact", "en", en);

export default function ContactPage() {
  return (
    <>
      <SchemaOrg data={buildPageGraph("contact", "en", en)} />
      <div className="contact-layout">
        {/* TODO: owner copy — see dictionaries/pages/contact.ts's websiteContent.readMore comment */}
        <ContactRoute lang="en" title={en.contact.metadata.title} introText={en.contact.websiteContent.readMore} />
      </div>
    </>
  );
}
