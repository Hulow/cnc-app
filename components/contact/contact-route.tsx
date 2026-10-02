"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ReadMoreButton } from "@/components/read-more-button/read-more-button";
import { de } from "@/dictionaries/de";
import { en } from "@/dictionaries/en";
import { routes, type Lang } from "@/shared/routes";
import { ContactForm } from "./contact-form";

const CONTACT_FORM_ID = "contact-form";

interface ContactRouteProps {
  lang: Lang;
  title: string;
  introText: string;
}

// Thin client wrapper around ContactForm for the /contact (or /de/kontakt)
// route: onClose needs useRouter, which only works in a Client Component,
// so this exists to keep app/**/contact/page.tsx a plain Server Component.
// Also owns the page's title and read-more button (rather than page.tsx
// rendering them as ContactForm's siblings) so both can be hidden once
// the form succeeds — the success view should be the only thing on
// screen, not share it with unrelated page chrome.
//
// Picks its own dictionary from `lang` (a plain string, safe to cross the
// server/client boundary) rather than receiving the dictionary object as
// a prop — Dictionary["contact"] includes functions (attachmentHint,
// attachmentTooLarge), and Next.js can't pass functions from a Server
// Component into a Client Component's props.
export function ContactRoute({ lang, title, introText }: ContactRouteProps) {
  const router = useRouter();
  const dict = lang === "en" ? en.contact.websiteContent : de.contact.websiteContent;
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <>
      {!isSuccess && <h1 className="page-title contact-heading">{title}</h1>}
      <ContactForm
        formId={CONTACT_FORM_ID}
        onClose={() => router.push(routes.home[lang])}
        dict={dict}
        onSuccessChange={setIsSuccess}
      />
      {!isSuccess && (
        <div className="read-more-end">
          <ReadMoreButton text={introText} />
        </div>
      )}
    </>
  );
}
