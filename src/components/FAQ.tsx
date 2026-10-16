import React, { useState } from "react";
import { FAQ_DATA, TRANSLATIONS } from "../data";
import { motion, AnimatePresence } from "motion/react";
import {
  PlusIcon,
  MinusIcon,
  SearchIcon,
  ChatIcon,
  ArrowRightIcon,
  CheckIcon,
} from "./ui/MajesticIcon";
import faqGif from "@/assets/animation-icon/faq.gif";

interface FAQProps {
  lang: "vi" | "en";
}

export default function FAQ({ lang }: FAQProps) {
  const t = TRANSLATIONS[lang];
  const list = FAQ_DATA[lang];
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", labelVi: "Tất Cả (8)", labelEn: "All (8)" },
    { id: "ownership", labelVi: "Sở Hữu & Bản Quyền", labelEn: "Ownership & Code" },
    { id: "pricing", labelVi: "Chi Phí & 0đ Phí Ẩn", labelEn: "Pricing & 0đ Fees" },
    { id: "warranty", labelVi: "Bảo Hành & Tiến Độ", labelEn: "Warranty & Timeline" },
    { id: "quality", labelVi: "SEO & Bảo Mật NDA", labelEn: "SEO & NDA Security" },
  ];

  const toggleItem = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  const handleScrollToContact = () => {
    const element = document.getElementById("app-contact-section") || document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const filteredList = list.filter(item => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    if (!matchesCategory) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const matchesQuestion = item.question.toLowerCase().includes(q);
    const matchesAnswer = item.answer.toLowerCase().includes(q);
    const matchesBadge = item.badge ? item.badge.toLowerCase().includes(q) : false;
    const matchesBenefits = item.keyBenefits ? item.keyBenefits.some(b => b.toLowerCase().includes(q)) : false;
    return matchesQuestion || matchesAnswer || matchesBadge || matchesBenefits;
  });

  return (
    <section id="faq" className="py-24 md:py-32 bg-[#090909] border-t border-white/5 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute bottom-0 left-[10%] brutalist-glow opacity-25" style={{ filter: "blur(140px)" }} />
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        
        {/* Lively Section Header with Animated Icon */}
        <div className="flex flex-col items-center text-center mb-12">
          
          {/* Animated FAQ Icon Badge */}
          <div className="faq-anim-icon-container w-16 h-16 rounded-2xl bg-[#111113] border border-white/15 p-2 shadow-2xl mb-6 flex items-center justify-center interactive hover:scale-105 transition-transform">
            <img 
              src={faqGif} 
              alt="FAQ Animated Icon" 
              loading="lazy"
              decoding="async"
              width={64}
              height={64}
              className="w-full h-full object-contain" 
            />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-brand-orange/10 border border-brand-orange/20 rounded-sm font-mono text-[11px] text-brand-orange uppercase tracking-widest mb-4">
            <span>// {lang === "vi" ? "CAM KẾT MINH BẠCH VÌ LỢI ÍCH KHÁCH HÀNG" : "100% TRANSPARENT CLIENT GUARANTEES"}</span>
          </div>

          <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight text-[#F5F5F3] mb-4 uppercase leading-tight">
            {t.faqHeading}
          </h2>

          <p className="font-sans text-xs md:text-sm text-[#8E8E93] max-w-xl mx-auto leading-relaxed font-light">
            {lang === "vi"
              ? "Mọi chính sách về quyền sở hữu 100% mã nguồn, bảo hành kỹ thuật, tiến độ bàn giao và bảo mật NDA đều được chúng tôi công khai minh bạch để bảo vệ tối đa lợi ích của bạn."
              : "Clear, binding commitments covering 100% source code ownership, warranty support, strict NDA privacy, and zero hidden fees."}
          </p>

          {/* Interactive Search Bar */}
          <div className="mt-8 w-full max-w-md relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === "vi" ? "Tìm câu hỏi (vd: bảo hành, mã nguồn, chi phí, SEO...)" : "Search FAQ (e.g., ownership, warranty, fees, SEO...)"}
              className="w-full bg-[#111113] border border-white/15 focus:border-brand-orange text-xs md:text-sm text-[#F5F5F3] placeholder-[#8E8E93] px-10 py-3 rounded-sm outline-none transition-colors shadow-lg"
            />
            <SearchIcon size={16} className="w-4 h-4 text-[#8E8E93] absolute left-4 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#8E8E93] hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Filter Category Tabs */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const label = lang === "vi" ? cat.labelVi : cat.labelEn;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`font-mono text-[10px] md:text-[11px] uppercase tracking-wider px-3.5 py-1.5 rounded-sm transition-all duration-200 border ${
                    isSelected
                      ? "bg-brand-orange text-[#090909] font-bold border-brand-orange shadow-md shadow-brand-orange/20 scale-105"
                      : "bg-[#111113] text-[#8E8E93] border-white/10 hover:border-white/25 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Result count indicator */}
          <div className="mt-3 font-mono text-[10px] text-[#8E8E93]/70">
            {lang === "vi"
              ? `Hiển thị ${filteredList.length} / ${list.length} cam kết minh bạch`
              : `Showing ${filteredList.length} of ${list.length} transparent guarantees`}
          </div>
        </div>

        {/* Dynamic Interactive Accordion List */}
        <div className="space-y-4">
          {filteredList.length === 0 ? (
            <div className="text-center py-12 bg-[#111113] border border-white/10 rounded-xl p-6">
              <p className="font-sans text-sm text-[#8E8E93]">
                {lang === "vi" ? "Không tìm thấy câu hỏi phù hợp. Hãy kết nối trực tiếp cùng đội ngũ kỹ sư của Studio!" : "No matching questions found. Consult directly with our engineering team!"}
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
                    className="w-full px-5 sm:px-6 py-5 text-left flex items-start sm:items-center justify-between gap-4 group interactive"
                    aria-expanded={isOpen}
                    id={`faq-trigger-${idx}`}
                  >
                    <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 flex-1">
                      {/* Number Badge */}
                      <span className="font-mono text-xs font-bold text-brand-orange bg-brand-orange/10 border border-brand-orange/20 px-2.5 py-1 rounded-md shrink-0 mt-0.5 sm:mt-0">
                        0{idx + 1}
                      </span>

                      <div className="flex-1">
                        {item.badge && (
                          <div className="mb-1.5 sm:mb-1">
                            <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-sm font-bold">
                              <span className="w-1.5 h-1.5 rounded-sm bg-emerald-400" />
                              <span>{item.badge}</span>
                            </span>
                          </div>
                        )}
                        <h3 className="font-sans font-bold text-base md:text-lg tracking-tight text-[#F5F5F3] group-hover:text-brand-orange transition-colors leading-snug">
                          {item.question}
                        </h3>
                      </div>
                    </div>

                    <div 
                      className={`flex-shrink-0 w-8 h-8 rounded-sm flex items-center justify-center border transition-all duration-300 mt-1 sm:mt-0 ${
                        isOpen 
                          ? "bg-brand-orange text-[#090909] border-brand-orange rotate-180" 
                          : "bg-white/5 border-white/10 text-[#8E8E93] group-hover:text-white"
                      }`}
                    >
                      {isOpen ? (
                        <MinusIcon size={14} className="w-3.5 h-3.5" />
                      ) : (
                        <PlusIcon size={14} className="w-3.5 h-3.5" />
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
                        <div className="px-5 sm:px-6 pb-6 text-sm md:text-base text-[#D4D4D8] leading-relaxed font-sans border-t border-white/5 pt-4 font-light">
                          <p className="leading-relaxed">{item.answer}</p>

                          {/* Key Benefits Checklist Box */}
                          {item.keyBenefits && item.keyBenefits.length > 0 && (
                            <div className="mt-5 p-4 rounded-lg bg-[#0b0b0d] border border-white/10 space-y-2.5">
                              <div className="flex items-center gap-2 text-brand-orange font-mono text-[10px] uppercase tracking-wider font-bold">
                                <CheckIcon size={14} className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                                <span>{lang === "vi" ? "QUYỀN LỢI CAM KẾT BẢO ĐẢM CHO BẠN:" : "GUARANTEED CLIENT BENEFITS:"}</span>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                                {item.keyBenefits.map((benefit, bIdx) => (
                                  <div key={bIdx} className="flex items-start gap-2 text-xs text-[#E4E4E7]">
                                    <span className="w-1.5 h-1.5 rounded-sm bg-emerald-400 mt-1.5 shrink-0" />
                                    <span className="font-sans leading-relaxed">{benefit}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
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
              <ChatIcon size={20} className="w-5 h-5" />
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
            <ArrowRightIcon size={14} className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}
