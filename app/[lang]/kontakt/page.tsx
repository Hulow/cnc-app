import type { Metadata } from "next";
import { StructuredData } from "@/components/structured-data/structured-data";
import { ContactRoute } from "@/components/contact/contact-route";
import { de } from "@/dictionaries/de";
import { pageMetadata } from "@/shared/page-metadata";
import { buildBreadcrumbs } from "@/shared/structured-data";

export const metadata: Metadata = pageMetadata("contact", "de", de);

export default function KontaktPage() {
  return (
    <>
      <StructuredData data={buildBreadcrumbs("contact", "de", de)} />
      <div className="contact-layout">
        {/* TODO: owner copy — see dictionaries/de.ts's readMore.contact comment */}
        <ContactRoute lang="de" title={de.pages.contact.title} introText={de.readMore.contact} />
      </div>
    </>
  );
}
