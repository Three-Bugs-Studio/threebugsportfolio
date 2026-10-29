import React, { useState } from "react";
import { TemplateCard, TemplateChips, TemplateFilter, countFor } from "./TemplateCard";
import { TEMPLATES } from "../templates";

// Homepage teaser for /templates: same filter chips, up to 6 cards, then a link to the full page.
const FEATURED = ["tieucu", "langspa", "vanlo", "senoi", "aurelle-motors", "nepnha"];
const LIMIT = 6;

export default function TemplatesShowcase({ lang }: { lang: "vi" | "en" }) {
  const vi = lang === "vi";
  const [cat, setCat] = useState<TemplateFilter>("all");
  const list =
    cat === "all"
      ? FEATURED.map((id) => TEMPLATES.find((t) => t.id === id)!).filter(Boolean)
      : TEMPLATES.filter((t) => t.cat === cat).slice(0, LIMIT);
  const more = `/templates${cat === "all" ? "" : `?cat=${cat}`}`;

  return (
    <section id="templates" className="py-20 md:py-28 bg-[#090909] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-brand-orange">
              {vi ? `${TEMPLATES.length} mẫu website có sẵn` : `${TEMPLATES.length} ready-made templates`}
            </span>
            <h2 className="font-display font-medium text-4xl md:text-5xl tracking-tight text-[#F5F5F3] leading-[1.1] mt-4 [text-wrap:balance]">
              {vi ? (
                <>Có website trong <span className="whitespace-nowrap">2–3 ngày</span>, chỉ từ 2,5 triệu.</>
              ) : (
                <>Launch in <span className="whitespace-nowrap">2–3 days</span>, from 2.5M VND.</>
              )}
            </h2>
            <p className="text-sm md:text-base text-[#8E8E93] font-light leading-relaxed mt-4 max-w-xl">
              {vi
                ? "Chọn mẫu theo ngành của bạn, xem demo chạy thật. Chúng tôi thay logo, màu và nội dung theo thương hiệu."
                : "Pick a template for your industry and try the live demo. We swap in your logo, colours and content."}
            </p>
          </div>
          <a
            href={more}
            className="hidden lg:inline-flex shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-widest px-6 py-3.5 border border-white/15 rounded-sm text-[#F5F5F3] hover:border-brand-orange/60 transition-colors focus-terminal"
          >
            {vi ? `Xem tất cả ${countFor(cat)} mẫu →` : `See all ${countFor(cat)} →`}
          </a>
        </div>

        <div className="mt-10">
          <TemplateChips lang={lang} value={cat} onChange={setCat} />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mt-6">
          {list.map((t) => (
            <TemplateCard key={t.id} t={t} lang={lang} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href={more}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest px-8 py-4 bg-brand-orange text-[#090909] font-semibold rounded-sm hover:shadow-[0_0_24px_rgba(255,106,0,0.35)] transition-shadow focus-terminal"
          >
            {vi ? `Xem tất cả ${countFor(cat)} mẫu →` : `See all ${countFor(cat)} templates →`}
          </a>
        </div>
      </div>
    </section>
  );
}
