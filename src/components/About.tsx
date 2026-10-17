import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  LaptopIcon, 
  RocketIcon, 
  EditPenIcon, 
  SettingsIcon, 
  DatabaseIcon, 
  CodeIcon,
  GlobeIcon 
} from "./ui/MajesticIcon";
import { TRANSLATIONS } from "../data";
import { CategoryList, Category } from "./CategoryList";

interface AboutProps {
  lang: "vi" | "en";
}

export default function About({ lang }: AboutProps) {
  const t = TRANSLATIONS[lang];
  const [isExpanded, setIsExpanded] = useState(false);

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const categories: Category[] = lang === "vi" ? [
    {
      id: "performance",
      title: "Tốc Độ Tải & Tối Ưu Mã Nguồn",
      subtitle: "Kiến trúc mã nguồn tinh gọn, đạt tốc độ phản hồi dưới 1 giây và chỉ số Lighthouse tối ưu trên mọi thiết bị.",
      icon: <RocketIcon size={20} />,
      featured: true,
    },
    {
      id: "design",
      title: "Thiết Kế Giao Diện Chuẩn Thương Hiệu",
      subtitle: "Tạo dựng phong cách hiển thị hiện đại, nhất quán với bộ nhận diện và trải nghiệm người dùng của từng doanh nghiệp.",
      icon: <EditPenIcon size={20} />,
    },
    {
      id: "direct-engineer",
      title: "Làm Việc Trực Tiếp Với Kỹ Sư Lập Trình",
      subtitle: "Khách hàng trao đổi trực tiếp với lập trình viên phụ trách dự án, giúp truyền tải yêu cầu chính xác và đúng tiến độ.",
      icon: <SettingsIcon size={20} />,
    },
    {
      id: "database",
      title: "Cơ Sở Dữ Liệu & Hạ Tầng Bảo Mật",
      subtitle: "Xây dựng hệ thống CSDL chuẩn hóa PostgreSQL / Supabase, phân quyền an toàn và sẵn sàng vận hành trên Cloud.",
      icon: <DatabaseIcon size={20} />,
    },
    {
      id: "delivery",
      title: "Bàn Giao Source Code & Bảo Hành Kỹ Thuật",
      subtitle: "Bàn giao 100% quyền sở hữu mã nguồn sạch, tài liệu kiến trúc hệ thống và chính sách hỗ trợ kỹ thuật lâu dài.",
      icon: <CodeIcon size={20} />,
    },
    {
      id: "global-cloud",
      title: "Hợp Tác Quốc Tế & Hạ Tầng Đa Quốc Gia",
      subtitle: "Vận hành 100% Remote-First, giao tiếp Tiếng Anh chuyên nghiệp, triển khai Cloud VPS toàn cầu (Hetzner, DigitalOcean) và thanh toán USD linh hoạt.",
      icon: <GlobeIcon size={20} />,
    },
  ] : [
    {
      id: "performance",
      title: "Code Architecture & High Speed",
      subtitle: "Clean, optimized codebase tailored for under-1-second load times and top performance metrics on all devices.",
      icon: <RocketIcon size={20} />,
      featured: true,
    },
    {
      id: "design",
      title: "Custom UI & Brand Identity",
      subtitle: "Crafting modern, consistent design systems tailored precisely to your company brand guidelines.",
      icon: <EditPenIcon size={20} />,
    },
    {
      id: "direct-engineer",
      title: "Direct Engineer Communication",
      subtitle: "Collaborate directly with the developers building your system for clear technical specifications and swift delivery.",
      icon: <SettingsIcon size={20} />,
    },
    {
      id: "database",
      title: "Secure Database & Cloud Stack",
      subtitle: "Structured PostgreSQL and Supabase configurations with strict role authorization and deployment readiness.",
      icon: <DatabaseIcon size={20} />,
    },
    {
      id: "delivery",
      title: "Full Code Ownership & Warranty",
      subtitle: "100% source code handover with complete architecture documentation and long-term technical warranty.",
      icon: <CodeIcon size={20} />,
    },
    {
      id: "global-cloud",
      title: "Global Delivery & Multi-Region Cloud",
      subtitle: "100% remote-first engineering with fluent English communication, global VPS hosting (Hetzner, DigitalOcean), and flexible international USD billing.",
      icon: <GlobeIcon size={20} />,
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-[#090909] border-t border-white/5 relative">
      {/* Subtle grid layout lines */}
      <div className="absolute inset-0 flex justify-between px-6 md:px-12 pointer-events-none opacity-5">
        <div className="w-[1px] h-full bg-white" />
        <div className="w-[1px] h-full bg-white hidden md:block" />
        <div className="w-[1px] h-full bg-white hidden lg:block" />
        <div className="w-[1px] h-full bg-white" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Label Header */}
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-brand-orange">
            {t.aboutLabel}
          </span>
          <span className="h-[1px] w-12 bg-white/10" />
        </motion.div>

        {/* Editorial Overview Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 mb-16">
          <div className="lg:col-span-8">
            <motion.h2
              variants={itemVariants}
              className="font-display font-medium text-3xl md:text-5xl lg:text-6xl tracking-tight text-[#F5F5F3] leading-[1.15]"
            >
              {t.aboutHeading}
            </motion.h2>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-end gap-4">
            <motion.p
              variants={itemVariants}
              className="font-sans text-sm md:text-base text-[#8E8E93] font-light leading-relaxed"
            >
              {t.aboutBody1}
            </motion.p>
            
            <div className="overflow-hidden w-full">
              <motion.div
                initial={false}
                animate={{
                  height: isExpanded ? "auto" : 0,
                  opacity: isExpanded ? 1 : 0,
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <p className="font-sans text-xs md:text-sm text-[#8E8E93]/70 font-light leading-relaxed border-l border-brand-orange/30 pl-4 py-1">
                  {t.aboutBody2}
                </p>
              </motion.div>
            </div>

            <motion.button
              variants={itemVariants}
              onClick={() => setIsExpanded(!isExpanded)}
              className="font-mono text-[9px] tracking-[0.2em] text-brand-orange uppercase hover:text-[#F5F5F3] transition-colors flex items-center gap-1 focus:outline-none cursor-pointer mt-1 self-start select-none interactive"
              id="about-toggle-button"
            >
              {isExpanded ? (lang === "vi" ? "[ THU GỌN - ]" : "[ READ LESS - ]") : (lang === "vi" ? "[ ĐỌC THÊM + ]" : "[ READ MORE + ]")}
            </motion.button>
          </div>
        </div>

        {/* Interactive CategoryList Component for Studio Portrait & Pillars */}
        <motion.div variants={itemVariants} className="pt-8 border-t border-white/5">
          <CategoryList
            title={lang === "vi" ? "ĐẶC ĐIỂM VẬN HÀNH STUDIO" : "STUDIO OPERATIONAL PRINCIPLES"}
            subtitle={lang === "vi" ? "Những tiêu chuẩn kỹ thuật cốt lõi được áp dụng nhất quán trong từng bản dựng." : "Core technical standards applied consistently across all product builds."}
            headerIcon={<LaptopIcon size={28} className="w-7 h-7" />}
            categories={categories}
            className="px-0 py-4"
          />
        </motion.div>
      </div>
    </section>
  );
}
