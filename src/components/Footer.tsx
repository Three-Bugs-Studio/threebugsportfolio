import React, { useEffect, useState, useRef } from "react";
import Logo from "./Logo";
import { TRANSLATIONS } from "../data";
import { ArrowUp, ArrowUpRight, X } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";
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
  const [isTermsOpen, setIsTermsOpen] = useState(false);

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

            <div className="font-mono text-[9px] tracking-[0.2em] text-[#8E8E93] uppercase mb-8 select-none border-l border-brand-orange/30 pl-3">
              Every bug teaches. Every build improves.
            </div>

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
            <div className="flex flex-col gap-4">
              {/* User Requested Slide-In-Top Social Container Card */}
              <div className="footer-social-card interactive">
                {/* GitHub Container */}
                <a href="https://github.com/Three-Bugs-Studio" className="socialContainer containerOne" target="_blank" rel="noreferrer" title="GitHub">
                  <svg className="socialSvg" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </a>

                {/* Discord Container */}
                <a href="https://discord.gg/WDfhFdtqwv" className="socialContainer containerTwo" target="_blank" rel="noreferrer" title="Discord">
                  <svg className="socialSvg" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                </a>

                {/* Email Container */}
                <a href="mailto:dongduong840@gmail.com" className="socialContainer containerThree" title="Email">
                  <svg className="socialSvg" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </a>

                {/* Contact Inquiries Container */}
                <a href="#app-contact-section" className="socialContainer containerFour" title="Contact Inquiries">
                  <svg className="socialSvg" viewBox="0 0 24 24">
                    <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
                  </svg>
                </a>
              </div>

              {/* Standard Magnetic Links */}
              <div className="flex flex-col gap-2 font-mono text-xs pt-1">
                <MagneticSocialLink href="https://github.com/Three-Bugs-Studio" label="GITHUB REPO" target="_blank" rel="noreferrer" />
                <MagneticSocialLink href="https://discord.gg/WDfhFdtqwv" label="DISCORD COMMUNITY" target="_blank" rel="noreferrer" />
                <MagneticSocialLink href="mailto:dongduong840@gmail.com" label="DIRECT EMAIL" />
              </div>
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
            {/* Privacy & Terms Modal Trigger */}
            <button
              onClick={() => setIsTermsOpen(true)}
              className="hover:text-brand-orange text-[#8E8E93] transition-colors duration-200 cursor-pointer font-mono text-[9px] uppercase interactive"
            >
              {lang === "vi" ? "Bảo mật & Điều khoản" : "Privacy & Terms"}
            </button>
            <span className="text-white/10 select-none">|</span>

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

      {/* Privacy Policy & Terms of Service Modal */}
      <AnimatePresence>
        {isTermsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsTermsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl bg-[#111111] border border-white/10 rounded-sm p-6 md:p-8 shadow-2xl z-10 flex flex-col max-h-[85vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsTermsOpen(false)}
                className="absolute top-4 right-4 text-[#8E8E93] hover:text-white transition-colors p-1 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title */}
              <h3 className="font-display font-medium text-xl md:text-2xl text-[#F5F5F3] mb-6 border-b border-white/5 pb-4">
                {lang === "vi" ? "Chính sách Bảo mật & Điều khoản" : "Privacy Policy & Terms"}
              </h3>

              {/* Scrollable Document Content */}
              <div className="space-y-6 text-left font-sans text-xs text-[#8E8E93] leading-relaxed">
                {/* 1. Privacy Section */}
                <section className="space-y-2">
                  <h4 className="font-mono text-[10px] text-brand-orange uppercase tracking-wider font-semibold">
                    {lang === "vi" ? "1. CHÍNH SÁCH BẢO MẬT (PRIVACY POLICY)" : "1. PRIVACY POLICY"}
                  </h4>
                  <p>
                    {lang === "vi"
                      ? "Chúng tôi tôn trọng quyền riêng tư của bạn. Mọi thông tin bạn cung cấp thông qua biểu mẫu liên hệ (bao gồm Tên, Email, Công ty, Mô tả dự án và Dự toán chi phí) được gửi trực tiếp và an toàn đến hộp thư của studio (dongduong840@gmail.com) và chỉ được sử dụng cho mục đích trao đổi yêu cầu hợp tác thiết kế, phát triển phần mềm."
                      : "We respect your privacy. Any information you submit through our contact forms (including Name, Email, Company, Project requirements, and Budget options) is delivered directly and securely to our inbox (dongduong840@gmail.com). This data is exclusively used to discuss project proposals and design services."}
                  </p>
                  <p>
                    {lang === "vi"
                      ? "Trang web của chúng tôi không sử dụng các dịch vụ theo dõi quảng cáo từ bên thứ ba, đảm bảo dữ liệu truy cập của bạn hoàn toàn bảo mật."
                      : "Our site does not implement third-party advertising tracking technologies, ensuring your access data remains private."}
                  </p>
                </section>

                {/* 2. Terms Section */}
                <section className="space-y-2">
                  <h4 className="font-mono text-[10px] text-brand-orange uppercase tracking-wider font-semibold">
                    {lang === "vi" ? "2. ĐIỀU KHOẢN SỬ DỤNG (TERMS OF SERVICE)" : "2. TERMS OF SERVICE"}
                  </h4>
                  <p>
                    {lang === "vi"
                      ? "Mọi nội dung, hình ảnh thiết kế giao diện và mã nguồn hiển thị trên trang web này đều thuộc bản quyền sở hữu của Three Bugs Studio. Nghiêm cấm mọi hành vi sao chép, sao chép cấu trúc hoặc tái sử dụng tài nguyên của studio cho mục đích thương mại khi chưa có sự đồng ý bằng văn bản."
                      : "All content, interface layouts, and source code displayed on this portfolio are the intellectual property of Three Bugs Studio. Unauthorized duplication, structural cloning, or redistribution of these assets for commercial purposes without written consent is strictly prohibited."}
                  </p>
                  <p>
                    {lang === "vi"
                      ? "Chúng tôi cam kết cung cấp thông tin trung thực về dịch vụ và năng lực. Các ước tính chi phí, lộ trình và kết quả dự án trên trang này mang tính chất tham khảo trực tiếp và sẽ được quy định cụ thể bằng hợp đồng kinh tế khi hai bên chính thức hợp tác."
                      : "We strive to present clear and factual descriptions of our services. All timeline, cost, and output specifications listed on this portfolio are guides. Final terms and bounds will be governed solely by formal services agreements."}
                  </p>
                </section>
              </div>

              {/* Modal Footer Close Action */}
              <div className="mt-8 pt-4 border-t border-white/5 flex justify-end">
                <button
                  onClick={() => setIsTermsOpen(false)}
                  className="bg-[#1C1C1E] border border-white/10 hover:border-brand-orange/30 text-white font-mono text-[10px] uppercase tracking-widest px-5 py-2.5 rounded-sm transition-all duration-300 interactive cursor-pointer"
                >
                  {lang === "vi" ? "ĐÓNG LẠI" : "CLOSE"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}
