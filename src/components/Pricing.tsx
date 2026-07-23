import React, { useEffect, useRef, useState } from "react";
import { PRICING_DATA } from "../data";
import { motion, useInView } from "motion/react";
import { Check, ArrowRight, Clock, ShieldCheck, Layers, Sparkles } from "lucide-react";
import { PricingPlan } from "../types";

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
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
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
        type: "spring",
        stiffness: 120,
        damping: 12,
      },
    },
  };

  const featureSections = [
    {
      title: lang === "vi" ? "Lộ Trình 3 Phase Triển Khai" : "3-Phase Execution Roadmap",
      icon: <Layers className="w-4 h-4 text-brand-orange" />,
      items: plan.phases.map((ph) => `${ph.number}: ${ph.title} (${ph.duration}) - ${ph.description}`),
    },
    {
      title: lang === "vi" ? "Quyền Lợi & Bàn Giao Sản Phẩm" : "Benefits & Deliverables",
      icon: <Sparkles className="w-4 h-4 text-brand-orange" />,
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
      <div className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-sm bg-[#111111]/90 border border-white/10 hover:border-brand-orange/40 transition-all duration-500 shadow-2xl group">
        {/* Top Accent Gradient Border */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-orange to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

        <div className="flex flex-col lg:flex-row">
          
          {/* Left Column: Summary, Price & Primary Action */}
          <motion.div
            className="flex flex-col justify-between p-6 lg:w-2/5 lg:p-10 border-b lg:border-b-0 lg:border-r border-white/10 bg-[#0c0c0c]/80"
            variants={itemVariants}
          >
            <div>
              {/* Badge & Timeline */}
              <div className="flex items-center justify-between gap-3 mb-6">
                <span className="font-mono text-xs tracking-widest text-brand-orange font-semibold bg-brand-orange/10 border border-brand-orange/20 px-3 py-1 rounded-sm">
                  {plan.badge}
                </span>
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#8E8E93]">
                  <Clock className="w-3.5 h-3.5 text-brand-orange" />
                  <span>{plan.timeline}</span>
                </div>
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold font-display text-white tracking-tight">
                  {plan.name}
                </h3>
                <p className="mt-3 font-sans text-xs md:text-sm text-[#8E8E93] leading-relaxed">
                  {plan.tagline}
                </p>
              </div>

              {/* Pricing Display */}
              <motion.div className="mt-8 p-5 rounded-sm bg-[#060606] border border-white/5 space-y-2" variants={itemVariants}>
                <div className="flex items-baseline flex-wrap gap-2">
                  <span className="text-3xl md:text-4xl font-extrabold font-display text-[#F5F5F3]">
                    {plan.priceVnd}
                  </span>
                </div>
                <div className="flex items-center justify-between font-mono text-xs text-[#8E8E93] pt-1 border-t border-white/5">
                  <span>{plan.priceUsd}</span>
                  <span className="text-brand-orange font-medium">
                    [ {lang === "vi" ? "Trọn gói 3 Phase" : "Full 3 Phases"} ]
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Select Plan Button */}
            <motion.div className="mt-8" variants={itemVariants}>
              <button
                onClick={() => onSelectPlan(plan)}
                className="btn-stacked w-full py-4 px-6 rounded-sm font-mono text-xs tracking-widest uppercase font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn interactive bg-brand-orange text-[#090909] hover:bg-white hover:text-black shadow-lg"
              >
                <span>{lang === "vi" ? "NHẬN TƯ VẤN GÓI NÀY" : "SELECT THIS PACKAGE"}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column: 3-Phase Roadmap & Benefits Checklist */}
          <motion.div
            className="p-6 lg:w-3/5 lg:p-10 bg-[#121212]/70 flex flex-col justify-between"
            variants={itemVariants}
          >
            <div className="space-y-8">
              {featureSections.map((section, secIdx) => (
                <div key={secIdx}>
                  <div className="flex items-center gap-2 mb-4">
                    {section.icon}
                    <h4 className="text-sm font-mono uppercase tracking-wider text-brand-orange font-bold">
                      {section.title}:
                    </h4>
                  </div>

                  <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {section.items.map((item, itemIdx) => (
                      <motion.li
                        key={itemIdx}
                        className="flex items-start text-xs font-sans text-[#D4D4D8] leading-relaxed"
                        variants={listItemVariants}
                      >
                        <div className="mt-0.5 mr-2.5 p-0.5 rounded bg-brand-orange/15 text-brand-orange border border-brand-orange/30 shrink-0">
                          <Check className="h-3 w-3" />
                        </div>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {secIdx < featureSections.length - 1 && (
                    <div className="my-6 h-[1px] w-full bg-white/10" />
                  )}
                </div>
              ))}
            </div>

            {/* Milestones Footer Bar */}
            <div className="mt-8 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] text-[#8E8E93]">
              <span className="text-brand-orange">// {lang === "vi" ? "TIẾN ĐỘ THANH TOÁN:" : "PAYMENT MILESTONES:"}</span>
              <div className="flex items-center gap-4">
                <span className="text-white font-medium">30% Deposit</span>
                <span className="text-white/30">•</span>
                <span className="text-white font-medium">40% Staging</span>
                <span className="text-white/30">•</span>
                <span className="text-white font-medium">30% Launch</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}

export default function Pricing({ lang }: PricingProps) {
  const plans = PRICING_DATA[lang];

  const handleSelectPlan = (plan: PricingPlan) => {
    // Dispatch custom event for Contact component to pre-fill budget & message
    const event = new CustomEvent("select_pricing_plan", {
      detail: {
        planId: plan.id,
        planName: plan.name,
        badge: plan.badge,
        priceVnd: plan.priceVnd,
        priceUsd: plan.priceUsd,
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
    <section id="pricing" className="py-24 md:py-32 bg-[#090909] border-t border-white/5 relative overflow-hidden">
      {/* Background Decorative Tech Grids */}
      <div className="absolute inset-0 swiss-grid opacity-5 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-brand-orange/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-brand-orange font-semibold">
                {lang === "vi" ? "04_ALT // BÁO GIÁ TRỌN GÓI 3 PHASE" : "04_ALT // 3-PHASE PRICING WORKFLOW"}
              </span>
              <span className="h-[1px] w-12 bg-brand-orange/40" />
            </div>
            <h2 className="font-display font-bold text-4xl md:text-6xl tracking-tight text-[#F5F5F3] leading-[1.05]">
              {lang === "vi" ? "Báo Giá Dịch Vụ Web" : "Transparent Web Packages"}
            </h2>
          </div>
          <p className="font-mono text-xs text-[#8E8E93] max-w-sm leading-relaxed">
            {lang === "vi"
              ? "TẤT CẢ CÁC GÓI ĐỀU ĐƯỢC THỰC HIỆN ĐẦY ĐỦ THEO QUY TRÌNH 3 PHASE (THIẾT KẾ ➔ LẬP TRÌNH ➔ KHỞI CHẠY BẢO HÀNH)."
              : "ALL PACKAGES ARE EXECUTED THROUGH FULL 3-PHASE PIPELINES (DESIGN ➔ ENGINEERING ➔ LAUNCH & SLA)."}
          </p>
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
        <div className="bg-[#111111]/90 border border-white/10 rounded-sm p-8 md:p-10 relative overflow-hidden shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-brand-orange font-mono text-xs uppercase tracking-widest mb-1 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>{lang === "vi" ? "LỘ TRÌNH THANH TOÁN THEO TIẾN ĐỘ 3 PHASE" : "3-PHASE MILESTONE PAYMENT SAFETY"}</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white">
                {lang === "vi" ? "Cam Kết Thanh Toán Minh Bạch Theo Tiến Độ" : "Transparent Milestone Settlement"}
              </h3>
            </div>
            <p className="font-mono text-xs text-[#8E8E93] max-w-md leading-relaxed">
              {lang === "vi"
                ? "Không yêu cầu thanh toán 100% trước. Khách hàng nghiệm thu lần lượt từng Phase sản phẩm trước khi chuyển sang giai đoạn tiếp theo."
                : "Zero 100% upfront stress. Review each working phase deliverable before advancing to the next milestone."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-[#090909] border border-white/10 rounded-sm relative group hover:border-brand-orange/40 transition-colors">
              <div className="font-mono text-2xl font-extrabold text-brand-orange mb-1">30%</div>
              <div className="font-display font-bold text-white text-sm mb-2">
                {lang === "vi" ? "Phase 1: Specs & Figma UI/UX" : "Phase 1: Spec & Figma UI UX"}
              </div>
              <p className="font-sans text-xs text-[#8E8E93] leading-relaxed">
                {lang === "vi"
                  ? "Đặt cọc khởi tạo Phase 1. Studio thực hiện chốt đặc tả, thiết kế bản vẽ Figma UI/UX và nghiệm thu giao diện."
                  : "Initial Phase 1 deposit. We lock requirements, design Figma UI UX prototypes, and sign off layout direction."}
              </p>
            </div>

            <div className="p-5 bg-[#090909] border border-white/10 rounded-sm relative group hover:border-brand-orange/40 transition-colors">
              <div className="font-mono text-2xl font-extrabold text-brand-orange mb-1">40%</div>
              <div className="font-display font-bold text-white text-sm mb-2">
                {lang === "vi" ? "Phase 2: Lập Trình & Demo Core" : "Phase 2: Build & Staging Demo"}
              </div>
              <p className="font-sans text-xs text-[#8E8E93] leading-relaxed">
                {lang === "vi"
                  ? "Nghiệm thu Phase 2. Bàn giao bản Staging Web hoạt động trực tiếp, chạy thử nghiệm các tính năng & giỏ hàng/CMS."
                  : "Phase 2 sign-off. Handing over live staging link, testing backend APIs, cart systems, and admin CMS features."}
              </p>
            </div>

            <div className="p-5 bg-[#090909] border border-white/10 rounded-sm relative group hover:border-brand-orange/40 transition-colors">
              <div className="font-mono text-2xl font-extrabold text-brand-orange mb-1">30%</div>
              <div className="font-display font-bold text-white text-sm mb-2">
                {lang === "vi" ? "Phase 3: Launch & Bảo Hành" : "Phase 3: Sign-off & Launch"}
              </div>
              <p className="font-sans text-xs text-[#8E8E93] leading-relaxed">
                {lang === "vi"
                  ? "Nghiệm thu Phase 3. Đẩy web lên Cloud Domain chính thức, bàn giao 100% mã nguồn và kích hoạt chính sách bảo hành."
                  : "Final Phase 3 sign-off. Deploying live domain to cloud servers, handing over source code, and activating warranty."}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
