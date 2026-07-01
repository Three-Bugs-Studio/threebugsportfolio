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
  // Size mappings
  const sizeClasses = {
    sm: "h-8 w-auto",
    md: "h-12 w-auto",
    lg: "h-24 w-auto",
    xl: "h-48 w-auto",
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
      <img
        src={logoImg}
        alt="Three Bugs Studio Logo"
        className={`${activeSize} object-contain transition-all duration-300`}
      />

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
