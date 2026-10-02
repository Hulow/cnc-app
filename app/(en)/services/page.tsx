import type { Metadata } from "next";
import { SchemaOrg } from "@/components/schema-org/schema-org";
import { Service } from "@/components/service/service";
import { en } from "@/dictionaries/en";
import { pageMetadata } from "@/shared/seo/page-metadata";
import { buildPageGraph } from "@/shared/seo/schema-org";

export const metadata: Metadata = pageMetadata("services", "en", en);

export default function ServicesPage() {
  return (
    <>
      <SchemaOrg data={buildPageGraph("services", "en", en)} />
      <Service lang="en" />
    </>
  );
}
