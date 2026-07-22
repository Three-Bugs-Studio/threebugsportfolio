import React, { useState, useEffect } from "react";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import SelectedWork from "./components/SelectedWork";
import Process from "./components/Process";
import Technology from "./components/Technology";
import Team from "./components/Team";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import StaggeredSection from "./components/StaggeredSection";
import DotNavigation from "./components/DotNavigation";
import { audioManager } from "./lib/audioManager";
import { motion, AnimatePresence } from "motion/react";
import {
  HeroSkeleton,
  AboutSkeleton,
  ServicesSkeleton,
  SelectedWorkSkeleton,
  ProcessSkeleton,
  TechnologySkeleton,
  TeamSkeleton,
  TestimonialsSkeleton,
  FAQSkeleton,
  ContactSkeleton,
  FooterSkeleton
} from "./components/SkeletonLoader";

const APP_SECTIONS = [
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

export default function App() {
  const [lang, setLang] = useState<"vi" | "en">(() => {
    const saved = localStorage.getItem("three_bugs_lang");
    return (saved === "vi" || saved === "en") ? saved : "vi";
  });

  const [loaded, setLoaded] = useState<Record<string, boolean>>({
    hero: false,
    about: false,
    services: false,
    work: false,
    process: false,
    technology: false,
    team: false,
    testimonials: false,
    faq: false,
    contact: false,
    footer: false,
  });

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      } else {
        setScrollProgress(0);
      }

      setIsScrolling(true);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 1500);

      // Track active section for the top progress bar label
      const scrollPosition = window.scrollY + 280;
      let currentSection = "hero";
      for (const sec of APP_SECTIONS) {
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
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  // Global Interaction Sound Effects (Tactile Web Audio API feedback)
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // If clicked on an interactive element (button, link, select, role="button", .interactive class)
      const isInteractive = target.closest("a, button, select, [role='button'], .interactive");
      if (isInteractive) {
        audioManager.playPress();
      } else {
        audioManager.playClick();
      }
    };

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Ignore modifier keys to prevent duplicate/annoying double triggers
      if (["Shift", "Control", "Alt", "Meta", "CapsLock", "Escape"].includes(e.key)) return;
      audioManager.playClick();
    };

    window.addEventListener("click", handleGlobalClick, { passive: true });
    window.addEventListener("keydown", handleGlobalKeyDown, { passive: true });

    return () => {
      window.removeEventListener("click", handleGlobalClick);
      window.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, []);

  // Global Keyboard Shortcuts (M: mute/unmute, L: toggle language, H: scroll to top)
  useEffect(() => {
    const handleShortcuts = (e: KeyboardEvent) => {
      // Ignore if typing in an input, textarea, select, or editable element
      const target = e.target as HTMLElement | null;
      if (target) {
        const tagName = target.tagName.toUpperCase();
        if (tagName === "INPUT" || tagName === "TEXTAREA" || target.isContentEditable || tagName === "SELECT") {
          return;
        }
      }

      // Avoid blocking default browser combinations (Ctrl+M, Cmd+L, etc.)
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const key = e.key.toLowerCase();
      if (key === "m") {
        e.preventDefault();
        audioManager.toggleHum();
      } else if (key === "l") {
        e.preventDefault();
        const nextLang = lang === "vi" ? "en" : "vi";
        handleLangChange(nextLang);
      } else if (key === "h") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    window.addEventListener("keydown", handleShortcuts);
    return () => {
      window.removeEventListener("keydown", handleShortcuts);
    };
  }, [lang, isTransitioning]);

  const handleLangChange = (newLang: "vi" | "en") => {
    if (newLang === lang || isTransitioning) return;
    
    // Begin high-end portal transition overlay
    setIsTransitioning(true);
    audioManager.playSweep();
    
    // Switch language state midway through the animation sweep (when screen is fully covered)
    setTimeout(() => {
      setLang(newLang);
      localStorage.setItem("three_bugs_lang", newLang);
      
      setLoaded({
        hero: false,
        about: false,
        services: false,
        work: false,
        process: false,
        technology: false,
        team: false,
        testimonials: false,
        faq: false,
        contact: false,
        footer: false,
      });

      // Keep overlay slightly longer to let layout settle, then fade out
      setTimeout(() => {
        setIsTransitioning(false);
      }, 550);
    }, 450);
  };

  // Dynamic SEO Metadata and Document Title Updates
  useEffect(() => {
    // 1. Update HTML language attribute
    document.documentElement.setAttribute("lang", lang);

    // 2. Define SEO variables based on language
    const seoData = {
      vi: {
        title: "Three Bugs Studio | Thiết Kế Website & Phát Triển Phần Mềm tại TP.HCM",
        description: "Three Bugs Studio - Đội ngũ lập trình viên chuyên nghiệp thiết kế website, phần mềm custom và ứng dụng web vận hành tối ưu, giao diện hiện đại.",
        keywords: "thiết kế website, thiết kế web tphcm, lập trình phần mềm, làm website uy tín, web app, react, three bugs studio, hcmc"
      },
      en: {
        title: "Three Bugs Studio | Web Design & Software Engineering",
        description: "Three Bugs Studio - A professional developer studio crafting fast, clean, and durable custom websites and web applications based in Ho Chi Minh City.",
        keywords: "web design hanoi hcmc, custom software development, professional websites, react developer vietnam, web app, three bugs studio"
      }
    };

    const currentSeo = seoData[lang];

    // 3. Set page title
    document.title = currentSeo.title;

    // 4. Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", currentSeo.description);

    // 5. Update Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.setAttribute("name", "keywords");
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute("content", currentSeo.keywords);

    // 6. Update Open Graph Title & Description for social sharing
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute("content", currentSeo.title);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement("meta");
      ogDesc.setAttribute("property", "og:description");
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute("content", currentSeo.description);

    let ogType = document.querySelector('meta[property="og:type"]');
    if (!ogType) {
      ogType = document.createElement("meta");
      ogType.setAttribute("property", "og:type");
      document.head.appendChild(ogType);
    }
    ogType.setAttribute("content", "website");
  }, [lang]);

  const sectionAnimation = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#090909] text-[#F5F5F3] font-sans selection:bg-brand-orange selection:text-[#090909]" id="root-app-container">
      {/* Global CRT Scanline Hardware Overlay */}
      <div className="crt-overlay" id="crt-scanline-overlay" />

      {/* Premium Cursor Follower Interaction */}
      <CustomCursor />

      {/* Floating Vertical Dot Navigation Menu */}
      <DotNavigation lang={lang} />

      {/* Grid Alignment Matrix Overlay (subtle background layout grid lines) */}
      <div className="fixed inset-0 pointer-events-none z-0 swiss-grid opacity-[0.1]" />

      {/* Glassmorphism Navigation Bar */}
      <Navbar lang={lang} onLangChange={handleLangChange} />

      {/* Elegant Fixed Left Sidebar (Swiss Alignment Rail) */}
      <aside className="hidden lg:flex fixed top-0 left-0 bottom-0 w-20 border-r border-white/5 flex-col justify-center items-center z-30 pointer-events-none" id="swiss-alignment-aside">
        <span className="writing-mode-vertical select-none font-mono text-[10px] tracking-[0.3em] uppercase text-[#8E8E93]/40 flex items-center gap-6">
          <span>EST. 2026</span>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange/40 animate-pulse" />
          <span>100% REMOTE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange/40" />
          <span>DIGITAL CRAFT</span>
        </span>
      </aside>

      {/* Full Orchestration flow with smooth route-like language page transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={lang}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          id="main-transition-container"
        >
          <main className="relative z-10 lg:pl-20" id="main-content">
            
            {/* Hero Section */}
            {!loaded.hero ? (
              <HeroSkeleton lang={lang} onLoaded={() => setLoaded(prev => ({ ...prev, hero: true }))} />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.45 }}
              >
                <Hero lang={lang} />
              </motion.div>
            )}

            {/* About Section */}
            {!loaded.about ? (
              <AboutSkeleton lang={lang} onLoaded={() => setLoaded(prev => ({ ...prev, about: true }))} />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.45 }}
              >
                <StaggeredSection
                  id="app-about-section"
                  sectorCode="SECTOR_01"
                  sectorName={lang === "vi" ? "TRIẾT LÝ HOẠT ĐỘNG" : "ABOUT PHILOSOPHY"}
                  lang={lang}
                >
                  <About lang={lang} />
                </StaggeredSection>
              </motion.div>
            )}

            {/* Services / Capabilities Section */}
            {!loaded.services ? (
              <ServicesSkeleton lang={lang} onLoaded={() => setLoaded(prev => ({ ...prev, services: true }))} />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.45 }}
              >
                <StaggeredSection
                  id="app-services-section"
                  sectorCode="SECTOR_02"
                  sectorName={lang === "vi" ? "CÔNG NGHỆ & DỊCH VỤ" : "CORE CAPABILITIES"}
                  lang={lang}
                >
                  <Services lang={lang} />
                </StaggeredSection>
              </motion.div>
            )}

            {/* Selected Works Editorial Section */}
            {!loaded.work ? (
              <SelectedWorkSkeleton lang={lang} onLoaded={() => setLoaded(prev => ({ ...prev, work: true }))} />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.45 }}
              >
                <StaggeredSection
                  id="app-work-section"
                  sectorCode="SECTOR_03"
                  sectorName={lang === "vi" ? "SẢN PHẨM TIÊU BIỂU" : "SELECTED PORTFOLIO"}
                  lang={lang}
                >
                  <SelectedWork lang={lang} />
                </StaggeredSection>
              </motion.div>
            )}

            {/* Process Timeline Section */}
            {!loaded.process ? (
              <ProcessSkeleton lang={lang} onLoaded={() => setLoaded(prev => ({ ...prev, process: true }))} />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.45 }}
              >
                <StaggeredSection
                  id="app-process-section"
                  sectorCode="SECTOR_04"
                  sectorName={lang === "vi" ? "QUY TRÌNH PHÁT TRIỂN" : "ENGINEERING FLOW"}
                  lang={lang}
                >
                  <Process lang={lang} />
                </StaggeredSection>
              </motion.div>
            )}

            {/* Pricing Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45 }}
            >
              <StaggeredSection
                id="app-pricing-section"
                sectorCode="SECTOR_04_ALT"
                sectorName={lang === "vi" ? "BÁO GIÁ THEO PHASE" : "PHASE PRICING"}
                lang={lang}
              >
                <Pricing lang={lang} />
              </StaggeredSection>
            </motion.div>

            {/* Technology / System Stack Section */}
            {!loaded.technology ? (
              <TechnologySkeleton lang={lang} onLoaded={() => setLoaded(prev => ({ ...prev, technology: true }))} />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.45 }}
              >
                <StaggeredSection
                  id="app-technology-section"
                  sectorCode="SECTOR_05"
                  sectorName={lang === "vi" ? "HỆ THỐNG CÔNG NGHỆ" : "SYSTEM STACK"}
                  lang={lang}
                >
                  <Technology lang={lang} />
                </StaggeredSection>
              </motion.div>
            )}

            {/* Founders / Team Section */}
            {!loaded.team ? (
              <TeamSkeleton lang={lang} onLoaded={() => setLoaded(prev => ({ ...prev, team: true }))} />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.45 }}
              >
                <StaggeredSection
                  id="app-team-section"
                  sectorCode="SECTOR_06"
                  sectorName={lang === "vi" ? "ĐỘI NGŨ SÁNG LẬP" : "STUDIO FOUNDERS"}
                  lang={lang}
                >
                  <Team lang={lang} />
                </StaggeredSection>
              </motion.div>
            )}

            {/* Testimonials Review Slider */}
            {!loaded.testimonials ? (
              <TestimonialsSkeleton lang={lang} onLoaded={() => setLoaded(prev => ({ ...prev, testimonials: true }))} />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.45 }}
              >
                <StaggeredSection
                  id="app-testimonials-section"
                  sectorCode="SECTOR_07"
                  sectorName={lang === "vi" ? "ĐÁNH GIÁ ĐỐI TÁC" : "PARTNER REVIEWS"}
                  lang={lang}
                >
                  <Testimonials lang={lang} />
                </StaggeredSection>
              </motion.div>
            )}

            {/* FAQ Section */}
            {!loaded.faq ? (
              <FAQSkeleton lang={lang} onLoaded={() => setLoaded(prev => ({ ...prev, faq: true }))} />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.45 }}
              >
                <StaggeredSection
                  id="app-faq-section"
                  sectorCode="SECTOR_08"
                  sectorName={lang === "vi" ? "GIẢI ĐÁP THẮC MẮC" : "FAQ RESOLUTIONS"}
                  lang={lang}
                >
                  <FAQ lang={lang} />
                </StaggeredSection>
              </motion.div>
            )}

            {/* Interactive Inquiries Form Panel */}
            {!loaded.contact ? (
              <ContactSkeleton lang={lang} onLoaded={() => setLoaded(prev => ({ ...prev, contact: true }))} />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.45 }}
              >
                <StaggeredSection
                  id="app-contact-section"
                  sectorCode="SECTOR_09"
                  sectorName={lang === "vi" ? "LIÊN HỆ ĐẶT HÀNG" : "INQUIRY PORTAL"}
                  lang={lang}
                >
                  <Contact lang={lang} />
                </StaggeredSection>
              </motion.div>
            )}

          </main>

          {/* Grid Aligned Footer Section */}
          <div className="lg:pl-20" id="footer-alignment-wrapper">
            {!loaded.footer ? (
              <FooterSkeleton lang={lang} onLoaded={() => setLoaded(prev => ({ ...prev, footer: true }))} />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.45 }}
              >
                <Footer lang={lang} />
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Cinematic Route-like Transition Curtain Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <div
            id="route-transition-overlay"
            className="fixed inset-0 z-[100] select-none overflow-hidden flex flex-col justify-between pointer-events-auto"
          >
            {/* Background Staggered Pillars */}
            <div className="absolute inset-0 flex z-0 pointer-events-none">
              <motion.div 
                className="flex-1 bg-[#101010] border-r border-white/5"
                initial={{ y: "-100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "100%" }}
                transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
              />
              <motion.div 
                className="flex-1 bg-[#0c0c0c] border-r border-white/5"
                initial={{ y: "-100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "100%" }}
                transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
              />
              <motion.div 
                className="flex-1 bg-[#090909]"
                initial={{ y: "-100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "100%" }}
                transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
              />
            </div>

            {/* Dynamic Content Overlay fading in over the pillars */}
            <motion.div 
              className="absolute inset-0 flex flex-col justify-between p-8 md:p-16 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, delay: 0.15 }}
            >
              {/* Background layout dots & accent glows */}
              <div className="absolute inset-0 swiss-grid opacity-20 pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-orange/10 rounded-full blur-[80px]" />

              <div className="flex justify-between items-center font-mono text-[9px] tracking-[0.3em] text-[#8E8E93]/60 relative z-10">
                <span>THREE BUGS STUDIO</span>
                <span>LANG_STATE: SWITCHING</span>
              </div>

              <div className="flex flex-col items-center justify-center text-center my-auto relative z-10">
                {/* Code-Loader Animated Brackets */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="code-loader mb-2 select-none"
                >
                  <span>{'{'}</span><span>{'}'}</span>
                </motion.div>
                
                <motion.h2 
                  className="font-display font-medium text-xl md:text-3xl tracking-tight text-white/90"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.5 }}
                >
                  {lang === "vi" ? "ĐANG TẢI GIAO DIỆN MỚI..." : "SWITCHING LANGUAGE..."}
                </motion.h2>

                <motion.p 
                  className="font-mono text-[10px] tracking-widest text-brand-orange uppercase mt-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {lang === "vi" ? "KHỞI TẠO HỆ THỐNG GIAO DIỆN" : "CONFIGURING INTERFACE ARCHITECTURE"}
                </motion.p>
              </div>

              <div className="flex justify-between items-end font-mono text-[8px] text-[#8E8E93]/60 relative z-10">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#27C93F] rounded-full animate-pulse" />
                  <span>TRANSITION_PORTAL_ACTIVE</span>
                </div>
                <span>© 2026 THREE BUGS STUDIO</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
