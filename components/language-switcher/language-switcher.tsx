"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { alternateLanguagePath, type Lang } from "@/shared/routes";

interface LanguageSwitcherProps {
  lang: Lang;
  label: string;
}

// Links to the equivalent page in the other language (not just that
// language's home page), so switching languages mid-browse keeps the
// visitor on the same topic. Does not auto-redirect by Accept-Language —
// per P1.1 in SEO-SPEC.md, that would hide the English version from
// crawlers that don't send the header.
export function LanguageSwitcher({ lang, label }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const href = alternateLanguagePath(pathname, lang);

  return (
    <Link href={href} className="language-switcher" hrefLang={lang === "en" ? "de" : "en"}>
      {label}
    </Link>
  );
}
