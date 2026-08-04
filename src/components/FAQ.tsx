import React, { useState } from "react";
import { FAQ_DATA, TRANSLATIONS } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { FaPlus, FaMinus, FaMagnifyingGlass, FaMessage, FaArrowRight } from "react-icons/fa6";
import faqGif from "@/assets/animation-icon/faq.gif";

interface FAQProps {
  lang: "vi" | "en";
}

export default function FAQ({ lang }: FAQProps) {
  const t = TRANSLATIONS[lang];
  const list = FAQ_DATA[lang];
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const toggleItem = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  const handleScrollToContact = () => {
    const element = document.getElementById("app-contact-section") || document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const filteredList = list.filter(item => 
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="py-24 md:py-32 bg-[#090909] border-t border-white/5 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute bottom-0 left-[10%] brutalist-glow opacity-25" style={{ filter: "blur(140px)" }} />
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        
        {/* Lively Section Header with faq.gif Icon */}
        <div className="flex flex-col items-center text-center mb-12">
          
          {/* Animated FAQ Icon Badge */}
          <div className="faq-anim-icon-container w-16 h-16 rounded-2xl bg-[#111113] border border-white/15 p-2 shadow-2xl mb-6 flex items-center justify-center interactive hover:scale-105 transition-transform">
            <img src={faqGif} alt="FAQ Animated Icon" className="w-full h-full object-contain" />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-brand-orange/10 border border-brand-orange/20 rounded-full font-mono text-[11px] text-brand-orange uppercase tracking-widest mb-4">
            <span>// {lang === "vi" ? "GIẢI ĐÁP MINH BẠCH 100%" : "100% TRANSPARENT ANSWERS"}</span>
          </div>

          <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight text-[#F5F5F3] mb-4 uppercase leading-tight">
            {t.faqTitle}
          </h2>

          <p className="font-sans text-xs md:text-sm text-[#8E8E93] max-w-lg mx-auto leading-relaxed font-light">
            {lang === "vi"
              ? "Mọi thắc mắc về hợp đồng, tiến độ bàn giao, quyền sở hữu mã nguồn và bảo hành đều được chúng tôi giải đáp công khai."
              : "Clear, straightforward answers about development workflows, 100% source code ownership, and warranty guarantees."}
          </p>

          {/* Interactive Search Bar */}
          <div className="mt-8 w-full max-w-md relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === "vi" ? "Tìm câu hỏi (vd: bảo hành, mã nguồn, chi phí...)" : "Search FAQ (e.g., warranty, source code, timeline...)"}
              className="w-full bg-[#111113] border border-white/15 focus:border-brand-orange text-xs md:text-sm text-[#F5F5F3] placeholder-[#8E8E93] px-10 py-3 rounded-full outline-none transition-colors shadow-lg"
            />
            <FaMagnifyingGlass className="w-4 h-4 text-[#8E8E93] absolute left-4 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#8E8E93] hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Interactive Accordion List */}
        <div className="space-y-4">
          {filteredList.length === 0 ? (
            <div className="text-center py-12 bg-[#111113] border border-white/10 rounded-xl p-6">
              <p className="font-sans text-sm text-[#8E8E93]">
                {lang === "vi" ? "Không tìm thấy câu hỏi phù hợp. Hãy đặt câu hỏi trực tiếp cho đội ngũ Studio!" : "No matching questions found. Ask our team directly!"}
              </p>
              <button
                onClick={handleScrollToContact}
                className="mt-4 font-mono text-xs text-brand-orange underline font-bold"
              >
                {lang === "vi" ? "GỬI CÂU HỎI TRỰC TIẾP ✈" : "ASK A QUESTION DIRECTLY ✈"}
              </button>
            </div>
          ) : (
            filteredList.map((item, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className={`faq-item-box border rounded-xl transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "bg-[#141417] border-brand-orange/50 shadow-[0_0_25px_rgba(255,106,0,0.1)]"
                      : "bg-[#111113]/90 border-white/10 hover:border-white/20"
                  }`}
                >
                  {/* Accordion Trigger Header */}
                  <button
                    onClick={() => toggleItem(idx)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 group interactive"
                    aria-expanded={isOpen}
                    id={`faq-trigger-${idx}`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Number Badge */}
                      <span className="font-mono text-xs font-bold text-brand-orange bg-brand-orange/10 border border-brand-orange/20 px-2.5 py-1 rounded-md shrink-0">
                        0{idx + 1}
                      </span>
                      <span className="font-sans font-bold text-base md:text-lg tracking-tight text-[#F5F5F3] group-hover:text-brand-orange transition-colors leading-snug">
                        {item.question}
                      </span>
                    </div>

                    <div 
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                        isOpen 
                          ? "bg-brand-orange text-[#090909] border-brand-orange rotate-180" 
                          : "bg-white/5 border-white/10 text-[#8E8E93] group-hover:text-white"
                      }`}
                    >
                      {isOpen ? (
                        <FaMinus className="w-3.5 h-3.5" />
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
                        <div className="px-6 pb-6 text-sm md:text-base text-[#C0C0C5] leading-relaxed font-sans border-t border-white/5 pt-4 font-light">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

        {/* FAQ Footer Direct Consultation Callout */}
        <div className="mt-14 bg-[#111113] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center text-brand-orange shrink-0">
              <FaMessage className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-bold text-base md:text-lg text-[#F5F5F3]">
                {lang === "vi" ? "Vẫn Còn Câu Hỏi Khác Cần Giải Đáp?" : "Still Have Unanswered Questions?"}
              </h4>
              <p className="font-sans text-xs text-[#8E8E93] font-light mt-0.5">
                {lang === "vi" ? "Đội ngũ kỹ sư của chúng tôi sẵn sàng giải đáp 1-1 trực tiếp." : "Our engineering team is available for 1-on-1 direct consultations."}
              </p>
            </div>
          </div>

          <button
            onClick={handleScrollToContact}
            className="btn-stacked font-mono text-xs uppercase tracking-widest px-5 py-3 bg-brand-orange text-[#090909] font-bold rounded-sm inline-flex items-center gap-2 group shrink-0 interactive hover:bg-white hover:text-black transition-colors"
          >
            <span>{lang === "vi" ? "TƯ VẤN TRỰC TIẾP" : "ASK OUR ENGINEERS"}</span>
            <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}
