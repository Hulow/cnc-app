"use client";

import { useState } from "react";
import { MessagePanel } from "@/components/message-panel/message-panel";
import { MessagePanelButton } from "@/components/message-panel/message-panel-button";

interface ReadMoreButtonProps {
  text: string;
}

// Purely a visibility toggle, same as ContactForm's showHelp — opening the
// overlay has no side effects of its own, and closing it (MessagePanel's
// Continue button) just unmounts it, which reveals the home screen
// underneath again since nothing here navigates.
export function ReadMoreButton({ text }: ReadMoreButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button type="button" className="read-more" onClick={() => setIsOpen(true)}>
        <span className="read-more-icon-wrap">
          {/* Plain <img>, not next/image — same reasoning as the nav
              icons in Navbar: these are already unoptimized SVGs. */}
          {/* eslint-disable @next/next/no-img-element */}
          <img
            src="/text-reading/read_more_default.svg"
            alt="Read more"
            width={213}
            height={44}
            className="read-more-icon read-more-icon-default"
          />
          <img
            src="/text-reading/read_more_hover.svg"
            alt=""
            aria-hidden="true"
            width={213}
            height={44}
            className="read-more-icon read-more-icon-hover"
          />
          {/* eslint-enable @next/next/no-img-element */}
        </span>
      </button>
      {isOpen && (
        <MessagePanel
          variant="overlay"
          action={<MessagePanelButton label="Continue" onClick={() => setIsOpen(false)} />}
        >
          <p>{text}</p>
        </MessagePanel>
      )}
    </>
  );
}
