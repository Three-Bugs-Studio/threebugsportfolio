import React from "react";
import { PRICING_DATA } from "../data";
import { motion } from "motion/react";
import { Check, ArrowRight, Clock, ShieldCheck, Layers } from "lucide-react";
import { PricingPlan } from "../types";

interface PricingProps {
  lang: "vi" | "en";
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
    <section id="pricing" className="py-24 md:py-32 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
      {/* Background Decorative Tech Grids */}
      <div className="absolute inset-0 swiss-grid opacity-5 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-brand-orange/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-brand-orange">
                {lang === "vi" ? "04_ALT // BÁO GIÁ TRỌN GÓI 3 PHASE" : "04_ALT // 3-PHASE PRICING WORKFLOW"}
              </span>
              <span className="h-[1px] w-12 bg-brand-orange/40" />
            </div>
            <h2 className="font-display font-medium text-4xl md:text-6xl tracking-tight text-[#F5F5F3] leading-[1.05]">
              {lang === "vi" ? "Báo Giá Dịch Vụ Web" : "Transparent Web Packages"}
            </h2>
          </div>
          <p className="font-mono text-xs text-[#8E8E93] max-w-sm leading-relaxed">
            {lang === "vi"
              ? "TẤT CẢ CÁC GÓI ĐỀU ĐƯỢC THỰC HIỆN ĐẦY ĐỦ THEO QUY TRÌNH 3 PHASE (THIẾT KẾ ➔ LẬP TRÌNH ➔ KHỞI CHẠY BẢO HÀNH)."
              : "ALL PACKAGES ARE EXECUTED THROUGH FULL 3-PHASE PIPELINES (DESIGN ➔ ENGINEERING ➔ LAUNCH & SLA)."}
          </p>
        </div>

        {/* Phase Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, idx) => {
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.15, duration: 0.7 }}
                className="relative flex flex-col p-8 rounded-sm bg-[#111111]/80 border border-white/10 hover:border-brand-orange/40 hover:bg-[#141414] transition-all duration-300 shadow-xl"
              >
                {/* Badge & Timeline */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs tracking-widest text-brand-orange font-semibold bg-brand-orange/10 border border-brand-orange/20 px-2.5 py-1 rounded-sm">
                    {plan.badge}
                  </span>
                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#8E8E93]">
                    <Clock className="w-3.5 h-3.5 text-brand-orange" />
                    <span>{plan.timeline}</span>
                  </div>
                </div>

                {/* Title & Tagline */}
                <h3 className="font-display text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <p className="font-sans text-xs text-[#8E8E93] leading-relaxed mb-6 min-h-[36px]">
                  {plan.tagline}
                </p>

                {/* Price Display */}
                <div className="py-5 px-4 bg-[#090909] border border-white/5 rounded-sm mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-3xl font-extrabold text-[#F5F5F3]">
                      {plan.priceVnd}
                    </span>
                  </div>
                  <div className="font-mono text-[10px] text-[#8E8E93] mt-1 flex items-center justify-between">
                    <span>{plan.priceUsd}</span>
                    <span className="text-brand-orange/80">[ {lang === "vi" ? "Trọn gói 3 Phase" : "Full 3 Phases"} ]</span>
                  </div>
                </div>

                {/* 3-PHASE EXECUTION ROADMAP BOX */}
                <div className="mb-6 bg-[#090909] border border-white/10 rounded-sm p-4">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-brand-orange mb-3 flex items-center gap-1.5 font-bold">
                    <Layers className="w-3.5 h-3.5" />
                    <span>// {lang === "vi" ? "LỘ TRÌNH 3 GIAI ĐOẠN DỰ ÁN" : "3-PHASE EXECUTION ROADMAP"}</span>
                  </div>
                  <div className="space-y-3">
                    {plan.phases.map((ph, i) => (
                      <div key={i} className="p-2.5 bg-white/[0.02] border-l-2 border-brand-orange/60 rounded-r-sm text-[11px] font-sans">
                        <div className="flex items-center justify-between font-mono text-[10px] mb-0.5">
                          <strong className="text-white font-bold">{ph.number}: {ph.title}</strong>
                          <span className="text-[#8E8E93] text-[9px]">{ph.duration}</span>
                        </div>
                        <p className="text-[#A0A0A5] text-[11px] leading-tight">{ph.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits List */}
                <div className="space-y-3 mb-8 flex-1">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[#8E8E93] mb-2 flex items-center gap-2">
                    <span>// {lang === "vi" ? "QUYỀN LỢI & SẢN PHẨM BÀN GIAO" : "BENEFITS & DELIVERABLES"}</span>
                  </div>
                  {plan.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs font-sans text-[#D4D4D8]">
                      <div className="mt-0.5 p-0.5 rounded bg-brand-orange/15 text-brand-orange border border-brand-orange/30 shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="leading-snug">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Select Plan Button -> Direct Scroll to Contact Form */}
                <button
                  onClick={() => handleSelectPlan(plan)}
                  className="w-full py-3.5 px-6 rounded-sm font-mono text-xs tracking-wider uppercase font-semibold transition-all duration-300 flex items-center justify-center gap-2 group interactive bg-white/10 text-white hover:bg-brand-orange hover:text-black border border-white/10"
                >
                  <span>{lang === "vi" ? `NHẬN TƯ VẤN GÓI NÀY` : `SELECT THIS PACKAGE`}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Phase Milestone Payment Roadmap Breakdown */}
        <div className="bg-[#111111] border border-white/10 rounded-sm p-8 md:p-10 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-white/5">
            <div>
              <div className="flex items-center gap-2 text-brand-orange font-mono text-xs uppercase tracking-widest mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>{lang === "vi" ? "LỘ TRÌNH THANH TOÁN THEO TIẾN ĐỘ 3 PHASE" : "3-PHASE MILESTONE PAYMENT SAFETY"}</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white">
                {lang === "vi" ? "Cam Kết Thanh Toán Minh Bạch Theo Tiến Độ" : "Transparent Milestone Settlement"}
              </h3>
            </div>
            <p className="font-mono text-xs text-[#8E8E93] max-w-md">
              {lang === "vi"
                ? "Không yêu cầu thanh toán 100% trước. Khách hàng nghiệm thu lần lượt từng Phase sản phẩm trước khi chuyển sang giai đoạn tiếp theo."
                : "Zero 100% upfront stress. Review each working phase deliverable before advancing to the next milestone."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-[#090909] border border-white/5 rounded-sm relative">
              <div className="font-mono text-xl font-bold text-brand-orange mb-1">30%</div>
              <div className="font-display font-semibold text-white text-sm mb-2">
                {lang === "vi" ? "Phase 1: Specs & Figma UI/UX" : "Phase 1: Spec & Figma UI UX"}
              </div>
              <p className="font-sans text-xs text-[#8E8E93] leading-relaxed">
                {lang === "vi"
                  ? "Đặt cọc khởi tạo Phase 1. Studio thực hiện chốt đặc tả, thiết kế bản vẽ Figma UI/UX và nghiệm thu giao diện."
                  : "Initial Phase 1 deposit. We lock requirements, design Figma UI UX prototypes, and sign off layout direction."}
              </p>
            </div>

            <div className="p-5 bg-[#090909] border border-white/5 rounded-sm relative">
              <div className="font-mono text-xl font-bold text-brand-orange mb-1">40%</div>
              <div className="font-display font-semibold text-white text-sm mb-2">
                {lang === "vi" ? "Phase 2: Lập Trình & Demo Core" : "Phase 2: Build & Staging Demo"}
              </div>
              <p className="font-sans text-xs text-[#8E8E93] leading-relaxed">
                {lang === "vi"
                  ? "Nghiệm thu Phase 2. Bàn giao bản Staging Web hoạt động trực tiếp, chạy thử nghiệm các tính năng & giỏ hàng/CMS."
                  : "Phase 2 sign-off. Handing over live staging link, testing backend APIs, cart systems, and admin CMS features."}
              </p>
            </div>

            <div className="p-5 bg-[#090909] border border-white/5 rounded-sm relative">
              <div className="font-mono text-xl font-bold text-brand-orange mb-1">30%</div>
              <div className="font-display font-semibold text-white text-sm mb-2">
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
