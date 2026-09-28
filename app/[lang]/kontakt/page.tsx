import type { Metadata } from "next";
import { StructuredData } from "@/components/structured-data/structured-data";
import { ContactRoute } from "@/components/contact/contact-route";
import { ReadMoreButton } from "@/components/read-more-button/read-more-button";
import { de } from "@/dictionaries/de";
import { pageMetadata } from "@/shared/page-metadata";
import { buildBreadcrumbs } from "@/shared/structured-data";

export const metadata: Metadata = pageMetadata("contact", "de", de);

export default function KontaktPage() {
  return (
    <>
      <StructuredData data={buildBreadcrumbs("contact", "de", de)} />
      <div className="page-heading-row">
        <h1>{de.pages.contact.title}</h1>
        {/* TODO: owner copy — see dictionaries/de.ts's intro.contact comment */}
        <ReadMoreButton text={de.intro.contact} />
      </div>
      <ContactRoute lang="de" />
    </>
  );
}
