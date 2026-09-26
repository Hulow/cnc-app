import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { siteConfig } from "@/shared/site-config";
// Grid + utilities only: no Reboot, so Bootstrap doesn't override the
// existing global element styles/reset in globals.css.
import "bootstrap/dist/css/bootstrap-grid.css";
import "bootstrap/dist/css/bootstrap-utilities.css";
import "./globals.css";

const courierPrime = localFont({
  src: "../public/CourierPrime-Regular.ttf",
  variable: "--font-courier-prime",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    siteName: siteConfig.name,
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: siteConfig.name,
    description: siteConfig.description,
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={courierPrime.variable}>
      <body>{children}</body>
    </html>
  );
}
