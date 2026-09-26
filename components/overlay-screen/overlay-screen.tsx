import type { ReactNode } from "react";

interface OverlayScreenProps {
  hidden?: boolean;
  buttonLabel: string;
  onButtonClick: () => void;
  children: ReactNode;
}

// Shared shell behind WelcomeScreen and HelpOverlay: a full-screen, centered
// dialog over the .welcome-screen backdrop, with a text block and a single
// action button. Callers own their own copy and button behavior.
export function OverlayScreen({ hidden = false, buttonLabel, onButtonClick, children }: OverlayScreenProps) {
  return (
    <div className="welcome-screen" role="dialog" aria-modal="true" hidden={hidden}>
      <div className="welcome-screen-content">
        <div className="welcome-screen-text">{children}</div>
        <button type="button" onClick={onButtonClick}>
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}
