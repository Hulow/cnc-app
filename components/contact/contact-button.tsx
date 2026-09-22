"use client";

import { useState } from "react";
import { ContactForm } from "./contact-form";

const FORM_ID = "contact-form";

// Purely a visibility toggle: opening the form has no side effects of
// its own (no request is sent until the visitor actually submits it).
export function ContactButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="contact-widget">
      <button
        type="button"
        className="contact-button"
        aria-expanded={isOpen}
        aria-controls={FORM_ID}
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "Close contact form" : "Send a message"}
      </button>
      {isOpen && <ContactForm formId={FORM_ID} onClose={() => setIsOpen(false)} />}
    </div>
  );
}
