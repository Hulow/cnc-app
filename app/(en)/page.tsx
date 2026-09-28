import type { Metadata } from "next";
import { Logo } from "@/components/logo/logo";
import { ReadMoreButton } from "@/components/read-more-button/read-more-button";
import { en } from "@/dictionaries/en";
import { pageMetadata } from "@/shared/page-metadata";

export const metadata: Metadata = pageMetadata("home", "en", en);

export default function Home() {
  return (
    <div className="home-content">
      <Logo />
      <h1 className="home-heading">{en.pages.home.title}</h1>
      {/* TODO: owner copy — see dictionaries/en.ts's intro.home comment */}
      <ReadMoreButton text={en.intro.home} />
    </div>
  );
}
