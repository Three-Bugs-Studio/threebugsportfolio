import React, { useState } from "react";
import { PROJECTS_DATA, TRANSLATIONS } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowUpRight, 
  Calendar, 
  CheckCircle2, 
  Cpu, 
  Database, 
  Activity, 
  TrendingUp, 
  Search,
  Sparkles,
  Image as ImageIcon
} from "lucide-react";
import Lightbox from "./Lightbox";
import randomPhiTruongStore from "@/assets/randomphitruongstore.png";
import fortifyHomepage from "@/assets/fortifykitchen/fortify_homepage.webp";
import BlurUpImage from "./BlurUpImage";
import MagnifyingLens from "./MagnifyingLens";

interface SelectedWorkProps {
  lang: "vi" | "en";
}

export default function SelectedWork({ lang }: SelectedWorkProps) {
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState("sukajan_store");
  const [selectedProjectName, setSelectedProjectName] = useState("");

  const handleOpenLightbox = (id: string, name: string) => {
    setSelectedProjectId(id);
    setSelectedProjectName(name);
    setLightboxOpen(true);
  };

  const t = TRANSLATIONS[lang];
  const projectList = PROJECTS_DATA[lang];

  return (
    <section id="work" className="py-24 md:py-32 bg-[#090909] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-brand-orange">
                {t.workLabel}
              </span>
              <span className="h-[1px] w-12 bg-white/10" />
            </div>
            <h2 className="font-display font-medium text-4xl md:text-6xl tracking-tight text-[#F5F5F3] leading-[1.05]">
              {t.workHeading}
            </h2>
          </div>
          <p className="font-mono text-xs text-[#8E8E93] max-w-xs leading-relaxed">
            {lang === "vi" 
              ? "BẢN ĐÁNH GIÁ CHỌN LỌC VỀ KHẢ NĂNG THỰC THI KỸ THUẬT VÀ HẠ TẦNG KỸ THUẬT SỐ CHẤT LƯỢNG CAO VỪA ĐƯỢC TRIỂN KHAI."
              : "A CURATED REVIEW OF TECHNICAL EXECUTION AND DIGITAL INFRASTRUCTURE RECENTLY SHIPPED TO PRODUCTION."}
          </p>
        </div>

        {/* Editorial Project Grid */}
        <div className="flex flex-col gap-16 md:gap-24" id="project-list">
          {projectList.map((project, idx) => {
            const isHovered = hoveredProjectId === project.id;

            return (
              <motion.div
                key={project.id}
                id={`project-card-${project.id}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredProjectId(project.id)}
                onMouseLeave={() => setHoveredProjectId(null)}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-stretch border-b border-white/5 pb-16 md:pb-24 last:border-b-0"
              >
                {/* Column 1: Editorial text stories & details (Grid-Span 7) */}
                <div className="lg:col-span-7 flex flex-col justify-between order-2 lg:order-1">
                  <div>
                    {/* Client & Category label */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-6">
                      <span className="font-mono text-xs text-[#F5F5F3] bg-white/5 border border-white/10 px-3 py-1 rounded-sm">
                        {project.client}
                      </span>
                      <span className="w-1.5 h-1.5 bg-brand-orange rounded-full" />
                      <span className="font-mono text-xs text-[#8E8E93]">
                        {project.category}
                      </span>
                    </div>

                    {/* Project Title */}
                    <h3 
                      onClick={() => handleOpenLightbox(project.id, project.title)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleOpenLightbox(project.id, project.title);
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-label={`${project.title} — ${lang === "vi" ? "Mở hộp thoại giao diện thực tế" : "Open interactive view"}`}
                      className="font-display font-medium text-3xl md:text-4xl text-[#F5F5F3] mb-5 flex items-center gap-3 cursor-pointer hover:text-brand-orange transition-colors group/title focus-visible:ring-1 focus-visible:ring-brand-orange focus-visible:outline-none rounded-sm"
                    >
                      {project.title}
                      <ArrowUpRight className={`w-6 h-6 text-brand-orange transition-transform duration-300 ${
                        isHovered ? "translate-x-1 -translate-y-1" : "translate-x-0"
                      }`} />
                    </h3>

                    {/* Short Story */}
                    <p className="font-sans text-sm md:text-base text-[#8E8E93] font-light leading-relaxed mb-6 max-w-xl">
                      {project.shortStory}
                    </p>

                    {/* Interactive Lightbox trigger button */}
                    <div className="flex flex-wrap gap-3 mb-8">
                      <button
                        onClick={() => handleOpenLightbox(project.id, project.title)}
                        className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-brand-orange bg-brand-orange/5 border border-brand-orange/20 hover:bg-brand-orange hover:text-white px-3.5 py-2 rounded-sm transition-all duration-300 hover:shadow-lg hover:shadow-brand-orange/5 active:scale-95 focus-visible:ring-1 focus-visible:ring-brand-orange focus-visible:outline-none"
                      >
                        <ImageIcon className="w-3.5 h-3.5 animate-pulse" />
                        <span>{lang === "vi" ? "Xem giao diện thực tế" : "View Interface Slides"}</span>
                      </button>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#F5F5F3] bg-white/5 border border-white/10 hover:bg-brand-orange hover:border-brand-orange hover:text-[#090909] px-3.5 py-2 rounded-sm transition-all duration-300 hover:shadow-lg hover:shadow-brand-orange/5 active:scale-95 focus-visible:ring-1 focus-visible:ring-brand-orange focus-visible:outline-none"
                        >
                          <ArrowUpRight className="w-3.5 h-3.5" />
                          <span>{lang === "vi" ? "Truy cập website" : "Visit Live Site"}</span>
                        </a>
                      )}
                    </div>

                    {/* Outcome Metric Block */}
                    <div className="p-6 bg-[#121212]/30 border border-white/5 rounded-sm mb-8 flex items-start gap-4 hover:border-white/10 transition-colors">
                      <CheckCircle2 className="w-5 h-5 text-brand-orange mt-0.5 shrink-0" />
                      <div>
                        <span className="font-mono text-[9px] tracking-widest text-[#8E8E93] uppercase block mb-1">
                          {t.workOutcome}
                        </span>
                        <p className="font-sans text-xs md:text-sm text-[#F5F5F3] font-light">
                          {project.outcome}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tech specs and timeline row */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-white/5">
                    <div>
                      <span className="font-mono text-[9px] tracking-widest text-[#8E8E93] uppercase block mb-2">
                        {t.workTimeline}
                      </span>
                      <span className="font-sans text-xs text-[#F5F5F3] flex items-center gap-1.5 font-light">
                        <Calendar className="w-3.5 h-3.5 text-brand-orange" />
                        {project.timeline}
                      </span>
                    </div>

                    <div className="col-span-1 md:col-span-2">
                      <span className="font-mono text-[9px] tracking-widest text-[#8E8E93] uppercase block mb-2">
                        {t.workTechStack}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-[10px] text-[#8E8E93] bg-[#121212]/50 px-2 py-0.5 border border-white/5 hover:text-[#F5F5F3] hover:border-white/10 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 2: Architectural Custom Graphic Canvas (Grid-Span 5) */}
                <div className="lg:col-span-5 order-1 lg:order-2">
                  <div 
                    onClick={() => handleOpenLightbox(project.id, project.title)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleOpenLightbox(project.id, project.title);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={lang === "vi" ? "Xem mô phỏng giao diện tương tác" : "View interactive interface preview"}
                    className="h-[320px] md:h-full min-h-[320px] w-full bg-[#121212]/30 border border-white/5 hover:border-white/10 cursor-zoom-in transition-all duration-500 rounded-sm overflow-hidden relative flex items-center justify-center p-8 group focus-visible:ring-1 focus-visible:ring-brand-orange focus-visible:outline-none"
                  >
                    
                    {/* Interactive hover instruction overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-all duration-300 z-30 flex items-center justify-center">
                      <div className="bg-[#111]/95 border border-white/10 px-4 py-2.5 rounded-sm font-mono text-[9px] tracking-widest text-[#F5F5F3] flex items-center gap-2 shadow-2xl translate-y-3 group-hover:translate-y-0 transition-all duration-300">
                        <Search className="w-3.5 h-3.5 text-brand-orange animate-pulse" />
                        <span>{lang === "vi" ? "TRẢI NGHIỆM GIAO DIỆN MÔ PHỎNG" : "EXPLORE INTERACTIVE PREVIEW"}</span>
                      </div>
                    </div>

                    {/* Metric overlay ribbon */}
                    {project.metrics && (
                      <div className="absolute top-4 right-4 bg-[#090909]/80 border border-white/10 px-3 py-1.5 rounded-sm font-mono text-[10px] text-brand-orange tracking-wider z-20 shadow-lg backdrop-blur-sm">
                        {project.metrics}
                      </div>
                    )}

                    {/* Background Swiss align pattern */}
                    <div className="absolute inset-0 swiss-grid opacity-[0.15] pointer-events-none" />

                    {/* 1. Sukajan Store: Interactive Live Browser Mockup representing Sukajan Store's real design */}
                    {project.id === "sukajan_store" && (
                      <MagnifyingLens lang={lang} zoomImage={randomPhiTruongStore} zoomLevel={2.5}>
                        <div className="w-full h-full flex flex-col justify-between relative z-10 text-left font-sans" id="sukajan-visual">
                          {/* Mock Browser Header */}
                          <div className="bg-[#1C1C1E] border border-white/5 rounded-t-md px-3 py-2 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-1.5 shrink-0">
                              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                              <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                            </div>
                            
                            {/* Search Bar / Address URL */}
                            <div className="flex-1 max-w-md mx-auto bg-[#090909]/60 border border-white/5 rounded-sm py-0.5 px-3 flex items-center justify-between gap-2 text-[#8E8E93]">
                              <span className="text-[7.5px] font-mono tracking-wider truncate">https://sukajanrandomphitruong.com</span>
                              <span className="text-[8px] font-bold">↻</span>
                            </div>
                            <div className="w-12 shrink-0" />
                          </div>

                          {/* Simulated Storefront Web Viewport */}
                          <div className="flex-1 bg-[#090909] border-x border-b border-white/5 rounded-b-md p-4 flex flex-col justify-between relative overflow-hidden select-none min-h-[360px]">
                            
                            {/* Ambient background glow effect */}
                            <div className="absolute top-1/4 right-1/4 w-40 h-40 rounded-full bg-brand-orange/10 blur-[60px] pointer-events-none" />

                            {/* Mini Storefront Navbar */}
                            <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-3">
                              {/* Brand Logo */}
                              <div className="flex flex-col">
                                <span className="font-bold tracking-widest text-[9px] text-white">RANDOM.PHITRUONG</span>
                                <span className="text-[5px] tracking-widest text-[#8E8E93] -mt-0.5">SUKAJAN ORDER STUDIO</span>
                              </div>

                              {/* Nav Links (hidden on ultra small screens) */}
                              <div className="hidden sm:flex items-center gap-3 font-mono text-[6.5px] tracking-wide text-[#8E8E93]">
                                <span className="text-brand-orange">CỬA HÀNG</span>
                                <span>GỬI MẪU ORDER</span>
                                <span>VỀ CHÚNG TÔI</span>
                                <span>LIÊN HỆ</span>
                              </div>

                              {/* Right icons */}
                              <div className="flex items-center gap-2 font-mono text-[7px] text-[#8E8E93]">
                                <span className="text-white">VI</span>
                                <span>đ</span>
                                <span className="w-1.5 h-1.5 bg-[#27C93F] rounded-full animate-pulse" />
                              </div>
                            </div>

                            {/* Hero Split Layout Grid */}
                            <div className="grid grid-cols-12 gap-3 items-center my-auto">
                              {/* Left: Copy and CTA */}
                              <div className="col-span-7 space-y-2 text-left">
                                <div className="inline-flex items-center gap-1.5 bg-brand-orange/15 border border-brand-orange/35 px-1.5 py-0.5 rounded-[2px]">
                                  <span className="w-1 h-1 bg-brand-orange rounded-full animate-ping" />
                                  <span className="text-[6px] tracking-widest text-brand-orange font-mono uppercase font-bold">
                                    SUKAJAN · ORDER TẠI VIỆT NAM
                                  </span>
                                </div>

                                <h2 className="font-display font-black text-lg sm:text-xl md:text-2xl text-white leading-none tracking-tight">
                                  RANDOM.<br />
                                  <span className="text-[#8E8E93] group-hover:text-white transition-colors duration-300">PHITRUONG</span>
                                </h2>

                                <p className="text-[9px] font-sans font-medium text-brand-orange tracking-wide">
                                  Sukajan – Đậm Chất Riêng
                                </p>

                                <p className="text-[7px] text-[#8E8E93] font-light leading-snug max-w-[170px] hidden sm:block">
                                  Hơn 4 năm chọn lọc và order sukajan chính hãng từ các đơn vị cung cấp uy tín. Giao hàng 7-10 ngày và hỗ trợ trực tiếp 24/7.
                                </p>

                                {/* Action Button matching screenshot */}
                                <div className="pt-1 flex items-center gap-2">
                                  <span className="inline-flex items-center gap-1 bg-brand-orange text-white font-mono text-[6px] font-bold tracking-widest px-2 py-1 rounded-[1px] shadow-lg shadow-brand-orange/10 group-hover:bg-[#FF8533] transition-colors">
                                    KHÁM PHÁ BỘ SƯU TẬP
                                    <span className="text-[7px]">→</span>
                                  </span>
                                </div>
                              </div>

                              {/* Right: Premium Real Photo Showcase & Japanese writing */}
                              <div className="col-span-5 relative h-44 flex items-center justify-center">
                                {/* Red Japanese Sun disk */}
                                <div className="absolute w-24 h-24 rounded-full bg-[#D32F2F]/5 border border-[#D32F2F]/10 flex items-center justify-center">
                                  <div className="absolute w-12 h-12 rounded-full bg-[#D32F2F]/15 blur-sm" />
                                </div>

                                {/* Elegant Polaroid Frame displaying real randomphitruongstore.png */}
                                <div className="relative z-10 w-full max-w-[130px] bg-[#141414] border border-white/10 rounded-sm p-1.5 shadow-xl rotate-[-3deg] hover:rotate-0 transition-transform duration-500">
                                  <div className="h-28 w-full bg-[#0d0d0d] rounded-[1px] overflow-hidden relative">
                                    <BlurUpImage 
                                      src={randomPhiTruongStore} 
                                      alt="PhiTruong Store Live" 
                                      className="w-full h-full object-cover opacity-95 hover:scale-110 transition-all duration-500"
                                      wrapperClassName="w-full h-full"
                                      referrerPolicy="no-referrer"
                                    />
                                    <div className="absolute top-1 left-1 bg-brand-orange/90 text-white text-[5px] font-mono px-1 py-0.5 rounded-[1px] tracking-wider uppercase">
                                      LIVE PREVIEW
                                    </div>
                                  </div>
                                  <div className="mt-1.5 text-center">
                                    <span className="font-mono text-[5.5px] text-[#8E8E93] tracking-widest uppercase block">
                                      PHITRUONG_STORE.PNG
                                    </span>
                                  </div>
                                </div>

                                {/* Vertical Calligraphy text block */}
                                <div className="absolute right-1 top-4 flex flex-col items-center bg-[#1C1C1E]/60 border border-white/5 py-1 px-0.5 rounded-[1px] select-none">
                                  <span className="font-mono text-[5.5px] text-[#F5F5F3] font-bold tracking-widest writing-vertical uppercase">ス</span>
                                  <span className="font-mono text-[5.5px] text-[#F5F5F3] font-bold tracking-widest writing-vertical uppercase">カ</span>
                                  <span className="font-mono text-[5.5px] text-[#F5F5F3] font-bold tracking-widest writing-vertical uppercase">ジ</span>
                                  <span className="font-mono text-[5.5px] text-[#F5F5F3] font-bold tracking-widest writing-vertical uppercase">ャ</span>
                                  <span className="font-mono text-[5.5px] text-[#F5F5F3] font-bold tracking-widest writing-vertical uppercase">ン</span>
                                </div>
                              </div>
                            </div>

                            {/* Footer trust elements & Zalo bubble */}
                            <div className="flex justify-between items-end border-t border-white/5 pt-2 mt-2">
                              <div className="flex flex-col">
                                <span className="font-mono text-[5px] text-[#8E8E93] uppercase">TRUSTWORTHY COMPLIANCE</span>
                                <span className="text-[6px] text-white tracking-wider font-mono">DELIVERY 7-10 DAYS · 24/7 SUPPORT</span>
                              </div>
                              
                              {/* Zalo chat simulator pill */}
                              <div className="bg-[#0068FF] hover:bg-[#0055D0] px-2 py-0.5 rounded-sm flex items-center gap-1 shadow-lg border border-[#0068FF]/30 cursor-pointer transition-colors">
                                <span className="w-1 h-1 bg-white rounded-full animate-ping" />
                                <span className="font-mono text-[6px] font-black text-white tracking-widest">ZALO CHAT</span>
                              </div>
                            </div>

                          </div>

                        </div>
                      </MagnifyingLens>
                    )}

                    {/* 2. PuDo Code System: Terminal/CLI IDE Mockup representing coding agent guidelines */}
                    {project.id === "pudo_code_system" && (
                      <div className="w-full h-full flex flex-col justify-between relative z-10 text-left font-mono text-[9px] text-[#8E8E93]" id="pudo-visual">
                        {/* Terminal Header */}
                        <div className="bg-[#1C1C1E] border border-white/5 rounded-t-md px-3 py-2 flex items-center justify-between gap-4 select-none shrink-0">
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                          </div>
                          <span className="font-mono text-[8px] text-white/50 tracking-wider">pudo-system --active</span>
                          <div className="w-12 shrink-0" />
                        </div>

                        {/* Terminal Web Viewport */}
                        <div className="flex-1 bg-[#090909] border-x border-b border-white/5 rounded-b-md p-4 flex flex-col justify-between select-none min-h-[360px] relative overflow-hidden">
                          {/* Ambient green/orange glow for terminal style */}
                          <div className="absolute top-1/3 right-1/4 w-44 h-44 rounded-full bg-brand-orange/5 blur-[50px] pointer-events-none" />

                          {/* Code Viewport Structure */}
                          <div className="space-y-4">
                            {/* Directory & setup indicator */}
                            <div className="border-b border-white/5 pb-2 text-[8px] text-white/40 flex justify-between select-none">
                              <span>PATH: ~/.agents/pudo-code-system/</span>
                              <span>STATUS: READY</span>
                            </div>

                            {/* Simulated Workspace Folders */}
                            <div className="space-y-1 text-[8.5px] leading-relaxed">
                              <p className="text-[#27C93F]">📁 .agents/</p>
                              <p className="text-[#8E8E93] pl-4">📄 AGENTS.md <span className="text-white/20">// Main System Prompt rules</span></p>
                              <p className="text-[#8E8E93] pl-4">📄 setup.sh <span className="text-white/20">// Project Environment Spec</span></p>
                              <p className="text-[#27C93F]">📁 skills/</p>
                              <p className="text-[#8E8E93] pl-4">📄 coding_expert.md <span className="text-white/20">// Codebase researcher skill</span></p>
                            </div>

                            {/* CLI Agent Conversation Simulation */}
                            <div className="pt-2 border-t border-white/5 space-y-1.5 text-[8px]">
                              <p className="text-white font-medium">$ pudo init --agent --workspace</p>
                              <p className="text-[#8E8E93]">Initializing Workspace guidelines...</p>
                              <p className="text-brand-orange font-semibold">[PUDO] Loading custom Coding Agent context.</p>
                              <p className="text-[#27C93F]">[SUCCESS] Agent workspace rules loaded (25 rules active).</p>
                              <p className="text-[#8E8E93] animate-pulse">$ pudo prompt "refactor auth logic" | agent</p>
                            </div>
                          </div>

                          {/* Bottom diagnostic stats */}
                          <div className="flex justify-between items-center border-t border-white/5 pt-2 mt-2 text-[7px] text-white/30">
                            <span>AGENT_SUCCESS_RATE: 98.4%</span>
                            <span>VER: 1.0.4</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 3. Fortify Kitchen: Healthy Food Web Interface Mockup */}
                    {project.id === "fortify_kitchen" && (
                      <MagnifyingLens lang={lang} zoomImage={fortifyHomepage} zoomLevel={2.5}>
                        <div className="w-full h-full flex flex-col justify-between relative z-10 text-left font-sans" id="fortify-visual">
                          {/* Mock Browser Header */}
                          <div className="bg-[#1C1C1E] border border-white/5 rounded-t-md px-3 py-2 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-1.5 shrink-0">
                              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                              <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                            </div>
                            
                            {/* Search Bar / Address URL */}
                            <div className="flex-1 max-w-md mx-auto bg-[#090909]/60 border border-white/5 rounded-sm py-0.5 px-3 flex items-center justify-between gap-2 text-[#8E8E93]">
                              <span className="text-[7.5px] font-mono tracking-wider truncate">https://fortifykitchen.vercel.app</span>
                              <span className="text-[8px] font-bold">↻</span>
                            </div>
                            <div className="w-12 shrink-0" />
                          </div>

                          {/* Simulated Web Viewport */}
                          <div className="flex-1 bg-[#090909] border-x border-b border-white/5 rounded-b-md p-4 flex flex-col justify-between relative overflow-hidden select-none min-h-[360px]">
                            
                            {/* Ambient green/orange glow */}
                            <div className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-emerald-500/5 blur-[60px] pointer-events-none" />

                            {/* Mini Navbar */}
                            <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-3">
                              <div className="flex flex-col">
                                <span className="font-bold tracking-widest text-[9px] text-white">FORTIFY.KITCHEN</span>
                                <span className="text-[5px] tracking-widest text-brand-orange -mt-0.5">HEALTHY MEAL PLAN</span>
                              </div>

                              <div className="hidden sm:flex items-center gap-3 font-mono text-[6.5px] tracking-wide text-[#8E8E93]">
                                <span className="text-white">SOUS-VIDE MENU</span>
                                <span>CALORIE COMPASS</span>
                                <span>ORDER INFO</span>
                              </div>

                              <div className="flex items-center gap-2 font-mono text-[7px] text-[#8E8E93]">
                                <span className="text-[#27C93F] font-bold">HCMC</span>
                              </div>
                            </div>

                            {/* Hero Content */}
                            <div className="grid grid-cols-12 gap-3 items-center my-auto">
                              {/* Left: Copy and CTA */}
                              <div className="col-span-7 space-y-2 text-left">
                                <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.5 rounded-[2px]">
                                  <span className="w-1 h-1 bg-[#27C93F] rounded-full animate-ping" />
                                  <span className="text-[6px] tracking-widest text-[#27C93F] font-mono uppercase font-bold">
                                    {lang === "vi" ? "DINH DƯỠNG NẤU CHẬM · SOUS-VIDE" : "SLOW-COOKED MEAL PREP"}
                                  </span>
                                </div>

                                <h2 className="font-display font-black text-lg sm:text-xl text-white leading-none tracking-tight">
                                  FORTIFY<br />
                                  <span className="text-brand-orange">KITCHEN</span>
                                </h2>

                                <p className="text-[7px] text-[#8E8E93] font-light leading-snug max-w-[170px]">
                                  {lang === "vi"
                                    ? "Thực đơn Sous-vide chuẩn vị dinh dưỡng thiết kế bởi đội ngũ 5 lập trình viên & designer."
                                    : "Bespoke slow-cooked plans crafted for high-performance nutrition."}
                                </p>

                                <div className="pt-1">
                                  <span className="inline-flex items-center gap-1 bg-brand-orange text-white font-mono text-[6px] font-bold tracking-widest px-2 py-1 rounded-[1px] shadow-lg">
                                    {lang === "vi" ? "ĐẶT HÀNG TẠI HỒ CHÍ MINH" : "ORDER IN SAIGON"}
                                  </span>
                                </div>
                              </div>

                              {/* Right: Cover preview */}
                              <div className="col-span-5 relative h-44 flex items-center justify-center">
                                <div className="relative z-10 w-full max-w-[130px] bg-[#141414] border border-white/10 rounded-sm p-1.5 shadow-xl rotate-[3deg] hover:rotate-0 transition-transform duration-500">
                                  <div className="h-28 w-full bg-[#0d0d0d] rounded-[1px] overflow-hidden relative">
                                    <BlurUpImage 
                                      src={fortifyHomepage} 
                                      alt="Fortify Kitchen Cover" 
                                      className="w-full h-full object-cover opacity-95 hover:scale-110 transition-all duration-500"
                                      wrapperClassName="w-full h-full"
                                      referrerPolicy="no-referrer"
                                    />
                                    <div className="absolute top-1 left-1 bg-brand-orange/95 text-white text-[5px] font-mono px-1 py-0.5 rounded-[1px] tracking-wider">
                                      SOUS-VIDE
                                    </div>
                                  </div>
                                  <div className="mt-1.5 text-center">
                                    <span className="font-mono text-[5.5px] text-[#8E8E93] tracking-widest uppercase block">
                                      FORTIFY_LIVE.PNG
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Footer stats */}
                            <div className="flex justify-between items-end border-t border-white/5 pt-2 mt-2">
                              <div className="flex flex-col">
                                <span className="font-mono text-[5px] text-brand-orange uppercase">STATUS: MAINTENANCE & HOTFIX</span>
                                <span className="text-[6px] text-white tracking-wider font-mono">DELIVERY: HCMC ONLY · 5 MEMBER BUILD</span>
                              </div>
                            </div>

                          </div>
                        </div>
                      </MagnifyingLens>
                    )}

                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox modal for displaying dynamic interface screenshots & interactive carousels */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        projectId={selectedProjectId}
        projectName={selectedProjectName}
        lang={lang}
      />
    </section>
  );
}
