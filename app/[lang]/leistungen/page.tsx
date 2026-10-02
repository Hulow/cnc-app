import type { Metadata } from "next";
import { SchemaOrg } from "@/components/schema-org/schema-org";
import { Service } from "@/components/service/service";
import { de } from "@/dictionaries/de";
import { pageMetadata } from "@/shared/seo/page-metadata";
import { buildBreadcrumbs } from "@/shared/seo/schema-org";

export const metadata: Metadata = pageMetadata("services", "de", de);

export default function LeistungenPage() {
  return (
    <>
      <SchemaOrg data={buildBreadcrumbs("services", "de", de)} />
      <Service lang="de" />
    </>
  );
}
