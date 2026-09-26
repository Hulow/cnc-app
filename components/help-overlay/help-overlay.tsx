import { OverlayScreen } from "@/components/overlay-screen/overlay-screen";

interface HelpOverlayProps {
  onClose: () => void;
}

export function HelpOverlay({ onClose }: HelpOverlayProps) {
  return (
    <OverlayScreen buttonLabel="Continue" onButtonClick={onClose}>
      <p>TBA</p>
    </OverlayScreen>
  );
}
