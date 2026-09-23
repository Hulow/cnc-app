"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { ALLOWED_ATTACHMENT_EXTENSIONS, MAX_ATTACHMENT_BYTES } from "@/shared/contact-attachment";

interface ContactFormProps {
  formId: string;
  onClose: () => void;
}

type FieldName = "firstName" | "lastName" | "email" | "phone" | "message" | "attachment";
type Status = "idle" | "submitting" | "success" | "error";

interface FieldError {
  field: string;
  code: string;
}

// Human-readable copy for the domain's field/code error pairs. Codes
// that the domain can no longer produce (e.g. attachment rejections)
// are intentionally left unmapped and fall back to DEFAULT_ERROR_MESSAGE.
const FIELD_ERROR_MESSAGES: Partial<Record<FieldName, Partial<Record<string, string>>>> = {
  firstName: { required: "Enter your first name." },
  lastName: { required: "Enter your last name." },
  email: {
    required: "Enter your email address.",
    invalid_format: "Enter a valid email address.",
  },
  phone: {
    invalid_format: "Enter a valid phone number.",
  },
};

const DEFAULT_ERROR_MESSAGE = "Please check the form and try again.";
const ACCEPT_ATTRIBUTE = ALLOWED_ATTACHMENT_EXTENSIONS.join(",");
const MAX_ATTACHMENT_MB = Math.round(MAX_ATTACHMENT_BYTES / (1024 * 1024));

function fieldErrorMessages(errors: FieldError[]): Partial<Record<FieldName, string>> {
  const messages: Partial<Record<FieldName, string>> = {};
  for (const { field, code } of errors) {
    messages[field as FieldName] = FIELD_ERROR_MESSAGES[field as FieldName]?.[code] ?? DEFAULT_ERROR_MESSAGE;
  }
  return messages;
}

export function ContactForm({ formId, onClose }: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [formErrorMessage, setFormErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldName, string>>>({});
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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const form = event.currentTarget;
    setStatus("submitting");
    setFormErrorMessage(null);
    setFieldErrors({});

    try {
      const response = await fetch("/api/contact", { method: "POST", body: new FormData(form) });
      const body: { ok: boolean; errors?: FieldError[]; error?: string } = await response.json();

      if (body.ok) {
        setStatus("success");
        return;
      }

      if (body.errors) {
        setFieldErrors(fieldErrorMessages(body.errors));
      } else {
        setFormErrorMessage(body.error ?? DEFAULT_ERROR_MESSAGE);
      }
      setStatus("error");
    } catch {
      setFormErrorMessage(DEFAULT_ERROR_MESSAGE);
      setStatus("error");
    }
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

  const isSubmitting = status === "submitting";

  return (
    <form id={formId} className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="contact-form-field">
        <label className="sr-only" htmlFor="contact-first-name">First name</label>
        <input
          id="contact-first-name"
          name="firstName"
          type="text"
          placeholder="First name"
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
          placeholder="Last name"
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
          placeholder="Email"
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
          placeholder="Phone (optional)"
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
        <label className="sr-only" htmlFor="contact-attachment">Attachment (optional)</label>
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
              <span className="contact-form-file-placeholder">Attachment (optional)</span>
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
