"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

/**
 * Header theme switch. The current theme was already stamped on <html> by the
 * inline script in layout.tsx, so this component only reads and flips it.
 * Until mounted it renders an empty, same-sized button — the server cannot
 * know the visitor's theme, and guessing an icon would flash the wrong one.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("msrx-theme", next);
    } catch {
      // Storage can be unavailable (private mode); the choice still applies
      // for this page view.
    }
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--paper-sunk)] transition-colors"
    >
      {theme === "dark" ? (
        <Sun size={17} aria-hidden="true" />
      ) : theme === "light" ? (
        <Moon size={17} aria-hidden="true" />
      ) : null}
    </button>
  );
}
