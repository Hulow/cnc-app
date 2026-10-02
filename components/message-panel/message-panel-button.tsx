import Link from "next/link";
import type { MouseEventHandler } from "react";

interface MessagePanelButtonProps {
  label: string;
  // Defaults to the site-wide Continue graphic (PrivacyPanel/ImpressumPanel/
  // NotFoundPanel and MessagePanel's overlay callers all dismiss or
  // navigate with it); pass a different src/size/className set for a
  // one-off like ContactForm's Close button, which reuses this same
  // default/hover image-swap mechanism with its own asset and CSS class
  // family.
  defaultSrc?: string;
  hoverSrc?: string;
  width?: number;
  height?: number;
  className?: string;
  iconWrapClassName?: string;
  iconClassName?: string;
  // A href renders a next/link (page navigation); omitting it renders a
  // <button> (dismiss/close actions that don't navigate via <Link>, e.g.
  // MessagePanel's overlay callers and ContactForm's success Close).
  // onClick works with either — PrivacyPanel's ContinueLink needs it
  // alongside href to set the privacy-ack cookie on the same click that
  // navigates.
  href?: string;
  onClick?: MouseEventHandler;
}

const DEFAULT_SRC = "/welcome/button-continue-default.svg";
const HOVER_SRC = "/welcome/button-continue-active.svg";
const WIDTH = 187;
const HEIGHT = 44;
const CLASS_NAME = "message-panel-button";
const ICON_WRAP_CLASS_NAME = "message-panel-button-icon-wrap";
const ICON_CLASS_NAME = "message-panel-button-icon";

// The default/hover image-swap pill button shared by every MessagePanel
// call site (Continue) and ContactForm's success view (Close, via
// overridden props). See message-panel.tsx for the surrounding layout
// this is normally paired with.
export function MessagePanelButton({
  label,
  defaultSrc = DEFAULT_SRC,
  hoverSrc = HOVER_SRC,
  width = WIDTH,
  height = HEIGHT,
  className = CLASS_NAME,
  iconWrapClassName = ICON_WRAP_CLASS_NAME,
  iconClassName = ICON_CLASS_NAME,
  href,
  onClick,
}: MessagePanelButtonProps) {
  const icons = (
    <span className={iconWrapClassName}>
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
  );

  if (href) {
    return (
      <Link href={href} className={className} onClick={onClick}>
        {icons}
      </Link>
    );
  }

  return (
    <button type="button" className={className} onClick={onClick}>
      {icons}
    </button>
  );
}
