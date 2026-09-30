import type { Metadata } from "next";
import { SchemaOrg } from "@/components/schema-org/schema-org";
import { CuttingSalonDe } from "@/components/cutting-salon/cutting-salon-de";
import { de } from "@/dictionaries/de";
import { pageMetadata } from "@/shared/seo/page-metadata";
import { buildBreadcrumbs } from "@/shared/seo/schema-org";

export const metadata: Metadata = pageMetadata("workshop", "de", de);

export default function WerkstattPage() {
  return (
    <>
      <SchemaOrg data={buildBreadcrumbs("workshop", "de", de)} />
      <CuttingSalonDe dict={de} />
    </>
  );
}
