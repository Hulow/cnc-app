"use client";

import { useRouter } from "next/navigation";
import { ContactForm } from "./contact-form";

const CONTACT_FORM_ID = "contact-form";

// Thin client wrapper around ContactForm for the /contact route: onClose
// needs useRouter, which only works in a Client Component, so this exists
// to keep app/contact/page.tsx a plain Server Component.
export function ContactRoute() {
  const router = useRouter();

  return <ContactForm formId={CONTACT_FORM_ID} onClose={() => router.push("/")} />;
}
