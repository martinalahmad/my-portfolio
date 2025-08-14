"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowUpRight, Sun, Moon } from "lucide-react";

const links = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#approach", label: "Approach" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
 { href: "/projekte", label: "Projekte" },
{ href: "/blog", label: "Blog" },
{ href: "/showcase", label: "Showcase" },

];

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [active, setActive] = React.useState<string>("");
  const [progress, setProgress] = React.useState(0);
  const [mounted, setMounted] = React.useState(false);
  const [isDark, setIsDark] = React.useState<boolean>(false);

  React.useEffect(() => setMounted(true), []);
  React.useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, [mounted]);

  const toggleTheme = React.useCallback(() => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }, [isDark]);

  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 4);
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const ids = links.map((l) => l.href.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0.1, 0.25, 0.5, 0.75] }
    );

    sections.forEach((sec) => obs.observe(sec));
    return () => obs.disconnect();
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const headerClass =
    "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 " +
    (scrolled
      ? // خلفية داكنة مثل الفوتر مع بلور خفيف
        "bg-black/80 border-white/10 supports-[backdrop-filter]:backdrop-blur-md"
      : "bg-black/60 border-transparent supports-[backdrop-filter]:backdrop-blur-md");

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-black focus:px-3 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <header className={headerClass}>
        {/* progress */}
        <div
          className="pointer-events-none absolute left-0 top-0 h-[2px] w-full bg-white/5"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute left-0 top-0 h-[2px] origin-left bg-white/60 transition-[transform]"
          style={{ transform: `scaleX(${progress})` }}
          aria-hidden
        />

        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 lg:px-6">
          {/* Logo + Martin (نفس أسلوب الفوتر) */}
          <Link href="/" className="inline-flex items-center gap-3">
            <Image
              src="/logo.png" // من public
              alt="Martin Logo"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
            <span className="text-xl font-semibold text-white">Martin</span>
          </Link>

          {/* Right cluster (desktop) */}
          <div className="hidden items-center gap-4 md:flex">
            <nav className="flex items-center gap-6">
              {links.map((l) => {
                const isActive = active === l.href;
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    aria-current={isActive ? "page" : undefined}
                    className={
                      "relative text-sm transition-colors " +
                      (isActive ? "text-white" : "text-white/70 hover:text-white")
                    }
                  >
                    <span className="px-0.5">{l.label}</span>
                    <span
                      className={
                        "absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-white/80 transition-transform duration-300 " +
                        (isActive ? "scale-x-100" : "group-hover:scale-x-100")
                      }
                    />
                  </a>
                );
              })}
            </nav>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
              aria-label="Toggle theme"
              title={isDark ? "Switch to light" : "Switch to dark"}
            >
              {mounted ? (
                isDark ? (
                  <Sun className="h-4 w-4 text-white" />
                ) : (
                  <Moon className="h-4 w-4 text-white" />
                )
              ) : null}
            </button>

            <a
              href="#contact"
              className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/0 px-3 py-1.5 text-sm text-white/90 transition hover:bg-white/10"
            >
              Start a project <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          {/* Mobile open */}
          <button
            onClick={() => setOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5 text-white" />
          </button>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden"
            onClick={() => setOpen(false)}
          >
            <div
              className="absolute right-3 top-3 w-[86vw] max-w-sm rounded-2xl border border-white/10 bg-neutral-900/95 p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile menu"
            >
              <div className="mb-6 flex items-center justify-between">
                {/* Mini logo + name لثبات الهوية */}
                <div className="inline-flex items-center gap-2">
                  <Image
                    src="/logo.png"
                    alt="Martin Logo"
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                  <span className="text-sm font-semibold text-white">Martin</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleTheme}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10"
                    aria-label="Toggle theme"
                    title={isDark ? "Switch to light" : "Switch to dark"}
                  >
                    {mounted ? (
                      isDark ? (
                        <Sun className="h-4 w-4 text-white" />
                      ) : (
                        <Moon className="h-4 w-4 text-white" />
                      )
                    ) : null}
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="rounded-lg p-2 hover:bg-white/10"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5 text-white" />
                  </button>
                </div>
              </div>

              <div className="grid gap-2">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={
                      "rounded-xl px-3 py-2 text-lg transition " +
                      (active === l.href
                        ? "bg-white/10 text-white"
                        : "text-white/80 hover:bg-white/10")
                    }
                  >
                    {l.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white transition hover:bg-white/10"
                >
                  Start a project <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
