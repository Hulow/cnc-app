import { ImageResponse } from "next/og";
import { LogoMark } from "@/shared/branding/logo-mark";

// The real logo (see shared/branding/logo-mark.tsx — reproduces public/logo.svg's
// own paths, not a redrawn substitute), letterboxed to fit the square
// icon undistorted rather than cropped. Duplicated identically under
// app/[lang] — see app/(en)/opengraph-image.tsx's own comment on why a
// single top-level file doesn't get picked up in this two-root-layout
// setup.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
        }}
      >
        <LogoMark width={180} />
      </div>
    ),
    { ...size },
  );
}
