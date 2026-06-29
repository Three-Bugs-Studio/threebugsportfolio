import React, { useState, useEffect } from "react";
import { TEAM_DATA, TRANSLATIONS } from "../data";
import { motion } from "motion/react";
import { Github, Twitter, Linkedin, Terminal, Sparkles, Layout } from "lucide-react";
import { TeamMember } from "../types";

interface TeamProps {
  lang: "vi" | "en";
}

interface TeamMemberCardProps {
  key?: string;
  member: TeamMember;
  idx: number;
  lang: "vi" | "en";
}

function TeamMemberCard({ member, idx, lang }: TeamMemberCardProps) {
  const [isVectorLoaded, setIsVectorLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVectorLoaded(true);
    }, 400 + idx * 200);
    return () => clearTimeout(timer);
  }, [idx]);

  return (
    <motion.div
      id={`founder-card-${idx}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: idx * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col p-6 bg-[#121212]/30 border border-white/5 hover:border-white/10 hover:bg-[#121212]/40 transition-all duration-300 rounded-sm relative"
    >
      {/* Visual Portrait Box (Abstract Modern Vector Motif with progressive blur-up effect) */}
      <div className="h-64 w-full bg-[#090909] border border-white/5 group-hover:border-white/10 rounded-sm mb-6 relative overflow-hidden flex items-center justify-center transition-colors">
        <div className="absolute inset-0 swiss-grid opacity-10" />

        {/* Shimmer / loading spinner cover when not loaded */}
        <div 
          className={`absolute inset-0 bg-[#161616] animate-pulse flex items-center justify-center transition-opacity duration-500 z-10 ${
            isVectorLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <div className="w-6 h-6 rounded-full border border-white/10 border-t-brand-orange animate-spin" />
        </div>

        {/* SVG Wrapper with smooth blur-up */}
        <div 
          className={`w-full h-full flex items-center justify-center transition-all duration-750 ease-out ${
            isVectorLoaded ? "blur-0 scale-100 opacity-100" : "blur-md scale-95 opacity-0"
          }`}
        >
          {/* Aesthetic Abstract Visual Key for each founder */}
          {idx === 0 && (
            <svg viewBox="0 0 100 100" className="w-24 h-24 text-[#F5F5F3]/10 group-hover:text-[#F5F5F3]/20 transition-colors">
              {/* Systems representation: interlocking server grids */}
              <rect x="25" y="25" width="50" height="50" stroke="#F5F5F3" strokeWidth="0.5" fill="none" />
              <rect x="35" y="35" width="30" height="30" stroke="#F5F5F3" strokeWidth="0.5" fill="none" />
              <line x1="50" y1="20" x2="50" y2="80" stroke="#FF6A00" strokeWidth="1" strokeDasharray="2,2" />
              <line x1="20" y1="50" x2="80" y2="50" stroke="#FF6A00" strokeWidth="1" strokeDasharray="2,2" />
              <circle cx="50" cy="50" r="4" fill="#FF6A00" />
            </svg>
          )}

          {idx === 1 && (
            <svg viewBox="0 0 100 100" className="w-24 h-24 text-[#F5F5F3]/10 group-hover:text-[#F5F5F3]/20 transition-colors">
              {/* Product design representation: nested gold ratio layout */}
              <circle cx="50" cy="50" r="30" stroke="#F5F5F3" strokeWidth="0.5" fill="none" />
              <path d="M 20,50 Q 50,20 80,50 Q 50,80 20,50" stroke="#FF6A00" strokeWidth="1" fill="none" />
              <rect x="30" y="30" width="40" height="40" stroke="#F5F5F3" strokeWidth="0.5" fill="none" />
              <circle cx="50" cy="50" r="2" fill="#FF6A00" />
            </svg>
          )}

          {idx === 2 && (
            <svg viewBox="0 0 100 100" className="w-24 h-24 text-[#F5F5F3]/10 group-hover:text-[#F5F5F3]/20 transition-colors">
              {/* AI logic representation: stellar constellations */}
              <polygon points="50,15 80,75 20,75" stroke="#F5F5F3" strokeWidth="0.5" fill="none" />
              <path d="M 50,15 L 50,75" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
              {/* Interactive nodes */}
              <circle cx="50" cy="15" r="3.5" fill="#FF6A00" />
              <circle cx="80" cy="75" r="3" fill="#F5F5F3" />
              <circle cx="20" cy="75" r="3" fill="#F5F5F3" />
              <circle cx="50" cy="45" r="4.5" fill="none" stroke="#FF6A00" strokeWidth="1" />
            </svg>
          )}
        </div>

        {/* Initials Label Overlay */}
        <span className="absolute top-4 left-4 font-mono text-[10px] text-[#8E8E93]">
          [ {member.name.split(" ").map(n => n[0]).join("")} ]
        </span>
      </div>

      {/* Name & Role */}
      <h3 className="font-display font-semibold text-xl text-[#F5F5F3] group-hover:text-brand-orange transition-colors">
        {member.name}
      </h3>
      <span className="font-mono text-[9px] tracking-widest text-[#8E8E93] uppercase mt-1">
        {member.role}
      </span>

      {/* Bio text */}
      <p className="font-sans text-xs text-[#8E8E93] font-light leading-relaxed mt-4 mb-6">
        {member.bio}
      </p>

      {/* Specialties Badges */}
      <div className="flex flex-wrap gap-1.5 mt-auto mb-6">
        {member.specialties.map((spec) => (
          <span
            key={spec}
            className="font-mono text-[9px] text-[#F5F5F3] bg-white/5 border border-white/5 px-2 py-0.5 rounded-sm"
          >
            {spec}
          </span>
        ))}
      </div>

      {/* Personal Links */}
      <div className="flex items-center gap-4 pt-4 border-t border-white/5">
        {member.socials.github && (
          <a
            href={member.socials.github}
            target="_blank"
            rel="noreferrer"
            className="text-[#8E8E93] hover:text-[#F5F5F3] transition-colors interactive"
            aria-label={`${member.name} Github`}
          >
            <Github className="w-4 h-4" />
          </a>
        )}
        {member.socials.twitter && (
          <a
            href={member.socials.twitter}
            target="_blank"
            rel="noreferrer"
            className="text-[#8E8E93] hover:text-brand-orange transition-colors interactive"
            aria-label={`${member.name} Twitter`}
          >
            <Twitter className="w-4 h-4" />
          </a>
        )}
        {member.socials.linkedin && (
          <a
            href={member.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-[#8E8E93] hover:text-[#F5F5F3] transition-colors interactive"
            aria-label={`${member.name} LinkedIn`}
          >
            <Linkedin className="w-4 h-4" />
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function Team({ lang }: TeamProps) {
  const t = TRANSLATIONS[lang];
  const teamList = TEAM_DATA[lang];

  return (
    <section id="team" className="py-24 md:py-32 bg-[#090909] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-brand-orange">
                {t.teamLabel}
              </span>
              <span className="h-[1px] w-12 bg-white/10" />
            </div>
            <h2 className="font-display font-medium text-4xl md:text-6xl tracking-tight text-[#F5F5F3] leading-[1.05]">
              {lang === "vi" ? "Người Kiến Tạo" : "The Builders"}
            </h2>
          </div>
          <p className="font-mono text-xs text-[#8E8E93] max-w-xs leading-relaxed">
            {lang === "vi"
              ? "BA KỸ SƯ CHUYÊN GIA HỆ THỐNG ĐỒNG HÀNH TRỰC TIẾP TRONG TỪNG DỰ ÁN. KHÔNG CÓ KHÂU QUẢN LÝ TRUNG GIAN."
              : "THREE SPECIALIST SYSTEM DEVELOPERS ALIGNED DIRECTLY WITH EACH SHIPMENT. NO INTERMEDIARIES."}
          </p>
        </div>

        {/* Three Founders side-by-side Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12" id="founders-grid">
          {teamList.map((member, idx) => (
            <TeamMemberCard key={member.name} member={member} idx={idx} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}
