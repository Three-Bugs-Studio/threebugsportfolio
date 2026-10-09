import React from "react";
import { FaSun, FaMoon } from "react-icons/fa6";

interface ThemeSwitchProps {
  theme: "dark" | "light";
  onThemeToggle: (e?: React.MouseEvent) => void;
  lang?: "vi" | "en";
}

export default function ThemeSwitch({ theme, onThemeToggle, lang = "vi" }: ThemeSwitchProps) {
  const isLight = theme === "light";

  return (
    <div className="flex items-center select-none" id="card-nav-theme-switch">
      <button
        type="button"
        onClick={(e) => onThemeToggle(e)}
        aria-label={
          isLight
            ? (lang === "vi" ? "Chuyển sang Giao diện Tối (Dark Mode)" : "Switch to Dark Mode")
            : (lang === "vi" ? "Chuyển sang Giao diện Sáng (Light Mode)" : "Switch to Light Mode")
        }
        title={
          isLight
            ? (lang === "vi" ? "Giao diện: SÁNG (Bấm chuyển Tối)" : "Theme: LIGHT (Click for Dark)")
            : (lang === "vi" ? "Giao diện: TỐI (Bấm chuyển Sáng)" : "Theme: DARK (Click for Light)")
        }
        id="card-nav-theme-btn"
        className={`group relative inline-flex items-center justify-center gap-1.5 px-2 md:px-2.5 py-1.5 md:py-2 rounded-sm border font-mono text-[10px] md:text-[11px] font-bold tracking-wider transition-all duration-300 cursor-pointer interactive active:scale-95 ${
          isLight
            ? "bg-white border-slate-300 hover:border-brand-orange text-slate-800 shadow-sm"
            : "bg-[#141414] border-white/15 hover:border-brand-orange/50 text-[#8E8E93] hover:text-white"
        }`}
      >
        {isLight ? (
          <>
            <FaMoon className="w-3.5 h-3.5 text-[#006989] group-hover:text-brand-orange transition-colors shrink-0" />
            <span className="hidden sm:inline tracking-wider font-semibold text-slate-800">LIGHT</span>
          </>
        ) : (
          <>
            <FaSun className="w-3.5 h-3.5 text-brand-orange group-hover:rotate-45 transition-transform shrink-0" />
            <span className="hidden sm:inline tracking-wider font-semibold text-zinc-300">DARK</span>
          </>
        )}
      </button>
    </div>
  );
}

