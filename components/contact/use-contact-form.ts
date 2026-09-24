import { useState, type FormEvent } from "react";

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

function fieldErrorMessage({ field, code }: FieldError): Partial<Record<FieldName, string>> {
  return { [field]: FIELD_ERROR_MESSAGES[field]?.[code] ?? DEFAULT_ERROR_MESSAGE };
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

  return {
    status,
    isSubmitting: status === "submitting",
    formErrorMessage,
    fieldErrors,
    handleSubmit,
  };
}
