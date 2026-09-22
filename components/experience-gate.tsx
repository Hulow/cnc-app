"use client";

import { useRef, useState, type ReactNode } from "react";
import { BackgroundVideo, type BackgroundVideoHandle } from "./background-video";
import { WelcomeScreen } from "./welcome-screen";

// The entry point to the whole app: composes the background video with the
// page's own content and gates both behind WelcomeScreen. The visitor sees
// WelcomeScreen on every visit — dismissal is in-memory only for the
// current page load, not persisted, per specs/007-specs.md.

interface ExperienceGateProps {
  children: ReactNode;
}

export function ExperienceGate({ children }: ExperienceGateProps) {
  const backgroundVideoRef = useRef<BackgroundVideoHandle>(null);
  const [dismissed, setDismissed] = useState(false);

  return (
    <>
      <BackgroundVideo ref={backgroundVideoRef} />
      {children}
      <WelcomeScreen
        hidden={dismissed}
        onContinue={() => {
          // Must be the first statement here: Safari only treats play() as
          // a genuine user gesture if it's called synchronously within the
          // trusted click event, not after an await or a state update.
          backgroundVideoRef.current?.play();
          setDismissed(true);
        }}
      />
    </>
  );
}
