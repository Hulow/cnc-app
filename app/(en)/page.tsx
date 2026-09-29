import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Logo } from "@/components/logo/logo";
import { en } from "@/dictionaries/en";
import { pageMetadata } from "@/shared/page-metadata";
import { PRIVACY_ACK_COOKIE } from "@/shared/privacy-gate";
import { routes } from "@/shared/routes";

export const metadata: Metadata = pageMetadata("home", "en", en);

export default async function Home() {
  // Send first-time visitors through the privacy page before the home
  // page ever renders: its Continue link is what supplies the user
  // gesture the background video needs to autoplay under iOS Low Power
  // Mode (see use-background-video.ts). The Continue link sets this
  // cookie itself before navigating back here.
  const cookieStore = await cookies();
  if (!cookieStore.has(PRIVACY_ACK_COOKIE)) {
    redirect(routes.privacy.en);
  }

  return (
    <div className="home-content">
      <Logo />
      <h1 className="home-heading">{en.pages.home.title}</h1>
    </div>
  );
}
