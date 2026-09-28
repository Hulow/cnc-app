import type { Metadata } from "next";
import { Logo } from "@/components/logo/logo";
import { en } from "@/dictionaries/en";
import { pageMetadata } from "@/shared/page-metadata";

export const metadata: Metadata = pageMetadata("home", "en", en);

export default function Home() {
  return <Logo />;
}
