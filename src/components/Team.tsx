import React, { useState } from "react";
import { TEAM_DATA, TRANSLATIONS } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { Github, Twitter, Linkedin, Network, LayoutGrid, Sparkles, ArrowRight, UserCheck } from "lucide-react";
import { TeamMember } from "../types";
import DuongPhuDongImg from "@/assets/profile/DuongPhuDongProfile.webp";
import HuynhQuangDongImg from "@/assets/profile/HuynhQuangDongProfile.webp";
import HoQuangHuyImg from "@/assets/profile/HoQuangHuyProfile.webp";
import ThuTranImg from "@/assets/profile/ThuTranProfile.webp";
import HaoVuImg from "@/assets/profile/HaoProfile.webp";

interface TeamProps {
  lang: "vi" | "en";
}

interface TeamMemberCardProps {
  member: TeamMember;
  idx: number;
  lang: "vi" | "en";
  isHighlighted?: boolean;
  onHover?: (nodeId: string | null) => void;
}

export default function Team({ lang }: TeamProps) {
  const t = TRANSLATIONS[lang];
  const teamList = TEAM_DATA[lang];
  const [viewMode, setViewMode] = useState<"diagram" | "grid">("diagram");
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

  const profileImages: Record<string, string> = {
    "Duong Phu Dong": DuongPhuDongImg,
    "Thu Tran": ThuTranImg,
    "Huynh Quang Dong": HuynhQuangDongImg,
    "Ho Quang Huy": HoQuangHuyImg,
    "Hao Vu": HaoVuImg,
  };

  // Find active member when hovering over a node
  const activeMember = teamList.find((m) => m.nodeId === activeNodeId) || teamList[0];

  return (
    <section id="team" className="py-24 md:py-32 bg-[#090909] border-t border-white/5 relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 swiss-grid opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header & View Mode Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-brand-orange">
                {t.teamLabel}
              </span>
              <span className="h-[1px] w-12 bg-white/10" />
            </div>
            <h2 className="font-display font-medium text-4xl md:text-6xl tracking-tight text-[#F5F5F3] leading-[1.05]">
              {lang === "vi" ? "Sơ Đồ & Đội Ngũ Thực Hiện" : "Studio Architecture & Team"}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <p className="hidden lg:block font-mono text-xs text-[#8E8E93] max-w-xs leading-relaxed">
              {lang === "vi"
                ? "SƠ ĐỒ PHỐI HỢP DỰ ÁN TRỰC TIẾP VỚI MỖI THÀNH VIÊN SỞ HỮU MÀU TAG VÀ VAI TRÒ CHUYÊN MÔN RIÊNG."
                : "DIRECT WORKFLOW DIAGRAM WITH EACH MEMBER FEATURING UNIQUE COLOR TAGS AND RESPONSIBILITIES."}
            </p>

            {/* View Switcher Controls */}
            <div className="flex items-center bg-[#141414] border border-white/10 rounded-sm p-1">
              <button
                onClick={() => setViewMode("diagram")}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-sm font-mono text-xs transition-all interactive ${
                  viewMode === "diagram"
                    ? "bg-brand-orange text-black font-semibold shadow-sm"
                    : "text-[#8E8E93] hover:text-white"
                }`}
              >
                <Network className="w-3.5 h-3.5" />
                <span>{lang === "vi" ? "SƠ ĐỒ DIAGRAM" : "DIAGRAM FLOW"}</span>
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-sm font-mono text-xs transition-all interactive ${
                  viewMode === "grid"
                    ? "bg-brand-orange text-black font-semibold shadow-sm"
                    : "text-[#8E8E93] hover:text-white"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>{lang === "vi" ? "THẺ CHI TIẾT" : "MEMBER CARDS"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* MODE 1: INTERACTIVE WORKFLOW DIAGRAM */}
        {viewMode === "diagram" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            {/* Legend & Tag Color Guide */}
            <div className="mb-8 p-4 bg-[#111111] border border-white/10 rounded-sm flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 font-mono text-xs text-[#8E8E93]">
                <Sparkles className="w-4 h-4 text-brand-orange" />
                <span>{lang === "vi" ? "MÃ MÀU TAG CHUYÊN MÔN KĨ THUẬT:" : "SIGNATURE TECHNICAL COLOR TAGS:"}</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {teamList.map((m) => (
                  <button
                    key={m.name}
                    onMouseEnter={() => setActiveNodeId(m.nodeId)}
                    onMouseLeave={() => setActiveNodeId(null)}
                    className={`font-mono text-[10px] uppercase px-2.5 py-1 rounded-sm border transition-all flex items-center gap-1.5 interactive ${
                      m.colorTag.badgeClass
                    } ${activeNodeId === m.nodeId ? "ring-2 ring-white" : "opacity-85 hover:opacity-100"}`}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: m.colorTag.hex }} />
                    <span>{m.name.split(" ")[0]}: {m.colorTag.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Workflow Diagram Main Visual Box */}
            <div className="relative bg-[#0d0d0d] border border-white/10 rounded-sm p-6 md:p-12 overflow-x-auto min-w-[700px]">
              
              {/* Flowchart Steps Title Header */}
              <div className="flex justify-between items-center mb-10 pb-4 border-b border-white/5 font-mono text-[11px] text-[#8E8E93]">
                <span>// STEP 01: REQUIREMENT</span>
                <span>// STEP 02: DESIGN UI</span>
                <span>// STEP 03: DEV & DB PIPELINE</span>
                <span>// STEP 04: QA & SHIP</span>
              </div>

              {/* Diagram Network Nodes Pipeline Layout */}
              <div className="grid grid-cols-5 gap-4 relative z-10 items-stretch">
                
                {/* Node 1: Duong Phu Dong */}
                <div
                  onMouseEnter={() => setActiveNodeId("node_dong")}
                  onMouseLeave={() => setActiveNodeId(null)}
                  className={`flex flex-col justify-between p-5 rounded-sm bg-[#121212] border-2 transition-all duration-300 cursor-pointer ${
                    activeNodeId === "node_dong" || !activeNodeId
                      ? "border-[#FF6A00] shadow-[0_0_25px_rgba(255,106,0,0.2)]"
                      : "border-white/10 opacity-60"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-[9px] px-2 py-0.5 rounded-sm bg-[#FF6A00]/20 text-[#FF6A00] border border-[#FF6A00]/40 uppercase font-bold">
                        [ TAG: CYBER ORANGE ]
                      </span>
                      <span className="font-mono text-[10px] text-[#8E8E93]">01</span>
                    </div>
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden border-2 border-[#FF6A00]">
                      <img src={profileImages["Duong Phu Dong"]} alt="Duong Phu Dong" className="w-full h-full object-cover" />
                    </div>
                    <h4 className="font-display font-bold text-white text-center text-sm">Duong Phu Dong</h4>
                    <p className="font-mono text-[9px] text-[#FF6A00] text-center uppercase tracking-wider mt-0.5">
                      {teamList[0].diagramRole}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 font-mono text-[9px] text-[#8E8E93] leading-tight">
                    • Khởi tạo đặc tả<br />
                    • Quản lý tiến độ<br />
                    • Chốt Hợp đồng
                  </div>
                </div>

                {/* Node 2: Thu Tran */}
                <div
                  onMouseEnter={() => setActiveNodeId("node_thutran")}
                  onMouseLeave={() => setActiveNodeId(null)}
                  className={`flex flex-col justify-between p-5 rounded-sm bg-[#121212] border-2 transition-all duration-300 cursor-pointer ${
                    activeNodeId === "node_thutran" || !activeNodeId
                      ? "border-[#A855F7] shadow-[0_0_25px_rgba(168,85,247,0.2)]"
                      : "border-white/10 opacity-60"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-[9px] px-2 py-0.5 rounded-sm bg-[#A855F7]/20 text-[#C084FC] border border-[#A855F7]/40 uppercase font-bold">
                        [ TAG: NEON VIOLET ]
                      </span>
                      <span className="font-mono text-[10px] text-[#8E8E93]">02</span>
                    </div>
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden border-2 border-[#A855F7]">
                      <img src={profileImages["Thu Tran"]} alt="Thu Tran" className="w-full h-full object-cover" />
                    </div>
                    <h4 className="font-display font-bold text-white text-center text-sm">Thu Tran</h4>
                    <p className="font-mono text-[9px] text-[#C084FC] text-center uppercase tracking-wider mt-0.5">
                      {teamList[1].diagramRole}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 font-mono text-[9px] text-[#8E8E93] leading-tight">
                    • Thiết kế Figma UI/UX<br />
                    • Design System Token<br />
                    • Trải nghiệm giao diện
                  </div>
                </div>

                {/* Node 3: Ho Quang Huy */}
                <div
                  onMouseEnter={() => setActiveNodeId("node_hohuy")}
                  onMouseLeave={() => setActiveNodeId(null)}
                  className={`flex flex-col justify-between p-5 rounded-sm bg-[#121212] border-2 transition-all duration-300 cursor-pointer ${
                    activeNodeId === "node_hohuy" || !activeNodeId
                      ? "border-[#10B981] shadow-[0_0_25px_rgba(16,185,129,0.2)]"
                      : "border-white/10 opacity-60"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-[9px] px-2 py-0.5 rounded-sm bg-[#10B981]/20 text-[#34D399] border border-[#10B981]/40 uppercase font-bold">
                        [ TAG: EMERALD MINT ]
                      </span>
                      <span className="font-mono text-[10px] text-[#8E8E93]">03</span>
                    </div>
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden border-2 border-[#10B981]">
                      <img src={profileImages["Ho Quang Huy"]} alt="Ho Quang Huy" className="w-full h-full object-cover" />
                    </div>
                    <h4 className="font-display font-bold text-white text-center text-sm">Ho Quang Huy</h4>
                    <p className="font-mono text-[9px] text-[#34D399] text-center uppercase tracking-wider mt-0.5">
                      {teamList[3].diagramRole}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 font-mono text-[9px] text-[#8E8E93] leading-tight">
                    • Fullstack React/Next.js<br />
                    • Docker & Cloud DevOps<br />
                    • Máy chủ & CI/CD
                  </div>
                </div>

                {/* Node 4: Hao Vu */}
                <div
                  onMouseEnter={() => setActiveNodeId("node_haovu")}
                  onMouseLeave={() => setActiveNodeId(null)}
                  className={`flex flex-col justify-between p-5 rounded-sm bg-[#121212] border-2 transition-all duration-300 cursor-pointer ${
                    activeNodeId === "node_haovu" || !activeNodeId
                      ? "border-[#F43F5E] shadow-[0_0_25px_rgba(244,63,94,0.2)]"
                      : "border-white/10 opacity-60"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-[9px] px-2 py-0.5 rounded-sm bg-[#F43F5E]/20 text-[#FB7185] border border-[#F43F5E]/40 uppercase font-bold">
                        [ TAG: ROSE CRIMSON ]
                      </span>
                      <span className="font-mono text-[10px] text-[#8E8E93]">04</span>
                    </div>
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden border-2 border-[#F43F5E]">
                      <img src={profileImages["Hao Vu"]} alt="Hao Vu" className="w-full h-full object-cover" />
                    </div>
                    <h4 className="font-display font-bold text-white text-center text-sm">Hao Vu</h4>
                    <p className="font-mono text-[9px] text-[#FB7185] text-center uppercase tracking-wider mt-0.5">
                      {teamList[4].diagramRole}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 font-mono text-[9px] text-[#8E8E93] leading-tight">
                    • CSDL PostgreSQL<br />
                    • Lập trình REST API<br />
                    • Bảo mật Backend
                  </div>
                </div>

                {/* Node 5: Huynh Quang Dong */}
                <div
                  onMouseEnter={() => setActiveNodeId("node_hoangdong")}
                  onMouseLeave={() => setActiveNodeId(null)}
                  className={`flex flex-col justify-between p-5 rounded-sm bg-[#121212] border-2 transition-all duration-300 cursor-pointer ${
                    activeNodeId === "node_hoangdong" || !activeNodeId
                      ? "border-[#06B6D4] shadow-[0_0_25px_rgba(6,182,212,0.2)]"
                      : "border-white/10 opacity-60"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-[9px] px-2 py-0.5 rounded-sm bg-[#06B6D4]/20 text-[#38BDF8] border border-[#06B6D4]/40 uppercase font-bold">
                        [ TAG: ELECTRIC CYAN ]
                      </span>
                      <span className="font-mono text-[10px] text-[#8E8E93]">05</span>
                    </div>
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden border-2 border-[#06B6D4]">
                      <img src={profileImages["Huynh Quang Dong"]} alt="Huynh Quang Dong" className="w-full h-full object-cover" />
                    </div>
                    <h4 className="font-display font-bold text-white text-center text-sm">Huynh Quang Dong</h4>
                    <p className="font-mono text-[9px] text-[#38BDF8] text-center uppercase tracking-wider mt-0.5">
                      {teamList[2].diagramRole}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 font-mono text-[9px] text-[#8E8E93] leading-tight">
                    • Kiểm thử QA & Security<br />
                    • Quy trình Scrum/Agile<br />
                    • Bàn giao & Bảo hành
                  </div>
                </div>

              </div>

              {/* Connected Active Member Spotlight Bar */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: activeMember.colorTag.hex }} />
                  <span className="font-mono text-xs text-white">
                    {lang === "vi" ? "Thành viên đang chọn:" : "Selected Member Focus:"} <strong>{activeMember.name}</strong>
                  </span>
                  <span className={`font-mono text-[10px] px-2 py-0.5 rounded-sm border ${activeMember.colorTag.badgeClass}`}>
                    {activeMember.colorTag.name}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeMember.specialties.map((spec) => (
                    <span key={spec} className="font-mono text-[10px] text-[#D4D4D8] bg-white/5 border border-white/10 px-2 py-0.5 rounded-sm">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* MODE 2: DETAILED MEMBER CARDS GRID */}
        {(viewMode === "grid" || true) && (
          <div className={viewMode === "diagram" ? "mt-16 border-t border-white/5 pt-16" : ""}>
            {viewMode === "diagram" && (
              <div className="flex items-center gap-2 mb-8 font-mono text-xs text-[#8E8E93]">
                <span>// {lang === "vi" ? "CHI TIẾT HỒ SƠ TỪNG THÀNH VIÊN" : "FULL TECHNICAL MEMBER PROFILES"}</span>
                <span className="h-[1px] flex-1 bg-white/5" />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamList.map((member, idx) => {
                const memberImg = profileImages[member.name];
                const tag = member.colorTag;

                return (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: idx * 0.12, duration: 0.7 }}
                    className="group flex flex-col p-6 rounded-sm bg-[#121212]/50 border border-white/10 hover:border-white/20 transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Top Color Tag Ribbon */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1 transition-opacity opacity-80 group-hover:opacity-100"
                      style={{ backgroundColor: tag.hex }}
                    />

                    {/* Member Header with Tag Badge */}
                    <div className="flex items-start justify-between mb-4">
                      <span className={`font-mono text-[9px] tracking-widest px-2 py-0.5 rounded-sm border uppercase font-bold ${tag.badgeClass}`}>
                        [ {tag.name} ]
                      </span>
                      <span className="font-mono text-[10px] text-[#8E8E93]">
                        NODE 0{idx + 1}
                      </span>
                    </div>

                    {/* Member Image Box */}
                    <div className="h-60 w-full bg-[#090909] border border-white/10 rounded-sm mb-5 relative overflow-hidden flex items-center justify-center group-hover:border-white/20 transition-colors">
                      <div className="absolute inset-0 swiss-grid opacity-10" />
                      <img
                        src={memberImg}
                        alt={member.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>

                    {/* Name & Role */}
                    <h3 className="font-display font-semibold text-xl text-white group-hover:text-brand-orange transition-colors">
                      {member.name}
                    </h3>
                    <span className="font-mono text-[10px] tracking-widest text-brand-orange uppercase mt-1">
                      {member.role}
                    </span>

                    {/* Bio */}
                    <p className="font-sans text-xs text-[#8E8E93] font-light leading-relaxed mt-3 mb-5">
                      {member.bio}
                    </p>

                    {/* Specialties Badges colorized */}
                    <div className="flex flex-wrap gap-1.5 mt-auto mb-5">
                      {member.specialties.map((spec) => (
                        <span
                          key={spec}
                          className="font-mono text-[9px] text-[#E4E4E7] bg-white/5 border border-white/10 px-2 py-0.5 rounded-sm"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    {/* Github Link */}
                    {member.socials.github && (
                      <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                        <span className="font-mono text-[9px] text-[#8E8E93] uppercase">
                          {member.diagramRole}
                        </span>
                        <a
                          href={member.socials.github}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#8E8E93] hover:text-white transition-colors interactive flex items-center gap-1 font-mono text-xs"
                          aria-label={`${member.name} Github`}
                        >
                          <Github className="w-4 h-4" />
                          <span>Code</span>
                        </a>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
