// Single source of truth for the contact form's attachment constraints.
// Consumed by the domain (validation), the form UI (accept attribute /
// help text), and the API route (rejection) so the rules never drift
// between layers.

export const ALLOWED_ATTACHMENT_EXTENSIONS = [
  ".dxf",
  ".dwg",
  ".step",
  ".stp",
  ".pdf",
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
] as const;

export type AllowedAttachmentExtension = (typeof ALLOWED_ATTACHMENT_EXTENSIONS)[number];

// Browsers/OSes report inconsistent (or generic) MIME types for CAD
// formats, so "application/octet-stream" is accepted alongside them.
// Image/PDF MIME reporting is reliable, so only the exact type is allowed.
export const ATTACHMENT_MIME_TYPES_BY_EXTENSION: Record<AllowedAttachmentExtension, readonly string[]> = {
  ".dxf": ["image/vnd.dxf", "application/dxf", "application/octet-stream"],
  ".dwg": ["application/acad", "image/vnd.dwg", "application/octet-stream"],
  ".step": ["application/step", "model/step", "application/octet-stream"],
  ".stp": ["application/step", "model/step", "application/octet-stream"],
  ".pdf": ["application/pdf"],
  ".jpg": ["image/jpeg"],
  ".jpeg": ["image/jpeg"],
  ".png": ["image/png"],
  ".webp": ["image/webp"],
};

export const MAX_ATTACHMENT_BYTES = 4.5 * 1024 * 1024;
export const MAX_ATTACHMENT_COUNT = 1;
export const ATTACHMENT_TOO_LARGE_MESSAGE = "The attachment is too large.";

export function isAttachmentTooLarge(sizeBytes: number): boolean {
  return sizeBytes > MAX_ATTACHMENT_BYTES;
}

export function getAttachmentExtension(filename: string): string {
  const lastDot = filename.lastIndexOf(".");
  return lastDot === -1 ? "" : filename.slice(lastDot).toLowerCase();
}

export function isAllowedAttachmentExtension(extension: string): extension is AllowedAttachmentExtension {
  return (ALLOWED_ATTACHMENT_EXTENSIONS as readonly string[]).includes(extension);
}
