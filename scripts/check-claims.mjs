#!/usr/bin/env node
/**
 * The stale-claim check.
 *
 * This portal describes twenty-one apps it does not build. Every one of them
 * keeps shipping, and nothing tells this repository when one of them grows —
 * so a number written here is correct on the day it is written and slowly stops
 * being true afterwards. That has now happened three times: the feature line
 * still said "Calculators and generators — EMI, GST, SIP" after those three
 * moved category, QR Studio was sold as "21 QR types" once it had 22, and
 * WeatherWatch was sold as fourteen languages once it answered in nineteen.
 *
 * None of those were caught by a build, a type or a test, because none of them
 * are wrong in a way this repository can see on its own. The only authority is
 * the live app. So this fetches each app and compares what it says about itself
 * against what `lib/apps.ts` says about it.
 *
 *     npm run check:claims
 *
 * ## This is deliberately NOT wired into the build
 *
 * It needs the network and it depends on twenty-one sites this repository does
 * not control. A deploy that fails because someone's wifi dropped, or because
 * an unrelated app was briefly 502, would be a worse problem than the one this
 * catches. Run it before a release, or on a schedule. Never in `prebuild`.
 *
 * ## How a claim is written
 *
 * Both sides are extracted, neither is typed in twice. `portal` is matched
 * against `lib/apps.ts` and `live` against the fetched page, and the two
 * captured numbers are compared. Writing the expected number here as a literal
 * would just create a fourth place to go stale.
 *
 * Patterns are matched against the raw HTML *and* the tag-stripped text,
 * because an app's most carefully maintained claim about itself is usually its
 * meta description, which lives in an attribute.
 *
 * Every match is collected rather than just the first. A loose pattern is the
 * real hazard here — "(\d+) tools" finds 211, 19 and 15 on the tools site, all
 * true and only one of them the total — so a pattern that finds several
 * different numbers is reported as ambiguous instead of quietly picking one.
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

// `.pathname` would percent-encode a space in a parent directory name and
// every path built from it would then miss.
const ROOT = fileURLToPath(new URL("..", import.meta.url));
const APPS = readFileSync(join(ROOT, "lib/apps.ts"), "utf8");

/**
 * One app's entry in `lib/apps.ts`, so a claim's pattern can be broad enough to
 * catch every phrasing of the number without matching a different app that
 * happens to use the same word. A tagline, a description and a feature bullet
 * commonly state the same count three ways, and mutation testing this check
 * found that a narrowly anchored pattern silently skipped one of the three.
 *
 * `null` for a claim that lives in a module constant rather than an entry.
 */
function entryFor(slug) {
  if (!slug) return APPS;
  const start = APPS.indexOf(`slug: "${slug}"`);
  if (start === -1) throw new Error(`no entry with slug "${slug}" in lib/apps.ts`);
  const next = APPS.indexOf('\n    slug: "', start + 1);
  return APPS.slice(start, next === -1 ? APPS.length : next);
}

const strict = process.argv.includes("--strict");
const TIMEOUT_MS = 20000;

/* ------------------------------------------------------------------ */
/* The claims                                                           */
/* ------------------------------------------------------------------ */

/**
 * Each entry names one number this portal asserts about somebody else's app.
 *
 * `why` is not decoration: when this fails a year from now, the person reading
 * it needs to know whether the portal drifted or the pattern did.
 */
const CLAIMS = [
  {
    app: "MSRX Tools",
    what: "tools",
    slug: null,
    portal: /TOOLS_APP_COUNT = (\d+)/,
    url: "https://tools.msrx.co.in/",
    live: /(\d+) tools · free/,
    why: "The site prints its own total in the strip under the masthead.",
  },
  {
    app: "MSRX Tools",
    what: "groups",
    slug: null,
    portal: /TOOLS_GROUP_COUNT = (\d+)/,
    url: "https://tools.msrx.co.in/sitemap.xml",
    // Counted rather than matched: the site lists its categories but never
    // states how many there are, and every tool lives at /<category>/<tool>,
    // so the distinct first segments ARE the groups. Matching a phrase would
    // also mean trusting prose that has been wrong before — "seven groups" sat
    // in this repository's own copy through two new categories.
    live: (text) => {
      const segments = new Set();
      for (const m of text.matchAll(/<loc>https:\/\/tools\.msrx\.co\.in\/([a-z-]+)\/[a-z0-9-]+<\/loc>/g)) {
        segments.add(m[1]);
      }
      return segments.size;
    },
    why: "Distinct first path segments across every two-segment tool URL in the sitemap.",
  },
  {
    app: "MSRX QR Studio",
    what: "QR types",
    slug: "qr-studio",
    portal: /(\d+) QR (?:code )?types/,
    url: "https://qr.msrx.co.in/",
    live: /(\d+) types including/,
    why: "Stated in the app's own meta description.",
  },
  {
    app: "MSRX QR Studio",
    what: "frames",
    slug: "qr-studio",
    portal: /(\d+) frames/,
    url: "https://qr.msrx.co.in/",
    live: /(\d+) frames/,
    why: "Stated in the app's own meta description.",
  },
  {
    app: "MSRX QR Studio",
    what: "templates",
    slug: "qr-studio",
    portal: /(\d+) editable templates/,
    url: "https://qr.msrx.co.in/",
    live: /(\d+) templates/,
    why: "Stated on the app's home page.",
  },
  {
    app: "MSRX WeatherWatch",
    what: "languages",
    slug: "weatherwatch",
    portal: /(\d+) languages/,
    url: "https://weather.msrx.co.in/",
    live: /(\d+) languages/,
    why: "Stated in the app's hero, beside the module and engine counts.",
  },
  {
    app: "MSRX WeatherWatch",
    what: "hazard engines",
    slug: "weatherwatch",
    portal: /(\d+) hazard engines/,
    url: "https://weather.msrx.co.in/",
    live: /(\d+) live hazard engines/,
    why: "Stated in the app's hero.",
  },
  {
    app: "MSRX StoryQuest",
    what: "missions",
    slug: "storyquest",
    portal: /(\d+) (?:STEM )?missions/,
    url: "https://story.msrx.co.in/",
    live: /(\d+) live/,
    why: "The app's header counter. Its per-subject figures sum to the same total.",
  },
  {
    app: "OrionPulseNet",
    what: "diagnostics",
    slug: "pulsenet",
    portal: /(\d+) diagnostics/,
    url: "https://pulsenet.msrx.co.in/tools",
    live: /(\d+) tools/,
    why: "The app calls them tools on its own page; this portal calls them diagnostics.",
  },
  {
    app: "JEE HyperLab",
    what: "simulations",
    slug: "jee-hyperlab",
    portal: /(\d+) interactive PCM simulations/,
    url: "https://lab.msrx.co.in/",
    live: /(\d+) interactive simulations/,
    why: "Stated in the app's FAQ schema and its key-features list.",
  },
];

/**
 * Numbers that were considered and deliberately left unchecked, recorded so the
 * next person does not spend an afternoon rediscovering why.
 */
const UNVERIFIABLE = [
  // JEE HyperLab used to live here: it only ever said "200+", with one FAQ
  // answer still saying "more than 100", so there was nothing exact to compare
  // against. The lab now derives its count from its own engine registry and
  // states 204 outright, which is what made the claim checkable.
];

/* ------------------------------------------------------------------ */
/* Running them                                                         */
/* ------------------------------------------------------------------ */

/** Tags stripped, but the raw kept too — meta descriptions live in attributes. */
function haystack(html) {
  const text = html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ");
  return `${html}\n${text}`;
}

/** Every distinct number a pattern finds, so an ambiguous one cannot hide. */
function findAll(pattern, text) {
  const global = new RegExp(pattern.source, `${pattern.flags.replace("g", "")}g`);
  const found = new Set();
  for (const m of text.matchAll(global)) {
    if (m[1] !== undefined) found.add(Number(m[1]));
  }
  return [...found];
}

async function fetchText(url) {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(TIMEOUT_MS),
    headers: { "user-agent": "msrx-portal-claim-check" },
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.text();
}

const pages = new Map();
async function pageFor(url) {
  if (!pages.has(url)) pages.set(url, fetchText(url));
  return pages.get(url);
}

const results = [];

for (const claim of CLAIMS) {
  const name = `${claim.app} — ${claim.what}`;

  let scope;
  try {
    scope = entryFor(claim.slug);
  } catch (error) {
    results.push({ state: "BROKEN", name, detail: error.message });
    continue;
  }

  const claimed = findAll(claim.portal, scope);
  if (claimed.length === 0) {
    results.push({ state: "BROKEN", name, detail: `no number in the ${claim.slug ?? "module"} entry matches ${claim.portal}` });
    continue;
  }
  if (claimed.length > 1) {
    results.push({ state: "BROKEN", name, detail: `this portal gives ${claimed.join(" and ")} for the same claim — its own copy disagrees with itself` });
    continue;
  }

  let html;
  try {
    html = await pageFor(claim.url);
  } catch (error) {
    results.push({ state: "UNREACHABLE", name, detail: `${claim.url}: ${error.message}` });
    continue;
  }

  const text = haystack(html);
  let actual;
  try {
    actual = typeof claim.live === "function" ? [claim.live(text)] : findAll(claim.live, text);
  } catch (error) {
    results.push({ state: "BROKEN", name, detail: `reading the live page failed: ${error.message}` });
    continue;
  }

  if (actual.length === 0) {
    // The pattern stopped matching. That is usually a redesign, not a wrong
    // number, and saying so is more useful than reporting a mismatch.
    results.push({ state: "NO-MATCH", name, detail: `nothing on ${claim.url} matches ${claim.live}. ${claim.why}` });
    continue;
  }
  if (actual.length > 1) {
    results.push({ state: "AMBIGUOUS", name, detail: `${claim.url} gives ${actual.join(", ")} — tighten the pattern before trusting any of them` });
    continue;
  }

  if (actual[0] === claimed[0]) {
    results.push({ state: "OK", name, detail: `${claimed[0]}` });
  } else {
    results.push({
      state: "STALE",
      name,
      detail: `this portal says ${claimed[0]}, ${claim.url} says ${actual[0]}`,
    });
  }
}

/* ------------------------------------------------------------------ */
/* Reporting                                                            */
/* ------------------------------------------------------------------ */

const width = Math.max(...results.map((r) => r.name.length));
const order = { STALE: 0, BROKEN: 1, AMBIGUOUS: 2, "NO-MATCH": 3, UNREACHABLE: 4, OK: 5 };
results.sort((a, b) => order[a.state] - order[b.state] || a.name.localeCompare(b.name));

for (const r of results) {
  console.log(`${r.state.padEnd(11)} ${r.name.padEnd(width)}  ${r.detail}`);
}

if (UNVERIFIABLE.length) {
  console.log("\nNot checked, on purpose:");
  for (const u of UNVERIFIABLE) console.log(`  ${u.app} — ${u.what}: ${u.why}`);
}

const stale = results.filter((r) => r.state === "STALE");
const broken = results.filter((r) => ["BROKEN", "AMBIGUOUS", "NO-MATCH"].includes(r.state));
const unreachable = results.filter((r) => r.state === "UNREACHABLE");

console.log("");
if (stale.length) {
  console.log(`${stale.length} claim${stale.length > 1 ? "s have" : " has"} gone stale. Update lib/apps.ts to match the app.`);
} else if (!broken.length && !unreachable.length) {
  console.log(`All ${results.length} claims still match the apps they describe.`);
}

if (broken.length) {
  console.log(`${broken.length} check${broken.length > 1 ? "es" : ""} could not be read — the pattern needs attention, not the number.`);
}
if (unreachable.length) {
  console.log(`${unreachable.length} site${unreachable.length > 1 ? "s were" : " was"} unreachable. That is a network result, not a claim result${strict ? " — failing anyway because --strict" : ""}.`);
}

// A site being down is not a stale claim, so it does not fail the run unless
// asked. Everything else here is a real finding.
const failed = stale.length + broken.length + (strict ? unreachable.length : 0);
process.exit(failed > 0 ? 1 : 0);
