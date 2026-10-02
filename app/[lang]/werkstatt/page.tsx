import type { Metadata } from "next";
import { SchemaOrg } from "@/components/schema-org/schema-org";
import { CuttingSalon } from "@/components/cutting-salon/cutting-salon";
import { de } from "@/dictionaries/de";
import { pageMetadata } from "@/shared/seo/page-metadata";
import { buildPageGraph } from "@/shared/seo/schema-org";

export const metadata: Metadata = pageMetadata("workshop", "de", de);

export default function WerkstattPage() {
  return (
    <>
      <SchemaOrg data={buildPageGraph("workshop", "de", de)} />
      <CuttingSalon lang="de" />
    </>
  );
}
