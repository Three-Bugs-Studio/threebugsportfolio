import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { ChevronDownIcon } from "./ui/MajesticIcon";

// Recursive helper to extract all pure text contents from React nodes
const extractText = (node: React.ReactNode): string => {
  if (!node) return "";
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(extractText).join(" ");
  }
  if (React.isValidElement(node)) {
    return extractText((node.props as any).children);
  }
  return "";
};

interface StaggeredSectionProps {
  children: React.ReactNode;
  id: string;
  sectorName: string;
  sectorCode: string;
  lang: "vi" | "en";
}

export default function StaggeredSection({
  children,
  id,
  sectorName,
  sectorCode,
  lang
}: StaggeredSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-120px" });
  const isCurrentlyInView = useInView(containerRef, { once: false, margin: "-100px" });
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  // Track scroll & lingering to show Chevron indicator after 5 seconds of inactivity
  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;

    const resetTimer = () => {
      setShowScrollIndicator(false);

      if (timerId) {
        clearTimeout(timerId);
      }

      if (isCurrentlyInView) {
        timerId = setTimeout(() => {
          setShowScrollIndicator(true);
        }, 5000);
      }
    };

    if (isCurrentlyInView) {
      resetTimer();
      window.addEventListener("scroll", resetTimer, { passive: true });
    } else {
      setShowScrollIndicator(false);
      if (timerId) {
        clearTimeout(timerId);
      }
    }

    return () => {
      window.removeEventListener("scroll", resetTimer);
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [isCurrentlyInView]);

  // Dynamic Estimated Reading Time calculation (approx 200 WPM)
  const textContent = extractText(children);
  const wordCount = textContent.trim().split(/\s+/).filter(Boolean).length;
  const readingTimeMin = Math.max(1, Math.ceil(wordCount / 200));
  
  // Parallax mouse position tracking states
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!headerRef.current) return;
    const rect = headerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };


  return (
    <div
      ref={containerRef}
      id={id}
      className="relative border-b border-white/5 scroll-mt-24"
    >
      {/* Subtle, animated horizontal line divider that draws itself from center outwards */}
      <div className="absolute top-0 left-0 right-0 h-[1px] overflow-visible z-30 pointer-events-none">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          style={{ originX: 0.5 }}
          className="w-full h-full bg-gradient-to-r from-transparent via-brand-orange/60 to-transparent"
        />
        {/* Glowing center accent point that scales and fades in */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-brand-orange shadow-[0_0_8px_#ff6a00]"
        />
      </div>

      {/* Level Diagnostics Bar (The "Loading Screen" panel) */}
      <div
        ref={headerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setMousePos({ x: 0, y: 0 });
        }}
        className="bg-[#0c0c0c] border-y border-white/5 py-3.5 px-6 md:px-12 select-none relative overflow-hidden cursor-crosshair group transition-colors duration-300 hover:bg-[#0f0f10]"
      >
        {/* Alignment Grid Lines with subtle parallax depth */}
        <motion.div
          animate={{ x: isHovered ? mousePos.x * 12 : 0, y: isHovered ? mousePos.y * 4 : 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 22 }}
          className="absolute inset-y-0 left-6 md:left-12 w-[1px] bg-white/[0.04] pointer-events-none"
        />
        <motion.div
          animate={{ x: isHovered ? mousePos.x * -12 : 0, y: isHovered ? mousePos.y * -4 : 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 22 }}
          className="absolute inset-y-0 right-6 md:right-12 w-[1px] bg-white/[0.04] pointer-events-none"
        />

        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[10px] font-mono tracking-widest uppercase">
          {/* Diagnostic Code & Name with dynamic offset parallax layer depth */}
          <div className="flex items-center gap-3 select-none">
            <motion.span
              animate={{
                x: isHovered ? mousePos.x * -24 : 0,
                y: isHovered ? mousePos.y * -8 : 0
              }}
              transition={{ type: "spring", stiffness: 120, damping: 18, mass: 0.5 }}
              className="text-brand-orange font-bold inline-block"
            >
              [{sectorCode}]
            </motion.span>
            <motion.span
              animate={{
                x: isHovered ? mousePos.x * 24 : 0,
                y: isHovered ? mousePos.y * 8 : 0
              }}
              transition={{ type: "spring", stiffness: 120, damping: 18, mass: 0.5 }}
              className="text-white font-medium inline-block tracking-widest"
            >
              {sectorName}
            </motion.span>

            {/* Dynamic Estimated Reading Time Indicator */}
            <span className="w-1 h-1 rounded-full bg-white/10 select-none hidden sm:inline" />
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-mono text-[9px] text-[#8E8E93] font-medium tracking-wider flex items-center gap-1.5 bg-white/[0.02] border border-white/5 px-2 py-0.5 rounded-sm select-none"
            >
              <span className="text-brand-orange animate-pulse">●</span>
              {lang === "vi" 
                ? `ĐỌC ~${readingTimeMin} PHÚT` 
                : `READ ~${readingTimeMin} MIN`}
            </motion.span>
          </div>
        </div>
      </div>

      {/* Main Section Content - Fades and slides up with spring motion once sector loaded */}
      <motion.div
        variants={{
          hidden: { 
            opacity: 0, 
            y: 35
          },
          visible: { 
            opacity: 1, 
            y: 0, 
            transition: {
              type: "spring",
              stiffness: 80,
              damping: 18,
              mass: 0.8,
              staggerChildren: 0.12,
              delayChildren: 0.1
            }
          }
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative"
      >
        {children}
      </motion.div>

      {/* Subtle Scroll Down Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.95 }}
          animate={showScrollIndicator ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 15, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col items-center gap-1.5 bg-[#0c0c0c]/85 border border-white/5 px-4.5 py-2.5 rounded-sm backdrop-blur-md shadow-[0_12px_24px_-10px_rgba(0,0,0,0.8)]"
        >
          <span className="font-mono text-[8px] text-[#8E8E93] tracking-[0.25em] font-medium uppercase select-none">
            {lang === "vi" ? "CUỘN XUỐNG" : "SCROLL DOWN"}
          </span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ChevronDownIcon size={14} className="w-3.5 h-3.5 text-brand-orange drop-shadow-[0_0_4px_rgba(255,106,0,0.4)]" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
