import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { apps, platformTag } from "@/lib/apps";

// A 404 on a portal is almost always someone looking for a specific app, so the
// page offers the catalog rather than an apology and a back button.
const SUGGESTIONS = apps.slice(0, 6);

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-6 py-20 sm:py-28">
      <p className="mono text-[13px] tracking-[0.18em] text-[var(--text-tertiary)] mb-6">
        404
      </p>
      <h1 className="display text-[clamp(32px,5.2vw,52px)] text-[var(--text-primary)] mb-5">
        That page is not here.
      </h1>
      <p className="text-[17px] leading-relaxed text-[var(--text-secondary)] mb-10 max-w-xl">
        The link may be out of date, or the page may have moved. Everything MSRX makes is
        one click away below.
      </p>

      <div className="flex flex-wrap gap-3 mb-14">
        <Link
          href="/apps"
          className="msrx-gradient inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
        >
          Browse all apps
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-2xl border border-[var(--border-strong)] px-6 py-3 text-[15px] font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--text-tertiary)]"
        >
          Home
        </Link>
      </div>

      <h2 className="eyebrow text-[var(--text-tertiary)] mb-5">Popular</h2>
      <ul className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
        {SUGGESTIONS.map((app) => (
          <li key={app.slug}>
            <Link
              href={`/apps/${app.slug}`}
              className="group flex items-center gap-4 py-3.5"
              style={{ "--accent": app.accent } as React.CSSProperties}
            >
              <span
                className="tint-chip accent-text mono grid h-9 w-9 shrink-0 place-items-center rounded-[10px] text-[12px] font-medium"
                aria-hidden="true"
              >
                {app.initials}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-medium text-[var(--text-primary)]">
                  {app.name}
                </span>
                <span className="block truncate text-[13px] text-[var(--text-secondary)]">
                  {app.tagline}
                </span>
              </span>
              <span className="mono shrink-0 text-[10px] tracking-[0.12em] text-[var(--text-tertiary)]">
                {platformTag(app)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
