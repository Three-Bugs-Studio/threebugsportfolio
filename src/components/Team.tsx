import React, { useState, useEffect } from "react";
import { TEAM_DATA, TRANSLATIONS } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { 
  UsersIcon, 
  CheckDoubleIcon, 
  ArrowUpRightIcon, 
  CloseIcon 
} from "./ui/MajesticIcon";
import { SiGithub } from "react-icons/si";
import { TeamMember } from "../types";
import TeamAvatar, { AvatarLook } from "./TeamAvatar";
import Logo from "./Logo";
import AnimIcon from "./ui/AnimIcon";

interface TeamProps {
  lang: "vi" | "en";
}

// One labelled line on the ID card.
function IdField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <dt className="font-mono text-xs uppercase tracking-[0.25em] text-ink-muted">{label}</dt>
      <dd className="text-sm text-ink leading-snug line-clamp-2 mt-0.5">{children}</dd>
    </div>
  );
}

// Decorative barcode derived from the name, so each card's code is stable across renders.
function Barcode({ seed, className }: { seed: string; className?: string }) {
  let x = 0;
  const bars = [...seed].map((ch, i) => {
    const c = ch.charCodeAt(0);
    const w = 1 + (c % 3);
    const bar = <rect key={i} x={x} width={w} height={24} />;
    x += w + 1 + ((c >> 2) % 2);
    return bar;
  });
  return (
    <svg viewBox={`0 0 ${x} 24`} preserveAspectRatio="none" aria-hidden="true" fill="currentColor" className={className}>
      {bars}
    </svg>
  );
}

export default function Team({ lang }: TeamProps) {
  const t = TRANSLATIONS[lang];
  const teamList = TEAM_DATA[lang];
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // One line-art portrait per member (TeamAvatar), in the member's colour. Thu Tran is the only woman on the team.
  const CHAR: Record<string, { look: AvatarLook; codename: string; klass: { vi: string; en: string }; meaning: { vi: string; en: string } }> = {
    "Duong Phu Dong": {
      look: { hair: "cap", beard: "stubble", skin: "#F0C3A2", hairColor: "#3b2a24" },
      codename: "VANGUARD", klass: { vi: "Người dẫn đường", en: "Pathfinder" },
      meaning: { vi: "Tầm nhìn & dẫn đường: chốt hướng đi của sản phẩm và kiến trúc cho cả đội.", en: "Vision & direction: setting the course for the product and its architecture." },
    },
    "Thu Tran": {
      look: { hair: "long", beard: "none", skin: "#F6D2BC", hairColor: "#3a2420" },
      codename: "PRISM", klass: { vi: "Nhà thiết kế ánh sáng", en: "Light designer" },
      meaning: { vi: "Màu sắc, bố cục & cân bằng: thiết kế đẹp và sổ sách minh bạch đều cần sự hài hòa.", en: "Colour, composition & balance: good design and clean books both need harmony." },
    },
    "Huynh Quang Dong": {
      look: { hair: "bald", beard: "full", skin: "#E8B48E", hairColor: "#5a3a2a" },
      codename: "SENTINEL", klass: { vi: "Người gác chất lượng", en: "Quality sentinel" },
      meaning: { vi: "Chuẩn mực & kiểm định: mọi tính năng đều qua kiểm thử trước khi tới tay khách.", en: "Standards & testing: every feature is checked before it reaches the client." },
    },
    "Ho Quang Huy": {
      look: { hair: "spiky", beard: "none", glasses: true, skin: "#EBB896", hairColor: "#1f1715" },
      codename: "RUNNER", klass: { vi: "Người vận hành hạ tầng", en: "Infrastructure runner" },
      meaning: { vi: "Tốc độ & hạ tầng: giữ cho máy chủ và pipeline triển khai chạy không ngừng.", en: "Speed & infrastructure: keeping servers and the deploy pipeline running." },
    },
    "Hao Vu": {
      look: { hair: "beanie", beard: "mustache", skin: "#D9A07A", hairColor: "#2a1d1a" },
      codename: "BEDROCK", klass: { vi: "Kiến trúc sư dữ liệu", en: "Data architect" },
      meaning: { vi: "Kiến trúc sâu & nền móng: những tầng cấu trúc vững chắc bên dưới mọi hệ thống.", en: "Deep architecture & foundations: the solid layers beneath every system." },
    },
    "Hoang Do": {
      look: { hair: "side", beard: "short", skin: "#F2C4A8", hairColor: "#2d201c" },
      codename: "LINK", klass: { vi: "Cầu nối khách hàng", en: "Client link" },
      meaning: { vi: "Cây cầu kết nối: đưa khách hàng đến với studio một cách nhẹ nhàng, rõ ràng.", en: "A connecting bridge: bringing clients and the studio together, calmly and clearly." },
    },
    "Minh Duc": {
      look: { hair: "curly", beard: "stubble", skin: "#C98E66", hairColor: "#1d1513" },
      codename: "BEACON", klass: { vi: "Ngọn đèn dẫn lối", en: "Beacon" },
      meaning: { vi: "Ánh đèn chào đón: lắng nghe khách hàng và soi rõ con đường triển khai.", en: "A welcoming light: listening to clients and lighting up the road ahead." },
    },
  };

  // Bento rows by function; anyone not listed falls into a final row so nobody disappears.
  const GROUPS: { key: string; vi: string; en: string; names: string[]; wide: boolean }[] = [
    { key: "lead", vi: "BAN ĐIỀU HÀNH", en: "LEADERSHIP", names: ["Duong Phu Dong", "Thu Tran"], wide: true },
    { key: "eng", vi: "KỸ SƯ", en: "ENGINEERING", names: ["Huynh Quang Dong", "Ho Quang Huy", "Hao Vu"], wide: false },
    { key: "client", vi: "CLIENT RELATIONS", en: "CLIENT RELATIONS", names: ["Hoang Do", "Minh Duc"], wide: true },
  ];
  const groupedNames = new Set(GROUPS.flatMap((g) => g.names));
  const leftovers = teamList.filter((m) => !groupedNames.has(m.name)).map((m) => m.name);
  const rows = leftovers.length
    ? [...GROUPS, { key: "more", vi: "THÀNH VIÊN", en: "MEMBERS", names: leftovers, wide: false }]
    : GROUPS;

  // Keyboard Escape listener & body scroll lock for member modal
  useEffect(() => {
    if (!selectedMember) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedMember(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedMember]);

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
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section id="team" className="py-16 md:py-20 bg-canvas border-t border-line relative overflow-hidden">
      {/* Background Tech Grid */}
      <div className="absolute inset-0 swiss-grid opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-brand-ink font-semibold flex items-center gap-2">
                <UsersIcon size={14} className="w-3.5 h-3.5" />
                {t.teamLabel}
              </span>
              <span className="h-[1px] w-12 bg-brand-orange/40" />
            </div>
            <h2 className="font-display font-semibold text-3xl md:text-5xl tracking-tight text-ink leading-tight">
              {lang === "vi" ? "Đội Ngũ Three Bugs Studio" : "The Three Bugs Studio Team"}
            </h2>
          </div>

          <p className="font-sans text-xs md:text-sm text-ink-muted max-w-md font-light leading-relaxed">
            {lang === "vi"
              ? "5 kỹ sư & thiết kế tại TP.HCM với kinh nghiệm thực chiến dự án doanh nghiệp (RMIT Showcase), cùng 2 chuyên viên Client Relations đồng hành với khách hàng từ tư vấn đến bảo trì."
              : "5 in-house engineers & designers in Ho Chi Minh City with enterprise showcase experience (RMIT Vietnam), plus 2 Client Relations leads who guide you from first call to aftercare."}
          </p>
        </div>

        {/* Studio Technical Guarantee Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-10 pb-6 border-b border-line">
          <div className="flex items-center gap-2 bg-surface border border-line px-3.5 py-1.5 rounded-sm font-mono text-xs text-ink">
            <CheckDoubleIcon size={12} className="w-3 h-3 text-brand-ink" />
            <span>100% IN-HOUSE ENGINEERS</span>
          </div>
          <div className="flex items-center gap-2 bg-surface border border-line px-3.5 py-1.5 rounded-sm font-mono text-xs text-ink">
            <CheckDoubleIcon size={12} className="w-3 h-3 text-brand-ink" />
            <span>RMIT ENTERPRISE SHOWCASE CREDENTIALS</span>
          </div>
          <div className="flex items-center gap-2 bg-surface border border-line px-3.5 py-1.5 rounded-sm font-mono text-xs text-ink">
            <CheckDoubleIcon size={12} className="w-3 h-3 text-brand-ink" />
            <span>STUDIO FINANCIAL TRANSPARENCY</span>
          </div>
        </div>

        {/* Team rows grouped by function (bento); hovering one card dims the rest (see .team-focus in index.css) */}
        <div className="team-focus space-y-12">
        {rows.map((group, groupIdx) => (
        <div key={group.key}>
          <div className="flex items-center gap-3 mb-5 font-mono text-xs uppercase tracking-[0.3em]">
            <span className="text-brand-ink font-semibold">0{groupIdx + 1}</span>
            <span className="text-ink">{lang === "vi" ? group.vi : group.en}</span>
            <span className="h-[1px] flex-1 bg-line" />
          </div>
        <motion.div
          className={`grid grid-cols-1 gap-6 ${group.wide ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {teamList.filter((m) => group.names.includes(m.name)).map((member) => {
            const idx = teamList.indexOf(member);
            const art = CHAR[member.name];
            const colorHex = member.colorTag?.hex || "#FF6A00";

            return (
              <motion.div
                key={member.name}
                tabIndex={0}
                role="button"
                aria-label={`${member.name} - ${member.role} (${lang === "vi" ? "Nhấn để xem chi tiết" : "Click to view profile"})`}
                variants={cardVariants}
                onClick={() => setSelectedMember(member)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedMember(member);
                  }
                }}
                style={{ "--tag": colorHex } as React.CSSProperties}
                className="team-card-item id-card group relative bg-surface border border-line cursor-pointer flex flex-col overflow-hidden interactive outline-none transition-colors duration-300"
              >
                {/* Member colour stripe, widens on hover */}
                <span aria-hidden="true" className="absolute left-0 top-0 bottom-0 w-[3px] group-hover:w-1.5 transition-[width] duration-300" style={{ backgroundColor: colorHex }} />

                {/* Issuer strip */}
                <div className="flex items-center justify-between gap-3 pl-5 pr-4 py-2.5 border-b border-line">
                  <span className="flex items-center gap-2.5 min-w-0">
                    <Logo className="h-4" antennae={false} />
                    <span className="font-mono text-xs uppercase tracking-[0.25em] text-ink-muted truncate">
                      {lang === "vi" ? "Thẻ nhân sự" : "Personnel ID"}
                    </span>
                  </span>
                  <span className="font-mono text-xs font-semibold tracking-widest text-ink shrink-0">3B-0{idx + 1}</span>
                </div>

                {/* Photo + record fields */}
                <div className="flex gap-4 pl-5 pr-4 py-4 flex-1">
                  {art && (
                    <div className="shrink-0 w-24 sm:w-28 self-start border border-line bg-canvas p-1">
                      <TeamAvatar
                        square
                        look={art.look}
                        color={colorHex}
                        title={`${lang === "vi" ? "Chân dung minh họa" : "Illustrated portrait of"} ${member.name}`}
                        className="block w-full h-auto"
                      />
                    </div>
                  )}
                  <dl className="min-w-0 flex-1 grid content-start gap-2.5">
                    {art && (
                      <IdField label="Codename">
                        <span className="font-mono font-bold tracking-[0.2em]" style={{ color: colorHex }}>{art.codename}</span>
                      </IdField>
                    )}
                    <IdField label={lang === "vi" ? "Họ tên" : "Name"}>
                      <span className="font-display font-semibold text-base md:text-lg">{member.name}</span>
                    </IdField>
                    <IdField label={lang === "vi" ? "Vai trò" : "Role"}>{member.role}</IdField>
                    <IdField label={lang === "vi" ? "Bộ phận" : "Division"}>{lang === "vi" ? group.vi : group.en}</IdField>
                  </dl>
                </div>

                {/* Barcode strip */}
                <div className="flex items-center gap-3 pl-5 pr-4 py-2.5 border-t border-line">
                  <Barcode seed={member.name} className="h-6 w-24 shrink-0 text-ink" />
                  <span className="font-mono text-xs text-ink-muted truncate">{(member.specialties || []).slice(0, 2).join(" · ")}</span>
                  {(member.showcaseUrl || member.name === "Thu Tran") && (
                    <span className="ml-auto font-mono text-xs uppercase tracking-wider text-brand-ink shrink-0">
                      {member.showcaseUrl ? "RMIT" : lang === "vi" ? "Tài chính" : "Finance"}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        </div>
        ))}
        </div>

        {/* Team CTA Box */}
        <div className="mt-16 bg-surface/90 border border-line p-6 md:p-8  flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="flex items-center gap-4 relative z-10">
            <div className="receptionist-anim-icon-container w-14 h-14  bg-canvas border border-line p-1.5 shrink-0 flex items-center justify-center">
              <AnimIcon name="contact" title={lang === "vi" ? "Liên hệ đội ngũ" : "Contact the team"} className="w-full h-full" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg md:text-xl text-ink leading-snug">
                {lang === "vi" ? "Sẵn Sàng Đồng Hành Cùng Dự Án Của Bạn" : "Ready to Onboard Your Next Project"}
              </h3>
              <p className="font-sans text-xs text-ink-muted font-light mt-1">
                {lang === "vi" ? "Trao đổi kỹ thuật 1-1 trực tiếp với lập trình viên phụ trách." : "Direct 1-on-1 technical consultation with lead engineers."}
              </p>
            </div>
          </div>

          <button
            onClick={handleScrollToContact}
            className="btn-stacked font-mono text-xs uppercase tracking-widest px-6 py-3.5 bg-brand-orange text-[#090909] font-bold rounded-sm inline-flex items-center gap-2 group shrink-0 interactive hover:bg-white hover:text-black transition-colors"
          >
            <span>{lang === "vi" ? "NHẬN TƯ VẤN TRỰC TIẾP" : "DIRECT CONSULTATION"}</span>
            <ArrowUpRightIcon size={14} className="w-3.5 h-3.5" />
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
                className="bg-surface border border-line  p-6 md:p-8 max-w-lg w-full relative overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Top Accent Orange Border Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-brand-orange" />

                <button
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-4 right-4 text-ink-muted hover:text-ink transition-colors p-1.5 focus-terminal rounded-sm outline-none"
                  aria-label="Close detail modal"
                >
                  <CloseIcon size={20} className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-4 mb-6">
                  {CHAR[selectedMember.name] && (
                    <TeamAvatar
                      look={CHAR[selectedMember.name].look}
                      color={selectedMember.colorTag?.hex || "#FF6A00"}
                      title={`${lang === "vi" ? "Chân dung minh họa" : "Illustrated portrait of"} ${selectedMember.name}`}
                      className="w-16 h-16 shrink-0"
                    />
                  )}
                  <div>
                    <h3 className="font-display font-bold text-xl text-ink">
                      {selectedMember.name}
                    </h3>
                    <p className="font-sans text-xs text-brand-ink font-medium mt-0.5">
                      {selectedMember.role}
                    </p>
                    <span className="font-mono text-xs text-ink-muted uppercase tracking-wider block mt-1">
                      {selectedMember.diagramRole}
                    </span>
                  </div>
                </div>

                {CHAR[selectedMember.name] && (
                  <blockquote className="mb-5 pl-3 border-l-2 border-brand-orange/60">
                    <p className="font-sans text-xs md:text-sm text-ink italic leading-relaxed">
                      {CHAR[selectedMember.name].meaning[lang]}
                    </p>
                    <cite className="block not-italic font-mono text-xs uppercase tracking-wider text-ink-muted mt-1.5">
                      {CHAR[selectedMember.name].codename} · {CHAR[selectedMember.name].klass[lang]}
                    </cite>
                  </blockquote>
                )}

                <p className="font-sans text-xs md:text-sm text-ink-muted leading-relaxed mb-6 font-light">
                  {selectedMember.bio}
                </p>

                {/* Enterprise Showcase Credentials Box */}
                {selectedMember.showcaseUrl && (
                  <div className="mb-6 p-3.5  bg-cyan-950/20 border border-cyan-500/30">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-sm bg-cyan-400" />
                        {selectedMember.showcaseLabel || "RMIT Vietnam Enterprise Showcase"}
                      </span>
                      <a
                        href={selectedMember.showcaseUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-xs text-cyan-300 hover:text-ink bg-cyan-500/20 hover:bg-cyan-500/40 px-2 py-0.5 rounded border border-cyan-500/40 transition-colors"
                      >
                        <span>{lang === "vi" ? "Xem Dự Án" : "View Showcase"}</span>
                        <ArrowUpRightIcon size={10} className="w-2.5 h-2.5" />
                      </a>
                    </div>
                    <p className="font-sans text-xs text-ink-muted leading-relaxed">
                      {lang === "vi"
                        ? "Dự án Luvcraft (Nights Watch): Nền tảng AI & Fandom Intelligence quy mô doanh nghiệp thực tế phối hợp cùng Project Pluto và RMIT Vietnam (FastAPI, RabbitMQ, Celery, PostgreSQL, Next.js)."
                        : "Project Luvcraft (Nights Watch): Enterprise-grade AI & Fandom Intelligence platform built with Project Pluto & RMIT Vietnam (FastAPI, RabbitMQ, Celery, PostgreSQL, Next.js)."}
                    </p>
                  </div>
                )}

                {/* Studio Financial Operations Box for Thu Tran */}
                {selectedMember.name === "Thu Tran" && (
                  <div className="mb-6 p-3.5  bg-purple-950/20 border border-purple-500/30">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-mono text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-sm bg-purple-400" />
                        {lang === "vi" ? "Quản Lý Tài Chính & Sổ Sách Studio" : "Studio Financial Operations"}
                      </span>
                      <span className="font-mono text-xs text-purple-300/80 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                        {lang === "vi" ? "Minh Bạch 100%" : "100% Transparent"}
                      </span>
                    </div>
                    <p className="font-sans text-xs text-ink-muted leading-relaxed">
                      {lang === "vi"
                        ? "Phụ trách kiểm soát ngân sách hợp đồng, tiến độ giải ngân theo từng cột mốc (milestones), báo cáo sổ sách thu chi rõ ràng nhằm đảm bảo an toàn tài chính tuyệt đối cho khách hàng."
                        : "Oversees studio contract budgets, milestone-based disbursements, and transparent financial bookkeeping to ensure zero financial ambiguity for clients."}
                    </p>
                  </div>
                )}

                {/* Technical Stack / Specialties Tags */}
                <div className="mb-6">
                  <span className="font-mono text-xs uppercase tracking-widest text-brand-ink block mb-2 font-bold">
                    SPECIALIZED SKILLS & STACK
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(selectedMember.specialties || []).map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-xs bg-surface border border-line px-2.5 py-1 rounded-sm text-ink"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Modal Footer Link */}
                <div className="pt-4 border-t border-line flex justify-between items-center gap-2">
                  <span className="font-mono text-xs text-ink-muted">
                    THREE BUGS STUDIO
                  </span>
                  <div className="flex items-center gap-2">
                    {selectedMember.showcaseUrl && (
                      <a
                        href={selectedMember.showcaseUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono text-xs text-cyan-400 hover:text-ink border border-cyan-500/40 hover:bg-cyan-500/20 px-3 py-2 rounded-sm font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <ArrowUpRightIcon size={12} className="w-3.5 h-3.5" />
                        <span>RMIT SHOWCASE</span>
                      </a>
                    )}
                    {selectedMember.socials.github && (
                      <a
                        href={selectedMember.socials.github}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-stacked font-mono text-xs bg-brand-orange text-[#090909] hover:bg-white hover:text-black px-4 py-2 rounded-sm font-bold flex items-center gap-2 transition-colors"
                      >
                        <SiGithub className="w-4 h-4" />
                        <span>GITHUB</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
