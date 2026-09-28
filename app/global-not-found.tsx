import type { Metadata } from "next";
import { de } from "@/dictionaries/de";
import { en } from "@/dictionaries/en";
import { siteConfig } from "@/shared/site-config";
import { routes } from "@/shared/routes";

// Handles URLs that match no route at all in either language tree (see
// app/(en) and app/[lang], two independent root layouts — Next has no
// single layout to compose a 404 from otherwise; see the "multiple root
// layouts" note in the layout docs and this file's own convention docs).
// app/(en)/not-found.tsx and app/[lang]/not-found.tsx still exist for an
// explicit notFound() call thrown *within* an already-matched route
// (e.g. a future /projects/[slug] page) — a different case from this
// one. Deliberately lightweight (no video/nav/full globals.css): this
// bypasses the normal layout tree entirely, so anything it needs it
// must import itself, and it's most often hit by dead links or typos.
export const metadata: Metadata = {
  title: `${siteConfig.name} — Not Found / Nicht gefunden`,
};

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem",
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          color: "#171717",
          background: "#ffffff",
        }}
      >
        <div style={{ maxWidth: "32rem", textAlign: "center" }}>
          <h1 style={{ fontWeight: "bold", fontSize: "1.5rem", margin: "0 0 1.5rem" }}>
            {siteConfig.name}
          </h1>

          <section style={{ marginBottom: "1.5rem" }}>
            <h2 style={{ fontSize: "1.25rem", margin: "0 0 0.5rem" }}>{en.notFound.heading}</h2>
            <p style={{ margin: "0 0 0.75rem" }}>{en.notFound.body}</p>
            <a href={routes.home.en} style={{ color: "#0030ff" }}>
              {en.nav.home}
            </a>
          </section>

          <section>
            <h2 lang="de" style={{ fontSize: "1.25rem", margin: "0 0 0.5rem" }}>
              {de.notFound.heading}
            </h2>
            <p lang="de" style={{ margin: "0 0 0.75rem" }}>
              {de.notFound.body}
            </p>
            <a href={routes.home.de} lang="de" style={{ color: "#0030ff" }}>
              {de.nav.home}
            </a>
          </section>
        </div>
      </body>
    </html>
  );
}
