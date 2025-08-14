"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, Mail, Globe } from "lucide-react";

const ACCENT = "#22ff41"; // الأخضر من الشعار

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-black text-white">
      {/* أعلى الفوتر */}
      <div className="mx-auto max-w-7xl px-4 lg:px-6 py-12 grid gap-10 md:grid-cols-3">
        {/* 1) الشعار + نبذة */}
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Martin Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="text-xl font-semibold">Martin</span>
          </div>
          <p className="mt-4 text-sm text-white/60 leading-relaxed">
            Freiberuflicher Webdesigner, der skandinavische Einfachheit mit
            moderner Webtechnologie kombiniert, um schnelle, saubere und
            suchmaschinenoptimierte Websites zu erstellen.
          </p>

          {/* Kontakt */}
          <div className="mt-4 flex items-center gap-4 text-sm text-white/70">
            <a
              href="mailto:hello@example.com"
              className="inline-flex items-center gap-2 hover:text-white"
            >
              <Mail className="h-4 w-4" /> hello@example.com
            </a>
            <a
              href="https://example.com"
              className="inline-flex items-center gap-2 hover:text-white"
            >
              <Globe className="h-4 w-4" /> example.com
            </a>
          </div>
        </div>

        {/* 2) Rechtliche Seiten */}
        <div>
          <h3 className="text-sm font-medium text-white/80">Rechtliches</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/60">
            <li>
              <a href="/impressum" className="hover:text-white">
                Impressum
              </a>
            </li>
            <li>
              <a href="/datenschutz" className="hover:text-white">
                Datenschutzerklärung
              </a>
            </li>
            <li>
              <a href="/agb" className="hover:text-white">
                AGB
              </a>
            </li>
            <li>
              <a href="/cookies" className="hover:text-white">
                Cookie-Einstellungen
              </a>
            </li>
          </ul>
        </div>

        {/* 3) Soziale Medien + Plattformen */}
        <div>
          <h3 className="text-sm font-medium text-white/80">
            Folge mir & Portfolio
          </h3>

          {/* Soziale Medien */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a
              href="#"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-sm text-white/70 hover:text-white hover:border-white/30"
            >
              Instagram
            </a>
            <a
              href="#"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-sm text-white/70 hover:text-white hover:border-white/30"
            >
              LinkedIn
            </a>
          </div>

          {/* Designer-Plattformen */}
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <a
              href="#"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-sm text-white/70 hover:text-white hover:border-white/30"
            >
              Behance
            </a>
            <a
              href="#"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-sm text-white/70 hover:text-white hover:border-white/30"
            >
              Dribbble
            </a>
            <a
              href="#"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-sm text-white/70 hover:text-white hover:border-white/30"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Unterer Bereich */}
      <div className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 lg:px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-sm text-white/60">
            © {year} Martin. Alle Rechte vorbehalten.
          </div>
          <div className="flex items-center gap-6 text-sm text-white/60">
            <a href="/datenschutz" className="hover:text-white">
              Datenschutz
            </a>
            <a href="/impressum" className="hover:text-white">
              Impressum
            </a>
            <a
              href="#kontakt"
              className="inline-flex items-center gap-1 hover:text-white"
            >
              Kontakt <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
