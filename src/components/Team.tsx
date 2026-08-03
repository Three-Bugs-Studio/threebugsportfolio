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

  // Custom Art-Deco Suite Interior Lighting & Desk Metadata
  const memberSuites: Record<string, SuiteMeta> = {
    "Duong Phu Dong": {
      seat: "SUITE 01 // CEO",
      viRole: "Founder & Lead Fullstack",
      enRole: "Founder & Lead Fullstack",
      glowColor: "rgba(255, 106, 0, 0.45)",
      borderColor: "#FF6A00",
      ambientBg: "from-[#FF6A00]/25 via-[#FF6A00]/10 to-transparent",
      deskIcon: <FaLaptopCode className="w-3.5 h-3.5 text-[#FF6A00]" />,
    },
    "Thu Tran": {
      seat: "SUITE 02 // DESIGN",
      viRole: "Co-Founder & UI/UX Lead",
      enRole: "Co-Founder & UI/UX Lead",
      glowColor: "rgba(192, 132, 252, 0.45)",
      borderColor: "#C084FC",
      ambientBg: "from-[#C084FC]/25 via-[#C084FC]/10 to-transparent",
      deskIcon: <FaPalette className="w-3.5 h-3.5 text-[#C084FC]" />,
    },
    "Huynh Quang Dong": {
      seat: "SUITE 03 // QA",
      viRole: "Tester & Scrum Master",
      enRole: "QA Tester & Scrum Master",
      glowColor: "rgba(56, 189, 248, 0.45)",
      borderColor: "#38BDF8",
      ambientBg: "from-[#38BDF8]/25 via-[#38BDF8]/10 to-transparent",
      deskIcon: <FaVial className="w-3.5 h-3.5 text-[#38BDF8]" />,
    },
    "Ho Quang Huy": {
      seat: "SUITE 04 // DEVOPS",
      viRole: "DevOps & Cloud Architect",
      enRole: "DevOps & Cloud Architect",
      glowColor: "rgba(52, 211, 153, 0.45)",
      borderColor: "#34D399",
      ambientBg: "from-[#34D399]/25 via-[#34D399]/10 to-transparent",
      deskIcon: <FaServer className="w-3.5 h-3.5 text-[#34D399]" />,
    },
    "Hao Vu": {
      seat: "SUITE 05 // AI & BACKEND",
      viRole: "Backend & AI Specialist",
      enRole: "Backend & AI Specialist",
      glowColor: "rgba(168, 85, 247, 0.45)",
      borderColor: "#A855F7",
      ambientBg: "from-[#A855F7]/25 via-[#A855F7]/10 to-transparent",
      deskIcon: <FaBrain className="w-3.5 h-3.5 text-[#A855F7]" />,
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
                {lang === "vi" ? "05 // KHOANG TƯƠNG LAI STUDIO" : "05 // ART-DECO FUTURISTIC AIRLINER"}
              </span>
              <span className="h-[1px] w-12 bg-brand-orange/40" />
            </div>
            <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight text-[#F5F5F3] uppercase leading-tight">
              {lang === "vi" ? "5 Private Suite Kỹ Sư Studio" : "The 5 Panoramic Private Suites"}
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Live Telemetry Badge */}
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

            {/* Cabin Navigation Slider Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollCabin("left")}
                className="w-10 h-10 rounded-lg bg-[#111113] border border-white/10 hover:border-brand-orange/50 hover:text-brand-orange text-white flex items-center justify-center transition-colors interactive"
                aria-label="Previous Suite"
              >
                <FaChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollCabin("right")}
                className="w-10 h-10 rounded-lg bg-[#111113] border border-white/10 hover:border-brand-orange/50 hover:text-brand-orange text-white flex items-center justify-center transition-colors interactive"
                aria-label="Next Suite"
              >
                <FaChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Grand Art-Deco Futuristic Airliner Container */}
        <div className="relative w-full rounded-[2.5rem] overflow-hidden border border-white/15 p-4 sm:p-6 md:p-8 bg-gradient-to-r from-[#070D1E] via-[#0D1836] to-[#070D1E] shadow-2xl">
          
          {/* Subtle Ambient Starlight Canvas */}
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-orange/20 via-transparent to-transparent" />

          {/* Art-Deco Aircraft Fuselage Structure */}
          <div className="relative bg-[#111319]/95 backdrop-blur-xl border border-white/15 rounded-[2rem] p-4 sm:p-6 md:p-8 shadow-2xl overflow-hidden">
            
            {/* Top Metallic Rivet Seam Lines & Art-Deco Inlay */}
            <div className="flex items-center justify-between pb-4 mb-8 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-orange animate-pulse" />
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                </div>
                <span className="font-mono text-xs text-brand-orange font-bold tracking-widest uppercase">
                  3B-STUDIO ✈ LUXURY ART-DECO AIRLINER // 5 PRIVATE SUITES
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#8E8E93] uppercase tracking-wider hidden sm:inline-block">
                CLICK ANY SUITE TO VIEW FULL ENGINEER BIO
              </span>
            </div>

            {/* Fuselage Structure with 3D Depth Cockpit & 5 Vertical Pill Panoramic Suites */}
            <div className="relative flex items-stretch gap-6">
              
              {/* 3D Depth Cockpit Area (Left) */}
              <div className="hidden lg:flex flex-col justify-between w-36 bg-gradient-to-r from-[#1A1F2C] to-[#12151F] border-2 border-cyan-500/30 rounded-l-[3.5rem] p-4 shrink-0 relative overflow-hidden shadow-[inset_0_0_30px_rgba(6,182,212,0.2)]">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    <span className="font-mono text-[9px] text-cyan-400 font-bold tracking-widest uppercase">HUD DEPTH</span>
                  </div>
                  <div className="w-full h-24 bg-cyan-950/40 border border-cyan-400/30 rounded-2xl p-2 font-mono text-[8px] text-cyan-300 flex flex-col justify-between">
                    <div>ALT: 35,000 FT</div>
                    <div>SPD: MACH 0.85</div>
                    <div>HEAD: 090° E</div>
                    <div className="text-emerald-400 font-bold">STATUS: OK</div>
                  </div>
                </div>

                <div className="text-center space-y-1">
                  <span className="font-mono text-[10px] text-brand-orange font-bold block">CAPTAIN 01</span>
                  <span className="font-mono text-[8px] text-[#8E8E93] block">3B-COMMAND</span>
                </div>
              </div>

              {/* Horizontal Scrollable 5 Vertical Pill Panoramic Glass Suites */}
              <div
                ref={scrollContainerRef}
                className="flex items-stretch gap-6 sm:gap-8 overflow-x-auto snap-x snap-mandatory pb-4 pt-2 custom-scrollbar scroll-smooth w-full"
              >
                {teamList.map((member, idx) => {
                  const memberImg = profileImages[member.name];
                  const suite = memberSuites[member.name] || {
                    seat: `SUITE 0${idx + 1}`,
                    viRole: member.role,
                    enRole: member.role,
                    glowColor: "rgba(255, 106, 0, 0.4)",
                    borderColor: "#FF6A00",
                    ambientBg: "from-[#FF6A00]/20 to-transparent",
                    deskIcon: <FaLaptopCode className="w-3.5 h-3.5 text-[#FF6A00]" />,
                  };

                  return (
                    <div
                      key={member.name}
                      onClick={() => setSelectedMember(member)}
                      className="snap-center shrink-0 w-[230px] sm:w-[260px] group cursor-pointer flex flex-col items-center interactive"
                    >
                      {/* Vertical Pill Panoramic Glass Suite Frame */}
                      <div 
                        className="art-deco-suite-frame relative w-full h-[360px] sm:h-[400px] rounded-[4rem] p-3 transition-all duration-500 group-hover:scale-[1.03] flex flex-col justify-between overflow-hidden"
                        style={{
                          borderColor: suite.borderColor,
                          boxShadow: `0 10px 30px rgba(0,0,0,0.8), inset 0 0 25px ${suite.glowColor}`,
                        }}
                      >
                        {/* Integrated Black Seat Banner at Top Frame */}
                        <div className="z-30 bg-black/90 border border-white/20 px-3 py-1.5 rounded-full text-center shadow-lg backdrop-blur-md flex items-center justify-center gap-2">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: suite.borderColor }} />
                          <span className="font-mono text-[9.5px] text-white font-bold tracking-widest uppercase">
                            {suite.seat}
                          </span>
                        </div>

                        {/* Floor-to-Ceiling Panoramic Glass Wall & Interior Desk Workstation */}
                        <div className="panoramic-glass-wall relative w-full flex-1 rounded-[3.2rem] overflow-hidden my-2 border border-white/10 flex flex-col justify-end">
                          
                          {/* Customized Interior Lighting Glow */}
                          <div 
                            className={`absolute inset-0 bg-gradient-to-b ${suite.ambientBg} opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none z-10`}
                          />

                          {/* Member Portrait Clipped Inside Panoramic Glass Suite */}
                          <div className="relative w-full h-full">
                            <img
                              src={memberImg}
                              alt={member.name}
                              className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                            />

                            {/* Floor-to-Ceiling Glass Reflection Streak */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none z-20" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
                          </div>

                          {/* Mini Workstation Desk Badge Over Glass */}
                          <div className="absolute bottom-3 left-3 right-3 z-30">
                            <div 
                              className="bg-black/90 border px-3 py-1.5 rounded-xl flex items-center justify-between backdrop-blur-md shadow-xl transition-colors"
                              style={{ borderColor: suite.borderColor }}
                            >
                              <div className="flex items-center gap-2 overflow-hidden">
                                {suite.deskIcon}
                                <span className="font-mono text-[10px] text-white font-bold truncate">
                                  {member.name}
                                </span>
                              </div>
                              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: suite.borderColor }} />
                            </div>
                          </div>

                        </div>

                        {/* Bottom Suite Role Pill */}
                        <div className="z-30 text-center px-2 py-0.5">
                          <span className="font-mono text-[9px] text-[#8E8E93] group-hover:text-white transition-colors block truncate font-medium uppercase tracking-wider">
                            {lang === "vi" ? suite.viRole : suite.enRole}
                          </span>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Tapered Tail Fin Integrated Seamlessly into Sky Background (Right) */}
              <div className="hidden lg:flex flex-col justify-between w-36 bg-gradient-to-l from-[#1A1F2C] to-[#12151F] border-2 border-brand-orange/30 rounded-r-[3.5rem] p-4 shrink-0 relative overflow-hidden shadow-[inset_0_0_30px_rgba(255,106,0,0.15)]">
                <div className="w-full h-24 bg-brand-orange/10 border border-brand-orange/30 rounded-2xl p-2 font-mono text-[9px] text-brand-orange flex flex-col justify-center items-center text-center">
                  <span className="font-bold text-xs block">TAIL FIN</span>
                  <span className="text-[8px] text-white/70 block mt-1">INTEGRATED SKY</span>
                </div>

                <div className="text-center space-y-1">
                  <span className="font-mono text-[10px] text-white font-bold block">3B-AIRWAYS</span>
                  <span className="font-mono text-[8px] text-[#8E8E93] block">ART-DECO 2026</span>
                </div>
              </div>

            </div>

            {/* Art-Deco Fuselage Bottom Telemetry Footer */}
            <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-mono text-[10px] text-[#8E8E93] tracking-wider uppercase">
                  ✈ 5 PANORAMIC PRIVATE SUITES // CUSTOMIZED INTERIOR LIGHTING
                </span>
              </div>
              <span className="font-mono text-[10px] text-brand-orange font-bold uppercase tracking-widest bg-brand-orange/10 border border-brand-orange/20 px-3.5 py-1 rounded-full">
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
