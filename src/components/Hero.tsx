import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "motion/react";
import { FaArrowUpRightFromSquare, FaArrowDown } from "react-icons/fa6";
import createGlobe, { COBEOptions } from "cobe";
import { TRANSLATIONS } from "../data";

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 1.4,
  mapSamples: 16000,
  mapBrightness: 1.8,
  baseColor: [22 / 255, 22 / 255, 24 / 255],
  markerColor: [255 / 255, 106 / 255, 0 / 255], // Cyber Orange (#FF6A00)
  glowColor: [255 / 255, 106 / 255, 0 / 255],
  markers: [
    { location: [10.8231, 106.6297], size: 0.12 }, // Ho Chi Minh City (Studio HQ)
    { location: [14.5995, 120.9842], size: 0.04 },
    { location: [19.076, 72.8777], size: 0.07 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.06 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.07 },
    { location: [19.4326, -99.1332], size: 0.07 },
    { location: [40.7128, -74.006], size: 0.09 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
};

function HeroGlobe({ className, config = GLOBE_CONFIG }: { className?: string; config?: COBEOptions }) {
  let phi = 0;
  let width = 0;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const [r, setR] = useState(0);

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      setR(delta / 200);
    }
  };

  const onRender = useCallback(
    (state: Record<string, any>) => {
      if (!pointerInteracting.current) phi += 0.004;
      state.phi = phi + r;
      state.width = width * 2;
      state.height = width * 2;
    },
    [r]
  );

  const onResize = () => {
    if (canvasRef.current) {
      width = canvasRef.current.offsetWidth;
    }
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender,
    });

    if (canvasRef.current) {
      canvasRef.current.style.opacity = "1";
    }
    return () => globe.destroy();
  }, []);

  return (
    <div
      className={`absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[700px] flex items-center justify-center ${className || ""}`}
    >
      <canvas
        className="size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size] pointer-events-auto"
        ref={canvasRef}
        onPointerDown={(e) =>
          updatePointerInteraction(
            e.clientX - pointerInteractionMovement.current
          )
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
}

interface HeroProps {
  lang: "vi" | "en";
}

export default function Hero({ lang }: HeroProps) {
  const [greeting, setGreeting] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateGreetingAndClock = () => {
      const now = new Date();
      const hour = now.getHours();

      let greetText = "";
      if (lang === "vi") {
        if (hour >= 5 && hour < 12) greetText = "Chào buổi sáng";
        else if (hour >= 12 && hour < 18) greetText = "Chào buổi chiều";
        else if (hour >= 18 && hour < 22) greetText = "Chào buổi tối";
        else greetText = "Chào bạn, cú đêm";
      } else {
        if (hour >= 5 && hour < 12) greetText = "Good morning";
        else if (hour >= 12 && hour < 17) greetText = "Good afternoon";
        else if (hour >= 17 && hour < 22) greetText = "Good evening";
        else greetText = "Evening, night owl";
      }

      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      const timeString = now.toLocaleTimeString(lang === "vi" ? "vi-VN" : "en-US", options);

      setGreeting(greetText);
      setCurrentTime(timeString);
    };

    updateGreetingAndClock();
    const interval = setInterval(updateGreetingAndClock, 1000);
    return () => clearInterval(interval);
  }, [lang]);

  const handleScrollTo = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const t = TRANSLATIONS[lang];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#090909]"
    >
      {/* 3D Interactive Globe Container */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-45 pointer-events-auto">
        <HeroGlobe />
      </div>

      {/* Radial Gradient Vignette Overlay to ensure 100% text readability & high contrast */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(9,9,9,0.30)_0%,_rgba(9,9,9,0.70)_55%,_rgba(9,9,9,0.95)_100%)]" />

      {/* Top Lighting Glares */}
      <div className="absolute top-[-10%] left-[5%] brutalist-glow opacity-40 z-[1]" />
      <div className="absolute top-[30%] right-[-10%] brutalist-glow opacity-25 z-[1]" style={{ filter: "blur(120px)" }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 flex flex-col items-center text-center mt-12 md:mt-16 pb-28 md:pb-36">
        {/* Time-based greeting badge */}
        <motion.div
          id="hero-greeting-badge"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-8 bg-[#121212]/70 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md select-none shadow-xl"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
          </span>
          <span className="font-mono text-[10px] tracking-[0.2em] text-[#8E8E93] uppercase">
            {greeting}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <span className="font-mono text-[10px] text-brand-orange/90 font-medium">
            {currentTime}
          </span>
        </motion.div>

        {/* Main Statement Title */}
        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-medium text-4xl md:text-7xl lg:text-8xl tracking-tighter text-[#F5F5F3] leading-[1.05] max-w-4xl drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]"
        >
          {lang === "vi" ? (
            <>
              Chúng tôi xây dựng <br />
              <span className="text-[#8E8E93]">
                website và phần mềm.
              </span>
            </>
          ) : (
            <>
              We build websites <br />
              <span className="text-[#8E8E93]">
                and custom software.
              </span>
            </>
          )}
        </motion.h1>

        {/* Subtitle Description */}
        <motion.p
          id="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-base md:text-xl text-[#8E8E93] max-w-2xl mt-8 font-light leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
        >
          {t.heroDesc}
        </motion.p>

        {/* Studio Slogan Signature */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="font-mono text-xs md:text-sm tracking-[0.25em] text-brand-orange mt-8 uppercase font-medium select-none drop-shadow-[0_0_10px_rgba(255,106,0,0.3)]"
        >
          Every bug teaches. Every build improves.
        </motion.div>

        {/* Call to Actions */}
        <motion.div
          id="hero-ctas"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-12 w-full sm:w-auto"
        >
          <button
            onClick={() => handleScrollTo("app-work-section")}
            className="btn-stacked w-full sm:w-auto font-mono text-xs uppercase tracking-widest px-8 py-4 bg-[#F5F5F3] text-[#090909] font-medium rounded-sm inline-flex items-center justify-center gap-2.5 group interactive shadow-2xl"
          >
            <span>{t.heroExplore}</span>
            <span className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-brand-orange inline-flex items-center justify-center">
              <FaArrowUpRightFromSquare />
            </span>
          </button>
          
          <button
            onClick={() => handleScrollTo("app-contact-section")}
            className="btn-stacked w-full sm:w-auto font-mono text-xs uppercase tracking-widest px-8 py-4 bg-[#121212]/80 border border-white/10 text-[#F5F5F3] rounded-sm inline-flex items-center justify-center gap-2 group interactive backdrop-blur-sm"
          >
            <span>{t.navStartProject}</span>
            <span className="w-1.5 h-1.5 bg-brand-orange rounded-full group-hover:scale-125 transition-transform" />
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          id="hero-scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 cursor-pointer group"
          onClick={() => handleScrollTo("app-about-section")}
        >
          <div className="w-[18px] h-[28px] rounded-full border border-[#8E8E93]/80 group-hover:border-brand-orange transition-colors flex justify-center p-[4px]" id="scroll-mouse-icon">
            <motion.div 
              className="w-[3px] h-[6px] bg-brand-orange rounded-full"
              animate={{ 
                y: [0, 6, 0],
                opacity: [1, 0.4, 1]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.6, 
                ease: "easeInOut" 
              }}
            />
          </div>
          <span className="font-mono text-[9px] tracking-[0.4em] text-[#8E8E93] uppercase group-hover:text-brand-orange transition-colors">
            {lang === "vi" ? "CUỘN XUỐNG" : "SCROLL"}
          </span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <span className="text-[#8E8E93] group-hover:text-brand-orange transition-colors text-xs inline-flex items-center justify-center">
              <FaArrowDown />
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
