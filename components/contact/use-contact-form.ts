import { useEffect, useState, type FormEvent } from "react";
import {
  ATTACHMENT_TOO_LARGE_MESSAGE,
  formatMegabytes,
  isAttachmentTooLarge,
} from "@/shared/contact/contact-attachment";
import { isValidEmailFormat } from "@/shared/contact/contact-email";

type FieldName = "firstName" | "lastName" | "email" | "phone" | "companyName" | "message" | "attachment";
type Status = "idle" | "submitting" | "success" | "error";

interface FieldError {
  field: FieldName;
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

// Kept in sync with the `required` attribute on these fields in ContactForm.
const REQUIRED_FIELDS: readonly FieldName[] = ["firstName", "lastName", "email"];

function fieldErrorMessage({ field, code }: FieldError): Partial<Record<FieldName, string>> {
  return { [field]: FIELD_ERROR_MESSAGES[field]?.[code] ?? DEFAULT_ERROR_MESSAGE };
}

function firstEmptyRequiredField(formData: FormData): FieldName | null {
  for (const field of REQUIRED_FIELDS) {
    const value = formData.get(field);
    if (typeof value !== "string" || value.trim().length === 0) return field;
  }
  return null;
}

interface UseContactFormOptions {
  // Lets a page-level wrapper (ContactRoute) hide its own title/read-more
  // button once the form succeeds, since the success view replaces the
  // whole form rather than sitting alongside it.
  onSuccessChange?: (success: boolean) => void;
}

export function useContactForm({ onSuccessChange }: UseContactFormOptions = {}) {
  const [status, setStatus] = useState<Status>("idle");
  const [formErrorMessage, setFormErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldName, string>>>({});
  // The real filename, not just a boolean: the native input is fully
  // hidden (so the button can read "Upload" instead of the browser's
  // fixed label), so its own filename display is hidden too — ContactForm
  // renders this in its place itself.
  const [attachmentName, setAttachmentName] = useState<string | null>(null);
  const [oversizedAttachmentMb, setOversizedAttachmentMb] = useState<string | null>(null);

  useEffect(() => {
    onSuccessChange?.(status === "success");
  }, [status, onSuccessChange]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    const emptyField = firstEmptyRequiredField(formData);
    if (emptyField) {
      setFormErrorMessage(null);
      setFieldErrors({ [emptyField]: FIELD_ERROR_MESSAGES[emptyField]?.required ?? DEFAULT_ERROR_MESSAGE });
      return;
    }

    const email = formData.get("email");
    if (typeof email === "string" && !isValidEmailFormat(email)) {
      setFormErrorMessage(null);
      setFieldErrors({ email: FIELD_ERROR_MESSAGES.email!.invalid_format! });
      return;
    }

    setStatus("submitting");
    setFormErrorMessage(null);
    setFieldErrors({});

    try {
      const response = await fetch("/api/contact", { method: "POST", body: formData });

      if (response.status === 413) {
        setFormErrorMessage(ATTACHMENT_TOO_LARGE_MESSAGE);
        setStatus("error");
        return;
      }

      const body: { ok: boolean; error?: FieldError | string } = await response.json();

      if (body.ok) {
        setStatus("success");
        return;
      }

      if (typeof body.error === "string") {
        setFormErrorMessage(body.error ?? DEFAULT_ERROR_MESSAGE);
      } else if (body.error) {
        setFieldErrors(fieldErrorMessage(body.error));
      } else {
        setFormErrorMessage(DEFAULT_ERROR_MESSAGE);
      }
      setStatus("error");
    } catch {
      setFormErrorMessage(DEFAULT_ERROR_MESSAGE);
      setStatus("error");
    }
  }

  function reset() {
    setStatus("idle");
    setFormErrorMessage(null);
    setFieldErrors({});
    setAttachmentName(null);
    setOversizedAttachmentMb(null);
  }

  // Returns whether the file was accepted, so the caller knows whether to
  // clear the native (uncontrolled) file input's value in response.
  function handleAttachmentSelected(file: File | null): boolean {
    if (file && isAttachmentTooLarge(file.size)) {
      setAttachmentName(null);
      setOversizedAttachmentMb(formatMegabytes(file.size));
      return false;
    }

    setAttachmentName(file?.name ?? null);
    setOversizedAttachmentMb(null);
    return true;
  }

  function clearAttachment() {
    setAttachmentName(null);
    setOversizedAttachmentMb(null);
  }

  // Called as the visitor edits a field, so a shown error doesn't linger
  // once they've started correcting it.
  function clearFieldError(field: FieldName) {
    setFieldErrors((previous) => {
      if (!(field in previous)) return previous;
      const next = { ...previous };
      delete next[field];
      return next;
    });
  }

  // Called when the visitor leaves the email field, so a malformed
  // address is flagged right away instead of waiting for submit. Empty
  // input is left alone — that's covered by the required-field check on
  // submit, not here.
  function validateEmailOnBlur(value: string) {
    if (value.trim().length === 0 || isValidEmailFormat(value)) return;
    setFieldErrors((previous) => ({ ...previous, email: FIELD_ERROR_MESSAGES.email!.invalid_format! }));
  }

  return {
    status,
    isSubmitting: status === "submitting",
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
  };
}
