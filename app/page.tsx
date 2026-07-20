import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { apps, platformTag, type Category, type App } from "@/lib/apps";
import { appListJsonLd, faqJsonLd, JsonLd, CONTACT_EMAIL } from "@/lib/seo";
import { MsrxLogo } from "@/components/MsrxLogo";

// ── FAQ ───────────────────────────────────────────────────────────────────────
// Every answer here is verifiable from the apps themselves. This block is the
// source for both the visible FAQ and the FAQPage schema.
const faqs = [
  {
    q: "What is MSRX?",
    a: "MSRX is a software studio run by Mrinal Singh Raja. It builds 20 apps across three platforms: web apps that run in any browser, native macOS apps, and native iPhone and iPad apps. They span study tools, data visualisation, design, weather, networking and everyday utilities. The tagline is “Future. Intelligence. Impact.”",
  },
  {
    q: "Are MSRX apps free?",
    a: "Yes — all 20, everywhere in the world. There is no paid tier, no subscription, no trial that expires and nothing to upgrade to. The 11 web apps open in a browser and 10 of those need no account at all; the macOS and iPhone apps are free downloads on the Apple App Store.",
  },
  {
    q: "Do MSRX apps store my data?",
    a: "Most MSRX apps run entirely on your device and store nothing on MSRX servers. IncognitoCV never keeps an uploaded CV, MSRX Meeting records locally and only in your browser, and the macOS and iPhone apps process on-device. Where an app does sync — MSRX Planner, for instance — it syncs only the work you create. MSRX does not sell data.",
  },
  {
    q: "Which apps are useful for students?",
    a: "Four. MSRX Planner is an academic workspace with a weekly planner, notes, flashcards and study groups. JEE HyperLab has 204 interactive Physics, Chemistry and Maths simulations for IIT-JEE. MSRX StoryQuest has 202 STEM missions for classes 1 to 10. MSRX GraphIQ turns data into charts for projects and lab reports.",
  },
  {
    q: "Do I need to install anything?",
    a: "Not for the web apps — they run in any modern browser on phone, tablet or desktop, with no install and, for all but MSRX Planner, no account. The macOS and iPhone apps install free from the Apple App Store.",
  },
  {
    q: "How do I suggest an app or report a problem?",
    a: `Email ${CONTACT_EMAIL}. Bug reports, feature requests and ideas for apps that do not exist yet are all welcome.`,
  },
];

// ── Browse-by-need groupings ──────────────────────────────────────────────────
// The index above is ordered by platform. This section offers the other axis —
// what you actually came to do — so neither view is redundant.
// Groups list their categories explicitly, and between them they must cover
// every category in the catalog — otherwise an app silently vanishes from this
// section. The assertion below enforces that at build time.
const GROUPS: { categories: Category[]; heading: string; blurb: string }[] = [
  {
    categories: ["Study"],
    heading: "Study",
    blurb: "Plan a term, drill a topic, or watch an equation move.",
  },
  {
    categories: ["Creative"],
    heading: "Create",
    blurb: "Charts, diagrams, drawings and codes that have to look right.",
  },
  {
    categories: ["Productivity"],
    heading: "Work",
    blurb: "Meetings, timelines and the CV you are about to send.",
  },
  {
    categories: ["Utilities", "Security"],
    heading: "Everyday",
    blurb: "The small tools you reach for and then forget about.",
  },
];

const GROUPED = new Set(GROUPS.flatMap((g) => g.categories));
const ungrouped = apps.filter((a) => !GROUPED.has(a.category));
if (ungrouped.length > 0) {
  throw new Error(
    `Homepage groups miss ${ungrouped.length} app(s): ${ungrouped
      .map((a) => `${a.name} (${a.category})`)
      .join(", ")}`
  );
}

function AppTile({ app }: { app: App }) {
  return (
    <Link
      href={`/apps/${app.slug}`}
      className="card-hover group flex flex-col rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5"
      style={{ boxShadow: "var(--shadow-card)", "--accent": app.accent } as React.CSSProperties}
    >
      <div className="flex items-center gap-3 mb-3">
        <span
          className="tint-chip accent-text mono w-9 h-9 shrink-0 rounded-[10px] grid place-items-center text-[12px] font-medium"
          aria-hidden="true"
        >
          {app.initials}
        </span>
        <span className="mono text-[10px] tracking-[0.14em] text-[var(--text-tertiary)]">
          {platformTag(app)}
        </span>
      </div>
      <h3 className="display-sm text-[16px] text-[var(--text-primary)] mb-1.5">{app.name}</h3>
      <p className="text-[13.5px] leading-relaxed text-[var(--text-secondary)] flex-1">
        {app.tagline}
      </p>
      <span className="accent-text mt-4 inline-flex items-center gap-1 text-[13px] font-medium">
        Learn more
        <ArrowRight
          size={13}
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </span>
    </Link>
  );
}

export default function Home() {
  return (
    <>
      <JsonLd data={appListJsonLd()} />
      <JsonLd data={faqJsonLd(faqs)} />

      {/* ── Hero: the index ─────────────────────────────────────────────────
          The catalog is the hero. For a portal, breadth is the argument, so
          showing all twenty apps in the first screen beats describing them. */}
      <section
        className="relative"
        style={{ background: "var(--stage)", color: "var(--stage-text-primary)" }}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-6 pt-16 pb-14 sm:pt-24 sm:pb-20">
          <div className="grid lg:grid-cols-[1.45fr_1fr] gap-10 lg:gap-14 items-end mb-14 sm:mb-20">
            <div>
              <p className="eyebrow mb-6" style={{ color: "var(--stage-text-tertiary)" }}>
                Future. Intelligence. Impact.
              </p>
              <h1 className="display text-[clamp(38px,5.6vw,66px)] text-balance mb-6">
                Twenty apps.
                <br />
                <span className="msrx-gradient-text">Open one and start.</span>
              </h1>
              <p
                className="text-[17px] sm:text-[18px] leading-relaxed max-w-lg"
                style={{ color: "var(--stage-text-secondary)" }}
              >
                MSRX builds tools for the web, Mac and iPhone. Every one is free,
                everywhere — most need no sign-up, and they keep your work on your
                device.
              </p>
            </div>

            <div className="flex lg:justify-end">
              <dl className="grid grid-cols-3 gap-6 sm:gap-10 w-full lg:w-auto">
                {[
                  { n: "20", l: "Apps" },
                  { n: "3", l: "Platforms" },
                  { n: "20", l: "Free, no exceptions" },
                ].map((stat) => (
                  <div key={stat.l}>
                    <dt className="sr-only">{stat.l}</dt>
                    <dd>
                      <span className="display block text-[34px] sm:text-[40px] msrx-gradient-text">
                        {stat.n}
                      </span>
                      <span
                        className="mono text-[10.5px] tracking-[0.14em] uppercase"
                        style={{ color: "var(--stage-text-tertiary)" }}
                      >
                        {stat.l}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Index */}
          <div className="rule-fade-stage" />
          <div
            className="flex items-baseline justify-between py-4"
            aria-hidden="true"
          >
            <span
              className="mono text-[10.5px] tracking-[0.18em] uppercase"
              style={{ color: "var(--stage-text-tertiary)" }}
            >
              Index
            </span>
            <span
              className="mono text-[10.5px] tracking-[0.18em] uppercase"
              style={{ color: "var(--stage-text-tertiary)" }}
            >
              Platform
            </span>
          </div>
          <div className="rule-fade-stage" />

          <ul>
            {apps.map((app, i) => (
              <li key={app.slug}>
                <Link
                  href={`/apps/${app.slug}`}
                  className="index-row grid grid-cols-[2.25rem_1fr_auto] sm:grid-cols-[3rem_minmax(0,14rem)_1fr_4rem] items-center gap-x-3 sm:gap-x-5 py-3.5 px-2 -mx-2 rounded-lg border-b"
                  style={
                    {
                      borderColor: "var(--stage-line)",
                      "--row-accent": app.accent,
                    } as React.CSSProperties
                  }
                >
                  <span
                    className="mono text-[12px]"
                    style={{ color: "var(--stage-text-tertiary)" }}
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span
                    className="index-name display-sm text-[16px] sm:text-[18px] truncate"
                    style={{ color: "var(--stage-text-primary)" }}
                  >
                    {app.name}
                  </span>

                  <span
                    className="hidden sm:block text-[14px] truncate"
                    style={{ color: "var(--stage-text-secondary)" }}
                  >
                    {app.tagline}
                  </span>

                  <span className="flex items-center justify-end gap-2">
                    <span
                      className="mono text-[10.5px] tracking-[0.12em]"
                      style={{ color: "var(--stage-text-tertiary)" }}
                    >
                      {platformTag(app)}
                    </span>
                    <ArrowRight
                      size={14}
                      aria-hidden="true"
                      className="index-arrow hidden sm:block"
                      style={{ color: app.accent }}
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Browse by need ──────────────────────────────────────────────────*/}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 py-16 sm:py-24">
        <div className="max-w-2xl mb-12 sm:mb-16">
          <p className="eyebrow text-[var(--text-tertiary)] mb-4">By what you need</p>
          <h2 className="display text-[clamp(28px,4.4vw,44px)] text-[var(--text-primary)] mb-4">
            Start from the task, not the catalog.
          </h2>
          <p className="text-[16px] leading-relaxed text-[var(--text-secondary)]">
            The index above is ordered by platform. This is the other way in.
          </p>
        </div>

        <div className="space-y-14 sm:space-y-16">
          {GROUPS.map((group) => {
            const list = apps.filter((a) => group.categories.includes(a.category));
            return (
              <div key={group.heading}>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1.5 mb-6">
                  <h3 className="display-sm text-[22px] sm:text-[26px] text-[var(--text-primary)]">
                    {group.heading}
                  </h3>
                  <p className="text-[14px] text-[var(--text-secondary)]">{group.blurb}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {list.map((app) => (
                    <AppTile key={app.slug} app={app} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Position ────────────────────────────────────────────────────────*/}
      <section className="border-y border-[var(--border)] bg-[var(--paper-tint)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-16 sm:py-20">
          <div className="grid md:grid-cols-3 gap-10 md:gap-12">
            {[
              {
                h: "No account to open one",
                p: "Every web app runs the moment you land on it. No email, no password, no trial that expires. If an app can work without knowing who you are, it does.",
              },
              {
                h: "Your work stays yours",
                p: "Most apps process entirely on your device. IncognitoCV forgets your CV, MSRX Meeting records only to your own machine, and the Mac and iPhone apps run their AI on-device.",
              },
              {
                h: "Built to be finished",
                p: "Each app solves one thing and ships. Twenty of them exist because each was taken to the point of being genuinely usable, not left as a demo.",
              },
            ].map((item) => (
              <div key={item.h}>
                <h3 className="display-sm text-[19px] text-[var(--text-primary)] mb-3">
                  {item.h}
                </h3>
                <p className="text-[15px] leading-relaxed text-[var(--text-secondary)]">
                  {item.p}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/why-msrx"
              className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[var(--violet-deep)] hover:underline underline-offset-4"
            >
              More on how MSRX apps are built
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────────*/}
      <section
        aria-labelledby="faq-heading"
        className="max-w-6xl mx-auto px-5 sm:px-6 py-16 sm:py-24"
      >
        <div className="grid lg:grid-cols-[minmax(0,20rem)_1fr] gap-10 lg:gap-16">
          <div>
            <p className="eyebrow text-[var(--text-tertiary)] mb-4">Questions</p>
            <h2
              id="faq-heading"
              className="display text-[clamp(28px,4.4vw,40px)] text-[var(--text-primary)]"
            >
              Answers, before you ask.
            </h2>
          </div>

          <dl className="divide-y divide-[var(--border)] border-t border-[var(--border)]">
            {faqs.map((f) => (
              <div key={f.q} className="py-6">
                <dt className="display-sm text-[17px] text-[var(--text-primary)] mb-2">
                  {f.q}
                </dt>
                <dd className="text-[15px] leading-relaxed text-[var(--text-secondary)]">
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Idea CTA ────────────────────────────────────────────────────────*/}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 pb-16 sm:pb-24">
        <div
          className="stage-panel relative overflow-hidden rounded-[var(--radius-xl)] px-7 py-12 sm:px-14 sm:py-16"
          style={{ background: "var(--stage-raised)" }}
        >
          <div className="relative flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
            <MsrxLogo size={54} uid="cta" className="shrink-0" />
            <div className="flex-1">
              <h2
                className="display text-[clamp(24px,3.4vw,34px)] mb-3"
                style={{ color: "var(--stage-text-primary)" }}
              >
                Wishing an app existed?
              </h2>
              <p
                className="text-[16px] leading-relaxed max-w-xl"
                style={{ color: "var(--stage-text-secondary)" }}
              >
                Most of these started as something that was missing. If there is a tool
                you keep wanting and cannot find, describe it — the next one has to come
                from somewhere.
              </p>
            </div>
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=App%20idea%20for%20MSRX`}
              className="msrx-gradient inline-flex shrink-0 items-center gap-2 rounded-2xl px-7 py-3.5 text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
            >
              Send the idea
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
