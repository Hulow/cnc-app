import type { Metadata } from "next";
import { StructuredData } from "@/components/structured-data/structured-data";
import { PrivacyPanel } from "@/components/privacy-panel/privacy-panel";
import { de } from "@/dictionaries/de";
import { pageMetadata } from "@/shared/page-metadata";
import { routes } from "@/shared/routes";
import { buildBreadcrumbs } from "@/shared/structured-data";

export const metadata: Metadata = pageMetadata("privacy", "de", de);

export default function DatenschutzPage() {
  return (
    <>
      <StructuredData data={buildBreadcrumbs("privacy", "de", de)} />
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
