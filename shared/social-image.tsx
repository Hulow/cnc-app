import { ImageResponse } from "next/og";
import { LogoMark } from "./logo-mark";

// Shared by every route's opengraph-image.tsx. One file has to exist
// per leaf route segment — a single shared
// opengraph-image.tsx higher up the tree does not reliably cascade down
// to nested routes in this project's build (confirmed: /services had no
// og:image meta tag at all until a copy was added directly in
// app/(en)/services/; apple-icon.tsx, by contrast, does cascade fine, so
// that one stays as just two files). This module holds the actual
// rendering logic once; each opengraph-image.tsx is a thin per-route
// wrapper.
export const OG_SIZE = { width: 1200, height: 630 };

export function renderOgImage() {
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
        <LogoMark width={1000} />
      </div>
    ),
    OG_SIZE,
  );
}
