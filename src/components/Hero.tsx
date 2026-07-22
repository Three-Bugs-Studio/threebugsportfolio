import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { TRANSLATIONS } from "../data";

interface HeroProps {
  lang: "vi" | "en";
}

export default function Hero({ lang }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [greeting, setGreeting] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateGreetingAndClock = () => {
      const now = new Date();
      const hour = now.getHours();

      // Time-based greetings for personalization
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

      // Elegant local clock representation
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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      pulseSpeed: number;
      pulsePhase: number;
      isBrand: boolean;
    }> = [];

    // Initialize particles (nodes of the foundation mesh)
    const particleCount = Math.min(70, Math.floor((width * height) / 16000));
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.6) * 0.25 - 0.08, // Slow, elegant upward drifting
        radius: Math.random() * 2 + 0.8,
        alpha: Math.random() * 0.35 + 0.1,
        pulseSpeed: 0.005 + Math.random() * 0.012,
        pulsePhase: Math.random() * Math.PI * 2,
        isBrand: Math.random() < 0.12, // 12% are digital glowing orange embers of studio
      });
    }

    let mouse = { x: -1000, y: -1000, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle background grid lines (Swiss alignment)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.012)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw connections (edges of the software network)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Connection range
          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.12;
            
            // Subtle theme tinting for brand elements
            if (p1.isBrand || p2.isBrand) {
              ctx.strokeStyle = `rgba(255, 106, 0, ${alpha * 0.8})`;
            } else {
              ctx.strokeStyle = `rgba(245, 245, 243, ${alpha})`;
            }
            
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw and update particles
      particles.forEach((p) => {
        p.pulsePhase += p.pulseSpeed;
        const currentAlpha = p.alpha * (0.6 + Math.sin(p.pulsePhase) * 0.4);

        if (p.isBrand) {
          // Accent Brand Glow Core
          ctx.fillStyle = `rgba(255, 106, 0, ${currentAlpha * 1.1})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 1.15, 0, Math.PI * 2);
          ctx.fill();

          // Accent Brand Outer Flare
          ctx.fillStyle = `rgba(255, 106, 0, ${currentAlpha * 0.22})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 3.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Standard cool light gray
          ctx.fillStyle = `rgba(245, 245, 243, ${currentAlpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Sway organically
        p.x += Math.sin(p.pulsePhase) * 0.05;

        // Apply motion vectors
        p.x += p.vx;
        p.y += p.vy;

        // Mouse interaction (gentle cloud dispersion force)
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            const force = (180 - dist) / 180;
            p.x -= (dx / dist) * force * 0.5;
            p.y -= (dy / dist) * force * 0.5;
          }
        }

        // Loop boundaries infinitely
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;
      });

      // Subtle pulse light on hover center/mouse
      if (mouse.active) {
        const grad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          110
        );
        grad.addColorStop(0, "rgba(255, 106, 0, 0.025)");
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 110, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleInitialResize = setTimeout(handleResize, 100);

    draw();

    return () => {
      clearTimeout(handleInitialResize);
      window.removeEventListener("resize", handleResize);
      if (canvas) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

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
      {/* Background Interactive Mesh Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto"
        id="hero-background-canvas"
      />

      {/* Top Lighting Glares */}
      <div className="absolute top-[-10%] left-[5%] brutalist-glow opacity-50" />
      <div className="absolute top-[30%] right-[-10%] brutalist-glow opacity-30" style={{ filter: "blur(120px)" }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 flex flex-col items-center text-center mt-12 md:mt-16 pb-28 md:pb-36">
        {/* Studio Status Cyber Emblem Badge */}
        <motion.div
          id="hero-emblem"
          initial={{ scale: 0.9, opacity: 0, y: -10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141414]/80 border border-brand-orange/30 shadow-[0_0_20px_rgba(255,106,0,0.12)] backdrop-blur-md select-none"
        >
          <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
          <span className="font-mono text-[10px] tracking-[0.25em] text-white uppercase font-medium">
            THREE BUGS STUDIO
          </span>
          <span className="text-white/20 font-mono text-[10px]">//</span>
          <span className="font-mono text-[9px] tracking-widest text-brand-orange uppercase font-semibold">
            100% REMOTE
          </span>
          <span className="text-white/20 font-mono text-[10px]">//</span>
          <span className="font-mono text-[9px] tracking-widest text-[#8E8E93] uppercase">
            EST. 2026
          </span>
        </motion.div>

        {/* Dynamic, responsive time-based greeting badge with active pulsing status indicator */}
        <motion.div
          id="hero-greeting-badge"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-6 bg-[#121212]/40 border border-white/5 px-4 py-2 rounded-full backdrop-blur-md select-none"
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

        {/* Huge Statement */}
        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-medium text-4xl md:text-7xl lg:text-8xl tracking-tighter text-[#F5F5F3] leading-[1.05] max-w-4xl"
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

        {/* Small Subtitle */}
        <motion.p
          id="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-base md:text-xl text-[#8E8E93] max-w-2xl mt-8 font-light leading-relaxed"
        >
          {t.heroDesc}
        </motion.p>

        {/* Studio Slogan Signature */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="font-mono text-xs md:text-sm tracking-[0.25em] text-brand-orange mt-8 uppercase font-medium select-none"
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
            className="w-full sm:w-auto font-mono text-xs uppercase tracking-widest px-8 py-4 bg-[#F5F5F3] text-[#090909] hover:bg-[#F5F5F3]/90 transition-colors font-medium rounded-sm inline-flex items-center justify-center gap-2 group interactive"
          >
            {t.heroExplore}
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-brand-orange" />
          </button>
          
          <button
            onClick={() => handleScrollTo("app-contact-section")}
            className="w-full sm:w-auto font-mono text-xs uppercase tracking-widest px-8 py-4 bg-transparent border border-white/10 hover:border-brand-orange/50 text-[#F5F5F3] transition-colors rounded-sm inline-flex items-center justify-center gap-2 group interactive"
          >
            {t.navStartProject}
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
          {/* Mouse scroll wheel animation */}
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
            <ArrowDown className="w-3.5 h-3.5 text-[#8E8E93] group-hover:text-brand-orange transition-colors" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
