"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, Play, ChevronRight, Sparkles, ShieldCheck, Wand2 } from "lucide-react";

import Header from "../components/Navbar";
import Footer from "../components/Footer";

/* ===== Vorgehen Schritte ===== */
const APPROACH_STEPS = [
  { k: "01", t: "Entdecken", d: "Workshops, Ziele, Zielgruppe, Erfolgskriterien." },
  { k: "02", t: "Design", d: "Wireframes, Prototypen, visuelles System, Animation." },
  { k: "03", t: "Entwicklung", d: "Next.js + Headless CMS. Performance & Qualitätssicherung." },
  { k: "04", t: "Launch & Wachstum", d: "Analytics, A/B-Tests, Support, iterative Verbesserungen." }
];
const APPROACH_COPY =
  "Kurze Feedback-Schleifen. Direkte Umsetzung. Ergebnisorientiert statt endloser Präsentationen.";

export default function Page() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const blob = document.getElementById("cursor-blob");
      if (!blob) return;
      blob.animate(
        { left: `${e.clientX}px`, top: `${e.clientY}px` },
        { duration: 500, fill: "forwards" }
      );
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-white/20">
      <CursorBlob />
      <Header />
      <main className="overflow-hidden">
        <Hero />
        <ClientsMarquee />
        <FreeOffer />
        <Projects />
        <Services />
        <Approach />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

/* ===== Cursor Effekt ===== */
function CursorBlob() {
  return (
    <div
      id="cursor-blob"
      aria-hidden
      className="pointer-events-none fixed left-1/2 top-1/2 z-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.14),rgba(255,255,255,0)_60%)] blur-2xl"
    />
  );
}

/* ===== Hero ===== */
function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);

  // Scroll parallax للنصوص
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);

  // Mouse parallax للـ Mockups
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, v => v * 10), { stiffness: 140, damping: 20 });
  const ry = useSpring(useTransform(mx, v => v * -12), { stiffness: 140, damping: 20 });
  const tx = useSpring(useTransform(mx, v => v * 8), { stiffness: 140, damping: 20 });
  const ty = useSpring(useTransform(my, v => v * 6), { stiffness: 140, damping: 20 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width - 0.5) * 2;  // -1 .. 1
    const py = ((e.clientY - rect.top) / rect.height - 0.5) * 2;  // -1 .. 1
    mx.set(px);
    my.set(py);
  };
  const resetMouse = () => {
    mx.set(0); my.set(0);
  };

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden py-24 sm:py-32 lg:py-36 min-h-[72vh] md:min-h-[80vh]"
    >
      <GridBG />

      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="grid items-center md:grid-cols-2 gap-10">
          {/* اليسار: نصوص + CTA (يتحرك قليلاً مع السكروول) */}
          <motion.div style={{ y }} className="max-w-3xl">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              <ShieldCheck className="h-4 w-4" /> Professionelle Web-Erlebnisse
            </p>
            <h1 className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              Ich entwerfe & entwickle digitale Erlebnisse, die Marken{" "}
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">unvergesslich</span> machen.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/70">
              Aktuell biete ich <strong>komplett kostenlose</strong> Webdesign-, Entwicklungs- und SEO-Leistungen an,
              um mein Portfolio zu erweitern. Sie erhalten eine hochwertige Website – ich darf sie als Referenz nutzen.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-medium text-neutral-900 hover:bg-white/90">
                Jetzt kostenlos anfragen <ChevronRight className="h-4 w-4" />
              </a>
              <a href="#services" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-white/90 hover:bg-white/10">
                Leistungen ansehen
              </a>
            </div>
          </motion.div>

          {/* اليمين: Mockup مع Parallax (بدون ظل/إطار) */}
          <div
            className="relative hidden md:flex items-center justify-center md:h-[520px] lg:h-[620px] xl:h-[680px]"
            onMouseMove={handleMouse}
            onMouseLeave={resetMouse}
          >

{/* الموبايل: أفقي مع النصوص + ميلان بسيط */}
<motion.img
  src="/mockups/phone.png"
  alt="Mobile Mockup"
  style={{ rotateX: rx, rotateY: ry, x: tx, y: ty }}
  className="absolute z-10 select-none rounded-none rotate-6
             top-[20px] right-[-10px] w-[320px]
             lg:top-[30px] lg:right-[20px] lg:w-[380px]
             xl:top-[40px] xl:right-[40px] xl:w-[430px]"
  draggable={false}
  initial={{ opacity: 0, y: 30, scale: 0.96 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
/>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-neutral-950" />
    </section>
  );
}


/* ===== Kostenlos Angebot ===== */
function FreeOffer() {
  return (
    <section className="relative border-y border-white/5 bg-neutral-950 py-16">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl mb-4">
          Kostenlos für begrenzte Zeit
        </h2>
        <p className="text-lg text-white/70 leading-relaxed">
          Lassen Sie Ihre moderne, schnelle und mobiloptimierte Website erstellen – komplett
          kostenlos. Im Gegenzug darf ich Ihr Projekt als Referenz in meinem Portfolio zeigen.
        </p>
      </div>
    </section>
  );
}


/* ===== ClientsMarquee ===== */
function ClientsMarquee() {
  const techIcons = [
    "/tech/javascript.svg",
    "/tech/laravel.svg",
    "/tech/mysql.svg",
    "/tech/nextjs.svg",
    "/tech/php.svg",
    "/tech/postgresql.svg",
    "/tech/react.svg",
    "/tech/tailwind.svg",
    "/tech/wordpress.svg"
  ];

  return (
    <section className="relative border-y border-neutral-200 bg-white py-6">
      <div className="overflow-hidden">
        <div className="animate-marquee flex gap-16 whitespace-nowrap will-change-transform" aria-hidden>
          {techIcons.concat(techIcons).map((src, i) => (
            <img
              key={i}
              src={src}
              alt="Technologie-Logo"
              className="h-12 w-auto opacity-80 hover:opacity-100 transition"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Projekte ===== */
function Projects() {
  const projects = [
    {
      title: "Aurora Hotels",
      subtitle: "Luxus-Hotelplattform",
      poster:
        "https://images.unsplash.com/photo-1501117716987-c8e1ecb2103a?q=80&w=1200&auto=format&fit=crop"
    },
    {
      title: "Volt Mobility",
      subtitle: "E-Ladeinfrastruktur",
      poster:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop"
    },
    {
      title: "Lumen Studio",
      subtitle: "Kreativagentur",
      poster:
        "https://images.unsplash.com/photo-1529336953121-4a5dfcaff2a1?q=80&w=1200&auto=format&fit=crop"
    },
    {
      title: "North & Co",
      subtitle: "Fashion E-Commerce",
      poster:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop"
    }
  ];

  return (
    <section id="work" className="relative z-10 bg-neutral-950 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Beispielprojekte</h2>
          <a
            href="#contact"
            className="hidden items-center gap-2 text-sm text-white/70 hover:text-white sm:inline-flex"
          >
            Projekt starten <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
          {projects.map((p, i) => (
            <a
              key={i}
              href="#"
              className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/40"
            >
              <div className="relative aspect-[16/11] overflow-hidden">
                <img
                  src={p.poster}
                  alt=""
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-100" />
              </div>
              <div className="absolute inset-x-0 bottom-0 z-10 p-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur">
                  <Play className="h-3.5 w-3.5" /> Fallstudie
                </div>
                <div className="mt-3">
                  <div className="text-xl font-medium">{p.title}</div>
                  <div className="text-sm text-white/60">{p.subtitle}</div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
/* ===== Leistungen ===== */
function Services() {
  const services = [
    {
      title: "Webdesign & UI/UX",
      desc: "Klares, modernes Design im skandinavischen Stil. Benutzerfreundliche Interfaces, die Eindruck hinterlassen.",
      icon: <Wand2 className="h-5 w-5" />
    },
    {
      title: "Entwicklung",
      desc: "Next.js & React, WordPress/Headless CMS, saubere Codebasis, Performance & Barrierefreiheit.",
      icon: <Sparkles className="h-5 w-5" />
    },
    {
      title: "SEO & Performance",
      desc: "Technisches SEO, Core Web Vitals Optimierung, schnelle Ladezeiten und bessere Sichtbarkeit.",
      icon: <ShieldCheck className="h-5 w-5" />
    }
  ];

  return (
    <section id="services" className="relative border-y border-white/5 bg-neutral-980/50 py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Leistungen</h2>
          <p className="mt-4 text-white/70">
            Diese Leistungen biete ich aktuell komplett kostenlos an – ideal für Startups, kleine Unternehmen oder private Projekte.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              className="rounded-3xl border border-white/10 bg-neutral-900 p-6"
            >
              <div className="mb-4 inline-grid h-10 w-10 place-items-center rounded-xl bg-white/5">
                {s.icon}
              </div>
              <h3 className="text-lg font-medium">{s.title}</h3>
              <p className="mt-2 text-sm text-white/60">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Vorgehen ===== */
function Approach() {
  return (
    <section id="approach" className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Vorgehen</h2>
          <p className="mt-3 text-white/70">{APPROACH_COPY}</p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {APPROACH_STEPS.map((s) => (
            <motion.div
              key={s.k}
              whileHover={{ scale: 1.01 }}
              className="flex items-start gap-4 rounded-3xl border border-white/10 bg-neutral-900 p-6"
            >
              <div className="text-2xl font-semibold text-white/30">{s.k}</div>
              <div>
                <div className="text-lg font-medium">{s.t}</div>
                <div className="text-white/60">{s.d}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Über mich ===== */
function About() {
  return (
    <section id="about" className="relative border-y border-white/5 bg-neutral-980/40 py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Über mich</h2>
            <p className="mt-4 text-white/70">
              Ich bin Martin Alahmad – Freelancer für Webdesign, Entwicklung und SEO in Deutschland.
              Derzeit biete ich meine Leistungen kostenlos an, um ein starkes Portfolio mit echten Kundenprojekten aufzubauen.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 text-white/70">
              <Stat k="120+" v="abgeschlossene Projekte" />
              <Stat k="<1s" v="LCP (Core Web Vitals)" />
              <Stat k="8+" v="Jahre Erfahrung" />
              <Stat k="100%" v="In-House Umsetzung" />
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-3xl border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop"
                alt="Studio"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-neutral-900 p-5">
      <div className="text-2xl font-semibold">{k}</div>
      <div className="text-xs uppercase tracking-widest text-white/50">{v}</div>
    </div>
  );
}

/* ===== Kontakt ===== */
function Contact() {
  return (
    <section id="contact" className="relative py-24">
      <div className="mx-auto max-w-5xl px-4 text-center lg:px-6">
        <h2 className="text-pretty text-3xl font-semibold tracking-tight sm:text-4xl">
          Nutzen Sie mein kostenloses Angebot
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-white/70">
          Erzählen Sie mir kurz von Ihrem Projekt. Ich wähle passende Anfragen aus und setze sie
          kostenlos um – im Gegenzug darf ich Ihre Website als Referenz zeigen.
        </p>
        <form className="mx-auto mt-10 grid max-w-2xl gap-4 text-left">
          <input
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-white/40 focus:bg-white/10"
            placeholder="Ihr Name"
          />
          <input
            type="email"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-white/40 focus:bg-white/10"
            placeholder="E-Mail"
          />
          <textarea
            className="min-h-32 rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-white/40 focus:bg-white/10"
            placeholder="Kurzbeschreibung des Projekts"
          />
          <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-medium text-neutral-900 hover:bg-white/90">
            Senden <ArrowUpRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </section>
  );
}

/* ===== Grid Hintergrund ===== */
function GridBG() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.04),transparent_50%),radial-gradient(70%_50%_at_50%_0%,rgba(255,255,255,0.10),rgba(0,0,0,0)_70%)]" />
      <div className="absolute inset-0 [mask-image:radial-gradient(60%_50%_at_50%_20%,black,transparent_70%)]">
        <svg
          className="h-full w-full opacity-[0.06]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0H0V40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </div>
  );
}


/* ===== باقي الأقسام ===== */
// Services, Approach, About, Contact نفس النمط — لو تريد أقدر أكملهم الآن بالألماني في نفس الملف.
