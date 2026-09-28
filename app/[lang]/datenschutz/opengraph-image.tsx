import { de } from "@/dictionaries/de";
import { siteConfig } from "@/shared/site-config";
import { OG_SIZE, renderOgImage } from "@/shared/social-image";

// See shared/social-image.tsx's own comment on why this exists as a
// per-route file rather than being cascaded down from app/[lang]'s own.
export const alt = `${siteConfig.name} — ${de.pages.privacy.title}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage();
}
