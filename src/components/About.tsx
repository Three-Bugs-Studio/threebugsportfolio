import React, { useState } from "react";
import { motion } from "motion/react";
import { VALUES_DATA, TRANSLATIONS } from "../data";

interface AboutProps {
  lang: "vi" | "en";
}

export default function About({ lang }: AboutProps) {
  const t = TRANSLATIONS[lang];
  const [isExpanded, setIsExpanded] = useState(false);

  // Animating values variants with a high-end subtle entrance
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="about" className="py-24 md:py-32 bg-[#090909] border-t border-white/5 relative">
      {/* Swiss grid alignment indicator guides (subtle background layout lines) */}
      <div className="absolute inset-0 flex justify-between px-6 md:px-12 pointer-events-none opacity-5">
        <div className="w-[1px] h-full bg-white" />
        <div className="w-[1px] h-full bg-white hidden md:block" />
        <div className="w-[1px] h-full bg-white hidden lg:block" />
        <div className="w-[1px] h-full bg-white" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Label Header */}
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-brand-orange">
            {t.aboutLabel}
          </span>
          <span className="h-[1px] w-12 bg-white/10" />
        </motion.div>

        {/* Editorial Philosophy Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 mb-24 md:mb-32">
          <div className="lg:col-span-8">
            <motion.h2
              variants={itemVariants}
              className="font-display font-medium text-3xl md:text-5xl lg:text-6xl tracking-tight text-[#F5F5F3] leading-[1.15]"
            >
              {t.aboutHeading}
            </motion.h2>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-end gap-4">
            <motion.p
              variants={itemVariants}
              className="font-sans text-sm md:text-base text-[#8E8E93] font-light leading-relaxed"
            >
              {t.aboutBody1}
            </motion.p>
            
            <div className="overflow-hidden w-full">
              <motion.div
                initial={false}
                animate={{
                  height: isExpanded ? "auto" : 0,
                  opacity: isExpanded ? 1 : 0,
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <p className="font-sans text-xs md:text-sm text-[#8E8E93]/70 font-light leading-relaxed border-l border-brand-orange/30 pl-4 py-1">
                  {t.aboutBody2}
                </p>
              </motion.div>
            </div>

            <motion.button
              variants={itemVariants}
              onClick={() => setIsExpanded(!isExpanded)}
              className="font-mono text-[9px] tracking-[0.2em] text-brand-orange uppercase hover:text-[#F5F5F3] transition-colors flex items-center gap-1 focus:outline-none cursor-pointer mt-1 self-start select-none interactive"
              id="about-toggle-button"
            >
              {isExpanded ? (lang === "vi" ? "[ THU GỌN - ]" : "[ READ LESS - ]") : (lang === "vi" ? "[ ĐỌC THÊM + ]" : "[ READ MORE + ]")}
            </motion.button>
          </div>
        </div>

        {/* Studio Values / Pillars Section */}
        <div id="values" className="pt-16 border-t border-white/5">
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-16">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#8E8E93]">
              {lang === "vi" ? "TRỤ CỘT THIẾT KẾ" : "STUDIO PILLARS"}
            </span>
            <span className="font-sans text-xs text-[#8E8E93] font-light">
              {lang === "vi" ? "BA NGUYÊN TẮC QUẢN TRỊ MỌI BẢN DỰNG" : "THREE PRINCIPLES THAT GOVERN EVERY BUILD"}
            </span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {VALUES_DATA[lang].map((value) => {
              // Custom SVG vectors to represent the values visually
              return (
                <motion.div
                  key={value.id}
                  id={`value-card-${value.id}`}
                  variants={itemVariants}
                  className="group flex flex-col p-8 bg-[#121212]/30 border border-white/5 hover:border-white/10 transition-all duration-300 relative overflow-hidden rounded-sm"
                >
                  {/* Subtle top edge glow */}
                  <span className="absolute top-0 left-0 w-0 h-[1.5px] bg-brand-orange group-hover:w-full transition-all duration-500 ease-out" />

                  {/* Visual Motif (Isometric Geometry in SVG) */}
                  <div className="h-32 w-full flex items-center justify-center mb-8 bg-[#090909]/40 border border-white/5 rounded-sm relative overflow-hidden group-hover:bg-[#090909]/60 transition-colors">
                    {value.id === "foundation" && (
                      <svg viewBox="0 0 100 100" className="w-16 h-16 opacity-40 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500">
                        {/* Foundation Isometric Cube Wireframe */}
                        <path d="M 50,20 L 80,35 L 80,65 L 50,80 L 20,65 L 20,35 Z" stroke="#F5F5F3" strokeWidth="1" fill="none" />
                        <path d="M 50,20 L 50,80" stroke="#F5F5F3" strokeWidth="0.5" />
                        <path d="M 20,35 L 50,50 L 80,35" stroke="#F5F5F3" strokeWidth="0.5" fill="none" />
                        <line x1="50" y1="50" x2="50" y2="80" stroke="#FF6A00" strokeWidth="1.5" />
                        <circle cx="50" cy="50" r="3" fill="#FF6A00" />
                      </svg>
                    )}

                    {value.id === "craft" && (
                      <svg viewBox="0 0 100 100" className="w-16 h-16 opacity-40 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500">
                        {/* Craft Bezier Vector Layout */}
                        <path d="M 15,50 C 35,20, 65,80, 85,50" stroke="#F5F5F3" strokeWidth="1" fill="none" />
                        <line x1="30" y1="30" x2="30" y2="70" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
                        <line x1="70" y1="30" x2="70" y2="70" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
                        {/* Interaction nodes */}
                        <rect x="27.5" y="47.5" width="5" height="5" fill="#FF6A00" stroke="#090909" strokeWidth="1" />
                        <rect x="67.5" y="47.5" width="5" height="5" fill="#FF6A00" stroke="#090909" strokeWidth="1" />
                        <circle cx="15" cy="50" r="2.5" fill="#F5F5F3" />
                        <circle cx="85" cy="50" r="2.5" fill="#F5F5F3" />
                      </svg>
                    )}

                    {value.id === "partnership" && (
                      <svg viewBox="0 0 100 100" className="w-16 h-16 opacity-40 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500">
                        {/* Partnership Intersecting Circles */}
                        <circle cx="38" cy="50" r="16" stroke="#F5F5F3" strokeWidth="1" fill="none" />
                        <circle cx="62" cy="50" r="16" stroke="#F5F5F3" strokeWidth="1" fill="none" />
                        {/* Intersection segment highlight */}
                        <path d="M 50,37.5 A 16,16 0 0,0 50,62.5 A 16,16 0 0,0 50,37.5 Z" fill="rgba(255, 106, 0, 0.15)" stroke="#FF6A00" strokeWidth="1" />
                        <circle cx="50" cy="50" r="2.5" fill="#FF6A00" />
                      </svg>
                    )}
                  </div>

                  {/* Value Label */}
                  <div className="font-mono text-[10px] uppercase tracking-widest text-brand-orange mb-3 flex items-center gap-1.5">
                    <span>//</span> {value.subtitle}
                  </div>

                  {/* Value Title */}
                  <h3 className="font-display font-medium text-xl text-[#F5F5F3] mb-4">
                    {value.title}
                  </h3>

                  {/* Value Description */}
                  <p className="font-sans text-xs text-[#8E8E93] leading-relaxed font-light">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
