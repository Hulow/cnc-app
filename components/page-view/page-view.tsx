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
}

// Rendering only: which view is current, what navigate/goHome do, and the
// default view all live in usePageView.
export function PageView({ logo, service }: PageViewProps) {
  const { view, navigate, goHome } = usePageView();

  return (
    <>
      <header>
        <Navbar onNavigate={navigate} />
      </header>
      <main>
        <h1 className="sr-only">{siteConfig.name}</h1>
        {view === "logo" && logo}
        {view === "service" && service}
        {view === "contact" && <ContactForm formId={CONTACT_FORM_ID} onClose={goHome} />}
      </main>
    </>
  );
}
