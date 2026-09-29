"use client";

import Link from "next/link";
import { PRIVACY_ACK_COOKIE } from "@/shared/privacy-gate";

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
    <Link
      href={href}
      className="welcome-screen-continue"
      onClick={() => {
        document.cookie = `${PRIVACY_ACK_COOKIE}=1; path=/; SameSite=Lax`;
      }}
    >
      <span className="welcome-screen-continue-icon-wrap">
        {/* eslint-disable @next/next/no-img-element */}
        <img
          src="/welcome/button-continue-default.svg"
          alt={label}
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
  );
}
