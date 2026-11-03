import React, { useEffect, useRef, useState } from "react";
import { PRICING_DATA, PRICE_NOTE } from "../data";
import { motion, useInView } from "motion/react";
import {
  CheckIcon,
  ArrowRightIcon,
  ClockIcon,
  ShieldIcon,
  BoxIcon,
  SparklesIcon,
  UserIcon,
  PhoneIcon,
} from "./ui/MajesticIcon";
import { SiZalo } from "react-icons/si";
import { PricingPlan } from "../types";
import priceGif from "@/assets/animation-icon/price.gif";

interface PricingProps {
  lang: "vi" | "en";
}

interface SinglePricingCardProps {
  key?: string;
  plan: PricingPlan;
  lang: "vi" | "en";
  onSelectPlan: (plan: PricingPlan) => void;
  index: number;
}

function PricingCardItem({ plan, lang, onSelectPlan, index }: SinglePricingCardProps) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 260,
        damping: 20,
      },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 12,
      },
    },
  };

  const featureSections: { title: string; icon?: React.ReactNode; items: string[] }[] =
    plan.features && plan.features.length > 0
      ? plan.features.map((f, i) => ({
          title: f.title,
          icon: i === 0 
            ? <ShieldIcon size={16} className="w-4 h-4 text-brand-ink shrink-0" />
            : <SparklesIcon size={16} className="w-4 h-4 text-brand-ink shrink-0" />,
          items: f.items,
        }))
      : [
          {
            title: lang === "vi" ? "Lộ Trình 3 Phase Triển Khai" : "3-Phase Execution Roadmap",
            icon: <BoxIcon size={16} className="w-4 h-4 text-brand-ink shrink-0" />,
            items: (plan.phases || []).map((ph) => `${ph.number}: ${ph.title} (${ph.duration}) - ${ph.description}`),
          },
          {
            title: lang === "vi" ? "Quyền Lợi & Bàn Giao Sản Phẩm" : "Benefits & Deliverables",
            icon: <SparklesIcon size={16} className="w-4 h-4 text-brand-ink shrink-0" />,
            items: plan.benefits,
          },
        ];

  return (
    <motion.div
      ref={containerRef}
      initial="hidden"
      animate={hasAnimated ? "visible" : "hidden"}
      variants={containerVariants}
      className="w-full"
    >
      <div className={`pricing-card-container card-brutalist relative mx-auto w-full max-w-6xl overflow-hidden rounded-sm bg-surface/90 border ${plan.pricingType === "hourly" ? "border-brand-orange/40" : "border-line"} hover:border-brand-orange/60 transition-all duration-500 shadow-2xl group`}>
        {/* Top Accent Gradient Border */}
        <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${plan.pricingType === "hourly" ? "from-brand-orange via-amber-400 to-brand-orange" : "from-transparent via-brand-orange to-transparent"} opacity-70 group-hover:opacity-100 transition-opacity`} />

        <div className="flex flex-col lg:flex-row">
          
          {/* Left Column: Summary, Price & Primary Action */}
          <motion.div
            className="pricing-card-left flex flex-col justify-between p-6 lg:w-2/5 lg:p-8 border-b lg:border-b-0 lg:border-r border-line bg-canvas/80"
            variants={itemVariants}
          >
            <div>
              {/* Badge & Timeline */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="font-mono text-xs tracking-widest text-brand-ink font-semibold bg-brand-orange/10 border border-brand-orange/20 px-3 py-1 rounded-sm">
                  {plan.badge}
                </span>
                <div className="flex items-center gap-1.5 font-mono text-xs text-ink-muted">
                  <ClockIcon size={14} className="w-3.5 h-3.5 text-brand-ink" />
                  <span>{plan.timeline}</span>
                </div>
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold font-display text-ink tracking-tight">
                  {plan.name}
                </h3>
                <p className="mt-2 font-sans text-xs md:text-sm text-ink-muted leading-relaxed">
                  {plan.tagline}
                </p>
              </div>

              {/* Pricing Display */}
              <motion.div className="pricing-price-box mt-5 p-4 rounded-xl bg-canvas border border-line space-y-2 relative overflow-hidden" variants={itemVariants}>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-baseline flex-wrap gap-2">
                    <span className="text-2xl md:text-3xl font-extrabold font-display text-ink">
                      {plan.priceVnd}
                    </span>
                  </div>
                  {/* Price Animated GIF Badge */}
                  <div className="price-anim-icon-container relative w-10 h-10 md:w-11 md:h-11 p-1 rounded-xl bg-brand-orange/15 border border-brand-orange/30 shadow-[0_0_15px_rgba(255,106,0,0.25)] flex items-center justify-center shrink-0 overflow-hidden">
                    <img
                      src={priceGif}
                      alt="Price tag animation"
                      loading="lazy"
                      decoding="async"
                      width={44}
                      height={44}
                      className="w-full h-full object-contain rounded-lg transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 font-mono text-xs text-ink-muted pt-2 border-t border-line">
                  <span>{plan.priceUsd}</span>
                  <span className="text-brand-ink font-medium shrink-0">
                    [ {plan.pricingType === "hourly"
                        ? (lang === "vi" ? "Time-Tracking SLA" : "Tracked SLA")
                        : plan.buttonHref
                          ? "Template"
                          : (lang === "vi" ? "Trọn gói 3 Phase" : "Full 3 Phases")} ]
                  </span>
                </div>
                <span className="block text-xs font-sans text-ink-muted pt-0.5">
                  {plan.paymentNote || (lang === "vi" ? "one-time payment / theo tiến độ" : "one-time payment / milestone-based")}
                </span>
              </motion.div>

              {/* Direct Consultant for Hourly SLA: Hoang Do */}
              {plan.pricingType === "hourly" && (
                <motion.div
                  className="mt-3.5 p-3.5 rounded-lg bg-canvas border border-brand-orange/30 shadow-[0_0_15px_rgba(255,106,0,0.1)] relative overflow-hidden"
                  variants={itemVariants}
                >
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-sm bg-brand-orange/15 text-brand-ink border border-brand-orange/30 font-display font-bold text-xs flex items-center justify-center shrink-0">
                        HĐ
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-display font-bold text-sm text-ink">Hoàng Đỗ</span>
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        </div>
                        <span className="font-mono text-xs text-brand-ink block font-semibold">
                          // {lang === "vi" ? "ĐẦU MỐI TIẾP NHẬN BẢO TRÌ" : "HOURLY SLA LEAD CONSULTANT"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-2.5 pt-2 border-t border-line">
                    <a
                      href="tel:0392996307"
                      className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-sm bg-surface hover:bg-line border border-line hover:border-brand-orange/40 font-mono text-xs text-ink hover:text-brand-ink transition-all shadow-sm active:scale-95"
                      title="Gọi Hoàng Đỗ: 0392.996.307"
                    >
                      <PhoneIcon size={12} className="w-3 h-3 text-brand-ink shrink-0" />
                      <span className="font-bold">0392.996.307</span>
                    </a>
                    <a
                      href="https://zalo.me/0392996307"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-sm bg-gradient-to-r from-[#0068FF] to-[#0084FF] hover:from-[#0058e6] hover:to-[#0074e6] text-white font-mono text-xs font-bold shadow-[0_0_12px_rgba(0,104,255,0.35)] transition-all active:scale-95"
                    >
                      <SiZalo className="w-3 h-3 shrink-0" />
                      <span>Zalo Hoàng Đỗ</span>
                    </a>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Select Plan Button */}
            <motion.div className="mt-5" variants={itemVariants}>
              <button
                onClick={() => onSelectPlan(plan)}
                aria-label={`${plan.buttonText || (lang === "vi" ? "Nhận tư vấn gói" : "Select package")} ${plan.name}`}
                className="btn-stacked w-full py-3.5 px-6 rounded-sm font-mono text-xs tracking-widest uppercase font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn interactive bg-brand-orange text-[#090909] hover:bg-white hover:text-black shadow-lg focus-terminal outline-none active:scale-[0.99]"
              >
                <span>
                  {plan.buttonText || (lang === "vi" ? "NHẬN TƯ VẤN GÓI NÀY" : "SELECT THIS PACKAGE")}
                </span>
                <ArrowRightIcon size={16} className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column: 3-Phase Roadmap / Maintenance Checklist */}
          <motion.div
            className="pricing-card-right p-6 lg:w-3/5 lg:p-8 bg-surface/70 flex flex-col justify-between"
            variants={itemVariants}
          >
            <div className="space-y-5">
              {featureSections.map((section, secIdx) => (
                <div key={secIdx}>
                  <div className="flex items-center gap-2 mb-3">
                    {section.icon}
                    <h4 className="text-sm font-mono uppercase tracking-wider text-brand-ink font-bold">
                      {section.title}:
                    </h4>
                  </div>

                  <ul className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
                    {section.items.map((item, itemIdx) => (
                      <motion.li
                        key={itemIdx}
                        className="flex items-start text-xs font-sans text-ink-muted leading-relaxed"
                        variants={listItemVariants}
                        custom={itemIdx + secIdx * section.items.length}
                      >
                        <div className="mt-0.5 mr-2.5 p-0.5 rounded bg-brand-orange/15 text-brand-ink border border-brand-orange/30 shrink-0">
                          <CheckIcon size={12} className="h-3 w-3" />
                        </div>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {secIdx < featureSections.length - 1 && (
                    <div className="my-4 h-[1px] w-full bg-line" />
                  )}
                </div>
              ))}

              {/* 3-Step On-Demand SLA Workflow (For Hourly Maintenance) */}
              {plan.pricingType === "hourly" && plan.phases && plan.phases.length > 0 && (
                <div className="pt-4 border-t border-line">
                  <div className="flex items-center gap-2 mb-3">
                    <BoxIcon size={16} className="w-4 h-4 text-brand-ink shrink-0" />
                    <h4 className="text-xs md:text-sm font-mono uppercase tracking-wider text-brand-ink font-bold">
                      {lang === "vi" ? "Quy Trình Tiếp Nhận & Bấm Giờ 3 Bước:" : "3-Step On-Demand SLA Workflow:"}
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                    {plan.phases.map((ph, phIdx) => (
                      <div
                        key={phIdx}
                        className="p-3 rounded-lg bg-canvas border border-line hover:border-brand-orange/40 transition-colors flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="font-mono text-xs font-bold text-brand-ink">
                              {ph.number}
                            </span>
                            <span className="font-mono text-xs text-ink-muted bg-line border border-line px-1.5 py-0.5 rounded">
                              {ph.duration}
                            </span>
                          </div>
                          <div className="font-display font-semibold text-xs text-ink mb-1">
                            {ph.title}
                          </div>
                          <p className="font-sans text-xs text-ink-muted leading-relaxed">
                            {ph.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Card Footer Bar: Hourly SLA Terms vs 3-Phase Milestones */}
            {plan.pricingType === "hourly" ? (
              <div className="mt-6 pt-4 border-t border-line flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-ink-muted">
                <span className="text-brand-ink">// {lang === "vi" ? "HÌNH THỨC HỢP TÁC BẢO TRÌ:" : "HOURLY SLA COOPERATION:"}</span>
                <div className="flex items-center gap-3 md:gap-4 flex-wrap">
                  <span className="text-ink font-medium">{lang === "vi" ? "Time-Tracking Minh Bạch" : "Verified Time-Tracking"}</span>
                  <span className="text-ink-muted">•</span>
                  <span className="text-ink font-medium">{lang === "vi" ? "Sao Lưu Định Kỳ" : "Periodic Backups"}</span>
                  <span className="text-ink-muted">•</span>
                  <span className="text-ink font-medium">{lang === "vi" ? "Không Phí Cố Định" : "Zero Monthly Lock-in"}</span>
                </div>
              </div>
            ) : (
              <div className="mt-6 pt-4 border-t border-line flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-ink-muted">
                <span className="text-brand-ink">// {lang === "vi" ? "TIẾN ĐỘ THANH TOÁN:" : "PAYMENT MILESTONES:"}</span>
                <div className="flex items-center gap-4">
                  <span className="text-ink font-medium">30% Deposit</span>
                  <span className="text-ink-muted">•</span>
                  <span className="text-ink font-medium">40% Staging</span>
                  <span className="text-ink-muted">•</span>
                  <span className="text-ink font-medium">30% Launch</span>
                </div>
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}

export default function Pricing({ lang }: PricingProps) {
  const plans = PRICING_DATA[lang];

  const handleSelectPlan = (plan: PricingPlan) => {
    if (plan.buttonHref) {
      window.location.href = plan.buttonHref;
      return;
    }

    // Dispatch custom event for Contact component to pre-fill budget & message
    const event = new CustomEvent("select_pricing_plan", {
      detail: {
        planId: plan.id,
        planName: plan.name,
        badge: plan.badge,
        pricingType: plan.pricingType,
        quoteNotice: plan.priceVnd,
      }
    });
    window.dispatchEvent(event);

    // Smooth scroll down to contact section
    const contactSec = document.getElementById("app-contact-section") || document.getElementById("contact");
    if (contactSec) {
      contactSec.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="pricing" className="py-24 md:py-32 bg-canvas border-t border-line relative overflow-hidden">
      {/* Background Decorative Tech Grids */}
      <div className="absolute inset-0 swiss-grid opacity-5 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-brand-orange/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3.5 mb-4">
              <div className="price-header-icon-container w-9 h-9 p-1 rounded-lg bg-brand-orange/15 border border-brand-orange/30 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(255,106,0,0.2)]">
                <img 
                  src={priceGif} 
                  alt="Pricing icon" 
                  loading="lazy" 
                  decoding="async" 
                  width={36} 
                  height={36} 
                  className="w-full h-full object-contain rounded-sm" 
                />
              </div>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-brand-ink font-semibold">
                {lang === "vi" ? "04_ALT // BÁO GIÁ DỊCH VỤ & BẢO TRÌ" : "04_ALT // PACKAGES & HOURLY SLA"}
              </span>
              <span className="h-[1px] w-12 bg-brand-orange/40" />
            </div>
            <h2 className="font-display font-bold text-4xl md:text-6xl tracking-tight text-ink leading-[1.05]">
              {lang === "vi" ? "Báo Giá Dịch Vụ & Bảo Trì" : "Transparent Packages & SLA"}
            </h2>
          </div>
          <p className="font-mono text-xs text-ink-muted max-w-sm leading-relaxed">
            {lang === "vi"
              ? "BÁO GIÁ MINH BẠCH THEO TIẾN ĐỘ 3 PHASE (THIẾT KẾ ➔ LẬP TRÌNH ➔ KHỞI CHẠY) VÀ GÓI BẢO TRÌ TÍNH THEO GIỜ HẬU MÃI."
              : "TRANSPARENT 3-PHASE EXECUTION (DESIGN ➔ ENGINEERING ➔ LAUNCH) PLUS ON-DEMAND HOURLY SLA POST-WARRANTY."}
          </p>
        </div>

        {/* Dedicated Consultants Reception Box - Fully Responsive for all resolutions */}
        <div className="mb-14 p-5 md:p-7 bg-surface/95 border border-brand-orange/30 rounded-sm flex flex-col xl:flex-row xl:items-center justify-between gap-6 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-brand-orange to-brand-orange/40" />
          
          <div className="flex items-start md:items-center gap-4 max-w-xl">
            <div className="w-12 h-12 rounded-sm bg-brand-orange/15 text-brand-ink border border-brand-orange/40 flex items-center justify-center shrink-0 shadow-[0_0_18px_rgba(255,106,0,0.25)]">
              <UserIcon size={20} className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-mono text-xs uppercase tracking-widest text-brand-ink font-bold">
                  // {lang === "vi" ? "BỘ PHẬN TIẾP NHẬN HỒ SƠ & TƯ VẤN TRỰC TIẾP" : "PROJECT INTAKE & DIRECT CONSULTANTS"}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <p className="font-display font-medium text-sm md:text-base text-ink leading-snug">
                {lang === "vi" 
                  ? "Báo giá linh hoạt theo quy mô & chức năng – Liên hệ ngay 2 chuyên viên phụ trách tiếp nhận dự án:" 
                  : "Custom quote tailored to project scope – Contact our 2 direct project intake consultants:"}
              </p>
            </div>
          </div>

          {/* Responsive Consultant Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full xl:w-auto xl:min-w-[560px]">
            {/* Consultant 1: Hoang Do */}
            <div className="flex flex-col justify-between p-3.5 bg-canvas/90 border border-line hover:border-brand-orange/40 rounded-sm transition-all shadow-md group/card">
              <div className="flex items-center justify-between mb-2.5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-sm text-ink group-hover/card:text-brand-ink transition-colors">
                      Hoàng Đỗ
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="font-mono text-xs text-brand-ink bg-brand-orange/10 border border-brand-orange/20 px-1.5 py-0.5 rounded font-semibold">
                      {lang === "vi" ? "Đầu mối Bảo Trì" : "Hourly SLA Lead"}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-ink-muted">
                    {lang === "vi" ? "Tiếp nhận hồ sơ & Bảo trì ngoài giờ" : "Project Intake & Hourly Maintenance"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 mt-2">
                <a
                  href="tel:0392996307"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-sm bg-surface hover:bg-line border border-line hover:border-brand-orange/40 font-mono text-xs text-ink hover:text-brand-ink transition-all shadow-sm active:scale-95"
                  title="Gọi Hoàng Đỗ: 0392.996.307"
                >
                  <PhoneIcon size={12} className="w-3 h-3 text-brand-ink shrink-0" />
                  <span className="font-bold tracking-tight">0392.996.307</span>
                </a>
                <a
                  href="https://zalo.me/0392996307"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-sm bg-gradient-to-r from-[#0068FF] to-[#0084FF] hover:from-[#0058e6] hover:to-[#0074e6] text-white font-mono text-xs font-bold shadow-[0_0_12px_rgba(0,104,255,0.35)] hover:shadow-[0_0_18px_rgba(0,104,255,0.55)] transition-all active:scale-95"
                >
                  <SiZalo className="w-3.5 h-3.5 shrink-0" />
                  <span>Zalo Chat</span>
                </a>
              </div>
            </div>

            {/* Consultant 2: Minh Duc */}
            <div className="flex flex-col justify-between p-3.5 sm:p-4 bg-canvas/90 border border-line hover:border-brand-orange/40 rounded-sm transition-all shadow-md group/card">
              <div className="flex items-center justify-between mb-2.5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-sm text-ink group-hover/card:text-brand-ink transition-colors">
                      Minh Đức
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="font-mono text-xs text-ink-muted">
                    {lang === "vi" ? "Tư vấn kỹ thuật & Lộ trình" : "Technical & Roadmap"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 mt-2">
                <a
                  href="tel:0867474204"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-sm bg-surface hover:bg-line border border-line hover:border-brand-orange/40 font-mono text-xs text-ink hover:text-brand-ink transition-all shadow-sm active:scale-95"
                  title="Gọi Minh Đức: 0867.474.204"
                >
                  <PhoneIcon size={12} className="w-3 h-3 text-brand-ink shrink-0" />
                  <span className="font-bold tracking-tight">0867.474.204</span>
                </a>
                <a
                  href="https://zalo.me/0867474204"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-sm bg-gradient-to-r from-[#0068FF] to-[#0084FF] hover:from-[#0058e6] hover:to-[#0074e6] text-white font-mono text-xs font-bold shadow-[0_0_12px_rgba(0,104,255,0.35)] hover:shadow-[0_0_18px_rgba(0,104,255,0.55)] transition-all active:scale-95"
                >
                  <SiZalo className="w-3.5 h-3.5 shrink-0" />
                  <span>Zalo Chat</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Stacked Pricing Cards Container */}
        <div className="space-y-10 mb-20">
          {plans.map((plan, idx) => (
            <PricingCardItem
              key={plan.id}
              plan={plan}
              lang={lang}
              onSelectPlan={handleSelectPlan}
              index={idx}
            />
          ))}
        </div>

        {/* Phase Milestone Payment Roadmap Breakdown */}
        <div className="pricing-milestone-box bg-surface/90 border border-line rounded-sm p-8 md:p-10 relative overflow-hidden shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-line">
            <div>
              <div className="flex items-center gap-2 text-brand-ink font-mono text-xs uppercase tracking-widest mb-1 font-bold">
                <ShieldIcon size={16} className="w-4 h-4" />
                <span>{lang === "vi" ? "LỘ TRÌNH THANH TOÁN THEO TIẾN ĐỘ 3 PHASE" : "3-PHASE MILESTONE PAYMENT SAFETY"}</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-ink">
                {lang === "vi" ? "Cam Kết Thanh Toán Minh Bạch Theo Tiến Độ" : "Transparent Milestone Settlement"}
              </h3>
            </div>
            <p className="font-mono text-xs text-ink-muted max-w-md leading-relaxed">
              {lang === "vi"
                ? "Không yêu cầu thanh toán 100% trước. Khách hàng nghiệm thu lần lượt từng Phase sản phẩm trước khi chuyển sang giai đoạn tiếp theo."
                : "Zero 100% upfront stress. Review each working phase deliverable before advancing to the next milestone."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="pricing-milestone-item p-5 bg-canvas border border-line rounded-sm relative group hover:border-brand-orange/40 transition-colors">
              <div className="font-mono text-2xl font-extrabold text-brand-ink mb-1">30%</div>
              <div className="font-display font-bold text-ink text-sm mb-2">
                {lang === "vi" ? "Phase 1: Specs & Figma UI/UX" : "Phase 1: Spec & Figma UI UX"}
              </div>
              <p className="font-sans text-xs text-ink-muted leading-relaxed">
                {lang === "vi"
                  ? "Đặt cọc khởi tạo Phase 1. Studio thực hiện chốt đặc tả, thiết kế bản vẽ Figma UI/UX và nghiệm thu giao diện."
                  : "Initial Phase 1 deposit. We lock requirements, design Figma UI UX prototypes, and sign off layout direction."}
              </p>
            </div>

            <div className="pricing-milestone-item p-5 bg-canvas border border-line rounded-sm relative group hover:border-brand-orange/40 transition-colors">
              <div className="font-mono text-2xl font-extrabold text-brand-ink mb-1">40%</div>
              <div className="font-display font-bold text-ink text-sm mb-2">
                {lang === "vi" ? "Phase 2: Lập Trình & Demo Core" : "Phase 2: Build & Staging Demo"}
              </div>
              <p className="font-sans text-xs text-ink-muted leading-relaxed">
                {lang === "vi"
                  ? "Nghiệm thu Phase 2. Bàn giao bản Staging Web hoạt động trực tiếp, chạy thử nghiệm các tính năng & giỏ hàng/CMS."
                  : "Phase 2 sign-off. Handing over live staging link, testing backend APIs, cart systems, and admin CMS features."}
              </p>
            </div>

            <div className="pricing-milestone-item p-5 bg-canvas border border-line rounded-sm relative group hover:border-brand-orange/40 transition-colors">
              <div className="font-mono text-2xl font-extrabold text-brand-ink mb-1">30%</div>
              <div className="font-display font-bold text-ink text-sm mb-2">
                {lang === "vi" ? "Phase 3: Launch & Bảo Hành" : "Phase 3: Sign-off & Launch"}
              </div>
              <p className="font-sans text-xs text-ink-muted leading-relaxed">
                {lang === "vi"
                  ? "Nghiệm thu Phase 3. Đẩy web lên Cloud Domain chính thức, bàn giao 100% mã nguồn và kích hoạt chính sách bảo hành."
                  : "Final Phase 3 sign-off. Deploying live domain to cloud servers, handing over source code, and activating warranty."}
              </p>
            </div>
          </div>

          <p className="mt-4 font-sans text-xs text-ink-muted">{PRICE_NOTE[lang]}</p>

          {/* Post-Warranty Hourly Maintenance SLA Guarantee Note */}
          <div className="mt-6 p-4 rounded-sm bg-canvas border border-brand-orange/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded bg-brand-orange/15 text-brand-ink border border-brand-orange/30 shrink-0">
                <ClockIcon size={16} className="w-4 h-4" />
              </div>
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-brand-ink font-bold">
                  // {lang === "vi" ? "GÓI BẢO TRÌ NGOÀI GIỜ (HOURLY SLA):" : "POST-WARRANTY HOURLY SLA TERMS:"}
                </span>
                <p className="font-sans text-xs text-ink-muted mt-0.5">
                  {lang === "vi"
                    ? "Sau khi hết thời hạn bảo hành miễn phí, dịch vụ được tính phí theo giờ làm việc thực tế (Time-tracking minh bạch), nghiệm thu theo từng đợt thỏa thuận mà không cần trả phí duy trì hàng tháng."
                    : "After the free warranty period expires, support is billed strictly by actual hours worked (Transparent time-tracking), settled upon mutual agreement with no recurring monthly lock-in."}
                </p>
              </div>
            </div>
            <span className="font-mono text-xs text-brand-ink bg-brand-orange/10 border border-brand-orange/20 px-2.5 py-1 rounded shrink-0">
              {lang === "vi" ? "Thỏa Thuận Theo Giờ" : "Hourly Agreement"}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
