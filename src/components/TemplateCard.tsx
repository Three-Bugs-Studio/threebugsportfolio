import React from "react";
import { TEMPLATES, TEMPLATE_CATEGORIES, TEMPLATE_CONTACT, Template, TemplateCategory } from "../templates";

type Lang = "vi" | "en";
export type TemplateFilter = TemplateCategory | "all";

export const countFor = (cat: TemplateFilter) => (cat === "all" ? TEMPLATES.length : TEMPLATES.filter((t) => t.cat === cat).length);

// Category chips shared by the /templates page and the homepage showcase.
export function TemplateChips({ lang, value, onChange }: { lang: Lang; value: TemplateFilter; onChange: (c: TemplateFilter) => void }) {
  const chips: { id: TemplateFilter; label: string }[] = [
    { id: "all", label: lang === "vi" ? "Tất cả" : "All" },
    ...TEMPLATE_CATEGORIES.map((c) => ({ id: c.id, label: c[lang] })),
  ];
  return (
    <div role="group" aria-label={lang === "vi" ? "Lọc theo ngành" : "Filter by industry"} className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap [scrollbar-width:none]">
      {chips.map((c) => {
        const active = value === c.id;
        return (
          <button
            key={c.id}
            type="button"
            onClick={() => onChange(c.id)}
            aria-pressed={active}
            className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm cursor-pointer transition-colors focus-terminal ${
              active ? "bg-brand-orange border-brand-orange text-[#090909] font-semibold" : "border-white/15 text-[#C0C0C5] hover:border-brand-orange/60"
            }`}
          >
            {c.label}
            <span className={`font-mono text-[11px] ${active ? "text-[#090909]/70" : "text-[#8E8E93]"}`}>{countFor(c.id)}</span>
          </button>
        );
      })}
    </div>
  );
}

export function TemplateCard({ t, lang }: { t: Template; lang: Lang }) {
  const vi = lang === "vi";
  const cat = TEMPLATE_CATEGORIES.find((c) => c.id === t.cat)!;
  return (
    <article className="group bg-[#121212] border border-white/10 rounded-xl overflow-hidden flex flex-col transition-colors hover:border-brand-orange/50">
      <a href={t.url} target="_blank" rel="noreferrer" className="block relative focus-terminal" aria-label={`${t.name}: ${vi ? "xem demo" : "live demo"}`}>
        <div className="aspect-[16/10] overflow-hidden bg-[#141414]">
          <img
            src={t.img}
            alt={`${t.name} — ${t.tag[lang]}`}
            loading="lazy"
            width={1440}
            height={900}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
        <span className="absolute top-3 left-3 rounded-full bg-[#090909]/80 backdrop-blur px-3 py-1 font-mono text-[10px] tracking-wider uppercase text-[#F5F5F3]">{cat[lang]}</span>
        <span className="absolute inset-0 flex items-center justify-center bg-[#090909]/55 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="rounded-full bg-[#F5F5F3] text-[#090909] px-5 py-2.5 font-mono text-xs uppercase tracking-widest">{vi ? "Xem demo ↗" : "Live demo ↗"}</span>
        </span>
      </a>
      <div className="p-5 md:p-6 flex flex-col gap-2 flex-1">
        <span className="text-xs text-brand-orange">{t.tag[lang]}</span>
        <h3 className="font-display font-bold text-xl md:text-2xl">{t.name}</h3>
        <p className="text-[#8E8E93] text-sm leading-relaxed line-clamp-3 flex-1">{t.desc[lang]}</p>
        <div className="grid grid-cols-2 gap-2 mt-3">
          <a href={t.url} target="_blank" rel="noreferrer" className="text-center text-sm px-3 py-2.5 border border-white/15 rounded-lg text-[#F5F5F3] hover:border-brand-orange/60 transition-colors focus-terminal">
            {vi ? "Xem demo" : "Live demo"}
          </a>
          <a
            href={`https://zalo.me/${TEMPLATE_CONTACT.phone}`}
            target="_blank"
            rel="noreferrer"
            className="text-center text-sm px-3 py-2.5 bg-brand-orange text-[#090909] font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(255,106,0,0.35)] transition-shadow focus-terminal"
          >
            {vi ? "Dùng mẫu này" : "Use this one"}
          </a>
        </div>
      </div>
    </article>
  );
}
