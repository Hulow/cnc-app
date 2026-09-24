"use client";

import { useState, type ReactNode } from "react";
import { ContactForm } from "@/components/contact/contact-form";
import { Navbar } from "@/components/navbar/navbar";
import { siteConfig } from "@/shared/site-config";
import { usePageView } from "./use-page-view";

const CONTACT_FORM_ID = "contact-form";

interface PageViewProps {
  // Rendered by the Server Component parent (app/page.tsx) and passed in
  // as already-rendered output, so their code stays out of the client
  // bundle — see the Server/Client boundary docs. ContactForm is already
  // a Client Component, so it's rendered directly here instead, where its
  // onClose closure (a function, which can't cross that boundary) lives.
  logo: ReactNode;
  service: ReactNode;
  footer: ReactNode;
}

// Rendering only: which view is current, what navigate/goHome do, and the
// default view all live in usePageView.
//
// <header> carries no layout of its own — .site-nav (in globals.css)
// pins the toggle to the screen's top-right corner via fixed positioning,
// so .content-layer below starts flush at the top of the screen instead
// of leaving a gap for an (unstyled) header row above it.
export function PageView({ logo, service, footer }: PageViewProps) {
  const { view, navigate, goHome } = usePageView();
  // Drives .contact-form's down-shift (see globals.css) so the menu
  // overlaying .content-layer's top doesn't cover the form.
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header>
        <Navbar onNavigate={navigate} onOpenChange={setIsMenuOpen} />
      </header>
      <div className="content-layer page-content" data-menu-open={isMenuOpen}>
        <main>
          <h1 className="sr-only">{siteConfig.name}</h1>
          {view === "logo" && logo}
          {view === "service" && service}
          {view === "contact" && <ContactForm formId={CONTACT_FORM_ID} onClose={goHome} />}
          {view === "placeholder" && <p>No content yet.</p>}
        </main>
        {view === "logo" && footer}
      </div>
    </>
  );
}
