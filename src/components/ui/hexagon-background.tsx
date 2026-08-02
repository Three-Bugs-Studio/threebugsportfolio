import React, { useEffect, useRef } from "react";

interface HexagonBackgroundProps {
  className?: string;
  gridSize?: number;
}

export function HexagonBackground({
  className = "",
  gridSize = 40,
}: HexagonBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; radius: number }>({
    x: -1000,
    y: -1000,
    radius: 180,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Calculate Hexagon Geometry
    const r = gridSize;
    const h = r * Math.sin(Math.PI / 3);
    const w = r;
    const xStep = w * 1.5;
    const yStep = h * 2;

    let time = 0;

    const drawHexagon = (
      x: number,
      y: number,
      radius: number,
      strokeColor: string,
      fillColor: string,
      lineWidth: number = 1
    ) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const hx = x + radius * Math.cos(angle);
        const hy = y + radius * Math.sin(angle);
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();

      if (fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fill();
      }

      if (strokeColor) {
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      }
    };

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Check if light mode is active on html root
      const isLightMode = document.documentElement.classList.contains("light");

      const cols = Math.ceil(width / xStep) + 2;
      const rows = Math.ceil(height / h) + 2;

      for (let col = -1; col < cols; col++) {
        for (let row = -1; row < rows; row++) {
          const cx = col * xStep;
          const cy = row * h + (col % 2 === 0 ? 0 : h / 2);

          // Calculate distance from cursor
          const dx = mouseRef.current.x - cx;
          const dy = mouseRef.current.y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = mouseRef.current.radius;

          // Pulse animation based on coordinates & time
          const pulse = Math.sin(time + cx * 0.01 + cy * 0.01) * 0.5 + 0.5;

          let strokeColor = isLightMode
            ? `rgba(0, 105, 137, ${0.07 + pulse * 0.05})` // Ocean Blue tint for Light Theme
            : `rgba(255, 255, 255, ${0.04 + pulse * 0.04})`; // Subtle white tint for Dark Theme

          let fillColor = "transparent";
          let lineWidth = 1;

          // Interactive mouse highlight proximity
          if (dist < maxDist) {
            const factor = 1 - dist / maxDist;
            lineWidth = 1 + factor * 1.5;

            if (isLightMode) {
              strokeColor = `rgba(0, 105, 137, ${0.2 + factor * 0.5})`;
              fillColor = `rgba(0, 105, 137, ${factor * 0.08})`;
            } else {
              strokeColor = `rgba(255, 106, 0, ${0.3 + factor * 0.6})`; // Studio Cyber Orange glow (#FF6A00)
              fillColor = `rgba(255, 106, 0, ${factor * 0.1})`;
            }
          }

          drawHexagon(cx, cy, r - 2, strokeColor, fillColor, lineWidth);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [gridSize]);

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
