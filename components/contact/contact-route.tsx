"use client";

import { useRouter } from "next/navigation";
import { CardGrid, type CardGridCard } from "@/components/card-grid/card-grid";
import { de } from "@/dictionaries/de";
import { en } from "@/dictionaries/en";
import { routes, type Lang } from "@/shared/routes";
import { ContactForm } from "./contact-form";

const CONTACT_FORM_ID = "contact-form";

// Widest heading logo per language (en: what-to-include.svg, 275x23;
// de: was-du-hast.svg, 213x23) — see CardGrid's maxLogoAspectRatio doc
// comment. Keep in sync with CARD_LOGOS below.
const MAX_LOGO_ASPECT_RATIO: Record<Lang, number> = {
  en: 275 / 23,
  de: 213 / 23,
};

// Logo asset per card, per language — same key set as *.contact.cards in
// both dictionaries, against public/contact/*.svg. No German "Hilfe"
// asset has been added yet, so `de` falls back to the English help.svg.
const CARD_LOGOS = {
  en: {
    workshop: { src: "/contact/workshop.svg", width: 175, height: 23 },
    whatToInclude: { src: "/contact/what-to-include.svg", width: 275, height: 23 },
    contactMe: { src: "/contact/contact-me.svg", width: 201, height: 23 },
    help: { src: "/contact/help.svg", width: 85, height: 23 },
  },
  de: {
    workshop: { src: "/contact/werkstatt.svg", width: 193, height: 23 },
    whatToInclude: { src: "/contact/was-du-hast.svg", width: 213, height: 23 },
    contactMe: { src: "/contact/schreib-mir.svg", width: 198, height: 23 },
    help: { src: "/contact/help.svg", width: 85, height: 23 },
  },
} as const;

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
// times/email), What to include, Contact me (the form itself) and Help,
// each with its own logo wordmark (see CARD_LOGOS) instead of a plain
// text heading.
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
  const logos = CARD_LOGOS[lang];

  const cards: CardGridCard[] = [
    {
      key: "workshop",
      heading: workshop.heading,
      logo: logos.workshop,
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
    {
      key: "whatToInclude",
      heading: dict.cards.whatToInclude.heading,
      logo: logos.whatToInclude,
      descriptions: [dict.readMore],
    },
    {
      key: "contactMe",
      heading: dict.cards.contactMe.heading,
      logo: logos.contactMe,
      children: (
        <ContactForm formId={CONTACT_FORM_ID} onClose={() => router.push(routes.home[lang])} dict={dict} />
      ),
    },
    { key: "help", heading: dict.cards.help.heading, logo: logos.help, descriptions: [dict.help] },
  ];

  return (
    <CardGrid
      headingId="contact-heading"
      title={title}
      maxLogoAspectRatio={MAX_LOGO_ASPECT_RATIO[lang]}
      cards={cards}
    />
  );
}
