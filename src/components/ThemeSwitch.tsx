import React from "react";

interface ThemeSwitchProps {
  theme: "dark" | "light";
  onThemeToggle: () => void;
}

export default function ThemeSwitch({ theme, onThemeToggle }: ThemeSwitchProps) {
  const isLight = theme === "light";

  return (
    <div className="theme-toggle-wrapper flex items-center select-none" id="card-nav-theme-switch">
      <label className="theme-switch-label" title={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}>
        <input 
          type="checkbox" 
          className="theme-checkbox" 
          checked={isLight} 
          onChange={onThemeToggle} 
        />
        <span className="theme-slider" />
      </label>
    </div>
  );
}
