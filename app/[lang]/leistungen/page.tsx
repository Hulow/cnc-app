import type { Metadata } from "next";
import { SchemaOrg } from "@/components/schema-org/schema-org";
import { ServiceDe } from "@/components/service/service-de";
import { de } from "@/dictionaries/de";
import { pageMetadata } from "@/shared/seo/page-metadata";
import { buildBreadcrumbs } from "@/shared/seo/schema-org";

export const metadata: Metadata = pageMetadata("services", "de", de);

export default function LeistungenPage() {
  return (
    <>
      <SchemaOrg data={buildBreadcrumbs("services", "de", de)} />
      <ServiceDe dict={de} />
    </>
  );
}
