import type { Metadata } from "next";
import { Service } from "@/components/service/service";
import { en } from "@/dictionaries/en";
import { pageMetadata } from "@/shared/page-metadata";

export const metadata: Metadata = pageMetadata("services", "en", en);

export default function ServicesPage() {
  return <Service />;
}
