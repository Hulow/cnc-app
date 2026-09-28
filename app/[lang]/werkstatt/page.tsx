import type { Metadata } from "next";
import { CuttingSalonDe } from "@/components/cutting-salon/cutting-salon-de";
import { de } from "@/dictionaries/de";
import { pageMetadata } from "@/shared/page-metadata";

export const metadata: Metadata = pageMetadata("workshop", "de", de);

export default function WerkstattPage() {
  return <CuttingSalonDe dict={de} />;
}
