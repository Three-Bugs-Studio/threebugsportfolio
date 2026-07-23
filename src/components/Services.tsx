import React, { useState } from "react";
import { SERVICES_DATA, TRANSLATIONS } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { FaPenNib, FaGlobe, FaDatabase, FaMicrochip, FaTerminal, FaChevronRight, FaWrench } from "react-icons/fa6";

interface ServicesProps {
  lang: "vi" | "en";
}

export default function Services({ lang }: ServicesProps) {
  const t = TRANSLATIONS[lang];
  const servicesList = SERVICES_DATA[lang];
  const [activeId, setActiveId] = useState<string | null>(servicesList[0]?.id || null);

  // Icon mapping helper with FontAwesome icons
  const getIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case "PenTool":
        return <FaPenNib className={className} />;
      case "Globe":
        return <FaGlobe className={className} />;
      case "Database":
        return <FaDatabase className={className} />;
      case "Cpu":
        return <FaMicrochip className={className} />;
      case "Terminal":
        return <FaTerminal className={className} />;
      case "Wrench":
        return <FaWrench className={className} />;
      default:
        return <FaTerminal className={className} />;
    }
  };

  // Animating values variants with a high-end subtle entrance
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="services" className="py-24 md:py-32 bg-[#090909] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-brand-orange">
            {t.servicesLabel}
          </span>
          <span className="h-[1px] w-12 bg-white/10" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Descriptive Intro */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <motion.div variants={itemVariants}>
              <h2 className="font-display font-medium text-4xl md:text-5xl tracking-tight text-[#F5F5F3] leading-[1.1] mb-6">
                {t.servicesHeading}
              </h2>
              <p className="font-sans text-sm md:text-base text-[#8E8E93] font-light leading-relaxed max-w-sm">
                {lang === "vi" 
                  ? "Chúng tôi kết hợp sự chính xác về mặt kỹ thuật với thiết kế tương tác cao cấp để mang lại các sản phẩm có thể tự mở rộng linh hoạt theo tải trọng người dùng."
                  : "We combine technical precision with high-end interaction design to ship products that outlast short-lived tech trends."}
              </p>
            </motion.div>

            {/* Micro-interactive tech block details */}
            <motion.div variants={itemVariants} className="hidden lg:block border-l border-white/5 pl-6 py-4 mt-8">
              <span className="font-mono text-[9px] tracking-widest text-brand-orange uppercase block mb-2">
                {lang === "vi" ? "// TIÊU CHUẨN KIẾN TRÚC HỆ THỐNG" : "// SYSTEM STACK CRITERIA"}
              </span>
              <p className="font-mono text-[11px] text-[#8E8E93] leading-relaxed">
                {lang === "vi"
                  ? "Tất cả các sản phẩm triển khai đều sử dụng các cấu trúc container chuẩn hóa bền bỉ, cam kết tỉ lệ hoạt động 99.9% và tối ưu hóa SEO xuất sắc."
                  : "All production deployments are standard containerized structures, securing 99.9% uptime and SEO metrics above 95."}
              </p>
            </motion.div>
          </div>

          {/* Right Column: Dynamic Column List */}
          <div className="lg:col-span-8 flex flex-col gap-4" id="capabilities-list">
            {servicesList.map((service, idx) => {
              const isActive = activeId === service.id;

              return (
                <motion.div
                  key={service.id}
                  id={`service-item-${service.id}`}
                  tabIndex={0}
                  role="button"
                  aria-expanded={isActive}
                  aria-label={`${service.title} — ${lang === "vi" ? "Nhấp để hiển thị chi tiết dịch vụ" : "Click to view service details"}`}
                  variants={itemVariants}
                  className={`group border border-white/5 hover:border-white/10 p-6 md:p-8 transition-all duration-500 rounded-sm cursor-pointer relative overflow-hidden select-none focus-visible:ring-1 focus-visible:ring-brand-orange focus-visible:outline-none ${
                    isActive ? "bg-[#121212]/40 border-white/10" : "bg-transparent hover:bg-[#121212]/10"
                  }`}
                  onClick={() => setActiveId(isActive ? null : service.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveId(isActive ? null : service.id);
                    }
                  }}
                >
                  {/* Subtle orange accent slide for active element */}
                  <span
                    className={`absolute left-0 top-0 h-full w-[2px] bg-brand-orange transition-transform duration-500 ${
                      isActive ? "scale-y-100" : "scale-y-0 group-hover:scale-y-50"
                    }`}
                  />

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-5">
                      {/* Service Icon */}
                      <div className={`p-3 border rounded-sm transition-all duration-500 ${
                        isActive
                          ? "bg-brand-orange/10 border-brand-orange text-brand-orange"
                          : "bg-[#121212]/50 border-white/5 text-[#8E8E93] group-hover:text-[#F5F5F3]"
                      }`}>
                        {getIcon(service.iconName, "w-5 h-5")}
                      </div>

                      {/* Service Title & Brief */}
                      <div>
                        <h3 className={`font-display font-medium text-lg md:text-xl transition-colors duration-300 ${
                          isActive ? "text-[#F5F5F3]" : "text-[#8E8E93] group-hover:text-[#F5F5F3]"
                        }`}>
                          {service.title}
                        </h3>
                        <p className={`font-sans text-xs md:text-sm text-[#8E8E93] font-light mt-2 leading-relaxed transition-all duration-500 max-w-xl ${
                          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-24 overflow-hidden mt-0 group-hover:mt-2"
                        }`}>
                          {service.description}
                        </p>
                      </div>
                    </div>

                    {/* Expand Chevron Icon */}
                    <FaChevronRight className={`w-5 h-5 text-[#8E8E93] group-hover:text-[#F5F5F3] transition-transform duration-500 mt-1 ${
                      isActive ? "rotate-90 text-brand-orange" : ""
                    }`} />
                  </div>

                  {/* Accordion Content: Staggered Deliverables */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mt-6 pt-6 border-t border-white/5 pl-0 md:pl-16 grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {service.details.map((detail, dIdx) => (
                            <motion.div
                              key={detail}
                              initial={{ x: -10, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: dIdx * 0.05, duration: 0.3 }}
                              className="flex items-center gap-3"
                            >
                              <span className="font-mono text-[9px] text-brand-orange select-none">
                                // 0{dIdx + 1}
                              </span>
                              <span className="font-sans text-xs text-[#F5F5F3] font-light">
                                {detail}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
