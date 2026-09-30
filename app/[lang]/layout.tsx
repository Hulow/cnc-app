import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import { BackgroundVideo } from "@/components/background-video/background-video";
import { LanguageSwitcher } from "@/components/language-switcher/language-switcher";
import { Navbar } from "@/components/navbar/navbar";
import { SchemaOrg } from "@/components/schema-org/schema-org";
import { de } from "@/dictionaries/de";
import { siteConfig } from "@/shared/site-config";
import { routes } from "@/shared/routes";
import { buildLocalBusiness, buildWebSite } from "@/shared/seo/schema-org";
// Grid + utilities only: no Reboot, so Bootstrap doesn't override the
// existing global element styles/reset in globals.css.
import "bootstrap/dist/css/bootstrap-grid.css";
import "bootstrap/dist/css/bootstrap-utilities.css";
import "../globals.css";

const russoOne = localFont({
  src: "../../public/RussoOne-Regular.woff2",
  variable: "--font-russo-one",
  display: "swap",
});

// Only "de" today; generateStaticParams is where a future locale (e.g.
// "fr", if the owner confirms) gets added.
export function generateStaticParams() {
  return [{ lang: "de" }];
}

// Any lang value outside generateStaticParams' list 404s instead of
// being rendered dynamically at request time (e.g. /fr right now) — see
// the dynamicParams docs.
export const dynamicParams = false;

// This is one of two independent root layouts (the other is
// app/(en)/layout.tsx, for English) — see the "multiple root layouts"
// pattern in the Next.js layout docs. [lang] is a root parameter here
// (this layout is above the root layout boundary... actually *is* the
// root layout), which is why it, not a nested layout, is what sets
// <html lang>.
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  // See app/(en)/layout.tsx's own comment on this title/no-keywords setup.
  title: de.business.name,
  description: de.meta.description,
  alternates: {
    canonical: routes.home.de,
  },
  openGraph: {
    title: de.business.name,
    description: de.meta.description,
    url: routes.home.de,
    siteName: de.business.name,
    locale: de.meta.ogLocale,
    alternateLocale: de.meta.ogAlternateLocale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: de.business.name,
    description: de.meta.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

// See app/(en)/layout.tsx's own themeColor and interactiveWidget comments.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  interactiveWidget: "resizes-content",
};

// The video, nav and footer live here (not per-route) so they persist
// across navigations instead of remounting — only <main>'s content
// (the `children` App Router passes in) changes per route.
export default async function LangRootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;

  return (
    <html lang={lang} className={russoOne.variable}>
      <body>
        <SchemaOrg data={[buildLocalBusiness(de), buildWebSite("de", de)]} />
        <BackgroundVideo />
        <div className="content-layer page-content">
          <header>
            <Navbar lang="de" dict={{ nav: de.nav }} />
            <LanguageSwitcher lang="de" />
          </header>
          <main>{children}</main>
          <footer>
            <p className="footer-copyright">
              <Link href={routes.privacy.de}>{de.footer.privacy}</Link>
              {/* Impressum link hidden for the moment */}
            </p>
            <p className="footer-address">
              {de.business.contact.address.split(", ").map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
