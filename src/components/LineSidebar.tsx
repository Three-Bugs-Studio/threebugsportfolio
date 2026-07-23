import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "motion/react";

export interface LineSidebarProps {
  items: string[];
  accentColor?: string;
  textColor?: string;
  markerColor?: string;
  showIndex?: boolean;
  showMarker?: boolean;
  proximityRadius?: number;
  maxShift?: number;
  falloff?: "smooth" | "linear";
  markerLength?: number;
  markerGap?: number;
  tickScale?: number;
  scaleTick?: boolean;
  itemGap?: number;
  fontSize?: number;
  smoothing?: number;
  defaultActive?: number;
  activeSectionIndex?: number;
  onItemClick?: (index: number, label: string) => void;
  className?: string;
}

export default function LineSidebar({
  items,
  accentColor = "#FF6A00",
  textColor = "#8E8E93",
  markerColor = "rgba(255, 255, 255, 0.15)",
  showIndex = true,
  showMarker = true,
  proximityRadius = 120,
  maxShift = 25,
  falloff = "smooth",
  markerLength = 48,
  markerGap = 12,
  tickScale = 0.5,
  scaleTick = true,
  itemGap = 16,
  fontSize = 0.9,
  smoothing = 100,
  defaultActive = 0,
  activeSectionIndex,
  onItemClick,
  className = "",
}: LineSidebarProps) {
  const [activeIndex, setActiveIndex] = useState<number>(defaultActive);
  const [shifts, setShifts] = useState<number[]>(() => new Array(items.length).fill(0));
  const [tickScales, setTickScales] = useState<number[]>(() => new Array(items.length).fill(1));
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Sync activeIndex if controlled activeSectionIndex prop is passed
  useEffect(() => {
    if (activeSectionIndex !== undefined && activeSectionIndex >= 0 && activeSectionIndex < items.length) {
      setActiveIndex(activeSectionIndex);
    }
  }, [activeSectionIndex, items.length]);

  const animFrameId = useRef<number | null>(null);

  // Handle Mouse Proximity Calculation with rAF throttling for 60fps performance
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (animFrameId.current) return;

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      animFrameId.current = requestAnimationFrame(() => {
        animFrameId.current = null;

        const newShifts = new Array(items.length).fill(0);
        const newTickScales = new Array(items.length).fill(1);
        let hasChanges = false;

        itemRefs.current.forEach((el, idx) => {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const itemX = rect.left + rect.width / 2;
          const itemY = rect.top + rect.height / 2;

          const dist = Math.hypot(mouseX - itemX, mouseY - itemY);

          if (dist < proximityRadius) {
            let ratio = 1 - dist / proximityRadius;
            if (falloff === "smooth") {
              ratio = ratio * ratio * (3 - 2 * ratio);
            }

            newShifts[idx] = -ratio * maxShift;
            if (scaleTick) {
              newTickScales[idx] = 1 + ratio * tickScale;
            }
            hasChanges = true;
          }
        });

        if (hasChanges || shifts.some((s) => s !== 0)) {
          setShifts(newShifts);
          setTickScales(newTickScales);
        }
      });
    },
    [items.length, proximityRadius, falloff, maxShift, scaleTick, tickScale, shifts]
  );

  const handleMouseLeave = useCallback(() => {
    setShifts(new Array(items.length).fill(0));
    setTickScales(new Array(items.length).fill(1));
    setHoveredIdx(null);
  }, [items.length]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [handleMouseMove]);

  const handleItemClick = (index: number, label: string) => {
    setActiveIndex(index);
    if (onItemClick) {
      onItemClick(index, label);
    }
  };

  // Calculate active marker vertical offset dynamically based on active index
  const activeItemElement = itemRefs.current[activeIndex];
  const activeOffsetTop = activeItemElement ? activeItemElement.offsetTop + activeItemElement.offsetHeight / 2 : 0;

  return (
    <aside
      ref={containerRef}
      onMouseLeave={handleMouseLeave}
      className={`fixed right-6 top-1/2 -translate-y-1/2 z-[999] hidden lg:flex flex-col items-end select-none pointer-events-auto ${className}`}
      id="line-sidebar-container"
    >
      <div className="relative flex items-center gap-4">
        
        {/* Sidebar Items Container */}
        <div
          className="flex flex-col items-end"
          style={{ gap: `${itemGap}px` }}
        >
          {items.map((item, idx) => {
            const isActive = activeIndex === idx;
            const isHovered = hoveredIdx === idx;
            const shiftX = shifts[idx] || 0;
            const currentTickScale = tickScales[idx] || 1;
            const formattedIndex = idx < 9 ? `0${idx + 1}` : `${idx + 1}`;

            return (
              <div
                key={`${item}-${idx}`}
                ref={(el) => { itemRefs.current[idx] = el; }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onClick={() => handleItemClick(idx, item)}
                className="group relative flex items-center justify-end gap-3 cursor-pointer interactive transition-colors duration-200"
                style={{
                  transform: `translateX(${shiftX}px)`,
                  transition: `transform ${smoothing}ms cubic-bezier(0.16, 1, 0.3, 1), color 200ms ease`,
                }}
              >
                {/* Item Label & Index Container */}
                <div className="flex items-center gap-2">
                  
                  {/* Optional Index Number */}
                  {showIndex && (
                    <span
                      className="font-mono text-[10px] tracking-wider transition-colors duration-200"
                      style={{
                        color: isActive ? accentColor : "rgba(255, 255, 255, 0.35)",
                        fontWeight: isActive ? 600 : 400,
                      }}
                    >
                      [{formattedIndex}]
                    </span>
                  )}

                  {/* Item Text Label */}
                  <span
                    className="font-display font-medium tracking-tight uppercase whitespace-nowrap transition-all duration-200"
                    style={{
                      fontSize: `${fontSize}rem`,
                      color: isActive ? "#F5F5F3" : textColor,
                      textShadow: isActive ? `0 0 12px ${accentColor}40` : "none",
                    }}
                  >
                    {item}
                  </span>
                </div>

                {/* Individual Tick Marker Dot / Indicator */}
                {showMarker && (
                  <div
                    className="w-2 h-2 rounded-full border transition-all duration-200 flex items-center justify-center"
                    style={{
                      borderColor: isActive ? accentColor : "rgba(255, 255, 255, 0.2)",
                      backgroundColor: isActive ? `${accentColor}30` : "transparent",
                      transform: `scale(${currentTickScale})`,
                      marginLeft: `${markerGap}px`,
                    }}
                  >
                    <div
                      className="w-1 h-1 rounded-full transition-colors duration-200"
                      style={{
                        backgroundColor: isActive ? accentColor : "rgba(255, 255, 255, 0.4)",
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Vertical Rail Marker & Moving Active Indicator */}
        {showMarker && (
          <div className="relative w-1 self-stretch flex items-center justify-center my-2">
            {/* Background Rail Line */}
            <div
              className="absolute inset-y-0 w-[1px] rounded-full"
              style={{ backgroundColor: markerColor }}
            />

            {/* Smooth Moving Active Marker Indicator */}
            <motion.div
              className="absolute w-[3px] rounded-full shadow-lg"
              style={{
                backgroundColor: accentColor,
                height: `${markerLength}px`,
                boxShadow: `0 0 10px ${accentColor}`,
              }}
              animate={{
                top: activeOffsetTop - markerLength / 2,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 26,
              }}
            />
          </div>
        )}

      </div>
    </aside>
  );
}
