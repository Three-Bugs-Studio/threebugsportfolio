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
    },
    "Thu Tran": {
      seat: "SEAT 02A",
      vi: "🎨 Co-Founder & UI/UX Lead",
      en: "🎨 Co-Founder & UI/UX Lead",
    },
    "Huynh Quang Dong": {
      seat: "SEAT 03A",
      vi: "💻 Tester & Scrum Master",
      en: "💻 QA Tester & Scrum Master",
    },
    "Ho Quang Huy": {
      seat: "SEAT 04A",
      vi: "☕ DevOps & Cloud Engineer",
      en: "☕ DevOps & Cloud Engineer",
    },
    "Hao Vu": {
      seat: "SEAT 05A",
      vi: "🎧 Backend & DB Specialist",
      en: "🎧 Backend & DB Specialist",
    },
  };

  const windowPositions = [
    { x: 310, y: 140, width: 155, height: 210, rx: 70, ry: 70 },
    { x: 520, y: 140, width: 155, height: 210, rx: 70, ry: 70 },
    { x: 730, y: 140, width: 155, height: 210, rx: 70, ry: 70 },
    { x: 940, y: 140, width: 155, height: 210, rx: 70, ry: 70 },
    { x: 1150, y: 140, width: 155, height: 210, rx: 70, ry: 70 },
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

        {/* Parallax Sky & SVG Airplane Fuselage Container */}
        <div className="sky-background-box relative w-full rounded-3xl overflow-hidden border border-white/15 p-4 sm:p-6 md:p-8 bg-gradient-to-b from-[#070D1E] via-[#0B1530] to-[#070D1E] shadow-2xl">
          
          {/* Animated Parallax Sky Clouds Background Layer */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
            <svg className="absolute top-4 left-0 w-[200%] h-32 animate-cloud-slow text-white/40 fill-current" viewBox="0 0 1200 120">
              <path d="M0,60 Q150,10 300,60 T600,60 T900,60 T1200,60 L1200,120 L0,120 Z" />
            </svg>
            <svg className="absolute top-16 left-0 w-[200%] h-40 animate-cloud-fast text-white/20 fill-current" viewBox="0 0 1200 120">
              <path d="M0,80 Q200,20 400,80 T800,80 T1200,80 L1200,120 L0,120 Z" />
            </svg>
          </div>

          {/* Horizontal Scroll Wrapper for SVG Airplane Fuselage */}
          <div ref={scrollContainerRef} className="overflow-x-auto custom-scrollbar pb-4 scroll-smooth">
            
            {/* Real SVG Airplane Fuselage (Aerodynamic Side Profile with Tapered Tail & Oval Windows) */}
            <div className="min-w-[1280px] lg:min-w-0 relative">
              <svg viewBox="0 0 1600 480" className="w-full h-auto drop-shadow-2xl">
                <defs>
                  {/* Fuselage Body Metallic Titanium Gradient */}
                  <linearGradient id="fuselageBodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#2D313D" />
                    <stop offset="35%" stopColor="#1E2028" />
                    <stop offset="70%" stopColor="#14151B" />
                    <stop offset="100%" stopColor="#0B0C0F" />
                  </linearGradient>

                  {/* Cockpit Windshield Gradient */}
                  <linearGradient id="cockpitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#083344" stopOpacity="0.9" />
                  </linearGradient>

                  {/* Cyber Orange Airline Livery Stripe */}
                  <linearGradient id="stripeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FF6A00" />
                    <stop offset="50%" stopColor="#FFA000" />
                    <stop offset="100%" stopColor="#FF6A00" />
                  </linearGradient>

                  {/* Metallic Window Frame Bevel Gradient */}
                  <linearGradient id="windowFrameBevel" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#475569" />
                    <stop offset="50%" stopColor="#1E293B" />
                    <stop offset="100%" stopColor="#0F172A" />
                  </linearGradient>

                  {/* Clip Paths for 5 Oval Airplane Windows */}
                  {windowPositions.map((pos, idx) => (
                    <clipPath id={`window-clip-${idx}`} key={idx}>
                      <rect
                        x={pos.x + 8}
                        y={pos.y + 8}
                        width={pos.width - 16}
                        height={pos.height - 16}
                        rx={pos.rx - 8}
                        ry={pos.ry - 8}
                      />
                    </clipPath>
                  ))}
                </defs>

                {/* 1. JET ENGINE (Under Wing) */}
                <g id="jet-engine">
                  <ellipse cx="780" cy="410" rx="75" ry="26" fill="#1E2028" stroke="#FF6A00" strokeWidth="2" />
                  <ellipse cx="710" cy="410" rx="16" ry="24" fill="#090909" stroke="#334155" strokeWidth="3" />
                  <line x1="710" y1="410" x2="855" y2="410" stroke="#FF6A00" strokeWidth="3" strokeDasharray="6 4" />
                </g>

                {/* 2. JET WINGS (Swept-back Wing Surface) */}
                <polygon
                  points="620,320 840,430 960,425 790,320"
                  fill="#181920"
                  stroke="#475569"
                  strokeWidth="2"
                />

                {/* 3. MAIN COMMERCIAL AIRPLANE FUSELAGE SVG PATH */}
                {/* Nose Cone on Left -> Aerodynamic Roof -> Swept Vertical Tail Fin -> APU Rear Exhaust -> Curved Belly */}
                <path
                  d="
                    M 50,260 
                    C 50,160 140,90 280,90 
                    L 1260,90 
                    L 1380,15 
                    L 1450,15 
                    L 1430,90 
                    L 1560,190 
                    C 1585,210 1585,240 1560,260 
                    L 1450,300 
                    Q 1300,340 1180,340 
                    L 280,340 
                    Q 1300,340 1180,340 
                    Q 140,340 50,260 
                    Z
                  "
                  fill="url(#fuselageBodyGradient)"
                  stroke="rgba(255,255,255,0.25)"
                  strokeWidth="3.5"
                />

                {/* 4. CYBER ORANGE AIRLINE LIVERY STRIPE */}
                <path
                  d="M 120,225 L 1480,225"
                  stroke="url(#stripeGradient)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  opacity="0.85"
                />

                {/* 5. COCKPIT WINDSHIELD WINDOW PANES (Left Nose Cone) */}
                <path
                  d="M 110,185 Q 160,135 220,130 L 220,195 L 140,210 Z"
                  fill="url(#cockpitGradient)"
                  stroke="#06B6D4"
                  strokeWidth="2"
                />
                <line x1="165" y1="135" x2="165" y2="205" stroke="#1E293B" strokeWidth="2.5" />
                <line x1="195" y1="132" x2="195" y2="200" stroke="#1E293B" strokeWidth="2.5" />

                {/* Cockpit Captain Badge */}
                <text x="140" y="245" fill="#06B6D4" fontSize="11" fontFamily="monospace" fontWeight="bold">
                  COCKPIT ✈ CAPTAIN 01
                </text>

                {/* 6. TAIL FIN LOGO & AIRLINE INSIGNIA (Right Tail) */}
                <polygon points="1380,25 1445,25 1428,80 1370,80" fill="#FF6A00" opacity="0.9" />
                <text x="1385" y="55" fill="#FFFFFF" fontSize="16" fontFamily="monospace" fontWeight="bold">
                  3B
                </text>
                <text x="1350" y="115" fill="#8E8E93" fontSize="10" fontFamily="monospace" fontWeight="bold">
                  AIRBUS A350-1000
                </text>

                {/* 7. FUSELAGE RIVET SEAM DOTS & PANEL LINES */}
                <line x1="280" y1="95" x2="280" y2="335" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="730" y1="95" x2="730" y2="335" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="1180" y1="95" x2="1180" y2="335" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 4" />

                {/* 8. 5 CIRCULAR/OVAL AIRPLANE WINDOWS EMBEDDED DIRECTLY IN THE FUSELAGE */}
                {teamList.map((member, idx) => {
                  const pos = windowPositions[idx];
                  const memberImg = profileImages[member.name];
                  const activity = memberActivities[member.name] || {
                    seat: `SEAT 0${idx + 1}A`,
                    vi: member.role,
                    en: member.role,
                  };

                  return (
                    <g
                      key={member.name}
                      className="cursor-pointer group interactive"
                      onClick={() => setSelectedMember(member)}
                    >
                      {/* Outer Airplane Window Metallic Bevel Frame */}
                      <rect
                        x={pos.x}
                        y={pos.y}
                        width={pos.width}
                        height={pos.height}
                        rx={pos.rx}
                        ry={pos.ry}
                        fill="url(#windowFrameBevel)"
                        stroke="#FF6A00"
                        strokeWidth="3.5"
                        className="group-hover:stroke-white transition-all duration-300"
                      />

                      {/* Inner Glass Window Aperture Shadow Rim */}
                      <rect
                        x={pos.x + 6}
                        y={pos.y + 6}
                        width={pos.width - 12}
                        height={pos.height - 12}
                        rx={pos.rx - 6}
                        ry={pos.ry - 6}
                        fill="#050608"
                        stroke="#000000"
                        strokeWidth="4"
                      />

                      {/* Team Member Portrait Clipped Inside the Oval Window */}
                      <image
                        x={pos.x + 8}
                        y={pos.y + 8}
                        width={pos.width - 16}
                        height={pos.height - 16}
                        href={memberImg}
                        preserveAspectRatio="xMidYMin slice"
                        clipPath={`url(#window-clip-${idx})`}
                        className="filter grayscale group-hover:grayscale-0 transition-all duration-300"
                      />

                      {/* Glossy Window Reflection Streak */}
                      <path
                        d={`M ${pos.x + 20},${pos.y + 20} L ${pos.x + pos.width - 20},${pos.y + pos.height - 40}`}
                        stroke="rgba(255,255,255,0.25)"
                        strokeWidth="12"
                        strokeLinecap="round"
                        pointerEvents="none"
                      />

                      {/* Seat Badge Above Window */}
                      <rect
                        x={pos.x + 30}
                        y={pos.y - 22}
                        width="95"
                        height="18"
                        rx="9"
                        fill="#090909"
                        stroke="#FF6A00"
                        strokeWidth="1.5"
                      />
                      <text
                        x={pos.x + 77}
                        y={pos.y - 9}
                        fill="#FF6A00"
                        fontSize="9"
                        fontFamily="monospace"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {activity.seat}
                      </text>

                      {/* ForeignObject Member Name & Role Pill Under Window */}
                      <foreignObject x={pos.x - 15} y={pos.y + pos.height + 12} width={pos.width + 30} height={70}>
                        <div className="text-center space-y-1">
                          <div className="bg-[#111113]/90 border border-white/15 group-hover:border-brand-orange px-2 py-1 rounded-lg shadow-lg transition-colors">
                            <span className="font-display font-bold text-xs text-[#F5F5F3] group-hover:text-brand-orange transition-colors block truncate">
                              {member.name}
                            </span>
                            <span className="font-mono text-[9px] text-[#8E8E93] block truncate">
                              {lang === "vi" ? activity.vi : activity.en}
                            </span>
                          </div>
                        </div>
                      </foreignObject>
                    </g>
                  );
                })}
              </svg>
            </div>

          </div>

          {/* SVG Fuselage Footer Specs */}
          <div className="mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-mono text-[10px] text-[#8E8E93] tracking-wider uppercase">
                ✈ REAL SVG COMMERCIAL AIRPLANE FUSELAGE // 100% IN-HOUSE ENGINEERS
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
