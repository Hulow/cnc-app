import { MessagePanelButton } from "@/components/message-panel/message-panel-button";

interface ContactFormSuccessProps {
  formId: string;
  message: string;
  onClose: () => void;
}

// Replaces the whole form once submission succeeds, rather than sitting
// alongside it — see ContactForm's onSuccessChange prop, which lets a
// page-level wrapper hide its own title/read-more button to match.
export function ContactFormSuccess({ formId, message, onClose }: ContactFormSuccessProps) {
  return (
    <div id={formId} className="contact-form contact-form-success" role="status">
      <p>{message}</p>
      {/* Same default/hover image-swap mechanism as the site's Continue
          buttons (see MessagePanelButton), with its own Close asset,
          size, and CSS class family (button-close-active.svg is the
          pink hover graphic — there's no separate button-close-
          hover.svg). */}
      <MessagePanelButton
        label="Close"
        onClick={onClose}
        defaultSrc="/form/button-close-default.svg"
        hoverSrc="/form/button-close-active.svg"
        width={137}
        height={44}
        className="contact-form-close-button"
        iconWrapClassName="contact-form-close-icon-wrap"
        iconClassName="contact-form-close-icon"
      />
    </div>
  );
}
