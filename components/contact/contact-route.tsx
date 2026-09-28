"use client";

import { useRouter } from "next/navigation";
import { de } from "@/dictionaries/de";
import { en } from "@/dictionaries/en";
import { routes, type Lang } from "@/shared/routes";
import { ContactForm } from "./contact-form";

const CONTACT_FORM_ID = "contact-form";

interface ContactRouteProps {
  lang: Lang;
}

// Thin client wrapper around ContactForm for the /contact (or /de/kontakt)
// route: onClose needs useRouter, which only works in a Client Component,
// so this exists to keep app/**/contact/page.tsx a plain Server Component.
//
// Picks its own dictionary from `lang` (a plain string, safe to cross the
// server/client boundary) rather than receiving the dictionary object as
// a prop — Dictionary["contact"] includes functions (attachmentHint,
// attachmentTooLarge), and Next.js can't pass functions from a Server
// Component into a Client Component's props.
export function ContactRoute({ lang }: ContactRouteProps) {
  const router = useRouter();
  const dict = lang === "en" ? en.contact : de.contact;

  return (
    <ContactForm
      formId={CONTACT_FORM_ID}
      onClose={() => router.push(routes.home[lang])}
      dict={dict}
    />
  );
}
