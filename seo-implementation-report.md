# SEO Implementation Report — MSRX Portal

**Date:** 2026-06-23 · **Scope:** gap-fill on top of existing SEO (see `seo-architecture-report.md`)
**Build:** ✅ `next build` pass · TypeScript ✅ · ESLint ✅ · 8/8 static pages prerendered
**Verification method:** grepped the **prerendered static HTML** (`.next/server/app/*.html`) — confirms
crawlers/LLMs receive every tag with **JavaScript disabled**.

> ⚠️ **Deploy state:** all changes are in the working tree, **not committed or pushed**. The repo also
> carries prior-session uncommitted SEO work (rich metadata, OG, Org/WebSite JSON-LD, robots/sitemap/
> manifest). `origin/main` (what Vercel builds) is behind. **Commit + push to deploy.**

---

## Changes by file (FILE / REASON / CHANGES / SEO IMPACT)

### `app/layout.tsx`
- **REASON:** Next 16 wants theme-color in `viewport` export; Organization lacked a contact entity.
- **CHANGES:** added `Viewport` import + `export const viewport = { themeColor:"#f8f9ff", colorScheme:"light" }`; added `contactPoint` (email) to Organization JSON-LD.
- **SEO IMPACT:** correct mobile theme-color meta; declares light-only scheme (no auto-dark forms); richer Organization entity for knowledge panel (Phase 9, 20). *(Note: metadataBase, title template, full OG/Twitter, robots, Org+WebSite JSON-LD already present from prior work.)*

### `app/page.tsx`
- **REASON:** no FAQ/FAQPage (biggest GEO gap); external links lacked SR context; decorative SVG exposed to AT.
- **CHANGES:** added factual `faqs` array + `FAQPage` JSON-LD + semantic `<dl>` FAQ section (5 Q&A); `aria-label` (incl. "opens in a new tab") on all app-card links; `aria-hidden` on decorative arrow icons + Ideas illustration SVG.
- **SEO IMPACT:** FAQPage = eligible for FAQ rich results + strong extraction surface for Google AI Overviews / ChatGPT / Perplexity / Claude (Phase 7, 8); WCAG 2.2 AA link-purpose + decorative-image fixes (Phase 13).

### `app/privacy/page.tsx`
- **REASON:** thin metadata; **double-brand title bug**; no breadcrumb; no self-canonical.
- **CHANGES:** `title` `"Privacy Policy — MSRX"` → `"Privacy Policy"` (template appends brand once); added `description`, `alternates.canonical:"/privacy"`, per-page `openGraph`; added `BreadcrumbList` JSON-LD.
- **SEO IMPACT:** fixes duplicated brand in `<title>`; unique description; correct self-canonical (no dup-content); breadcrumb rich result + crawl clarity (Phase 2, 3, 4, 7, 15).

### `app/robots.ts`
- **REASON:** make AI/search crawler stance explicit (GEO/Phase 24).
- **CHANGES:** added explicit allow rule for GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, Claude-Web, PerplexityBot, Google-Extended, Googlebot, Bingbot, Applebot(-Extended). `*` allow retained.
- **SEO IMPACT:** signals intent; confirms no legitimate AI/search bot is blocked.

---

## Validation results (from prerendered HTML)

| Check | Result |
|-------|--------|
| Home JSON-LD types | Organization ×1, WebSite ×1, ItemList ×1, SoftwareApplication ×17, Offer ×17, **FAQPage ×1 (Question ×5 / Answer ×5)**, **ContactPoint ×1** ✅ |
| Home `<meta theme-color>` | present ×1 ✅ |
| Home aria-label "opens in a new tab" | present ✅ |
| Privacy `<title>` | `Privacy Policy — MSRX` (single brand — bug fixed) ✅ |
| Privacy canonical | `https://msrx.co.in/privacy` ✅ |
| Privacy BreadcrumbList | present ×1 ✅ |
| Duplicate titles/canonicals | none ✅ |
| Fabricated ratings/reviews | none (correctly omitted) ✅ |
| Build / TS / lint | pass ✅ |

**Recommended external validation (post-deploy):** Google Rich Results Test + Schema Markup Validator
on `https://msrx.co.in/` and `/privacy`; PageSpeed Insights for field CWV; GSC + Bing Webmaster sitemap submit.

---

## Structured-data inventory (entity graph)

```
https://msrx.co.in/#organization (Organization)  ← logo, contactPoint(email), sameAs[GitHub], slogan
https://msrx.co.in/#website      (WebSite)        ← publisher → #organization
ItemList "MSRX Apps"             → 17× SoftwareApplication (each publisher → #organization, Offer price 0)
FAQPage                          → 5× Question/Answer (home)
BreadcrumbList                   → Home → Privacy Policy (privacy)
```
**GEO note:** the shared `#organization` / `#website` `@id`s are the anchor for linking every MSRX
sub-app (qr/graph/canvas/… subdomains) to the brand entity — the sub-app prompt reuses these exact ids.

---

## Core Web Vitals assessment (static analysis — not a live Lighthouse run)

Architecture is CWV-favorable; **no code change needed**:
- **SSG** static HTML, **zero `"use client"`** → minimal JS, fast TTFB on Vercel edge.
- Fonts **self-hosted** via `next/font` (`display:swap`) → no render-blocking font CDN, low CLS.
- **No raster images** (all inline SVG) → no image LCP/CLS risk, nothing to convert to WebP/AVIF.
- Security headers already set (`next.config.ts`).

**Action:** validate field data with PageSpeed Insights after deploy. Expected LCP/CLS/INP within targets.

---

## Open items (not code — your action)

1. **G7 — www→apex redirect:** confirm Vercel redirects `www.msrx.co.in` → `msrx.co.in` (301). Code declares apex canonical; this is a Vercel **dashboard** setting, not a repo change.
2. **Deploy:** `git add -A && git commit && git push origin main` → Vercel auto-deploys. (Awaiting your go-ahead.)
3. **Sub-apps:** apply `seo-subpage-prompt.md` per subdomain app, one by one.
</content>
