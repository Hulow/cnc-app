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
      <ContactRoute lang="de" title={de.contact.metadata.title} />
    </>
  );
}
