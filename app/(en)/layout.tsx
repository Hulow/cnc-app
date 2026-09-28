import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import { BackgroundVideo } from "@/components/background-video/background-video";
import { LanguageSwitcher } from "@/components/language-switcher/language-switcher";
import { Navbar } from "@/components/navbar/navbar";
import { StructuredData } from "@/components/structured-data/structured-data";
import { en } from "@/dictionaries/en";
import { siteConfig } from "@/shared/site-config";
import { routes } from "@/shared/routes";
// Grid + utilities only: no Reboot, so Bootstrap doesn't override the
// existing global element styles/reset in globals.css.
import "bootstrap/dist/css/bootstrap-grid.css";
import "bootstrap/dist/css/bootstrap-utilities.css";
import "../globals.css";

const russoOne = localFont({
  src: "../../public/RussoOne-Regular.ttf",
  variable: "--font-russo-one",
  display: "swap",
});

// This is one of two independent root layouts (the other is
// app/[lang]/layout.tsx, for German) — see the "multiple root layouts"
// pattern in the Next.js layout docs. Each sets its own <html lang> and
// metadataBase; per-page metadata (canonical/hreflang/openGraph.locale)
// is layered on top by each page via shared/page-metadata.ts.
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: siteConfig.name,
  description: en.meta.description,
  keywords: [...siteConfig.keywords],
  alternates: {
    canonical: routes.home.en,
  },
  openGraph: {
    title: siteConfig.name,
    description: en.meta.description,
    url: routes.home.en,
    siteName: siteConfig.name,
    locale: en.meta.ogLocale,
    alternateLocale: en.meta.ogAlternateLocale,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: siteConfig.name,
    description: en.meta.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Without this, iOS Safari has no declared theme-color and falls back to
// auto-tinting its own toolbar from whatever's flush against the top/bottom
// viewport edge — here the blue header/footer — so the toolbar visually
// fuses with them into one oversized blue bar. Pinning it to --background's
// own light/dark values (see globals.css) keeps Safari's chrome matching
// the page background instead.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

// The video, nav and footer live here (not per-route) so they persist
// across navigations instead of remounting — only <main>'s content
// (the `children` App Router passes in) changes per route.
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={russoOne.variable}>
      <body>
        <StructuredData />
        <BackgroundVideo />
        <div className="content-layer page-content">
          <header>
            <Navbar lang="en" dict={{ nav: en.nav }} />
          </header>
          <main>{children}</main>
          <footer>
            <p className="footer-copyright">
              <Link href={routes.privacy.en}>{en.footer.privacy}</Link>
            </p>
            <LanguageSwitcher lang="en" label={en.languageSwitcher.label} />
            <p className="footer-address">
              {siteConfig.contact.address.split(", ").map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
