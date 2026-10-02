import type { Dictionary } from "@/dictionaries/en";
import { MessagePanel } from "@/components/message-panel/message-panel";
import { MessagePanelButton } from "@/components/message-panel/message-panel-button";

interface NotFoundPanelProps {
  dict: Pick<Dictionary, "notFound">;
  homeHref: string;
}

// Same visual treatment as PrivacyPanel/ImpressumPanel (see MessagePanel
// — the old full-screen welcome-screen modal's look, reused as normal
// page content). Shared by both app/(en)/not-found.tsx and
// app/[lang]/not-found.tsx: the 404 page is English-only by design (no
// German copy for it yet), so both render this with the English
// dictionary and the English home route regardless of which language
// section a lost URL falls under.
export function NotFoundPanel({ dict, homeHref }: NotFoundPanelProps) {
  return (
    <MessagePanel
      variant="page"
      action={<MessagePanelButton label={dict.notFound.homeLinkLabel} href={homeHref} />}
    >
      {/* Real text node for crawlers/screen readers; the logo (its
          wordmark already reads "Page Not Found") stays the visible
          content, same sr-only + decorative-img split used for the card
          headings in Service/CuttingSalon. */}
      <h1 className="sr-only">{dict.notFound.heading}</h1>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/menu/page_not_found.svg"
        alt=""
        aria-hidden="true"
        width={261}
        height={23}
        className="not-found-logo"
      />
      <p className="sr-only">{dict.notFound.body}</p>
    </MessagePanel>
  );
}
