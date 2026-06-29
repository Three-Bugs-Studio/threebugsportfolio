import React, { useEffect, useState } from "react";
import { motion, useMotionValue } from "motion/react";

const CURSOR_TYPES = {
  default: {
    grid: [
      "B           ",
      "BB          ",
      "BWB         ",
      "BWWB        ",
      "BWWWB       ",
      "BWWWWB      ",
      "BWWWWWB     ",
      "BWWWWWWB    ",
      "BWWWWWWWB   ",
      "BWWWWWWWWB  ",
      "BWWWWWWWWWB ",
      "BWWWWBBBBBBB",
      "BWWB BWB    ",
      "BWB  BWB    ",
      "BB    BWB   ",
      "      BWB   ",
      "       BWB  ",
      "       BB   "
    ],
    width: 12,
    height: 18,
    hotspot: [0, 0]
  },
  pointer: {
    grid: [
      "      B       ",
      "     BWB      ",
      "     BWB      ",
      "     BWB      ",
      "     BWB  B   ",
      "     BWB BWB  ",
      "  B  BWB BWB B",
      " BWB BWB BWB B",
      " BWB BWB BWB B",
      " BWWBBWWBBWWBB",
      " BWWWWWWWWWWWB",
      "  BWWWWWWWWWWB",
      "  BWWWWWWWWWWB",
      "   BWWWWWWWWB ",
      "   BWWWWWWWWB ",
      "    BBBBBBBB  "
    ],
    width: 14,
    height: 16,
    hotspot: [6, 0]
  }
};

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    const checkTouch = () => {
      const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      setIsTouchDevice(isTouch);
    };

    checkTouch();

    if (isTouchDevice) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.tagName === "SELECT" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest('[role="button"]') ||
        target.classList.contains("interactive");

      setIsHovered(!!isInteractive);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
      setIsClicked(false);
    };
    const handleMouseEnterWindow = () => setIsVisible(true);

    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
    };
  }, [cursorX, cursorY, isVisible, isTouchDevice]);

  if (isTouchDevice || !isVisible) return null;

  const current = isHovered ? CURSOR_TYPES.pointer : CURSOR_TYPES.default;
  const scale = 2; // Pixel art scaling factor
  const offsetX = current.hotspot[0] * scale;
  const offsetY = current.hotspot[1] * scale;

  return (
    <motion.div
      id="custom-cursor-container"
      className="fixed top-0 left-0 pointer-events-none z-[1000000] select-none mix-blend-normal"
      style={{
        x: cursorX,
        y: cursorY,
        marginLeft: -offsetX,
        marginTop: -offsetY,
        filter: "drop-shadow(2px 3px 0px rgba(0,0,0,0.7))"
      }}
      animate={{
        scaleX: isClicked ? 1.25 : (isHovered ? 1.1 : 1),
        scaleY: isClicked ? 0.75 : (isHovered ? 1.1 : 1),
        rotate: isClicked ? -10 : 0
      }}
      transition={{ type: "spring", stiffness: 800, damping: 20, mass: 0.3 }}
    >
      <svg
        viewBox={`0 0 ${current.width} ${current.height}`}
        style={{
          width: `${current.width * scale}px`,
          height: `${current.height * scale}px`,
          shapeRendering: "crispEdges"
        }}
        className="overflow-visible"
      >
        {current.grid.map((row, y) => {
          return Array.from(row).map((char, x) => {
            if (char === " ") return null;
            // Border is solid black, fill transitions to brand orange on hover
            const fill = char === "B" ? "#000000" : (isHovered ? "#FF6A00" : "#FFFFFF");
            return (
              <rect
                key={`${x}-${y}`}
                x={x}
                y={y}
                width={1}
                height={1}
                fill={fill}
              />
            );
          });
        })}
      </svg>
    </motion.div>
  );
}
