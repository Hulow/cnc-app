import type { ChangeEvent, RefObject } from "react";

interface ContactFormAttachmentFieldProps {
  label: string;
  hint: string;
  oversizedError?: string | null;
  removeLabel: string;
  acceptAttribute: string;
  disabled: boolean;
  attachmentName: string | null;
  inputRef: RefObject<HTMLInputElement | null>;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
}

export function ContactFormAttachmentField({
  label,
  hint,
  oversizedError,
  removeLabel,
  acceptAttribute,
  disabled,
  attachmentName,
  inputRef,
  onChange,
  onRemove,
}: ContactFormAttachmentFieldProps) {
  return (
    <div className="contact-form-field">
      <label className="sr-only" htmlFor="contact-attachment">
        {label}
      </label>
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
            <span className="contact-form-file-placeholder">{label}</span>
          )}
          <input
            ref={inputRef}
            id="contact-attachment"
            name="attachment"
            type="file"
            accept={acceptAttribute}
            disabled={disabled}
            onChange={onChange}
          />
        </div>
        {attachmentName && (
          <button
            type="button"
            className="contact-form-attachment-remove"
            onClick={onRemove}
            disabled={disabled}
            aria-label={removeLabel}
          >
            ×
          </button>
        )}
      </div>
      <p className="contact-form-hint">{hint}</p>
      {oversizedError && <p role="alert">{oversizedError}</p>}
    </div>
  );
}
