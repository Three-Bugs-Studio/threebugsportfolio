import React, { useState, useRef } from "react";
import { TEAM_DATA, TRANSLATIONS } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { 
  FaGithub, 
  FaArrowUpRightFromSquare, 
  FaXmark,
  FaPlane,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa6";
import { TeamMember } from "../types";
import DuongPhuDongImg from "@/assets/profile/DuongPhuDongProfile.webp";
import HuynhQuangDongImg from "@/assets/profile/HuynhQuangDongProfile.webp";
import HoQuangHuyImg from "@/assets/profile/HoQuangHuyProfile.webp";
import ThuTranImg from "@/assets/profile/ThuTranProfile.webp";
import HaoVuImg from "@/assets/profile/HaoProfile.webp";
import receptionistDeskGif from "@/assets/animation-icon/receptionist-desk.gif";
import sidePlaneImg from "@/assets/sideplane/sideplane.png";

interface TeamProps {
  lang: "vi" | "en";
}

interface ActivityMeta {
  seat: string;
  viRole: string;
  enRole: string;
  glowColor: string;
}

export default function Team({ lang }: TeamProps) {
  const t = TRANSLATIONS[lang];
  const teamList = TEAM_DATA[lang];
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const profileImages: Record<string, string> = {
    "Duong Phu Dong": DuongPhuDongImg,
    "Thu Tran": ThuTranImg,
    "Huynh Quang Dong": HuynhQuangDongImg,
    "Ho Quang Huy": HoQuangHuyImg,
    "Hao Vu": HaoVuImg,
  };

  const memberMeta: Record<string, ActivityMeta> = {
    "Duong Phu Dong": {
      seat: "SEAT 01A",
      viRole: "Founder & Lead Fullstack",
      enRole: "Founder & Lead Fullstack",
      glowColor: "#FF6A00",
    },
    "Thu Tran": {
      seat: "SEAT 02A",
      viRole: "Co-Founder & UI/UX Lead",
      enRole: "Co-Founder & UI/UX Lead",
      glowColor: "#C084FC",
    },
    "Huynh Quang Dong": {
      seat: "SEAT 03A",
      viRole: "Tester & Scrum Master",
      enRole: "QA Tester & Scrum Master",
      glowColor: "#38BDF8",
    },
    "Ho Quang Huy": {
      seat: "SEAT 04A",
      viRole: "DevOps & Cloud Architect",
      enRole: "DevOps & Cloud Architect",
      glowColor: "#34D399",
    },
    "Hao Vu": {
      seat: "SEAT 05A",
      viRole: "Backend & AI Specialist",
      enRole: "Backend & AI Specialist",
      glowColor: "#A855F7",
    },
  };

  // Precise percentage window coordinates matching the exact 5 oval windows in sideplane.png
  const windowSlots = [
    { left: "36.8%", top: "41.5%", width: "4.8%", height: "18.5%" },
    { left: "44.4%", top: "41.5%", width: "4.8%", height: "18.5%" },
    { left: "52.0%", top: "41.5%", width: "4.8%", height: "18.5%" },
    { left: "59.6%", top: "41.5%", width: "4.8%", height: "18.5%" },
    { left: "67.2%", top: "41.5%", width: "4.8%", height: "18.5%" },
  ];

  const handleScrollToContact = () => {
    const element = document.getElementById("app-contact-section") || document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollCabin = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -350 : 350;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="team" className="py-24 md:py-32 bg-[#090909] border-t border-white/5 relative overflow-hidden">
      {/* Background Tech Grid */}
      <div className="absolute inset-0 swiss-grid opacity-5 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-brand-orange/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        
        {/* Section Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-brand-orange font-semibold flex items-center gap-2">
                <FaPlane className="w-3.5 h-3.5" />
                {lang === "vi" ? "05 // CHUYẾN BAY KỸ SƯ STUDIO" : "05 // FLIGHT 3B-2026 FUSELAGE"}
              </span>
              <span className="h-[1px] w-12 bg-brand-orange/40" />
            </div>
            <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight text-[#F5F5F3] uppercase leading-tight">
              {lang === "vi" ? "Đội Ngũ 5 Kỹ Sư Trực Tiếp" : "The 5 Flight Engineers"}
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Telemetry Badge */}
            <div className="hidden sm:flex items-center gap-3 bg-[#111113] border border-white/10 px-4 py-2 rounded-lg font-mono text-[11px] text-[#8E8E93]">
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                CRUISE 35,000 FT
              </span>
              <span className="text-white/20">|</span>
              <span className="text-brand-orange font-bold">MACH 0.85</span>
              <span className="text-white/20">|</span>
              <span>5 PASSENGERS</span>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollCabin("left")}
                className="w-10 h-10 rounded-lg bg-[#111113] border border-white/10 hover:border-brand-orange/50 hover:text-brand-orange text-white flex items-center justify-center transition-colors interactive"
                aria-label="Previous Seat"
              >
                <FaChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollCabin("right")}
                className="w-10 h-10 rounded-lg bg-[#111113] border border-white/10 hover:border-brand-orange/50 hover:text-brand-orange text-white flex items-center justify-center transition-colors interactive"
                aria-label="Next Seat"
              >
                <FaChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Sideplane PNG Fuselage Container */}
        <div className="relative w-full rounded-3xl overflow-hidden border border-white/15 p-4 sm:p-6 md:p-8 bg-[#090A0D] shadow-2xl">
          
          {/* Horizontal Scroll Wrapper */}
          <div ref={scrollContainerRef} className="overflow-x-auto custom-scrollbar pb-4 scroll-smooth">
            
            {/* Airplane Graphic Container */}
            <div className="min-w-[1000px] lg:min-w-0 relative">
              
              {/* Authentic Sideplane PNG Graphic */}
              <img
                src={sidePlaneImg}
                alt="3B Studio Commercial Airplane Fuselage"
                className="w-full h-auto block object-contain pointer-events-none select-none drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)]"
              />

              {/* Exact Percentage Window Portals Fitting Inside sideplane.png Windows */}
              <div className="absolute inset-0 pointer-events-auto">
                {teamList.map((member, idx) => {
                  const slot = windowSlots[idx] || { left: `${36.8 + idx * 7.6}%`, top: "41.5%", width: "4.8%", height: "18.5%" };
                  const memberImg = profileImages[member.name];
                  const meta = memberMeta[member.name] || {
                    seat: `SEAT 0${idx + 1}A`,
                    viRole: member.role,
                    enRole: member.role,
                    glowColor: "#FF6A00",
                  };

                  return (
                    <div
                      key={member.name}
                      style={{
                        left: slot.left,
                        top: slot.top,
                        width: slot.width,
                        height: slot.height,
                      }}
                      onClick={() => setSelectedMember(member)}
                      className="absolute group cursor-pointer rounded-[35%] overflow-hidden border-2 border-white/20 hover:border-brand-orange transition-all duration-300 hover:scale-105 shadow-inner bg-black"
                    >
                      {/* Member Portrait Clipped Exactly Inside Airplane Window */}
                      <img
                        src={memberImg}
                        alt={member.name}
                        className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                      
                      {/* Window Gloss Reflection */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none" />
                    </div>
                  );
                })}
              </div>

            </div>

          </div>

          {/* Passenger Info Grid Bar Underneath Sideplane */}
          <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {teamList.map((member, idx) => {
              const meta = memberMeta[member.name] || {
                seat: `SEAT 0${idx + 1}A`,
                viRole: member.role,
                enRole: member.role,
                glowColor: "#FF6A00",
              };

              return (
                <div
                  key={member.name}
                  onClick={() => setSelectedMember(member)}
                  className="bg-[#111113] border border-white/10 hover:border-brand-orange/50 p-3.5 rounded-xl transition-all duration-300 cursor-pointer interactive flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span 
                      className="font-mono text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider bg-white/5 border border-white/10 text-white"
                      style={{ color: meta.glowColor, borderColor: `${meta.glowColor}40` }}
                    >
                      {meta.seat}
                    </span>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: meta.glowColor }} />
                  </div>

                  <div>
                    <h4 className="font-display font-bold text-sm text-[#F5F5F3] group-hover:text-brand-orange transition-colors truncate">
                      {member.name}
                    </h4>
                    <p className="font-sans text-xs text-[#8E8E93] font-light truncate mt-0.5">
                      {lang === "vi" ? meta.viRole : meta.enRole}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Team CTA Box */}
        <div className="mt-16 bg-[#111113]/90 border border-white/10 p-6 md:p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="flex items-center gap-4 relative z-10">
            <div className="receptionist-anim-icon-container w-14 h-14 rounded-xl bg-[#080808] border border-white/10 p-1.5 shrink-0 flex items-center justify-center">
              <img src={receptionistDeskGif} alt="Receptionist Desk" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg md:text-xl text-[#F5F5F3] leading-snug">
                {lang === "vi" ? "Sẵn Sàng Đồng Hành Cùng Dự Án Của Bạn" : "Ready to Onboard Your Next Project"}
              </h3>
              <p className="font-sans text-xs text-[#8E8E93] font-light mt-1">
                {lang === "vi" ? "Trao đổi kỹ thuật 1-1 trực tiếp với lập trình viên phụ trách." : "Direct 1-on-1 technical consultation with lead engineers."}
              </p>
            </div>
          </div>

          <button
            onClick={handleScrollToContact}
            className="btn-stacked font-mono text-xs uppercase tracking-widest px-6 py-3.5 bg-brand-orange text-[#090909] font-bold rounded-sm inline-flex items-center gap-2 group shrink-0 interactive hover:bg-white hover:text-black transition-colors"
          >
            <span>{lang === "vi" ? "NHẬN TƯ VẤN TRỰC TIẾP" : "DIRECT CONSULTATION"}</span>
            <FaArrowUpRightFromSquare className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Member Profile Detail Drawer Modal */}
        <AnimatePresence>
          {selectedMember && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-6"
              onClick={() => setSelectedMember(null)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#111113] border border-white/15 rounded-xl p-6 md:p-8 max-w-lg w-full relative overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Top Accent Orange Border Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-brand-orange" />

                <button
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-4 right-4 text-[#8E8E93] hover:text-white transition-colors p-1"
                  aria-label="Close detail modal"
                >
                  <FaXmark className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl overflow-hidden border border-brand-orange/40 shrink-0 bg-[#080808]">
                    <img
                      src={profileImages[selectedMember.name]}
                      alt={selectedMember.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-[#F5F5F3]">
                      {selectedMember.name}
                    </h3>
                    <p className="font-sans text-xs text-brand-orange font-medium mt-0.5">
                      {selectedMember.role}
                    </p>
                    <span className="font-mono text-[9px] text-[#8E8E93] uppercase tracking-wider block mt-1">
                      {selectedMember.diagramRole}
                    </span>
                  </div>
                </div>

                <p className="font-sans text-xs md:text-sm text-[#8E8E93] leading-relaxed mb-6 font-light">
                  {selectedMember.bio}
                </p>

                {/* Technical Stack / Specialties Tags */}
                <div className="mb-6">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-brand-orange block mb-2 font-bold">
                    SPECIALIZED SKILLS & STACK
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(selectedMember.specialties || []).map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[10px] bg-[#1A1A1E] border border-white/10 px-2.5 py-1 rounded-sm text-[#F5F5F3]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Modal Footer Link */}
                {selectedMember.socials.github && (
                  <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                    <span className="font-mono text-[10px] text-[#8E8E93]">
                      THREE BUGS STUDIO
                    </span>
                    <a
                      href={selectedMember.socials.github}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-stacked font-mono text-xs bg-brand-orange text-[#090909] hover:bg-white hover:text-black px-4 py-2 rounded-sm font-bold flex items-center gap-2 transition-colors"
                    >
                      <FaGithub className="w-4 h-4" />
                      <span>GITHUB PROFILE</span>
                    </a>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
