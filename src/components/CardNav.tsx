import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import ThemeSwitch from "./ThemeSwitch";
import { motion, AnimatePresence } from "motion/react";
import { MenuIcon, CloseIcon, ArrowUpRightIcon, SpeakerIcon } from "./ui/MajesticIcon";
import { TRANSLATIONS } from "../data";
import { audioManager } from "../lib/audioManager";

export interface CardNavLink {
  label: string;
  hint: string;
  href: string;
}

export interface CardNavItem {
  label: string;
  links: CardNavLink[];
}

export interface CardNavProps {
  lang?: "vi" | "en";
  onLangChange?: (lang: "vi" | "en") => void;
  logo?: React.ReactNode;
  logoAlt?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
  ease?: string;
  theme?: "dark" | "light";
  onThemeToggle?: (e?: React.MouseEvent) => void;
}

export default function CardNav({
  lang = "vi",
  onLangChange,
  baseColor = "#090909",
  menuColor = "#FF6A00",
  buttonBgColor = "#FF6A00",
  buttonTextColor = "#090909",
  theme = "dark",
  onThemeToggle,
}: CardNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSfxOn, setIsSfxOn] = useState(() => {
    if (typeof window !== "undefined") {
      return audioManager.getStatus().sfx;
    }
    return true;
  });

  useEffect(() => {
    const handleAudioUpdate = () => {
      setIsSfxOn(audioManager.getStatus().sfx);
    };
    window.addEventListener("three_bugs_audio_update", handleAudioUpdate);
    return () => window.removeEventListener("three_bugs_audio_update", handleAudioUpdate);
  }, []);

  const handleToggleSound = () => {
    const next = audioManager.toggleSfx();
    setIsSfxOn(next);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile CardNav dropdown is open to ensure 100% smooth inner panel scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const t = TRANSLATIONS[lang];

  const isLight = theme === "light";

  const vi = lang === "vi";

  const navCards: CardNavItem[] = [
    {
      label: vi ? "Sản phẩm" : "Products",
      links: [
        { label: vi ? "Dự án tiêu biểu" : "Featured work", hint: vi ? "Sản phẩm đã làm cho khách hàng" : "Products built for clients", href: "#app-work-section" },
        { label: vi ? "Mẫu website" : "Website templates", hint: vi ? "Có demo chạy thật, từ 2,5 triệu" : "Live demos, from 2.5M VND", href: "/templates" },
        { label: "3BCAD", hint: vi ? "Phần mềm CAD 3D mã nguồn mở" : "Open-source 3D CAD software", href: "#app-opensource-section" },
        { label: "3B Infrastructure", hint: vi ? "Sổ tay kỹ thuật mã nguồn mở" : "Open-source engineering notebook", href: "#app-infrastructure-section" }
      ]
    },
    {
      label: vi ? "Dịch vụ" : "Services",
      links: [
        { label: vi ? "Dịch vụ" : "What we do", hint: vi ? "Thiết kế, website, backend và AI" : "Design, web, backend and AI", href: "#app-services-section" },
        { label: vi ? "Công nghệ" : "Tech stack", hint: vi ? "Công nghệ chúng tôi sử dụng" : "The tools we build with", href: "#app-technology-section" },
        { label: vi ? "Quy trình" : "Process", hint: vi ? "Từ ý tưởng đến bàn giao" : "From idea to handover", href: "#app-process-section" },
        { label: vi ? "Báo giá" : "Pricing", hint: vi ? "Chi phí theo từng giai đoạn" : "Costs for each phase", href: "#app-pricing-section" }
      ]
    },
    {
      label: "Studio",
      links: [
        { label: vi ? "Về chúng tôi" : "About", hint: vi ? "Triết lý làm việc của studio" : "How the studio works", href: "#app-about-section" },
        { label: vi ? "Đội ngũ" : "Team", hint: vi ? "Những người làm sản phẩm" : "The people behind the work", href: "#app-team-section" },
        { label: vi ? "Khách hàng nói gì" : "Testimonials", hint: vi ? "Đánh giá từ đối tác" : "What partners say", href: "#app-testimonials-section" },
        { label: vi ? "Câu hỏi thường gặp" : "FAQ", hint: vi ? "Giải đáp trước khi bắt đầu" : "Answers before you start", href: "#app-faq-section" }
      ]
    }
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) {
      return; // let other pages navigate normally
    }

    e.preventDefault();
    const targetId = href.startsWith("#") ? href.slice(1) : href;
    const element = document.getElementById(targetId);

    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setIsOpen(false);
    }
  };

  return (
    <header
      id="card-nav-header"
      className="fixed top-0 left-0 right-0 z-50 lg:pl-20 transition-all duration-500 pointer-events-none"
    >
      {/* Main Navbar Bar */}
      <nav
        className={`w-full pointer-events-auto transition-all duration-500 border-b ${
          scrolled || isOpen
            ? "bg-[#090909]/90 backdrop-blur-xl border-white/10 py-3.5 shadow-2xl"
            : "bg-transparent border-transparent py-5"
        }`}
        style={{ backgroundColor: (scrolled || isOpen) ? `${baseColor}E6` : "transparent" }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-12 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              setIsOpen(false);
            }}
            className="flex items-center gap-2 md:gap-3 group interactive focus:outline-none"
            id="card-nav-logo"
          >
            <div className="hidden sm:flex gap-1.5 mr-0.5" id="card-nav-logo-dots">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-brand-orange animate-pulse" />
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#404040]" />
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#404040]" />
            </div>
            <Logo size="sm" showText={false} variant="light" />
            
            {/* Desktop Brand Text */}
            <div className="hidden md:block text-left leading-none">
              <span className={`font-display font-bold tracking-widest text-sm uppercase group-hover:text-brand-orange transition-colors ${isLight ? "text-[#0F172A]" : "text-white"}`}>
                THREE BUGS
              </span>
              <span className="block font-mono text-[10px] tracking-[0.35em] uppercase text-brand-orange font-medium mt-0.5">
                STUDIO
              </span>
            </div>

            {/* Mobile Compact Brand Text: 3BSTUDIO */}
            <div className="block md:hidden text-left leading-none">
              <span className={`font-display font-black tracking-wider text-sm uppercase group-hover:text-brand-orange transition-colors ${isLight ? "text-[#0F172A]" : "text-white"}`}>
                3B<span className="text-brand-orange font-mono text-xs font-bold tracking-widest ml-0.5">STUDIO</span>
              </span>
            </div>
          </a>

          {/* Desktop & Mobile Nav Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            
            {/* Language Switcher */}
            {onLangChange && (
              <div className="flex items-center border border-white/10 rounded-sm overflow-hidden font-mono text-[9px] md:text-[10px] tracking-wider" id="card-nav-lang">
                <button
                  onClick={() => onLangChange("vi")}
                  aria-label="Chuyển sang tiếng Việt"
                  className={`px-2 md:px-2.5 py-1 md:py-1.5 transition-all ${
                    lang === "vi"
                      ? "bg-brand-orange text-[#090909] font-semibold"
                      : isLight ? "bg-transparent text-[#334155] hover:text-[#0F172A]" : "bg-transparent text-[#8E8E93] hover:text-white"
                  }`}
                >
                  VI
                </button>
                <div className="w-[1px] h-3 bg-white/10" />
                <button
                  onClick={() => onLangChange("en")}
                  aria-label="Switch to English"
                  className={`px-2 md:px-2.5 py-1 md:py-1.5 transition-all ${
                    lang === "en"
                      ? "bg-brand-orange text-[#090909] font-semibold"
                      : isLight ? "bg-transparent text-[#334155] hover:text-[#0F172A]" : "bg-transparent text-[#8E8E93] hover:text-white"
                  }`}
                >
                  EN
                </button>
              </div>
            )}

            {/* Custom Moon/Sun Theme Toggle Switch */}
            {onThemeToggle && (
              <ThemeSwitch theme={theme} onThemeToggle={onThemeToggle} lang={lang} />
            )}

            {/* Audio Sound FX Toggle Switch */}
            <button
              onClick={handleToggleSound}
              aria-label={isSfxOn ? (lang === "vi" ? "Tắt âm thanh hiệu ứng (Phím M)" : "Mute Sound Effects (M)") : (lang === "vi" ? "Bật âm thanh hiệu ứng (Phím M)" : "Enable Sound Effects (M)")}
              title={isSfxOn ? (lang === "vi" ? "Âm thanh: BẬT (phím M để tắt)" : "Sound: ON (press M to mute)") : (lang === "vi" ? "Âm thanh: TẮT" : "Sound: OFF")}
              className={`p-1.5 md:p-2 rounded-sm border transition-all duration-300 interactive flex items-center justify-center cursor-pointer ${
                isLight 
                  ? "bg-white border-slate-300 text-slate-700 hover:text-brand-orange hover:border-brand-orange" 
                  : "bg-[#141414] border-white/15 text-[#8E8E93] hover:text-white hover:border-brand-orange/40"
              }`}
              id="header-sound-toggle-btn"
            >
              {isSfxOn ? (
                <SpeakerIcon className="w-3.5 h-3.5 md:w-4 md:h-4 text-brand-orange" size={16} />
              ) : (
                <SpeakerIcon className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#8E8E93] opacity-50" size={16} />
              )}
            </button>

            {/* CardNav Menu Toggle Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`btn-stacked relative inline-flex items-center gap-1.5 md:gap-2 font-mono text-[11px] md:text-xs uppercase tracking-widest px-3 md:px-4 py-1.5 md:py-2 border transition-all duration-300 rounded-sm interactive ${
                isLight 
                  ? "bg-[#FFFFFF] border-slate-300 text-[#0F172A] hover:border-brand-orange font-bold" 
                  : "bg-[#141414] border-white/15 text-white hover:border-brand-orange"
              }`}
              id="card-nav-menu-btn"
            >
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full" style={{ backgroundColor: menuColor }} />
              <span className={isLight ? "text-[#0F172A] font-bold" : "text-white"}>{isOpen ? (lang === "vi" ? "ĐÓNG" : "CLOSE") : "MENU"}</span>
              {isOpen ? <CloseIcon className="w-3.5 h-3.5 md:w-4 md:h-4 text-brand-orange" size={16} /> : <MenuIcon className="w-3.5 h-3.5 md:w-4 md:h-4 text-brand-orange" size={16} />}
            </button>

            {/* Direct Call to Action Button */}
            <a
              href="#app-contact-section"
              onClick={(e) => handleScrollTo(e, "#app-contact-section")}
              className="hidden lg:inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest px-5 py-2 rounded-sm font-bold transition-all duration-300 interactive shadow-lg"
              style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
              id="card-nav-cta-btn"
            >
              <span>{t.navStartProject}</span>
              <ArrowUpRightIcon className="w-3.5 h-3.5" size={14} />
            </a>

          </div>

        </div>
      </nav>

      {/* CardNav Animated Dropdown Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="card-nav-panel"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full pointer-events-auto bg-[#090909]/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl py-5 md:py-8 px-4 md:px-12 max-h-[calc(100vh-68px)] overflow-y-auto overscroll-contain custom-scrollbar"
          >
            <div className="max-w-7xl mx-auto pb-4">
              
              {/* Grid Layout for Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.15fr] gap-3 md:gap-4">
                {navCards.map((card, index) => (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: index * 0.05, duration: 0.35 }}
                    className="bg-[#121212] border border-white/10 rounded-xl p-4 md:p-5"
                  >
                    <h3 className="font-display font-bold text-base md:text-lg tracking-tight text-[#F5F5F3] mb-2">
                      {card.label}
                    </h3>

                    {/* Inner Links List */}
                    <div className="flex flex-col">
                      {card.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          onClick={(e) => handleScrollTo(e, link.href)}
                          className="group -mx-2 px-2 py-2 rounded-lg flex items-center justify-between gap-3 hover:bg-white/5 transition-colors"
                        >
                          <span className="min-w-0">
                            <span className="block text-sm font-medium text-[#F5F5F3] group-hover:text-brand-orange transition-colors">{link.label}</span>
                            <span className="hidden sm:block text-xs text-[#8E8E93] mt-0.5">{link.hint}</span>
                          </span>
                          <ArrowUpRightIcon className="w-3.5 h-3.5 shrink-0 text-brand-orange opacity-0 group-hover:opacity-100 transition-opacity" size={14} />
                        </a>
                      ))}
                    </div>
                  </motion.div>
                ))}

                {/* Contact Card: text sits in div/span so the light theme's h3, p and a:hover overrides stay off the coloured background */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: navCards.length * 0.05, duration: 0.35 }}
                  className="rounded-xl p-4 md:p-5 flex flex-col"
                  style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
                >
                  <div className="flex items-center gap-2 text-xs font-medium">
                    <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                    {vi ? "Đang nhận dự án mới" : "Taking new projects"}
                  </div>
                  <div role="heading" aria-level={3} className="font-display font-bold text-xl md:text-2xl leading-tight tracking-tight mt-3 mb-5 [text-wrap:balance]">
                    {vi ? "Có ý tưởng? Kể cho chúng tôi nghe." : "Got an idea? Tell us about it."}
                  </div>
                  <a
                    href="#app-contact-section"
                    onClick={(e) => handleScrollTo(e, "#app-contact-section")}
                    className="mt-auto text-center text-sm font-semibold px-4 py-3 rounded-lg bg-[#090909] text-[#F5F5F3] hover:opacity-90 transition-opacity"
                  >
                    {vi ? "Gửi yêu cầu tư vấn" : "Send an inquiry"}
                  </a>
                  <div className="flex flex-col gap-1.5 mt-4 text-sm">
                    <a href="mailto:threebugstudio@gmail.com" target="_blank" rel="noreferrer" className="break-all hover:underline underline-offset-4">
                      <span style={{ color: buttonTextColor }}>threebugstudio@gmail.com</span>
                    </a>
                    <a href="https://github.com/Three-Bugs-Studio" target="_blank" rel="noreferrer" className="hover:underline underline-offset-4">
                      <span style={{ color: buttonTextColor }}>GitHub: Three-Bugs-Studio</span>
                    </a>
                  </div>
                </motion.div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

