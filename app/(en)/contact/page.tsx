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
      <ContactRoute lang="en" title={en.contact.metadata.title} />
    </>
  );
}
