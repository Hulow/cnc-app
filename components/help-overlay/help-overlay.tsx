import { OverlayScreen } from "@/components/overlay-screen/overlay-screen";
import { en } from "@/dictionaries/en";

interface HelpOverlayProps {
  onClose: () => void;
  text?: string;
}

export function HelpOverlay({ onClose, text = en.contact.help }: HelpOverlayProps) {
  return (
    <OverlayScreen buttonLabel="Continue" onButtonClick={onClose}>
      <p>{text}</p>
    </OverlayScreen>
  );
}
