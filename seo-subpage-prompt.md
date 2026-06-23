# MSRX Sub-App SEO Prompt — Generic, Reusable

Paste the **PROMPT BODY** below into Claude Code while inside any MSRX web-app repo
(`qr`, `graph`, `canvas`, `meeting`, `pulsenet`, `cv`, `gantt`, `lab`, or any future app).
Fill the 6 variables at the top first. Pre-filled values for all current apps are in the
table at the end — copy the matching row.

> **Why this differs from the portal prompt:** the portal is a static Next.js SSG site —
> crawlers already get full HTML. Most MSRX web apps are **client-rendered SPAs (Vite/React)**,
> so the #1 SEO risk is an *empty `<div id="root">`* served to bots. This prompt's top priority
> is making title/meta/JSON-LD + a crawlable content summary exist **in static HTML, before JS runs.**

---

## VARIABLES (fill before pasting)

| Var | Meaning | Example |
|-----|---------|---------|
| `{{APP_NAME}}` | Full product name | `MSRX GraphIQ` |
| `{{APP_DOMAIN}}` | Apex URL (https, no trailing slash) | `https://graph.msrx.co.in` |
| `{{APP_TAGLINE}}` | One-line value prop (≤90 chars) | `2D/3D data visualization & AI insights from spreadsheets` |
| `{{APP_DESCRIPTION}}` | 140–160 char meta description, CTA, factual | see table |
| `{{APP_CATEGORY}}` | schema.org applicationCategory | `BusinessApplication` / `DesignApplication` / `EducationalApplication` |
| `{{FEATURE_LIST}}` | 4–8 real features, comma list | `2D charts, 3D plots, AI insights, dashboards, CSV import, PNG export` |

Fixed across all apps:
- Parent brand entity `@id`: `https://msrx.co.in/#organization`
- Brand: **MSRX** · tagline **Future. Intelligence. Impact.** · contact `mrinalsinghraja@gmail.com`
- Canonical host = the app's own apex (self-canonical). Verify Vercel redirects `www.`→apex.

---

## PROMPT BODY (copy from here ↓)

```
ROLE: Staff frontend + technical-SEO engineer. AUDIT then IMPLEMENT (don't just advise).
Preserve all existing functionality, auth, state, business logic. Factual data only —
NEVER fabricate ratings, reviews, counts, or dates.

TARGET APP: {{APP_NAME}} at {{APP_DOMAIN}}
PARENT BRAND: MSRX (https://msrx.co.in), Organization @id = https://msrx.co.in/#organization

STEP 0 — DISCOVER (before editing):
- Identify framework + rendering: Next App Router / Next Pages / Vite SPA / CRA / other.
- Determine: does the production HTML contain real content with JS disabled? Run a build and
  inspect the built index.html (view-source, NOT devtools). If <body> is an empty #root → SPA
  with NO server HTML → fixing that is PRIORITY 1.
- List all routes. Identify any private/auth/account routes (these get noindex).
- Read the framework's own docs if the version is newer than your training (check
  node_modules/<framework>/.../docs or the changelog) before using any metadata/head API.

STEP 1 — CRAWLABLE HTML (SPA only; skip if Next SSR/SSG already emits content):
- Ensure <title>, <meta name="description">, canonical, OG/Twitter, and ALL JSON-LD exist in the
  static HTML shipped before hydration. For Vite: put them in index.html (or inject at build via
  a prerender step such as vite-plugin-prerender / react-snap / vite-react-ssg). For runtime head
  control use react-helmet-async, but ALSO keep a static fallback in index.html so bots that don't
  run JS still get them.
- Add a crawlable, visually-styled (NOT display:none) content block in the initial HTML: an <h1>,
  a 2–3 sentence description of {{APP_NAME}}, and the FAQ (see STEP 5). LLM crawlers extract this.

STEP 2 — METADATA (every indexable route, unique):
- <title>: "{{APP_NAME}} — {{APP_TAGLINE}}" (≈50–60 chars; brand included).
- description: {{APP_DESCRIPTION}} (140–160 chars, human, CTA, unique per route).
- canonical: self ({{APP_DOMAIN}}<route>). No params, no trailing-slash dupes.
- robots: index,follow on public; noindex,nofollow on any auth/account/settings route.
- lang="en" on <html>. One <h1> per page; no skipped heading levels.

STEP 3 — OPEN GRAPH + TWITTER (+ image):
- og:title, og:description, og:url ({{APP_DOMAIN}}), og:type=website, og:site_name="{{APP_NAME}}",
  og:locale=en_US, og:image (1200×630, with alt).
- twitter:card=summary_large_image + title/description/image.
- If no OG image exists: generate one (Next: app/opengraph-image.tsx with next/og; Vite: add a
  static /og.png 1200×630 on-brand — cyan→purple gradient #00c4df→#8b5cf6, MSRX "M", app name).

STEP 4 — ROBOTS + SITEMAP:
- /robots.txt: allow public, disallow any /api /auth /account /settings; declare Sitemap:
  {{APP_DOMAIN}}/sitemap.xml. Explicitly allow AI/search bots (GPTBot, ChatGPT-User, OAI-SearchBot,
  ClaudeBot, PerplexityBot, Google-Extended, Googlebot, Bingbot, Applebot). Do NOT block them.
- /sitemap.xml: every public route with lastmod, changefreq, priority.

STEP 5 — JSON-LD (in static HTML; only factual fields):
1) SoftwareApplication:
   { "@context":"https://schema.org", "@type":"SoftwareApplication",
     "name":"{{APP_NAME}}", "url":"{{APP_DOMAIN}}",
     "applicationCategory":"{{APP_CATEGORY}}", "operatingSystem":"Web",
     "description":"{{APP_DESCRIPTION}}", "isAccessibleForFree":true,
     "offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},
     "featureList":[{{FEATURE_LIST}}],
     "publisher":{"@id":"https://msrx.co.in/#organization"},
     "isPartOf":{"@id":"https://msrx.co.in/#website"} }
   ^ The publisher/isPartOf @id MUST match the portal's Organization/WebSite @id — this links the
     subdomain to the MSRX brand entity in the knowledge graph (key GEO win).
2) BreadcrumbList: position1 = "MSRX" → https://msrx.co.in ; position2 = "{{APP_NAME}}" → {{APP_DOMAIN}}.
3) FAQPage: 4–6 real Q&A (what is {{APP_NAME}}, is it free, is my data stored, what platforms,
   how to contact MSRX). Mirror the visible FAQ text exactly.
   DO NOT add aggregateRating/Review unless real ratings exist. DO NOT add SearchAction unless a
   real search endpoint exists.

STEP 6 — SEMANTIC HTML + A11Y (WCAG 2.2 AA):
- header/nav/main/section/footer landmarks. One <h1>. <dl>/<dt>/<dd> for FAQ.
- aria-label on icon-only / external links ("… (opens in a new tab)"); aria-hidden on decorative SVG/icons.
- All <img>: descriptive alt, width, height, loading="lazy", decoding="async". Convert raster PNG/JPG→WebP.
- Visible focus states; keyboard-operable menus/dialogs.
- Add a footer link back to https://msrx.co.in ("Part of MSRX") — internal linking + brand association.

STEP 7 — PERFORMANCE / CWV (LCP<2s, CLS<0.05, INP<150ms):
- Self-host fonts or preconnect to the font CDN; preload the LCP asset; defer/async non-critical JS.
- Route/bundle split; lazy-load below-the-fold + heavy libs (charts/3D/canvas). Set explicit width/height
  on media to kill CLS. dns-prefetch/preconnect to any third-party origin (esm.sh, API, Groq, etc.).

STEP 8 — SECURITY HEADERS (if not present): CSP, HSTS, X-Content-Type-Options=nosniff,
  X-Frame-Options=DENY (or frame-ancestors), Referrer-Policy=strict-origin-when-cross-origin,
  Permissions-Policy. Don't break existing embeds/workers/wasm.

STEP 9 — VERIFY (prove it, don't assume):
- Production build succeeds. View-SOURCE of the built/served HTML shows title, meta, canonical,
  OG, and every JSON-LD block WITH JAVASCRIPT DISABLED.
- Validate each JSON-LD (schema.org / Rich Results). No duplicate titles/canonicals.
- robots.txt + sitemap.xml resolve and are valid. Lighthouse SEO ~100, no a11y regressions.

OUTPUT: per changed file — FILE / REASON / CHANGES / SEO IMPACT. Then a short validation summary.
SKIP (and say why) anything that doesn't apply to this app (no images, no auth routes, etc.).
```

(copy to here ↑)

---

## Pre-filled values for current MSRX web apps

Copy the row for the app you're working on into the variables above. Descriptions are 140–160 chars,
factual, from the portal catalog. Verify each against the live app before shipping.

| App | `{{APP_DOMAIN}}` | `{{APP_CATEGORY}}` | `{{FEATURE_LIST}}` |
|-----|------------------|--------------------|--------------------|
| MSRX QR Studio | https://qr.msrx.co.in | `DesignApplication` | `"21 QR types","gradients","logo embedding","30+ frames","editable templates","health scoring","AI design assistant","one-click optimize"` |
| MSRX GraphIQ | https://graph.msrx.co.in | `BusinessApplication` | `"2D charts","3D visualizations","dashboards","AI insights","spreadsheet import","editable cells"` |
| MSRX CanvasIQ | https://canvas.msrx.co.in | `DesignApplication` | `"2D drawing","vector design","diagrams","3D modeling","AI Copilot","40+ templates","PNG/SVG/PDF/3D export"` |
| MSRX Meeting | https://meeting.msrx.co.in | `BusinessApplication` | `"video meetings up to 5","live transcription","smart summaries","1080p HD","noise cancellation","E2E-encrypted P2P","local recording"` |
| OrionPulseNet | https://pulsenet.msrx.co.in | `BusinessApplication` | `"uptime monitoring","latency tracking","health checks","speed test"` |
| IncognitoCV | https://cv.msrx.co.in | `BusinessApplication` | `"AI resume tailoring","job-description matching","anonymous","nothing stored","free"` |
| Easy-Peasy Gantt | https://gantt.msrx.co.in | `BusinessApplication` | `"AI-guided Gantt","12 themes","presentation-ready","PNG export","single-file"` |
| JEE HyperLab | https://lab.msrx.co.in | `EducationalApplication` | `"100+ PCM simulations","2D/3D visualizations","live parameters","exam-grade question generator","step-by-step solutions"` |

**Suggested `{{APP_TAGLINE}}` + `{{APP_DESCRIPTION}}` (edit to taste):**

- **QR Studio** — tagline `Premium AI QR design studio`; desc `Design premium QR codes free: 21 types, gradients, logos, 30+ frames, AI assistant and health scoring. 100% private, no login. Create your QR now.`
- **GraphIQ** — tagline `2D/3D data visualization & AI insights`; desc `Turn spreadsheets into stunning 2D and 3D charts, dashboards and AI-powered insights in seconds. No setup, runs in your browser. Start visualizing free.`
- **CanvasIQ** — tagline `AI visual creation studio`; desc `Draw, design vectors, diagrams and 3D models with an AI Copilot that turns text into graphics. 40+ templates, PNG/SVG/PDF export. No sign-up, free.`
- **Meeting** — tagline `AI video meetings, private by design`; desc `Free AI video meetings for up to 5: live transcription, smart summaries, 1080p, noise cancellation, E2E-encrypted P2P. No sign-up, nothing stored.`
- **PulseNet** — tagline `Elegant network & uptime monitoring`; desc `Monitor uptime, latency and site health at a glance with PulseNet by MSRX. Clean dashboards and instant speed tests, free in your browser.`
- **IncognitoCV** — tagline `AI resume optimizer, anonymous`; desc `Tailor your CV to any job with AI in seconds — anonymous, free, and nothing is ever stored. Beat the ATS and land more interviews. Try it free.`
- **Easy-Peasy Gantt** — tagline `AI Gantt chart maker`; desc `Build beautiful, presentation-ready Gantt charts in seconds with AI guidance, 12 themes and one-click PNG export. Free, no sign-up. Start planning now.`
- **JEE HyperLab** — tagline `AI interactive STEM lab for IIT-JEE`; desc `Visualize all of IIT-JEE Physics, Chemistry & Maths across 100+ interactive 2D/3D simulations and generate exam-grade questions with solutions. Free.`
</content>
