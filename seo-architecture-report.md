# SEO Architecture Report — MSRX Portal

**Repo:** `mrinalsinghraja/msrx-portal` · **Local:** `~/Documents/MSRX/portal`
**Domain:** `https://www.msrx.co.in` (canonical; Vercel 308-redirects apex `msrx.co.in` → www)
**Generated:** 2026-06-23 · Phase 1 of enterprise SEO audit

---

## 1. Stack & rendering model

| Item | Finding |
|------|---------|
| Framework | **Next.js 16.2.7** (App Router) |
| React | 19.2.4 |
| Styling | Tailwind CSS v4 (`@tailwindcss/postcss`) |
| Fonts | Inter via `next/font/google` — **self-hosted, `display: swap`** |
| Icons | `lucide-react` ^1.17 |
| Client JS | **Zero `"use client"`** in `app/` → every route is a Server Component |
| Rendering | **Fully static (SSG)** — no dynamic routes, no `fetch`, no runtime data. Crawlers receive complete HTML. |
| Deployment | Vercel (`prj_7mdKPxbIMnrtcLN3FgBN5cPebv5M`), always-HTTPS |
| Backend | **None** — no API, no auth, no DB. Pure marketing site. |

**Implication:** Phase 14 (SSR/SSG/ISR) is already optimal. No client-only rendering to fix.

---

## 2. Route inventory

| Route | Type | Public | Indexable | Rendering | Canonical | Structured data |
|-------|------|:------:|:---------:|-----------|-----------|-----------------|
| `/` | `app/page.tsx` | ✅ | `index,follow` | SSG | `https://www.msrx.co.in/` | Organization, WebSite, ItemList → 17× SoftwareApplication |
| `/privacy` | `app/privacy/page.tsx` | ✅ | inherited `index,follow` | SSG | ⚠️ **missing self-canonical** (inherits `/`) | none |
| `/sitemap.xml` | `app/sitemap.ts` | ✅ | n/a | static | — | — |
| `/robots.txt` | `app/robots.ts` | ✅ | n/a | static | — | — |
| `/manifest.webmanifest` | `app/manifest.ts` | ✅ | n/a | static | — | — |
| `/opengraph-image` | `app/opengraph-image.tsx` | ✅ | n/a | edge runtime | — | — |
| `/icon.svg` | `app/icon.svg` | ✅ | n/a | static | — | — |

**No private routes exist** — no `/admin`, `/dashboard`, `/account`, `/auth`, `/settings`, `/api`. Phases 2 (noindex private), 5 (disallow private), 18 (crawl-budget) have nothing to exclude. `robots: index,follow` site-wide is correct.

External web apps (`qr.`, `graph.`, `canvas.`, `meeting.`, `pulsenet.`, `cv.`, `gantt.`, `lab.` `.msrx.co.in`) are **separate deployments on their own subdomains** with their own sitemaps. Out of scope for this repo (Phase 6 note correct).

---

## 3. Existing SEO coverage (already strong)

| Phase | Status | Evidence |
|-------|:------:|----------|
| 2 — Titles/descriptions | ✅ | `layout.tsx` title default+template, description, keywords |
| 2 — Meta robots | ✅ | `robots: {index,follow, googleBot:{max-image-preview:large, max-snippet:-1}}` |
| 3 — OpenGraph | ✅ | title/desc/url/siteName/locale/type/image(1200×630+alt) |
| 3 — Twitter | ✅ | `summary_large_image` + title/desc/image |
| 3 — OG image | ✅ | dynamic `opengraph-image.tsx` (branded, gradient) |
| 4 — Canonical (home) | ✅ | `alternates.canonical: "/"` + `metadataBase` |
| 5 — robots.txt | ✅ | `robots.ts` allow `/`, sitemap + host declared |
| 6 — sitemap.xml | ✅ | `sitemap.ts` — `/` + `/privacy`, lastmod/changefreq/priority |
| 7 — Schema (Org+WebSite) | ✅ | JSON-LD `@graph` in `layout.tsx` |
| 7 — Schema (apps) | ✅ | ItemList of SoftwareApplication in `page.tsx` |
| 9 — Fonts | ✅ | `next/font` self-hosted, swap |
| 10 — Images | ✅ | No raster images; all inline SVG → nothing to convert to WebP/AVIF |
| 11 — Headings | ✅ | Single `<h1>` (sr-only descriptive), `<h2>` sections, `<h3>` app names |
| 12 — Semantic HTML | ✅ | `header`/`nav`/`main`/`section`/`footer` used |
| 14 — Rendering | ✅ | SSG, full HTML to crawlers |
| 22 — Security headers | ✅ | CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy in `next.config.ts` |
| 24 — AI crawlers | ✅ | `robots.ts` allows `*` → GPTBot/ClaudeBot/PerplexityBot **not blocked** |
| PWA manifest | ✅ | `manifest.ts` |

**Verdict:** Prior work already implemented ~20 of 27 phases. This is a **gap-fill**, not a rebuild. No fabricated ratings/reviews found (correctly omitted — respects "never fabricate").

---

## 4. Gaps found (the actual work)

Ranked by SEO/GEO impact, factual-only (no fabrication):

| # | Gap | Phase | Impact | Effort |
|---|-----|-------|--------|--------|
| **G1** | `/privacy` has only `title` — no description, **no self-canonical**, no per-page OG url | 2,3,4 | Med (duplicate-canonical risk) | XS |
| **G2** | **No FAQ content or FAQPage schema** anywhere | 7,8 | **High (GEO/AI Overviews)** | M |
| **G3** | No `BreadcrumbList` schema (home + privacy) | 7,15 | Med (rich results, nav clarity) | S |
| **G4** | Organization schema has no `contactPoint` (email exists, factual) | 7,20 | Low–Med (knowledge panel) | XS |
| **G5** | No `viewport.themeColor` export (Next 16 correct location); manifest has it but `<meta theme-color>` absent | 9 | Low (mobile UI polish) | XS |
| **G6** | App-card external links lack descriptive `aria-label` ("opens in new tab"); decorative "Ideas" SVG not `aria-hidden` | 13 | Low–Med (WCAG 2.2 AA) | S |
| **G7** | www↔apex mismatch: code declared apex but Vercel redirects apex→www → **fixed: all signals aligned to `www`** | 4,17,22 | Med (duplicate content) | done |
| **G8** | `robots.ts` could name AI bots explicitly (clarity, not required since `*` allows) | 24 | Very low (optional) | XS |

### Explicitly NOT doing (and why)
- ❌ `aggregateRating` / `Review` schema — **no real ratings exist**; fabricating violates Phase 7 rule.
- ❌ `SearchAction` / sitelinks searchbox — **site has no search endpoint**; would be invalid/misleading.
- ❌ PNG→WebP/AVIF conversion — **no raster images** in repo.
- ❌ Dynamic/blog/docs sitemap entries — **no such routes exist**.
- ❌ `noindex` routes — **no private routes exist** to hide.
- ⏸️ Per-app landing/feature/use-case pages (Phase 19) — **large content scope**; each web app already self-hosts SEO on its subdomain. Flagged as optional future work, not auto-built.

---

## 5. Canonicalization decision

**Canonical host = `www` (`https://www.msrx.co.in`).** Verified live: Vercel 308-redirects apex → www (`msrx.co.in` → `www.msrx.co.in`), and the audit brief named `https://www.msrx.co.in/` as the primary domain. The code originally declared the bare apex — a mismatch (HTML canonical = apex, redirect target = www). **Resolution (G7): all in-repo signals — `metadataBase`, canonical, OpenGraph, JSON-LD `@id`s, robots `host`, sitemap — switched to `www`.** No Vercel change needed; the existing apex→www redirect now agrees with the markup.

---

## 6. Implementation plan (pending approval)

1. **G1** `app/privacy/page.tsx` — add `description`, `alternates.canonical: "/privacy"`, per-page `openGraph.url`.
2. **G2** `app/page.tsx` — add semantic FAQ `<section>` (factual Q&A: what is MSRX, are apps free, privacy, platforms, contact) + `FAQPage` JSON-LD.
3. **G3** `app/page.tsx` + `app/privacy/page.tsx` — `BreadcrumbList` JSON-LD.
4. **G4** `app/layout.tsx` — add `contactPoint` (email) to Organization.
5. **G5** `app/layout.tsx` — `export const viewport: Viewport = { themeColor: [...] }`.
6. **G6** `app/page.tsx` — `aria-label` on app-card links, `aria-hidden`/`role="img"` on decorative SVGs.
7. **G8** `app/robots.ts` — optional explicit AI-bot allow rules.
8. **Verify** — `npm run build` + `npm run lint`; spot-check rendered `<head>` and JSON-LD via dev server.
9. **Reports** — emit `seo-implementation-report.md`, `structured-data-report.md`, `seo-validation-report.md`, `core-web-vitals-report.md`.

**Files touched:** `app/page.tsx`, `app/privacy/page.tsx`, `app/layout.tsx`, `app/robots.ts` (4 files). No changes to security headers, routing, or any logic.
</content>
</invoke>
