import React from "react";
import CardNav from "./CardNav";

interface NavbarProps {
  lang: "vi" | "en";
  onLangChange: (lang: "vi" | "en") => void;
}

export default function Navbar({ lang, onLangChange }: NavbarProps) {
  return (
    <CardNav
      lang={lang}
      onLangChange={onLangChange}
      baseColor="#090909"
      menuColor="#FF6A00"
      buttonBgColor="#FF6A00"
      buttonTextColor="#090909"
      ease="power3.out"
      theme="dark"
    />
  );
}

