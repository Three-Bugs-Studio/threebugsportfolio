import React, { useState } from "react";
import sketchImg from "@/assets/3bcad/sketch.webp";
import filletImg from "@/assets/3bcad/fillet.webp";
import evaluateImg from "@/assets/3bcad/evaluate.webp";
import printImg from "@/assets/3bcad/print.webp";
import demoImg from "@/assets/3binfrastructure/demo.webp";
import vpsImg from "@/assets/3binfrastructure/vps.webp";
import c4Img from "@/assets/3binfrastructure/c4.webp";
import subjectsImg from "@/assets/3binfrastructure/subjects.webp";

const CAD_REPO = "https://github.com/Three-Bugs-Studio/3bcad";

// Each feature is [title, description, screenshot alt text], in the same order as images.
const PRODUCTS = {
  "3bcad": {
    sectionId: "open-source",
    primaryHref: `${CAD_REPO}/releases/latest`,
    repo: CAD_REPO,
    images: [sketchImg, filletImg, evaluateImg, printImg],
    stack: ["Rust", "wgpu", "egui", "truck"],
    vi: {
      name: "3BCAD",
      heading: "3BCAD: phần mềm CAD 3D tham số, viết bằng Rust.",
      body: "Chúng tôi tự xây phần mềm thiết kế cơ khí từ đầu, cho kỹ sư, maker và cộng đồng in 3D. Dự án mở mã nguồn, chạy trên Windows, macOS và Linux.",
      primaryLabel: "Tải bản mới nhất ↗",
      note: "Bản phát triển sớm, tính năng và định dạng file có thể còn thay đổi.",
      features: [
        ["Sketch tham số", "Ràng buộc hình học, Smart Dimension, sketch tự giải khi đổi kích thước.", "Giao diện 3BCAD khi vẽ sketch trên mặt phẳng Top"],
        ["Dựng khối", "Extrude, Revolve, Fillet, Chamfer, Shell, Hole Wizard, Pattern, Mirror.", "Giao diện 3BCAD với lệnh Fillet bo cạnh khối hộp"],
        ["Cây tính năng", "Sửa lại bất kỳ bước nào, kéo rollback, đo đạc và tính khối lượng.", "Giao diện 3BCAD với cây tính năng và bảng Mass Properties"],
        ["Sẵn sàng in 3D", "Xuất STL, 3MF, STEP, gửi thẳng sang OrcaSlicer, Bambu Studio, PrusaSlicer.", "Tab 3D Print của 3BCAD với các nút xuất file và gửi sang slicer"],
      ],
    },
    en: {
      name: "3BCAD",
      heading: "3BCAD: parametric 3D CAD, written in Rust.",
      body: "We are building mechanical design software from the ground up, for engineers, makers and the 3D-printing community. The code is open, and it runs on Windows, macOS and Linux.",
      primaryLabel: "Download latest ↗",
      note: "Early release: features and file formats may still change.",
      features: [
        ["Parametric sketching", "Geometric relations, Smart Dimension and sketches that re-solve as sizes change.", "3BCAD while sketching on the Top plane"],
        ["Solid modelling", "Extrude, Revolve, Fillet, Chamfer, Shell, Hole Wizard, Pattern, Mirror.", "3BCAD with the Fillet command rounding an edge of a box"],
        ["Feature history", "Edit any step, drag the rollback bar, measure and check mass properties.", "3BCAD with the feature tree and the Mass Properties panel"],
        ["Ready for 3D printing", "Export STL, 3MF and STEP, or send straight to OrcaSlicer, Bambu Studio or PrusaSlicer.", "3BCAD's 3D Print tab with export and Send to Slicer buttons"],
      ],
    },
  },
  "3binfrastructure": {
    sectionId: "open-source-3binfrastructure",
    primaryHref: "https://3binfrastructure.vercel.app",
    repo: "https://github.com/Three-Bugs-Studio/3binfrastructure",
    images: [demoImg, vpsImg, c4Img, subjectsImg],
    stack: ["SvelteKit", "TypeScript", "SVG", "Vercel"],
    vi: {
      name: "3B Infrastructure",
      heading: "3B Infrastructure: sổ tay kỹ thuật phần mềm vẽ tay, có demo động.",
      body: "Chúng tôi giải thích kiến trúc hệ thống, cơ sở dữ liệu, AWS, DevOps và triển khai VPS bằng ngôn ngữ dễ hiểu. Mỗi chủ đề đều có demo để bạn tự bấm chạy, miễn phí và không cần đăng ký.",
      primaryLabel: "Mở website ↗",
      note: "Nội dung bằng tiếng Anh. Mã nguồn mở theo giấy phép MIT.",
      features: [
        ["Demo động", "123 chủ đề với nút chạy, tạm dừng và xem từng bước.", "Trang chủ 3B Infrastructure với sơ đồ vẽ tay và demo động"],
        ["Triển khai VPS", "Từng bước sau khi mua server, có lệnh cụ thể và demo bỏ qua so với thiết lập đúng.", "Demo database bị xóa và đòi tiền chuộc khi để lộ ra internet"],
        ["Sơ đồ C4", "Một cửa hàng online được vẽ qua đủ 4 cấp, từ Context đến Code.", "Sơ đồ C4 cấp Container của một cửa hàng online"],
        ["16 môn học", "Từ Toán kỹ thuật, C và C++ đến Arduino, Nuvoton và Raspberry Pi.", "Trang danh sách môn học của 3B Infrastructure"],
      ],
    },
    en: {
      name: "3B Infrastructure",
      heading: "3B Infrastructure: a hand-drawn software engineering notebook with animated demos.",
      body: "We explain system architecture, databases, AWS, DevOps and VPS deployment in plain language. Every topic has a demo you can play yourself, free and with no sign-up.",
      primaryLabel: "Open the site ↗",
      note: "Open source under the MIT licence.",
      features: [
        ["Animated demos", "123 topics you can play, pause and step through.", "The 3B Infrastructure home page with a hand-drawn system diagram"],
        ["VPS deployment", "Every step after buying a server, with commands and a demo of skipping it versus setting it up.", "A demo of an exposed database being wiped and held to ransom"],
        ["C4 diagrams", "One online shop drawn at all four levels, from Context to Code.", "A C4 Container diagram of an online shop"],
        ["16 subjects", "From engineering maths, C and C++ to Arduino, Nuvoton and Raspberry Pi.", "The 3B Infrastructure subjects page"],
      ],
    },
  },
};

export default function OpenSource({
  lang,
  product = "3bcad",
}: {
  lang: "vi" | "en";
  product?: keyof typeof PRODUCTS;
}) {
  const vi = lang === "vi";
  const [active, setActive] = useState(0);
  const { sectionId, primaryHref, repo, images, stack } = PRODUCTS[product];
  const { name, heading, body, primaryLabel, note, features } = PRODUCTS[product][lang];
  return (
    <section id={sectionId} className="py-20 md:py-28 bg-[#090909] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-12 grid lg:grid-cols-[5fr_7fr] gap-10 lg:gap-14 items-center">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-brand-orange">
            {vi ? "Sản phẩm của studio · Mã nguồn mở" : "Studio product · Open source"}
          </span>
          <h2 className="font-display font-medium text-4xl md:text-5xl tracking-tight text-[#F5F5F3] leading-[1.1] mt-4 [text-wrap:balance]">
            {heading}
          </h2>
          <p className="text-sm md:text-base text-[#8E8E93] font-light leading-relaxed mt-4 max-w-xl">{body}</p>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <a
              href={primaryHref}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs uppercase tracking-widest text-center px-6 py-3.5 bg-brand-orange text-[#090909] font-semibold rounded-sm hover:shadow-[0_0_24px_rgba(255,106,0,0.35)] transition-shadow focus-terminal"
            >
              {primaryLabel}
            </a>
            <a
              href={repo}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs uppercase tracking-widest text-center px-6 py-3.5 border border-white/15 rounded-sm text-[#F5F5F3] hover:border-brand-orange/60 transition-colors focus-terminal"
            >
              {vi ? "Mã nguồn trên GitHub ↗" : "Source on GitHub ↗"}
            </a>
          </div>
          <p className="text-xs text-[#8E8E93] mt-4">{note}</p>
          <p className="font-mono text-[11px] text-[#8E8E93] mt-2">{stack.join(" · ")}</p>
        </div>

        <div>
          <div className="border border-white/10 rounded-xl overflow-hidden bg-[#121212]">
            <img src={images[active]} alt={features[active][2]} loading="lazy" width={1400} height={900} className="w-full h-auto block" />
          </div>
          <div role="group" aria-label={vi ? `Tính năng của ${name}` : `${name} features`} className="grid sm:grid-cols-2 gap-3 mt-3">
            {features.map(([title, desc], i) => (
              <button
                key={title}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={active === i}
                className={`text-left p-4 rounded-xl border cursor-pointer transition-colors focus-terminal ${
                  active === i ? "border-brand-orange bg-brand-orange/10" : "border-white/10 hover:border-brand-orange/50"
                }`}
              >
                <span className="block font-display font-bold text-base text-[#F5F5F3]">{title}</span>
                <span className="block text-sm text-[#8E8E93] leading-relaxed mt-1">{desc}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
