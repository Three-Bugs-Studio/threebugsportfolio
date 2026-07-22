import React from "react";

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
        <i className="devicon-nextjs-original text-white text-lg" />
      </span>
    );
  }

  // React
  if (normName.includes("react")) {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        <i className={`devicon-react-original ${showColor ? "text-[#61DAFB]" : ""}`} />
      </span>
    );
  }

  // TypeScript
  if (normName.includes("typescript") || normName === "ts") {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        <i className={`devicon-typescript-plain ${showColor ? "text-[#3178C6]" : ""}`} />
      </span>
    );
  }

  // NestJS
  if (normName.includes("nest")) {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        <i className={`devicon-nestjs-original ${showColor ? "text-[#E0234E]" : ""}`} />
      </span>
    );
  }

  // Java
  if (normName === "java") {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        <i className={`fa-brands fa-java ${showColor ? "text-[#ED8B00]" : ""}`} />
      </span>
    );
  }

  // Prisma
  if (normName.includes("prisma")) {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        <i className={`devicon-prisma-original ${showColor ? "text-[#5A67D8]" : ""}`} />
      </span>
    );
  }

  // Supabase
  if (normName.includes("supabase")) {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        <i className={`devicon-supabase-plain ${showColor ? "text-[#3ECF8E]" : ""}`} />
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
        <i className={`devicon-postgresql-plain ${showColor ? "text-[#4169E1]" : ""}`} />
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
        <i className={`fa-brands fa-docker ${showColor ? "text-[#2496ED]" : ""}`} />
      </span>
    );
  }

  // Vercel
  if (normName.includes("vercel")) {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-white">
          <path d="M24 22.525H0l12-21.05 12 21.05z" />
        </svg>
      </span>
    );
  }

  // Tailwind / TailwindCSS
  if (normName.includes("tailwind")) {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        <i className={`devicon-tailwindcss-plain ${showColor ? "text-[#06B6D4]" : ""}`} />
      </span>
    );
  }

  // Python
  if (normName.includes("python")) {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        <i className={`fa-brands fa-python ${showColor ? "text-[#3776AB]" : ""}`} />
      </span>
    );
  }

  // Shell / Bash
  if (normName.includes("shell") || normName.includes("bash")) {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        <i className={`devicon-bash-plain ${showColor ? "text-[#4EAA25]" : ""}`} />
      </span>
    );
  }

  // Markdown
  if (normName.includes("markdown")) {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        <i className="devicon-markdown-original text-white" />
      </span>
    );
  }

  // Git
  if (normName.includes("git")) {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        <i className={`devicon-git-plain ${showColor ? "text-[#F05032]" : ""}`} />
      </span>
    );
  }

  // Fallback icon
  return (
    <span className={`inline-flex items-center justify-center ${className}`}>
      <i className="fa-solid fa-code text-brand-orange" />
    </span>
  );
}
