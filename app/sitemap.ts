import type { MetadataRoute } from "next";
import { siteConfig } from "@/shared/site-config";

// Every public, indexable route, relative to siteUrl ("" is the home
// page). Keep in sync with app/*/page.tsx — update this list whenever a
// route is added or removed. Language alternates land here once P1.1
// ships.
const PUBLIC_PATHS = ["", "/services", "/workshop", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return PUBLIC_PATHS.map((path) => ({
    url: `${siteConfig.siteUrl}${path}`,
    lastModified,
  }));
}
