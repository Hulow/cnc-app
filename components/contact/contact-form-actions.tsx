import type { MouseEventHandler } from "react";

interface IconSwapButtonProps {
  type: "submit" | "button";
  className: string;
  iconWrapClassName: string;
  iconClassName: string;
  defaultSrc: string;
  hoverSrc: string;
  width: number;
  height: number;
  label: string;
  ariaLabel?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

// The default/hover image-swap button shared by Send, Clear and Help — see
// .contact-form-actions button.contact-form-{submit,clear,help} in
// globals.css for the hover-swap CSS this markup drives.
function IconSwapButton({
  type,
  className,
  iconWrapClassName,
  iconClassName,
  defaultSrc,
  hoverSrc,
  width,
  height,
  label,
  ariaLabel,
  disabled,
  onClick,
}: IconSwapButtonProps) {
  return (
    <button type={type} className={className} onClick={onClick} disabled={disabled} aria-label={ariaLabel}>
      <span className={iconWrapClassName}>
        {/* Plain <img>, not next/image — see the nav icons in Navbar for
            why: these are already unoptimized SVGs, so Image buys
            nothing here. */}
        {/* eslint-disable @next/next/no-img-element */}
        <img
          src={defaultSrc}
          alt={label}
          width={width}
          height={height}
          className={`${iconClassName} ${iconClassName}-default`}
        />
        <img
          src={hoverSrc}
          alt=""
          aria-hidden="true"
          width={width}
          height={height}
          className={`${iconClassName} ${iconClassName}-hover`}
        />
        {/* eslint-enable @next/next/no-img-element */}
      </span>
    </button>
  );
}

interface ContactFormActionsProps {
  isSubmitting: boolean;
  submitDisabled: boolean;
  sendingLabel: string;
  onCancel: MouseEventHandler<HTMLButtonElement>;
  onHelp: () => void;
}

export function ContactFormActions({
  isSubmitting,
  submitDisabled,
  sendingLabel,
  onCancel,
  onHelp,
}: ContactFormActionsProps) {
  return (
    <div className="contact-form-actions">
      <IconSwapButton
        type="submit"
        className="contact-form-submit"
        iconWrapClassName="contact-form-submit-icon-wrap"
        iconClassName="contact-form-submit-icon"
        defaultSrc="/form/button-send-default.svg"
        hoverSrc="/form/button-send-hover.svg"
        width={120}
        height={44}
        label="Send"
        // The image swap above doesn't reflect the submitting state, so
        // the accessible name still has to — aria-label overrides the
        // default (hidden) icon's alt text as the button's name.
        ariaLabel={isSubmitting ? sendingLabel : undefined}
        disabled={submitDisabled}
      />
      <IconSwapButton
        type="button"
        className="contact-form-clear"
        iconWrapClassName="contact-form-clear-icon-wrap"
        iconClassName="contact-form-clear-icon"
        defaultSrc="/form/button-clear-default.svg"
        hoverSrc="/form/button-clear-hover.svg"
        width={139}
        height={44}
        label="Clear"
        onClick={onCancel}
        disabled={isSubmitting}
      />
      <IconSwapButton
        type="button"
        className="contact-form-help"
        iconWrapClassName="contact-form-help-icon-wrap"
        iconClassName="contact-form-help-icon"
        defaultSrc="/form/button-help-default.svg"
        // button-help-active.svg is the pink asset for this set (its
        // stroke matches button-send-hover.svg/button-clear-hover.svg's
        // pink, not the "active" pink used for a persistent nav
        // selection) — there's no separate button-help-hover.svg, so
        // this is the hover graphic.
        hoverSrc="/form/button-help-active.svg"
        width={118}
        height={44}
        label="Help"
        onClick={onHelp}
        disabled={isSubmitting}
      />
    </div>
  );
}
