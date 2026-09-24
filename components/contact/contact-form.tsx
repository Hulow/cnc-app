"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { ALLOWED_ATTACHMENT_EXTENSIONS, MAX_ATTACHMENT_BYTES } from "@/shared/contact-attachment";
import { useContactForm } from "./use-contact-form";

interface ContactFormProps {
  formId: string;
  onClose: () => void;
}

const ACCEPT_ATTRIBUTE = ALLOWED_ATTACHMENT_EXTENSIONS.join(",");
const MAX_ATTACHMENT_MB = Math.round(MAX_ATTACHMENT_BYTES / (1024 * 1024));

export function ContactForm({ formId, onClose }: ContactFormProps) {
  const { status, isSubmitting, formErrorMessage, fieldErrors, handleSubmit } = useContactForm();
  // The real filename, not just a boolean: the native input is fully
  // hidden (so the button can read "Upload" instead of the browser's
  // fixed label), so its own filename display is hidden too — this is
  // rendered in its place ourselves.
  const [attachmentName, setAttachmentName] = useState<string | null>(null);
  const attachmentInputRef = useRef<HTMLInputElement>(null);

  function handleAttachmentChange(event: ChangeEvent<HTMLInputElement>) {
    setAttachmentName(event.target.files?.[0]?.name ?? null);
  }

  // File inputs are uncontrolled — clearing one means resetting the DOM
  // node's own value, not React state.
  function handleRemoveAttachment() {
    if (attachmentInputRef.current) {
      attachmentInputRef.current.value = "";
    }
    setAttachmentName(null);
  }

  if (status === "success") {
    return (
      <div id={formId} className="contact-form" role="status">
        <p>Thanks for reaching out — your message has been sent.</p>
        <button type="button" onClick={onClose}>
          Close
        </button>
      </div>
    );
  }

  return (
    <form id={formId} className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="contact-form-field">
        <label className="sr-only" htmlFor="contact-company-name">Company</label>
        <input
          id="contact-company-name"
          name="companyName"
          type="text"
          placeholder="Company"
          disabled={isSubmitting}
        />
        {fieldErrors.companyName && <p role="alert">{fieldErrors.companyName}</p>}
      </div>

      <div className="contact-form-field">
        <label className="sr-only" htmlFor="contact-first-name">First name</label>
        <input
          id="contact-first-name"
          name="firstName"
          type="text"
          placeholder="First name *"
          required
          disabled={isSubmitting}
        />
        {fieldErrors.firstName && <p role="alert">{fieldErrors.firstName}</p>}
      </div>

      <div className="contact-form-field">
        <label className="sr-only" htmlFor="contact-last-name">Last name</label>
        <input
          id="contact-last-name"
          name="lastName"
          type="text"
          placeholder="Last name *"
          required
          disabled={isSubmitting}
        />
        {fieldErrors.lastName && <p role="alert">{fieldErrors.lastName}</p>}
      </div>

      <div className="contact-form-field">
        <label className="sr-only" htmlFor="contact-email">Email</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          placeholder="Email *"
          required
          disabled={isSubmitting}
        />
        {fieldErrors.email && <p role="alert">{fieldErrors.email}</p>}
      </div>

      <div className="contact-form-field">
        <label className="sr-only" htmlFor="contact-phone">Phone</label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          placeholder="Phone"
          disabled={isSubmitting}
        />
        {fieldErrors.phone && <p role="alert">{fieldErrors.phone}</p>}
      </div>

      <div className="contact-form-field">
        <label className="sr-only" htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          name="message"
          placeholder="Message"
          rows={5}
          disabled={isSubmitting}
        />
        {fieldErrors.message && <p role="alert">{fieldErrors.message}</p>}
      </div>

      <div className="contact-form-field">
        <label className="sr-only" htmlFor="contact-attachment">Attachment</label>
        <div className="contact-form-attachment-row">
          <div className="contact-form-file">
            {/* Custom "Upload" trigger + filename/placeholder text — the
                real input has no native placeholder and its button label
                can't be renamed, so it's fully hidden (opacity: 0,
                stacked on top so clicks still reach it natively) and
                these decorative elements stand in for it visually. */}
            <span className="contact-form-file-button" aria-hidden="true">
              Upload
            </span>
            {attachmentName ? (
              <span className="contact-form-file-name">{attachmentName}</span>
            ) : (
              <span className="contact-form-file-placeholder">Attachment</span>
            )}
            <input
              ref={attachmentInputRef}
              id="contact-attachment"
              name="attachment"
              type="file"
              accept={ACCEPT_ATTRIBUTE}
              disabled={isSubmitting}
              onChange={handleAttachmentChange}
            />
          </div>
          {attachmentName && (
            <button
              type="button"
              className="contact-form-attachment-remove"
              onClick={handleRemoveAttachment}
              disabled={isSubmitting}
              aria-label="Remove attachment"
            >
              ×
            </button>
          )}
        </div>
        <p className="contact-form-hint">Max {MAX_ATTACHMENT_MB} MB.</p>
      </div>

      {/* Honeypot: invisible to real visitors (see .contact-form-honeypot),
          skipped from tab order, left empty so genuine submissions never
          trip the server's spam check in app/api/contact/route.ts. */}
      <div className="contact-form-honeypot" aria-hidden="true">
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {formErrorMessage && (
        <p className="contact-form-error" role="alert">
          {formErrorMessage}
        </p>
      )}

      <div className="contact-form-actions">
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending…" : "Send message"}
        </button>
        <button type="button" onClick={onClose} disabled={isSubmitting}>
          Cancel
        </button>
      </div>
    </form>
  );
}
