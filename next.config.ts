import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  experimental: {
    // Required for app/global-not-found.tsx: with two independent root
    // layouts (app/(en) for English, app/[lang] for German — see P1.1 in
    // SEO-SPEC.md), Next has no single layout to compose a "URL matched
    // no route at all" 404 from, so it falls back to its own bare
    // built-in shell unless this is enabled.
    globalNotFound: true,
  },
};

export default nextConfig;
