import type { Dictionary } from "@/dictionaries/en";
import { MessagePanel } from "@/components/message-panel/message-panel";
import { MessagePanelButton } from "@/components/message-panel/message-panel-button";

interface ImpressumPanelProps {
  dict: Pick<Dictionary, "impressum" | "site">;
  homeHref: string;
  logoSrc: string;
  logoWidth: number;
  logoHeight: number;
}

// Shared between the English (/impressum) and German (/de/impressum)
// pages — same visual treatment as PrivacyPanel (see MessagePanel),
// reused for consistency across the two legal pages.
//
// Only name/email/address are filled in, from dict.site (name, address)
// and dict.impressum.schemas (email) — already public elsewhere on the
// site, not new facts. Phone and VAT ID are real German legal
// requirements (§ 5 TMG) this codebase has no source for, so they render
// the dictionary's placeholder text instead of a guess. This whole page
// needs the owner's (and ideally a legal source's) review before it's
// final — an incorrect or incomplete Impressum is a real legal liability
// in Germany (Abmahnung risk), not just a copy nit.
export function ImpressumPanel({
  dict,
  homeHref,
  logoSrc,
  logoWidth,
  logoHeight,
}: ImpressumPanelProps) {
  const { fields, placeholder } = dict.impressum.websiteContent;

  return (
    <MessagePanel
      variant="page"
      action={<MessagePanelButton label={dict.impressum.websiteContent.homeLinkLabel} href={homeHref} />}
    >
      {/* Real text node for crawlers/screen readers; the logo stays the
          visible content, same sr-only + decorative-img split
          NotFoundPanel uses for its own wordmark. */}
      <h1 className="sr-only">{dict.impressum.websiteContent.title}</h1>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logoSrc}
        alt=""
        aria-hidden="true"
        width={logoWidth}
        height={logoHeight}
        className="legal-panel-logo"
      />
      <p>
        <strong>{fields.name}:</strong> {dict.site.legalName}
      </p>
      <p>
        <strong>{fields.address}:</strong> {dict.site.address}
      </p>
      <p>
        <strong>{fields.email}:</strong> {dict.impressum.schemas.email}
      </p>
      <p>
        <strong>{fields.phone}:</strong> {placeholder}
      </p>
      <p>
        <strong>{fields.vatId}:</strong> {placeholder}
      </p>
      <p>
        <strong>{fields.responsibleContent}:</strong> {dict.site.legalName}
      </p>
    </MessagePanel>
  );
}
