import React, { useEffect, useMemo, useState } from "react";
import Logo from "../components/Logo";
import { TemplateCard, TemplateChips, TemplateFilter } from "../components/TemplateCard";
import { TEMPLATES, TEMPLATE_CATEGORIES, TEMPLATE_CONTACT as CONTACT } from "../templates";

type Lang = "vi" | "en";

const initialCat = (): TemplateFilter => {
  const c = new URLSearchParams(window.location.search).get("cat");
  return TEMPLATE_CATEGORIES.some((x) => x.id === c) ? (c as TemplateFilter) : "all";
};

export default function Templates() {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem("three_bugs_lang") === "en" ? "en" : "vi"));
  const vi = lang === "vi";
  const [cat, setCat] = useState<TemplateFilter>(initialCat);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const url = new URL(window.location.href);
    if (cat === "all") url.searchParams.delete("cat");
    else url.searchParams.set("cat", cat);
    window.history.replaceState(null, "", url);
  }, [cat]);

  const shown = useMemo(() => {
    // Short terms must match a whole word ("xe" finds cars, not "xem"); longer ones may match a word start.
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    return TEMPLATES.filter((t) => {
      if (cat !== "all" && t.cat !== cat) return false;
      const words = `${t.name} ${t.tag.vi} ${t.tag.en} ${t.desc[lang]}`.toLowerCase().split(/[\s/,.:()&+–-]+/);
      return terms.every((q) => words.some((w) => w === q || (q.length > 2 && w.startsWith(q))));
    });
  }, [cat, query, lang]);

  useEffect(() => {
    localStorage.setItem("three_bugs_lang", lang);
    document.documentElement.lang = lang;
    document.title = vi ? "Mẫu Website | Three Bugs Studio" : "Website Templates | Three Bugs Studio";
  }, [lang, vi]);

  return (
    <div className="min-h-screen bg-[#090909] text-[#F5F5F3] font-sans selection:bg-brand-orange selection:text-[#090909]">
      <header className="sticky top-0 z-40 bg-[#090909]/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-3.5 flex items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-3 focus-terminal" aria-label="Three Bugs Studio">
            <Logo size="sm" showText={false} />
            <span className="font-mono text-xs tracking-widest text-[#8E8E93] hover:text-[#F5F5F3] transition-colors">
              ← {vi ? "TRANG CHỦ" : "HOME"}
            </span>
          </a>
          <div className="flex items-center border border-white/10 rounded-sm overflow-hidden font-mono text-[10px] tracking-wider">
            {(["vi", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`px-2.5 py-1.5 uppercase cursor-pointer ${lang === l ? "bg-brand-orange text-[#090909]" : "text-[#8E8E93] hover:text-white"}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-12 py-14 md:py-20">
        <div className="font-mono text-[10px] md:text-xs tracking-[0.3em] text-brand-orange uppercase">
          [SECTOR_T] {vi ? `${TEMPLATES.length} mẫu website có sẵn` : `${TEMPLATES.length} ready-made templates`}
        </div>
        <h1 className="font-display font-medium text-4xl md:text-6xl tracking-tighter mt-5 max-w-3xl leading-[1.05]">
          {vi ? "Chọn mẫu, chúng tôi tùy chỉnh cho thương hiệu của bạn." : "Pick a template, we tailor it to your brand."}
        </h1>
        <p className="text-[#8E8E93] text-base md:text-lg mt-6 max-w-2xl font-light leading-relaxed">
          {vi
            ? `Lọc theo ngành, mở demo chạy thật để trải nghiệm. Ưng mẫu nào, nhắn ${CONTACT.name} để nhận báo giá.`
            : `Filter by industry and try each live demo. Found one you like? Message ${CONTACT.name} for a quote.`}
        </p>

        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-10">
          {(vi
            ? [["Từ 2,5 triệu", "hoặc trả theo tháng"], ["2–3 ngày", "làm việc là có web"], ["Theo thương hiệu", "thay logo, màu, nội dung"], ["2 lượt chỉnh sửa", "trước khi bàn giao"]]
            : [["From 2.5M VND", "or pay monthly"], ["2–3 days", "working days to launch"], ["Your brand", "logo, colours, content"], ["2 revisions", "before handover"]]
          ).map(([big, small]) => (
            <li key={big} className="bg-[#121212] border border-white/10 rounded-xl p-4 md:p-5">
              <div className="font-display font-bold text-lg md:text-2xl text-[#F5F5F3]">{big}</div>
              <div className="text-[#8E8E93] text-xs md:text-sm mt-1">{small}</div>
            </li>
          ))}
        </ul>

        <ol className="grid md:grid-cols-3 gap-3 mt-3">
          {(vi
            ? ["Chọn mẫu và xem demo", "Gửi logo, nội dung, hình ảnh qua Zalo", "Nhận website sau 2–3 ngày làm việc"]
            : ["Pick a template and try the demo", "Send your logo, copy and photos on Zalo", "Get your site in 2–3 working days"]
          ).map((step, i) => (
            <li key={step} className="flex items-center gap-4 border border-white/10 rounded-xl px-4 py-3.5">
              <span className="shrink-0 w-8 h-8 rounded-full bg-brand-orange text-[#090909] font-mono font-bold text-sm flex items-center justify-center">{i + 1}</span>
              <span className="text-sm md:text-base text-[#C0C0C5]">{step}</span>
            </li>
          ))}
        </ol>

        <div className="sticky top-[57px] z-30 -mx-4 px-4 md:-mx-12 md:px-12 py-4 mt-12 bg-[#090909]/90 backdrop-blur-xl border-b border-white/10 flex flex-col lg:flex-row lg:items-center gap-3">
          <div className="flex-1 min-w-0">
            <TemplateChips lang={lang} value={cat} onChange={setCat} />
          </div>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={vi ? "Tìm theo ngành: spa, xe, nhà hàng…" : "Search: spa, cars, restaurant…"}
            aria-label={vi ? "Tìm mẫu website" : "Search templates"}
            className="w-full lg:w-72 bg-[#121212] border border-white/15 rounded-full px-4 py-2 text-sm text-[#F5F5F3] placeholder:text-[#6E6E73] focus:outline-none focus:border-brand-orange/60"
          />
        </div>

        <p className="text-[#8E8E93] text-sm mt-6" aria-live="polite">
          {vi ? `Hiển thị ${shown.length} / ${TEMPLATES.length} mẫu` : `Showing ${shown.length} of ${TEMPLATES.length} templates`}
        </p>

        {shown.length ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mt-4">
            {shown.map((t) => (
              <TemplateCard key={t.id} t={t} lang={lang} />
            ))}
          </div>
        ) : (
          <div className="mt-6 border border-dashed border-white/15 rounded-xl p-10 text-center">
            <p className="text-[#C0C0C5]">{vi ? "Chưa có mẫu phù hợp." : "No matching template yet."}</p>
            <button
              type="button"
              onClick={() => { setCat("all"); setQuery(""); }}
              className="mt-4 text-sm px-4 py-2 border border-white/15 rounded-full hover:border-brand-orange/60 cursor-pointer focus-terminal"
            >
              {vi ? "Xem tất cả mẫu" : "Show all templates"}
            </button>
          </div>
        )}

        <p className="text-[#8E8E93] text-sm mt-10">
          {vi ? "Không thấy ngành của bạn? " : "Don't see your industry? "}
          <a href={`https://zalo.me/${CONTACT.phone}`} target="_blank" rel="noreferrer" className="text-brand-orange underline underline-offset-4">
            {vi ? `Nhắn ${CONTACT.name}, bên em thiết kế riêng theo yêu cầu.` : `Message ${CONTACT.name} for a custom design.`}
          </a>
        </p>

        <section className="mt-16 border border-white/10 bg-[#0c0c0c] rounded-sm p-6 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="font-mono text-[10px] tracking-widest uppercase text-[#8E8E93]">
              {vi ? "Báo giá mẫu website" : "Template pricing"}
            </div>
            <div className="font-display text-2xl md:text-3xl mt-2">
              {CONTACT.name} · <span className="text-brand-orange">{CONTACT.display}</span>
            </div>
          </div>
          <div className="flex gap-3">
            <a href={`tel:${CONTACT.phone}`} className="font-mono text-xs uppercase tracking-widest px-5 py-3 border border-white/15 rounded-sm hover:border-brand-orange/60 transition-colors focus-terminal">
              {vi ? "Gọi ngay" : "Call"}
            </a>
            <a href={`https://zalo.me/${CONTACT.phone}`} target="_blank" rel="noreferrer" className="font-mono text-xs uppercase tracking-widest px-5 py-3 bg-brand-orange text-[#090909] font-semibold rounded-sm focus-terminal">
              Zalo
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
