import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface SectionInfo {
  id: string;
  code: string;
  nameEn: string;
  nameVi: string;
}

const SECTIONS: SectionInfo[] = [
  { id: "hero", code: "SEC_00", nameEn: "HERO_SPLASH", nameVi: "TRANG CHỦ" },
  { id: "app-about-section", code: "SEC_01", nameEn: "ABOUT PHILOSOPHY", nameVi: "TRIẾT LÝ HOẠT ĐỘNG" },
  { id: "app-services-section", code: "SEC_02", nameEn: "CORE CAPABILITIES", nameVi: "CÔNG NGHỆ & DỊCH VỤ" },
  { id: "app-work-section", code: "SEC_03", nameEn: "SELECTED PORTFOLIO", nameVi: "SẢN PHẨM TIÊU BIỂU" },
  { id: "app-process-section", code: "SEC_04", nameEn: "ENGINEERING FLOW", nameVi: "QUY TRÌNH PHÁT TRIỂN" },
  { id: "app-pricing-section", code: "SEC_04_ALT", nameEn: "PHASE PRICING", nameVi: "BÁO GIÁ THEO PHASE" },
  { id: "app-technology-section", code: "SEC_05", nameEn: "SYSTEM STACK", nameVi: "HỆ THỐNG CÔNG NGHỆ" },
  { id: "app-team-section", code: "SEC_06", nameEn: "STUDIO FOUNDERS", nameVi: "SƠ ĐỒ & ĐỘI NGŨ" },
  { id: "app-testimonials-section", code: "SEC_07", nameEn: "PARTNER REVIEWS", nameVi: "ĐÁNH GIÁ ĐỐI TÁC" },
  { id: "app-faq-section", code: "SEC_08", nameEn: "FAQ RESOLUTIONS", nameVi: "GIẢI ĐÁP THẮC MẮC" },
  { id: "app-contact-section", code: "SEC_09", nameEn: "INQUIRY PORTAL", nameVi: "LIÊN HỆ ĐẶT HÀNG" }
];

interface DotNavigationProps {
  lang: "vi" | "en";
}

export default function DotNavigation({ lang }: DotNavigationProps) {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 280; // offset to trigger slightly early for natural alignment

      // Find which section is currently in view
      let currentSection = SECTIONS[0].id;
      for (const sec of SECTIONS) {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentSection = sec.id;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once initially to capture current view state
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // aligns correctly with standard header offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div
      id="dot-navigation-menu"
      className="fixed right-6 top-1/2 -translate-y-1/2 z-[999] hidden lg:flex flex-col gap-3 select-none"
    >
      {SECTIONS.map((sec) => {
        const isActive = activeSection === sec.id;
        const isHovered = hoveredSection === sec.id;
        const name = lang === "vi" ? sec.nameVi : sec.nameEn;

        return (
          <div
            key={sec.id}
            className="flex items-center justify-end gap-3.5 group relative"
            onMouseEnter={() => setHoveredSection(sec.id)}
            onMouseLeave={() => setHoveredSection(null)}
          >
            {/* Retro Slidout Tooltip Label */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, x: 12, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 12, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 450, damping: 22 }}
                  className="bg-[#090909]/95 border border-brand-orange/40 text-brand-orange px-2.5 py-1 rounded-xs font-mono text-[9px] tracking-widest uppercase flex items-center gap-1.5 shadow-xl pointer-events-none whitespace-nowrap"
                  id={`dot-tooltip-${sec.id}`}
                >
                  <span className="opacity-50">[{sec.code}]</span>
                  <span className="text-white font-medium">{name}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Custom 8-bit Pixel Dot Trigger */}
            <button
              onClick={() => handleScrollTo(sec.id)}
              className="relative w-5 h-5 flex items-center justify-center cursor-pointer interactive"
              aria-label={`Scroll to ${name}`}
              id={`dot-btn-${sec.id}`}
            >
              {/* Outer Alignment Pixel Box */}
              <motion.div
                className={`w-3.5 h-3.5 border transition-colors duration-200 rounded-2xs ${
                  isActive
                    ? "border-brand-orange bg-brand-orange/15 shadow-[0_0_8px_rgba(255,106,0,0.4)]"
                    : "border-white/25 hover:border-brand-orange"
                }`}
                animate={{
                  rotate: isActive ? 45 : 0,
                  scale: isActive ? 1.15 : (isHovered ? 1.1 : 1)
                }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
              >
                {/* Inner Pixel Center Core */}
                <div
                  className={`w-1.5 h-1.5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
                    isActive
                      ? "bg-brand-orange rounded-3xs"
                      : "bg-white/30 group-hover:bg-brand-orange/70"
                  }`}
                />
              </motion.div>
            </button>
          </div>
        );
      })}
    </div>
  );
}
