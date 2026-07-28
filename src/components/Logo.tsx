import React from "react";
import logoImg from "@/assets/ThreeBugsStudio.webp";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "light" | "dark" | "orange";
}

export default function Logo({
  className = "",
  showText = true,
  size = "md",
  variant = "light",
}: LogoProps) {
  // Size mappings for square rounded logo container
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-11 h-11",
    lg: "w-20 h-20",
    xl: "w-40 h-40",
  };

  const textSizes = {
    sm: { title: "text-[10px]", subtitle: "text-[6px]" },
    md: { title: "text-xs tracking-[0.3em]", subtitle: "text-[8px] tracking-[0.5em]" },
    lg: { title: "text-lg tracking-[0.4em]", subtitle: "text-[10px] tracking-[0.6em]" },
    xl: { title: "text-2xl tracking-[0.5em]", subtitle: "text-xs tracking-[0.7em]" },
  };

  const activeSize = sizeClasses[size];
  const activeTextSize = textSizes[size];

  return (
    <div className={`flex flex-col items-center justify-center ${className}`} id="studio-logo-container">
      {/* Modern Rounded Logo Container */}
      <div className={`relative group ${activeSize} rounded-xl overflow-hidden p-1 bg-brand-orange/10 border border-brand-orange/30 shadow-md hover:border-brand-orange/60 hover:shadow-[0_0_15px_rgba(255,106,0,0.35)] transition-all duration-300 flex items-center justify-center shrink-0`}>
        <img
          src={logoImg}
          alt="Three Bugs Studio Logo"
          className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Typography */}
      {showText && (
        <div className="text-center mt-3 select-none pointer-events-none">
          <div
            className={`font-display font-bold text-white ${activeTextSize.title} uppercase`}
            style={{ wordSpacing: "0.15em" }}
          >
            Three Bugs
          </div>
          <div
            className={`font-mono text-brand-orange font-medium ${activeTextSize.subtitle} uppercase mt-1.5`}
            style={{ wordSpacing: "0.2em" }}
          >
            Studio
          </div>
        </div>
      )}
    </div>
  );
}
