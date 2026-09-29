import type { Metadata } from "next";
import { StructuredData } from "@/components/structured-data/structured-data";
import { ImpressumPanel } from "@/components/impressum-panel/impressum-panel";
import { en } from "@/dictionaries/en";
import { pageMetadata } from "@/shared/page-metadata";
import { routes } from "@/shared/routes";
import { buildBreadcrumbs } from "@/shared/structured-data";

export const metadata: Metadata = pageMetadata("impressum", "en", en);

export default function ImpressumPage() {
  return (
    <>
      <StructuredData data={buildBreadcrumbs("impressum", "en", en)} />
      <ImpressumPanel
        dict={en}
        homeHref={routes.home.en}
        logoSrc="/footer/legal_notice.svg"
        logoWidth={221}
        logoHeight={23}
      />
    </>
  );
}
