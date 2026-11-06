import React, { useState } from "react";
import { PROJECTS_DATA, TRANSLATIONS } from "../data";
import { motion } from "motion/react";
import TechIcon from "./TechIcon";
import { 
  ArrowUpRightIcon, 
  CalendarIcon, 
  CheckIcon, 
  SearchIcon,
  ImageIcon,
  HeartIcon
} from "./ui/MajesticIcon";
import Lightbox from "./Lightbox";
import randomPhiTruongStore from "@/assets/randomphitruongstore.webp";
import h1tAppPreview from "@/assets/lehongkhanh/app/h1t_app_preview.webp";
import BlurUpImage from "./BlurUpImage";
import MagnifyingLens from "./MagnifyingLens";

interface SelectedWorkProps {
  lang: "vi" | "en";
}

export default function SelectedWork({ lang }: SelectedWorkProps) {
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState("h1t_micro");
  const [selectedProjectName, setSelectedProjectName] = useState("");

  const handleOpenLightbox = (id: string, name: string) => {
    setSelectedProjectId(id);
    setSelectedProjectName(name);
    setLightboxOpen(true);
  };

  const t = TRANSLATIONS[lang];
  const projectList = PROJECTS_DATA[lang];

  return (
    <section id="work" className="py-16 md:py-20 bg-canvas border-t border-line relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-brand-ink">
                {t.workLabel}
              </span>
              <span className="h-[1px] w-12 bg-line" />
            </div>
            <h2 className="font-display font-medium text-4xl md:text-6xl tracking-tight text-ink leading-[1.05]">
              {t.workHeading}
            </h2>
          </div>
          <p className="font-mono text-xs text-ink-muted max-w-xs leading-relaxed">
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
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-stretch border-b border-line pb-16 md:pb-24 last:border-b-0"
              >
                {/* Column 1: Editorial text stories & details (Grid-Span 7) */}
                <div className="lg:col-span-7 flex flex-col justify-between order-2 lg:order-1">
                  <div>
                    {/* Index, Client & Category row */}
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2 mb-4">
                      <span className="font-mono text-xs font-bold text-brand-ink bg-brand-orange/10 border border-brand-orange/25 px-2 py-0.5 rounded-sm">
                        {String(idx + 1).padStart(2, "0")} / {String(projectList.length).padStart(2, "0")}
                      </span>
                      <span className="font-mono text-xs text-ink bg-line border border-line px-2.5 py-0.5 rounded-sm">
                        {project.client}
                      </span>
                      <span className="w-1.5 h-1.5 bg-brand-orange " />
                      <span className="font-mono text-xs text-ink-muted">
                        {project.category}
                      </span>
                      {project.id === "h1t_micro" && (
                        <span className="inline-flex items-center gap-1.5 font-mono text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-sm font-semibold">
                          <span className="w-1.5 h-1.5 rounded-sm bg-emerald-400" />
                          <span>{project.timeline}</span>
                        </span>
                      )}
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
                      className="font-display font-medium text-3xl md:text-4xl text-ink mb-4 flex items-center gap-3 cursor-pointer hover:text-brand-ink transition-colors group/title focus-visible:ring-1 focus-visible:ring-brand-orange focus-visible:outline-none rounded-sm"
                    >
                      {project.title}
                      <ArrowUpRightIcon size={24} className={`w-6 h-6 text-brand-ink transition-transform duration-300 ${
                        isHovered ? "translate-x-1 -translate-y-1" : "translate-x-0"
                      }`} />
                    </h3>

                    {/* Unikorn badges for PuDo (product, weekly rank, daily rank) */}
                    {project.id === "pudo_code_system" && (
                      <div className="flex flex-wrap items-center gap-3 mb-6">
                        {[
                          { path: "pudo", alt: "Pudo trên Unikorn.vn" },
                          { path: "pudo/rank?type=weekly", alt: "Pudo - Hàng tuần" },
                          { path: "pudo/rank?type=daily", alt: "Pudo - Hàng ngày" },
                        ].map((badge) => (
                          <a
                            key={badge.path}
                            href="https://unikorn.vn/p/pudo?ref=embed-pudo"
                            target="_blank"
                            rel="noreferrer"
                            title={badge.alt}
                            className="inline-flex items-center transition-transform hover:scale-[1.03] active:scale-95 focus-visible:ring-1 focus-visible:ring-brand-orange rounded-sm"
                          >
                            {(["dark", "light"] as const).map((theme) => (
                              <img
                                key={theme}
                                src={`https://unikorn.vn/api/widgets/badge/${badge.path}${badge.path.includes("?") ? "&" : "?"}theme=${theme}`}
                                alt={badge.alt}
                                className={`unikorn-badge-${theme} h-10 sm:h-11 w-auto object-contain`}
                                loading="lazy"
                              />
                            ))}
                          </a>
                        ))}
                      </div>
                    )}

                    {/* Specific Hero Accolades & KPI Blocks for H1T MICRO */}
                    {project.id === "h1t_micro" && (
                      <div className="space-y-4 mb-6">
                        {/* Unikorn Product of the Day & Community Upvotes Badges */}
                        <div className="flex flex-wrap items-center gap-3">
                          {/* 1. Daily Rank Badge (#1 Product of the Day) */}
                          <a 
                            href="https://unikorn.vn/p/h1t-micro?ref=embed-h1t-micro" 
                            target="_blank" 
                            rel="noreferrer"
                            title="H1T MICRO — #1 Product of the Day trên Unikorn.vn"
                            className="inline-flex items-center transition-transform hover:scale-[1.03] active:scale-95 focus-visible:ring-1 focus-visible:ring-brand-orange rounded-sm"
                          >
                            <img 
                              src="https://unikorn.vn/api/widgets/badge/h1t-micro/rank?theme=dark&type=daily" 
                              alt="H1T MICRO — #1 Product of the Day" 
                              className="unikorn-badge-dark h-10 sm:h-11 w-auto object-contain"
                              loading="lazy"
                            />
                            <img 
                              src="https://unikorn.vn/api/widgets/badge/h1t-micro/rank?theme=light&type=daily" 
                              alt="H1T MICRO — #1 Product of the Day" 
                              className="unikorn-badge-light h-10 sm:h-11 w-auto object-contain"
                              loading="lazy"
                            />
                          </a>

                          {/* 2. Weekly Rank Badge */}
                          <a
                            href="https://unikorn.vn/p/h1t-micro?ref=embed-h1t-micro"
                            target="_blank"
                            rel="noreferrer"
                            title="H1T MICRO - Hàng tuần trên Unikorn.vn"
                            className="inline-flex items-center transition-transform hover:scale-[1.03] active:scale-95 focus-visible:ring-1 focus-visible:ring-brand-orange rounded-sm"
                          >
                            <img
                              src="https://unikorn.vn/api/widgets/badge/h1t-micro/rank?theme=dark&type=weekly"
                              alt="H1T MICRO - Hàng tuần"
                              className="unikorn-badge-dark h-10 sm:h-11 w-auto object-contain"
                              loading="lazy"
                            />
                            <img
                              src="https://unikorn.vn/api/widgets/badge/h1t-micro/rank?theme=light&type=weekly"
                              alt="H1T MICRO - Hàng tuần"
                              className="unikorn-badge-light h-10 sm:h-11 w-auto object-contain"
                              loading="lazy"
                            />
                          </a>

                          {/* 3. Monthly Rank Badge */}
                          <a
                            href="https://unikorn.vn/p/h1t-micro?ref=embed-h1t-micro"
                            target="_blank"
                            rel="noreferrer"
                            title="H1T MICRO - Hàng tháng trên Unikorn.vn"
                            className="inline-flex items-center transition-transform hover:scale-[1.03] active:scale-95 focus-visible:ring-1 focus-visible:ring-brand-orange rounded-sm"
                          >
                            <img
                              src="https://unikorn.vn/api/widgets/badge/h1t-micro/rank?theme=dark&type=monthly"
                              alt="H1T MICRO - Hàng tháng"
                              className="unikorn-badge-dark h-10 sm:h-11 w-auto object-contain"
                              loading="lazy"
                            />
                            <img
                              src="https://unikorn.vn/api/widgets/badge/h1t-micro/rank?theme=light&type=monthly"
                              alt="H1T MICRO - Hàng tháng"
                              className="unikorn-badge-light h-10 sm:h-11 w-auto object-contain"
                              loading="lazy"
                            />
                          </a>

                          {/* 4. Community Upvote Badge */}
                          <a 
                            href="https://unikorn.vn/p/h1t-micro?ref=embed-h1t-micro" 
                            target="_blank" 
                            rel="noreferrer"
                            title="Bình chọn cho H1T MICRO trên Unikorn.vn"
                            className="inline-flex items-center transition-transform hover:scale-[1.03] active:scale-95 focus-visible:ring-1 focus-visible:ring-brand-orange rounded-sm"
                          >
                            <img 
                              src="https://unikorn.vn/api/widgets/badge/h1t-micro?theme=dark" 
                              alt="H1T MICRO trên Unikorn.vn" 
                              className="unikorn-badge-dark h-10 sm:h-11 w-auto object-contain"
                              loading="lazy"
                            />
                            <img 
                              src="https://unikorn.vn/api/widgets/badge/h1t-micro?theme=light" 
                              alt="H1T MICRO trên Unikorn.vn" 
                              className="unikorn-badge-light h-10 sm:h-11 w-auto object-contain"
                              loading="lazy"
                            />
                          </a>
                        </div>

                        {/* Hero KPI Stat Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          <div className="bg-surface/80 border border-emerald-500/30 p-2.5 rounded-sm">
                            <span className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-bold block">
                              {lang === "vi" ? "THÀNH VIÊN" : "COMMUNITY"}
                            </span>
                            <span className="font-display font-bold text-lg sm:text-xl text-ink">
                              2.500+
                            </span>
                          </div>
                          <div className="bg-surface/80 border border-emerald-500/30 p-2.5 rounded-sm">
                            <span className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-bold block">
                              LIGHTHOUSE
                            </span>
                            <span className="font-display font-bold text-lg sm:text-xl text-emerald-400">
                              99 / 100
                            </span>
                          </div>
                          <div className="bg-surface/80 border border-line p-2.5 rounded-sm">
                            <span className="font-mono text-xs uppercase tracking-wider text-ink-muted font-bold block">
                              {lang === "vi" ? "VI CHẤT RNI" : "MICRONUTRIENTS"}
                            </span>
                            <span className="font-display font-bold text-lg sm:text-xl text-ink">
                              22
                            </span>
                          </div>
                          <div className="bg-surface/80 border border-line p-2.5 rounded-sm">
                            <span className="font-mono text-xs uppercase tracking-wider text-ink-muted font-bold block">
                              HẠ TẦNG
                            </span>
                            <span className="font-mono font-bold text-xs sm:text-sm text-brand-ink mt-1 block truncate">
                              GOLANG · VPS
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Short Story */}
                    <p className="font-sans text-sm md:text-base text-ink-muted font-light leading-relaxed mb-6 max-w-xl">
                      {project.shortStory}
                    </p>

                    {/* Action buttons */}
                    <div className="flex flex-wrap gap-3 mb-6">
                      <button
                        onClick={() => handleOpenLightbox(project.id, project.title)}
                        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-brand-ink bg-brand-orange/5 border border-brand-orange/20 hover:bg-brand-orange hover:text-white px-3.5 py-2 rounded-sm transition-all duration-300 hover:shadow-lg hover:shadow-brand-orange/5 active:scale-95 focus-visible:ring-1 focus-visible:ring-brand-orange focus-visible:outline-none"
                      >
                        <ImageIcon size={14} className="w-3.5 h-3.5" />
                        <span>{lang === "vi" ? "Xem giao diện thực tế" : "View Interface Slides"}</span>
                      </button>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink bg-line border border-line hover:bg-brand-orange hover:border-brand-orange hover:text-[#090909] px-3.5 py-2 rounded-sm transition-all duration-300 hover:shadow-lg hover:shadow-brand-orange/5 active:scale-95 focus-visible:ring-1 focus-visible:ring-brand-orange focus-visible:outline-none"
                        >
                          <ArrowUpRightIcon size={14} className="w-3.5 h-3.5" />
                          <span>{lang === "vi" ? "Truy cập website" : "Visit Live Site"}</span>
                        </a>
                      )}

                      {project.sponsorUrl && (
                        <a
                          href={project.sponsorUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="github-sponsor-btn inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#EA4AAA] bg-[#EA4AAA]/10 border border-[#EA4AAA]/30 hover:bg-[#EA4AAA] hover:border-[#EA4AAA] hover:text-ink px-3.5 py-2 rounded-sm transition-all duration-300 hover:shadow-lg hover:shadow-[#EA4AAA]/25 active:scale-95 focus-visible:ring-1 focus-visible:ring-[#EA4AAA] focus-visible:outline-none group/sponsor"
                        >
                          <HeartIcon iconStyle="solid" size={14} className="w-3.5 h-3.5 text-[#EA4AAA] group-hover/sponsor:text-ink group-hover/sponsor:scale-110 transition-transform duration-300" />
                          <span>{lang === "vi" ? "Tài trợ dự án (Sponsor)" : "Sponsor Project"}</span>
                        </a>
                      )}
                    </div>

                    {/* Outcome Metric Block */}
                    <div className="p-4 sm:p-5 bg-surface/40 border border-line rounded-sm mb-6 flex items-start gap-3.5 hover:border-white/10 transition-colors">
                      <CheckIcon size={18} className="w-4.5 h-4.5 text-brand-ink mt-0.5 shrink-0" />
                      <div>
                        <span className="font-mono text-xs tracking-widest text-ink-muted uppercase block mb-1">
                          {t.workOutcome}
                        </span>
                        <p className="font-sans text-xs md:text-sm text-ink font-light leading-relaxed">
                          {project.outcome}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tech specs and timeline row */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-5 border-t border-line">
                    <div>
                      <span className="font-mono text-xs tracking-widest text-ink-muted uppercase block mb-2">
                        {t.workTimeline}
                      </span>
                      <span className="font-sans text-xs text-ink flex items-center gap-1.5 font-light">
                        <CalendarIcon size={14} className="w-3.5 h-3.5 text-brand-ink" />
                        {project.timeline}
                      </span>
                    </div>

                    <div className="col-span-1 md:col-span-2">
                      <span className="font-mono text-xs tracking-widest text-ink-muted uppercase block mb-2">
                        {t.workTechStack}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-xs text-ink-muted bg-surface/70 px-2 py-1 rounded-sm border border-line hover:border-brand-orange/40 hover:text-ink transition-all flex items-center gap-1.5"
                          >
                            <TechIcon name={tech} className="w-3.5 h-3.5" />
                            <span>{tech}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 2: Architectural Device Showcase Frame (Grid-Span 5) */}
                <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col justify-center">
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
                    className="h-full min-h-[340px] sm:min-h-[380px] w-full bg-surface/40 border border-line hover:border-brand-orange/40 cursor-zoom-in transition-all duration-500 rounded-sm overflow-hidden relative flex flex-col justify-center p-3 sm:p-5 group focus-visible:ring-1 focus-visible:ring-brand-orange focus-visible:outline-none"
                  >
                    {/* Interactive hover instruction overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-all duration-300 z-30 flex items-center justify-center pointer-events-none">
                      <div className="bg-[#111]/95 border border-line px-4 py-2.5 rounded-sm font-mono text-xs tracking-widest text-ink flex items-center gap-2 shadow-2xl translate-y-3 group-hover:translate-y-0 transition-all duration-300">
                        <SearchIcon size={14} className="w-3.5 h-3.5 text-brand-ink" />
                        <span>{lang === "vi" ? "TRẢI NGHIỆM GIAO DIỆN (CLICK TO EXPAND)" : "EXPLORE INTERACTIVE PREVIEW"}</span>
                      </div>
                    </div>

                    {/* Metric overlay ribbon top-right */}
                    {project.metrics && (
                      <div className="absolute top-4 right-4 bg-canvas/90 border border-line px-3 py-1 rounded-sm font-mono text-xs text-brand-ink tracking-wider z-20 shadow-lg backdrop-blur-sm">
                        {project.metrics}
                      </div>
                    )}

                    {/* Background Swiss align pattern */}
                    <div className="absolute inset-0 swiss-grid opacity-[0.12] pointer-events-none" />

                    {/* 1. Sukajan Store Device Frame */}
                    {project.id === "sukajan_store" && (
                      <MagnifyingLens lang={lang} zoomImage={randomPhiTruongStore} zoomLevel={2.5}>
                        <div className="w-full h-full flex flex-col relative z-10 text-left font-sans device-showcase-frame bg-[#0d0d0f] border border-line rounded-sm overflow-hidden shadow-2xl">
                          <div className="device-showcase-header bg-surface border-b border-line px-3 py-2 flex items-center justify-between gap-3 shrink-0">
                            <div className="flex items-center gap-1.5 shrink-0">
                              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                              <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                            </div>
                            <div className="device-showcase-url flex-1 min-w-0 max-w-xs mx-auto bg-canvas/80 border border-line rounded-sm py-0.5 px-3 flex items-center justify-between text-ink-muted text-xs font-mono">
                              <span className="truncate">https://sukajanrandomphitruong.com</span>
                              <span className="text-xs text-emerald-400">🔒</span>
                            </div>
                            <span className="hidden sm:inline font-mono text-xs text-ink-muted tracking-widest shrink-0 uppercase">E-COMMERCE</span>
                          </div>

                          <div className="relative flex-1 min-h-[260px] sm:min-h-[300px] bg-canvas overflow-hidden group/image">
                            <BlurUpImage 
                              src={randomPhiTruongStore} 
                              alt="Sukajan Store Preview" 
                              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/image:scale-[1.03]"
                              wrapperClassName="w-full h-full"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
                            <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between gap-2 z-10 pointer-events-none">
                              <div className="flex items-center gap-1.5 font-mono text-xs text-white">
                                <span className="bg-brand-orange text-[#090909] font-bold px-1.5 py-0.5 ">BRAND LAUNCH</span>
                                <span className="bg-line px-1.5 py-0.5  backdrop-blur-sm">98% SEO · 15.000+ VISITS</span>
                              </div>
                              <span className="font-mono text-xs text-ink-muted uppercase tracking-wider hidden sm:inline-block">2.5X ZOOM</span>
                            </div>
                          </div>
                        </div>
                      </MagnifyingLens>
                    )}

                    {/* 2. PuDo Code System Terminal Frame */}
                    {project.id === "pudo_code_system" && (
                      <div className="w-full h-full flex flex-col relative z-10 text-left font-mono device-showcase-frame bg-[#0d0d0f] border border-line rounded-sm overflow-hidden shadow-2xl">
                        <div className="device-showcase-header bg-surface border-b border-line px-3 py-2 flex items-center justify-between gap-3 shrink-0">
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                          </div>
                          <span className="font-mono text-xs text-ink-muted tracking-wider">pudo-system --active-ops</span>
                          <span className="hidden sm:inline font-mono text-xs text-emerald-400 tracking-widest shrink-0 uppercase">AI AGENTS</span>
                        </div>

                        <div className="p-4 sm:p-5 flex-1 min-h-[260px] sm:min-h-[300px] bg-canvas text-xs leading-relaxed space-y-3 select-none relative overflow-hidden flex flex-col justify-between">
                          <div className="space-y-2">
                            <div className="border-b border-line pb-2 text-xs text-ink-muted flex justify-between">
                              <span>PATH: ~/.agents/pudo-code-system/</span>
                              <span className="text-emerald-400 font-bold">READY · ACTIVE</span>
                            </div>
                            <div className="space-y-1 text-ink-muted text-xs">
                              <p className="text-emerald-400">📁 .agents/ <span className="text-ink-muted">// Standard System Rules</span></p>
                              <p className="pl-4 text-ink-muted">📄 AGENTS.md <span className="text-ink-muted">(25 rules active)</span></p>
                              <p className="pl-4 text-ink-muted">📄 setup.sh <span className="text-ink-muted">(Zero setup overhead)</span></p>
                              <p className="text-emerald-400">📁 skills/ <span className="text-ink-muted">// 40+ Engineering Skills</span></p>
                            </div>
                            <div className="pt-2 border-t border-line text-xs space-y-1 font-mono">
                              <p className="text-ink font-medium">$ pudo init --agent --workspace</p>
                              <p className="text-brand-ink">[PUDO] Loading custom Coding Agent context.</p>
                              <p className="text-emerald-400">[SUCCESS] Context indexing speed accelerated by 45%.</p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center border-t border-line pt-2 text-xs text-ink-muted">
                            <span>AGENT_SUCCESS_RATE: 98.4%</span>
                            <span>VER: 1.0.4</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 5. H1T MICRO Device Frame */}
                    {project.id === "h1t_micro" && (
                      <MagnifyingLens lang={lang} zoomImage={h1tAppPreview} zoomLevel={2.5}>
                        <div className="w-full h-full flex flex-col relative z-10 text-left font-sans device-showcase-frame bg-[#0d0d0f] border border-emerald-500/30 rounded-sm overflow-hidden shadow-2xl">
                          <div className="device-showcase-header bg-surface border-b border-line px-3 py-2 flex items-center justify-between gap-3 shrink-0">
                            <div className="flex items-center gap-1.5 shrink-0">
                              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                              <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                            </div>
                            <div className="device-showcase-url flex-1 min-w-0 max-w-xs mx-auto bg-canvas/80 border border-emerald-500/30 rounded-sm py-0.5 px-3 flex items-center justify-between text-ink-muted text-xs font-mono">
                              <span className="truncate">https://lehongkhanh.vn</span>
                              <span className="text-xs text-emerald-400 font-bold">LIVE 🔒</span>
                            </div>
                            <span className="hidden sm:inline font-mono text-xs text-emerald-400 font-bold tracking-widest shrink-0 uppercase">HEALTH TECH</span>
                          </div>

                          <div className="relative flex-1 min-h-[260px] sm:min-h-[300px] bg-[#0d0d0f] overflow-hidden group/image">
                            <BlurUpImage 
                              src={h1tAppPreview} 
                              alt={lang === "vi" ? "Ứng dụng H1T MICRO: màn Hôm nay, Vi chất và Khám phá" : "The H1T MICRO app: Today, Micronutrients and Explore screens"} 
                              className="w-full h-full object-contain transition-transform duration-700 group-hover/image:scale-[1.03]"
                              wrapperClassName="w-full h-full"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none" />
                            
                            {/* H1T MICRO Showcase Bottom Highlight Bar */}
                            <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between gap-2 z-10 pointer-events-none">
                              <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
                                <span className="bg-emerald-500 text-white font-bold px-2 py-0.5  shadow-lg flex items-center gap-1">
                                  <span>🏆 #1 UNIKORN</span>
                                </span>
                                <span className="bg-surface/90 border border-emerald-500/40 text-emerald-400 font-bold px-2 py-0.5  backdrop-blur-sm">
                                  👥 2.500+ MEMBERS
                                </span>
                                <span className="bg-surface/90 border border-line text-ink font-bold px-2 py-0.5  backdrop-blur-sm">
                                  ⚡ 99 LIGHTHOUSE
                                </span>
                              </div>
                              <span className="font-mono text-xs text-ink-muted uppercase tracking-wider hidden sm:inline-block">2.5X ZOOM</span>
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
