import type { Metadata } from "next";
import { StructuredData } from "@/components/structured-data/structured-data";
import { ImpressumPanel } from "@/components/impressum-panel/impressum-panel";
import { de } from "@/dictionaries/de";
import { pageMetadata } from "@/shared/page-metadata";
import { routes } from "@/shared/routes";
import { buildBreadcrumbs } from "@/shared/structured-data";

export const metadata: Metadata = pageMetadata("impressum", "de", de);

export default function ImpressumPageDe() {
  return (
    <>
      <StructuredData data={buildBreadcrumbs("impressum", "de", de)} />
      <ImpressumPanel dict={de} homeHref={routes.home.de} />
    </>
  );
}
