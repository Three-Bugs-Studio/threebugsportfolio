import React, { useEffect, useState, useRef } from "react";
import Logo from "./Logo";
import { TRANSLATIONS } from "../data";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { audioManager } from "../lib/audioManager";

interface MagneticSocialLinkProps {
  href: string;
  label: string;
  target?: string;
  rel?: string;
}

function MagneticSocialLink({ href, label, target, rel }: MagneticSocialLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for magnetic pull
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.5 };
  const dx = useSpring(x, springConfig);
  const dy = useSpring(y, springConfig);

  // 3D Tilt based on mouse offset
  const rotateX = useTransform(dy, [-12, 12], [15, -15]);
  const rotateY = useTransform(dx, [-12, 12], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();

    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    // Pull calculations
    const maxPull = 12;
    const pullX = (distanceX / (width / 2)) * maxPull;
    const pullY = (distanceY / (height / 2)) * maxPull;

    x.set(pullX);
    y.set(pullY);
    if (!isHovered) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <div className="relative overflow-visible py-0.5" style={{ perspective: 400 }}>
      <motion.a
        ref={ref}
        href={href}
        target={target}
        rel={rel}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          x: dx,
          y: dy,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="hover:text-[#F5F5F3] text-[#8E8E93] transition-colors duration-200 flex items-center gap-1.5 interactive select-none w-fit"
      >
        <span 
          style={{ transform: "translateZ(8px)" }} 
          className="font-mono text-xs"
        >
          {label}
        </span>
        <motion.span
          style={{ transform: "translateZ(16px)" }}
          animate={{ 
            rotate: isHovered ? 45 : 0, 
            scale: isHovered ? 1.15 : 1,
            x: isHovered ? 2 : 0,
            y: isHovered ? -2 : 0
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="inline-flex"
        >
          <ArrowUpRight className="w-3 h-3 text-brand-orange" />
        </motion.span>
      </motion.a>
    </div>
  );
}

interface FooterProps {
  lang: "vi" | "en";
}

export default function Footer({ lang }: FooterProps) {
  const t = TRANSLATIONS[lang];
  const [utcTime, setUtcTime] = useState("");
  const [isHumOn, setIsHumOn] = useState(false);

  useEffect(() => {
    setIsHumOn(audioManager.getStatus().hum);

    const handleAudioUpdate = () => {
      setIsHumOn(audioManager.getStatus().hum);
    };

    window.addEventListener("three_bugs_audio_update", handleAudioUpdate);
    return () => {
      window.removeEventListener("three_bugs_audio_update", handleAudioUpdate);
    };
  }, []);

  const handleToggleHum = () => {
    audioManager.toggleHum();
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().replace("GMT", "UTC"));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="bg-[#090909] border-t border-white/5 pt-16 md:pt-24 pb-10 md:pb-12 relative overflow-hidden" id="main-footer">
      {/* Visual Alignment helper lines */}
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-brand-orange/20" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 pb-16 border-b border-white/5">
          
          {/* Column 1: Brand & Logo Splash (Grid-Span 6) */}
          <div className="lg:col-span-6 flex flex-col justify-between items-start">
            <div className="flex items-center gap-3 mb-6" id="footer-logo-brand">
              <div className="flex gap-1.5 mr-1" id="footer-logo-dots-indicator">
                <div className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-[#404040]" />
                <div className="w-2 h-2 rounded-full bg-[#404040]" />
              </div>
              <Logo size="sm" showText={false} variant="light" />
              <div className="text-left leading-none">
                <span className="font-display font-bold tracking-widest text-sm uppercase text-white">
                  THREE BUGS
                </span>
                <span className="block font-mono text-[10px] tracking-[0.35em] uppercase text-brand-orange font-medium mt-0.5">
                  STUDIO
                </span>
              </div>
            </div>

            <p className="font-display font-light text-xl text-[#8E8E93] max-w-sm leading-relaxed mb-8">
              {t.footerSlogan.split(".")[0]}.
              <br />
              <span className="text-[#F5F5F3] font-medium relative">
                {lang === "vi" ? "Kiến tạo phần mềm bền vững." : "Strong architectural foundations."}
                <span className="absolute bottom-0.5 left-0 w-full h-[1px] bg-brand-orange/40" />
              </span>
            </p>

            {/* Dynamic UTC Engine Clock & Ambient Hum Toggle */}
            <div className="flex flex-wrap gap-3">
              <div className="bg-[#121212]/50 border border-white/5 px-4 py-2.5 rounded-sm flex items-center gap-3 select-none">
                <span className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-pulse" />
                <span className="font-mono text-[9px] tracking-widest text-[#8E8E93] uppercase">
                  {t.footerClock} <span className="text-[#F5F5F3] ml-1">{utcTime}</span>
                </span>
              </div>

              <button
                onClick={handleToggleHum}
                className={`bg-[#121212]/50 border ${isHumOn ? 'border-brand-orange/30 text-white' : 'border-white/5 text-[#8E8E93]'} px-4 py-2.5 rounded-sm flex items-center gap-3 hover:bg-[#1a1a1a]/50 transition-all duration-300 interactive select-none cursor-pointer`}
                id="footer-ambient-hum-toggle"
              >
                <span className={`relative flex h-1.5 w-1.5`}>
                  {isHumOn && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                  )}
                  <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${isHumOn ? 'bg-brand-orange' : 'bg-[#404040]'}`} />
                </span>
                <span className="font-mono text-[9px] tracking-widest uppercase">
                  {lang === "vi" ? "ÂM NỀN:" : "AMBIENT HUM:"} <span className={isHumOn ? "text-brand-orange font-medium" : "text-[#6E6E73]"}>{isHumOn ? (lang === "vi" ? "BẬT" : "ON") : (lang === "vi" ? "TẤT" : "OFF")}</span>
                </span>
              </button>
            </div>
          </div>

          {/* Column 2: Navigation map (Grid-Span 3) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <span className="font-mono text-[9px] tracking-widest text-brand-orange uppercase block">
              // {t.footerSiteIndex}
            </span>
            <div className="flex flex-col gap-3 font-mono text-xs text-[#8E8E93]">
              <a href="#hero" className="hover:text-[#F5F5F3] transition-colors flex items-center justify-between group interactive">
                <span>{lang === "vi" ? "01 / TRANG CHỦ" : "01 / HOME"}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </a>
              <a href="#about" className="hover:text-[#F5F5F3] transition-colors flex items-center justify-between group interactive">
                <span>{lang === "vi" ? "02 / GIỚI THIỆU" : "02 / ABOUT"}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </a>
              <a href="#work" className="hover:text-[#F5F5F3] transition-colors flex items-center justify-between group interactive">
                <span>{lang === "vi" ? "03 / DỰ ÁN TIÊU BIỂU" : "03 / SELECTED_WORK"}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </a>
              <a href="#process" className="hover:text-[#F5F5F3] transition-colors flex items-center justify-between group interactive">
                <span>{lang === "vi" ? "04 / QUY TRÌNH CHUẨN" : "04 / PROCESS"}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </a>
              <a href="#faq" className="hover:text-[#F5F5F3] transition-colors flex items-center justify-between group interactive">
                <span>{lang === "vi" ? "05 / THẮC MẮC THƯỜNG GẶP" : "05 / FAQ"}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </a>
              <a href="#contact" className="hover:text-[#F5F5F3] transition-colors flex items-center justify-between group interactive">
                <span>{lang === "vi" ? "06 / LIÊN HỆ DỰ ÁN" : "06 / INQUIRIES"}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </a>
            </div>
          </div>

          {/* Column 3: Studio Coordinates (Grid-Span 3) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <span className="font-mono text-[9px] tracking-widest text-[#8E8E93] uppercase block">
              // {t.footerConnectivity}
            </span>
            <div className="flex flex-col gap-2 font-mono text-xs">
              <MagneticSocialLink href="https://github.com/Three-Bugs-Studio" label="GITHUB" target="_blank" rel="noreferrer" />
              <MagneticSocialLink href="https://discord.gg/WDfhFdtqwv" label="DISCORD" target="_blank" rel="noreferrer" />
              <MagneticSocialLink href="mailto:dongduong840@gmail.com" label="EMAIL" />
            </div>
          </div>

        </div>

        {/* Keyboard Shortcuts Accessibility Legend */}
        <div className="border-t border-white/5 pt-6 pb-2 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[9px] tracking-widest text-[#8E8E93]">
          <span className="text-brand-orange select-none">// {lang === "vi" ? "PHÍM TẮT HỆ THỐNG:" : "SYSTEM SHORTCUTS:"}</span>
          <div className="flex flex-wrap gap-x-4 gap-y-2 select-none">
            <span className="flex items-center gap-1.5">
              <kbd className="bg-[#121212] border border-white/10 px-1.5 py-0.5 rounded text-white text-[8px] font-mono shadow-[0_1px_2px_rgba(0,0,0,0.5)]">M</kbd>
              <span>{lang === "vi" ? "ÂM NỀN" : "AMBIENT HUM"}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="bg-[#121212] border border-white/10 px-1.5 py-0.5 rounded text-white text-[8px] font-mono shadow-[0_1px_2px_rgba(0,0,0,0.5)]">L</kbd>
              <span>{lang === "vi" ? "NGÔN NGỮ" : "LANGUAGE"}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="bg-[#121212] border border-white/10 px-1.5 py-0.5 rounded text-white text-[8px] font-mono shadow-[0_1px_2px_rgba(0,0,0,0.5)]">H</kbd>
              <span>{lang === "vi" ? "LÊN ĐẦU TRANG" : "SCROLL TO TOP"}</span>
            </span>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-[9px] tracking-widest text-[#8E8E93] uppercase">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2 text-center md:text-left">
            <span>{t.footerCopyright}</span>
            <span className="hidden md:inline text-white/10">|</span>
            <span className="text-[#6E6E73]">{lang === "vi" ? "THIẾT KẾ & PHÁT TRIỂN BỞI THREE BUGS STUDIO" : "DESIGNED & ENGINEERED BY THREE BUGS STUDIO"}</span>
          </div>

          <div className="flex items-center gap-6">
            {/* Version / Build indicator */}
            <span className="text-[8px] text-white/20 select-none">BUILD_v1.0.4_PROD</span>

            {/* Return to top */}
            <button
              onClick={handleScrollToTop}
              className="flex items-center gap-2 group hover:text-brand-orange text-[#F5F5F3] hover:bg-brand-orange/5 transition-all duration-300 cursor-pointer border border-white/5 hover:border-brand-orange/30 px-3.5 py-2 rounded-sm bg-[#121212]/50 interactive"
              aria-label="Scroll to top"
              id="scroll-to-top-btn"
            >
              <span>{t.footerBackToTop}</span>
              <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform text-brand-orange" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
