import type { Metadata } from "next";
import { StructuredData } from "@/components/structured-data/structured-data";
import { CuttingSalon } from "@/components/cutting-salon/cutting-salon";
import { en } from "@/dictionaries/en";
import { pageMetadata } from "@/shared/page-metadata";
import { buildBreadcrumbs } from "@/shared/structured-data";

export const metadata: Metadata = pageMetadata("workshop", "en", en);

export default function WorkshopPage() {
  return (
    <>
      <StructuredData data={buildBreadcrumbs("workshop", "en", en)} />
      <CuttingSalon />
    </>
  );
}
