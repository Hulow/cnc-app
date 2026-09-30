import type { Metadata } from "next";
import { SchemaOrg } from "@/components/schema-org/schema-org";
import { CuttingSalon } from "@/components/cutting-salon/cutting-salon";
import { en } from "@/dictionaries/en";
import { pageMetadata } from "@/shared/seo/page-metadata";
import { buildBreadcrumbs } from "@/shared/seo/schema-org";

export const metadata: Metadata = pageMetadata("workshop", "en", en);

export default function WorkshopPage() {
  return (
    <>
      <SchemaOrg data={buildBreadcrumbs("workshop", "en", en)} />
      <CuttingSalon />
    </>
  );
}
