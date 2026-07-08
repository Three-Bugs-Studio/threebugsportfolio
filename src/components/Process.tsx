import React, { useState } from "react";
import { PROCESS_DATA, TRANSLATIONS } from "../data";
import { motion } from "motion/react";
import { ArrowRight, Box, Calendar, Cpu, Layers, Milestone, Check } from "lucide-react";

interface ProcessProps {
  lang: "vi" | "en";
}

export default function Process({ lang }: ProcessProps) {
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  const t = TRANSLATIONS[lang];
  const stepsList = PROCESS_DATA[lang];

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="process" className="py-24 md:py-32 bg-[#090909] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-brand-orange">
                {t.processLabel}
              </span>
              <span className="h-[1px] w-12 bg-white/10" />
            </div>
            <h2 className="font-display font-medium text-4xl md:text-6xl tracking-tight text-[#F5F5F3] leading-[1.05]">
              {t.processHeading}
            </h2>
          </div>
          <p className="font-mono text-xs text-[#8E8E93] max-w-xs leading-relaxed">
            {lang === "vi" 
              ? "QUY TRÌNH PHÁT TRIỂN CHUẨN HOÁ, ĐẢM BẢO TỐC ĐỘ, CHẤT LƯỢNG MÃ NGUỒN VÀ ĐỘ BẢO MẬT TUYỆT ĐỐI."
              : "OUR PREDICTABLE, PHASED PROCESS FOR DESIGNING, ENGINEERING, AND SHIPPING SECURE HIGH-END APPLICATIONS."}
          </p>
        </motion.div>

        {/* Desktop View: Process Timeline Grid Layout */}
        <div className="hidden lg:grid grid-cols-12 gap-12 items-start" id="timeline-box-desktop">
          
          {/* Left Side: Step Selector List (Grid-Span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {stepsList.map((step, idx) => {
              const isActive = activeStepIdx === idx;
 
              return (
                <motion.button
                  key={step.number}
                  id={`process-btn-${idx}`}
                  onClick={() => setActiveStepIdx(idx)}
                  variants={itemVariants}
                  className={`flex items-center justify-between text-left p-6 border transition-all duration-300 rounded-sm cursor-pointer focus:outline-none w-full group interactive ${
                    isActive
                      ? "bg-[#121212]/55 border-white/10 shadow-lg"
                      : "bg-transparent border-white/5 hover:border-white/10 hover:bg-[#121212]/10"
                  }`}
                >
                  <div className="flex items-center gap-5">
                    {/* Index Number */}
                    <span className={`font-mono text-sm tracking-wider font-semibold ${
                      isActive ? "text-brand-orange" : "text-[#8E8E93] group-hover:text-[#F5F5F3]"
                    }`}>
                      {step.number}
                    </span>
 
                    {/* Stage Title */}
                    <div>
                      <span className={`font-display font-medium text-lg md:text-xl transition-colors ${
                        isActive ? "text-[#F5F5F3]" : "text-[#8E8E93] group-hover:text-[#F5F5F3]"
                      }`}>
                        {step.title}
                      </span>
                    </div>
                  </div>
 
                  {/* Stage Duration Tag */}
                  <span className={`font-mono text-[9px] tracking-widest uppercase px-2.5 py-1 border rounded-sm transition-all ${
                    isActive
                      ? "bg-brand-orange/10 border-brand-orange text-brand-orange"
                      : "bg-white/5 border-white/5 text-[#8E8E93]"
                  }`}>
                    {step.duration}
                  </span>
                </motion.button>
              );
            })}
          </div>
 
          {/* Right Side: Step Details View (Grid-Span 7) */}
          <div className="lg:col-span-7">
            <motion.div variants={itemVariants} className="bg-[#121212]/20 border border-white/5 hover:border-white/10 p-8 md:p-12 min-h-[380px] flex flex-col justify-between rounded-sm relative overflow-hidden transition-all duration-300">
              
              {/* Background faint giant decorative stage indicator */}
              <div className="absolute right-[-10px] bottom-[-20px] font-display font-bold text-9xl text-white/[0.02] select-none pointer-events-none">
                {stepsList[activeStepIdx]?.number}
              </div>
 
              {/* Step Header */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Milestone className="w-4 h-4 text-brand-orange" />
                  <span className="font-mono text-[10px] tracking-widest text-[#8E8E93] uppercase">
                    {lang === "vi" ? "GIAI ĐOẠN" : "PHASE"} {stepsList[activeStepIdx]?.number} / 05 — {stepsList[activeStepIdx]?.duration}
                  </span>
                </div>
 
                <h3 className="font-display font-medium text-2xl md:text-3xl text-[#F5F5F3] mb-6">
                  {stepsList[activeStepIdx]?.title}
                </h3>
 
                <p className="font-sans text-sm md:text-base text-[#8E8E93] font-light leading-relaxed mb-8 max-w-xl">
                  {stepsList[activeStepIdx]?.description}
                </p>
              </div>
 
              {/* Stage Deliverables */}
              <div className="border-t border-white/5 pt-6">
                <span className="font-mono text-[9px] tracking-widest text-brand-orange uppercase block mb-4">
                  {t.processDeliverables}
                </span>
 
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {stepsList[activeStepIdx]?.deliverables.map((deliv, dIdx) => (
                    <div key={deliv} className="flex items-center gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0 border border-brand-orange/20">
                        <Check className="w-2.5 h-2.5 text-brand-orange" />
                      </div>
                      <span className="font-sans text-xs text-[#F5F5F3] font-light">
                        {deliv}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
 
            </motion.div>
          </div>
        </div>

        {/* Mobile View: Process Timeline Accordion List */}
        <div className="flex flex-col gap-4 lg:hidden" id="timeline-box-mobile">
          {stepsList.map((step, idx) => {
            const isActive = activeStepIdx === idx;

            return (
              <div
                key={step.number}
                className={`border rounded-sm transition-all duration-300 overflow-hidden ${
                  isActive
                    ? "bg-[#121212]/55 border-brand-orange/30 shadow-lg"
                    : "bg-[#121212]/10 border-white/5"
                }`}
              >
                {/* Accordion Header Button */}
                <button
                  type="button"
                  onClick={() => setActiveStepIdx(isActive ? -1 : idx)}
                  className="flex items-center justify-between text-left p-5 w-full cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-4">
                    <span className={`font-mono text-xs font-semibold ${isActive ? "text-brand-orange" : "text-[#8E8E93]"}`}>
                      {step.number}
                    </span>
                    <span className="font-display font-medium text-base text-[#F5F5F3]">
                      {step.title}
                    </span>
                  </div>
                  <span className={`font-mono text-[8px] px-2 py-0.5 border rounded-sm ${
                    isActive ? "bg-brand-orange/10 border-brand-orange text-brand-orange" : "bg-white/5 border-white/5 text-[#8E8E93]"
                  }`}>
                    {step.duration}
                  </span>
                </button>

                {/* Accordion Content Panel */}
                {isActive && (
                  <div className="px-5 pb-5 pt-2 border-t border-white/5 space-y-4 text-left">
                    <p className="font-sans text-xs text-[#8E8E93] leading-relaxed">
                      {step.description}
                    </p>

                    <div className="pt-4 border-t border-white/5">
                      <span className="font-mono text-[8px] tracking-widest text-brand-orange uppercase block mb-3">
                        {t.processDeliverables}
                      </span>
                      <div className="flex flex-col gap-2">
                        {step.deliverables.map((deliv) => (
                          <div key={deliv} className="flex items-center gap-2">
                            <div className="w-3.5 h-3.5 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0 border border-brand-orange/20">
                              <Check className="w-2 h-2 text-brand-orange" />
                            </div>
                            <span className="font-sans text-xs text-[#F5F5F3] font-light">
                              {deliv}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
