import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Logo } from "@/components/logo/logo";
import { de } from "@/dictionaries/de";
import { pageMetadata } from "@/shared/page-metadata";
import { PRIVACY_ACK_COOKIE } from "@/shared/privacy-gate";
import { routes } from "@/shared/routes";

export const metadata: Metadata = pageMetadata("home", "de", de);

export default async function GermanHome() {
  // See app/(en)/page.tsx's own comment: same privacy-page gate, German
  // route.
  const cookieStore = await cookies();
  if (!cookieStore.has(PRIVACY_ACK_COOKIE)) {
    redirect(routes.privacy.de);
  }

  return (
    <div className="home-content">
      <Logo />
      <h1 className="home-heading">{de.pages.home.title}</h1>
    </div>
  );
}
