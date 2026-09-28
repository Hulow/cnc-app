import type { Metadata } from "next";
import { Logo } from "@/components/logo/logo";
import { de } from "@/dictionaries/de";
import { pageMetadata } from "@/shared/page-metadata";

export const metadata: Metadata = pageMetadata("home", "de", de);

export default function GermanHome() {
  return <Logo />;
}
