import React from "react";
import { PRICING_DATA, PRICE_NOTE } from "../data";
import { motion } from "motion/react";
import {
  CheckIcon,
  ArrowRightIcon,
  ClockIcon,
  ShieldIcon,
  UserIcon,
  PhoneIcon,
} from "./ui/MajesticIcon";
import { SiZalo } from "react-icons/si";
import { PricingPlan } from "../types";
import priceGif from "@/assets/animation-icon/price.gif";

interface PricingProps {
  lang: "vi" | "en";
}

const WARRANTY = /bảo hành|warranty/i;
const SHOWN = 4;

// One plan as a compact column: price, timeline and warranty line up across cards so they compare at a glance.
function PlanCard({ plan, lang, onSelect }: { plan: PricingPlan; lang: "vi" | "en"; onSelect: (p: PricingPlan) => void; key?: string }) {
  const vi = lang === "vi";
  const items = plan.features?.[0]?.items || [];
  const warranty = items.find((i) => WARRANTY.test(i));
  const perks = items.filter((i) => i !== warranty);
  const more = perks.slice(SHOWN);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex flex-col bg-surface border rounded-xl p-5 md:p-6 ${plan.recommended ? "border-brand-orange shadow-[0_0_30px_rgba(255,106,0,0.12)]" : "border-line"}`}
    >
      {plan.recommended && (
        <span className="absolute -top-3 left-5 font-mono text-xs font-bold uppercase tracking-wider bg-brand-orange text-[#090909] px-2.5 py-1 rounded-sm">
          {vi ? "Khuyên dùng" : "Recommended"}
        </span>
      )}

      <h3 className="font-display font-bold text-xl text-ink leading-snug [text-wrap:balance] xl:min-h-[3.5rem]">{plan.name}</h3>
      <p className="mt-2 text-sm text-ink-muted leading-relaxed line-clamp-3 xl:min-h-[4.25rem]">{plan.tagline}</p>

      <div className="mt-5">
        <div className="font-display font-bold text-3xl text-ink">{plan.priceVnd}</div>
        <div className="mt-1 text-xs text-ink-muted xl:min-h-[2rem]">{plan.priceUsd}</div>
      </div>

      <dl className="mt-5 pt-4 border-t border-line space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <ClockIcon size={14} className="w-3.5 h-3.5 text-brand-ink shrink-0" />
          <dt className="sr-only">{vi ? "Thời gian" : "Timeline"}</dt>
          <dd className="text-ink">{plan.timeline}</dd>
        </div>
        {warranty && (
          <div className="flex items-center gap-2">
            <ShieldIcon size={14} className="w-3.5 h-3.5 text-brand-ink shrink-0" />
            <dt className="sr-only">{vi ? "Bảo hành" : "Warranty"}</dt>
            <dd className="text-ink">{warranty}</dd>
          </div>
        )}
      </dl>

      <ul className="mt-4 space-y-2.5 flex-1">
        {perks.slice(0, SHOWN).map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-ink-muted leading-relaxed">
            <CheckIcon size={12} className="mt-1 w-3 h-3 text-brand-ink shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {(more.length > 0 || plan.paymentNote) && (
        <details className="mt-3 group/details">
          <summary className="cursor-pointer text-sm text-brand-ink font-medium list-none flex items-center gap-1.5 focus-terminal rounded-sm">
            <span className="group-open/details:hidden">{vi ? `Xem chi tiết${more.length ? ` (+${more.length})` : ""}` : `Details${more.length ? ` (+${more.length})` : ""}`}</span>
            <span className="hidden group-open/details:inline">{vi ? "Thu gọn" : "Show less"}</span>
          </summary>
          <ul className="mt-3 space-y-2.5">
            {more.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-ink-muted leading-relaxed">
                <CheckIcon size={12} className="mt-1 w-3 h-3 text-brand-ink shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          {plan.paymentNote && <p className="mt-3 text-xs text-ink-muted">{plan.paymentNote}</p>}
        </details>
      )}

      <button
        onClick={() => onSelect(plan)}
        className={`mt-6 w-full py-3 px-4 rounded-sm font-mono text-xs uppercase tracking-wider font-bold inline-flex items-center justify-center gap-2 transition-colors focus-terminal cursor-pointer ${
          plan.recommended
            ? "bg-brand-orange text-[#090909] hover:shadow-[0_0_24px_rgba(255,106,0,0.35)]"
            : "border border-line text-ink hover:border-brand-orange/60 hover:text-brand-ink"
        }`}
      >
        {plan.buttonHref ? (vi ? "Xem các mẫu" : "Browse templates") : (vi ? "Nhận tư vấn" : "Get a quote")}
        <ArrowRightIcon size={14} className="w-3.5 h-3.5" />
      </button>
    </motion.article>
  );
}

export default function Pricing({ lang }: PricingProps) {
  const vi = lang === "vi";
  const plans = PRICING_DATA[lang];
  const projectPlans = plans.filter((p) => p.pricingType !== "hourly");
  const hourly = plans.find((p) => p.pricingType === "hourly");
  const milestones = vi
    ? [["30%", "Chốt yêu cầu và thiết kế"], ["40%", "Bản chạy thử"], ["30%", "Bàn giao và bảo hành"]]
    : [["30%", "Spec and design signed off"], ["40%", "Working staging build"], ["30%", "Launch and warranty"]];

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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
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
        <div className="mb-10 p-5 md:p-7 bg-surface/95 border border-brand-orange/30 rounded-sm flex flex-col xl:flex-row xl:items-center justify-between gap-6 shadow-2xl relative overflow-hidden group">
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

        {/* Plans side by side so price, timeline and warranty compare at a glance */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 pt-3">
          {projectPlans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} lang={lang} onSelect={handleSelectPlan} />
          ))}
        </div>

        {/* Hourly maintenance is for sites already live, so it gets a slim strip rather than a fifth card */}
        {hourly && (
          <div className="mt-5 bg-surface border border-line rounded-xl p-5 md:p-6 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
            <div className="flex items-center gap-3 shrink-0">
              <div className="p-2 rounded-sm bg-brand-orange/15 text-brand-ink border border-brand-orange/30">
                <ClockIcon size={18} className="w-[18px] h-[18px]" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-ink">{hourly.name}</h3>
                <div className="font-display font-bold text-xl text-brand-ink">{hourly.priceVnd}</div>
              </div>
            </div>
            <p className="text-sm text-ink-muted leading-relaxed flex-1">
              {hourly.paymentNote}. {hourly.priceUsd}.
            </p>
            <button
              onClick={() => handleSelectPlan(hourly)}
              className="shrink-0 py-3 px-5 rounded-sm border border-line text-ink hover:border-brand-orange/60 hover:text-brand-ink font-mono text-xs uppercase tracking-wider font-bold inline-flex items-center justify-center gap-2 transition-colors focus-terminal cursor-pointer"
            >
              {vi ? "Liên hệ bảo trì" : "Ask about maintenance"}
              <ArrowRightIcon size={14} className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Milestone payments for the custom-built plans */}
        <div className="mt-5 bg-surface border border-line rounded-xl p-5 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <div className="flex items-center gap-2 text-brand-ink font-mono text-xs uppercase tracking-wider font-bold shrink-0">
              <ShieldIcon size={16} className="w-4 h-4" />
              {vi ? "Thanh toán theo tiến độ" : "Pay by milestone"}
            </div>
            <ol className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
              {milestones.map(([pct, label]) => (
                <li key={label} className="flex items-baseline gap-2">
                  <span className="font-mono font-bold text-lg text-brand-ink">{pct}</span>
                  <span className="text-sm text-ink">{label}</span>
                </li>
              ))}
            </ol>
          </div>
          <p className="mt-4 text-xs text-ink-muted leading-relaxed">
            {vi
              ? "Áp dụng cho các gói làm riêng: không trả trước 100%, bạn nghiệm thu từng giai đoạn rồi mới thanh toán phần tiếp theo. Hết bảo hành, hỗ trợ tính theo giờ thực tế. "
              : "For custom-built plans: nothing is paid 100% upfront, you sign off each stage before paying for the next. After the warranty, support is billed by actual hours. "}
            {PRICE_NOTE[lang]}
          </p>
        </div>

      </div>
    </section>
  );
}
