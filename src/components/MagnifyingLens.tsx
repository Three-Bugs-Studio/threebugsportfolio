import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, ZoomIn } from "lucide-react";

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
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const [lensPos, setLensPos] = useState({ left: 0, top: 0 });
  const [bgPos, setBgPos] = useState("0% 0%");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate cursor position relative to the container element
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Constrain position of coordinates to track
    setCoords({
      x: Math.round(x),
      y: Math.round(y)
    });

    // Position of the magnifier lens (centered on cursor)
    const left = x - lensSize / 2;
    const top = y - lensSize / 2;

    setLensPos({ left, top });

    // Percentage of cursor position within the element container
    const pctX = (x / rect.width) * 100;
    const pctY = (y / rect.height) * 100;

    setBgPos(`${pctX}% ${pctY}%`);
  };

  const handleMouseEnter = () => {
    setIsActive(true);
  };

  const handleMouseLeave = () => {
    setIsActive(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
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
              <Search className="w-3 h-3 animate-pulse" />
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
              <span className="w-1.5 h-1.5 rounded-full bg-[#27C93F] animate-ping" />
              <span>COORDS: X={coords.x} Y={coords.y}</span>
            </motion.div>

            {/* The actual Magnifying Lens */}
            <motion.div
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.2, opacity: 0 }}
              transition={{ type: "spring", stiffness: 450, damping: 25, mass: 0.5 }}
              className="absolute pointer-events-none rounded-full border-2 border-brand-orange shadow-[0_0_20px_rgba(255,106,0,0.5),_inset_0_0_15px_rgba(0,0,0,0.8)] z-40 overflow-hidden bg-[#111111]"
              style={{
                width: lensSize,
                height: lensSize,
                left: lensPos.left,
                top: lensPos.top,
                backgroundImage: `url(${zoomImage})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: `${zoomLevel * 100}%`,
                backgroundPosition: bgPos
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
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
