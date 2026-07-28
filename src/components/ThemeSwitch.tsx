import React from "react";

interface ThemeSwitchProps {
  theme: "dark" | "light";
  onThemeToggle: (e?: React.MouseEvent) => void;
}

export default function ThemeSwitch({ theme, onThemeToggle }: ThemeSwitchProps) {
  const isLight = theme === "light";

  return (
    <div className="theme-toggle-wrapper flex items-center select-none" id="card-nav-theme-switch">
      <label 
        className="theme-switch-label" 
        title={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
        onClick={(e) => {
          e.preventDefault();
          onThemeToggle(e);
        }}
      >
        <input 
          type="checkbox" 
          className="theme-checkbox" 
          checked={isLight} 
          readOnly
        />
        <span className="theme-slider" />
      </label>
    </div>
  );
}
