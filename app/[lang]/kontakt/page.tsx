import type { Metadata } from "next";
import { ContactRoute } from "@/components/contact/contact-route";
import { de } from "@/dictionaries/de";
import { pageMetadata } from "@/shared/page-metadata";

export const metadata: Metadata = pageMetadata("contact", "de", de);

export default function KontaktPage() {
  return (
    <>
      <h1>{de.pages.contact.title}</h1>
      {/* TODO: owner copy — see dictionaries/de.ts's intro.contact comment */}
      <p className="page-intro">{de.intro.contact}</p>
      <ContactRoute lang="de" />
    </>
  );
}
