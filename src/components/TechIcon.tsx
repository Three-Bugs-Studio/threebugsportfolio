import React from "react";
import {
  SiReact,
  SiTypescript,
  SiNestjs,
  SiOpenjdk,
  SiPrisma,
  SiSupabase,
  SiPostgresql,
  SiDocker,
  SiTailwindcss,
  SiPython,
  SiGnubash,
  SiMarkdown,
  SiGithub,
  SiGit,
  SiNextdotjs,
  SiVercel,
  SiNetlify,
  SiRailway,
  SiDigitalocean,
  SiHostinger,
  SiGo,
  SiCloudinary
} from "react-icons/si";
import { CodeIcon } from "./ui/MajesticIcon";
import vietnixLogo from "@/assets/tech/vietnix.webp";
import digitaloceanLogo from "@/assets/tech/digitalocean.webp";

interface TechIconProps {
  name: string;
  className?: string;
  showColor?: boolean;
}

export default function TechIcon({ name, className = "w-5 h-5", showColor = true }: TechIconProps) {
  const normName = name.toLowerCase().trim();

  // Next.js
  if (normName.includes("next")) {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        <SiNextdotjs className="w-full h-full text-white" />
      </span>
    );
  }

  // React
  if (normName.includes("react")) {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        <SiReact className={`w-full h-full ${showColor ? "text-[#61DAFB]" : ""}`} />
      </span>
    );
  }

  // TypeScript
  if (normName.includes("typescript") || normName === "ts") {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        <SiTypescript className={`w-full h-full ${showColor ? "text-[#3178C6]" : ""}`} />
      </span>
    );
  }

  // NestJS
  if (normName.includes("nest")) {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        <SiNestjs className={`w-full h-full ${showColor ? "text-[#E0234E]" : ""}`} />
      </span>
    );
  }

  // Java
  if (normName === "java") {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        <SiOpenjdk className={`w-full h-full ${showColor ? "text-[#ED8B00]" : ""}`} />
      </span>
    );
  }

  // Prisma
  if (normName.includes("prisma")) {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        <SiPrisma className={`w-full h-full ${showColor ? "text-[#5A67D8]" : ""}`} />
      </span>
    );
  }

  // Supabase
  if (normName.includes("supabase")) {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        <SiSupabase className={`w-full h-full ${showColor ? "text-[#3ECF8E]" : ""}`} />
      </span>
    );
  }

  // Neon Database
  if (normName.includes("neon")) {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className={`w-full h-full ${showColor ? "text-[#00E599]" : ""}`}>
          <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.3L19.5 8 12 11.7 4.5 8 12 4.3zM4.5 9.7L11 13v6.8L4.5 16V9.7zm15 6.3L13 19.8V13l6.5-3.3v6.3z" />
        </svg>
      </span>
    );
  }

  // PostgreSQL / Postgres
  if (normName.includes("postgres")) {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        <SiPostgresql className={`w-full h-full ${showColor ? "text-[#4169E1]" : ""}`} />
      </span>
    );
  }

  // Render
  if (normName.includes("render")) {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className={`w-full h-full ${showColor ? "text-[#000000] bg-white rounded-full p-0.5" : ""}`}>
          <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9L12 10.5V4zm-6.31 4.9C4.63 10.25 4 11.95 4 13.8c0 4.42 3.58 8 8 8v-6.5L5.69 8.9z" />
        </svg>
      </span>
    );
  }

  // Docker
  if (normName.includes("docker")) {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        <SiDocker className={`w-full h-full ${showColor ? "text-[#2496ED]" : ""}`} />
      </span>
    );
  }

  // Vercel
  if (normName.includes("vercel")) {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        <SiVercel className="w-full h-full text-white" />
      </span>
    );
  }

  // Tailwind / TailwindCSS
  if (normName.includes("tailwind")) {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        <SiTailwindcss className={`w-full h-full ${showColor ? "text-[#06B6D4]" : ""}`} />
      </span>
    );
  }

  // Python
  if (normName.includes("python")) {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        <SiPython className={`w-full h-full ${showColor ? "text-[#3776AB]" : ""}`} />
      </span>
    );
  }

  // Shell / Bash
  if (normName.includes("shell") || normName.includes("bash")) {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        <SiGnubash className={`w-full h-full ${showColor ? "text-[#4EAA25]" : ""}`} />
      </span>
    );
  }

  // Markdown
  if (normName.includes("markdown")) {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        <SiMarkdown className="w-full h-full text-white" />
      </span>
    );
  }

  // GitHub / GitHub Actions
  if (normName.includes("github")) {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        <SiGithub className={`w-full h-full ${showColor ? "text-[#2088FF]" : ""}`} />
      </span>
    );
  }

  // Coolify
  if (normName.includes("coolify")) {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className={`w-full h-full ${showColor ? "text-[#6366F1]" : ""}`}>
          <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8l7.5 3.75v6.9L12 19.2l-7.5-3.75v-6.9L12 4.8zM8.5 9v6l7-3.5V9l-7 3.5z" />
        </svg>
      </span>
    );
  }

  // Netlify
  if (normName.includes("netlify")) {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        <SiNetlify className={`w-full h-full ${showColor ? "text-[#00C7B7]" : ""}`} />
      </span>
    );
  }

  // Railway
  if (normName.includes("railway")) {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        <SiRailway className={`w-full h-full ${showColor ? "text-[#C084FC]" : ""}`} />
      </span>
    );
  }

  // Git
  if (normName.includes("git")) {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        <SiGit className={`w-full h-full ${showColor ? "text-[#F05032]" : ""}`} />
      </span>
    );
  }

  // Golang / Go
  if (normName === "golang" || normName === "go") {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        <SiGo className={`w-full h-full ${showColor ? "text-[#00ADD8]" : ""}`} />
      </span>
    );
  }

  // Cloudinary
  if (normName.includes("cloudinary")) {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        <SiCloudinary className={`w-full h-full ${showColor ? "text-[#3448C5]" : ""}`} />
      </span>
    );
  }

  // DigitalOcean (Cropped 1:1 transparent logo)
  if (normName.includes("digitalocean") || normName.includes("digital ocean")) {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        <img src={digitaloceanLogo} alt="DigitalOcean" className="w-full h-full object-contain" />
      </span>
    );
  }

  // Hostinger
  if (normName.includes("hostinger")) {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        <SiHostinger className={`w-full h-full ${showColor ? "text-[#673DE6]" : ""}`} />
      </span>
    );
  }

  // Vietnix (Cropped 1:1 isometric 3D cloud server stack logo)
  if (normName.includes("vietnix")) {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        <img src={vietnixLogo} alt="Vietnix" className="w-full h-full object-contain" />
      </span>
    );
  }

  // Fallback icon
  return (
    <span className={`inline-flex items-center justify-center ${className}`}>
      <CodeIcon size={20} className="w-full h-full text-brand-orange" />
    </span>
  );
}
