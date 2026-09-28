import type { Metadata } from "next";
import { CuttingSalon } from "@/components/cutting-salon/cutting-salon";
import { en } from "@/dictionaries/en";
import { pageMetadata } from "@/shared/page-metadata";

export const metadata: Metadata = pageMetadata("workshop", "en", en);

export default function WorkshopPage() {
  return <CuttingSalon />;
}
