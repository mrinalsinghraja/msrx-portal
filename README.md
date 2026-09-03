# MSRX Portal

**[www.msrx.co.in](https://www.msrx.co.in)** — the catalog for everything I've shipped: 21 apps across the web, macOS and iOS.

All of them are free, everywhere. No paid tier, no subscription, no trial that expires. Eleven of the twelve web apps don't ask for an account either.

![Switching the portal from its default light theme to dark and back](docs/demo.gif)

## What it is

A catalog site, not a product site. It has one job: let someone find the app that does the thing they need, and get out of the way. Each app gets its own page with what it does, where it runs, and a link straight to it.

| Platform | Apps |
|---|---|
| Web | 12 |
| macOS | 6 |
| iOS | 4 |

Those add to 22 because one app ships on both the web and the Mac. It has a single catalog entry; the second platform is *derived* from the presence of a Mac App Store link rather than typed twice.

## The one idea worth stealing

`lib/apps.ts` is the single source of truth, and nothing downstream is allowed to restate what it knows.

Counts, platform tags, the "newest app" callout, the sitemap, `llms.txt`, the structured data and the OG images are all computed from that one array. No page contains a hand-written number. This isn't tidiness — a count typed into a paragraph has nothing that fails when the data moves, so it quietly becomes a lie and stays one. The `llms.txt` file had already drifted three apps out of date before it was generated instead of written.

The same rule applies to platforms: `platformsOf()` derives the list, so an app cannot appear on the Mac page and be missing its Mac tag.

## Design

Light by default, with a dark toggle. Theme is set by an inline script before paint, so there is no flash of the wrong theme on load.

Contrast was **measured in the browser**, not calculated from hex values. That caught two genuine WCAG AA failures that arithmetic had passed — the tightest surface an element can land on is the one that decides, and for hover states that isn't the background you designed against.

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind v4 · lucide-react. Static export.

## Running it

```bash
npm install
npm run dev
```

`npm run build` also typechecks, and is the gate to use — `tsc --noEmit` hangs in this project.

## Checking the claims

```bash
npm run check:claims
```

This site describes twenty-one apps it does not build, and nothing tells it when
one of them grows. A number written here is true the day it is written and
quietly stops being true afterwards — QR Studio was sold as "21 QR types" after
it had 22, and WeatherWatch as fourteen languages after it answered in nineteen.
Neither a type nor a test could see it, because the only authority is the app.

So this fetches each app and compares what it says about itself against what
`lib/apps.ts` says about it. Both numbers are extracted; neither is written down
twice. It reports four kinds of problem:

| | |
|---|---|
| `STALE` | the app moved and this repository did not |
| `BROKEN` | this repository's own copy gives two numbers for one claim |
| `NO-MATCH` / `AMBIGUOUS` | the pattern needs attention, not the number |
| `UNREACHABLE` | a network result, not a claim result |

**It is deliberately not part of the build.** It needs the network and depends on
twenty-one sites this repository does not control; a deploy failing because one
of them was briefly down would be worse than the problem it catches. Run it
before a release. `npm run check:claims:strict` also fails on an unreachable
site, for a scheduled run where silence should not read as success.

Adding an app with a number in its copy means adding a claim for it. The list is
at the top of `scripts/check-claims.mjs`, and numbers that were considered and
found unpinnable are recorded there too, with the reason.

## Licence

No licence is granted. The source is public to read, not to redistribute.
