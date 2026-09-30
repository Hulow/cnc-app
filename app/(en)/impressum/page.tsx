import type { Metadata } from "next";
import { SchemaOrg } from "@/components/schema-org/schema-org";
import { ImpressumPanel } from "@/components/impressum-panel/impressum-panel";
import { en } from "@/dictionaries/en";
import { pageMetadata } from "@/shared/seo/page-metadata";
import { routes } from "@/shared/routes";
import { buildBreadcrumbs } from "@/shared/seo/schema-org";

export const metadata: Metadata = pageMetadata("impressum", "en", en);

export default function ImpressumPage() {
  return (
    <>
      <SchemaOrg data={buildBreadcrumbs("impressum", "en", en)} />
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
