import type { Metadata } from "next";
import { StructuredData } from "@/components/structured-data/structured-data";
import { ServiceDe } from "@/components/service/service-de";
import { de } from "@/dictionaries/de";
import { pageMetadata } from "@/shared/page-metadata";
import { buildBreadcrumbs } from "@/shared/structured-data";

export const metadata: Metadata = pageMetadata("services", "de", de);

export default function LeistungenPage() {
  return (
    <>
      <StructuredData data={buildBreadcrumbs("services", "de", de)} />
      <ServiceDe dict={de} />
    </>
  );
}
