import React, { useState } from "react";
import { TEAM_DATA, TRANSLATIONS } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { 
  FaGithub, 
  FaArrowUpRightFromSquare, 
  FaXmark,
  FaUserGroup,
  FaCheckDouble
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

export default function Team({ lang }: TeamProps) {
  const t = TRANSLATIONS[lang];
  const teamList = TEAM_DATA[lang];
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const profileImages: Record<string, string> = {
    "Duong Phu Dong": DuongPhuDongImg,
    "Thu Tran": ThuTranImg,
    "Huynh Quang Dong": HuynhQuangDongImg,
    "Ho Quang Huy": HoQuangHuyImg,
    "Hao Vu": HaoVuImg,
  };

  const handleScrollToContact = () => {
    const element = document.getElementById("app-contact-section") || document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section id="team" className="py-24 md:py-32 bg-[#090909] border-t border-white/5 relative overflow-hidden">
      {/* Background Tech Grid */}
      <div className="absolute inset-0 swiss-grid opacity-5 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-brand-orange/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-brand-orange font-semibold flex items-center gap-2">
                <FaUserGroup className="w-3.5 h-3.5" />
                {lang === "vi" ? "05 // ĐỘI NGŨ THỰC HIỆN" : "05 // STUDIO TEAM"}
              </span>
              <span className="h-[1px] w-12 bg-brand-orange/40" />
            </div>
            <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight text-[#F5F5F3] uppercase leading-tight">
              {lang === "vi" ? "Đội Ngũ 5 Kỹ Sư & Thiết Kế Studio" : "The 5 In-House Engineers & Designers"}
            </h2>
          </div>

          <p className="font-sans text-xs md:text-sm text-[#8E8E93] max-w-md font-light leading-relaxed">
            {lang === "vi"
              ? "Đội ngũ 5 kỹ sư & thiết kế chuyên nghiệp làm việc trực tiếp tại TP.HCM. Không qua trung gian, không rủi ro tuyển dụng — cam kết 100% chất lượng mã nguồn & tiến độ bàn giao."
              : "5 dedicated in-house engineers & UI/UX designers in Ho Chi Minh City. Direct technical partnership with 100% source code handover."}
          </p>
        </div>

        {/* Studio Technical Guarantee Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-10 pb-6 border-b border-white/10">
          <div className="flex items-center gap-2 bg-[#111113] border border-white/10 px-3.5 py-1.5 rounded-full font-mono text-[11px] text-[#F5F5F3]">
            <FaCheckDouble className="w-3 h-3 text-brand-orange" />
            <span>100% IN-HOUSE ENGINEERS</span>
          </div>
          <div className="flex items-center gap-2 bg-[#111113] border border-white/10 px-3.5 py-1.5 rounded-full font-mono text-[11px] text-[#F5F5F3]">
            <FaCheckDouble className="w-3 h-3 text-emerald-400" />
            <span>DIRECT TECHNICAL PARTNERSHIP</span>
          </div>
          <div className="flex items-center gap-2 bg-[#111113] border border-white/10 px-3.5 py-1.5 rounded-full font-mono text-[11px] text-[#F5F5F3]">
            <FaCheckDouble className="w-3 h-3 text-cyan-400" />
            <span>ZERO OUTSOURCING RISK</span>
          </div>
        </div>

        {/* 5-Column Professional Team Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {teamList.map((member, idx) => {
            const memberImg = profileImages[member.name];
            const colorHex = member.colorTag?.hex || "#FF6A00";

            return (
              <motion.div
                key={member.name}
                variants={cardVariants}
                onClick={() => setSelectedMember(member)}
                className="team-card-item group relative bg-[#111113]/90 border border-white/10 hover:border-brand-orange/50 p-4 rounded-xl transition-all duration-500 cursor-pointer flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-[0_0_25px_rgba(255,106,0,0.15)] hover:-translate-y-1.5 interactive"
              >
                {/* Top Member Index & Studio Label */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span 
                    className="font-mono text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-sm border"
                    style={{ 
                      color: colorHex, 
                      backgroundColor: `${colorHex}15`, 
                      borderColor: `${colorHex}40` 
                    }}
                  >
                    0{idx + 1}
                  </span>
                  <span className="font-mono text-[9px] text-[#8E8E93] tracking-wider uppercase">
                    THREE BUGS
                  </span>
                </div>

                {/* Member Portrait Box - Full Color, Perfectly Cropped Edge-to-Edge */}
                <div className="relative aspect-[3/4] w-full border border-white/10 rounded-lg overflow-hidden mb-4 group-hover:border-brand-orange/40 transition-all duration-500">
                  <img
                    src={memberImg}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-500"
                  />
                </div>

                {/* Name & Role */}
                <div className="space-y-1 mb-3">
                  <h3 className="font-display font-bold text-base md:text-lg text-[#F5F5F3] group-hover:text-brand-orange transition-colors leading-snug">
                    {member.name}
                  </h3>
                  <p className="font-sans text-xs text-brand-orange font-medium">
                    {member.role}
                  </p>
                  <span className="font-mono text-[9px] text-[#8E8E93] uppercase tracking-wider block mt-1 line-clamp-1">
                    {member.diagramRole}
                  </span>
                </div>

                {/* Specialty Tags */}
                <div className="flex flex-wrap gap-1 pt-2 border-t border-white/5">
                  {(member.specialties || []).slice(0, 2).map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-[9px] bg-white/5 border border-white/10 px-2 py-0.5 rounded-sm text-[#8E8E93] group-hover:text-[#F5F5F3] transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

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
