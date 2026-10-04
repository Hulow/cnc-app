"use client";

import { useRouter } from "next/navigation";
import { CardGrid, type CardGridCard } from "@/components/card-grid/card-grid";
import { de } from "@/dictionaries/de";
import { en } from "@/dictionaries/en";
import { routes, type Lang } from "@/shared/routes";
import { ContactForm } from "./contact-form";

const CONTACT_FORM_ID = "contact-form";

interface ContactRouteProps {
  lang: Lang;
  title: string;
}

// Thin client wrapper around ContactForm for the /contact (or /de/kontakt)
// route: onClose needs useRouter, which only works in a Client Component,
// so this exists to keep app/**/contact/page.tsx a plain Server Component.
//
// Renders the same CardGrid used by Services/Cutting Salon (see
// components/card-grid/card-grid.tsx) — same collapsible-card look and
// open/close chevron — with four cards: Workshop (address/opening
// times/email), What to include, Contact me (the form itself) and Help.
// None of these have a logo wordmark of their own (Card falls back to a
// plain text heading), and there's no separate intro paragraph or photo
// (maxLogoAspectRatio/image/readMoreText all omitted).
//
// Picks its own dictionary from `lang` (a plain string, safe to cross the
// server/client boundary) rather than receiving the dictionary object as
// a prop — Dictionary["contact"] includes functions (attachmentHint,
// attachmentTooLarge), and Next.js can't pass functions from a Server
// Component into a Client Component's props.
export function ContactRoute({ lang, title }: ContactRouteProps) {
  const router = useRouter();
  const dict = lang === "en" ? en.contact.websiteContent : de.contact.websiteContent;
  const workshop = dict.cards.workshop;

  const cards: CardGridCard[] = [
    {
      key: "workshop",
      heading: workshop.heading,
      // One description, not three — Address/Opening Times/Email read as
      // a single card item (one white box) with a blank line between
      // each section, rather than three separate boxes.
      descriptions: [
        [
          `${workshop.addressHeading}\n${workshop.addressLines.join("\n")}`,
          `${workshop.hoursHeading}\n${workshop.hoursText}`,
          `${workshop.emailHeading}\n${workshop.email}`,
        ].join("\n\n"),
      ],
    },
    { key: "whatToInclude", heading: dict.cards.whatToInclude.heading, descriptions: [dict.readMore] },
    {
      key: "contactMe",
      heading: dict.cards.contactMe.heading,
      children: (
        <ContactForm formId={CONTACT_FORM_ID} onClose={() => router.push(routes.home[lang])} dict={dict} />
      ),
    },
    { key: "help", heading: dict.cards.help.heading, descriptions: [dict.help] },
  ];

  return <CardGrid headingId="contact-heading" title={title} cards={cards} />;
}
