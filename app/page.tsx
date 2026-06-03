import Link from "next/link";
import { ExternalLink, Monitor, Smartphone, ArrowUpRight } from "lucide-react";

const macApps = [
  {
    name: "Orion Drive",
    description: "Cloud and local file management for seamless access across all your devices.",
    initials: "OD",
    bg: "#EFF6FF",
    fg: "#2563EB",
    href: "https://oriondrive.msrx.co.in",
    external: true,
    storeLabel: "Visit Site",
    highlight: false,
  },
  {
    name: "OrionSeek",
    description: "Blazing-fast system search utility. Find anything on your Mac in an instant.",
    initials: "OS",
    bg: "#F0FDF4",
    fg: "#16A34A",
    href: "https://apps.apple.com/us/app/orionseek/id6770491595?mt=12",
    external: true,
    storeLabel: "Mac App Store",
    highlight: false,
  },
  {
    name: "OrionPulseNet",
    description: "Network monitoring made elegant. Track uptime, latency, and health at a glance.",
    initials: "PN",
    bg: "#F5F3FF",
    fg: "#7C3AED",
    href: "https://pulsenet.msrx.co.in",
    external: true,
    storeLabel: "Open Web App",
    appStoreHref: "https://apps.apple.com/us/app/orionpulsenet/id6766838207?mt=12",
    highlight: true,
  },
  {
    name: "OrionShield",
    description: "Security and privacy protection that runs quietly, keeping threats away.",
    initials: "OR",
    bg: "#FFF7ED",
    fg: "#EA580C",
    href: "https://apps.apple.com/us/app/orionshield/id6764576967?mt=12",
    external: true,
    storeLabel: "Mac App Store",
    highlight: false,
  },
  {
    name: "Orion Process Explorer",
    description: "Comprehensive system resource monitor. See exactly what your Mac is doing.",
    initials: "PE",
    bg: "#FFF1F2",
    fg: "#BE123C",
    href: "https://apps.apple.com/us/app/orionprocessexplorer/id6762134959?mt=12",
    external: true,
    storeLabel: "Mac App Store",
    highlight: false,
  },
  {
    name: "OrionClean",
    description: "Smart disk cleanup that reclaims space without removing what matters.",
    initials: "OC",
    bg: "#F0FDFA",
    fg: "#0F766E",
    href: "https://apps.apple.com/us/app/orionclean/id6761111012?mt=12",
    external: true,
    storeLabel: "Mac App Store",
    highlight: false,
  },
];

const iosApps = [
  {
    name: "GuardTrack Pro",
    description: "Professional security team management for patrols, incidents, and reports.",
    initials: "GT",
    bg: "#EEF2FF",
    fg: "#4338CA",
    href: "https://apps.apple.com/us/app/guardtrack-pro/id6774895956",
    external: true,
    storeLabel: "App Store",
    highlight: false,
  },
  {
    name: "Numly — AI Calculator",
    description: "AI-powered calculator that understands natural language and complex expressions.",
    initials: "NM",
    bg: "#FFFBEB",
    fg: "#D97706",
    href: "https://apps.apple.com/us/app/numly-ai-smart-calculator/id6759639887",
    external: true,
    storeLabel: "App Store",
    highlight: false,
  },
  {
    name: "PDF Compressor",
    description: "Compress PDF files without sacrificing quality. Fast, private, and on-device.",
    initials: "PC",
    bg: "#FFF1F2",
    fg: "#E11D48",
    href: "https://apps.apple.com/us/app/pdfcompressor-shrink-pdf/id6759563556",
    external: true,
    storeLabel: "App Store",
    highlight: false,
  },
  {
    name: "PassportFast",
    description: "Generate compliant passport and visa photos from your iPhone. No studio needed.",
    initials: "PF",
    bg: "#F0FDF4",
    fg: "#15803D",
    href: "https://apps.apple.com/us/app/passportfast/id6759985939",
    external: true,
    storeLabel: "App Store",
    highlight: false,
  },
];

type App = {
  name: string;
  description: string;
  initials: string;
  bg: string;
  fg: string;
  href: string;
  external: boolean;
  storeLabel: string;
  highlight: boolean;
  appStoreHref?: string;
};

function MSRXLogo({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="MSRX logo"
    >
      <defs>
        <linearGradient id="msrx-m" x1="0" y1="0" x2="100" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00c4df" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <path
        d="M6 110 L6 12 L50 62 L94 12 L94 110 L76 110 L76 46 L50 80 L24 46 L24 110 Z"
        fill="url(#msrx-m)"
      />
    </svg>
  );
}

function AppCard({ app }: { app: App }) {
  const iconAndText = (
    <>
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-[13px] font-semibold tracking-wide"
          style={{ background: app.bg, color: app.fg }}
        >
          {app.initials}
        </div>
        {app.highlight && (
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full msrx-gradient text-white tracking-wide">
            WEB
          </span>
        )}
      </div>
      <h3 className="font-semibold text-[var(--text-primary)] mb-2 text-[15px] leading-snug">
        {app.name}
      </h3>
      <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mb-4">
        {app.description}
      </p>
    </>
  );

  if (app.appStoreHref) {
    return (
      <div
        className={`bg-white rounded-2xl p-6 card-hover border ${
          app.highlight
            ? "border-violet-200 ring-1 ring-violet-100"
            : "border-[var(--border)]"
        }`}
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        {iconAndText}
        <div className="flex items-center gap-4 flex-wrap">
          <a
            href={app.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[13px] font-medium hover:opacity-70 transition-opacity"
            style={{ color: app.fg }}
          >
            {app.storeLabel}
            <ArrowUpRight size={13} className="opacity-60" />
          </a>
          <a
            href={app.appStoreHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[13px] font-medium hover:opacity-70 transition-opacity"
            style={{ color: app.fg }}
          >
            Mac App Store
            <ArrowUpRight size={13} className="opacity-60" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <a
      href={app.href}
      target={app.external ? "_blank" : undefined}
      rel={app.external ? "noopener noreferrer" : undefined}
      className={`group block bg-white rounded-2xl p-6 card-hover border ${
        app.highlight
          ? "border-violet-200 ring-1 ring-violet-100"
          : "border-[var(--border)]"
      }`}
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      {iconAndText}
      <div
        className="flex items-center gap-1 text-[13px] font-medium"
        style={{ color: app.fg }}
      >
        {app.storeLabel}
        <ArrowUpRight
          size={13}
          className="opacity-60 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>
    </a>
  );
}

export default function Home() {
  return (
    <>
      {/* Nav */}
      <header className="sticky top-0 z-50 nav-blur border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <MSRXLogo size={26} />
            <span className="font-semibold text-[16px] tracking-tight text-[var(--text-primary)]">
              MSRX
            </span>
          </Link>
          <nav className="flex items-center gap-6">
            <a
              href="#apps"
              className="text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-150"
            >
              Apps
            </a>
            <a
              href="mailto:mrinalsinghraja@gmail.com"
              className="text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-150"
            >
              Contact
            </a>
            <Link
              href="/privacy"
              className="text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-150"
            >
              Privacy
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="max-w-6xl mx-auto px-6 pt-16 sm:pt-28 pb-16 sm:pb-24 text-center">
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[var(--text-tertiary)] mb-8">
            Future. Intelligence. Impact.
          </p>
          <h1 className="text-[36px] sm:text-[48px] lg:text-[62px] font-bold leading-[1.08] tracking-tight text-[var(--text-primary)] mb-6">
            Premium apps for
            <br />
            <span className="msrx-gradient-text">everyday people.</span>
          </h1>
          <p className="text-[14px] sm:text-[15px] font-medium tracking-[0.16em] uppercase text-[var(--text-secondary)] mb-10">
            Connect · Access · Work · Anywhere
          </p>
          <p className="max-w-lg mx-auto text-[16px] text-[var(--text-secondary)] leading-relaxed">
            Software crafted with care and launched with purpose — built to make
            your work and life a little smoother, every single day.
          </p>
        </section>

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-px bg-[var(--border)]" />
        </div>

        {/* Apps */}
        <section id="apps" className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-20">
          {/* macOS */}
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-8">
              <Monitor size={15} className="text-[var(--text-tertiary)]" />
              <h2 className="text-[12px] font-semibold tracking-[0.14em] uppercase text-[var(--text-tertiary)]">
                macOS
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {macApps.map((app) => (
                <AppCard key={app.name} app={app} />
              ))}
            </div>
          </div>

          {/* iOS */}
          <div>
            <div className="flex items-center gap-2 mb-8">
              <Smartphone size={15} className="text-[var(--text-tertiary)]" />
              <h2 className="text-[12px] font-semibold tracking-[0.14em] uppercase text-[var(--text-tertiary)]">
                iPhone & iPad
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {iosApps.map((app) => (
                <AppCard key={app.name} app={app} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA band */}
        <section className="bg-[var(--surface)] border-t border-[var(--border)]">
          <div className="max-w-6xl mx-auto px-6 py-16 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <MSRXLogo size={18} />
              <span className="font-semibold text-[14px] tracking-tight text-[var(--text-primary)]">
                MSRX
              </span>
            </div>
            <p className="text-[14px] text-[var(--text-secondary)]">
              Built with care. Launched with purpose.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-[var(--text-tertiary)]">
            © {new Date().getFullYear()} MSRX. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-[13px] text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
            >
              Privacy Policy
            </Link>
            <a
              href="mailto:mrinalsinghraja@gmail.com"
              className="text-[13px] text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
            >
              Contact
            </a>
            <a
              href="https://github.com/mrinalsinghraja"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors flex items-center gap-1"
            >
              GitHub
              <ExternalLink size={11} />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
