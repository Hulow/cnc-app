"use client";

import { useRef, useState, type ChangeEvent, type MouseEvent } from "react";
import {
  ALLOWED_ATTACHMENT_EXTENSIONS,
  MAX_ATTACHMENT_BYTES,
  formatMegabytes,
  isAttachmentTooLarge,
} from "@/shared/contact-attachment";
import { useContactForm } from "./use-contact-form";
import { HelpOverlay } from "@/components/help-overlay/help-overlay";

interface ContactFormProps {
  formId: string;
  onClose: () => void;
}

const ACCEPT_ATTRIBUTE = ALLOWED_ATTACHMENT_EXTENSIONS.join(",");
const MAX_ATTACHMENT_MB = formatMegabytes(MAX_ATTACHMENT_BYTES);

export function ContactForm({ formId, onClose }: ContactFormProps) {
  const {
    status,
    isSubmitting,
    formErrorMessage,
    fieldErrors,
    handleSubmit,
    reset,
    clearFieldError,
    validateEmailOnBlur,
  } = useContactForm();
  // The real filename, not just a boolean: the native input is fully
  // hidden (so the button can read "Upload" instead of the browser's
  // fixed label), so its own filename display is hidden too — this is
  // rendered in its place ourselves.
  const [attachmentName, setAttachmentName] = useState<string | null>(null);
  const [oversizedAttachmentMb, setOversizedAttachmentMb] = useState<string | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  const attachmentInputRef = useRef<HTMLInputElement>(null);

  function handleAttachmentChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file && isAttachmentTooLarge(file.size)) {
      event.target.value = "";
      setAttachmentName(null);
      setOversizedAttachmentMb(formatMegabytes(file.size));
      return;
    }

    setAttachmentName(file?.name ?? null);
    setOversizedAttachmentMb(null);
  }

  // File inputs are uncontrolled — clearing one means resetting the DOM
  // node's own value, not React state.
  function handleRemoveAttachment() {
    if (attachmentInputRef.current) {
      attachmentInputRef.current.value = "";
    }
    setAttachmentName(null);
    setOversizedAttachmentMb(null);
  }

  // Cancel clears the form in place rather than closing it — native
  // form.reset() handles the input elements, so only the React-tracked
  // state (attachment name, submit status, field/form errors) needs to
  // be reset alongside it.
  function handleCancel(event: MouseEvent<HTMLButtonElement>) {
    event.currentTarget.form?.reset();
    setAttachmentName(null);
    setOversizedAttachmentMb(null);
    reset();
  }

  if (status === "success") {
    return (
      <div id={formId} className="contact-form contact-form-success" role="status">
        <p>Thanks for reaching out! I will get back to you soon.</p>
        <button type="button" className="contact-form-close-button" onClick={onClose}>
          Close
        </button>
      </div>
    );
  }

  return (
    <>
      <form id={formId} className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="contact-form-field">
          <label className="sr-only" htmlFor="contact-company-name">Company</label>
          <input
            id="contact-company-name"
            name="companyName"
            type="text"
            placeholder="Company"
            disabled={isSubmitting}
            onChange={() => clearFieldError("companyName")}
          />
          {fieldErrors.companyName && <p role="alert">{fieldErrors.companyName}</p>}
        </div>

        <div className="contact-form-field">
          <label className="sr-only" htmlFor="contact-first-name">First name</label>
          <input
            id="contact-first-name"
            name="firstName"
            type="text"
            placeholder="First name"
            required
            disabled={isSubmitting}
            onChange={() => clearFieldError("firstName")}
          />
          <span className="contact-form-placeholder" aria-hidden="true">
            First name<span className="contact-form-required"> *</span>
          </span>
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
            onChange={() => clearFieldError("lastName")}
          />
          <span className="contact-form-placeholder" aria-hidden="true">
            Last name<span className="contact-form-required"> *</span>
          </span>
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
            onChange={() => clearFieldError("email")}
            onBlur={(event) => validateEmailOnBlur(event.target.value)}
          />
          <span className="contact-form-placeholder" aria-hidden="true">
            Email<span className="contact-form-required"> *</span>
          </span>
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
            onChange={() => clearFieldError("phone")}
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
            onChange={() => clearFieldError("message")}
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
          {oversizedAttachmentMb && (
            <p role="alert">The attachment is too large ({oversizedAttachmentMb} MB).</p>
          )}
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
          <button
            type="submit"
            className="contact-form-submit"
            disabled={isSubmitting || Boolean(fieldErrors.firstName || fieldErrors.lastName || fieldErrors.email)}
            // The image swap below doesn't reflect the submitting state,
            // so the accessible name still has to — aria-label overrides
            // the default (hidden) icon's alt text as the button's name.
            aria-label={isSubmitting ? "Sending…" : undefined}
          >
            <span className="contact-form-submit-icon-wrap">
              {/* Plain <img>, not next/image — see the nav icons in
                  Navbar for why: these are already unoptimized SVGs, so
                  Image buys nothing here. */}
              {/* eslint-disable @next/next/no-img-element */}
              <img
                src="/form/button-send-default.svg"
                alt="Send"
                width={120}
                height={44}
                className="contact-form-submit-icon contact-form-submit-icon-default"
              />
              <img
                src="/form/button-send-hover.svg"
                alt=""
                aria-hidden="true"
                width={120}
                height={44}
                className="contact-form-submit-icon contact-form-submit-icon-hover"
              />
              {/* eslint-enable @next/next/no-img-element */}
            </span>
          </button>
          <button
            type="button"
            className="contact-form-clear"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            <span className="contact-form-clear-icon-wrap">
              {/* eslint-disable @next/next/no-img-element */}
              <img
                src="/form/button-clear-default.svg"
                alt="Clear"
                width={139}
                height={44}
                className="contact-form-clear-icon contact-form-clear-icon-default"
              />
              <img
                src="/form/button-clear-hover.svg"
                alt=""
                aria-hidden="true"
                width={139}
                height={44}
                className="contact-form-clear-icon contact-form-clear-icon-hover"
              />
              {/* eslint-enable @next/next/no-img-element */}
            </span>
          </button>
          <button
            type="button"
            className="contact-form-help"
            disabled={isSubmitting}
            onClick={() => setShowHelp(true)}
          >
            <span className="contact-form-help-icon-wrap">
              {/* eslint-disable @next/next/no-img-element */}
              <img
                src="/form/button-help-default.svg"
                alt="Help"
                width={118}
                height={44}
                className="contact-form-help-icon contact-form-help-icon-default"
              />
              {/* button-help-active.svg is the pink asset for this set
                  (its stroke matches button-send-hover.svg/button-clear-
                  hover.svg's pink, not the "active" pink used for a
                  persistent nav selection) — there's no separate
                  button-help-hover.svg, so this is the hover graphic. */}
              <img
                src="/form/button-help-active.svg"
                alt=""
                aria-hidden="true"
                width={118}
                height={44}
                className="contact-form-help-icon contact-form-help-icon-hover"
              />
              {/* eslint-enable @next/next/no-img-element */}
            </span>
          </button>
        </div>
      </form>
      {showHelp && <HelpOverlay onClose={() => setShowHelp(false)} />}
    </>
  );
}
