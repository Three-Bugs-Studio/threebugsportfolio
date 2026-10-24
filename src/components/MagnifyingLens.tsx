import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SearchIcon } from "./ui/MajesticIcon";

interface MagnifyingLensProps {
  children: React.ReactNode;
  zoomImage: string; // The high-resolution image to show inside the magnifier lens
  zoomLevel?: number; // Zoom multiplier, e.g., 2
  lensSize?: number; // Size of circular lens in pixels
  lang: "vi" | "en";
}

export default function MagnifyingLens({
  children,
  zoomImage,
  zoomLevel = 2.25,
  lensSize = 150,
  lang
}: MagnifyingLensProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const lensBgRef = useRef<HTMLDivElement>(null);
  const coordsRef = useRef<HTMLSpanElement>(null);
  const pointer = useRef({ x: 0, y: 0, w: 1, h: 1 });
  const frame = useRef(0);
  const [isActive, setIsActive] = useState(false);

  // Write lens position straight to the DOM once per frame; React state here re-rendered the whole card on every mousemove.
  const applyPointer = () => {
    frame.current = 0;
    const { x, y, w, h } = pointer.current;
    if (lensRef.current) lensRef.current.style.transform = `translate3d(${x - lensSize / 2}px, ${y - lensSize / 2}px, 0)`;
    if (lensBgRef.current) lensBgRef.current.style.backgroundPosition = `${(x / w) * 100}% ${(y / h) * 100}%`;
    if (coordsRef.current) coordsRef.current.textContent = `COORDS: X=${Math.round(x)} Y=${Math.round(y)}`;
  };

  const trackPointer = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    pointer.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, w: rect.width, h: rect.height };
    if (!frame.current) frame.current = requestAnimationFrame(applyPointer);
  };

  // Place the lens under the cursor as soon as it mounts, before the first paint.
  useLayoutEffect(() => {
    if (isActive) applyPointer();
  }, [isActive]);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    trackPointer(e);
    setIsActive(true);
  };

  const handleMouseLeave = () => {
    setIsActive(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={trackPointer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden w-full h-full cursor-none group/lens"
      id="magnifier-container"
    >
      {/* Target Content */}
      {children}

      {/* Retro CAD/Grid Diagnostic Overlays */}
      <AnimatePresence>
        {isActive && (
          <>
            {/* Top Diagnostic HUD bar */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="absolute top-3 left-3 bg-[#0a0a0af0] border border-brand-orange/30 rounded-xs py-1 px-2 font-mono text-[8px] text-brand-orange tracking-wider z-20 shadow-lg pointer-events-none flex items-center gap-1.5"
              id="magnifier-hud-top"
            >
              <SearchIcon size={12} className="w-3 h-3 animate-pulse" />
              <span>
                {lang === "vi" ? "KÍNH PHÓNG ĐẠI: ĐANG KẾT NỐI" : "LENS RETICULE: LOCK_ON"}
              </span>
              <span className="opacity-40">|</span>
              <span>ZOOM: {zoomLevel}X</span>
            </motion.div>

            {/* Bottom Coordinate Tracker HUD */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.15 }}
              className="absolute bottom-3 right-3 bg-[#0a0a0af0] border border-white/10 rounded-xs py-1 px-2.5 font-mono text-[8px] text-[#8e8e93] tracking-widest z-20 shadow-lg pointer-events-none flex items-center gap-2"
              id="magnifier-hud-bottom"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#27C93F] shadow-[0_0_6px_rgba(39,201,63,0.8)]" />
              <span ref={coordsRef}>COORDS: X=0 Y=0</span>
            </motion.div>

            {/* The actual Magnifying Lens: outer div is moved by transform, inner one handles the pop-in */}
            <div
              ref={lensRef}
              className="absolute left-0 top-0 pointer-events-none z-40 will-change-transform"
              style={{ width: lensSize, height: lensSize }}
            >
              <motion.div
                ref={lensBgRef}
                initial={{ scale: 0.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.2, opacity: 0 }}
                transition={{ type: "spring", stiffness: 450, damping: 25, mass: 0.5 }}
                className="relative w-full h-full pointer-events-none rounded-full border-2 border-brand-orange shadow-[0_0_20px_rgba(255,106,0,0.5),_inset_0_0_15px_rgba(0,0,0,0.8)] overflow-hidden bg-[#111111]"
                style={{
                  backgroundImage: `url(${zoomImage})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: `${zoomLevel * 100}%`
                }}
                id="magnifying-floating-lens"
              >
                {/* Retro Lens Scanline and Reflection Glass Grid overlay */}
                <div className="absolute inset-0 bg-[#090909]/10 pointer-events-none" />
              
                {/* Subtle grid lines inside the magnifying lens view */}
                <div className="absolute inset-0 pointer-events-none swiss-grid opacity-15" />
              
                {/* Outer metallic shine ring inside the border */}
                <div className="absolute inset-0 rounded-full border border-white/10" />

                {/* Centered crosshair */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                  <div className="w-4 h-[1px] bg-brand-orange" />
                  <div className="h-4 w-[1px] bg-brand-orange absolute" />
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
