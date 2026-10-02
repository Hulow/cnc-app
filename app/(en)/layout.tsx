import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import { BackgroundVideo } from "@/components/background-video/background-video";
import { LanguageSwitcher } from "@/components/language-switcher/language-switcher";
import { Navbar } from "@/components/navbar/navbar";
import { en } from "@/dictionaries/en";
import { siteConfig } from "@/shared/site-config";
import { routes } from "@/shared/routes";
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

// This is one of two independent root layouts (the other is
// app/[lang]/layout.tsx, for German) — see the "multiple root layouts"
// pattern in the Next.js layout docs. Each sets its own <html lang> and
// metadataBase; per-page metadata (canonical/hreflang/openGraph.locale)
// is layered on top by each page via shared/seo/page-metadata.ts.
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  // Every page sets its own full, already-branded title via
  // shared/seo/page-metadata.ts (not a title.template here — that has a
  // documented gap for a page.tsx in the same folder as the layout
  // defining it, which is exactly our home route; see that file's own
  // comment). This is just the fallback for the rare case nothing below
  // defines one. No `keywords` — the meta tag is ignored by Google;
  // siteConfig.keywords stays as internal copywriting reference only.
  title: en.business.name,
  description: en.meta.description,
  alternates: {
    canonical: routes.home.en,
  },
  openGraph: {
    title: en.business.name,
    description: en.meta.description,
    url: routes.home.en,
    siteName: en.business.name,
    locale: en.meta.ogLocale,
    alternateLocale: en.meta.ogAlternateLocale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: en.business.name,
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
  // Default ("resizes-visual") leaves the layout viewport's own height
  // untouched when the on-screen keyboard opens on iOS — only the visual
  // viewport shrinks. globals.css's sticky footer (.page-content footer,
  // bottom: 0) resolves "bottom" against that unchanged layout viewport,
  // so once a form field is focused and the page is scrolled, the footer
  // sticks to where the bottom edge would be with the keyboard closed —
  // now hidden behind the keyboard — instead of the real visible bottom
  // edge. resizes-content makes the layout viewport (and dvh, which
  // --viewport-height in globals.css is keyed to) shrink to match the
  // visual one, so sticky/dvh-based layout reflows around the keyboard
  // like any other viewport resize.
  interactiveWidget: "resizes-content",
};

// The video, nav and footer live here (not per-route) so they persist
// across navigations instead of remounting — only <main>'s content
// (the `children` App Router passes in) changes per route.
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={russoOne.variable}>
      <body>
        <BackgroundVideo />
        <div className="content-layer page-content">
          <header>
            <Navbar lang="en" dict={{ nav: en.nav }} />
            <LanguageSwitcher lang="en" />
          </header>
          <main>{children}</main>
          <footer>
            <p className="footer-copyright">
              <Link href={routes.privacy.en}>{en.footer.privacy}</Link>
              {/* Impressum link hidden for the moment */}
            </p>
            <p className="footer-address">
              {en.business.contact.address.split(", ").map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
