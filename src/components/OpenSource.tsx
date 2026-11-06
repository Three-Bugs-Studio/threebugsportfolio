import React, { useEffect, useState } from "react";
import sketchImg from "@/assets/3bcad/sketch.webp";
import demoImg from "@/assets/3binfrastructure/demo.webp";

const CAD_REPO = "https://github.com/Three-Bugs-Studio/3bcad";

type Release = { tag: string; date: string; url: string };

// Latest GitHub release, read in the browser so a new 3BCAD release shows up without redeploying
// this site. On any failure (offline, rate limit of 60 req/h per visitor IP) it stays null and
// the card simply shows no version.
function useLatestRelease(repo?: string) {
  const [release, setRelease] = useState<Release | null>(null);
  useEffect(() => {
    if (!repo) return;
    const ctrl = new AbortController();
    fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
      signal: ctrl.signal,
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.tag_name) setRelease({ tag: d.tag_name, date: d.published_at, url: d.html_url });
      })
      .catch(() => {});
    return () => ctrl.abort();
  }, [repo]);
  return release;
}

type Copy = { name: string; heading: string; primaryLabel: string; note: string; alt: string; features: string[] };
type Product = {
  id: string;
  primaryHref: string;
  repo: string;
  releases?: string;
  image: string;
  stack: string[];
  vi: Copy;
  en: Copy;
};

const PRODUCTS: Product[] = [
  {
    id: "open-source",
    primaryHref: `${CAD_REPO}/releases/latest`,
    repo: CAD_REPO,
    releases: "Three-Bugs-Studio/3bcad",
    image: sketchImg,
    stack: ["Rust", "wgpu", "egui", "truck"],
    vi: {
      name: "3BCAD",
      heading: "Phần mềm CAD 3D tham số, viết bằng Rust.",
      primaryLabel: "Tải bản mới nhất",
      note: "Bản phát triển sớm, tính năng và định dạng file có thể còn thay đổi.",
      alt: "Giao diện 3BCAD khi vẽ sketch trên mặt phẳng Top",
      features: ["Sketch tham số", "Dựng khối", "Cây tính năng", "Xuất STL, 3MF, STEP"],
    },
    en: {
      name: "3BCAD",
      heading: "Parametric 3D CAD, written in Rust.",
      primaryLabel: "Download latest",
      note: "Early release: features and file formats may still change.",
      alt: "3BCAD while sketching on the Top plane",
      features: ["Parametric sketching", "Solid modelling", "Feature history", "STL, 3MF, STEP export"],
    },
  },
  {
    id: "open-source-3binfrastructure",
    primaryHref: "https://3binfrastructure.vercel.app",
    repo: "https://github.com/Three-Bugs-Studio/3binfrastructure",
    image: demoImg,
    stack: ["SvelteKit", "TypeScript", "SVG", "Vercel"],
    vi: {
      name: "3B Infrastructure",
      heading: "Sổ tay kỹ thuật phần mềm vẽ tay, có demo động.",
      primaryLabel: "Mở website",
      note: "Nội dung bằng tiếng Anh. Mã nguồn mở theo giấy phép MIT.",
      alt: "Trang chủ 3B Infrastructure với sơ đồ vẽ tay và demo động",
      features: ["123 demo động", "Triển khai VPS", "Sơ đồ C4", "16 môn học"],
    },
    en: {
      name: "3B Infrastructure",
      heading: "A hand-drawn software engineering notebook with animated demos.",
      primaryLabel: "Open the site",
      note: "Open source under the MIT licence.",
      alt: "The 3B Infrastructure home page with a hand-drawn system diagram",
      features: ["123 animated demos", "VPS deployment", "C4 diagrams", "16 subjects"],
    },
  },
];

function ProductCard({ product, index, lang }: { product: Product; index: number; lang: "vi" | "en" }) {
  const vi = lang === "vi";
  const c = product[lang];
  const release = useLatestRelease(product.releases);
  const releaseDate = release
    ? new Date(release.date).toLocaleDateString(vi ? "vi-VN" : "en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })
    : "";

  return (
    <article id={product.id} className="bg-canvas flex flex-col scroll-mt-24">
      <div className="flex items-center justify-between gap-4 px-5 md:px-6 py-3 border-b border-line font-mono text-xs uppercase tracking-[0.25em]">
        <span>
          <span className="text-brand-ink font-semibold">P-0{index + 1}</span>
          <span className="mx-3 text-ink-muted">/</span>
          <span className="text-ink">{c.name}</span>
        </span>
        {release && (
          <a
            href={release.url}
            target="_blank"
            rel="noreferrer"
            title={vi ? `Phát hành ${releaseDate}` : `Released ${releaseDate}`}
            className="text-ink-muted hover:text-brand-ink transition-colors focus-terminal"
          >
            {release.tag} · {releaseDate} ↗
          </a>
        )}
      </div>

      <img src={product.image} alt={c.alt} loading="lazy" width={1400} height={900} className="w-full aspect-[16/9] object-cover object-top border-b border-line" />

      <div className="p-5 md:p-6 flex flex-col gap-5 flex-1">
        <h3 className="font-display font-semibold text-xl md:text-2xl tracking-tight text-ink leading-snug [text-wrap:balance]">{c.heading}</h3>

        <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-ink-muted">
          {c.features.map((f) => (
            <li key={f} className="flex gap-2">
              <span className="text-brand-ink" aria-hidden="true">—</span>
              {f}
            </li>
          ))}
        </ul>

        <p className="font-mono text-xs text-ink-muted">{product.stack.join(" · ")}</p>

        <div className="mt-auto flex flex-col sm:flex-row gap-3 pt-1">
          <a
            href={release?.url ?? product.primaryHref}
            target="_blank"
            rel="noreferrer"
            className="btn-stacked font-mono text-xs uppercase tracking-widest text-center px-5 py-3 bg-brand-orange text-[#090909] font-semibold focus-terminal"
          >
            {release ? (vi ? `Tải ${release.tag}` : `Download ${release.tag}`) : c.primaryLabel} ↗
          </a>
          <a
            href={product.repo}
            target="_blank"
            rel="noreferrer"
            className="btn-stacked font-mono text-xs uppercase tracking-widest text-center px-5 py-3 border border-line text-ink focus-terminal"
          >
            GitHub ↗
          </a>
        </div>
        <p className="text-xs text-ink-muted -mt-1">{c.note}</p>
      </div>
    </article>
  );
}

// Studio products: both open-source projects as two compact "product file" cards side by side.
export default function OpenSource({ lang }: { lang: "vi" | "en" }) {
  const vi = lang === "vi";
  return (
    <section className="py-20 md:py-24 bg-canvas">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-brand-ink">
              {vi ? "Sản phẩm của studio · Mã nguồn mở" : "Studio products · Open source"}
            </span>
            <h2 className="font-display font-semibold text-3xl md:text-5xl tracking-tight text-ink leading-[1.1] mt-4 [text-wrap:balance]">
              {vi ? "Ngoài làm cho khách, chúng tôi tự xây sản phẩm." : "Beyond client work, we build our own products."}
            </h2>
          </div>
          <p className="text-sm md:text-base text-ink-muted font-light leading-relaxed max-w-sm">
            {vi ? "Hai dự án mở mã nguồn, phát triển công khai trên GitHub." : "Two open-source projects, developed in the open on GitHub."}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-px bg-line border border-line">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}
