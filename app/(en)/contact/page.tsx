import type { Metadata } from "next";
import { StructuredData } from "@/components/structured-data/structured-data";
import { ContactRoute } from "@/components/contact/contact-route";
import { ReadMoreButton } from "@/components/read-more-button/read-more-button";
import { en } from "@/dictionaries/en";
import { pageMetadata } from "@/shared/page-metadata";
import { buildBreadcrumbs } from "@/shared/structured-data";

export const metadata: Metadata = pageMetadata("contact", "en", en);

export default function ContactPage() {
  return (
    <>
      <StructuredData data={buildBreadcrumbs("contact", "en", en)} />
      <div className="page-heading-row">
        <h1>{en.pages.contact.title}</h1>
        {/* TODO: owner copy — see dictionaries/en.ts's intro.contact comment */}
        <ReadMoreButton text={en.intro.contact} />
      </div>
      <ContactRoute lang="en" />
    </>
  );
}
