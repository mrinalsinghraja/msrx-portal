import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { apps, webApps, macApps, iosApps, platformTag, type App } from "@/lib/apps";
import { appListJsonLd, breadcrumbJsonLd, JsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";

// Counts come from the catalog, not from prose — they were hand-written once and
// went stale. The three groups overlap where an app ships on two platforms, so
// `apps.length` is the only honest total.
const COUNTS = `${webApps.length} free web apps, ${macApps.length} macOS apps and ${iosApps.length} iPhone apps`;

export const metadata: Metadata = {
  title: "All apps",
  description: `Every app MSRX makes — ${apps.length} in total: ${COUNTS}, covering study, data visualisation, design, weather, networking and everyday utilities.`,
  alternates: { canonical: "/apps" },
  openGraph: {
    title: "All MSRX apps",
    description: `${COUNTS} — study, data, design, weather, network and utilities.`,
    url: "/apps",
    type: "website",
  },
};

const trail = [
  { name: "MSRX", path: "/" },
  { name: "Apps", path: "/apps" },
];

const SECTIONS = [
  {
    id: "web",
    heading: "Web",
    note: "All free. Open in any browser on any device; only Planner asks for an account.",
    list: webApps,
  },
  {
    id: "macos",
    heading: "macOS",
    note: "Native Mac apps, free on the Mac App Store. One also ships on the web.",
    list: macApps,
  },
  {
    id: "ios",
    heading: "iPhone & iPad",
    note: "Native iPhone apps, free on the App Store.",
    list: iosApps,
  },
];

function Row({ app }: { app: App }) {
  return (
    <Link
      href={`/apps/${app.slug}`}
      className="card-hover group flex items-start gap-4 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5"
      style={{ boxShadow: "var(--shadow-card)", "--accent": app.accent } as React.CSSProperties}
    >
      <span
        className="tint-chip accent-text mono grid h-11 w-11 shrink-0 place-items-center rounded-xl text-[13px] font-medium"
        aria-hidden="true"
      >
        {app.initials}
      </span>
      <span className="min-w-0 flex-1">
        <span className="mb-1 flex items-center gap-2">
          <span className="display-sm truncate text-[16px] text-[var(--text-primary)]">
            {app.name}
          </span>
          <span className="mono shrink-0 text-[10px] tracking-[0.12em] text-[var(--text-tertiary)]">
            {platformTag(app)}
          </span>
        </span>
        <span className="block text-[13.5px] leading-relaxed text-[var(--text-secondary)]">
          {app.tagline}
        </span>
      </span>
      <ArrowRight
        size={15}
        aria-hidden="true"
        className="mt-1 shrink-0 text-[var(--text-tertiary)] transition-transform duration-200 group-hover:translate-x-0.5"
      />
    </Link>
  );
}

export default function AppsIndex() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <JsonLd data={appListJsonLd()} />

      <div className="border-b border-[var(--border)] bg-[var(--paper-tint)]">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 pt-8 pb-14 sm:pb-16">
          <Breadcrumbs trail={trail} />
          <h1 className="display text-[clamp(34px,5.6vw,56px)] text-[var(--text-primary)] mb-5">
            All twenty apps.
          </h1>
          <p className="text-[17px] leading-relaxed text-[var(--text-secondary)] max-w-2xl mb-8">
            Eleven web apps that need no account, six Mac apps and four for iPhone.
            That is twenty-one entries for twenty apps — OrionPulseNet appears twice,
            because it ships on both. Each one does a single job.
          </p>

          {/* Jump links rather than a JS filter — the sections stay in the HTML,
              so everything is crawlable and works without scripts. */}
          <nav aria-label="Jump to platform" className="flex flex-wrap gap-2">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-full border border-[var(--border-strong)] bg-[var(--card)] px-4 py-1.5 text-[13.5px] font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
              >
                {s.heading}
                <span className="mono ml-2 text-[11px] text-[var(--text-tertiary)]">
                  {s.list.length}
                </span>
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 sm:px-6 py-14 sm:py-20 space-y-14 sm:space-y-20">
        {SECTIONS.map((section) => (
          <section key={section.id} id={section.id} aria-labelledby={`${section.id}-h`}>
            <div className="mb-6 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1.5">
              <h2
                id={`${section.id}-h`}
                className="display-sm text-[24px] text-[var(--text-primary)]"
              >
                {section.heading}
              </h2>
              <p className="text-[14px] text-[var(--text-secondary)]">{section.note}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {section.list.map((app) => (
                <Row key={app.slug} app={app} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
