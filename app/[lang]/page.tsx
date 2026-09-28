import type { Metadata } from "next";
import { Logo } from "@/components/logo/logo";
import { de } from "@/dictionaries/de";
import { pageMetadata } from "@/shared/page-metadata";

export const metadata: Metadata = pageMetadata("home", "de", de);

export default function GermanHome() {
  return (
    <div className="home-content">
      <Logo />
      <h1 className="home-heading">{de.pages.home.title}</h1>
      {/* TODO: owner copy — see dictionaries/de.ts's intro.home comment */}
      <p className="page-intro">{de.intro.home}</p>
    </div>
  );
}
