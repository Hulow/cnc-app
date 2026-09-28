import type { Metadata } from "next";
import { ContactRoute } from "@/components/contact/contact-route";
import { en } from "@/dictionaries/en";
import { pageMetadata } from "@/shared/page-metadata";

export const metadata: Metadata = pageMetadata("contact", "en", en);

export default function ContactPage() {
  return <ContactRoute lang="en" />;
}
