"use client";

import { type ReactNode } from "react";
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
  cuttingSalon: ReactNode;
  footer: ReactNode;
}

// Rendering only: which view is current, what navigate/goHome do, and the
// default view all live in usePageView.
//
// Navbar renders inside .content-layer (not a separate <header> above
// it) — .site-nav (in globals.css) is a normal-flow, full-width block now
// rather than a fixed-position widget, so it has to sit in the same
// column flex as main/footer to get .content-layer's own width and
// spacing instead of floating independently over the page.
export function PageView({ logo, service, cuttingSalon, footer }: PageViewProps) {
  const { view, navigate, goHome } = usePageView();

  return (
    <div className="content-layer page-content">
      <header>
        <Navbar currentView={view} onNavigate={navigate} />
      </header>
      <main>
        <h1 className="sr-only">{siteConfig.name}</h1>
        {view === "logo" && logo}
        {view === "service" && service}
        {view === "contact" && <ContactForm formId={CONTACT_FORM_ID} onClose={goHome} />}
        {view === "cutting-salon" && cuttingSalon}
      </main>
      {footer}
    </div>
  );
}
