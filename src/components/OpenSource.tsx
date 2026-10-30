import React from "react";

const REPO = "https://github.com/Three-Bugs-Studio/3bcad";

const FEATURES = {
  vi: [
    ["Sketch tham số", "Ràng buộc hình học, Smart Dimension, sketch tự giải khi đổi kích thước."],
    ["Dựng khối", "Extrude, Revolve, Fillet, Chamfer, Shell, Hole Wizard, Pattern, Mirror."],
    ["Cây tính năng", "Sửa lại bất kỳ bước nào, kéo rollback, đo đạc và tính khối lượng."],
    ["Sẵn sàng in 3D", "Xuất STL, 3MF, STEP, gửi thẳng sang OrcaSlicer, Bambu Studio, PrusaSlicer."],
  ],
  en: [
    ["Parametric sketching", "Geometric relations, Smart Dimension and sketches that re-solve as sizes change."],
    ["Solid modelling", "Extrude, Revolve, Fillet, Chamfer, Shell, Hole Wizard, Pattern, Mirror."],
    ["Feature history", "Edit any step, drag the rollback bar, measure and check mass properties."],
    ["Ready for 3D printing", "Export STL, 3MF and STEP, or send straight to OrcaSlicer, Bambu Studio or PrusaSlicer."],
  ],
};
const STACK = ["Rust", "wgpu", "egui", "truck"];

// Isometric projection of a part in millimetres, centred in the 560x420 viewBox.
const iso = (x: number, y: number, z: number) => [280 + (x - y) * 0.866, 225 + (x + y) * 0.5 - z] as const;
const poly = (pts: [number, number, number][]) => pts.map((p) => iso(...p).join(",")).join(" ");
// A circle of radius r on a horizontal plane projects to an ellipse with these semi-axes.
const Ring = ({ x, y, z, r, ...rest }: { x: number; y: number; z: number; r: number } & React.SVGProps<SVGEllipseElement>) => {
  const [cx, cy] = iso(x, y, z);
  return <ellipse cx={cx} cy={cy} rx={r * 1.2247} ry={r * 0.7071} {...rest} />;
};

const LINE = { stroke: "#FF6A00", strokeWidth: 1.6, strokeLinejoin: "round" as const };

// Illustration only, not an app screenshot: a flanged part with dimensions, in the brand's wireframe style.
function PartIllustration({ alt }: { alt: string }) {
  const [hw, hd, th] = [150, 110, 34]; // plate half-width, half-depth, thickness
  const bossTop = 112;
  const [bx, by] = iso(0, 0, th);
  const [tx, ty] = iso(0, 0, bossTop);
  const rx = 62 * 1.2247;
  return (
    <svg viewBox="0 0 560 420" role="img" aria-label={alt} className="w-full h-auto block">
      <defs>
        <pattern id="cad-grid" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M28 0H0V28" fill="none" stroke="#ffffff" strokeOpacity="0.05" />
        </pattern>
      </defs>
      <rect width="560" height="420" fill="url(#cad-grid)" />

      <polygon points={poly([[-hw, hd, 0], [hw, hd, 0], [hw, hd, th], [-hw, hd, th]])} fill="#1b130d" {...LINE} />
      <polygon points={poly([[hw, -hd, 0], [hw, hd, 0], [hw, hd, th], [hw, -hd, th]])} fill="#26190f" {...LINE} />
      <polygon points={poly([[-hw, -hd, th], [hw, -hd, th], [hw, hd, th], [-hw, hd, th]])} fill="#33200f" {...LINE} />

      {[[-112, -72], [112, -72], [-112, 72], [112, 72]].map(([x, y]) => (
        <Ring key={`${x},${y}`} x={x} y={y} z={th} r={13} fill="#0b0b0e" {...LINE} />
      ))}

      <Ring x={0} y={0} z={th} r={62} fill="#26190f" {...LINE} />
      <path d={`M${bx - rx} ${by}V${ty}M${bx + rx} ${by}V${ty}`} {...LINE} />
      <rect x={bx - rx + 1} y={ty} width={rx * 2 - 2} height={by - ty} fill="#26190f" />
      <Ring x={0} y={0} z={bossTop} r={62} fill="#3d2610" {...LINE} />
      <Ring x={0} y={0} z={bossTop} r={32} fill="#0b0b0e" {...LINE} />

      <g stroke="#F5F5F3" strokeOpacity="0.55" strokeWidth="1" fontFamily="ui-monospace, monospace" fontSize="13">
        <path d={`M${bx - rx} ${ty - 44}H${bx + rx}M${bx - rx} ${ty - 50}V${ty - 8}M${bx + rx} ${ty - 50}V${ty - 8}`} fill="none" />
        <text x={bx} y={ty - 52} textAnchor="middle" fill="#F5F5F3" stroke="none">Ø124</text>
        <path d={`M${iso(hw, hd, 0)[0] + 22} ${iso(hw, hd, 0)[1]}v${-th}`} fill="none" />
        <text x={iso(hw, hd, 0)[0] + 30} y={iso(hw, hd, 0)[1] - 12} fill="#F5F5F3" stroke="none">{th}</text>
      </g>

      <g strokeWidth="2" fontFamily="ui-monospace, monospace" fontSize="12">
        <path d="M46 374l30 17" stroke="#FF5F56" />
        <path d="M46 374l-30 17" stroke="#27C93F" />
        <path d="M46 374v-34" stroke="#4DA3FF" />
      </g>
    </svg>
  );
}

export default function OpenSource({ lang }: { lang: "vi" | "en" }) {
  const vi = lang === "vi";
  return (
    <section id="open-source" className="py-20 md:py-28 bg-[#090909] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-12 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-brand-orange">
            {vi ? "Sản phẩm của studio · Mã nguồn mở" : "Studio product · Open source"}
          </span>
          <h2 className="font-display font-medium text-4xl md:text-5xl tracking-tight text-[#F5F5F3] leading-[1.1] mt-4 [text-wrap:balance]">
            {vi ? "3BCAD: phần mềm CAD 3D tham số, viết bằng Rust." : "3BCAD: parametric 3D CAD, written in Rust."}
          </h2>
          <p className="text-sm md:text-base text-[#8E8E93] font-light leading-relaxed mt-4 max-w-xl">
            {vi
              ? "Chúng tôi tự xây phần mềm thiết kế cơ khí từ đầu, cho kỹ sư, maker và cộng đồng in 3D. Dự án mở mã nguồn, chạy trên Windows, macOS và Linux."
              : "We are building mechanical design software from the ground up, for engineers, makers and the 3D-printing community. The code is open, and it runs on Windows, macOS and Linux."}
          </p>

          <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-5 mt-8">
            {FEATURES[lang].map(([title, desc]) => (
              <div key={title}>
                <dt className="font-display font-bold text-lg text-[#F5F5F3]">{title}</dt>
                <dd className="text-sm text-[#8E8E93] leading-relaxed mt-1">{desc}</dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <a
              href={`${REPO}/releases/latest`}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs uppercase tracking-widest text-center px-6 py-3.5 bg-brand-orange text-[#090909] font-semibold rounded-sm hover:shadow-[0_0_24px_rgba(255,106,0,0.35)] transition-shadow focus-terminal"
            >
              {vi ? "Tải bản mới nhất ↗" : "Download latest ↗"}
            </a>
            <a
              href={REPO}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs uppercase tracking-widest text-center px-6 py-3.5 border border-white/15 rounded-sm text-[#F5F5F3] hover:border-brand-orange/60 transition-colors focus-terminal"
            >
              {vi ? "Mã nguồn trên GitHub ↗" : "Source on GitHub ↗"}
            </a>
          </div>
          <p className="text-xs text-[#8E8E93] mt-4">
            {vi ? "Bản phát triển sớm, tính năng và định dạng file có thể còn thay đổi." : "Early release: features and file formats may still change."}
          </p>
        </div>

        <figure className="border border-white/10 rounded-xl overflow-hidden">
          {/* Inline colour: the part is drawn on dark in both site themes. */}
          <div style={{ background: "#0b0b0e" }}>
            <PartIllustration alt={vi ? "Hình minh họa một chi tiết cơ khí dạng khung dây màu cam" : "Orange wireframe illustration of a mechanical part"} />
          </div>
          <figcaption className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-[#121212] border-t border-white/10">
            <span className="text-xs text-[#8E8E93]">{vi ? "Hình minh họa" : "Illustration"}</span>
            <span className="font-mono text-[11px] text-[#8E8E93]">{STACK.join(" · ")}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
