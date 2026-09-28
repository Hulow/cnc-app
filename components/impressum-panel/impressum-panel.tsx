import Link from "next/link";
import type { Dictionary } from "@/dictionaries/en";
import { siteConfig } from "@/shared/site-config";

interface ImpressumPanelProps {
  dict: Pick<Dictionary, "impressum">;
  homeHref: string;
}

// Shared between the English (/impressum) and German (/de/impressum)
// pages — same visual treatment as PrivacyPanel (see that file), reused
// for consistency across the two legal pages.
//
// Only name/email/address are filled in, from siteConfig — already
// public elsewhere on the site, not new facts. Phone and VAT ID are
// real German legal requirements (§ 5 TMG) this codebase has no source
// for, so they render the dictionary's placeholder text instead of a
// guess. See P1.7 in SEO-SPEC.md: this whole page needs the owner's
// (and ideally a legal source's) review before it's final — an
// incorrect or incomplete Impressum is a real legal liability in
// Germany (Abmahnung risk), not just a copy nit.
export function ImpressumPanel({ dict, homeHref }: ImpressumPanelProps) {
  const { fields, placeholder } = dict.impressum;

  return (
    <section className="privacy-panel">
      <div className="welcome-screen-content">
        <div className="welcome-screen-text">
          <h1>{dict.impressum.title}</h1>
          <p>
            <strong>{fields.name}:</strong> {siteConfig.legalName}
          </p>
          <p>
            <strong>{fields.address}:</strong> {siteConfig.contact.address}
          </p>
          <p>
            <strong>{fields.email}:</strong> {siteConfig.contact.email}
          </p>
          <p>
            <strong>{fields.phone}:</strong> {placeholder}
          </p>
          <p>
            <strong>{fields.vatId}:</strong> {placeholder}
          </p>
          <p>
            <strong>{fields.responsibleContent}:</strong> {siteConfig.legalName}
          </p>
        </div>
        <Link href={homeHref} className="welcome-screen-continue">
          <span className="welcome-screen-continue-icon-wrap">
            {/* eslint-disable @next/next/no-img-element */}
            <img
              src="/welcome/button-continue-default.svg"
              alt={dict.impressum.homeLinkLabel}
              width={187}
              height={44}
              className="welcome-screen-continue-icon welcome-screen-continue-icon-default"
            />
            <img
              src="/welcome/button-continue-active.svg"
              alt=""
              aria-hidden="true"
              width={187}
              height={44}
              className="welcome-screen-continue-icon welcome-screen-continue-icon-hover"
            />
            {/* eslint-enable @next/next/no-img-element */}
          </span>
        </Link>
      </div>
    </section>
  );
}
