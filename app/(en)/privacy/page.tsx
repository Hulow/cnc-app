import type { Metadata } from "next";
import { SchemaOrg } from "@/components/schema-org/schema-org";
import { PrivacyPanel } from "@/components/privacy-panel/privacy-panel";
import { en } from "@/dictionaries/en";
import { pageMetadata } from "@/shared/seo/page-metadata";
import { routes } from "@/shared/routes";
import { buildBreadcrumbs } from "@/shared/seo/schema-org";

export const metadata: Metadata = pageMetadata("privacy", "en", en);

export default function PrivacyPage() {
  return (
    <>
      <SchemaOrg data={buildBreadcrumbs("privacy", "en", en)} />
      <PrivacyPanel
        dict={en}
        homeHref={routes.home.en}
        logoSrc="/footer/privacy.svg"
        logoWidth={141}
        logoHeight={23}
      />
    </>
  );
}
