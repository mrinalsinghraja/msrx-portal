import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { apps, webApps } from "@/lib/apps";
import { breadcrumbJsonLd, JsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Why MSRX",
  description:
    "How MSRX apps are built: no accounts on the web apps, processing on your device wherever it can be, and one clear job per app.",
  alternates: { canonical: "/why-msrx" },
  openGraph: {
    title: "Why MSRX",
    description:
      "No accounts, on-device processing, one job per app. How and why MSRX apps are built the way they are.",
    url: "/why-msrx",
    type: "website",
  },
};

const trail = [
  { name: "MSRX", path: "/" },
  { name: "Why MSRX", path: "/why-msrx" },
];

const PRINCIPLES = [
  {
    heading: "You should not have to sign up to try something",
    body: [
      `All ${webApps.length} MSRX web apps open and work immediately. There is no email gate, no password, no trial clock. If a tool can do its job without knowing who you are, it should not ask.`,
      "This is a real constraint, not a marketing line. It rules out server-side history, cross-device sync and personalised state for most of the catalog — and the apps are designed around that rather than in spite of it.",
    ],
  },
  {
    heading: "Work should stay on the machine that made it",
    body: [
      "Wherever the job can be done in your browser or on your device, it is. IncognitoCV analyses a CV without keeping it. MSRX Meeting carries media peer-to-peer and records only to your own disk. The Mac and iPhone apps run their AI on-device.",
      "Where an app genuinely needs to sync — MSRX Planner, so your timetable survives switching from laptop to phone — it syncs the work you created and nothing else.",
    ],
  },
  {
    heading: "One app, one job",
    body: [
      "Nothing here is a suite. A Gantt chart maker makes Gantt charts. A QR studio makes QR codes. Keeping the scope narrow is why each one can be finished rather than perpetually half-built, and why you can learn any of them in a minute.",
      "It is also why there are twenty of them. Each new problem got its own app instead of another tab inside an existing one.",
    ],
  },
  {
    heading: "Free, and honest about what that means",
    body: [
      "The web apps cost nothing and carry no ads. They are not free-with-an-asterisk: there is no upgrade prompt, no locked export, no watermark on the way out.",
      "The macOS and iPhone apps are distributed through Apple, and their pricing is whatever the App Store listing says. This site does not restate it, because App Store pricing changes and a stale figure here would be worse than none.",
    ],
  },
];

export default function WhyMsrx() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />

      <div className="border-b border-[var(--border)]" style={{ background: "var(--stage)" }}>
        <div className="max-w-4xl mx-auto px-5 sm:px-6 pt-8 pb-16 sm:pb-20">
          <Breadcrumbs trail={trail} tone="stage" />
          <h1
            className="display text-[clamp(34px,5.6vw,58px)] mb-6"
            style={{ color: "var(--stage-text-primary)" }}
          >
            Twenty apps, four rules.
          </h1>
          <p
            className="text-[18px] leading-relaxed max-w-2xl"
            style={{ color: "var(--stage-text-secondary)" }}
          >
            MSRX is one person building software. That shapes everything about how these
            apps work — what they ask of you, where your data goes, and why each one is
            deliberately small.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-5 sm:px-6 py-14 sm:py-20">
        <div className="space-y-14 sm:space-y-20">
          {PRINCIPLES.map((principle, i) => (
            <section key={principle.heading} className="grid sm:grid-cols-[3rem_1fr] gap-4 sm:gap-8">
              <p className="mono text-[13px] text-[var(--text-tertiary)] pt-1.5" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </p>
              <div>
                <h2 className="display-sm text-[clamp(22px,3vw,28px)] text-[var(--text-primary)] mb-4">
                  {principle.heading}
                </h2>
                {principle.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-[16px] leading-relaxed text-[var(--text-secondary)] mb-4 last:mb-0"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="rule-fade my-14 sm:my-20" />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h2 className="display-sm text-[22px] text-[var(--text-primary)] mb-2">
              See what that produced
            </h2>
            <p className="text-[15px] text-[var(--text-secondary)]">
              {apps.length} apps across web, macOS and iPhone.
            </p>
          </div>
          <Link
            href="/apps"
            className="msrx-gradient inline-flex shrink-0 items-center gap-2 rounded-2xl px-6 py-3 text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
          >
            Browse all apps
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </>
  );
}
