import React from "react";
import CardNav from "./CardNav";

interface NavbarProps {
  lang: "vi" | "en";
  onLangChange: (lang: "vi" | "en") => void;
  theme?: "dark" | "light";
  onThemeToggle?: () => void;
}

export default function Navbar({ lang, onLangChange, theme = "dark", onThemeToggle }: NavbarProps) {
  const isLight = theme === "light";
  return (
    <CardNav
      lang={lang}
      onLangChange={onLangChange}
      theme={theme}
      onThemeToggle={onThemeToggle}
      baseColor={isLight ? "#EAEBED" : "#090909"}
      menuColor="#FF6A00"
      buttonBgColor={isLight ? "#006989" : "#FF6A00"}
      buttonTextColor={isLight ? "#FFFFFF" : "#090909"}
      ease="power3.out"
    />
  );
}

