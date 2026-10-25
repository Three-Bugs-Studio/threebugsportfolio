import React, { useEffect, useState } from "react";
import Logo from "../components/Logo";
import aurelleImg from "@/assets/templates/aurelle-motors.jpg";
import voltlineImg from "@/assets/templates/voltline-garage.jpg";
import fortifyImg from "@/assets/fortifykitchen/fortify_homepage.webp";
import qmdImg from "@/assets/qmdtech/qmd_tech_homepage.webp";

type Lang = "vi" | "en";

const CONTACT = { name: "Hoàng Đỗ", phone: "0392996307", display: "0392.996.307" };

const TEMPLATES = [
  {
    id: "aurelle-motors",
    name: "Aurelle Motors",
    url: "https://aurelle-motors.vercel.app/",
    img: aurelleImg,
    tag: { vi: "Showroom ô tô cao cấp", en: "Luxury car showroom" },
    desc: {
      vi: "Giao diện tối giản, sang trọng với video nền toàn màn hình, trưng bày bộ sưu tập xe và đặt lịch xem xe.",
      en: "Minimal, premium layout with a full-screen video hero, a curated car collection and viewing bookings.",
    },
  },
  {
    id: "voltline-garage",
    name: "Voltline Garage",
    url: "https://voltline-garage.vercel.app/",
    img: voltlineImg,
    tag: { vi: "Gara & chăm sóc xe", en: "Garage & car care" },
    desc: {
      vi: "Website gara sửa chữa, bảo dưỡng và detailing với bảng dịch vụ, FAQ và nút đặt lịch hẹn trực tuyến.",
      en: "Garage site for servicing, repairs and detailing with a services list, FAQ and online booking.",
    },
  },
  {
    id: "fortify-kitchen",
    name: "Fortify Kitchen",
    url: "https://fortifykitchen.vercel.app/",
    img: fortifyImg,
    tag: { vi: "Nhà hàng & đặt món", en: "Restaurant & food ordering" },
    desc: {
      vi: "Website nhà hàng / bếp giao món với thực đơn, trang thông tin dinh dưỡng và luồng đặt món.",
      en: "Restaurant and delivery kitchen site with a menu, nutrition page and ordering flow.",
    },
  },
  {
    id: "qmd-tech",
    name: "QMD Tech",
    url: "https://qmd-tech.vercel.app/",
    img: qmdImg,
    tag: { vi: "Cửa hàng công nghệ / E-Commerce", en: "Tech store / E-Commerce" },
    desc: {
      vi: "Cửa hàng bán linh kiện, PC với danh mục sản phẩm, công cụ build cấu hình và thanh toán QR.",
      en: "Store for PCs and components with product catalogue, PC builder tool and QR payments.",
    },
  },
];

export default function Templates() {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem("three_bugs_lang") === "en" ? "en" : "vi"));
  const vi = lang === "vi";

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

      <main className="max-w-7xl mx-auto px-4 md:px-12 py-16 md:py-24">
        <div className="font-mono text-[10px] md:text-xs tracking-[0.3em] text-brand-orange uppercase">
          [SECTOR_T] {vi ? "Mẫu website có sẵn" : "Ready-made templates"}
        </div>
        <h1 className="font-display font-medium text-4xl md:text-6xl tracking-tighter mt-5 max-w-3xl leading-[1.05]">
          {vi ? "Chọn mẫu, chúng tôi tùy chỉnh cho thương hiệu của bạn." : "Pick a template, we tailor it to your brand."}
        </h1>
        <p className="text-[#8E8E93] text-base md:text-lg mt-6 max-w-2xl font-light leading-relaxed">
          {vi
            ? `Xem demo trực tiếp từng mẫu. Để biết giá và thời gian triển khai, liên hệ ${CONTACT.name}.`
            : `Open each live demo. For pricing and delivery time, contact ${CONTACT.name}.`}
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-14">
          {TEMPLATES.map((t) => (
            <article key={t.id} className="bg-[#121212] border border-white/10 border-t-2 border-t-brand-orange rounded-sm overflow-hidden flex flex-col">
              <a href={t.url} target="_blank" rel="noreferrer" className="block group" aria-label={`${t.name} demo`}>
                <div className="h-8 bg-[#141414] flex items-center gap-1.5 px-3 border-b border-white/5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                  <span className="ml-3 font-mono text-[10px] text-[#6E6E73] truncate">{t.url.replace("https://", "")}</span>
                </div>
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={t.img}
                    alt={`${t.name} — ${t.tag[lang]}`}
                    loading="lazy"
                    width={1440}
                    height={900}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              </a>
              <div className="p-6 md:p-8 flex flex-col gap-4 flex-1">
                <span className="font-mono text-[10px] tracking-widest uppercase text-brand-orange">{t.tag[lang]}</span>
                <h2 className="font-display font-bold text-2xl md:text-3xl">{t.name}</h2>
                <p className="text-[#8E8E93] text-sm md:text-base leading-relaxed flex-1">{t.desc[lang]}</p>
                <div className="flex flex-col sm:flex-row gap-3 mt-2">
                  <a
                    href={t.url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-stacked font-mono text-xs uppercase tracking-widest px-5 py-3 border border-white/15 text-[#F5F5F3] rounded-sm text-center hover:border-brand-orange/60 transition-colors focus-terminal"
                  >
                    {vi ? "Xem demo ↗" : "Live demo ↗"}
                  </a>
                  <a
                    href={`https://zalo.me/${CONTACT.phone}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-stacked font-mono text-xs uppercase tracking-widest px-5 py-3 bg-brand-orange text-[#090909] font-semibold rounded-sm text-center hover:shadow-[0_0_20px_rgba(255,106,0,0.35)] transition-shadow focus-terminal"
                  >
                    {vi ? `Hỏi giá · ${CONTACT.name}` : `Ask price · ${CONTACT.name}`}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

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
