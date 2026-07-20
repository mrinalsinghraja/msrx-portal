"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { MsrxWordmark } from "./MsrxLogo";

const NAV = [
  { href: "/apps", label: "Apps" },
  { href: "/why-msrx", label: "Why MSRX" },
  { href: "/security", label: "Security" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu when navigation lands on a new route.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // While the menu is open it covers the page, so stop the body scrolling behind it.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Escape closes the menu, matching the expectation set by every other overlay.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 nav-blur border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 h-14 flex items-center justify-between gap-4">
        <Link href="/" aria-label="MSRX — home">
          <MsrxWordmark uid="nav" />
        </Link>

        {/* Desktop */}
        <nav aria-label="Main" className="hidden md:flex items-center gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`px-3 py-1.5 rounded-lg text-[14px] transition-colors ${
                isActive(item.href)
                  ? "text-[var(--text-primary)] font-medium bg-[var(--paper-sunk)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--paper-tint)]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile trigger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 -mr-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--paper-tint)] transition-colors"
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile panel */}
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="md:hidden border-t border-[var(--border)] bg-[var(--paper)]"
        >
          <ul className="max-w-6xl mx-auto px-5 py-2">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`block py-3 text-[16px] border-b border-[var(--border)] last:border-0 ${
                    isActive(item.href)
                      ? "text-[var(--text-primary)] font-medium"
                      : "text-[var(--text-secondary)]"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
