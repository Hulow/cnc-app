import Link from "next/link";

export default function PrivacyPage() {
  return (
    <section className="privacy-panel">
      {/* Visually hidden: the panel below reuses the exact same look the
          old welcome-screen modal had (blue background, centered white
          text box — see .privacy-panel/.welcome-screen-content/
          .welcome-screen-text in globals.css), which never showed a
          heading of its own — this exists only so the page has a real,
          accessible/indexable title. */}
      <h1 className="sr-only">Privacy</h1>
      <div className="welcome-screen-content">
        <div className="welcome-screen-text">
          <p>
            This website does not collect or track your personal data and does not use analytics, advertising or tracking cookies.
          </p>
          <p>
            If you use the contact form, your message and attachments are sent via Resend, an email delivery service, and are not stored in any database.
          </p>
          <p>
            The website is hosted by Vercel and uses Cloudinary to deliver video content. These providers may process technical information, such as your IP address and browser information, to deliver the website and its content.
          </p>
        </div>
        {/* Same Continue graphic the old modal used to dismiss itself —
            here it's a real navigation link back to the site instead,
            since there's nothing to dismiss on a standalone page. */}
        <Link href="/" className="welcome-screen-continue">
          <span className="welcome-screen-continue-icon-wrap">
            {/* eslint-disable @next/next/no-img-element */}
            <img
              src="/welcome/button-continue-default.svg"
              alt="Back to Home"
              width={187}
              height={44}
              className="welcome-screen-continue-icon welcome-screen-continue-icon-default"
            />
            <img
              src="/welcome/button-continue-active.svg"
              alt=""
              aria-hidden="true"
              width={187}
              height={44}
              className="welcome-screen-continue-icon welcome-screen-continue-icon-hover"
            />
            {/* eslint-enable @next/next/no-img-element */}
          </span>
        </Link>
      </div>
    </section>
  );
}
