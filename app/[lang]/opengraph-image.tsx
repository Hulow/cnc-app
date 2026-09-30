import { de } from "@/dictionaries/de";
import { OG_SIZE, renderOgImage } from "@/shared/social-image";

// Duplicated per route (German home) — see shared/social-image.tsx's
// own comment on why a single shared file doesn't cascade to nested
// routes in this project's build.
export const alt = `${de.business.name} — ${de.pages.home.title}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage();
}
