import React, { useState } from "react";
import { FAQ_DATA, TRANSLATIONS } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";

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
        
        {/* Label Indicator */}
        <div className="flex items-center gap-3 mb-8 justify-center">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-brand-orange">
            {t.faqLabel}
          </span>
          <span className="h-[1px] w-12 bg-white/10" />
        </div>

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="font-display font-medium text-3xl md:text-4xl lg:text-5xl tracking-tight text-[#F5F5F3]">
            {t.faqHeading}
          </h2>
        </div>

        {/* Accordion List */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {list.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="border border-white/5 rounded-lg bg-[#111] overflow-hidden transition-all duration-300 hover:border-white/10"
                id={`faq-item-${idx}`}
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
                      <Minus className="w-4 h-4 text-brand-orange" />
                    ) : (
                      <Plus className="w-4 h-4" />
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
