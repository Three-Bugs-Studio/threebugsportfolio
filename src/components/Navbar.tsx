import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { TRANSLATIONS } from "../data";

interface NavbarProps {
  lang: "vi" | "en";
  onLangChange: (lang: "vi" | "en") => void;
}

export default function Navbar({ lang, onLangChange }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: TRANSLATIONS[lang].navWork, href: "#app-work-section" },
    { label: TRANSLATIONS[lang].navServices, href: "#app-services-section" },
    { label: TRANSLATIONS[lang].navProcess, href: "#app-process-section" },
    { label: TRANSLATIONS[lang].navStudio, href: "#app-technology-section" },
    { label: TRANSLATIONS[lang].navTeam, href: "#app-team-section" },
    { label: TRANSLATIONS[lang].navFaq, href: "#app-faq-section" },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setMobileMenuOpen(false);
    }
  };

  const t = TRANSLATIONS[lang];

  return (
    <>
      <motion.nav
        id="main-navbar"
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 border-b lg:pl-20 ${
          scrolled
            ? "bg-[#090909]/80 backdrop-blur-md border-white/5 py-4"
            : "bg-transparent border-transparent py-6"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo & Brand */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-3 group interactive focus:outline-none"
            id="nav-logo-link"
          >
            <div className="flex gap-1.5 mr-1" id="logo-dots-indicator">
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

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-8" id="nav-desktop-links">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href.slice(1))}
                className="font-mono text-xs uppercase tracking-widest text-[#8E8E93] hover:text-[#F5F5F3] transition-colors relative py-1 group interactive"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-orange transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-5" id="nav-desktop-cta">
            {/* Language Switcher with subtle tooltip */}
            <div className="relative group/lang" id="lang-switcher-container">
              <div className="flex items-center border border-white/10 rounded-sm overflow-hidden font-mono text-[10px] tracking-wider" id="lang-switcher">
                <button
                  onClick={() => onLangChange("vi")}
                  aria-label="Chuyển sang tiếng Việt"
                  aria-current={lang === "vi" ? "true" : "false"}
                  className={`px-2.5 py-1.5 transition-all focus-visible:ring-1 focus-visible:ring-brand-orange focus-visible:outline-none ${
                    lang === "vi"
                      ? "bg-brand-orange text-[#090909] font-medium"
                      : "bg-transparent text-[#8E8E93] hover:text-[#F5F5F3]"
                  }`}
                >
                  VI
                </button>
                <div className="w-[1px] h-3 bg-white/10" />
                <button
                  onClick={() => onLangChange("en")}
                  aria-label="Switch to English"
                  aria-current={lang === "en" ? "true" : "false"}
                  className={`px-2.5 py-1.5 transition-all focus-visible:ring-1 focus-visible:ring-brand-orange focus-visible:outline-none ${
                    lang === "en"
                      ? "bg-brand-orange text-[#090909] font-medium"
                      : "bg-transparent text-[#8E8E93] hover:text-[#F5F5F3]"
                  }`}
                >
                  EN
                </button>
              </div>
              
              {/* Subtle Tooltip */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1 bg-[#121212] border border-white/10 rounded-sm text-[8px] font-mono tracking-widest text-brand-orange uppercase opacity-0 pointer-events-none group-hover/lang:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 shadow-xl" id="lang-tooltip">
                {lang === "vi" ? "Tiếng Việt đang bật" : "English Active"}
              </div>
            </div>

            <a
              href="#app-contact-section"
              onClick={(e) => handleScrollTo(e, "app-contact-section")}
              className="relative inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest px-5 py-2.5 bg-transparent border border-white/10 hover:border-brand-orange text-[#F5F5F3] hover:text-[#090909] group transition-all duration-300 overflow-hidden rounded-sm interactive"
            >
              <span className="absolute inset-0 bg-brand-orange scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 -z-10" />
              {t.navStartProject}
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Menu Trigger & Switcher */}
          <div className="flex md:hidden items-center gap-4">
            {/* Mobile Language Switcher with subtle tooltip */}
            <div className="relative group/lang-mobile" id="lang-switcher-mobile-container">
              <div className="flex items-center border border-white/10 rounded-sm overflow-hidden font-mono text-[9px] tracking-wider" id="lang-switcher-mobile">
                <button
                  onClick={() => onLangChange("vi")}
                  aria-label="Chuyển sang tiếng Việt"
                  aria-current={lang === "vi" ? "true" : "false"}
                  className={`px-2 py-1 transition-all focus-visible:ring-1 focus-visible:ring-brand-orange focus-visible:outline-none ${
                    lang === "vi" ? "bg-brand-orange text-[#090909] font-medium" : "text-[#8E8E93]"
                  }`}
                >
                  VI
                </button>
                <button
                  onClick={() => onLangChange("en")}
                  aria-label="Switch to English"
                  aria-current={lang === "en" ? "true" : "false"}
                  className={`px-2 py-1 transition-all focus-visible:ring-1 focus-visible:ring-brand-orange focus-visible:outline-none ${
                    lang === "en" ? "bg-brand-orange text-[#090909] font-medium" : "text-[#8E8E93]"
                  }`}
                >
                  EN
                </button>
              </div>

              {/* Subtle Tooltip for Mobile */}
              <div className="absolute top-full right-0 mt-2 px-2 py-1 bg-[#121212] border border-white/10 rounded-sm text-[7px] font-mono tracking-widest text-brand-orange uppercase opacity-0 pointer-events-none group-hover/lang-mobile:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 shadow-xl" id="lang-mobile-tooltip">
                {lang === "vi" ? "Tiếng Việt" : "English"}
              </div>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#F5F5F3] focus:outline-none p-1.5 hover:text-brand-orange transition-colors interactive"
              aria-label="Toggle menu"
              id="mobile-menu-trigger"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            className="fixed inset-0 bg-[#090909]/95 backdrop-blur-xl z-30 flex flex-col justify-center px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 swiss-grid opacity-20 -z-10" />

            <div className="flex flex-col gap-8 text-left mt-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href.slice(1))}
                  className="font-display font-medium text-4xl text-[#8E8E93] hover:text-[#F5F5F3] transition-colors focus:outline-none flex items-center justify-between group"
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span>{link.label}</span>
                  <span className="font-mono text-xs text-brand-orange opacity-0 group-hover:opacity-100 transition-opacity">
                    [{link.href}]
                  </span>
                </motion.a>
              ))}

              <motion.div
                className="mt-8 pt-8 border-t border-white/5 flex flex-col gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <a
                  href="#app-contact-section"
                  onClick={(e) => handleScrollTo(e, "app-contact-section")}
                  className="w-full justify-center inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest px-6 py-4 bg-brand-orange text-[#090909] font-medium rounded-sm active:bg-brand-orange/90 transition-colors"
                >
                  {t.navStartProject}
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
