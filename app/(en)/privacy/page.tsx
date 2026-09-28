import type { Metadata } from "next";
import { PrivacyPanel } from "@/components/privacy-panel/privacy-panel";
import { en } from "@/dictionaries/en";
import { pageMetadata } from "@/shared/page-metadata";
import { routes } from "@/shared/routes";

export const metadata: Metadata = pageMetadata("privacy", "en", en);

export default function PrivacyPage() {
  return <PrivacyPanel dict={en} homeHref={routes.home.en} />;
}
