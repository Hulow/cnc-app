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
        <p>
          This website does not use analytics, advertising, or tracking
          cookies, and it does not require user accounts.
        </p>
        <p>
          The website is hosted by Vercel and uses Cloudinary to deliver
          video content. These providers may process technical
          information, such as IP addresses and request data, as part of
          delivering the website and its content.
        </p>
        <button type="button" onClick={onContinue}>
          Continue
        </button>
      </div>
    </div>
  );
}
