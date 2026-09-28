import type { Metadata } from "next";
import { StructuredData } from "@/components/structured-data/structured-data";
import { CuttingSalonDe } from "@/components/cutting-salon/cutting-salon-de";
import { de } from "@/dictionaries/de";
import { pageMetadata } from "@/shared/page-metadata";
import { buildBreadcrumbs } from "@/shared/structured-data";

export const metadata: Metadata = pageMetadata("workshop", "de", de);

export default function WerkstattPage() {
  return (
    <>
      <StructuredData data={buildBreadcrumbs("workshop", "de", de)} />
      <CuttingSalonDe dict={de} />
    </>
  );
}
