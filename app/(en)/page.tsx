import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { Logo } from "@/components/logo/logo";
import { SchemaOrg } from "@/components/schema-org/schema-org";
import { en } from "@/dictionaries/en";
import { isBotUserAgent } from "@/shared/privacy-gate/bot-user-agent";
import { pageMetadata } from "@/shared/seo/page-metadata";
import { PRIVACY_ACK_COOKIE } from "@/shared/privacy-gate/privacy-gate";
import { routes } from "@/shared/routes";
import { buildPageGraph } from "@/shared/seo/schema-org";

export const metadata: Metadata = pageMetadata("home", "en", en);

export default async function Home() {
  // Send first-time visitors through the privacy page before the home
  // page ever renders: its Continue link is what supplies the user
  // gesture the background video needs to autoplay under iOS Low Power
  // Mode (see use-background-video.ts). The Continue link sets this
  // cookie itself before navigating back here. Bots are exempted (see
  // isBotUserAgent) so link previews (WhatsApp, etc.) and search results
  // show this page's own metadata instead of the privacy page's.
  const [cookieStore, headersList] = await Promise.all([cookies(), headers()]);
  const isBot = isBotUserAgent(headersList.get("user-agent"));
  if (!isBot && !cookieStore.has(PRIVACY_ACK_COOKIE)) {
    redirect(routes.privacy.en);
  }

  return (
    <>
      <SchemaOrg data={buildPageGraph("home", "en", en)} />
      <div className="home-content">
        <Logo />
        <h1 className="home-heading">{en.pages.home.title}</h1>
      </div>
    </>
  );
}
