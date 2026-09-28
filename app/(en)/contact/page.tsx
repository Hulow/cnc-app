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
      <h1>{en.pages.contact.title}</h1>
      {/* TODO: owner copy — see dictionaries/en.ts's intro.contact comment */}
      <p className="page-intro">{en.intro.contact}</p>
      <ContactRoute lang="en" />
    </>
  );
}
