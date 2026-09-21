interface VideoOverlayProps {
  id: string;
  hidden: boolean;
  storageKey: string;
  onDismiss: () => void;
}

// Consent/info banner shown over the background video, with a single
// action that both dismisses the banner and (via `onDismiss`) starts
// playback.
export function VideoOverlay({ id, hidden, storageKey, onDismiss }: VideoOverlayProps) {
  return (
    <>
      {/*
        Whether this div is present in the tree never changes between
        server and client render (it's always mounted); only its `hidden`
        attribute is state-driven. This avoids relying on hydration to
        add/remove a whole subtree based on client-only localStorage, which
        this Next.js version doesn't reliably reconcile — see "Preventing
        flash before hydration" in the Next.js docs. The inline script below
        sets `hidden` before first paint so there's no flash either.
      */}
      <div id={id} className="video-overlay" role="note" hidden={hidden} suppressHydrationWarning>
        <p>
          Diese Website verwendet keine Analyse-, Werbe- oder
          Tracking-Cookies und keine Benutzerkonten. Sie wird von Vercel
          gehostet und nutzt Cloudinary zur Auslieferung von
          Videoinhalten. Diese Anbieter können dabei technische Daten wie
          IP-Adressen und Anfrageinformationen verarbeiten.
        </p>
        <button type="button" onClick={onDismiss}>
          Verstanden
        </button>
      </div>
      <script
        type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: `{try{if(localStorage.getItem("${storageKey}")==="1"){var el=document.getElementById("${id}");if(el)el.hidden=true}}catch(e){}}`,
        }}
      />
    </>
  );
}
