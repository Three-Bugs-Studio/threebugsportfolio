import React, { useState } from "react";
import { TECH_DATA, TRANSLATIONS } from "../data";
import { motion } from "motion/react";
import TechIcon from "./TechIcon";

interface TechnologyProps {
  lang: "vi" | "en";
}

export default function Technology({ lang }: TechnologyProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const t = TRANSLATIONS[lang];
  const techList = TECH_DATA[lang];

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="technology" className="py-24 md:py-32 bg-[#090909] border-t border-white/5 relative overflow-hidden">
      {/* Decorative subtle top lights */}
      <div className="absolute top-[20%] left-[-10%] brutalist-glow opacity-30" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-brand-orange">
                {t.techLabel}
              </span>
              <span className="h-[1px] w-12 bg-white/10" />
            </div>
            <h2 className="font-display font-medium text-4xl md:text-6xl tracking-tight text-[#F5F5F3] leading-[1.05]">
              {t.techHeading}
            </h2>
          </div>
          <p className="font-mono text-xs text-[#8E8E93] max-w-xs leading-relaxed">
            {t.techSubtitle}
          </p>
        </motion.div>

        {/* Technical Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 border-l border-t border-white/5" id="tech-grid">
          {techList.map((tech, idx) => {
            const isHovered = hoveredIdx === idx;

            return (
              <motion.div
                key={tech.name}
                id={`tech-cell-${idx}`}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                variants={itemVariants}
                className="group p-6 md:p-8 bg-transparent border-r border-b border-white/5 hover:bg-[#121212]/30 transition-all duration-300 relative overflow-hidden flex flex-col justify-between min-h-[190px] cursor-default select-none"
              >
                {/* Spotlight background gradient hover effect */}
                <div
                  className={`absolute inset-0 bg-[radial-gradient(circle_at_var(--x,_50%)_var(--y,_50%),_rgba(255,_106,_0,_0.05)_0%,_transparent_60%)] pointer-events-none transition-opacity duration-500 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                  style={
                    {
                      "--x": "50%",
                      "--y": "50%"
                    } as React.CSSProperties
                  }
                />

                {/* Top Corner Orange Indicator */}
                <span className={`absolute top-0 right-0 w-1.5 h-1.5 bg-brand-orange transition-transform duration-300 ${
                  isHovered ? "scale-100" : "scale-0"
                }`} />

                {/* Header (Real Tech Brand Logo + Category Tag) */}
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-sm border transition-all flex items-center justify-center ${
                    isHovered ? "border-brand-orange/40 bg-brand-orange/10 shadow-[0_0_15px_rgba(255,106,0,0.15)]" : "border-white/10 bg-white/[0.03]"
                  }`}>
                    <TechIcon name={tech.name} className="w-6 h-6 text-xl" />
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#8E8E93] bg-white/5 px-2 py-0.5 rounded-sm border border-white/5">
                    [{tech.category}]
                  </span>
                </div>

                {/* Tech Title */}
                <div className="mt-6">
                  <h3 className="font-display font-medium text-xl md:text-2xl text-[#F5F5F3] group-hover:text-brand-orange transition-colors">
                    {tech.name}
                  </h3>
                  <p className="font-sans text-[11px] text-[#8E8E93] font-light leading-relaxed mt-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                    {tech.description}
                  </p>
                </div>

                {/* Bottom Core Level Indicator */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="font-mono text-[9px] text-[#8E8E93]">{lang === "vi" ? "CẤP ĐỘ" : "LEVEL"}</span>
                  <span className="font-mono text-[9px] text-[#F5F5F3] tracking-widest uppercase">
                    {tech.level}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
