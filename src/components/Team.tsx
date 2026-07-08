import React, { useState, useEffect } from "react";
import { TEAM_DATA, TRANSLATIONS } from "../data";
import { motion } from "motion/react";
import { Github, Twitter, Linkedin, Terminal, Sparkles, Layout } from "lucide-react";
import { TeamMember } from "../types";
import DuongPhuDongImg from "@/assets/profile/DuongPhuDongProfile.webp";
import HuynhQuangDongImg from "@/assets/profile/HuynhQuangDongProfile.webp";
import HoQuangHuyImg from "@/assets/profile/HoQuangHuyProfile.webp";
import ThuTranImg from "@/assets/profile/ThuTranProfile.webp";

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
  const profileImages = [DuongPhuDongImg, ThuTranImg, HuynhQuangDongImg, HoQuangHuyImg];
  const memberImg = profileImages[idx];
  const isFounder = idx < 2;

  return (
    <motion.div
      id={`founder-card-${idx}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: idx * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`group flex flex-col p-6 rounded-sm relative transition-all duration-300 ${
        isFounder 
          ? 'bg-[#141414]/50 border border-brand-orange/20 hover:border-brand-orange/40 hover:bg-[#1a1a1a]/50 shadow-[0_4px_20px_rgba(255,106,0,0.02)]' 
          : 'bg-[#121212]/30 border border-white/5 hover:border-white/10 hover:bg-[#121212]/40'
      }`}
    >
      {/* Founder Badge Overlay */}
      {isFounder && (
        <div className="absolute top-4 right-4 bg-brand-orange/15 border border-brand-orange/30 px-2 py-0.5 rounded-sm font-mono text-[7px] text-brand-orange tracking-widest uppercase z-20">
          {lang === "vi" ? "SÁNG LẬP" : "FOUNDER"}
        </div>
      )}

      {/* Visual Portrait Box */}
      <div className={`h-64 w-full bg-[#090909] border rounded-sm mb-6 relative overflow-hidden flex items-center justify-center transition-colors ${
        isFounder ? 'border-brand-orange/10 group-hover:border-brand-orange/20' : 'border-white/5 group-hover:border-white/10'
      }`}>
        <div className="absolute inset-0 swiss-grid opacity-10" />

        {/* Real Profile Image loaded instantly */}
        <img 
          src={memberImg}
          alt={member.name}
          className="w-full h-full object-cover"
        />

        {/* Initials Label Overlay */}
        <span className="absolute top-4 left-4 font-mono text-[10px] text-[#8E8E93] bg-[#090909]/60 px-2 py-0.5 rounded-sm border border-white/5 z-20">
          [ {member.name.split(" ").map(n => n[0]).join("")} ]
        </span>
      </div>

      {/* Name & Role */}
      <h3 className={`font-display font-semibold text-xl transition-colors ${
        isFounder ? 'text-white group-hover:text-brand-orange' : 'text-[#F5F5F3] group-hover:text-brand-orange'
      }`}>
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

  // Segment team list into leadership/founders and technical specialists
  const founders = teamList.slice(0, 2);
  const specialists = teamList.slice(2);

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
              ? "ĐỘI NGŨ CHUYÊN GIA ĐỒNG HÀNH TRỰC TIẾP TRONG TỪNG DỰ ÁN. KHÔNG CÓ KHÂU TRUNG GIAN."
              : "TEAM OF SPECIALISTS ALIGNED DIRECTLY WITH EACH SHIPMENT. NO INTERMEDIARIES."}
          </p>
        </div>

        {/* Tier 1: Sáng lập (Founders & Leadership) */}
        <div className="mb-16">
          <div className="flex items-center gap-2.5 mb-8 select-none">
            <span className="font-mono text-[9px] tracking-widest text-[#8E8E93] uppercase">// {lang === "vi" ? "BAN SÁNG LẬP & THIẾT KẾ" : "FOUNDERS & LEADERSHIP"}</span>
            <span className="h-[1px] flex-1 bg-white/5" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto" id="founders-grid">
            {founders.map((member, idx) => (
              <TeamMemberCard key={member.name} member={member} idx={idx} lang={lang} />
            ))}
          </div>
        </div>

        {/* Tier 2: Kỹ sư chuyên môn (Specialists & Engineers) */}
        <div>
          <div className="flex items-center gap-2.5 mb-8 select-none">
            <span className="font-mono text-[9px] tracking-widest text-[#8E8E93] uppercase">// {lang === "vi" ? "ĐỘI NGŨ KỸ THUẬT CHUYÊN MÔN" : "SPECIALISTS & ENGINE ROOM"}</span>
            <span className="h-[1px] flex-1 bg-white/5" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto" id="specialists-grid">
            {specialists.map((member, idx) => (
              <TeamMemberCard key={member.name} member={member} idx={idx + 2} lang={lang} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
