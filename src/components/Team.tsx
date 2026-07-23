import React, { useState } from "react";
import { TEAM_DATA, TRANSLATIONS } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { 
  FaGithub, 
  FaGrip, 
  FaWandMagicSparkles, 
  FaArrowUpRightFromSquare, 
  FaXmark
} from "react-icons/fa6";
import { TeamMember } from "../types";
import DuongPhuDongImg from "@/assets/profile/DuongPhuDongProfile.webp";
import HuynhQuangDongImg from "@/assets/profile/HuynhQuangDongProfile.webp";
import HoQuangHuyImg from "@/assets/profile/HoQuangHuyProfile.webp";
import ThuTranImg from "@/assets/profile/ThuTranProfile.webp";
import HaoVuImg from "@/assets/profile/HaoProfile.webp";

interface TeamProps {
  lang: "vi" | "en";
}

const themeColors: Record<string, { bg: string; text: string; tagBg: string; borderHex: string }> = {
  "Duong Phu Dong": {
    bg: "bg-gradient-to-b from-[#FF6A00] via-[#E05A00] to-[#B34700]",
    text: "text-black",
    tagBg: "bg-black/25 text-black border-black/30",
    borderHex: "#FF6A00"
  },
  "Thu Tran": {
    bg: "bg-gradient-to-b from-[#A855F7] via-[#9333EA] to-[#6B21A8]",
    text: "text-white",
    tagBg: "bg-black/30 text-white border-white/20",
    borderHex: "#A855F7"
  },
  "Huynh Quang Dong": {
    bg: "bg-gradient-to-b from-[#06B6D4] via-[#0284C7] to-[#0369A1]",
    text: "text-black",
    tagBg: "bg-black/25 text-black border-black/30",
    borderHex: "#06B6D4"
  },
  "Ho Quang Huy": {
    bg: "bg-gradient-to-b from-[#10B981] via-[#059669] to-[#047857]",
    text: "text-black",
    tagBg: "bg-black/25 text-black border-black/30",
    borderHex: "#10B981"
  },
  "Hao Vu": {
    bg: "bg-gradient-to-b from-[#F43F5E] via-[#E11D48] to-[#9F1239]",
    text: "text-white",
    tagBg: "bg-black/30 text-white border-white/20",
    borderHex: "#F43F5E"
  }
};

export default function Team({ lang }: TeamProps) {
  const t = TRANSLATIONS[lang];
  const teamList = TEAM_DATA[lang];
  const [viewMode, setViewMode] = useState<"showcase" | "grid">("showcase");
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const profileImages: Record<string, string> = {
    "Duong Phu Dong": DuongPhuDongImg,
    "Thu Tran": ThuTranImg,
    "Huynh Quang Dong": HuynhQuangDongImg,
    "Ho Quang Huy": HoQuangHuyImg,
    "Hao Vu": HaoVuImg,
  };

  const handleScrollToContact = () => {
    const element = document.getElementById("app-contact-section");
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section id="team" className="py-24 md:py-32 bg-[#090909] border-t border-white/5 relative overflow-hidden">
      {/* Background Swiss Grid Pattern */}
      <div className="absolute inset-0 swiss-grid opacity-5 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-brand-orange/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Label & View Switcher Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-brand-orange">
                {t.teamLabel}
              </span>
              <span className="h-[1px] w-12 bg-white/10" />
            </div>
            <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight text-[#F5F5F3] uppercase">
              {lang === "vi" ? "ĐỘI NGŨ 5 LẬP TRÌNH VIÊN THỰC HIỆN" : "THE MAGIC 5 DEVS IN STUDIO"}
            </h2>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="flex items-center bg-[#141414] border border-white/10 rounded-sm p-1">
            <button
              onClick={() => setViewMode("showcase")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-sm font-mono text-xs transition-all interactive ${
                viewMode === "showcase"
                  ? "bg-brand-orange text-black font-semibold shadow-sm"
                  : "text-[#8E8E93] hover:text-white"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === "vi" ? "SHOWCASE ARCH" : "SHOWCASE ARCH"}</span>
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

        {/* MODE 1: ARCH TEAM SHOWCASE */}
        {viewMode === "showcase" && (
          <div className="w-full flex flex-col items-center text-center my-4">
            
            {/* Header Description & CTA Button */}
            <div className="max-w-3xl mb-14 space-y-4">
              <p className="font-sans text-sm md:text-base text-[#8E8E93] font-light leading-relaxed max-w-2xl mx-auto">
                {lang === "vi"
                  ? "Đội ngũ 5 thành viên lập trình viên & thiết kế chuyên nghiệp tại TP.HCM. Không mất thời gian tìm kiếm hay phỏng vấn rủi ro, chúng tôi trực tiếp thực hiện và đảm bảo tiến độ bàn giao cho bạn."
                  : "Why waste time searching, interviewing and discovering a bad fit? We handle end-to-end spec, UI/UX, backend, QA & deployment. No back and forth. Get matched with our 5-member team today."}
              </p>
              
              <div className="pt-2">
                <button
                  onClick={handleScrollToContact}
                  className="btn-stacked font-mono text-xs uppercase tracking-widest px-8 py-4 bg-[#F5F5F3] text-[#090909] font-bold rounded-sm inline-flex items-center gap-2 group interactive"
                >
                  <span>{lang === "vi" ? "NHẬN TƯ VẤN ĐỘI NGŨ" : "FIND YOUR DEVELOPER"}</span>
                  <ArrowUpRight className="w-4 h-4 text-brand-orange group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Overlapping Arch-Top Member Cards Showcase */}
            <motion.div
              className="w-full flex flex-wrap md:flex-nowrap justify-center items-end -space-x-3 md:space-x-3 lg:space-x-5 px-2 py-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <AnimatePresence>
                {teamList.map((member, index) => {
                  const theme = themeColors[member.name] || themeColors["Duong Phu Dong"];
                  const img = profileImages[member.name];

                  return (
                    <motion.div
                      key={member.name}
                      className="w-[145px] sm:w-[170px] md:w-[210px] lg:w-[230px] shrink-0 my-2 md:my-0 cursor-pointer group"
                      variants={cardVariants}
                      whileHover={{ y: -16, scale: 1.06, zIndex: 40 }}
                      style={{ zIndex: teamList.length - index }}
                      onClick={() => setSelectedMember(member)}
                    >
                      <div
                        className={`relative pt-6 pb-2 px-3 rounded-t-[50%] h-[310px] sm:h-[350px] md:h-[400px] flex flex-col items-center justify-between text-center overflow-hidden border border-white/20 shadow-2xl transition-shadow ${theme.bg}`}
                      >
                        {/* Member Photo Standing inside Arch Card */}
                        <img
                          src={img}
                          alt={member.name}
                          className="absolute inset-0 w-full h-full object-cover object-top drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Top Subtle Signature Color Circle Indicator */}
                        <div className="absolute top-3.5 z-20 flex justify-center w-full pointer-events-none">
                          <span
                            className="w-3 h-3 rounded-full shadow-lg border border-white/40 block"
                            style={{ backgroundColor: member.colorTag.hex }}
                          />
                        </div>

                        {/* Bottom Highlight View Detail Indicator */}
                        <div className="absolute bottom-3 inset-x-0 flex justify-center z-20 pointer-events-none">
                          <span className="font-mono text-[9px] bg-black/80 text-white backdrop-blur-md px-3.5 py-1 rounded-full uppercase tracking-widest border border-white/25 shadow-xl group-hover:bg-brand-orange group-hover:text-black transition-all font-bold">
                            {lang === "vi" ? "CHI TIẾT" : "VIEW DETAIL"}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>
        )}

        {/* MODE 2: DETAILED MEMBER CARDS GRID */}
        {viewMode === "grid" && (
          <div className="mt-4">
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
                        MEMBER 0{idx + 1}
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

        {/* Member Profile Drawer Modal when an arch card is clicked */}
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
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="bg-[#121212] border border-white/20 rounded-sm p-6 md:p-8 max-w-lg w-full relative overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Accent Top Bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1.5"
                  style={{ backgroundColor: selectedMember.colorTag.hex }}
                />

                <button
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-4 right-4 text-[#8E8E93] hover:text-white transition-colors p-1"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2" style={{ borderColor: selectedMember.colorTag.hex }}>
                    <img
                      src={profileImages[selectedMember.name]}
                      alt={selectedMember.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className={`font-mono text-[9px] uppercase px-2 py-0.5 rounded-sm border inline-block mb-1 font-bold ${selectedMember.colorTag.badgeClass}`}>
                      {selectedMember.colorTag.name}
                    </span>
                    <h3 className="font-display font-bold text-xl text-white">
                      {selectedMember.name}
                    </h3>
                    <p className="font-mono text-xs text-brand-orange uppercase">
                      {selectedMember.role}
                    </p>
                  </div>
                </div>

                <p className="font-sans text-sm text-[#8E8E93] leading-relaxed mb-6">
                  {selectedMember.bio}
                </p>

                <div className="mb-6">
                  <span className="font-mono text-[10px] text-[#8E8E93] uppercase block mb-2">
                    // SPECIALTIES & RESPONSIBILITIES
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedMember.specialties.map((s) => (
                      <span key={s} className="font-mono text-xs text-white bg-white/5 border border-white/10 px-2.5 py-1 rounded-sm">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedMember.socials.github && (
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="font-mono text-xs text-[#8E8E93]">
                      ROLE: {selectedMember.diagramRole}
                    </span>
                    <a
                      href={selectedMember.socials.github}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-stacked font-mono text-xs bg-[#FF6A00] text-black px-4 py-2 rounded-sm font-bold flex items-center gap-2"
                    >
                      <Github className="w-4 h-4" />
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
