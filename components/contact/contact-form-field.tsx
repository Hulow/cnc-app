interface ContactFormFieldProps {
  id: string;
  name: string;
  label: string;
  type?: "text" | "email" | "tel";
  multiline?: boolean;
  autoComplete?: string;
  required?: boolean;
  disabled: boolean;
  error?: string;
  onChange: () => void;
  onBlur?: (value: string) => void;
}

// Shared markup for every plain field (company/first name/last name/email/
// phone/message): label, input or textarea, and its error message. Required
// fields also get the floating placeholder span that stands in for the
// native placeholder once the field is non-empty (see .contact-form-
// placeholder and the :placeholder-shown rule in globals.css) — the native
// input/textarea keeps the same text as its own placeholder regardless, so
// it still shows before React hydrates.
export function ContactFormField({
  id,
  name,
  label,
  type = "text",
  multiline = false,
  autoComplete,
  required = false,
  disabled,
  error,
  onChange,
  onBlur,
}: ContactFormFieldProps) {
  return (
    <div className="contact-form-field">
      <label className="sr-only" htmlFor={id}>
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          name={name}
          placeholder={label}
          rows={5}
          disabled={disabled}
          onChange={onChange}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          placeholder={label}
          required={required}
          disabled={disabled}
          onChange={onChange}
          onBlur={onBlur ? (event) => onBlur(event.target.value) : undefined}
        />
      )}
      {required && (
        <span className="contact-form-placeholder" aria-hidden="true">
          {label}
          <span className="contact-form-required"> *</span>
        </span>
      )}
      {error && <p role="alert">{error}</p>}
    </div>
  );
}
