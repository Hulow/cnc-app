import type { Metadata } from "next";
import { SchemaOrg } from "@/components/schema-org/schema-org";
import { PrivacyPanel } from "@/components/privacy-panel/privacy-panel";
import { de } from "@/dictionaries/de";
import { pageMetadata } from "@/shared/seo/page-metadata";
import { routes } from "@/shared/routes";
import { buildPageGraph } from "@/shared/seo/schema-org";

export const metadata: Metadata = pageMetadata("privacy", "de", de);

export default function DatenschutzPage() {
  return (
    <>
      <SchemaOrg data={buildPageGraph("privacy", "de", de)} />
      <PrivacyPanel
        dict={de}
        homeHref={routes.home.de}
        logoSrc="/footer/datenschutz.svg"
        logoWidth={231}
        logoHeight={23}
      />
    </>
  );
}
