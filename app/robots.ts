import type { MetadataRoute } from "next";
import { siteConfig } from "@/shared/site-config";

// Preview deployments (VERCEL_ENV "preview" or "development", or unset when
// building outside Vercel) must never be indexed — only the production
// deployment is a real, canonical URL worth crawling.
export default function robots(): MetadataRoute.Robots {
  if (process.env.VERCEL_ENV !== "production") {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
  };
}
