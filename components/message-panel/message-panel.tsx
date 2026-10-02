import type { ReactNode } from "react";

interface MessagePanelProps {
  // "page" renders normal, crawlable page content (PrivacyPanel,
  // ImpressumPanel, NotFoundPanel) — a <section> that fills the space
  // between header/footer. "overlay" renders a fixed, full-screen dialog
  // on top of whatever's behind it (ContactForm's help overlay,
  // ReadMoreButton) — see .message-panel vs .message-panel-overlay in
  // globals.css for how these two wrappers differ.
  variant: "page" | "overlay";
  hidden?: boolean;
  children: ReactNode;
  action: ReactNode;
}

// The centered, blue-background panel with a white text card and a
// single pill action button at the bottom — the shared look behind
// PrivacyPanel, ImpressumPanel, NotFoundPanel, ContactForm's help
// overlay, and ReadMoreButton. Pass the text/logo content as children and
// the action button (see MessagePanelButton) separately, since what the
// action does (navigate, dismiss, set a cookie) differs per caller.
export function MessagePanel({ variant, hidden = false, children, action }: MessagePanelProps) {
  const content = (
    <div className="message-panel-content">
      <div className="message-panel-text">{children}</div>
      {action}
    </div>
  );

  if (variant === "overlay") {
    return (
      <div className="message-panel-overlay" role="dialog" aria-modal="true" hidden={hidden}>
        {content}
      </div>
    );
  }

  return <section className="message-panel">{content}</section>;
}
