import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  FaMicrochip, 
  FaTerminal, 
  FaLayerGroup, 
  FaCompass, 
  FaUsers, 
  FaCircleQuestion, 
  FaCommentDots, 
  FaPaperPlane, 
  FaCircleCheck, 
  FaGlobe, 
  FaCode, 
  FaShieldHalved 
} from "react-icons/fa6";

// Common shimmering pulse skeleton class
const pulseClass = "animate-pulse bg-white/5 rounded-sm";

interface SkeletonProps {
  onLoaded?: () => void;
  lang: "vi" | "en";
}

// -------------------------------------------------------------
// High-Fidelity Retro-Tech Terminal Diagnostics Component
// -------------------------------------------------------------
interface SectorDiagnosticsProps {
  progress: number;
  sectorCode: string;
  statusText: string;
}

export function SectorLoadingDiagnostics({ progress, sectorCode, statusText }: SectorDiagnosticsProps) {
  const barLength = 15;
  const filledCount = Math.floor((progress / 100) * barLength);
  const emptyCount = barLength - filledCount;
  const barString = "█".repeat(filledCount) + "░".repeat(emptyCount);

  return (
    <div className="font-mono text-[10px] text-brand-orange bg-[#0b0b0c] border border-white/5 rounded-sm p-4 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-3 select-none">
      <div className="flex items-center gap-3">
        <span className="animate-ping h-2 w-2 rounded-full bg-brand-orange shrink-0" />
        <span className="text-[#8e8e93]">[{sectorCode}_INIT]</span>
        <span className="text-white font-medium truncate max-w-[280px] md:max-w-md">{statusText}</span>
      </div>
      <div className="flex items-center gap-4 justify-between md:justify-end shrink-0">
        <span className="text-white/20 tracking-wider font-semibold">{barString}</span>
        <span className="text-brand-orange font-bold font-mono min-w-[35px] text-right">{progress}%</span>
      </div>
    </div>
  );
}

// Custom progress simulation hook for each skeleton
function useProgress(onLoaded?: () => void) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;
    const timer = setInterval(() => {
      // Simulate real asynchronous chunked loads with randomized jumps
      const increment = Math.floor(Math.random() * 12) + 6;
      current = Math.min(100, current + increment);
      setProgress(current);

      if (current >= 100) {
        clearInterval(timer);
        if (onLoaded) {
          // Subtle delay for visual gratification of 100% load
          const resolveTimer = setTimeout(onLoaded, 250);
          return () => clearTimeout(resolveTimer);
        }
      }
    }, 60 + Math.random() * 50);

    return () => clearInterval(timer);
  }, [onLoaded]);

  return progress;
}

// -------------------------------------------------------------
// -------------------------------------------------------------
// Hamster Wheel Running Animation Component
// -------------------------------------------------------------
export function HamsterWheelLoader() {
  return (
    <div aria-label="Orange and tan hamster running in a metal wheel" role="img" className="wheel-and-hamster select-none">
      <div className="wheel" />
      <div className="hamster">
        <div className="hamster__body">
          <div className="hamster__head">
            <div className="hamster__ear" />
            <div className="hamster__eye" />
            <div className="hamster__nose" />
          </div>
          <div className="hamster__limb hamster__limb--fr" />
          <div className="hamster__limb hamster__limb--fl" />
          <div className="hamster__limb hamster__limb--br" />
          <div className="hamster__limb hamster__limb--bl" />
          <div className="hamster__tail" />
        </div>
      </div>
      <div className="spoke" />
    </div>
  );
}

// -------------------------------------------------------------
// Sector-Specific Skeletons
// -------------------------------------------------------------

export function HeroSkeleton({ onLoaded, lang }: SkeletonProps) {
  const progress = useProgress(onLoaded);
  const status = lang === "vi" 
    ? "ĐANG KHỞI TẠO KHÔNG GIAN TRÌNH DIỄN SÁNG TẠO..." 
    : "INITIALIZING CREATIVE DISPLAY SPACE ENGINE...";

  return (
    <section className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden py-24 border-b border-white/5 bg-[#090909]">
      <div className="absolute inset-0 swiss-grid opacity-[0.05]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-orange/10 rounded-full blur-[100px]" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 w-full flex flex-col items-center justify-center text-center my-auto">
        {/* Animated Hamster Wheel Initial Loader */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-col items-center justify-center"
        >
          <HamsterWheelLoader />
        </motion.div>

        {/* Diagnostics HUD */}
        <div className="w-full max-w-xl mb-6">
          <SectorLoadingDiagnostics progress={progress} sectorCode="SECTOR_00" statusText={status} />
        </div>

        {/* Skeleton Pulsing Lines representing initial layout structure */}
        <div className="w-full max-w-2xl space-y-4 flex flex-col items-center">
          <div className={`${pulseClass} h-10 md:h-14 w-[85%]`} />
          <div className={`${pulseClass} h-10 md:h-14 w-[65%]`} />
          <div className={`${pulseClass} h-4 w-[50%] mt-4`} />
        </div>
      </div>
    </section>
  );
}

export function AboutSkeleton({ onLoaded, lang }: SkeletonProps) {
  const progress = useProgress(onLoaded);
  const status = lang === "vi"
    ? "BẢN ĐỒ TRIẾT LÝ // PHÂN TÍCH TRỤ CỘT HOẠT ĐỘNG..."
    : "PHILOSOPHY MAP // ANALYZING STUDIO CORE PILLARS...";

  return (
    <section className="py-24 md:py-32 bg-[#090909] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <SectorLoadingDiagnostics progress={progress} sectorCode="SECTOR_01" statusText={status} />

        {/* Header Label Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 border-b border-white/5 pb-16 mb-16">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs text-brand-orange">[ 01_MISSION ]</span>
              <div className="h-[1px] w-12 bg-white/10" />
            </div>
            <div className={`${pulseClass} h-10 md:h-16 w-3/4`} />
          </div>
          <div className="lg:col-span-4 flex flex-col justify-end gap-4 pt-4 lg:pt-0">
            <div className={`${pulseClass} h-4 w-full`} />
            <div className={`${pulseClass} h-4 w-5/6`} />
            <div className={`${pulseClass} h-4 w-1/3`} />
          </div>
        </div>

        {/* Core Values Bento Columns with interactive progressive highlight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { id: 1, milestone: 30, label: "01 / INTEGRITY" },
            { id: 2, milestone: 60, label: "02 / CRAFTSMANSHIP" },
            { id: 3, milestone: 90, label: "03 / VELOCITY" }
          ].map((card) => {
            const isLit = progress >= card.milestone;
            return (
              <div 
                key={card.id} 
                className={`border rounded-sm p-8 bg-[#121212]/20 relative overflow-hidden transition-all duration-300 ${
                  isLit ? "border-brand-orange/40 shadow-[0_0_15px_rgba(255,8a,0,0.05)]" : "border-white/5"
                }`}
              >
                <div className="flex items-center justify-between mb-8">
                  <div className={`p-3 rounded-sm ${isLit ? "bg-brand-orange/10 text-brand-orange" : "bg-white/5 text-[#8e8e93]"}`}>
                    <FaLayerGroup className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs text-[#8e8e93]">{card.label}</span>
                </div>
                
                <div className={`${pulseClass} h-6 w-1/2 mb-4`} />
                <div className="space-y-2">
                  <div className={`${pulseClass} h-3 w-full`} />
                  <div className={`${pulseClass} h-3 w-[90%]`} />
                  <div className={`${pulseClass} h-3 w-[80%]`} />
                </div>

                {/* Micro Status Check */}
                <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] font-mono">
                  <span className="text-[#8e8e93]">[ STATUS ]</span>
                  <span className={isLit ? "text-[#27C93F] font-bold" : "text-[#8e8e93]/30 animate-pulse"}>
                    {isLit ? "READY" : "LOADING..."}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export function ServicesSkeleton({ onLoaded, lang }: SkeletonProps) {
  const progress = useProgress(onLoaded);
  const status = lang === "vi"
    ? "TRUY XUẤT NĂNG LỰC // ĐỒNG BỘ DỮ LIỆU DỊCH VỤ CÔNG NGHỆ..."
    : "CAPABILITY SCAN // SYNCING TECH SERVICE PARAMETERS...";

  return (
    <section className="py-24 md:py-32 bg-[#090909] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <SectorLoadingDiagnostics progress={progress} sectorCode="SECTOR_02" statusText={status} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column Description */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-2 font-mono text-xs text-[#8e8e93]">
                <Globe className="w-4 h-4 text-brand-orange" />
                <span>SPEC_CATALOG_v4.0</span>
              </div>
              <div className={`${pulseClass} h-10 md:h-14 w-full`} />
              <div className="space-y-2">
                <div className={`${pulseClass} h-3.5 w-full`} />
                <div className={`${pulseClass} h-3.5 w-5/6`} />
              </div>
            </div>
            
            <div className="hidden lg:block border-l border-white/5 pl-6 py-4 mt-8 space-y-2">
              <div className={`${pulseClass} h-3 w-28`} />
              <div className={`${pulseClass} h-3.5 w-full`} />
            </div>
          </div>

          {/* Right Column List with checklist lighting up staggeredly */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {[
              { id: 1, min: 20, label: "01 // INTERFACE ENGINEERING" },
              { id: 2, min: 40, label: "02 // FULLSTACK INTEGRATIONS" },
              { id: 3, min: 60, label: "03 // PERFORMANCE SECURITY AUDIT" },
              { id: 4, min: 80, label: "04 // CLOUD SYSTEMS ORCHESTRATION" },
              { id: 5, min: 95, label: "05 // CYBER-PHYSICAL INTERACTION" }
            ].map((service) => {
              const active = progress >= service.min;
              return (
                <div 
                  key={service.id} 
                  className={`border p-6 md:p-8 rounded-sm bg-[#121212]/10 flex items-start justify-between gap-4 transition-all duration-300 ${
                    active ? "border-brand-orange/35 bg-brand-orange/[0.02]" : "border-white/5"
                  }`}
                >
                  <div className="flex items-start gap-5 w-full">
                    <div className={`p-2.5 rounded-sm shrink-0 ${active ? "bg-brand-orange/15 text-brand-orange" : "bg-white/5 text-[#8e8e93]"}`}>
                      <FaCode className="w-5 h-5" />
                    </div>
                    <div className="w-full space-y-3">
                      <div className="font-mono text-xs font-semibold text-white/90 flex items-center gap-2">
                        <span>{service.label}</span>
                        {active && <span className="text-[9px] text-[#27C93F] bg-[#27C93F]/10 px-1.5 py-0.5 rounded-sm">COMPILED</span>}
                      </div>
                      <div className={`${pulseClass} h-3 w-2/3`} />
                    </div>
                  </div>
                  <div className="shrink-0 flex items-center">
                    {active ? (
                      <FaCircleCheck className="w-5 h-5 text-[#27C93F]" />
                    ) : (
                      <span className="w-5 h-5 rounded-full border border-white/10 animate-spin border-t-brand-orange shrink-0" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

export function SelectedWorkSkeleton({ onLoaded, lang }: SkeletonProps) {
  const progress = useProgress(onLoaded);
  const status = lang === "vi"
    ? "SẢN PHẨM ĐẶC SẮC // KHỞI TẠO BỘ ĐỆM ĐỒ HỌA MỸ THUẬT..."
    : "SELECTED PROJECTS // CACHING ARTWORK VISUAL BUFFERS...";

  return (
    <section className="py-24 md:py-32 bg-[#090909] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <SectorLoadingDiagnostics progress={progress} sectorCode="SECTOR_03" statusText={status} />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs text-brand-orange">[ 03_ARCHIVE ]</span>
              <span className="h-[1px] w-12 bg-white/10" />
            </div>
            <div className={`${pulseClass} h-12 md:h-16 w-80`} />
          </div>
          <div className={`${pulseClass} h-4 w-64`} />
        </div>

        {/* Project Layout Mock */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Project List Column */}
          <div className="lg:col-span-5 space-y-3">
            {[1, 2, 3, 4].map((idx) => (
              <div key={idx} className="border border-white/5 p-5 rounded-sm bg-[#121212]/10 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className={`${pulseClass} h-4 w-12`} />
                  <span className="text-[9px] font-mono text-[#8e8e93]/50">INDEX_0{idx}</span>
                </div>
                <div className={`${pulseClass} h-6 w-3/4`} />
                <div className="flex gap-2">
                  <div className={`${pulseClass} h-4 w-16`} />
                  <div className={`${pulseClass} h-4 w-20`} />
                </div>
              </div>
            ))}
          </div>

          {/* Project Display / Previewer column with real scanline visual decompiling progress */}
          <div className="lg:col-span-7 border border-white/5 p-6 rounded-sm bg-[#121212]/20 flex flex-col justify-between min-h-[450px] relative overflow-hidden">
            <div className="absolute inset-0 bg-[#000]/20 pointer-events-none" />
            
            {/* Visual Scanline Effect representing compiling */}
            <div 
              className="absolute left-0 right-0 h-[2px] bg-brand-orange/30 shadow-[0_0_10px_#ff8a00] z-20 pointer-events-none"
              style={{
                top: `${progress}%`,
                transition: "top 120ms ease-out"
              }}
            />

            <div className="flex items-center justify-between border-b border-white/5 pb-4 relative z-10">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff3b30]/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffcc00]/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/40" />
              </div>
              <div className="font-mono text-[9px] text-[#8e8e93] uppercase">
                PORTFOLIO_IMAGE_DECOMPILER.EXE
              </div>
              <div className="w-5" />
            </div>

            <div className="my-auto py-12 flex flex-col items-center justify-center space-y-4 relative z-10">
              <div className="relative">
                <div className={`${pulseClass} h-36 w-36 rounded-full border border-brand-orange/10 flex items-center justify-center`} />
                <FaCompass className="w-10 h-10 text-brand-orange/20 absolute inset-0 m-auto animate-spin" style={{ animationDuration: "12s" }} />
              </div>
              <div className="font-mono text-xs text-brand-orange bg-[#090909] px-3 py-1 border border-white/5 rounded-sm">
                COMPILING RENDER BUFFERS: {progress}%
              </div>
              <div className={`${pulseClass} h-3 w-64`} />
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-white/5 relative z-10">
              <div className={`${pulseClass} h-4 w-20`} />
              <div className="font-mono text-[10px] text-[#27C93F]">
                {progress < 100 ? "STREAMING PIXELS..." : "RASTERIZATION COMPLETE"}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export function ProcessSkeleton({ onLoaded, lang }: SkeletonProps) {
  const progress = useProgress(onLoaded);
  const status = lang === "vi"
    ? "QUY TRÌNH KỸ THUẬT // VẼ SƠ ĐỒ PHÁT TRIỂN SẢN PHẨM..."
    : "ENGINEERING PROCESS // MAPPING COLLABORATION WORKFLOWS...";

  return (
    <section className="py-24 md:py-32 bg-[#090909] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <SectorLoadingDiagnostics progress={progress} sectorCode="SECTOR_04" statusText={status} />

        {/* 4 Process blocks horizontal or stacked vertical */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { id: 1, range: [0, 25], title: "01 // CO-DESIGN & SPEC" },
            { id: 2, range: [25, 50], title: "02 // STAGED LEVEL BUILD" },
            { id: 3, range: [50, 75], title: "03 // QA AUTOMATED AUDIT" },
            { id: 4, range: [75, 100], title: "04 // LAUNCH & MONITORS" }
          ].map((node) => {
            const active = progress >= node.range[0];
            const completed = progress >= node.range[1];
            
            return (
              <div 
                key={node.id} 
                className={`border p-6 rounded-sm bg-[#121212]/10 space-y-4 transition-all duration-300 ${
                  completed ? "border-[#27C93F]/30 bg-[#27C93F]/[0.01]" : active ? "border-brand-orange/30 bg-brand-orange/[0.01]" : "border-white/5"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                    completed ? "bg-[#27C93F]/10 text-[#27C93F]" : active ? "bg-brand-orange/10 text-brand-orange animate-pulse" : "bg-white/5 text-[#8e8e93]"
                  }`}>
                    {node.id}
                  </div>
                  <div className="font-mono text-[9px] text-[#8e8e93]">
                    {completed ? "[ OK ]" : active ? "[ ACTIVE ]" : "[ PEND ]"}
                  </div>
                </div>
                
                <div className="font-mono text-xs font-semibold text-white/90">{node.title}</div>
                
                <div className="space-y-1.5">
                  <div className={`${pulseClass} h-3 w-full`} />
                  <div className={`${pulseClass} h-3 w-5/6`} />
                </div>

                {/* Simulated subtask progress bar */}
                <div className="w-full bg-white/5 h-[2px] rounded-sm relative overflow-hidden">
                  <div 
                    className={`absolute top-0 left-0 h-full transition-all duration-200 ${completed ? "bg-[#27C93F]" : "bg-brand-orange"}`}
                    style={{ 
                      width: completed ? "100%" : active ? `${((progress - node.range[0]) / 25) * 100}%` : "0%" 
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export function TechnologySkeleton({ onLoaded, lang }: SkeletonProps) {
  const progress = useProgress(onLoaded);
  const status = lang === "vi"
    ? "HỆ THỐNG CÔNG NGHỆ // KHỞI TẠO CÁC MÔ-ĐUN TRÌNH BIÊN DỊCH..."
    : "SYSTEM STACK // INITIALIZING COMPILER TOOLCHAINS...";

  const modules = [
    { name: "UI Framework", limit: 20, code: "REACT_19" },
    { name: "Visual Engine", limit: 40, code: "TAILWIND_V4" },
    { name: "Type Compiler", limit: 60, code: "TSC_v5.8" },
    { name: "Audio Kernel", limit: 75, code: "WEB_AUDIO" },
    { name: "System Routing", limit: 90, code: "VITE_V6" },
    { name: "Security Gate", limit: 98, code: "SECURE_HTTPS" }
  ];

  return (
    <section className="py-24 md:py-32 bg-[#090909] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <SectorLoadingDiagnostics progress={progress} sectorCode="SECTOR_05" statusText={status} />

        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs text-brand-orange">[ 05_STACK ]</span>
              <span className="h-[1px] w-12 bg-white/10" />
            </div>
            <div className={`${pulseClass} h-10 md:h-14 w-80`} />
          </div>
          <div className={`${pulseClass} h-4 w-64`} />
        </div>

        {/* High-Fidelity Technology Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {modules.map((mod, idx) => {
            const isFinished = progress >= mod.limit;
            const isCurrent = progress >= (modules[idx - 1]?.limit || 0) && progress < mod.limit;

            return (
              <div 
                key={mod.name} 
                className={`border p-6 rounded-sm bg-[#121212]/10 flex flex-col items-center justify-center space-y-4 text-center transition-all duration-300 ${
                  isFinished ? "border-[#27C93F]/30 bg-[#27C93F]/[0.01]" : isCurrent ? "border-brand-orange/30 bg-brand-orange/[0.01] animate-pulse" : "border-white/5"
                }`}
              >
                <div className={`p-3 rounded-sm ${isFinished ? "bg-[#27C93F]/10 text-[#27C93F]" : isCurrent ? "bg-brand-orange/10 text-brand-orange" : "bg-white/5 text-[#8e8e93]"}`}>
                  <FaMicrochip className="w-6 h-6" />
                </div>
                
                <div className="space-y-1">
                  <div className="font-mono text-[10px] font-bold text-white/90">{mod.name}</div>
                  <div className="font-mono text-[8px] text-[#8e8e93]">{mod.code}</div>
                </div>

                <div className="font-mono text-[9px] w-full pt-2 border-t border-white/5">
                  {isFinished ? (
                    <span className="text-[#27C93F] font-bold">[ READY ]</span>
                  ) : isCurrent ? (
                    <span className="text-brand-orange font-bold animate-pulse">[ COMPILING ]</span>
                  ) : (
                    <span className="text-[#8e8e93]/30">[ PENDING ]</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export function TeamSkeleton({ onLoaded, lang }: SkeletonProps) {
  const progress = useProgress(onLoaded);
  const status = lang === "vi"
    ? "SÁNG LẬP VIÊN // THIẾT LẬP HỒ SƠ ĐỘI NGŨ THIẾT KẾ..."
    : "STUDIO LEADERS // STRUCTURING COLLABORATIVE TEAM DOSSIERS...";

  return (
    <section className="py-24 md:py-32 bg-[#090909] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <SectorLoadingDiagnostics progress={progress} sectorCode="SECTOR_06" statusText={status} />

        {/* Founders cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((idx) => {
            const milestone = idx * 30;
            const isScanned = progress >= milestone;

            return (
              <div 
                key={idx} 
                className={`border rounded-sm bg-[#121212]/10 p-6 flex flex-col items-center text-center space-y-4 transition-all duration-300 ${
                  isScanned ? "border-brand-orange/20" : "border-white/5"
                }`}
              >
                {/* Custom circular progress loader ring around avatar */}
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <svg className="absolute w-full h-full transform -rotate-90">
                    <circle 
                      cx="72" 
                      cy="72" 
                      r="64" 
                      stroke="rgba(255,255,255,0.02)" 
                      strokeWidth="2" 
                      fill="transparent" 
                    />
                    <circle 
                      cx="72" 
                      cy="72" 
                      r="64" 
                      stroke="#ff8a00" 
                      strokeWidth="2" 
                      fill="transparent" 
                      strokeDasharray="402"
                      strokeDashoffset={402 - (402 * Math.min(progress, milestone)) / milestone}
                      className="transition-all duration-300 ease-out"
                    />
                  </svg>
                  <div className={`w-28 h-28 rounded-full flex items-center justify-center ${pulseClass}`}>
                    <FaUsers className="w-8 h-8 text-white/10" />
                  </div>
                </div>

                <div className="space-y-2.5 w-full flex flex-col items-center">
                  <div className={`${pulseClass} h-5 w-2/3`} />
                  <div className={`${pulseClass} h-4 w-1/2`} />
                </div>
                
                <div className="flex gap-3 pt-2 w-full justify-center">
                  <div className={`${pulseClass} h-5 w-16`} />
                  <div className={`${pulseClass} h-5 w-20`} />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export function TestimonialsSkeleton({ onLoaded, lang }: SkeletonProps) {
  const progress = useProgress(onLoaded);
  const status = lang === "vi"
    ? "ĐÁNH GIÁ ĐỐI TÁC // GIẢI MÃ VÀ KIỂM CHỨNG KHÁCH HÀNG..."
    : "PARTNER REVIEWS // DECRYPTING CIPHER CREDENTIALS...";

  // Cryptic scrambling simulation text
  const [crypticText, setCrypticText] = useState("");
  
  useEffect(() => {
    if (progress >= 100) {
      setCrypticText(lang === "vi" 
        ? '"Họ đã thiết kế và triển khai một nền tảng với hiệu năng tối ưu, hoàn toàn không xảy ra lỗi."' 
        : '"They executed an incredibly robust frontend system that performs flawlessly under heavy loads."');
    } else {
      const chars = "XYZ#$%@&*<>!?1234567890[]{}";
      let res = "";
      for (let i = 0; i < 90; i++) {
        res += chars[Math.floor(Math.random() * chars.length)];
      }
      setCrypticText(res);
    }
  }, [progress, lang]);

  return (
    <section className="py-24 md:py-32 bg-[#090909] border-t border-white/5 relative">
      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 text-center space-y-8">
        
        <SectorLoadingDiagnostics progress={progress} sectorCode="SECTOR_07" statusText={status} />

        {/* Slide text box with cipher text */}
        <div className="space-y-4 max-w-2xl mx-auto flex flex-col items-center">
          <div className="font-mono text-xs text-[#8e8e93]/50 mb-2 uppercase tracking-widest">
            [ SECURE_KEYPORT_DECRYPTOR_v2.0 ]
          </div>
          <p className="font-mono text-xs md:text-sm text-brand-orange/80 break-all leading-relaxed bg-[#0a0a0b] p-6 border border-white/5 rounded-sm w-full min-h-[100px]">
            {crypticText}
          </p>
        </div>

        {/* Author details */}
        <div className="flex flex-col items-center pt-4 space-y-2">
          <div className={`${pulseClass} h-5 w-32`} />
          <div className={`${pulseClass} h-3.5 w-44`} />
        </div>

      </div>
    </section>
  );
}

export function FAQSkeleton({ onLoaded, lang }: SkeletonProps) {
  const progress = useProgress(onLoaded);
  const status = lang === "vi"
    ? "GIẢI ĐÁP CƠ SỞ // TRA CỨU MỤC LỤC TRỢ GIÚP KỸ THUẬT..."
    : "FAQ RETRIEVAL // COMPILING KNOWLEDGE BASE DIRECTORY...";

  return (
    <section className="py-24 md:py-32 bg-[#090909] border-t border-white/5 relative">
      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 space-y-16">
        
        <SectorLoadingDiagnostics progress={progress} sectorCode="SECTOR_08" statusText={status} />

        {/* Accordions */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {[
            { id: 1, limit: 25, title: "Q: DO YOU PROVIDE POST-LAUNCH SYSTEMS SUPPORT?" },
            { id: 2, limit: 50, title: "Q: HOW DO YOU HANDLE SECURITY ENCRYPTIONS?" },
            { id: 3, limit: 75, title: "Q: CAN WE CHOOSE THE HOSTING ENDPOINTS?" },
            { id: 4, limit: 95, title: "Q: WHAT IS YOUR STANDARD LEVEL-LOAD POLICY?" }
          ].map((faq) => {
            const isParsed = progress >= faq.limit;
            return (
              <div 
                key={faq.id} 
                className={`border rounded-sm bg-[#111111]/40 p-5 flex items-center justify-between transition-all duration-300 ${
                  isParsed ? "border-brand-orange/25" : "border-white/5"
                }`}
              >
                <div className="flex items-center gap-3 w-full">
                  <FaCircleQuestion className={`w-4.5 h-4.5 shrink-0 ${isParsed ? "text-brand-orange" : "text-[#8e8e93]/30"}`} />
                  <div className="font-mono text-xs font-semibold text-white/80">{faq.title}</div>
                </div>
                <div className="shrink-0 text-mono text-[9px] text-[#8e8e93]">
                  {isParsed ? "[ OK ]" : "[ READ ]"}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export function ContactSkeleton({ onLoaded, lang }: SkeletonProps) {
  const progress = useProgress(onLoaded);
  const status = lang === "vi"
    ? "CỔNG THƯ ĐIỆN TỬ // KIỂM TRA ĐƯỜNG TRUYỀN ENVELOPE..."
    : "INQUIRY CHANNEL // VERIFYING ENVELOPE SECURE SOCKETS...";

  return (
    <section className="py-24 md:py-32 bg-[#090909] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left Col */}
        <div className="lg:col-span-5 space-y-6">
          <SectorLoadingDiagnostics progress={progress} sectorCode="SECTOR_09" statusText={status} />
          
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-brand-orange">[ 09_SECURE_PORTAL ]</span>
            <span className="h-[1px] w-12 bg-white/10" />
          </div>
          <div className={`${pulseClass} h-12 w-4/5`} />
          <div className="space-y-2">
            <div className={`${pulseClass} h-3.5 w-full`} />
            <div className={`${pulseClass} h-3.5 w-[85%]`} />
          </div>
        </div>

        {/* Right Col - Form */}
        <div className="lg:col-span-7 border border-white/5 p-8 rounded-sm bg-[#121212]/15 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="font-mono text-[10px] text-[#8e8e93]">[ FIELD: NAME ]</div>
              <div className={`${pulseClass} h-11 w-full`} />
            </div>
            <div className="space-y-2">
              <div className="font-mono text-[10px] text-[#8e8e93]">[ FIELD: EMAIL ]</div>
              <div className={`${pulseClass} h-11 w-full`} />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="font-mono text-[10px] text-[#8e8e93]">[ FIELD: TRANSMISSION_CONTENT ]</div>
            <div className={`${pulseClass} h-28 w-full`} />
          </div>

          <button 
            disabled 
            className="w-full h-11 bg-white/5 rounded-sm flex items-center justify-center gap-2 border border-white/5 text-xs font-mono text-[#8e8e93]"
          >
            <FaPaperPlane className="w-4 h-4 text-[#8e8e93]/50" />
            <span>ESTABLISHING TUNNEL: {progress}%</span>
          </button>
        </div>

      </div>
    </section>
  );
}

export function FooterSkeleton({ onLoaded, lang }: SkeletonProps) {
  const progress = useProgress(onLoaded);
  const status = lang === "vi"
    ? "ĐANG HOÀN THIỆN ĐƯỜNG DẪN TRANG..."
    : "COMPILING FOOTER MAPPER LINKS...";

  return (
    <footer className="border-t border-white/5 bg-[#090909] py-12 md:py-16 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectorLoadingDiagnostics progress={progress} sectorCode="SECTOR_10" statusText={status} />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-6">
          <div className="flex items-center gap-3">
            <div className={`${pulseClass} h-6 w-24`} />
          </div>
          <div className="font-mono text-[10px] text-[#8e8e93]/40">
            © 2026 THREE BUGS STUDIO // ALL COMPILED OK
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function FullPageSkeleton({ lang = "vi" }: { lang?: "vi" | "en" }) {
  return (
    <div className="min-h-screen bg-[#090909] text-[#F5F5F3] font-sans selection:bg-brand-orange selection:text-[#090909] relative">
      <HeroSkeleton lang={lang} />
      <AboutSkeleton lang={lang} />
      <ServicesSkeleton lang={lang} />
      <SelectedWorkSkeleton lang={lang} />
      <ProcessSkeleton lang={lang} />
      <TechnologySkeleton lang={lang} />
      <TeamSkeleton lang={lang} />
      <TestimonialsSkeleton lang={lang} />
      <FAQSkeleton lang={lang} />
      <ContactSkeleton lang={lang} />
      <FooterSkeleton lang={lang} />
    </div>
  );
}
