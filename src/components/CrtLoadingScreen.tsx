import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { audioManager } from "../lib/audioManager";

interface CrtLoadingScreenProps {
  onComplete?: () => void;
  lang?: "vi" | "en";
}

// ---------------------------------------------------------------------------
// GLSL Shaders for Authentic ThreeUI-style CRT Barrel Curvature & Phosphor FX
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
uniform float uTime;
uniform float uCurve;
uniform float uScanlineDensity;
uniform float uScanlineSpeed;
uniform float uScanlineStrength;
uniform float uApertureGrille;
uniform float uNoise;
uniform float uVignette;
uniform float uFlicker;
uniform float uChromaticAberration;
uniform float uPowerTransition;

varying vec2 vUv;

vec2 curveUv(vec2 uv, float curve) {
  vec2 fuv = (uv - 0.5) * 1.04;
  float d = dot(fuv, fuv);
  fuv += fuv * d * curve;
  return fuv + 0.5;
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  // Power-on / Power-off beam collapse effect
  vec2 centerUv = vUv - 0.5;
  float beamY = uPowerTransition;
  float beamX = min(1.0, uPowerTransition * 2.0);
  if (abs(centerUv.y) > beamY * 0.5 || abs(centerUv.x) > beamX * 0.5) {
    gl_FragColor = vec4(0.012, 0.012, 0.015, 1.0);
    return;
  }

  vec2 uv = curveUv(vUv, uCurve);

  // Outside glass curve bezel border
  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
    gl_FragColor = vec4(0.02, 0.02, 0.024, 1.0);
    return;
  }

  // Chromatic Aberration fringe on edges
  vec2 dir = uv - 0.5;
  float ca = uChromaticAberration * (0.6 + length(dir));
  float r = texture2D(uTexture, uv - dir * ca).r;
  float g = texture2D(uTexture, uv).g;
  float b = texture2D(uTexture, uv + dir * ca).b;
  vec3 col = vec3(r, g, b);

  // Rolling Horizontal Scanlines
  float scanline = sin(uv.y * uResolution.y * uScanlineDensity - uTime * uScanlineSpeed);
  scanline = (scanline + 1.0) * 0.5;
  col -= col * scanline * uScanlineStrength;

  // Aperture Grille / Phosphor Triad Mask
  float grille = mod(gl_FragCoord.x, 3.0);
  vec3 mask = vec3(1.0);
  if (grille < 1.0) mask = vec3(1.18, 0.88, 0.88);
  else if (grille < 2.0) mask = vec3(0.88, 1.18, 0.88);
  else mask = vec3(0.88, 0.88, 1.18);
  col = mix(col, col * mask, uApertureGrille);

  // Television Snow & Grain
  float noise = (hash(uv + mod(uTime, 9.0)) - 0.5) * uNoise;
  col += noise;

  // Vignette (Tube corner falloff)
  float vig = uv.x * (1.0 - uv.x) * uv.y * (1.0 - uv.y) * 16.0;
  vig = clamp(pow(vig, uVignette), 0.0, 1.0);
  col *= vig;

  // Cathode Ray Tube Flicker
  float flicker = 1.0 + (hash(vec2(mod(uTime * 3.0, 7.0), 0.0)) - 0.5) * uFlicker;
  col *= flicker;

  // Warm Orange Phosphor Base Floor
  col = max(col, vec3(0.035, 0.02, 0.012));

  gl_FragColor = vec4(col, 1.0);
}
`;

// Helper: compile shader
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
  const [isDismissing, setIsDismissing] = useState(false);
  const [powerTransition, setPowerTransition] = useState(1.0);
  const animFrameRef = useRef<number | null>(null);

  // Boot log milestones
  const bootLogs = [
    { pct: 5,  tag: "INIT", text: lang === "vi" ? "Khởi động Three Bugs Studio Kernel v2.6.4..." : "Initializing Three Bugs Studio Kernel v2.6.4..." },
    { pct: 18, tag: "MEM ", text: lang === "vi" ? "Cấp phát bộ nhớ đệm: 100% Remote Collaboration... OK" : "Allocating workspace buffers: 100% Remote Collaboration... OK" },
    { pct: 32, tag: "NET ", text: lang === "vi" ? "Kết nối đường truyền bảo mật Hà Nội & CDN nodes... OK" : "Establishing secure link to Hanoi & global CDN nodes... OK" },
    { pct: 48, tag: "GPU ", text: lang === "vi" ? "Biên dịch Three.js 3D Flow Wave & Phosphor Shaders... OK" : "Compiling Three.js 3D Flow Wave & Phosphor Shaders... OK" },
    { pct: 64, tag: "AUD ", text: lang === "vi" ? "Gắn kết bộ tổng hợp âm thanh Web Audio Synthesizer... OK" : "Mounting Web Audio Synthesizer & feedback engine... OK" },
    { pct: 78, tag: "SPEC", text: lang === "vi" ? "Tải dữ liệu dự án: QMD Tech, Fortify, Atelier Showcase... OK" : "Caching studio projects: QMD Tech, Fortify, Atelier Showcase... OK" },
    { pct: 90, tag: "CORE", text: lang === "vi" ? "Xác thực chữ ký số giao diện Cyber-Brutalist... OK" : "Validating Cyber-Brutalist design signatures... OK" },
    { pct: 100, tag: "DONE", text: lang === "vi" ? "HỆ THỐNG SẴN SÀNG // CHÀO MỪNG ĐẾN THREE BUGS STUDIO!" : "ALL SYSTEMS NOMINAL // ENTERING THREE BUGS STUDIO!" }
  ];

  const handleFinish = useCallback(() => {
    if (isDismissing) return;
    setIsDismissing(true);
    try {
      audioManager.playSweep();
    } catch (e) {}

    // Animate CRT power beam collapse
    let start: number | null = null;
    const duration = 380;
    const step = (now: number) => {
      if (!start) start = now;
      const elapsed = now - start;
      const p = Math.max(0, 1 - elapsed / duration);
      setPowerTransition(p);
      if (elapsed < duration) {
        requestAnimationFrame(step);
      } else {
        setPowerTransition(0);
        if (onComplete) onComplete();
      }
    };
    requestAnimationFrame(step);
  }, [isDismissing, onComplete]);

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

  // Boot progress progression simulation
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      if ((window as any).__crt_pause_test) {
        setProgress(76);
        return;
      }
      // Randomized increments for authentic terminal feel
      const jump = Math.floor(Math.random() * 8) + 4;
      current = Math.min(100, current + jump);
      setProgress(current);

      // Play soft mechanical click on major step milestones
      if (current % 20 < 6) {
        try {
          audioManager.playClick();
        } catch (e) {}
      }

      if (current >= 100) {
        clearInterval(interval);
        // Pause briefly for user to appreciate 100% completion
        const resolveTimer = setTimeout(() => {
          handleFinish();
        }, 350);
        return () => clearTimeout(resolveTimer);
      }
    }, 65);

    return () => clearInterval(interval);
  }, [handleFinish]);

  // WebGL & 2D Canvas rendering loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Offscreen 2D canvas for drawing crisp terminal typography & UI
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

              // Setup quad buffer
              positionBuffer = gl.createBuffer();
              gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
              gl.bufferData(
                gl.ARRAY_BUFFER,
                new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
                gl.STATIC_DRAW
              );

              // Setup texture
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
      // 1. Draw Monospace Terminal UI to Offscreen 2D Canvas
      // -------------------------------------------------------------
      if (textCtx) {
        // Deep warm black background
        textCtx.fillStyle = "#090909";
        textCtx.fillRect(0, 0, width, height);

        const isMobile = width < 768;
        const padX = isMobile ? 24 : Math.max(48, width * 0.08);
        const padY = isMobile ? 36 : Math.max(48, height * 0.07);

        // Header Terminal Bar
        textCtx.font = "bold 13px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
        textCtx.fillStyle = "#FF6A00";
        textCtx.fillText(">> THREE BUGS STUDIO // CRT-OS v2.6.4 (POST)", padX, padY);

        textCtx.font = "11px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
        textCtx.fillStyle = "#8E8E93";
        const rightText = "PHOSPHOR TUBE: #FF6A00 | 60Hz";
        const rightMetrics = textCtx.measureText(rightText);
        textCtx.fillText(rightText, width - padX - rightMetrics.width, padY);

        // Subtle divider
        textCtx.strokeStyle = "rgba(255, 106, 0, 0.25)";
        textCtx.lineWidth = 1;
        textCtx.beginPath();
        textCtx.moveTo(padX, padY + 14);
        textCtx.lineTo(width - padX, padY + 14);
        textCtx.stroke();

        let y = padY + 44;

        // Studio ASCII Banner (Compact / Responsive)
        if (!isMobile) {
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
          y += 10;
        } else {
          // Mobile stylized banner
          textCtx.fillStyle = "#FFA048";
          textCtx.font = "bold 18px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
          textCtx.fillText("THREE BUGS STUDIO", padX, y);
          y += 20;
          textCtx.font = "11px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
          textCtx.fillStyle = "#8E8E93";
          textCtx.fillText("DIGITAL CRAFT // 100% REMOTE COLLABORATION", padX, y);
          y += 24;
        }

        // Terminal Architecture Specs
        textCtx.font = "11px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
        textCtx.fillStyle = "#71717A";
        textCtx.fillText("[HARDWARE: DISTRIBUTED CYBER-ATELIER] [LOCATION: HANOI, VN]", padX, y);
        y += 24;

        // Terminal Log Lines
        textCtx.font = "12px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
        const currentProgress = progress;

        for (const log of bootLogs) {
          if (currentProgress >= log.pct) {
            // Tag [INIT], [NET ], etc.
            textCtx.fillStyle = "#0068FF";
            textCtx.fillText(`[${log.tag}]`, padX, y);

            // Log Text
            textCtx.fillStyle = log.pct === 100 ? "#27C93F" : "#EDEDED";
            textCtx.fillText(log.text, padX + 54, y);
            y += 22;
          }
        }

        // Blinking Cursor
        const cursorBlink = Math.floor(elapsed * 2.5) % 2 === 0;
        if (cursorBlink) {
          textCtx.fillStyle = "#FF6A00";
          textCtx.fillText("█", padX, y + 4);
        }

        // Bottom Progress Bar & Percentage
        const barY = height - padY - 32;
        textCtx.font = "bold 12px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
        textCtx.fillStyle = "#FF6A00";
        const progLabel = `SYSTEM BOOT: ${currentProgress}%`;
        textCtx.fillText(progLabel, padX, barY - 10);

        // Progress Track
        const barWidth = width - padX * 2;
        const barHeight = 8;
        textCtx.fillStyle = "rgba(255, 106, 0, 0.15)";
        textCtx.fillRect(padX, barY, barWidth, barHeight);

        // Filled Bar
        textCtx.fillStyle = "#FF6A00";
        textCtx.fillRect(padX, barY, (barWidth * currentProgress) / 100, barHeight);

        // Footer Skip Notice
        textCtx.font = "11px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
        textCtx.fillStyle = "rgba(142, 142, 147, 0.7)";
        const skipNotice = lang === "vi" 
          ? "[ NHẤN SPACE HOẶC CLICK ĐỂ BỎ QUA ]" 
          : "[ PRESS SPACE OR CLICK TO SKIP ]";
        const skipMetrics = textCtx.measureText(skipNotice);
        textCtx.fillText(skipNotice, width - padX - skipMetrics.width, barY - 10);
      }

      // -------------------------------------------------------------
      // 2. Render WebGL CRT Barrel Distortion & Phosphor FX
      // -------------------------------------------------------------
      if (isWebGLSupported && gl && program && texture && positionBuffer) {
        gl.viewport(0, 0, width, height);
        gl.useProgram(program);

        // Update texture with 2D offscreen canvas
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textCanvas);

        // Bind quad position
        const aPosition = gl.getAttribLocation(program, "aPosition");
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.enableVertexAttribArray(aPosition);
        gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

        // Upload uniforms
        gl.uniform1i(gl.getUniformLocation(program, "uTexture"), 0);
        gl.uniform2f(gl.getUniformLocation(program, "uResolution"), width, height);
        gl.uniform1f(gl.getUniformLocation(program, "uTime"), elapsed);
        gl.uniform1f(gl.getUniformLocation(program, "uCurve"), 0.08); // ThreeUI barrel curvature
        gl.uniform1f(gl.getUniformLocation(program, "uScanlineDensity"), 1.0);
        gl.uniform1f(gl.getUniformLocation(program, "uScanlineSpeed"), 2.8);
        gl.uniform1f(gl.getUniformLocation(program, "uScanlineStrength"), 0.22);
        gl.uniform1f(gl.getUniformLocation(program, "uApertureGrille"), 0.55);
        gl.uniform1f(gl.getUniformLocation(program, "uNoise"), 0.038);
        gl.uniform1f(gl.getUniformLocation(program, "uVignette"), 0.28);
        gl.uniform1f(gl.getUniformLocation(program, "uFlicker"), 0.025);
        gl.uniform1f(gl.getUniformLocation(program, "uChromaticAberration"), 0.0035);
        gl.uniform1f(gl.getUniformLocation(program, "uPowerTransition"), powerTransition);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
      } else {
        // Fallback: draw 2D directly to main canvas if WebGL is unavailable
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
  }, [progress, powerTransition, lang]);

  return (
    <AnimatePresence>
      {!isDismissing && (
        <motion.div
          ref={containerRef}
          onClick={handleSkip}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] bg-[#050505] flex items-center justify-center cursor-pointer select-none overflow-hidden"
          title={lang === "vi" ? "Click để vào ngay" : "Click to enter studio"}
        >
          {/* Outer Vintage Retro CRT Monitor Chassis Bezel */}
          <div className="relative w-full h-full max-w-full max-h-full flex flex-col p-2 md:p-6 bg-[#0c0c0e]">
            
            {/* Top Chassis Label & Monitor Status LEDs */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#121214] border border-white/5 rounded-t-sm text-[10px] font-mono select-none">
              <div className="flex items-center gap-3">
                <span className="text-[#8E8E93] uppercase font-bold tracking-wider">
                  THREE BUGS STUDIO // MODEL: CRT-8000
                </span>
                <span className="hidden sm:inline text-white/20">|</span>
                <span className="hidden sm:inline text-brand-orange/80">CYBER-ORANGE PHOSPHOR</span>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#27C93F] animate-pulse" />
                  <span className="text-[#8E8E93] text-[9px]">PWR</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-brand-orange animate-ping" />
                  <span className="text-brand-orange text-[9px] font-bold">SYNC</span>
                </div>
                <div className="hidden sm:flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#0068FF]" />
                  <span className="text-[#0068FF] text-[9px]">NET</span>
                </div>
              </div>
            </div>

            {/* CRT Glass Screen Surface Wrapper */}
            <div className="relative flex-1 w-full h-full bg-[#050505] border-x border-b border-white/5 rounded-b-sm overflow-hidden shadow-[inset_0_0_80px_rgba(0,0,0,0.95)]">
              {/* WebGL Canvas */}
              <canvas
                ref={canvasRef}
                className="w-full h-full block"
              />

              {/* Glass Scanline & Reflection Overlay (Extra tactile depth) */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/[0.02] via-transparent to-white/[0.03]" />
              <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_60px_rgba(255,106,0,0.08)]" />
            </div>

            {/* Bottom Chassis Bar */}
            <div className="flex items-center justify-between px-4 py-1.5 text-[9px] font-mono text-[#8E8E93]/60 bg-[#121214] border-x border-b border-white/5">
              <span>FREQUENCY: 60Hz INTERLACED</span>
              <span className="text-brand-orange/70">
                {lang === "vi" ? "[ CLICK BẤT KỲ ĐÂU ĐỂ VÀO ]" : "[ CLICK ANYWHERE TO ENTER ]"}
              </span>
              <span>BUFFER: 100% OK</span>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// Compact Mini CRT Loader for Skeletons (Replaces HamsterWheelLoader)
// ---------------------------------------------------------------------------
export function MiniCrtLoader() {
  return (
    <div className="relative flex flex-col items-center justify-center p-6 bg-[#0a0a0c] border border-brand-orange/30 rounded-sm shadow-[0_0_25px_rgba(255,106,0,0.1)] select-none max-w-xs mx-auto">
      {/* Top Mini Bezel */}
      <div className="w-full flex items-center justify-between border-b border-white/10 pb-2 mb-3 font-mono text-[9px]">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
          <span className="text-brand-orange font-bold">CRT-SYS</span>
        </div>
        <span className="text-[#8E8E93]">60Hz PHOSPHOR</span>
      </div>

      {/* Mini CRT Monitor Screen Display */}
      <div className="relative w-44 h-28 bg-[#050505] border border-brand-orange/40 rounded-sm overflow-hidden flex flex-col items-center justify-center p-2 text-center shadow-[inset_0_0_15px_rgba(255,106,0,0.15)]">
        {/* Animated Scanline bar */}
        <div className="absolute inset-x-0 h-1 bg-brand-orange/30 shadow-[0_0_8px_#FF6A00] animate-scanline pointer-events-none" />

        {/* Pulse Radar Grid */}
        <div className="w-10 h-10 rounded-full border border-brand-orange/30 flex items-center justify-center mb-1.5 relative">
          <div className="w-4 h-4 rounded-full bg-brand-orange/20 animate-ping" />
          <div className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
        </div>

        <span className="font-mono text-[10px] text-brand-orange font-bold tracking-wider">
          THREE BUGS STUDIO
        </span>
        <span className="font-mono text-[8px] text-[#8E8E93] animate-pulse">
          LOADING SYSTEM...
        </span>
      </div>

      {/* Mini Status LEDs */}
      <div className="w-full flex items-center justify-between pt-2.5 mt-2 border-t border-white/5 font-mono text-[8px] text-[#8E8E93]/60">
        <span>STATUS: BOOTING</span>
        <span className="text-brand-orange font-bold">OK</span>
      </div>
    </div>
  );
}
