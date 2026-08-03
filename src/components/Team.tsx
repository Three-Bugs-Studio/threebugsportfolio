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

interface TeamProps {
  lang: "vi" | "en";
}

interface ActivityMeta {
  seat: string;
  vi: string;
  en: string;
  icon: string;
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

  const memberActivities: Record<string, ActivityMeta> = {
    "Duong Phu Dong": {
      seat: "SEAT 01A",
      vi: "👋 Founder & Lead Fullstack",
      en: "👋 Founder & Lead Fullstack",
      icon: "👋",
    },
    "Thu Tran": {
      seat: "SEAT 02A",
      vi: "🎨 Co-Founder & UI/UX Designer",
      en: "🎨 Co-Founder & UI/UX Designer",
      icon: "🎨",
    },
    "Huynh Quang Dong": {
      seat: "SEAT 03A",
      vi: "💻 Tester & Scrum Master",
      en: "💻 QA Tester & Scrum Master",
      icon: "💻",
    },
    "Ho Quang Huy": {
      seat: "SEAT 04A",
      vi: "☕ DevOps & Fullstack Engineer",
      en: "☕ DevOps & Fullstack Engineer",
      icon: "☕",
    },
    "Hao Vu": {
      seat: "SEAT 05A",
      vi: "🎧 Backend & Database Engineer",
      en: "🎧 Backend & Database Engineer",
      icon: "🎧",
    },
  };

  const handleScrollToContact = () => {
    const element = document.getElementById("app-contact-section") || document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollCabin = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="team" className="py-24 md:py-32 bg-[#090909] border-t border-white/5 relative overflow-hidden">
      {/* Background Tech Grid */}
      <div className="absolute inset-0 swiss-grid opacity-5 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-brand-orange/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        
        {/* Section Header & Flight Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-brand-orange font-semibold flex items-center gap-2">
                <FaPlane className="w-3.5 h-3.5" />
                {lang === "vi" ? "05 // CHUYẾN BAY KỸ SƯ STUDIO" : "05 // FLIGHT 3B-2026 CABIN"}
              </span>
              <span className="h-[1px] w-12 bg-brand-orange/40" />
            </div>
            <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight text-[#F5F5F3] uppercase leading-tight">
              {lang === "vi" ? "Đội Ngũ 5 Kỹ Sư Trực Tiếp" : "The 5 Flight Passengers"}
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Live Flight Telemetry Badge */}
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

            {/* Cabin Slider Controls */}
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

        {/* Real Airplane Fuselage & Windows Container */}
        <div className="sky-background-box relative w-full rounded-[2.5rem] overflow-hidden border border-white/15 p-3 sm:p-6 md:p-8 bg-gradient-to-b from-[#080E21] via-[#0C1633] to-[#080E21] shadow-2xl">
          
          {/* Animated Parallax Sky Clouds Background Layer */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
            <svg className="absolute top-4 left-0 w-[200%] h-32 animate-cloud-slow text-white/40 fill-current" viewBox="0 0 1200 120">
              <path d="M0,60 Q150,10 300,60 T600,60 T900,60 T1200,60 L1200,120 L0,120 Z" />
            </svg>
            <svg className="absolute top-16 left-0 w-[200%] h-40 animate-cloud-fast text-white/20 fill-current" viewBox="0 0 1200 120">
              <path d="M0,80 Q200,20 400,80 T800,80 T1200,80 L1200,120 L0,120 Z" />
            </svg>
          </div>

          {/* Authentic Jet Airplane Fuselage Structure */}
          <div className="airplane-fuselage relative bg-[#131418] border-2 border-white/15 rounded-[2rem] p-4 sm:p-6 md:p-8 shadow-2xl">
            
            {/* Top Metallic Rivet Seam Lines & Fuselage Branding */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#3A3D4A] border border-white/20" />
                  <span className="w-2 h-2 rounded-full bg-[#3A3D4A] border border-white/20" />
                  <span className="w-2 h-2 rounded-full bg-[#3A3D4A] border border-white/20" />
                </div>
                <span className="font-mono text-xs text-brand-orange font-bold tracking-widest uppercase">
                  3B AIRWAYS ✈ AIRBUS A350 PASSENGER CABIN
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#8E8E93] uppercase tracking-wider hidden sm:inline-block">
                CLICK WINDOW TO VIEW PROFILE
              </span>
            </div>

            {/* Fuselage Structure Layout with Cockpit Nose & Tail Fin */}
            <div className="relative flex items-center gap-4">
              
              {/* Aircraft Nose Cockpit Frame (Left) */}
              <div className="hidden lg:flex flex-col items-center justify-center w-28 h-64 bg-gradient-to-r from-[#1E212B] to-[#14151C] border-2 border-white/15 rounded-l-[4rem] p-3 shrink-0 relative overflow-hidden shadow-inner">
                <div className="w-16 h-20 bg-cyan-950/60 border-2 border-cyan-400/40 rounded-tl-full rounded-bl-3xl mb-2 flex items-center justify-center shadow-[inset_0_0_15px_rgba(6,182,212,0.3)]">
                  <span className="font-mono text-[9px] text-cyan-400 font-bold rotate-90 tracking-widest">COCKPIT</span>
                </div>
                <span className="font-mono text-[8px] text-[#8E8E93] uppercase tracking-widest text-center mt-2">CAPTAIN 01</span>
              </div>

              {/* Horizontal Scrollable Oval Airplane Windows */}
              <div
                ref={scrollContainerRef}
                className="flex items-stretch gap-6 sm:gap-8 overflow-x-auto snap-x snap-mandatory pb-4 pt-2 custom-scrollbar scroll-smooth w-full"
              >
                {teamList.map((member, idx) => {
                  const memberImg = profileImages[member.name];
                  const activity = memberActivities[member.name] || {
                    seat: `SEAT 0${idx + 1}A`,
                    vi: member.role,
                    en: member.role,
                    icon: "✈",
                  };

                  return (
                    <div
                      key={member.name}
                      onClick={() => setSelectedMember(member)}
                      className="snap-center shrink-0 w-[210px] sm:w-[240px] group cursor-pointer flex flex-col items-center interactive"
                    >
                      {/* Outer Wall Panel Recess Box */}
                      <div className="relative p-2.5 sm:p-3 rounded-[3.8rem] bg-[#1A1C24] border-2 border-white/15 shadow-[inset_0_2px_10px_rgba(0,0,0,0.8)] group-hover:border-brand-orange/60 transition-all duration-300">
                        
                        {/* Iconic Oval Airplane Window Frame */}
                        <div className="airplane-window-frame relative w-[180px] sm:w-[200px] h-[250px] sm:h-[280px] rounded-[3.5rem] bg-[#0A0B0E] border-[7px] border-[#2B2E38] p-2.5 shadow-[inset_0_6px_18px_rgba(0,0,0,0.9),0_10px_25px_rgba(0,0,0,0.6)] group-hover:border-brand-orange/80 transition-all duration-300 group-hover:scale-[1.02] flex flex-col justify-between overflow-hidden">
                          
                          {/* Glossy Window Glass Reflection Streaks */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none z-20" />
                          <div className="absolute top-2 right-3 w-10 h-40 bg-white/10 rounded-full transform rotate-[25deg] pointer-events-none z-20" />

                          {/* Seat Number Tag */}
                          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 bg-black/80 border border-white/20 px-3 py-0.5 rounded-full font-mono text-[9px] text-brand-orange font-bold tracking-widest uppercase backdrop-blur-md">
                            {activity.seat}
                          </div>

                          {/* Passenger Viewport Window Aperture */}
                          <div className="relative w-full h-full rounded-[2.8rem] overflow-hidden bg-[#050608] border border-white/10 flex flex-col justify-end">
                            
                            {/* Team Member Portrait (Static - No shaking) */}
                            <div className="relative w-full h-full">
                              <img
                                src={memberImg}
                                alt={member.name}
                                className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-105"
                              />
                              {/* Soft Gradient Vignette */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
                            </div>

                            {/* Activity Status Badge Overlay */}
                            <div className="absolute bottom-2.5 left-2.5 right-2.5 z-30">
                              <div className="bg-black/85 backdrop-blur-md border border-white/15 group-hover:border-brand-orange/60 px-2 py-1 rounded-lg text-center transition-colors">
                                <span className="font-mono text-[9.5px] text-white font-medium block truncate">
                                  {lang === "vi" ? activity.vi : activity.en}
                                </span>
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>

                      {/* Member Name & Role Tag Underneath Window */}
                      <div className="mt-4 text-center space-y-1 w-full px-2">
                        <h3 className="font-display font-bold text-base sm:text-lg text-[#F5F5F3] group-hover:text-brand-orange transition-colors truncate">
                          {member.name}
                        </h3>
                        <p className="font-sans text-xs text-[#8E8E93] font-light truncate">
                          {member.role}
                        </p>
                      </div>

                    </div>
                  );
                })}
              </div>

              {/* Aircraft Tail Fin Frame (Right) */}
              <div className="hidden lg:flex flex-col items-center justify-center w-28 h-64 bg-gradient-to-l from-[#1E212B] to-[#14151C] border-2 border-white/15 rounded-r-[4rem] p-3 shrink-0 relative overflow-hidden shadow-inner">
                <div className="w-16 h-20 bg-brand-orange/10 border-2 border-brand-orange/40 rounded-tr-full rounded-br-3xl mb-2 flex items-center justify-center">
                  <span className="font-mono text-[11px] text-brand-orange font-bold tracking-widest">3B-TAIL</span>
                </div>
                <span className="font-mono text-[8px] text-[#8E8E93] uppercase tracking-widest text-center mt-2">FLIGHT 2026</span>
              </div>

            </div>

            {/* Fuselage Bottom Rivet Seam Lines & Footer Indicator */}
            <div className="mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
                <span className="font-mono text-[10px] text-[#8E8E93] tracking-wider uppercase">
                  ✈ 100% IN-HOUSE ENGINEERS // DIRECT TECHNICAL PARTNERSHIP
                </span>
              </div>
              <span className="font-mono text-[10px] text-brand-orange font-bold uppercase tracking-widest bg-brand-orange/10 border border-brand-orange/20 px-3 py-1 rounded-full">
                {lang === "vi" ? "TRẠM DỪNG: TP. HỒ CHÍ MINH" : "DESTINATION: HO CHI MINH CITY"}
              </span>
            </div>

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
