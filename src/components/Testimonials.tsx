import React, { useState } from "react";
import { TESTIMONIALS_DATA, TRANSLATIONS } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa6";

interface TestimonialsProps {
  lang: "vi" | "en";
}

export default function Testimonials({ lang }: TestimonialsProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const t = TRANSLATIONS[lang];
  const list = TESTIMONIALS_DATA[lang];

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % list.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + list.length) % list.length);
  };

  const activeTestimonial = list[activeIdx];

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-[#090909] border-t border-white/5 relative overflow-hidden">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 swiss-grid opacity-5 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center">
        
        {/* Quote Icon */}
        <div className="w-12 h-12 rounded-full bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange mb-8">
          <FaQuoteLeft className="w-5 h-5" />
        </div>

        {/* Dynamic Testimonial Card */}
        <div className="min-h-[220px] md:min-h-[200px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <blockquote className="font-display font-medium text-2xl md:text-3xl lg:text-4xl tracking-tight text-[#F5F5F3] leading-relaxed max-w-4xl mx-auto">
                "{activeTestimonial?.quote}"
              </blockquote>

              {/* Author Credits */}
              <cite className="block not-italic mt-8 md:mt-12">
                <span className="font-sans font-semibold text-sm md:text-base text-[#F5F5F3] block">
                  {activeTestimonial?.author}
                </span>
                <span className="font-mono text-[9px] tracking-widest text-[#8E8E93] uppercase block mt-1">
                  {activeTestimonial?.role} — <span className="text-brand-orange">{activeTestimonial?.company}</span>
                </span>
              </cite>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination & Arrow Controls */}
        <div className="flex items-center gap-6 mt-12 md:mt-16">
          {/* Prev button */}
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-white/10 hover:border-brand-orange text-[#8E8E93] hover:text-[#F5F5F3] flex items-center justify-center transition-all duration-300 interactive"
            aria-label="Previous quote"
            id="testimonial-prev-btn"
          >
            <FaChevronLeft className="w-3.5 h-3.5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {list.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  activeIdx === idx ? "w-6 bg-brand-orange" : "w-1.5 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Next button */}
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-white/10 hover:border-brand-orange text-[#8E8E93] hover:text-[#F5F5F3] flex items-center justify-center transition-all duration-300 interactive"
            aria-label="Next quote"
            id="testimonial-next-btn"
          >
            <FaChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
