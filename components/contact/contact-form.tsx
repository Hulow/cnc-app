"use client";

import { useEffect, useRef, useState, type ChangeEvent, type MouseEvent } from "react";
import {
  ALLOWED_ATTACHMENT_EXTENSIONS,
  MAX_ATTACHMENT_BYTES,
  formatMegabytes,
  isAttachmentTooLarge,
} from "@/shared/contact-attachment";
import { en, type Dictionary } from "@/dictionaries/en";
import { useContactForm } from "./use-contact-form";
import { HelpOverlay } from "@/components/help-overlay/help-overlay";

interface ContactFormProps {
  formId: string;
  onClose: () => void;
  // Field labels/placeholders/messages only — the Send/Clear/Help/Upload
  // buttons stay the English image assets regardless of language (no
  // German artwork exists yet), so their alt text is intentionally not
  // part of this dictionary.
  dict?: Dictionary["contact"];
  // Lets a page-level wrapper (ContactRoute) hide its own title/read-more
  // button once the form succeeds, since the success view replaces the
  // whole form rather than sitting alongside it.
  onSuccessChange?: (success: boolean) => void;
}

const ACCEPT_ATTRIBUTE = ALLOWED_ATTACHMENT_EXTENSIONS.join(",");
const MAX_ATTACHMENT_MB = formatMegabytes(MAX_ATTACHMENT_BYTES);

export function ContactForm({ formId, onClose, dict = en.contact, onSuccessChange }: ContactFormProps) {
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

  useEffect(() => {
    onSuccessChange?.(status === "success");
  }, [status, onSuccessChange]);

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
        <p>{dict.success}</p>
        <button type="button" className="contact-form-close-button" onClick={onClose}>
          <span className="contact-form-close-icon-wrap">
            {/* eslint-disable @next/next/no-img-element */}
            <img
              src="/form/button-close-default.svg"
              alt="Close"
              width={137}
              height={44}
              className="contact-form-close-icon contact-form-close-icon-default"
            />
            {/* button-close-active.svg is the pink asset for this set
                (its stroke matches the *-hover.svg pink used elsewhere,
                not the "active" pink used for a persistent nav
                selection) — there's no separate button-close-hover.svg,
                so this is the hover graphic. */}
            <img
              src="/form/button-close-active.svg"
              alt=""
              aria-hidden="true"
              width={137}
              height={44}
              className="contact-form-close-icon contact-form-close-icon-hover"
            />
            {/* eslint-enable @next/next/no-img-element */}
          </span>
        </button>
      </div>
    );
  }

  return (
    <>
      <form id={formId} className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="contact-form-field">
          <label className="sr-only" htmlFor="contact-company-name">{dict.fields.company}</label>
          <input
            id="contact-company-name"
            name="companyName"
            type="text"
            autoComplete="organization"
            placeholder={dict.fields.company}
            disabled={isSubmitting}
            onChange={() => clearFieldError("companyName")}
          />
          {fieldErrors.companyName && <p role="alert">{fieldErrors.companyName}</p>}
        </div>

        <div className="contact-form-field">
          <label className="sr-only" htmlFor="contact-first-name">{dict.fields.firstName}</label>
          <input
            id="contact-first-name"
            name="firstName"
            type="text"
            autoComplete="given-name"
            placeholder={dict.fields.firstName}
            required
            disabled={isSubmitting}
            onChange={() => clearFieldError("firstName")}
          />
          <span className="contact-form-placeholder" aria-hidden="true">
            {dict.fields.firstName}<span className="contact-form-required"> *</span>
          </span>
          {fieldErrors.firstName && <p role="alert">{fieldErrors.firstName}</p>}
        </div>

        <div className="contact-form-field">
          <label className="sr-only" htmlFor="contact-last-name">{dict.fields.lastName}</label>
          <input
            id="contact-last-name"
            name="lastName"
            type="text"
            autoComplete="family-name"
            placeholder={dict.fields.lastName}
            required
            disabled={isSubmitting}
            onChange={() => clearFieldError("lastName")}
          />
          <span className="contact-form-placeholder" aria-hidden="true">
            {dict.fields.lastName}<span className="contact-form-required"> *</span>
          </span>
          {fieldErrors.lastName && <p role="alert">{fieldErrors.lastName}</p>}
        </div>

        <div className="contact-form-field">
          <label className="sr-only" htmlFor="contact-email">{dict.fields.email}</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={dict.fields.email}
            required
            disabled={isSubmitting}
            onChange={() => clearFieldError("email")}
            onBlur={(event) => validateEmailOnBlur(event.target.value)}
          />
          <span className="contact-form-placeholder" aria-hidden="true">
            {dict.fields.email}<span className="contact-form-required"> *</span>
          </span>
          {fieldErrors.email && <p role="alert">{fieldErrors.email}</p>}
        </div>

        <div className="contact-form-field">
          <label className="sr-only" htmlFor="contact-phone">{dict.fields.phone}</label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder={dict.fields.phone}
            disabled={isSubmitting}
            onChange={() => clearFieldError("phone")}
          />
          {fieldErrors.phone && <p role="alert">{fieldErrors.phone}</p>}
        </div>

        <div className="contact-form-field">
          <label className="sr-only" htmlFor="contact-message">{dict.fields.message}</label>
          <textarea
            id="contact-message"
            name="message"
            placeholder={dict.fields.message}
            rows={5}
            disabled={isSubmitting}
            onChange={() => clearFieldError("message")}
          />
          {fieldErrors.message && <p role="alert">{fieldErrors.message}</p>}
        </div>

        <div className="contact-form-field">
          <label className="sr-only" htmlFor="contact-attachment">{dict.fields.attachment}</label>
          <div className="contact-form-attachment-row">
            <div className="contact-form-file">
              {/* Custom "Upload" trigger + filename/placeholder text — the
                  real input has no native placeholder and its button label
                  can't be renamed, so it's fully hidden (opacity: 0,
                  stacked on top so clicks still reach it natively) and
                  these decorative elements stand in for it visually. */}
              <span className="contact-form-file-button" aria-hidden="true">
                {/* No button-upload-hover.svg exists yet (unlike Send/
                    Clear/Help/Close/Continue), and this element already
                    has pointer-events: none (see .contact-form-file-
                    button below — the real input on top handles clicks),
                    so there's no hover state to build here regardless. */}
                {/* eslint-disable @next/next/no-img-element */}
                <img
                  src="/form/button-upload-default.svg"
                  alt=""
                  width={160}
                  height={44}
                  className="contact-form-file-button-icon"
                />
                {/* eslint-enable @next/next/no-img-element */}
              </span>
              {attachmentName ? (
                <span className="contact-form-file-name">{attachmentName}</span>
              ) : (
                <span className="contact-form-file-placeholder">{dict.fields.attachment}</span>
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
                aria-label={dict.removeAttachment}
              >
                ×
              </button>
            )}
          </div>
          <p className="contact-form-hint">{dict.attachmentHint(MAX_ATTACHMENT_MB)}</p>
          {oversizedAttachmentMb && (
            <p role="alert">{dict.attachmentTooLarge(oversizedAttachmentMb)}</p>
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
            aria-label={isSubmitting ? dict.sending : undefined}
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
      {showHelp && <HelpOverlay onClose={() => setShowHelp(false)} text={dict.help} />}
    </>
  );
}
