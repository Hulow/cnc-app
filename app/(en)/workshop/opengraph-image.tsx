import { en } from "@/dictionaries/en";
import { OG_SIZE, renderOgImage } from "@/shared/social-image";

// See shared/social-image.tsx's own comment on why this exists as a
// per-route file rather than being cascaded down from app/(en)'s own.
export const alt = `${en.business.name} — ${en.pages.workshop.title}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage();
}
