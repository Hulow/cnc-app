import type { Metadata } from "next";
import { SchemaOrg } from "@/components/schema-org/schema-org";
import { ImpressumPanel } from "@/components/impressum-panel/impressum-panel";
import { de } from "@/dictionaries/de";
import { pageMetadata } from "@/shared/seo/page-metadata";
import { routes } from "@/shared/routes";
import { buildBreadcrumbs } from "@/shared/seo/schema-org";

export const metadata: Metadata = pageMetadata("impressum", "de", de);

export default function ImpressumPageDe() {
  return (
    <>
      <SchemaOrg data={buildBreadcrumbs("impressum", "de", de)} />
      <ImpressumPanel
        dict={de}
        homeHref={routes.home.de}
        logoSrc="/footer/impressum.svg"
        logoWidth={188}
        logoHeight={23}
      />
    </>
  );
}
