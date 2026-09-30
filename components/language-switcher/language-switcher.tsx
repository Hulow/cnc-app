"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { alternateLanguagePath, type Lang } from "@/shared/routes";

interface LanguageSwitcherProps {
  lang: Lang;
}

const LANGUAGE_LOGOS: Record<Lang, { default: string; hover: string; label: string }> = {
  en: {
    default: "/translation/english_translation_default.svg",
    hover: "/translation/english_translation_hover.svg",
    label: "English",
  },
  de: {
    default: "/translation/german_translation_default.svg",
    hover: "/translation/german_translation_hover.svg",
    label: "Deutsch",
  },
};

// Renders only the OTHER language's logo — on an English page this shows
// the DE logo (and vice versa) — so it always reads as "switch to X",
// never as a page showing its own current language. Links to that
// language's equivalent page (not just its home page), so switching
// mid-browse keeps the visitor on the same topic. Does not auto-redirect
// by Accept-Language — that would hide the English version from
// crawlers that don't send the header.
export function LanguageSwitcher({ lang }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const otherLang: Lang = lang === "en" ? "de" : "en";
  const logo = LANGUAGE_LOGOS[otherLang];
  const href = alternateLanguagePath(pathname, lang);

  return (
    <div className="language-switcher">
      <Link href={href} className="language-switcher-link" hrefLang={otherLang}>
        <span className="language-switcher-logo-wrap">
          {/* Plain <img>, not next/image: already-unoptimized SVGs
              swapped by opacity (see .language-switcher-logo* in
              globals.css), same reasoning as the nav icons in
              Navbar. */}
          {/* eslint-disable @next/next/no-img-element */}
          <img
            src={logo.default}
            alt={logo.label}
            width={49}
            height={23}
            className="language-switcher-logo language-switcher-logo-default"
          />
          <img
            src={logo.hover}
            alt=""
            aria-hidden="true"
            width={49}
            height={23}
            className="language-switcher-logo language-switcher-logo-hover"
          />
          {/* eslint-enable @next/next/no-img-element */}
        </span>
      </Link>
    </div>
  );
}
