import React, { useState } from "react";
import { FAQ_DATA, TRANSLATIONS } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { FaPlus, FaMinus } from "react-icons/fa6";

interface FAQProps {
  lang: "vi" | "en";
}

export default function FAQ({ lang }: FAQProps) {
  const t = TRANSLATIONS[lang];
  const list = FAQ_DATA[lang];
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 md:py-32 bg-[#090909] border-t border-white/5 relative overflow-hidden">
      {/* Subtle background ambient glow */}
      <div className="absolute bottom-0 left-[10%] brutalist-glow opacity-25" style={{ filter: "blur(140px)" }} />

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange/10 border border-brand-orange/20 rounded-full font-mono text-[11px] text-brand-orange uppercase tracking-widest mb-4">
            <span>// {lang === "vi" ? "GIẢI ĐÁP BẰNG SỰ MINH BẠCH" : "RESOLVED WITH TRANSPARENCY"}</span>
          </div>
          <h2 className="font-display font-medium text-4xl md:text-5xl tracking-tight text-[#F5F5F3] mb-4">
            {t.faqTitle}
          </h2>
          <p className="font-sans text-sm text-[#8E8E93] max-w-lg mx-auto leading-relaxed">
            {lang === "vi"
              ? "Mọi thắc mắc về hợp đồng, tiến độ bàn giao và bảo hành đều được chúng tôi giải đáp công khai."
              : "Clear, straightforward answers about development workflows, source code ownership, and warranties."}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {list.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`border rounded-sm transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-[#141414] border-brand-orange/40 shadow-lg"
                    : "bg-[#0f0f0f] border-white/5 hover:border-white/20"
                }`}
              >
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => toggleItem(idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 text-[#F5F5F3] hover:text-brand-orange transition-colors duration-300"
                  aria-expanded={isOpen}
                  id={`faq-trigger-${idx}`}
                >
                  <span className="font-sans font-medium text-base md:text-lg tracking-tight leading-snug">
                    {item.question}
                  </span>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-[#8E8E93] transition-colors">
                    {isOpen ? (
                      <FaMinus className="w-3.5 h-3.5 text-brand-orange" />
                    ) : (
                      <FaPlus className="w-3.5 h-3.5" />
                    )}
                  </div>
                </button>

                {/* Accordion Content Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 pb-6 text-sm md:text-base text-[#8E8E93] leading-relaxed font-sans border-t border-white/5 pt-4">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
