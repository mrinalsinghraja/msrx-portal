import Link from "next/link";
import { ExternalLink, Monitor, Smartphone, ArrowUpRight, Brain, Zap, Shield, LayoutGrid } from "lucide-react";

// ── App data ──────────────────────────────────────────────────────────────────
const macApps = [
  { name: "Orion Drive", description: "Cloud and local file management for seamless access across all your devices.", initials: "OD", bg: "#EFF6FF", fg: "#2563EB", href: "https://oriondrive.msrx.co.in", external: true, storeLabel: "Visit Site", highlight: false },
  { name: "OrionSeek", description: "Blazing-fast system search utility. Find anything on your Mac in an instant.", initials: "OS", bg: "#F0FDF4", fg: "#16A34A", href: "https://apps.apple.com/us/app/orionseek/id6770491595?mt=12", external: true, storeLabel: "Mac App Store", highlight: false },
  { name: "OrionPulseNet", description: "Network monitoring made elegant. Track uptime, latency, and health at a glance.", initials: "PN", bg: "#F5F3FF", fg: "#7C3AED", href: "https://pulsenet.msrx.co.in", external: true, storeLabel: "Open Web App", appStoreHref: "https://apps.apple.com/us/app/orionpulsenet/id6766838207?mt=12", highlight: true },
  { name: "OrionShield", description: "Security and privacy protection that runs quietly, keeping threats away.", initials: "OR", bg: "#FFF7ED", fg: "#EA580C", href: "https://apps.apple.com/us/app/orionshield/id6764576967?mt=12", external: true, storeLabel: "Mac App Store", highlight: false },
  { name: "Orion Process Explorer", description: "Comprehensive system resource monitor. See exactly what your Mac is doing.", initials: "PE", bg: "#FFF1F2", fg: "#BE123C", href: "https://apps.apple.com/us/app/orionprocessexplorer/id6762134959?mt=12", external: true, storeLabel: "Mac App Store", highlight: false },
  { name: "OrionClean", description: "Smart disk cleanup that reclaims space without removing what matters.", initials: "OC", bg: "#F0FDFA", fg: "#0F766E", href: "https://apps.apple.com/us/app/orionclean/id6761111012?mt=12", external: true, storeLabel: "Mac App Store", highlight: false },
];

const iosApps = [
  { name: "GuardTrack Pro", description: "Professional security team management for patrols, incidents, and reports.", initials: "GT", bg: "#EEF2FF", fg: "#4338CA", href: "https://apps.apple.com/us/app/guardtrack-pro/id6774895956", external: true, storeLabel: "App Store", highlight: false },
  { name: "Numly — AI Calculator", description: "AI-powered calculator that understands natural language and complex expressions.", initials: "NM", bg: "#FFFBEB", fg: "#D97706", href: "https://apps.apple.com/us/app/numly-ai-smart-calculator/id6759639887", external: true, storeLabel: "App Store", highlight: false },
  { name: "PDF Compressor", description: "Compress PDF files without sacrificing quality. Fast, private, and on-device.", initials: "PC", bg: "#FFF1F2", fg: "#E11D48", href: "https://apps.apple.com/us/app/pdfcompressor-shrink-pdf/id6759563556", external: true, storeLabel: "App Store", highlight: false },
  { name: "PassportFast", description: "Generate compliant passport and visa photos from your iPhone. No studio needed.", initials: "PF", bg: "#F0FDF4", fg: "#15803D", href: "https://apps.apple.com/us/app/passportfast/id6759985939", external: true, storeLabel: "App Store", highlight: false },
];

type App = { name: string; description: string; initials: string; bg: string; fg: string; href: string; external: boolean; storeLabel: string; highlight: boolean; appStoreHref?: string };

// ── MSRX 3D M Logo SVG ────────────────────────────────────────────────────────
function MSRXLogo({ size = 32, glow = false }: { size?: number; glow?: boolean }) {
  const id = glow ? "glow" : "noglow";
  return (
    <svg width={size} height={Math.round(size * 1.15)} viewBox="0 0 100 115" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="MSRX">
      <defs>
        <linearGradient id={`mg-left-${id}`} x1="50" y1="8" x2="0" y2="115" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7EE8F8" /><stop offset="100%" stopColor="#00AAC8" />
        </linearGradient>
        <linearGradient id={`mg-right-${id}`} x1="50" y1="8" x2="100" y2="115" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C4B5FD" /><stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
        {glow && (
          <filter id="m-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="7" result="b1" />
            <feFlood floodColor="#38BDF8" floodOpacity="0.65" result="c1" />
            <feComposite in="c1" in2="b1" operator="in" result="g1" />
            <feGaussianBlur in="SourceAlpha" stdDeviation="14" result="b2" />
            <feFlood floodColor="#8B5CF6" floodOpacity="0.4" result="c2" />
            <feComposite in="c2" in2="b2" operator="in" result="g2" />
            <feMerge><feMergeNode in="g2" /><feMergeNode in="g1" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        )}
      </defs>
      <g filter={glow ? "url(#m-glow)" : undefined}>
        {/* Left outer stroke — cyan */}
        <path d="M 5 110 L 5 12 L 22 12 L 22 110 Z" fill={`url(#mg-left-${id})`} />
        {/* Left arm to V center */}
        <path d="M 22 12 L 50 58 L 50 78 L 22 46 Z" fill={`url(#mg-left-${id})`} opacity="0.8" />
        {/* Left peak highlight */}
        <path d="M 5 12 L 50 12 L 50 22 L 22 22 Z" fill="rgba(200,248,255,0.4)" />
        {/* Inner V deep shadow */}
        <path d="M 22 46 L 50 78 L 78 46 L 78 62 L 50 94 L 22 62 Z" fill="rgba(0,0,30,0.28)" />
        {/* Right arm from V center */}
        <path d="M 78 12 L 50 58 L 50 78 L 78 46 Z" fill={`url(#mg-right-${id})`} opacity="0.8" />
        {/* Right outer stroke — purple */}
        <path d="M 78 12 L 95 12 L 95 110 L 78 110 Z" fill={`url(#mg-right-${id})`} />
        {/* Right peak highlight */}
        <path d="M 50 12 L 95 12 L 78 22 L 50 22 Z" fill="rgba(220,210,255,0.38)" />
        {/* Top ridge (3D top surface) */}
        <path d="M 5 12 L 22 12 L 50 58 L 78 12 L 95 12 L 95 20 L 78 20 L 50 68 L 22 20 L 5 20 Z" fill="rgba(255,255,255,0.18)" />
      </g>
    </svg>
  );
}

// ── App card ──────────────────────────────────────────────────────────────────
function AppCard({ app }: { app: App }) {
  return (
    <a
      href={app.href}
      target={app.external ? "_blank" : undefined}
      rel={app.external ? "noopener noreferrer" : undefined}
      className={`group block bg-white rounded-2xl p-6 card-hover border ${app.highlight ? "border-violet-200 ring-1 ring-violet-100" : "border-[var(--border)]"}`}
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-[13px] font-semibold tracking-wide" style={{ background: app.bg, color: app.fg }}>
          {app.initials}
        </div>
        {app.highlight && <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full msrx-gradient text-white tracking-wide">WEB</span>}
      </div>
      <h3 className="font-semibold text-[var(--text-primary)] mb-2 text-[15px] leading-snug">{app.name}</h3>
      <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mb-4">{app.description}</p>
      <div className="flex items-center gap-1 text-[13px] font-medium" style={{ color: app.fg }}>
        {app.storeLabel}
        <ArrowUpRight size={13} className="opacity-60 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </a>
  );
}

// ── Category pill ─────────────────────────────────────────────────────────────
function CategoryPill({ icon: Icon, label, color }: { icon: React.ElementType; label: string; color: string }) {
  return (
    <div className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-[var(--border)] bg-white/80" style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.05)" }}>
      <Icon size={13} style={{ color }} />
      <span className="text-[11px] font-bold tracking-[0.1em] uppercase" style={{ color }}>{label}</span>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      {/* ── Nav ──────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 nav-blur border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 select-none">
            <MSRXLogo size={28} />
            <span className="font-bold text-[17px] tracking-[0.06em] text-[var(--text-primary)]">MSRX</span>
          </Link>
          <nav className="flex items-center gap-6">
            <a href="#apps" className="text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Apps</a>
            <a href="mailto:mrinalsinghraja@gmail.com" className="text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Contact</a>
            <Link href="/privacy" className="text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Privacy</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* ── Hero — Brand Banner ───────────────────────────────────────── */}
        <section className="relative overflow-hidden" style={{ background: "linear-gradient(160deg, #f8f9ff 0%, #f0f4ff 45%, #f5f0ff 100%)" }}>
          {/* Ambient glow blobs */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <div style={{ position: "absolute", top: "5%", left: "5%", width: 350, height: 350, background: "radial-gradient(ellipse, rgba(0,196,223,0.14) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(40px)" }} />
            <div style={{ position: "absolute", top: "10%", right: "8%", width: 280, height: 280, background: "radial-gradient(ellipse, rgba(139,92,246,0.12) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(40px)" }} />
            <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 700, height: 180, background: "radial-gradient(ellipse, rgba(99,102,241,0.07) 0%, transparent 70%)", filter: "blur(30px)" }} />
          </div>

          <div className="relative max-w-6xl mx-auto px-6 py-16 sm:py-24">
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

              {/* Left: Big M with glow */}
              <div className="flex-shrink-0 flex items-center justify-center relative">
                <div style={{ position: "absolute", width: 240, height: 240, background: "radial-gradient(ellipse, rgba(0,196,223,0.2) 0%, rgba(139,92,246,0.12) 55%, transparent 80%)", filter: "blur(24px)", borderRadius: "50%" }} />
                <MSRXLogo size={164} glow={true} />
              </div>

              {/* Vertical divider (desktop) */}
              <div className="hidden lg:block w-px self-stretch" style={{ background: "linear-gradient(to bottom, transparent, rgba(0,196,223,0.35) 30%, rgba(139,92,246,0.35) 70%, transparent)" }} />

              {/* Right: Wordmark + tagline + pills + CTA */}
              <div className="flex-1 text-center lg:text-left">
                {/* Giant MSRX wordmark */}
                <div className="font-black tracking-[0.42em] leading-none mb-5 msrx-gradient-text select-none" style={{ fontSize: "clamp(54px, 8vw, 96px)" }}>
                  MSRX
                </div>

                {/* Tagline */}
                <p className="font-bold tracking-[0.3em] uppercase mb-5 text-[var(--text-tertiary)]" style={{ fontSize: "11px", letterSpacing: "0.28em" }}>
                  Future. Intelligence. Impact.
                </p>

                {/* Gradient separator */}
                <div className="w-16 h-0.5 mx-auto lg:mx-0 mb-6 msrx-gradient rounded-full" />

                {/* Category pills */}
                <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start mb-8">
                  <CategoryPill icon={Brain} label="AI Apps" color="#00AAC8" />
                  <CategoryPill icon={Zap} label="Productivity" color="#6366F1" />
                  <CategoryPill icon={Shield} label="Security" color="#7C3AED" />
                  <CategoryPill icon={LayoutGrid} label="Utilities" color="#8B5CF6" />
                </div>

                {/* Sub-headline */}
                <p className="text-[16px] sm:text-[18px] font-medium text-[var(--text-primary)] leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
                  Premium apps crafted for everyday people — built with care, launched with purpose.
                </p>

                {/* CTA */}
                <a href="#apps" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-white font-semibold text-[15px] msrx-gradient transition-opacity hover:opacity-90 select-none" style={{ boxShadow: "0 4px 24px rgba(0,196,223,0.28)" }}>
                  Explore Apps
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Apps ─────────────────────────────────────────────────────────── */}
        <section id="apps" className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-20">
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-8">
              <Monitor size={15} className="text-[var(--text-tertiary)]" />
              <h2 className="text-[12px] font-semibold tracking-[0.14em] uppercase text-[var(--text-tertiary)]">macOS</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {macApps.map((app) => <AppCard key={app.name} app={app} />)}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-8">
              <Smartphone size={15} className="text-[var(--text-tertiary)]" />
              <h2 className="text-[12px] font-semibold tracking-[0.14em] uppercase text-[var(--text-tertiary)]">iPhone &amp; iPad</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {iosApps.map((app) => <AppCard key={app.name} app={app} />)}
            </div>
          </div>
        </section>

        {/* ── Brand Signature ──────────────────────────────────────────────── */}
        <section style={{ background: "linear-gradient(135deg, #f0f8ff 0%, #f5f0ff 100%)", borderTop: "1px solid rgba(0,0,0,0.06)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
          <div className="max-w-6xl mx-auto px-6 py-16 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <MSRXLogo size={44} glow={false} />
              <div className="text-left">
                <p className="font-black text-[30px] tracking-[0.15em] msrx-gradient-text leading-none">MSRX</p>
                <p className="text-[10px] tracking-[0.22em] uppercase text-[var(--text-tertiary)] mt-1">Future. Intelligence. Impact.</p>
              </div>
            </div>
            <p className="text-[14px] text-[var(--text-secondary)] mt-4">Built with care. Launched with purpose.</p>
          </div>
        </section>
      </main>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <footer className="border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-[var(--text-tertiary)]">© {new Date().getFullYear()} MSRX. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-[13px] text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors">Privacy Policy</Link>
            <a href="mailto:mrinalsinghraja@gmail.com" className="text-[13px] text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors">Contact</a>
            <a href="https://github.com/mrinalsinghraja" target="_blank" rel="noopener noreferrer" className="text-[13px] text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors flex items-center gap-1">
              GitHub <ExternalLink size={11} />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
