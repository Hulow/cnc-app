"use client";

import { PRIVACY_ACK_COOKIE } from "@/shared/privacy-gate/privacy-gate";
import { MessagePanelButton } from "@/components/message-panel/message-panel-button";

interface ContinueLinkProps {
  href: string;
  label: string;
}

// Split out of PrivacyPanel (a Server Component) because this is the one
// interactive piece: the click is the user gesture the background video
// (mounted in the shared layout, so it isn't remounted by this
// navigation) needs to start playing under autoplay restrictions, and
// setting the cookie here — synchronously in the same click — is what
// tells the home page not to bounce back here on the way in.
export function ContinueLink({ href, label }: ContinueLinkProps) {
  return (
    <MessagePanelButton
      href={href}
      label={label}
      onClick={() => {
        document.cookie = `${PRIVACY_ACK_COOKIE}=1; path=/; SameSite=Lax`;
      }}
    />
  );
}
