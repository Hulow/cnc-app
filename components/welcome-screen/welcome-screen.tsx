import { OverlayScreen } from "@/components/overlay-screen/overlay-screen";

interface WelcomeScreenProps {
  hidden: boolean;
  onContinue: () => void;
}

// The entry point to the whole app: a full-screen, centered gate over a
// dark-transparent backdrop, shown on every visit (not persisted across
// reloads — see specs/007-specs.md). No knowledge of what "Continue"
// unlocks (video autoplay, or anything else); that's the caller's job via
// `onContinue`.
export function WelcomeScreen({ hidden, onContinue }: WelcomeScreenProps) {
  return (
    <OverlayScreen hidden={hidden} buttonLabel="Continue" onButtonClick={onContinue}>
      <p>
        This website does not collect or track your personal data and does not use analytics, advertising or tracking cookies.
      </p>
      <p>
        If you use the contact form, your message and attachments are sent via Resend, an email delivery service, and are not stored in any database.
      </p>
      <p>
        The website is hosted by Vercel and uses Cloudinary to deliver video content. These providers may process technical information, such as your IP address and browser information, to deliver the website and its content.
      </p>
    </OverlayScreen>
  );
}
