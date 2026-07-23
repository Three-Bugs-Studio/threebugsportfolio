import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import { motion, AnimatePresence } from "motion/react";
import { FaBars, FaXmark, FaArrowUpRightFromSquare, FaWandMagicSparkles } from "react-icons/fa6";
import { TRANSLATIONS } from "../data";

export interface CardNavLink {
  label: string;
  href: string;
  ariaLabel?: string;
  isExternal?: boolean;
}

export interface CardNavItem {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
}

export interface CardNavProps {
  lang?: "vi" | "en";
  onLangChange?: (lang: "vi" | "en") => void;
  items?: CardNavItem[];
  logo?: React.ReactNode;
  logoAlt?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
  ease?: string;
  theme?: "dark" | "light";
}

export default function CardNav({
  lang = "vi",
  onLangChange,
  items,
  baseColor = "#090909",
  menuColor = "#FF6A00",
  buttonBgColor = "#FF6A00",
  buttonTextColor = "#090909",
}: CardNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const t = TRANSLATIONS[lang];

  // Default Studio Card Nav Items structured for Three Bugs Studio if not passed explicitly
  const defaultItems: CardNavItem[] = [
    {
      label: lang === "vi" ? "Sản Phẩm & Dịch Vụ" : "Work & Services",
      bgColor: "#171717",
      textColor: "#FFFFFF",
      links: [
        { label: lang === "vi" ? "Sản Phẩm Tiêu Biểu" : "Featured Portfolio", href: "#app-work-section", ariaLabel: "Portfolio" },
        { label: lang === "vi" ? "Công Nghệ & Dịch Vụ" : "Core Capabilities", href: "#app-services-section", ariaLabel: "Services" },
        { label: lang === "vi" ? "Hệ Thống Công Nghệ" : "System Stack", href: "#app-technology-section", ariaLabel: "Technology" }
      ]
    },
    {
      label: lang === "vi" ? "Quy Trình & Báo Giá" : "Process & Pricing",
      bgColor: "#1E1917",
      textColor: "#FFFFFF",
      links: [
        { label: lang === "vi" ? "Quy Trình Phát Triển" : "Engineering Flow", href: "#app-process-section", ariaLabel: "Process" },
        { label: lang === "vi" ? "Báo Giá Theo Phase" : "Phase Pricing", href: "#app-pricing-section", ariaLabel: "Pricing" },
        { label: lang === "vi" ? "Giải Đáp Thắc Mắc" : "FAQ Resolutions", href: "#app-faq-section", ariaLabel: "FAQ" }
      ]
    },
    {
      label: lang === "vi" ? "Studio & Đội Ngũ" : "About & Team",
      bgColor: "#26160C",
      textColor: "#FFFFFF",
      links: [
        { label: lang === "vi" ? "Triết Lý Hoạt Động" : "About Philosophy", href: "#app-about-section", ariaLabel: "About" },
        { label: lang === "vi" ? "Sơ Đồ & Đội Ngũ" : "Studio Founders", href: "#app-team-section", ariaLabel: "Team" },
        { label: lang === "vi" ? "Đánh Giá Đối Tác" : "Partner Reviews", href: "#app-testimonials-section", ariaLabel: "Testimonials" }
      ]
    },
    {
      label: lang === "vi" ? "Liên Hệ Dự Án" : "Project Inquiry",
      bgColor: "#FF6A00",
      textColor: "#090909",
      links: [
        { label: lang === "vi" ? "Form Tư Vấn Dự Án (Trực Tiếp)" : "Consultation Form (Direct)", href: "#app-contact-section", ariaLabel: "Consultation Form" },
        { label: "Email: dongduong840@gmail.com", href: "mailto:dongduong840@gmail.com", ariaLabel: "Direct Email", isExternal: true },
        { label: "GitHub: Three-Bugs-Studio", href: "https://github.com/Three-Bugs-Studio", ariaLabel: "GitHub Repository", isExternal: true }
      ]
    }
  ];

  const cardNavItems = items || defaultItems;

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isExternal?: boolean) => {
    if (isExternal || href.startsWith("http")) {
      return; // allow standard external link navigation
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
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              setIsOpen(false);
            }}
            className="flex items-center gap-3 group interactive focus:outline-none"
            id="card-nav-logo"
          >
            <div className="flex gap-1.5 mr-1" id="card-nav-logo-dots">
              <div className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-[#404040]" />
              <div className="w-2 h-2 rounded-full bg-[#404040]" />
            </div>
            <Logo size="sm" showText={false} variant="light" />
            <div className="text-left leading-none">
              <span className="font-display font-bold tracking-widest text-sm uppercase text-white group-hover:text-brand-orange transition-colors">
                THREE BUGS
              </span>
              <span className="block font-mono text-[10px] tracking-[0.35em] uppercase text-brand-orange font-medium mt-0.5">
                STUDIO
              </span>
            </div>
          </a>

          {/* Desktop Nav Actions */}
          <div className="flex items-center gap-4">
            
            {/* Language Switcher */}
            {onLangChange && (
              <div className="flex items-center border border-white/10 rounded-sm overflow-hidden font-mono text-[10px] tracking-wider" id="card-nav-lang">
                <button
                  onClick={() => onLangChange("vi")}
                  aria-label="Chuyển sang tiếng Việt"
                  className={`px-2.5 py-1.5 transition-all ${
                    lang === "vi"
                      ? "bg-brand-orange text-[#090909] font-semibold"
                      : "bg-transparent text-[#8E8E93] hover:text-white"
                  }`}
                >
                  VI
                </button>
                <div className="w-[1px] h-3 bg-white/10" />
                <button
                  onClick={() => onLangChange("en")}
                  aria-label="Switch to English"
                  className={`px-2.5 py-1.5 transition-all ${
                    lang === "en"
                      ? "bg-brand-orange text-[#090909] font-semibold"
                      : "bg-transparent text-[#8E8E93] hover:text-white"
                  }`}
                >
                  EN
                </button>
              </div>
            )}

            {/* CardNav Menu Toggle Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="btn-stacked relative inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest px-4 py-2 bg-[#141414] border border-white/15 text-white hover:border-brand-orange transition-all duration-300 rounded-sm interactive"
              id="card-nav-menu-btn"
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: menuColor }} />
              <span>{isOpen ? (lang === "vi" ? "ĐÓNG MENU" : "CLOSE") : "MENU"}</span>
              {isOpen ? <FaXmark className="w-4 h-4 text-brand-orange" /> : <FaBars className="w-4 h-4 text-brand-orange" />}
            </button>

            {/* Direct Call to Action Button */}
            <a
              href="#app-contact-section"
              onClick={(e) => handleScrollTo(e, "#app-contact-section")}
              className="hidden sm:inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest px-5 py-2 rounded-sm font-bold transition-all duration-300 interactive shadow-lg"
              style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
              id="card-nav-cta-btn"
            >
              <span>{t.navStartProject}</span>
              <FaArrowUpRightFromSquare className="w-3.5 h-3.5" />
            </a>

          </div>

        </div>
      </nav>

      {/* CardNav Animated Dropdown Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="card-nav-panel"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full pointer-events-auto bg-[#090909]/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl py-8 px-6 md:px-12"
          >
            <div className="max-w-7xl mx-auto">
              
              {/* Header Label */}
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#8E8E93]">
                  <FaWandMagicSparkles className="w-4 h-4 text-brand-orange" />
                  <span>{lang === "vi" ? "DANH MỤC NAVIGATION DỰ ÁN" : "STUDIO NAVIGATION CARDS"}</span>
                </div>
                <span className="font-mono text-[10px] text-brand-orange">
                  // THREE BUGS STUDIO OS
                </span>
              </div>

              {/* Grid Layout for Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {cardNavItems.map((card, index) => (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ delay: index * 0.08, duration: 0.4 }}
                    className="flex flex-col justify-between p-6 rounded-sm border border-white/10 hover:border-brand-orange/60 transition-all duration-300 relative overflow-hidden group shadow-xl"
                    style={{ backgroundColor: card.bgColor, color: card.textColor }}
                  >
                    {/* Top Card Label Header */}
                    <div>
                      <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
                        <span className="font-mono text-[10px] opacity-60 tracking-widest">
                          CARD 0{index + 1}
                        </span>
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: card.textColor === "#090909" ? "#090909" : "#FF6A00" }} />
                      </div>

                      <h3 className="font-display font-bold text-lg md:text-xl tracking-tight mb-4">
                        {card.label}
                      </h3>
                    </div>

                    {/* Inner Links List */}
                    <div className="flex flex-col gap-2.5 mt-2">
                      {card.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          target={link.isExternal ? "_blank" : undefined}
                          rel={link.isExternal ? "noreferrer" : undefined}
                          aria-label={link.ariaLabel || link.label}
                          onClick={(e) => handleScrollTo(e, link.href, link.isExternal)}
                          className="font-mono text-xs uppercase tracking-wider opacity-80 hover:opacity-100 hover:translate-x-1.5 transition-all flex items-center justify-between py-1 group/link border-b border-white/5 last:border-none"
                        >
                          <span>{link.label}</span>
                          <FaArrowUpRightFromSquare className="w-3.5 h-3.5 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                        </a>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom Quick Contact Bar */}
              <div className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#8E8E93]">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#27C93F] animate-pulse" />
                  <span>{lang === "vi" ? "TRẠNG THÁI: SẴN SÀNG NHẬN DỰ ÁN MỚI" : "STATUS: AVAILABLE FOR NEW PROJECTS"}</span>
                </div>
                <div>
                  <span>EMAIL: <strong>dongduong840@gmail.com</strong></span>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

