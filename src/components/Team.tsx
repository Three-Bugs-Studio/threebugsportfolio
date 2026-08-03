import React, { useState, useRef } from "react";
import { TEAM_DATA, TRANSLATIONS } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { 
  FaGithub, 
  FaArrowUpRightFromSquare, 
  FaXmark,
  FaPlane,
  FaChevronLeft,
  FaChevronRight,
  FaLaptopCode,
  FaPalette,
  FaVial,
  FaServer,
  FaBrain
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

interface SuiteMeta {
  seat: string;
  viRole: string;
  enRole: string;
  glowColor: string;
  borderColor: string;
  ambientBg: string;
  deskIcon: React.ReactNode;
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

  // Custom Art-Deco Suite Interior Lighting & Metadata per Engineer
  const memberSuites: Record<string, SuiteMeta> = {
    "Duong Phu Dong": {
      seat: "SUITE 01 // CEO",
      viRole: "Founder & Lead Fullstack",
      enRole: "Founder & Lead Fullstack",
      glowColor: "rgba(255, 106, 0, 0.45)",
      borderColor: "#FF6A00",
      ambientBg: "from-[#FF6A00]/30 via-[#FF6A00]/10 to-transparent",
      deskIcon: <FaLaptopCode className="w-3 h-3 text-[#FF6A00]" />,
    },
    "Thu Tran": {
      seat: "SUITE 02 // DESIGN",
      viRole: "Co-Founder & UI/UX Lead",
      enRole: "Co-Founder & UI/UX Lead",
      glowColor: "rgba(192, 132, 252, 0.45)",
      borderColor: "#C084FC",
      ambientBg: "from-[#C084FC]/30 via-[#C084FC]/10 to-transparent",
      deskIcon: <FaPalette className="w-3 h-3 text-[#C084FC]" />,
    },
    "Huynh Quang Dong": {
      seat: "SUITE 03 // QA",
      viRole: "Tester & Scrum Master",
      enRole: "QA Tester & Scrum Master",
      glowColor: "rgba(56, 189, 248, 0.45)",
      borderColor: "#38BDF8",
      ambientBg: "from-[#38BDF8]/30 via-[#38BDF8]/10 to-transparent",
      deskIcon: <FaVial className="w-3 h-3 text-[#38BDF8]" />,
    },
    "Ho Quang Huy": {
      seat: "SUITE 04 // DEVOPS",
      viRole: "DevOps & Cloud Architect",
      enRole: "DevOps & Cloud Architect",
      glowColor: "rgba(52, 211, 153, 0.45)",
      borderColor: "#34D399",
      ambientBg: "from-[#34D399]/30 via-[#34D399]/10 to-transparent",
      deskIcon: <FaServer className="w-3 h-3 text-[#34D399]" />,
    },
    "Hao Vu": {
      seat: "SUITE 05 // AI & BACKEND",
      viRole: "Backend & AI Specialist",
      enRole: "Backend & AI Specialist",
      glowColor: "rgba(168, 85, 247, 0.45)",
      borderColor: "#A855F7",
      ambientBg: "from-[#A855F7]/30 via-[#A855F7]/10 to-transparent",
      deskIcon: <FaBrain className="w-3 h-3 text-[#A855F7]" />,
    },
  };

  // Percentage window coordinates aligned over sideplane.png
  const suiteSlots = [
    { left: "24%", top: "26%", width: "7.2%", height: "48%" },
    { left: "36%", top: "26%", width: "7.2%", height: "48%" },
    { left: "48%", top: "26%", width: "7.2%", height: "48%" },
    { left: "60%", top: "26%", width: "7.2%", height: "48%" },
    { left: "72%", top: "26%", width: "7.2%", height: "48%" },
  ];

  const handleScrollToContact = () => {
    const element = document.getElementById("app-contact-section") || document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollCabin = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -360 : 360;
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
                {lang === "vi" ? "05 // CHUYẾN BAY KỸ SƯ STUDIO" : "05 // FLIGHT 3B-2026 FUSELAGE"}
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
              <span>5 LUXURY SUITES</span>
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

        {/* Sideplane PNG Fuselage Container */}
        <div className="sky-background-box relative w-full rounded-3xl overflow-hidden border border-white/15 p-4 sm:p-6 md:p-8 bg-[#0B0C10] shadow-2xl">
          
          {/* Horizontal Scroll Wrapper for Authentic Sideplane PNG Graphic */}
          <div ref={scrollContainerRef} className="overflow-x-auto custom-scrollbar pb-4 scroll-smooth">
            
            {/* Authentic Sideplane PNG Fuselage Container with Fluid Suite Alignment */}
            <div className="min-w-[1000px] lg:min-w-0 relative">
              
              {/* High-Resolution Side Plane PNG Asset */}
              <img
                src={sidePlaneImg}
                alt="3B Studio Commercial Airplane Fuselage"
                className="w-full h-auto block object-contain pointer-events-none select-none drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)]"
              />

              {/* Precise Percentage-based Suite Overlay Grid */}
              <div className="absolute inset-0 pointer-events-auto">
                {teamList.map((member, idx) => {
                  const slot = suiteSlots[idx] || { left: `${24 + idx * 12}%`, top: "26%", width: "7.2%", height: "48%" };
                  const memberImg = profileImages[member.name];
                  const suite = memberSuites[member.name] || {
                    seat: `SUITE 0${idx + 1}`,
                    viRole: member.role,
                    enRole: member.role,
                    glowColor: "rgba(255, 106, 0, 0.4)",
                    borderColor: "#FF6A00",
                    ambientBg: "from-[#FF6A00]/20 to-transparent",
                    deskIcon: <FaLaptopCode className="w-3 h-3 text-[#FF6A00]" />,
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
                      className="absolute group cursor-pointer flex flex-col items-center justify-between interactive transition-transform hover:scale-105"
                    >
                      {/* Integrated Black Seat Banner at Top Frame */}
                      <div className="bg-black/95 border border-white/20 px-1.5 py-0.5 rounded-full font-mono text-[7px] sm:text-[8.5px] text-white font-bold tracking-widest uppercase backdrop-blur-md shadow-md mb-0.5 z-20 whitespace-nowrap truncate max-w-full">
                        {suite.seat}
                      </div>

                      {/* Panoramic Glass Suite Window Overlay Embedded Over Sideplane PNG */}
                      <div 
                        className="art-deco-suite-frame relative w-full h-full rounded-[1.4rem] sm:rounded-[2rem] bg-[#050608] border-2 group-hover:border-white overflow-hidden transition-all duration-300 flex flex-col justify-end"
                        style={{
                          borderColor: suite.borderColor,
                          boxShadow: `0 4px 15px rgba(0,0,0,0.9), inset 0 0 15px ${suite.glowColor}`,
                        }}
                      >
                        {/* Custom Interior Ambient Lighting Glow */}
                        <div 
                          className={`absolute inset-0 bg-gradient-to-b ${suite.ambientBg} opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none z-10`}
                        />

                        {/* Glossy Window Glass Reflection Streaks */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none z-20" />

                        {/* Team Member Portrait Inside Suite */}
                        <img
                          src={memberImg}
                          alt={member.name}
                          className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-105"
                        />

                        {/* Soft Vignette Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none z-10" />
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>

          </div>

          {/* Sideplane PNG Footer Specs */}
          <div className="mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-mono text-[10px] text-[#8E8E93] tracking-wider uppercase">
                ✈ AUTHENTIC SIDEPLANE GRAPHIC // 5 PANORAMIC SUITES
              </span>
            </div>
            <span className="font-mono text-[10px] text-brand-orange font-bold uppercase tracking-widest bg-brand-orange/10 border border-brand-orange/20 px-3 py-1 rounded-full">
              {lang === "vi" ? "TRẠM DỪNG: TP. HỒ CHÍ MINH" : "DESTINATION: HO CHI MINH CITY"}
            </span>
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
