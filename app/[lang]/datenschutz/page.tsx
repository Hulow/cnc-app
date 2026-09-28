import type { Metadata } from "next";
import { PrivacyPanel } from "@/components/privacy-panel/privacy-panel";
import { de } from "@/dictionaries/de";
import { pageMetadata } from "@/shared/page-metadata";
import { routes } from "@/shared/routes";

export const metadata: Metadata = pageMetadata("privacy", "de", de);

export default function DatenschutzPage() {
  return <PrivacyPanel dict={de} homeHref={routes.home.de} />;
}
