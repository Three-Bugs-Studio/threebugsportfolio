import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRightIcon } from "./ui/MajesticIcon";
import { TRANSLATIONS } from "../data";

interface HeroProps {
  lang: "vi" | "en";
}

const hcmcTime = () =>
  new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Ho_Chi_Minh" });

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
});

// Corporate hero: meta rule on top, oversized left-aligned statement, three-column footer row.
export default function Hero({ lang }: HeroProps) {
  const [time, setTime] = useState(hcmcTime);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const id = setInterval(() => setTime(hcmcTime()), 30_000);
    return () => clearInterval(id);
  }, []);

  const scrollTo = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden bg-canvas">
      {/* Hairline column guides */}
      <div aria-hidden="true" className="absolute inset-0 px-6 md:px-12 pointer-events-none">
        <div className="max-w-7xl mx-auto h-full grid grid-cols-2 md:grid-cols-4 border-x border-line">
          <div className="border-r border-line" />
          <div className="md:border-r border-line" />
          <div className="hidden md:block border-r border-line" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 flex-1 flex flex-col justify-between pt-32 md:pt-40 pb-12 md:pb-16">
        <motion.div
          {...rise(0.2)}
          className="flex items-center justify-between gap-4 border-b border-line pb-4 font-mono text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] text-ink-muted"
        >
          <span>
            <span className="text-brand-ink font-semibold">3B</span>
            <span className="mx-3 text-line">/</span>
            {lang === "vi" ? "Studio phần mềm" : "Software studio"}
          </span>
          <span className="hidden sm:inline tabular-nums">HCMC {time} · GMT+7</span>
        </motion.div>

        <motion.h1
          id="hero-title"
          {...rise(0.35)}
          className="font-display font-semibold text-5xl md:text-7xl lg:text-[6.5rem] tracking-[-0.04em] text-ink leading-[1.02] my-16 md:my-20 [text-wrap:balance]"
        >
          {lang === "vi" ? (
            <>
              Chúng tôi xây dựng <span className="md:block text-ink-muted">website và phần mềm.</span>
            </>
          ) : (
            <>
              We build websites <span className="md:block text-ink-muted">and custom software.</span>
            </>
          )}
        </motion.h1>

        <motion.div {...rise(0.5)} className="grid md:grid-cols-12 gap-8 md:gap-6 border-t border-line pt-8">
          <p
            id="hero-subtitle"
            className="md:col-span-5 text-base md:text-lg text-ink-muted font-light leading-relaxed [text-wrap:pretty]"
          >
            {t.heroDesc}
          </p>

          <div className="hero-slogan md:col-span-3 md:col-start-7 font-mono text-xs uppercase tracking-[0.25em] text-ink-muted leading-loose">
            Every bug teaches.
            <br />
            Every build improves.
          </div>

          <div className="md:col-span-3 md:col-start-10 flex flex-col gap-3">
            <button
              onClick={() => scrollTo("app-contact-section")}
              className="btn-stacked w-full font-mono text-xs uppercase tracking-widest px-6 py-4 bg-brand-orange text-[#090909] font-semibold rounded-sm inline-flex items-center justify-between gap-3 group interactive focus-terminal active:scale-[0.98] transition-colors hover:bg-ink"
            >
              <span>{t.navStartProject}</span>
              <ArrowUpRightIcon size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
            <button
              onClick={() => scrollTo("app-work-section")}
              className="btn-stacked w-full font-mono text-xs uppercase tracking-widest px-6 py-4 border border-line text-ink rounded-sm inline-flex items-center justify-between gap-3 group interactive focus-terminal active:scale-[0.98] transition-colors hover:border-ink"
            >
              <span>{t.heroExplore}</span>
              <ArrowUpRightIcon size={14} className="text-ink-muted group-hover:text-ink transition-colors" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
