import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { MsrxLogo } from "./MsrxLogo";
import { webApps, macApps, iosApps, type App } from "@/lib/apps";

const SOCIAL = [
  { href: "https://github.com/mrinalsinghraja", label: "GitHub" },
  { href: "https://www.linkedin.com/in/mrinalsinghraja/", label: "LinkedIn" },
  { href: "https://x.com/mrinalsinghraja", label: "X" },
  {
    href: "https://apps.apple.com/us/developer/mrinal-singh-raja/id1879524280",
    label: "App Store",
  },
];

function AppColumn({ heading, list }: { heading: string; list: App[] }) {
  return (
    <div>
      <h2 className="eyebrow text-[var(--text-tertiary)] mb-4">{heading}</h2>
      <ul className="space-y-2.5">
        {list.map((app) => (
          <li key={app.slug}>
            <Link
              href={`/apps/${app.slug}`}
              className="text-[13.5px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              {app.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--paper-tint)]">
      {/* Every app is one click from every page — the portal's whole job is
          routing people onward, and crawlers follow the same links. */}
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-6">
          <AppColumn heading="Web" list={webApps} />
          <AppColumn heading="macOS" list={macApps} />
          <AppColumn heading="iPhone & iPad" list={iosApps} />

          <div>
            <h2 className="eyebrow text-[var(--text-tertiary)] mb-4">Site</h2>
            <ul className="space-y-2.5">
              {[
                { href: "/apps", label: "All apps" },
                { href: "/why-msrx", label: "Why MSRX" },
                { href: "/security", label: "Security" },
                { href: "/contact", label: "Contact" },
                { href: "/privacy", label: "Privacy" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[13.5px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="eyebrow text-[var(--text-tertiary)] mb-4">Elsewhere</h2>
            <ul className="space-y-2.5">
              {SOCIAL.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13.5px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors inline-flex items-center gap-1"
                  >
                    {l.label}
                    <ExternalLink size={11} aria-hidden="true" className="opacity-50" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rule-fade my-10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <MsrxLogo size={22} uid="footer" />
            <p className="mono text-[11px] tracking-[0.18em] uppercase text-[var(--text-tertiary)]">
              Future. Intelligence. Impact.
            </p>
          </div>
          <p className="text-[13px] text-[var(--text-tertiary)]">
            © {new Date().getFullYear()} MSRX. Built by Mrinal Singh Raja.
          </p>
        </div>
      </div>
    </footer>
  );
}
