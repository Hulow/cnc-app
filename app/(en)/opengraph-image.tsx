import { en } from "@/dictionaries/en";
import { OG_SIZE, renderOgImage } from "@/shared/seo/social-image";

// Duplicated per route (English home) — see shared/seo/social-image.tsx's
// own comment on why a single shared file doesn't cascade to nested
// routes in this project's build.
export const alt = `${en.business.name} — ${en.pages.home.title}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage();
}
