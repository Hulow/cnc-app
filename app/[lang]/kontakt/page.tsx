import type { Metadata } from "next";
import { SchemaOrg } from "@/components/schema-org/schema-org";
import { ContactRoute } from "@/components/contact/contact-route";
import { de } from "@/dictionaries/de";
import { pageMetadata } from "@/shared/seo/page-metadata";
import { buildPageGraph } from "@/shared/seo/schema-org";

export const metadata: Metadata = pageMetadata("contact", "de", de);

export default function KontaktPage() {
  return (
    <>
      <SchemaOrg data={buildPageGraph("contact", "de", de)} />
      <div className="contact-layout">
        {/* TODO: owner copy — see dictionaries/pages/contact.ts's websiteContent.readMore comment */}
        <ContactRoute lang="de" title={de.contact.metadata.title} introText={de.contact.websiteContent.readMore} />
      </div>
    </>
  );
}
