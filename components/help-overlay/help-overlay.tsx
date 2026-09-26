import { OverlayScreen } from "@/components/overlay-screen/overlay-screen";

interface HelpOverlayProps {
  onClose: () => void;
}

export function HelpOverlay({ onClose }: HelpOverlayProps) {
  return (
    <OverlayScreen buttonLabel="Continue" onButtonClick={onClose}>
      <p>If you are experiencing any issues while filling out the form, please email me at victor@gmail.com.</p>
    </OverlayScreen>
  );
}
