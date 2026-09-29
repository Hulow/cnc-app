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
      <h1 className="page-title contact-heading">{de.pages.contact.title}</h1>
      <ContactRoute lang="de" />
      <div className="read-more-end">
        {/* TODO: owner copy — see dictionaries/de.ts's intro.contact comment */}
        <ReadMoreButton text={de.intro.contact} />
      </div>
    </>
  );
}
