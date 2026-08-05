import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, ArrowRight } from "lucide-react";
import {
  apps,
  getApp,
  relatedApps,
  platformLabel,
  platformTag,
  isDualPlatform,
} from "@/lib/apps";
import {
  breadcrumbJsonLd,
  softwareAppJsonLd,
  JsonLd,
  abs,
  metaDescription,
} from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";

// All twenty apps are known at build time, so every page is static HTML.
export function generateStaticParams() {
  return apps.map((app) => ({ slug: app.slug }));
}

// A request for a slug outside the catalog is a 404, not a rendered page.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) return {};

  const title = `${app.name} — ${app.tagline}`;
  const path = `/apps/${app.slug}`;
  const description = metaDescription(app.description);

  return {
    title: `${app.name}: ${app.tagline}`,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: abs(path),
      siteName: "MSRX",
      type: "website",
      images: [{ url: `${path}/opengraph-image`, width: 1200, height: 630, alt: app.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: `${path}/opengraph-image`, alt: app.name }],
    },
  };
}

export default async function AppPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) notFound();

  const trail = [
    { name: "MSRX", path: "/" },
    { name: "Apps", path: "/apps" },
    { name: app.name, path: `/apps/${app.slug}` },
  ];
  const related = relatedApps(app);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <JsonLd
        data={{ "@context": "https://schema.org", ...softwareAppJsonLd(app) }}
      />

      {/* ── Header ──────────────────────────────────────────────────────────*/}
      <div
        className="tint-surface border-b border-[var(--border)]"
        style={{ "--accent": app.accent } as React.CSSProperties}
      >
        <div className="max-w-4xl mx-auto px-5 sm:px-6 pt-8 pb-14 sm:pb-16">
          <Breadcrumbs trail={trail} />

          <div className="flex items-center gap-4 mb-7">
            {app.iconSrc ? (
              <img
                src={app.iconSrc}
                alt=""
                width={56}
                height={56}
                className="w-14 h-14 shrink-0 rounded-2xl"
                aria-hidden="true"
              />
            ) : (
              <span
                className="accent-text mono w-14 h-14 shrink-0 rounded-2xl grid place-items-center text-[17px] font-medium bg-[var(--card)]"
                aria-hidden="true"
              >
                {app.initials}
              </span>
            )}
            <div className="flex flex-wrap items-center gap-2">
              <span className="accent-text mono text-[10.5px] tracking-[0.14em] px-2.5 py-1 rounded-full bg-[var(--card)]">
                {platformTag(app)}
              </span>
              <span className="mono text-[10.5px] tracking-[0.14em] px-2.5 py-1 rounded-full bg-[var(--card)] text-[var(--text-secondary)]">
                {app.category.toUpperCase()}
              </span>
            </div>
          </div>

          <h1 className="display text-[clamp(32px,5.6vw,54px)] text-[var(--text-primary)] mb-4">
            {app.name}
          </h1>
          <p className="display-sm text-[clamp(18px,2.6vw,24px)] text-[var(--text-secondary)] max-w-2xl mb-8">
            {app.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={app.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: app.accent }}
            >
              {app.actionLabel}
              <ArrowUpRight size={16} aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>

            {app.macAppStoreHref && (
              <a
                href={app.macAppStoreHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-[var(--border-strong)] bg-[var(--card)] px-6 py-3 text-[15px] font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--text-tertiary)]"
              >
                Mac App Store
                <ArrowUpRight size={16} aria-hidden="true" className="opacity-50" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ── Body ────────────────────────────────────────────────────────────*/}
      <div
        className="max-w-4xl mx-auto px-5 sm:px-6 py-14 sm:py-20"
        style={{ "--accent": app.accent } as React.CSSProperties}
      >
        <div className="grid lg:grid-cols-[1fr_minmax(0,15rem)] gap-12 lg:gap-16">
          <div>
            <h2 className="eyebrow text-[var(--text-tertiary)] mb-4">Overview</h2>
            <p className="text-[17px] leading-relaxed text-[var(--text-secondary)] mb-12">
              {app.description}
            </p>

            <h2 className="display-sm text-[22px] text-[var(--text-primary)] mb-5">
              What it does
            </h2>
            <ul className="space-y-3 mb-12">
              {app.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check
                    size={16}
                    aria-hidden="true"
                    className="accent-text mt-1 shrink-0"
                  />
                  <span className="text-[15.5px] leading-relaxed text-[var(--text-secondary)]">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {app.tools && (
              <>
                <h2 className="display-sm text-[22px] text-[var(--text-primary)] mb-5">
                  Jump straight in
                </h2>
                <div className="flex flex-wrap gap-2">
                  {app.tools.map((tool) => (
                    <a
                      key={`${tool.label}-${tool.href}`}
                      href={tool.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tint-surface inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] px-3.5 py-1.5 text-[13px] font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] hover:border-[var(--text-tertiary)]"
                    >
                      {tool.label}
                      <ArrowUpRight size={12} aria-hidden="true" className="opacity-50" />
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Facts */}
          <aside>
            <h2 className="eyebrow text-[var(--text-tertiary)] mb-4">Details</h2>
            <dl className="text-[14px] divide-y divide-[var(--border)] border-y border-[var(--border)]">
              {[
                { k: "Platform", v: platformLabel(app) },
                { k: "Category", v: app.category },
                // Every app is free — verified against the App Store listings,
                // which all report a price of 0, not assumed from the web side.
                { k: "Price", v: "Free" },
                {
                  k: "Account",
                  v: isDualPlatform(app)
                    ? "None on the web; Apple ID to install"
                    : app.platform === "web"
                      ? app.slug === "planner"
                        ? "Free account, to sync devices"
                        : "Not required"
                      : "Apple ID, to install",
                },
              ].map((row) => (
                <div key={row.k} className="flex justify-between gap-4 py-3">
                  <dt className="text-[var(--text-tertiary)]">{row.k}</dt>
                  <dd className="text-[var(--text-primary)] text-right font-medium">
                    {row.v}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>

      {/* ── Related ─────────────────────────────────────────────────────────*/}
      {related.length > 0 && (
        <section className="border-t border-[var(--border)] bg-[var(--paper-tint)]">
          <div className="max-w-4xl mx-auto px-5 sm:px-6 py-14 sm:py-16">
            <h2 className="display-sm text-[22px] text-[var(--text-primary)] mb-7">
              Also from MSRX
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map((other) => (
                <Link
                  key={other.slug}
                  href={`/apps/${other.slug}`}
                  className="card-hover group rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5"
                  style={{ "--accent": other.accent } as React.CSSProperties}
                >
                  <span
                    className="tint-chip accent-text mono mb-3 grid h-9 w-9 place-items-center rounded-[10px] text-[12px] font-medium"
                    aria-hidden="true"
                  >
                    {other.initials}
                  </span>
                  <h3 className="display-sm text-[15.5px] text-[var(--text-primary)] mb-1.5">
                    {other.name}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-[var(--text-secondary)]">
                    {other.tagline}
                  </p>
                </Link>
              ))}
            </div>

            <Link
              href="/apps"
              className="mt-8 inline-flex items-center gap-1.5 text-[14px] font-medium text-[var(--violet-deep)] hover:underline underline-offset-4"
            >
              See all twenty apps
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
