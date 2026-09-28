import type { Metadata } from "next";
import { ServiceDe } from "@/components/service/service-de";
import { de } from "@/dictionaries/de";
import { pageMetadata } from "@/shared/page-metadata";

export const metadata: Metadata = pageMetadata("services", "de", de);

export default function LeistungenPage() {
  return <ServiceDe dict={de} />;
}
