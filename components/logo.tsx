import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

// Vector logo served as a static asset (not inlined) so the browser can
// cache it independently of the page HTML. `unoptimized` skips next/image's
// raster pipeline (not applicable to an SVG) while keeping width/height and
// priority-preload support for LCP.
export function Logo() {
  return (
    <Image
      src="/logo.svg"
      alt={`${siteConfig.name} logo`}
      width={640}
      height={396}
      priority
      unoptimized
      className="logo"
    />
  );
}
