import { useState, type FormEvent } from "react";

type FieldName = "firstName" | "lastName" | "email" | "phone" | "companyName" | "message" | "attachment";
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

function fieldErrorMessages(errors: FieldError[]): Partial<Record<FieldName, string>> {
  const messages: Partial<Record<FieldName, string>> = {};
  for (const { field, code } of errors) {
    messages[field as FieldName] = FIELD_ERROR_MESSAGES[field as FieldName]?.[code] ?? DEFAULT_ERROR_MESSAGE;
  }
  return messages;
}

export function useContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [formErrorMessage, setFormErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldName, string>>>({});

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

  return {
    status,
    isSubmitting: status === "submitting",
    formErrorMessage,
    fieldErrors,
    handleSubmit,
  };
}
