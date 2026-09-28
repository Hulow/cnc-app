# SEO Spec — cnc-app

Audience: the coding agent working in this repository.
Audited: 2026-09-28, against the repo zip and https://cnc-app.vercel.app/ (production, Vercel).

## 0. Ground rules for the agent

- This project runs **Next.js 16.3** (App Router). Per `AGENTS.md`, read the relevant guide in `node_modules/next/dist/docs/` before using any API named here (Metadata API, `robots.ts`, `sitemap.ts`, `opengraph-image`, `generateStaticParams`, dynamic segments, `middleware`/`proxy`). Do not rely on memory of older Next.js versions.
- Keep the visual design unchanged unless a task says otherwise: background video, SVG heading logos, navbar icons, colors and animations stay.
- Single source of truth stays `shared/site-config.ts`. Anything site-wide (URL, name, address, keywords, languages) lives there.
- Every task ends with `npm run lint`, `npm test` and `npm run build` passing. Add or update tests where the task changes behavior (the repo already uses Vitest + Testing Library).
- **The owner reviews and commits every change manually.** The agent must never run `git commit`, `git push`, `git add`, `git stash`, create branches or open PRs. Leave all changes uncommitted in the working tree.
- **One task at a time.** Do one numbered task (e.g. P0.1), then stop and hand over for review with: the list of files changed, a short summary of what changed and why, the verification results, and any open question. Only start the next task when the owner says so. Tasks go in the priority order below.
- **No web servers.** Never run `next dev`, `next start`, `npm run dev`, `npm start`, `vercel dev`, a preview server, or any other process that serves HTTP, and never make HTTP requests to `localhost`. Verify only with `npm run lint`, `npm test` (Vitest + Testing Library, jsdom), `npm run build`, and by reading the files the build writes (prerendered HTML and route output under `.next/`). Checks that need a running site (Lighthouse, PageSpeed, Rich Results Test, browser behavior) are listed for the owner to do, not the agent.
- Production domain: **https://atelier-cut.com** (apex, no `www`). Brand name: **Atelier Cut**.
- Items marked **DECISION** need an answer from the owner. Don't guess them; ask, or implement behind a config value in `site-config.ts` with the stated default.

## 1. What is wrong today (summary)

| # | Problem | Evidence | Impact |
|---|---------|----------|--------|
| 1 | Canonical and `og:url` point to `https://example.com` | `siteConfig.siteUrl = "https://example.com"`; live HTML has `<link rel="canonical" href="https://example.com">` | **Critical.** Tells Google the real page is a duplicate of example.com. The site can be dropped from the index. |
| 2 | Service, Cutting Salon and Contact content is not in the HTML | `usePageView` state renders only the `logo` view on first load; the other sections mount only after a client click. Live HTML contains only the H1, nav, footer and the privacy overlay. | **Critical.** Google sees one page with ~30 words. None of the services, materials or applications can rank. |
| 3 | Only one URL exists | Nav uses `#service`, `#cnc`… with `preventDefault()`; no routes. | One title, one description, nothing to link to or share per topic. |
| 4 | No `robots.txt`, no `sitemap.xml` | Both return 404 on production. | Crawlers get no sitemap; Search Console can't be fed one. |
| 5 | Language signals contradict each other | `<html lang="en">`, English UI, but German description/keywords and `og:locale=de_DE`. | Google can't tell which audience the page is for. |
| 6 | Full-screen modal on every visit | `ExperienceGate` shows `WelcomeScreen` (`role="dialog" aria-modal`) over all content on every load. | Google demotes mobile pages whose content is covered by an interstitial on arrival. Also hurts engagement. |
| 7 | Weak titles and descriptions | Title is just `CNC Berlin`; `keywords` meta (ignored by Google). | Low click-through, no keyword coverage. |
| 8 | Headings are images, hierarchy is broken | `h1` is `sr-only`; sections jump to `h3`; every `h3` is an `<img>` of text; `aria-labelledby="about-heading"` / `"cutting-salon-heading"` point to ids that don't exist. | Headings carry little keyword weight; accessibility errors. |
| 9 | No social preview image | No `og:image`, `twitter:card=summary`. | Links shared on LinkedIn/WhatsApp/Slack show no picture. |
| 10 | Address is inconsistent | Footer: `Coppistraße 17, 10365 Berlin`. `siteConfig.contact.address`: `…10963 Berlin`. Structured data comment says the address is deliberately not public, but the footer publishes it. | Inconsistent name/address/phone ("NAP") data weakens local ranking. |
| 11 | Structured data is minimal | `LocalBusiness` with name, description, url (example.com), email, `areaServed`. | No logo, image, services, languages or social profiles for rich results. |
| 12 | Background video has no poster, `preload="auto"` | `siteConfig.video.poster = undefined`. | Slower Largest Contentful Paint, blank background on slow connections. |
| 13 | No Impressum / Datenschutz pages | None in the repo. | Required for a German business site (legal, not SEO), and a trust signal. The owner should confirm the exact requirements with a legal source. |
| 14 | Very little text overall | Whole site is about 40 short list items. | Even once crawlable, there is too little content to rank for competitive terms. |

## 2. P0 — Make the site indexable (do first)

### P0.1 Production URL from the environment

- In `shared/site-config.ts`, replace the hard-coded `siteUrl` with:
  - `process.env.NEXT_PUBLIC_SITE_URL` when set;
  - else `https://atelier-cut.com`.
- Remove any trailing slash. Add `NEXT_PUBLIC_SITE_URL=https://atelier-cut.com` to `.env.example` with a comment.
- Set `siteConfig.name` to `Atelier Cut`.
- Canonicals always point to `https://atelier-cut.com`, even when the site is served from `cnc-app.vercel.app`, so the Vercel URL never competes with the real domain.
- Fix `contact.address` to match the footer, or remove it (see DECISION D3). Render the footer address from `siteConfig`, not hard-coded.

**Done when:** a production build has `<link rel="canonical">`, `og:url` and JSON-LD `url` pointing to the real deployment URL. `grep -r "example.com"` finds nothing outside tests.

### P0.2 One route per section, server-rendered

Replace the client-side view switcher with real routes. Proposed URLs (English default; see P1.1 for German):

| Route | Content | Replaces view |
|-------|---------|---------------|
| `/` | Logo/hero + short intro text (P1.4) | `logo` |
| `/services` | `Service` component | `service` |
| `/workshop` | `CuttingSalon` component (nav label can stay "Cutting Salon") | `cutting-salon` |
| `/contact` | `ContactForm` | `contact` |

Slugs are a **DECISION** (D4); default to the table above.

Implementation requirements:
- Move `BackgroundVideo`, `Navbar` (inside `<header>`), and the footer into a shared layout so the video element persists across navigations and keeps playing. Only `<main>` changes per route.
- `Navbar`: use `next/link` with real `href`s. Remove `preventDefault()` and the `onNavigate` view logic. Derive `aria-current="page"` from `usePathname()`.
- `ContactForm`'s `onClose` navigates to `/` with `useRouter().push("/")`.
- Delete `usePageView` and its test, and add tests for the navbar's active state.
- `Service` and `CuttingSalon` stay Server Components.
- Add permanent redirects for any old hash-based bookmarks only if cheap (hash never reaches the server, so this is optional client-side sugar on `/`).
- Add `app/not-found.tsx` using the same layout, with links to the main pages.

**Done when:** after `npm run build`, the build output lists `/services`, `/workshop` and `/contact` as static (○) routes, and the prerendered HTML for `/services` (under `.next/server/app/`) contains "Small production series" (same check for a salon item in `/workshop`). A Testing Library test renders the navbar with a mocked `usePathname` and checks `aria-current`. Owner checks in the browser after deploy: navigating between pages does not restart the background video.

### P0.3 `robots.txt` and `sitemap.xml`

- `app/robots.ts`: allow all, `sitemap: ${siteUrl}/sitemap.xml`. Disallow `/api/`.
- If `process.env.VERCEL_ENV !== "production"`, return `disallow: "/"` so preview deployments are never indexed.
- `app/sitemap.ts`: all public routes (and their language alternates once P1.1 lands), with `lastModified`.

**Done when:** unit tests call the default exports of `app/robots.ts` and `app/sitemap.ts` directly and check the output (including `Disallow: /` when `VERCEL_ENV` is `preview`), and the build lists `/robots.txt` and `/sitemap.xml`. Owner checks both URLs on production after deploy.

### P0.4 Stop blocking content with the welcome overlay

The overlay text is a privacy notice. The site sets no cookies and no analytics, so no consent is required before viewing content (the owner should confirm this with a legal source). **DECISION** D1, default = option A:
- **A (recommended):** Move the text to a `/privacy` (Datenschutz) page linked from the footer. Replace the full-screen gate with nothing. Video starts muted via `autoPlay muted playsInline` (already set); keep a fallback: if `play()` rejects, show a small unobtrusive "Play" button over the video area rather than a modal.
- **B:** Keep the notice as a small, non-modal bottom banner (not `aria-modal`, doesn't cover the main content), dismissed per session with `sessionStorage` (not tracking; nothing leaves the browser).

In both cases the notice must not render on top of the content of any route on first paint.

**Done when:** the prerendered HTML of every route contains no element with `aria-modal="true"` and no full-screen overlay markup. Owner checks on a phone after deploy that the content is visible without any interaction.

## 3. P1 — On-page SEO

### P1.1 Languages: English + German

- Default proposal (**DECISION** D2): English at `/`, German under `/de` (`/de`, `/de/leistungen`, `/de/werkstatt`, `/de/kontakt`). Alternative: German default at `/`, English under `/en`, if the Berlin market matters more than the international one.
- Implement with an `[lang]` dynamic segment and `generateStaticParams`, per the Next 16 internationalization guide in `node_modules/next/dist/docs/`. No new dependency unless the docs say one is needed.
- Put all copy in dictionaries (`dictionaries/en.ts`, `dictionaries/de.ts`), including image `alt` texts and nav labels. The SVG heading images are English-only: use real text headings in German (see P1.3), or ask the owner for German SVGs.
- Per page: `<html lang>` matches the language; `alternates.canonical` is self-referencing; `alternates.languages` lists `en`, `de` and `x-default` (→ English). `openGraph.locale` = `en_US` or `de_DE` accordingly, with `alternateLocale`.
- Add a visible language switcher in the navbar or footer that links to the equivalent page.
- Do **not** auto-redirect by `Accept-Language`; Googlebot crawls mostly without it and would never see one version. A dismissible suggestion is fine.
- German copy must be written/reviewed by a human; the agent can draft it but must mark it `// TODO: review` in the dictionary.

**Done when:** the prerendered HTML of each page in both languages has the correct `lang`, a self-referencing canonical on `https://atelier-cut.com` and a complete `hreflang` set; the sitemap unit test shows both versions with `alternates`.

### P1.2 Titles and descriptions

- Root layout: `title: { default, template: "%s · <Brand>" }` using `siteConfig.name`.
- Each route exports its own `metadata` (or `generateMetadata` for `[lang]`). Title 50–60 characters, description 140–160, each unique, each containing the page's main term and "Berlin".
- Remove the `keywords` meta entry (Google ignores it); keep `siteConfig.keywords` as internal reference for copywriting only.
- Draft values (the template appends ` · Atelier Cut`; keep the full title under 60 characters, shortening the draft where needed):

| Page | EN title | DE title |
|------|----------|----------|
| `/` | CNC-made design objects & prototypes in Berlin | CNC-gefertigte Designobjekte & Prototypen in Berlin |
| `/services` | Prototypes, one-offs & small series in Berlin | Prototypen, Unikate & Kleinserien in Berlin |
| `/workshop` | 3-axis CNC workshop, 2.2 × 1.5 m — wood, aluminium, plastics | 3-Achs-CNC-Werkstatt 2,2 × 1,5 m — Holz, Aluminium, Kunststoff |
| `/contact` | Request a quote — CNC workshop Berlin | Anfrage & Angebot — CNC-Werkstatt Berlin |

### P1.3 Headings and real text

- Each page has exactly one **visible** `<h1>` (the `sr-only` H1 goes away). On `/`, it can visually sit under the logo in small type if design requires.
- Card headings become `<h2>`. Keep the SVG as decoration: render the heading text as real text and hide the SVG from assistive tech (`alt=""`, `aria-hidden`) while visually showing the SVG — or visually hide the text and keep the SVG — but the heading text node must exist in the HTML.
- Fix `aria-labelledby` targets so the ids exist.
- `service-item` / `salon-item` lists become semantic `<ul><li>`.

**Done when:** an HTML outline of each page shows h1 → h2 with no skipped levels, and no `aria-labelledby` points at a missing id.

### P1.4 Add descriptive copy (content from the owner)

Add a short paragraph (60–150 words) per page, from a dictionary entry, under the H1. The agent writes placeholder text marked `TODO: owner copy` and a list of questions for the owner; it must not invent facts (tolerances, prices, delivery times, clients).
Topics each paragraph should cover, driven by the audience (acoustics, audio, art, furniture, architecture):
- `/`: who makes what, where (Berlin), for whom.
- `/services`: from idea/sketch/CAD to finished part; one-offs, prototypes, small series; pickup in Berlin or shipping.
- `/workshop`: machine, working area, materials, software; typical applications (loudspeaker cabinets, acoustic panels/diffusers, furniture parts, art pieces, architecture models).
- `/contact`: what to send for a quote (file formats, dimensions, material, quantity).

### P1.5 Structured data

Replace `StructuredData` with a per-page JSON-LD builder:
- Site-wide (layout): `LocalBusiness` (or `ProfessionalService`) with `@id: ${siteUrl}/#business`, `name`, `url`, `logo` (absolute URL to `/logo.svg` or a PNG), `image` (OG image), `email`, `areaServed` (Berlin + Germany), `knowsLanguage` (`en`, `de`, `fr` if the owner confirms), `sameAs` (social profiles, from `siteConfig.social`, empty array by default), and `address` **only** if D3 says the address is public. Add `hasOfferCatalog` listing the services from `/services`.
- `WebSite` with `name`, `url`, `inLanguage`.
- `BreadcrumbList` on subpages.
- Build from `siteConfig` + dictionaries so both languages are consistent.

**Done when:** Google Rich Results Test and validator.schema.org show no errors for each page (owner runs these on the deployed URL; the agent includes a unit test that parses the JSON-LD and checks required fields).

### P1.6 Social previews and icons

- Add `app/opengraph-image.(tsx|png)` 1200×630 (logo on the brand background, or a crop of `public/cnc.jpg`) and, per route, a route-specific one if cheap. Set `twitter.card = "summary_large_image"`.
- Add `app/apple-icon.png` (180×180). Keep `app/icon.svg`.

### P1.7 Legal pages

Add `/impressum` and `/privacy` (+ `/de/datenschutz` / `/de/impressum` equivalents), linked from the footer on every page. Content comes from the owner; the agent only creates the pages with placeholders. These pages get `robots: { index: true }` but are excluded from the nav.

## 4. P2 — Performance and content depth

### P2.1 Background video

- Add a poster image (Cloudinary can generate one: same public ID with `.jpg` and `so_0`). Put it in `siteConfig.video.poster`.
- Use Cloudinary transformations in the URL: `f_auto,q_auto` and a width cap (e.g. `w_1920`); serve a smaller variant (`w_960`) on narrow screens via `<source media>` or a `matchMedia` choice.
- `preload="metadata"` instead of `"auto"`.
- If the Cloudinary quota runs out (see `note.md`), the `onError` path must show the poster image, not an empty background.

### P2.2 Images and fonts

- `public/cnc.jpg` is 4032×3024, 2.2 MB: keep `next/image` but add a `sizes` prop matching the layout, and store a pre-resized (≤ 2400px wide) source.
- Convert `RussoOne-Regular.ttf` to `woff2` for `next/font/local`.

**Done when (agent):** build passes; the video component test checks the poster fallback on error. **Owner check after deploy:** PageSpeed Insights (mobile) on `/` and `/workshop` shows LCP < 2.5 s and CLS < 0.1.

### P2.3 Projects / portfolio (largest long-term lever)

Add `/projects` and `/projects/[slug]` (and German equivalents), driven by a typed content file (`content/projects.ts` or MDX, per the Next 16 docs). Each project: title, short description, material, dimensions, application category (acoustics, furniture, art…), 2–6 photos with descriptive `alt`, optional video. Each project page gets its own metadata, OG image, and appears in the sitemap. Link projects from `/workshop` "Applications" items by category.
This is where searches like "loudspeaker cabinet CNC Berlin" or "Akustikpaneele fräsen Berlin" can actually rank. The agent builds the structure with one example entry marked `TODO: owner content`.

## 5. Outside the code (owner, not the agent)

1. Add `atelier-cut.com` in Vercel as the primary domain, add `www.atelier-cut.com` redirecting (308) to the apex, and make `cnc-app.vercel.app` redirect to it too. Set `NEXT_PUBLIC_SITE_URL=https://atelier-cut.com` in the Vercel project's Production environment.
2. Verify the domain in **Google Search Console** (DNS record) and **Bing Webmaster Tools**; submit `sitemap.xml`; use URL Inspection on each page after P0 ships.
3. Create a **Google Business Profile**. If customers should not visit, set it up as a service-area business (address hidden, area = Berlin). Make the name, address and phone identical everywhere (site, profile, social).
4. Get a few relevant links: your Instagram/other profiles pointing to the site, maker/acoustics/design communities, Berlin maker directories, projects you did for others (ask them to credit and link).

## 6. Open decisions for the owner

- **D1** Welcome overlay: remove and move text to `/privacy` (A, default) or small non-modal banner (B)?
- **D2** Default language: English at `/` + German at `/de` (default), or German at `/` + English at `/en`?
- **D3** Is the Coppistraße address public (show in footer + structured data) or hidden (service-area business)? And which postal code is correct: 10365 or 10963?
- **D4** URL slugs: `/services`, `/workshop`, `/contact` OK?
- **D5** ~~Final brand name~~ — decided: **Atelier Cut**, domain `https://atelier-cut.com`. Open only: does `public/logo.svg` still match the new name? The agent must not edit the logo artwork; it only updates the logo's `alt` text via `siteConfig.name`.
- **D6** Positioning / keywords: the current keywords sell "CNC Fräsen / CNC Zuschnitt" as a service. Decide whether the site should lead with CNC-as-a-service or with the design objects, loudspeakers and prototypes you make; the copy and titles in P1.2/P1.4 follow that choice.

## 7. Final verification checklist (agent runs after each phase)

- [ ] `npm run lint && npm test && npm run build` pass.
- [ ] For each route, the prerendered HTML file under `.next/server/app/` (read it from disk, no server) contains the page's H1 text, its main content, a canonical on `https://atelier-cut.com`, the correct `lang`, and (after P1.1) `hreflang` links for `en`, `de`, `x-default`.
- [ ] Unit tests for `robots.ts` and `sitemap.ts` pass and the sitemap lists every public route.
- [ ] No occurrence of `example.com` in the build output (`grep -r example.com .next/server` returns nothing).
- [ ] JSON-LD on each page parses as JSON and includes `@type`, `name`, `url`.
- [ ] No full-screen overlay in the initial HTML of any route.
- [ ] `git status` shows the changes uncommitted; nothing was committed or pushed.
- [ ] Hand-over message written: files changed, summary, verification results, open questions. Then stop.

**Owner checks after deploying (not the agent):** Lighthouse SEO 100 and Accessibility ≥ 95 on `/` (mobile); Rich Results Test on each page; `https://atelier-cut.com/robots.txt` and `/sitemap.xml` load; Search Console URL Inspection shows the rendered content.
