import Image from "next/image";
import { site } from "@/dictionaries/site";

// Vector logo served as a static asset (not inlined) so the browser can
// cache it independently of the page HTML. `unoptimized` skips next/image's
// raster pipeline (not applicable to an SVG) while keeping width/height and
// priority-preload support for LCP.
export function Logo() {
  return (
    <Image
      src="/logo.svg"
      alt={`${site.name} logo`}
      width={640}
      height={223}
      priority
      unoptimized
      className="logo"
    />
  );
}
