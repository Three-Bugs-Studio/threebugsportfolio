import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FaComments, FaXmark, FaPhone, FaEnvelope, FaArrowUpRightFromSquare, FaArrowRight } from "react-icons/fa6";
import { SiZalo } from "react-icons/si";

interface QuickContactWidgetProps {
  lang: "vi" | "en";
  theme?: "dark" | "light";
}

export default function QuickContactWidget({ lang, theme = "dark" }: QuickContactWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isLight = theme === "light";

  const handleScrollToContact = () => {
    setIsOpen(false);
    const element = document.getElementById("app-contact-section");
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none" id="quick-contact-widget">
      {/* Expanded Quick Action Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute bottom-16 right-0 w-80 p-5 rounded-sm border shadow-2xl backdrop-blur-xl ${
              isLight
                ? "bg-white/95 border-slate-200 text-slate-900 shadow-slate-300/50"
                : "bg-[#111112]/95 border-white/10 text-white shadow-black/80"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-brand-orange block">
                  // {lang === "vi" ? "KẾT NỐI TRỰC TIẾP" : "DIRECT CONNECT"}
                </span>
                <h4 className="font-display font-bold text-sm tracking-tight mt-0.5">
                  {lang === "vi" ? "Tư Vấn & Báo Giá Nhanh" : "Fast Inquiry & Chat"}
                </h4>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className={`p-1.5 rounded-sm transition-colors cursor-pointer ${
                  isLight ? "text-slate-500 hover:text-slate-900" : "text-[#8E8E93] hover:text-white"
                }`}
                aria-label="Đóng cửa sổ tư vấn nhanh"
              >
                <FaXmark className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Contact Links */}
            <div className="flex flex-col gap-2.5">
              {/* Consultant 1: Hoang Do */}
              <div
                className={`p-2.5 rounded-sm border transition-all duration-200 ${
                  isLight
                    ? "bg-blue-50/70 border-blue-200/80 text-slate-900"
                    : "bg-[#0c1220] border-[#0068FF]/30 text-white"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-display font-bold text-xs">
                      Hoàng Đỗ
                    </span>
                    <span className="font-mono text-[9px] text-[#8E8E93]">
                      ({lang === "vi" ? "Tư Vấn Hồ Sơ" : "Consultant"})
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="https://zalo.me/0392996307"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#0068FF] hover:bg-[#0052cc] text-white py-1.5 px-2.5 rounded-sm font-mono text-[10px] font-bold transition-colors shadow-sm"
                  >
                    <SiZalo className="w-3.5 h-3.5" />
                    <span>Zalo Chat</span>
                  </a>
                  <a
                    href="tel:0392996307"
                    className={`inline-flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-sm font-mono text-[10px] border transition-colors ${
                      isLight
                        ? "bg-white border-slate-300 text-slate-800 hover:border-brand-orange"
                        : "bg-[#18181b] border-white/10 text-white hover:border-brand-orange/40"
                    }`}
                    title="Gọi Hoàng Đỗ"
                  >
                    <FaPhone className="w-3 h-3 text-brand-orange" />
                    <span>0392.996.307</span>
                  </a>
                </div>
              </div>

              {/* Consultant 2: Minh Duc */}
              <div
                className={`p-2.5 rounded-sm border transition-all duration-200 ${
                  isLight
                    ? "bg-blue-50/70 border-blue-200/80 text-slate-900"
                    : "bg-[#0c1220] border-[#0068FF]/30 text-white"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-display font-bold text-xs">
                      Minh Đức
                    </span>
                    <span className="font-mono text-[9px] text-[#8E8E93]">
                      ({lang === "vi" ? "Tư Vấn Kỹ Thuật" : "Tech Consultant"})
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="https://zalo.me/0867474204"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#0068FF] hover:bg-[#0052cc] text-white py-1.5 px-2.5 rounded-sm font-mono text-[10px] font-bold transition-colors shadow-sm"
                  >
                    <SiZalo className="w-3.5 h-3.5" />
                    <span>Zalo Chat</span>
                  </a>
                  <a
                    href="tel:0867474204"
                    className={`inline-flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-sm font-mono text-[10px] border transition-colors ${
                      isLight
                        ? "bg-white border-slate-300 text-slate-800 hover:border-brand-orange"
                        : "bg-[#18181b] border-white/10 text-white hover:border-brand-orange/40"
                    }`}
                    title="Gọi Minh Đức"
                  >
                    <FaPhone className="w-3 h-3 text-brand-orange" />
                    <span>0867.474.204</span>
                  </a>
                </div>
              </div>

              {/* Email Direct */}
              <a
                href="mailto:dongduong840@gmail.com"
                className={`flex items-center justify-between p-2.5 rounded-sm border transition-all duration-200 group ${
                  isLight
                    ? "bg-slate-50 border-slate-200 hover:border-slate-400 text-slate-900"
                    : "bg-[#161618] border-white/5 hover:border-white/20 text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-white/10 text-white flex items-center justify-center text-xs shrink-0">
                    <FaEnvelope className="w-3 h-3 text-slate-400" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-[#8E8E93] truncate max-w-[170px] block">
                      dongduong840@gmail.com
                    </span>
                  </div>
                </div>
                <FaArrowUpRightFromSquare className="w-3 h-3 text-slate-400 opacity-70 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>

            {/* Jump to Contact Form CTA */}
            <button
              onClick={handleScrollToContact}
              className="mt-3.5 w-full bg-brand-orange hover:bg-brand-orange/90 text-[#090909] font-mono text-[10px] font-bold uppercase tracking-wider py-2.5 px-4 rounded-sm flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer shadow-lg shadow-brand-orange/10"
            >
              <span>{lang === "vi" ? "Điền Form Yêu Cầu Chi Tiết" : "Fill Consultation Form"}</span>
              <FaArrowRight className="w-3 h-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={lang === "vi" ? "Mở hộp thoại liên hệ nhanh" : "Open quick contact widget"}
        className="relative flex items-center gap-2.5 bg-brand-orange hover:bg-brand-orange/95 text-[#090909] font-mono text-xs font-bold uppercase tracking-wider px-4 py-3 rounded-full shadow-2xl shadow-brand-orange/20 cursor-pointer interactive border-2 border-[#090909]/40"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
        </span>
        {isOpen ? (
          <>
            <FaXmark className="w-4 h-4" />
            <span>{lang === "vi" ? "ĐÓNG" : "CLOSE"}</span>
          </>
        ) : (
          <>
            <FaComments className="w-4 h-4" />
            <span>{lang === "vi" ? "TƯ VẤN NHANH" : "QUICK CHAT"}</span>
          </>
        )}
      </motion.button>
    </div>
  );
}
