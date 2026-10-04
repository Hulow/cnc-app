"use client";

import { useRef, type ChangeEvent, type MouseEvent } from "react";
import { ALLOWED_ATTACHMENT_EXTENSIONS, MAX_ATTACHMENT_BYTES, formatMegabytes } from "@/shared/contact/contact-attachment";
import { en, type Dictionary } from "@/dictionaries/en";
import { useContactForm } from "./use-contact-form";
import { ContactFormField } from "./contact-form-field";
import { ContactFormAttachmentField } from "./contact-form-attachment-field";
import { ContactFormActions } from "./contact-form-actions";
import { ContactFormSuccess } from "./contact-form-success";

interface ContactFormProps {
  formId: string;
  onClose: () => void;
  // Field labels/placeholders/messages only — the Send/Clear/Upload
  // buttons stay the English image assets regardless of language (no
  // German artwork exists yet), so their alt text is intentionally not
  // part of this dictionary.
  dict?: Dictionary["contact"]["websiteContent"];
  // Lets a page-level wrapper (ContactRoute) hide its own title/read-more
  // button once the form succeeds, since the success view replaces the
  // whole form rather than sitting alongside it.
  onSuccessChange?: (success: boolean) => void;
}

const ACCEPT_ATTRIBUTE = ALLOWED_ATTACHMENT_EXTENSIONS.join(",");
const MAX_ATTACHMENT_MB = formatMegabytes(MAX_ATTACHMENT_BYTES);

export function ContactForm({ formId, onClose, dict = en.contact.websiteContent, onSuccessChange }: ContactFormProps) {
  const {
    status,
    isSubmitting,
    formErrorMessage,
    fieldErrors,
    attachmentName,
    oversizedAttachmentMb,
    handleSubmit,
    reset,
    clearFieldError,
    validateEmailOnBlur,
    handleAttachmentSelected,
    clearAttachment,
  } = useContactForm({ onSuccessChange });
  const attachmentInputRef = useRef<HTMLInputElement>(null);

  function handleAttachmentChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    const accepted = handleAttachmentSelected(file);

    if (!accepted) {
      event.target.value = "";
    }
  }

  // File inputs are uncontrolled — clearing one means resetting the DOM
  // node's own value, not React state.
  function handleRemoveAttachment() {
    if (attachmentInputRef.current) {
      attachmentInputRef.current.value = "";
    }
    clearAttachment();
  }

  // Cancel clears the form in place rather than closing it — native
  // form.reset() handles the input elements, so only the React-tracked
  // state (attachment name, submit status, field/form errors) needs to
  // be reset alongside it.
  function handleCancel(event: MouseEvent<HTMLButtonElement>) {
    event.currentTarget.form?.reset();
    reset();
  }

  if (status === "success") {
    return <ContactFormSuccess formId={formId} message={dict.success} onClose={onClose} />;
  }

  return (
    <form id={formId} className="contact-form" onSubmit={handleSubmit} noValidate>
      <ContactFormField
        id="contact-company-name"
        name="companyName"
        label={dict.fields.company}
        autoComplete="organization"
        disabled={isSubmitting}
        error={fieldErrors.companyName}
        onChange={() => clearFieldError("companyName")}
      />

      <ContactFormField
        id="contact-first-name"
        name="firstName"
        label={dict.fields.firstName}
        autoComplete="given-name"
        required
        disabled={isSubmitting}
        error={fieldErrors.firstName}
        onChange={() => clearFieldError("firstName")}
      />

      <ContactFormField
        id="contact-last-name"
        name="lastName"
        label={dict.fields.lastName}
        autoComplete="family-name"
        required
        disabled={isSubmitting}
        error={fieldErrors.lastName}
        onChange={() => clearFieldError("lastName")}
      />

      <ContactFormField
        id="contact-email"
        name="email"
        label={dict.fields.email}
        type="email"
        autoComplete="email"
        required
        disabled={isSubmitting}
        error={fieldErrors.email}
        onChange={() => clearFieldError("email")}
        onBlur={validateEmailOnBlur}
      />

      <ContactFormField
        id="contact-phone"
        name="phone"
        label={dict.fields.phone}
        type="tel"
        autoComplete="tel"
        disabled={isSubmitting}
        error={fieldErrors.phone}
        onChange={() => clearFieldError("phone")}
      />

      <ContactFormField
        id="contact-message"
        name="message"
        label={dict.fields.message}
        multiline
        disabled={isSubmitting}
        error={fieldErrors.message}
        onChange={() => clearFieldError("message")}
      />

      <ContactFormAttachmentField
        label={dict.fields.attachment}
        hint={dict.attachmentHint(MAX_ATTACHMENT_MB)}
        oversizedError={oversizedAttachmentMb ? dict.attachmentTooLarge(oversizedAttachmentMb) : null}
        removeLabel={dict.removeAttachment}
        acceptAttribute={ACCEPT_ATTRIBUTE}
        disabled={isSubmitting}
        attachmentName={attachmentName}
        inputRef={attachmentInputRef}
        onChange={handleAttachmentChange}
        onRemove={handleRemoveAttachment}
      />

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

      <ContactFormActions
        isSubmitting={isSubmitting}
        submitDisabled={isSubmitting || Boolean(fieldErrors.firstName || fieldErrors.lastName || fieldErrors.email)}
        sendingLabel={dict.sending}
        onCancel={handleCancel}
      />
    </form>
  );
}
