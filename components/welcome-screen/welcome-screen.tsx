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
    <div className="welcome-screen" role="dialog" aria-modal="true" hidden={hidden}>
      <div className="welcome-screen-content">
        <div className="welcome-screen-text">
          <p>
          This website does not collect or track your personal data. It does not use analytics, advertising or tracking cookies, and it does not require user accounts.
          </p>
          <p>
          The website is hosted by Vercel and uses Cloudinary to deliver video content. These providers may process technical information, such as your IP address and information about requests made to the website, to deliver the website and its content.          </p>
        </div>
        <button type="button" onClick={onContinue}>
          Continue
        </button>
      </div>
    </div>
  );
}
