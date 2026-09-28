import type { Metadata } from "next";
import { StructuredData } from "@/components/structured-data/structured-data";
import { Service } from "@/components/service/service";
import { en } from "@/dictionaries/en";
import { pageMetadata } from "@/shared/page-metadata";
import { buildBreadcrumbs } from "@/shared/structured-data";

export const metadata: Metadata = pageMetadata("services", "en", en);

export default function ServicesPage() {
  return (
    <>
      <StructuredData data={buildBreadcrumbs("services", "en", en)} />
      <Service />
    </>
  );
}
