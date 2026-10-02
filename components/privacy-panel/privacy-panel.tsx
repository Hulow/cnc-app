import type { Dictionary } from "@/dictionaries/en";
import { MessagePanel } from "@/components/message-panel/message-panel";
import { ContinueLink } from "./continue-link";

interface PrivacyPanelProps {
  dict: Pick<Dictionary, "privacy">;
  homeHref: string;
  logoSrc: string;
  logoWidth: number;
  logoHeight: number;
}

// Shared between the English (/privacy) and German (/de/datenschutz)
// pages: the exact look the old full-screen welcome-screen modal had
// (see MessagePanel and .message-panel/.message-panel-content/
// .message-panel-text in globals.css), as normal page content instead
// of a gate.
export function PrivacyPanel({
  dict,
  homeHref,
  logoSrc,
  logoWidth,
  logoHeight,
}: PrivacyPanelProps) {
  return (
    <MessagePanel
      variant="page"
      action={<ContinueLink href={homeHref} label={dict.privacy.websiteContent.homeLinkLabel} />}
    >
      {/* Real text node for crawlers/screen readers; the logo stays the
          visible content, same sr-only + decorative-img split
          NotFoundPanel uses for its own wordmark. */}
      <h1 className="sr-only">{dict.privacy.websiteContent.title}</h1>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logoSrc}
        alt=""
        aria-hidden="true"
        width={logoWidth}
        height={logoHeight}
        className="legal-panel-logo"
      />
      {dict.privacy.websiteContent.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </MessagePanel>
  );
}
