# Shared directory overview

## SEO / metadata cluster

- schema-org.ts — SEO. Builds JSON-LD (LocalBusiness, WebSite, BreadcrumbList) for rich search results.
- social-image.tsx — SEO. Renders the shared OG (social-preview) image via next/og.
- page-metadata.ts — SEO. Builds per-page <title>/description/canonical/hreflang/OpenGraph metadata.
- logo-mark.tsx — not SEO itself. It's the logo redrawn as JSX/SVG paths so Satori can render it. It's a shared visual asset that social-image.tsx (and presumably the apple-icon) consume — think of it as a "brand asset" component, not an SEO concern in its own right.

## Contact form cluster

- contact-email.ts — contact form. Email format validation shared by domain + form UI.
- contact-attachment.ts — contact form. Attachment extension/MIME/size rules shared by domain, form UI, and the API route.

## Privacy consent gate cluster 

- (your "website content" guesses are off for both of these — they're not content, they're mechanism)
- privacy-gate.ts — the cookie name (privacy_ack) the privacy-interstitial sets/checks.
- bot-user-agent.ts — bot/crawler detection, used specifically to bypass that same privacy-gate redirect for link-preview bots. It literally references PRIVACY_ACK_COOKIE in its own comment — these two are a tightly coupled pair, not general "website content."

## Cross-cutting config 
- (used by almost everyone, not really "website content" or pure SEO)
- site-config.ts — technical/infra config (site URL, video CDN URLs, keywords, social links). Note its own comment: business identity facts (name, contact, service area) live in dictionaries/business.ts, not here — so this isn't "website content" in the copy sense.
- routes.ts — canonical route map + URL helpers (absoluteUrl, languageAlternates, alternateLanguagePath). Heavily consumed by the SEO files (structured-data, page-metadata, sitemap) but also by the language switcher, so it's more a core routing utility than SEO-only.