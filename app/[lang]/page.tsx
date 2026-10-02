import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { Logo } from "@/components/logo/logo";
import { SchemaOrg } from "@/components/schema-org/schema-org";
import { de } from "@/dictionaries/de";
import { isBotUserAgent } from "@/shared/privacy-gate/bot-user-agent";
import { pageMetadata } from "@/shared/seo/page-metadata";
import { PRIVACY_ACK_COOKIE } from "@/shared/privacy-gate/privacy-gate";
import { routes } from "@/shared/routes";
import { buildPageGraph } from "@/shared/seo/schema-org";

export const metadata: Metadata = pageMetadata("home", "de", de);

export default async function GermanHome() {
  // See app/(en)/page.tsx's own comment: same privacy-page gate, German
  // route.
  const [cookieStore, headersList] = await Promise.all([cookies(), headers()]);
  const isBot = isBotUserAgent(headersList.get("user-agent"));
  if (!isBot && !cookieStore.has(PRIVACY_ACK_COOKIE)) {
    redirect(routes.privacy.de);
  }

  return (
    <>
      <SchemaOrg data={buildPageGraph("home", "de", de)} />
      <div className="home-content">
        <Logo />
        <h1 className="home-heading">{de.home.metadata.title}</h1>
      </div>
    </>
  );
}
