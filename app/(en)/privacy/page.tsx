import type { Metadata } from "next";
import { StructuredData } from "@/components/structured-data/structured-data";
import { PrivacyPanel } from "@/components/privacy-panel/privacy-panel";
import { en } from "@/dictionaries/en";
import { pageMetadata } from "@/shared/page-metadata";
import { routes } from "@/shared/routes";
import { buildBreadcrumbs } from "@/shared/structured-data";

export const metadata: Metadata = pageMetadata("privacy", "en", en);

export default function PrivacyPage() {
  return (
    <>
      <StructuredData data={buildBreadcrumbs("privacy", "en", en)} />
      <PrivacyPanel dict={en} homeHref={routes.home.en} />
    </>
  );
}
