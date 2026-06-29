import React from "react";

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

  // Base colors
  const bugFill = variant === "light" ? "#F5F5F3" : variant === "orange" ? "#FF6A00" : "#090909";
  const bgFill = "transparent";

  return (
    <div className={`flex flex-col items-center justify-center ${className}`} id="studio-logo-container">
      {/* SVG Emblem */}
      <svg
        id="studio-logo-svg"
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${activeSize} transition-all duration-300`}
      >
        {/* Subtle background filter for slight glowing effect */}
        <defs>
          <filter id="subtle-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- Central Star (Orange) --- */}
        <path
          d="M 120,103 Q 120,118 135,118 Q 120,118 120,133 Q 120,118 105,118 Q 120,118 120,103 Z"
          fill="#FF6A00"
          className="transition-all duration-500 hover:scale-110 origin-center"
        />

        {/* --- Three Accents (Orange) --- */}
        {/* Left Circle Accent */}
        <circle cx="65" cy="105" r="4.5" fill="#FF6A00" />
        
        {/* Right Square Accent */}
        <rect x="171" y="100.5" width="9" height="9" fill="#FF6A00" />
        
        {/* Bottom Inverted Triangle Accent */}
        <path d="M 115,170 L 125,170 L 120,178 Z" fill="#FF6A00" />

        {/* --- TOP BUG --- */}
        <g id="top-bug">
          {/* Antennae */}
          <line x1="114" y1="48" x2="108" y2="36" stroke={bugFill} strokeWidth="3.5" strokeLinecap="round" />
          <line x1="126" y1="48" x2="132" y2="36" stroke={bugFill} strokeWidth="3.5" strokeLinecap="round" />
          
          {/* Head */}
          <circle cx="120" cy="58" r="14" fill={bugFill} />
          {/* Inner hole */}
          <circle cx="120" cy="58" r="4" fill="#090909" />
          
          {/* Wings/Shell - Left Half */}
          <path
            d="M 118,74 C 110,74 96,84 94,106 C 94,116 102,122 116,118 C 118,118 118,74 118,74 Z"
            fill={bugFill}
            opacity="0.9"
          />
          {/* Wings/Shell - Right Half */}
          <path
            d="M 122,74 C 130,74 144,84 146,106 C 146,116 138,122 124,118 C 122,118 122,74 122,74 Z"
            fill={bugFill}
            opacity="0.9"
          />
        </g>

        {/* --- LEFT BUG (Rotated ~240 degrees / bottom-left) --- */}
        <g id="left-bug" transform="rotate(-120 120 118)">
          {/* Antennae */}
          <line x1="114" y1="48" x2="108" y2="36" stroke={bugFill} strokeWidth="3.5" strokeLinecap="round" />
          <line x1="126" y1="48" x2="132" y2="36" stroke={bugFill} strokeWidth="3.5" strokeLinecap="round" />
          
          {/* Legs on sides (represented by radial spikes on head in the logo image) */}
          <line x1="102" y1="58" x2="92" y2="58" stroke={bugFill} strokeWidth="3" strokeLinecap="round" />
          <line x1="138" y1="58" x2="148" y2="58" stroke={bugFill} strokeWidth="3" strokeLinecap="round" />
          <line x1="105" y1="68" x2="96" y2="74" stroke={bugFill} strokeWidth="3" strokeLinecap="round" />
          <line x1="135" y1="68" x2="144" y2="74" stroke={bugFill} strokeWidth="3" strokeLinecap="round" />
          
          {/* Head */}
          <circle cx="120" cy="58" r="14" fill={bugFill} />
          {/* Inner hole */}
          <circle cx="120" cy="58" r="4" fill="#090909" />
          
          {/* Wings - Left Half */}
          <path
            d="M 118,74 C 110,74 96,84 94,106 C 94,116 102,122 116,118 C 118,118 118,74 118,74 Z"
            fill={bugFill}
            opacity="0.9"
          />
          {/* Wings - Right Half */}
          <path
            d="M 122,74 C 130,74 144,84 146,106 C 146,116 138,122 124,118 C 122,118 122,74 122,74 Z"
            fill={bugFill}
            opacity="0.9"
          />
        </g>

        {/* --- RIGHT BUG (Rotated ~120 degrees / bottom-right) --- */}
        <g id="right-bug" transform="rotate(120 120 118)">
          {/* Antennae */}
          <line x1="114" y1="48" x2="108" y2="36" stroke={bugFill} strokeWidth="3.5" strokeLinecap="round" />
          <line x1="126" y1="48" x2="132" y2="36" stroke={bugFill} strokeWidth="3.5" strokeLinecap="round" />
          
          {/* Legs on sides */}
          <line x1="102" y1="58" x2="92" y2="58" stroke={bugFill} strokeWidth="3" strokeLinecap="round" />
          <line x1="138" y1="58" x2="148" y2="58" stroke={bugFill} strokeWidth="3" strokeLinecap="round" />
          <line x1="105" y1="68" x2="96" y2="74" stroke={bugFill} strokeWidth="3" strokeLinecap="round" />
          <line x1="135" y1="68" x2="144" y2="74" stroke={bugFill} strokeWidth="3" strokeLinecap="round" />

          {/* Head */}
          <circle cx="120" cy="58" r="14" fill={bugFill} />
          {/* Inner hole */}
          <circle cx="120" cy="58" r="4" fill="#090909" />
          
          {/* Wings - Left Half */}
          <path
            d="M 118,74 C 110,74 96,84 94,106 C 94,116 102,122 116,118 C 118,118 118,74 118,74 Z"
            fill={bugFill}
            opacity="0.9"
          />
          {/* Wings - Right Half */}
          <path
            d="M 122,74 C 130,74 144,84 146,106 C 146,116 138,122 124,118 C 122,118 122,74 122,74 Z"
            fill={bugFill}
            opacity="0.9"
          />
        </g>
      </svg>

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
