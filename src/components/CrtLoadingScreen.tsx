import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { audioManager } from "../lib/audioManager";

interface CrtLoadingScreenProps {
  onComplete?: () => void;
  lang?: "vi" | "en";
}

// ---------------------------------------------------------------------------
// GLSL Shaders for Authentic, Resolution-Calibrated CRT Phosphor Tube
// ---------------------------------------------------------------------------
const VS_SOURCE = `
attribute vec2 aPosition;
varying vec2 vUv;
void main() {
  vUv = (aPosition + 1.0) * 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const FS_SOURCE = `
precision highp float;
uniform sampler2D uTexture;
uniform vec2 uResolution;
uniform float uAspect;
uniform float uTime;
uniform float uCurve;
uniform float uScanlineDensity;
uniform float uScanlineSpeed;
uniform float uScanlineStrength;
uniform float uApertureGrille;
uniform float uNoise;
uniform float uVignette;
uniform float uChromaticAberration;

varying vec2 vUv;

// Aspect-ratio normalized barrel distortion so curve is uniform on ALL screen resolutions
vec2 curveUv(vec2 uv, float curve, float aspect) {
  vec2 fuv = (uv - 0.5) * 1.02;
  fuv.x *= aspect;
  float d = dot(fuv, fuv);
  fuv += fuv * d * curve;
  fuv.x /= aspect;
  return fuv + 0.5;
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 uv = curveUv(vUv, uCurve, uAspect);

  // Outside glass tube curved bezel border
  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
    gl_FragColor = vec4(0.015, 0.015, 0.018, 1.0);
    return;
  }

  // Subtle Chromatic Aberration fringe on edges (calm, zero eye strain)
  vec2 dir = uv - 0.5;
  float ca = uChromaticAberration * (0.5 + length(dir));
  float r = texture2D(uTexture, uv - dir * ca).r;
  float g = texture2D(uTexture, uv).g;
  float b = texture2D(uTexture, uv + dir * ca).b;
  vec3 col = vec3(r, g, b);

  // Gentle, soothing horizontal scanlines (low contrast, no flickering)
  float scanline = sin(uv.y * uResolution.y * uScanlineDensity - uTime * uScanlineSpeed);
  scanline = (scanline + 1.0) * 0.5;
  col -= col * scanline * uScanlineStrength;

  // Soft Aperture Grille subpixel mask
  float grille = mod(gl_FragCoord.x, 3.0);
  vec3 mask = vec3(1.0);
  if (grille < 1.0) mask = vec3(1.10, 0.94, 0.94);
  else if (grille < 2.0) mask = vec3(0.94, 1.10, 0.94);
  else mask = vec3(0.94, 0.94, 1.10);
  col = mix(col, col * mask, uApertureGrille);

  // Subtle analog grain
  float noise = (hash(uv + mod(uTime, 7.0)) - 0.5) * uNoise;
  col += noise;

  // Gentle corner vignette
  float vig = uv.x * (1.0 - uv.x) * uv.y * (1.0 - uv.y) * 16.0;
  vig = clamp(pow(vig, uVignette), 0.0, 1.0);
  col *= vig;

  // Warm phosphor black base floor
  col = max(col, vec3(0.035, 0.022, 0.015));

  gl_FragColor = vec4(col, 1.0);
}
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn("CRT Shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

// ---------------------------------------------------------------------------
// Main Fullscreen CRT Loading Screen Component
// ---------------------------------------------------------------------------
export default function CrtLoadingScreen({ onComplete, lang = "vi" }: CrtLoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [fadeStage, setFadeStage] = useState<"booting" | "fading" | "finished">("booting");
  const animFrameRef = useRef<number | null>(null);

  // Boot log milestones
  const bootLogs = [
    { pct: 5,  tag: "INIT", textVi: "Khởi động Three Bugs Studio Kernel v2.6.4...", textEn: "Initializing Three Bugs Studio Kernel v2.6.4..." },
    { pct: 20, tag: "MEM ", textVi: "Cấp phát bộ nhớ: 100% Remote Collaboration... OK", textEn: "Allocating workspace: 100% Remote Collaboration... OK" },
    { pct: 40, tag: "NET ", textVi: "Kết nối đường truyền bảo mật Hà Nội & CDN nodes... OK", textEn: "Connecting secure edge tunnel to Hanoi & CDN nodes... OK" },
    { pct: 60, tag: "GPU ", textVi: "Biên dịch WebGL 3D Flow Wave & Shaders... OK", textEn: "Compiling WebGL 3D Flow Wave & Shaders... OK" },
    { pct: 75, tag: "AUD ", textVi: "Gắn kết bộ âm thanh Web Audio Synthesizer... OK", textEn: "Mounting Web Audio Synthesizer engine... OK" },
    { pct: 90, tag: "SPEC", textVi: "Xác thực kiến trúc giao diện Cyber-Brutalist... OK", textEn: "Validating Cyber-Brutalist design signatures... OK" },
    { pct: 100, tag: "DONE", textVi: "HỆ THỐNG SẴN SÀNG // CHÀO MỪNG ĐẾN THREE BUGS STUDIO!", textEn: "ALL SYSTEMS NOMINAL // ENTERING THREE BUGS STUDIO!" }
  ];

  // Silky-smooth cinematic dissolve into the website
  const handleFinish = useCallback(() => {
    if (fadeStage !== "booting") return;
    setFadeStage("fading");
    try {
      audioManager.playSweep();
    } catch (e) {}

    // Complete fade after 650ms
    const timer = setTimeout(() => {
      setFadeStage("finished");
      if (onComplete) onComplete();
    }, 650);

    return () => clearTimeout(timer);
  }, [fadeStage, onComplete]);

  // Fast forward / Skip on click or keyboard
  const handleSkip = useCallback(() => {
    setProgress(100);
    handleFinish();
  }, [handleFinish]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "Enter" || e.code === "Escape") {
        e.preventDefault();
        handleSkip();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSkip]);

  // Smooth boot progression
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      const jump = Math.floor(Math.random() * 7) + 5;
      current = Math.min(100, current + jump);
      setProgress(current);

      if (current % 25 < 6) {
        try {
          audioManager.playClick();
        } catch (e) {}
      }

      if (current >= 100) {
        clearInterval(interval);
        // Brief pleasant pause at 100% before silky dissolve
        const resolveTimer = setTimeout(() => {
          handleFinish();
        }, 220);
        return () => clearTimeout(resolveTimer);
      }
    }, 60);

    return () => clearInterval(interval);
  }, [handleFinish]);

  // WebGL & 2D Canvas rendering loop with resolution adaptation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const textCanvas = document.createElement("canvas");
    const textCtx = textCanvas.getContext("2d");

    let gl: WebGLRenderingContext | null = null;
    let program: WebGLProgram | null = null;
    let texture: WebGLTexture | null = null;
    let positionBuffer: WebGLBuffer | null = null;
    let isWebGLSupported = false;

    try {
      gl = canvas.getContext("webgl", { antialias: false, alpha: false, preserveDrawingBuffer: false });
      if (gl) {
        const vs = createShader(gl, gl.VERTEX_SHADER, VS_SOURCE);
        const fs = createShader(gl, gl.FRAGMENT_SHADER, FS_SOURCE);
        if (vs && fs) {
          program = gl.createProgram();
          if (program) {
            gl.attachShader(program, vs);
            gl.attachShader(program, fs);
            gl.linkProgram(program);
            if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
              isWebGLSupported = true;
              gl.useProgram(program);

              positionBuffer = gl.createBuffer();
              gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
              gl.bufferData(
                gl.ARRAY_BUFFER,
                new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
                gl.STATIC_DRAW
              );

              texture = gl.createTexture();
              gl.bindTexture(gl.TEXTURE_2D, texture);
              gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
              gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
              gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
              gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
              gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            }
          }
        }
      }
    } catch (e) {
      isWebGLSupported = false;
    }

    let startTime = performance.now();
    let lastW = 0;
    let lastH = 0;

    const render = (time: number) => {
      const width = canvas.clientWidth || window.innerWidth || 1920;
      const height = canvas.clientHeight || window.innerHeight || 1080;

      // Keep textCanvas and WebGL buffer strictly matched to client dimensions
      if (lastW !== width || lastH !== height) {
        lastW = width;
        lastH = height;
        canvas.width = width;
        canvas.height = height;
        textCanvas.width = width;
        textCanvas.height = height;
      }

      const elapsed = (time - startTime) * 0.001;

      // -------------------------------------------------------------
      // 1. Draw Responsive Monospace Terminal UI
      // -------------------------------------------------------------
      if (textCtx) {
        textCtx.fillStyle = "#090909";
        textCtx.fillRect(0, 0, width, height);

        const isMobile = width < 640;
        const isTablet = width >= 640 && width < 1024;
        
        // Responsive paddings
        const padX = isMobile ? 20 : isTablet ? 36 : Math.max(48, width * 0.06);
        const padY = isMobile ? 24 : isTablet ? 32 : Math.max(38, height * 0.05);

        // Header Bar
        const headerFont = isMobile ? "bold 11px" : "bold 13px";
        textCtx.font = `${headerFont} ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
        textCtx.fillStyle = "#FF6A00";
        textCtx.fillText(">> THREE BUGS STUDIO // CRT-OS v2.6.4 (POST)", padX, padY);

        if (!isMobile) {
          textCtx.font = "11px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
          textCtx.fillStyle = "#8E8E93";
          const rightText = "PHOSPHOR TUBE: #FF6A00 | 60Hz";
          const rightMetrics = textCtx.measureText(rightText);
          textCtx.fillText(rightText, width - padX - rightMetrics.width, padY);
        }

        // Divider
        textCtx.strokeStyle = "rgba(255, 106, 0, 0.25)";
        textCtx.lineWidth = 1;
        textCtx.beginPath();
        textCtx.moveTo(padX, padY + 12);
        textCtx.lineTo(width - padX, padY + 12);
        textCtx.stroke();

        let y = padY + 36;

        // Terminal Banner - Scaled for Resolution
        if (!isMobile && !isTablet && width >= 900) {
          textCtx.fillStyle = "#FFA048";
          textCtx.font = "10px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
          const asciiBanner = [
            "  _____ _                      ____                   ____  _             _ _       ",
            " |_   _| |__  _ __ ___  ___   | __ ) _   _  __ _ ___ / ___|| |_ _   _  __| (_) ___  ",
            "   | | | '_ \\| '__/ _ \\/ _ \\  |  _ \\| | | |/ _` / __|\\___ \\| __| | | |/ _` | |/ _ \\ ",
            "   | | | | | | | |  __/  __/  | |_) | |_| | (_| \\__ \\ ___) | |_| |_| | (_| | | (_) |",
            "   |_| |_| |_|_|  \\___|\\___|  |____/ \\__,_|\\__, |___/|____/ \\__|\\__,_|\\__,_|_|\\___/ ",
            "                                           |___/                                     "
          ];
          for (const line of asciiBanner) {
            textCtx.fillText(line, padX, y);
            y += 13;
          }
          y += 8;
        } else {
          // Mobile & Tablet Compact Cyber Banner
          textCtx.fillStyle = "#FFA048";
          textCtx.font = "bold 15px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
          textCtx.fillText("THREE BUGS STUDIO // KERNEL", padX, y);
          y += 18;
          textCtx.font = "10px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
          textCtx.fillStyle = "#8E8E93";
          textCtx.fillText("DIGITAL CRAFT // 100% REMOTE COLLABORATION", padX, y);
          y += 20;
        }

        // Subtitle Info
        textCtx.font = isMobile ? "9px ui-monospace, monospace" : "11px ui-monospace, monospace";
        textCtx.fillStyle = "#71717A";
        textCtx.fillText("[HARDWARE: DISTRIBUTED CYBER-ATELIER] [LOCATION: HANOI, VN]", padX, y);
        y += isMobile ? 18 : 24;

        // Terminal Boot Log Stream
        const logFont = isMobile ? "11px" : "12px";
        textCtx.font = `${logFont} ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
        const currentProgress = progress;

        for (const log of bootLogs) {
          if (currentProgress >= log.pct) {
            textCtx.fillStyle = "#0068FF";
            textCtx.fillText(`[${log.tag}]`, padX, y);

            textCtx.fillStyle = log.pct === 100 ? "#27C93F" : "#EDEDED";
            const textToDraw = lang === "vi" ? log.textVi : log.textEn;
            const tagOffset = isMobile ? 48 : 54;
            textCtx.fillText(textToDraw, padX + tagOffset, y);
            y += isMobile ? 18 : 22;
          }
        }

        // Calm, non-flickering cursor
        const cursorOpacity = Math.sin(elapsed * 2.5) * 0.35 + 0.65;
        textCtx.fillStyle = `rgba(255, 106, 0, ${cursorOpacity})`;
        textCtx.fillText("█", padX, y + 2);

        // Bottom Progress Bar
        const barY = height - padY - (isMobile ? 22 : 30);
        const barLabelFont = isMobile ? "bold 11px" : "bold 12px";
        textCtx.font = `${barLabelFont} ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
        textCtx.fillStyle = "#FF6A00";
        textCtx.fillText(`SYSTEM BOOT: ${currentProgress}%`, padX, barY - 8);

        const barWidth = width - padX * 2;
        const barHeight = isMobile ? 6 : 8;
        textCtx.fillStyle = "rgba(255, 106, 0, 0.15)";
        textCtx.fillRect(padX, barY, barWidth, barHeight);

        textCtx.fillStyle = "#FF6A00";
        textCtx.fillRect(padX, barY, (barWidth * currentProgress) / 100, barHeight);

        // Footer Skip Notice
        textCtx.font = isMobile ? "10px ui-monospace, monospace" : "11px ui-monospace, monospace";
        textCtx.fillStyle = "rgba(142, 142, 147, 0.7)";
        const skipNotice = isMobile
          ? (lang === "vi" ? "[ CHẠM ĐỂ VÀO ]" : "[ TAP TO ENTER ]")
          : (lang === "vi" ? "[ NHẤN SPACE / CLICK ĐỂ VÀO ]" : "[ PRESS SPACE OR CLICK TO ENTER ]");
        const skipMetrics = textCtx.measureText(skipNotice);
        textCtx.fillText(skipNotice, width - padX - skipMetrics.width, barY - 8);
      }

      // -------------------------------------------------------------
      // 2. Render Aspect-Corrected WebGL CRT Shader
      // -------------------------------------------------------------
      if (isWebGLSupported && gl && program && texture && positionBuffer) {
        gl.viewport(0, 0, width, height);
        gl.useProgram(program);

        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textCanvas);

        const aPosition = gl.getAttribLocation(program, "aPosition");
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.enableVertexAttribArray(aPosition);
        gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

        const aspect = width / height;

        gl.uniform1i(gl.getUniformLocation(program, "uTexture"), 0);
        gl.uniform2f(gl.getUniformLocation(program, "uResolution"), width, height);
        gl.uniform1f(gl.getUniformLocation(program, "uAspect"), aspect);
        gl.uniform1f(gl.getUniformLocation(program, "uTime"), elapsed);
        // Subtle, gentle curve calibrated for comfort
        gl.uniform1f(gl.getUniformLocation(program, "uCurve"), 0.05);
        gl.uniform1f(gl.getUniformLocation(program, "uScanlineDensity"), 1.0);
        gl.uniform1f(gl.getUniformLocation(program, "uScanlineSpeed"), 1.0);
        // Soft scanlines - no harsh blinking or aggressive strobe
        gl.uniform1f(gl.getUniformLocation(program, "uScanlineStrength"), 0.12);
        gl.uniform1f(gl.getUniformLocation(program, "uApertureGrille"), 0.35);
        gl.uniform1f(gl.getUniformLocation(program, "uNoise"), 0.025);
        gl.uniform1f(gl.getUniformLocation(program, "uVignette"), 0.22);
        gl.uniform1f(gl.getUniformLocation(program, "uChromaticAberration"), 0.002);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
      } else {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(textCanvas, 0, 0);
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (gl && program) {
        if (texture) gl.deleteTexture(texture);
        if (positionBuffer) gl.deleteBuffer(positionBuffer);
        gl.deleteProgram(program);
      }
    };
  }, [progress, lang]);

  return (
    <AnimatePresence>
      {fadeStage !== "finished" && (
        <motion.div
          ref={containerRef}
          onClick={handleSkip}
          initial={{ opacity: 0 }}
          animate={{ opacity: fadeStage === "fading" ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] bg-[#050505] flex items-center justify-center cursor-pointer select-none overflow-hidden"
          title={lang === "vi" ? "Click để vào ngay" : "Click to enter studio"}
        >
          {/* Outer Vintage Retro CRT Monitor Chassis Bezel */}
          <div className="relative w-full h-full max-w-full max-h-full flex flex-col p-1 sm:p-2 md:p-6 bg-[#0c0c0e]">
            
            {/* Top Chassis Label & Monitor Status LEDs (Calm, zero ping flicker) */}
            <div className="flex items-center justify-between px-3 md:px-4 py-1.5 md:py-2 bg-[#121214] border border-white/5 rounded-t-sm text-[10px] font-mono select-none">
              <div className="flex items-center gap-2 md:gap-3">
                <span className="text-[#8E8E93] uppercase font-bold tracking-wider text-[9px] md:text-[10px]">
                  THREE BUGS // CRT-8000
                </span>
                <span className="hidden sm:inline text-white/20">|</span>
                <span className="hidden sm:inline text-brand-orange/80">CYBER-ORANGE PHOSPHOR</span>
              </div>
              
              <div className="flex items-center gap-3 md:gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#27C93F] shadow-[0_0_6px_rgba(39,201,63,0.6)]" />
                  <span className="text-[#8E8E93] text-[9px]">PWR</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shadow-[0_0_6px_rgba(255,106,0,0.8)]" />
                  <span className="text-brand-orange text-[9px] font-bold">SYNC</span>
                </div>
                <div className="hidden sm:flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0068FF] shadow-[0_0_6px_rgba(0,104,255,0.6)]" />
                  <span className="text-[#0068FF] text-[9px]">NET</span>
                </div>
              </div>
            </div>

            {/* CRT Glass Screen Surface Wrapper */}
            <div className="relative flex-1 w-full h-full bg-[#050505] border-x border-b border-white/5 rounded-b-sm overflow-hidden shadow-[inset_0_0_60px_rgba(0,0,0,0.95)]">
              <canvas
                ref={canvasRef}
                className="w-full h-full block"
              />

              <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/[0.02] via-transparent to-white/[0.02]" />
              <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_50px_rgba(255,106,0,0.06)]" />
            </div>

            {/* Bottom Chassis Bar */}
            <div className="flex items-center justify-between px-3 md:px-4 py-1 text-[8px] md:text-[9px] font-mono text-[#8E8E93]/60 bg-[#121214] border-x border-b border-white/5">
              <span>FREQUENCY: 60Hz INTERLACED</span>
              <span className="text-brand-orange/70">
                {lang === "vi" ? "[ CHẠM / CLICK ĐỂ VÀO ]" : "[ CLICK / TAP TO ENTER ]"}
              </span>
              <span className="hidden sm:inline">BUFFER: 100% OK</span>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// Compact Mini CRT Loader for Skeletons (Calm, zero ping flicker)
// ---------------------------------------------------------------------------
export function MiniCrtLoader() {
  return (
    <div className="relative flex flex-col items-center justify-center p-5 bg-[#0a0a0c] border border-brand-orange/25 rounded-sm shadow-[0_0_20px_rgba(255,106,0,0.08)] select-none max-w-xs mx-auto">
      {/* Top Mini Bezel */}
      <div className="w-full flex items-center justify-between border-b border-white/10 pb-1.5 mb-2.5 font-mono text-[9px]">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shadow-[0_0_6px_rgba(255,106,0,0.7)]" />
          <span className="text-brand-orange font-bold">CRT-SYS</span>
        </div>
        <span className="text-[#8E8E93]">60Hz PHOSPHOR</span>
      </div>

      {/* Mini CRT Monitor Screen Display */}
      <div className="relative w-40 h-24 bg-[#050505] border border-brand-orange/35 rounded-sm overflow-hidden flex flex-col items-center justify-center p-2 text-center shadow-[inset_0_0_12px_rgba(255,106,0,0.12)]">
        {/* Soft Scanline bar */}
        <div className="absolute inset-x-0 h-[1px] bg-brand-orange/25 shadow-[0_0_6px_#FF6A00] animate-scanline pointer-events-none" />

        {/* Pulse Radar Grid - Calm steady glow, NO aggressive ping */}
        <div className="w-8 h-8 rounded-full border border-brand-orange/25 flex items-center justify-center mb-1 relative">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-orange shadow-[0_0_6px_#FF6A00]" />
        </div>

        <span className="font-mono text-[9px] text-brand-orange font-bold tracking-wider">
          THREE BUGS STUDIO
        </span>
        <span className="font-mono text-[8px] text-[#8E8E93]">
          LOADING SYSTEM...
        </span>
      </div>

      {/* Mini Status LEDs */}
      <div className="w-full flex items-center justify-between pt-2 mt-2 border-t border-white/5 font-mono text-[8px] text-[#8E8E93]/60">
        <span>STATUS: BOOTING</span>
        <span className="text-brand-orange font-bold">OK</span>
      </div>
    </div>
  );
}
