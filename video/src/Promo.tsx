import React from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont as loadDisplay } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadMono } from "@remotion/google-fonts/IBMPlexMono";

const display = loadDisplay("normal", { weights: ["500", "700"], subsets: ["latin", "vietnamese"] }).fontFamily;
const mono = loadMono("normal", { weights: ["400", "600"], subsets: ["latin", "vietnamese"] }).fontFamily;

const ORANGE = "#FF6A00";
const BG = "#090909";
const TEXT = "#F5F5F3";
const MUTED = "#8E8E93";
const S = 60; // frames per second

// Scene timings in seconds: [start, length]
const SCENES = {
  boot: [0, 4],
  headline: [4, 5],
  services: [9, 8],
  work: [17, 7.5],
  cta: [24.5, 5.5],
} as const;
export const PROMO_FRAMES = 30 * S;

const ease = Easing.bezier(0.16, 1, 0.3, 1);

// Fade + rise in at `delay` frames, fade out over the last 20 frames of `dur`.
const useReveal = (delay: number, dur?: number) => {
  const f = useCurrentFrame();
  const inP = interpolate(f, [delay, delay + 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  const out = dur ? interpolate(f, [dur - 20, dur], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 1;
  return { opacity: inP * out, transform: `translateY(${(1 - inP) * 40}px)` };
};

const DotGrid: React.FC = () => {
  const f = useCurrentFrame();
  const { width, height } = useVideoConfig();
  // A sonar ring sweeps out from the hero area every 4 seconds, like the website's hero.
  const age = (f % (4 * S)) / S;
  const radius = age * 700;
  const cx = width * 0.7;
  const cy = height * 0.35;
  const dots: React.ReactNode[] = [];
  const gap = 40;
  for (let x = gap / 2; x < width; x += gap) {
    for (let y = gap / 2; y < height; y += gap) {
      const d = Math.abs(Math.hypot(x - cx, y - cy) - radius);
      const e = d < 120 ? (1 - d / 120) * (1 - age / 4) : 0;
      dots.push(<circle key={`${x}-${y}`} cx={x} cy={y} r={2 + e * 3} fill={ORANGE} opacity={0.18 + e * 0.7} />);
    }
  }
  return (
    <svg width={width} height={height} style={{ position: "absolute", inset: 0 }}>
      {dots}
    </svg>
  );
};

const Label: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{ fontFamily: mono, fontSize: 24, letterSpacing: "0.3em", color: ORANGE, textTransform: "uppercase", ...style }}>
    {children}
  </div>
);

const Boot: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cmd = "> npm run three-bugs-studio";
  const typed = cmd.slice(0, Math.floor(interpolate(f, [10, 70], [0, cmd.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })));
  const logo = spring({ frame: f - 80, fps, config: { damping: 14 } });
  const fade = interpolate(f, [4 * S - 20, 4 * S], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: fade }}>
      <div style={{ fontFamily: mono, fontSize: 34, color: MUTED, position: "absolute", top: 380 }}>
        {typed}
        <span style={{ color: ORANGE, opacity: Math.floor(f / 20) % 2 ? 0 : 1 }}>▌</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 40, opacity: logo, transform: `scale(${0.8 + logo * 0.2})`, marginTop: 120 }}>
        <Img src={staticFile("ThreeBugsStudio.webp")} style={{ width: 170, height: 170, borderRadius: 28, border: `2px solid ${ORANGE}55` }} />
        <div>
          <div style={{ fontFamily: display, fontWeight: 700, fontSize: 96, color: TEXT, letterSpacing: "0.12em", lineHeight: 1 }}>THREE BUGS</div>
          <Label style={{ fontSize: 34, marginTop: 14, letterSpacing: "0.6em" }}>Studio</Label>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Headline: React.FC = () => {
  const dur = SCENES.headline[1] * S;
  return (
    <AbsoluteFill style={{ justifyContent: "center", paddingLeft: 160 }}>
      <Label style={useReveal(0, dur)}>[SECTOR_00] · TP.HCM · 100% Remote</Label>
      <div style={{ fontFamily: display, fontWeight: 500, fontSize: 150, lineHeight: 1.05, letterSpacing: "-0.03em", marginTop: 30 }}>
        <div style={{ color: TEXT, ...useReveal(12, dur) }}>Chúng tôi xây dựng</div>
        <div style={{ color: MUTED, ...useReveal(30, dur) }}>website và phần mềm.</div>
      </div>
    </AbsoluteFill>
  );
};

const SERVICES = [
  ["01", "Thiết Kế Sản Phẩm", "UI/UX rõ ràng, tập trung trải nghiệm thật"],
  ["02", "Phát Triển Website", "Tải nhanh, chuẩn SEO, mọi thiết bị"],
  ["03", "Full Stack & Backend", "Golang · FastAPI · NestJS"],
  ["04", "Tích Hợp AI", "Đưa LLM vào hệ thống của bạn"],
  ["05", "Vận Hành & Vá Lỗi", "Bảo trì và hotfix lâu dài"],
] as const;

const Services: React.FC = () => {
  const dur = SCENES.services[1] * S;
  return (
    <AbsoluteFill style={{ padding: "130px 160px" }}>
      <Label style={useReveal(0, dur)}>[SECTOR_02] Dịch vụ</Label>
      <div style={{ fontFamily: display, fontWeight: 500, fontSize: 84, color: TEXT, marginTop: 20, letterSpacing: "-0.02em", ...useReveal(8, dur) }}>
        Từ ý tưởng đến vận hành.
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28, marginTop: 70 }}>
        {SERVICES.map(([n, title, desc], i) => (
          <div
            key={n}
            style={{
              background: "#121212",
              border: "1px solid #ffffff1a",
              borderTop: `3px solid ${ORANGE}`,
              padding: "34px 36px",
              ...useReveal(30 + i * 14, dur),
            }}
          >
            <div style={{ fontFamily: mono, fontSize: 22, color: ORANGE }}>{n} //</div>
            <div style={{ fontFamily: display, fontWeight: 700, fontSize: 42, color: TEXT, marginTop: 14 }}>{title}</div>
            <div style={{ fontFamily: mono, fontSize: 22, color: MUTED, marginTop: 12 }}>{desc}</div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const PROJECTS = [
  ["fortify_homepage.webp", "Fortify Kitchen", "Giao tại TP.HCM · Đang bảo trì"],
  ["qmd_tech_homepage.webp", "QMD Tech", "Hỏa tốc Hà Nội 2H · Đang vận hành"],
  ["storepage.webp", "Sukajan Store", "SEO 98% · 15.000+ truy cập"],
] as const;

const Work: React.FC = () => {
  const f = useCurrentFrame();
  const dur = SCENES.work[1] * S;
  const per = dur / PROJECTS.length;
  const i = Math.min(PROJECTS.length - 1, Math.floor(f / per));
  const local = f - i * per;
  const [img, title, metric] = PROJECTS[i];
  const enter = interpolate(local, [0, 30], [0, 1], { extrapolateRight: "clamp", easing: ease });
  const leave = interpolate(local, [per - 18, per], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const zoom = interpolate(local, [0, per], [1.04, 1]);
  return (
    <AbsoluteFill style={{ padding: "110px 160px", flexDirection: "row", alignItems: "center", gap: 80 }}>
      <div style={{ width: 620 }}>
        <Label>[SECTOR_03] Dự án tiêu biểu</Label>
        <div style={{ opacity: enter * leave, transform: `translateX(${(1 - enter) * -40}px)` }}>
          <div style={{ fontFamily: mono, fontSize: 26, color: MUTED, marginTop: 50 }}>0{i + 1} / 0{PROJECTS.length}</div>
          <div style={{ fontFamily: display, fontWeight: 700, fontSize: 92, color: TEXT, lineHeight: 1.05, marginTop: 16 }}>{title}</div>
          <div style={{ fontFamily: mono, fontSize: 28, color: ORANGE, marginTop: 28, padding: "10px 18px", border: `1px solid ${ORANGE}66`, display: "inline-block" }}>
            {metric}
          </div>
        </div>
      </div>
      <div style={{ flex: 1, height: 760, overflow: "hidden", border: "1px solid #ffffff22", boxShadow: "0 40px 80px #000a", opacity: enter * leave }}>
        <div style={{ height: 44, background: "#141414", display: "flex", alignItems: "center", gap: 10, paddingLeft: 18 }}>
          {["#FF5F56", "#FFBD2E", "#27C93F"].map((c) => (
            <div key={c} style={{ width: 14, height: 14, borderRadius: 7, background: c }} />
          ))}
        </div>
        <Img src={staticFile(img)} style={{ width: "100%", height: 716, objectFit: "cover", objectPosition: "top", transform: `scale(${zoom})`, transformOrigin: "top" }} />
      </div>
    </AbsoluteFill>
  );
};

const Cta: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: f - 40, fps, config: { damping: 12 } });
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", textAlign: "center" }}>
      <Label style={{ fontSize: 30, ...useReveal(0) }}>Every bug teaches. Every build improves.</Label>
      <div style={{ fontFamily: display, fontWeight: 500, fontSize: 120, color: TEXT, marginTop: 40, letterSpacing: "-0.03em", ...useReveal(14) }}>
        Bắt đầu dự án của bạn.
      </div>
      <div
        style={{
          marginTop: 70,
          fontFamily: mono,
          fontWeight: 600,
          fontSize: 48,
          color: BG,
          background: ORANGE,
          padding: "24px 56px",
          letterSpacing: "0.1em",
          transform: `scale(${pop})`,
          boxShadow: `0 0 ${40 + Math.sin(f / 10) * 15}px ${ORANGE}88`,
        }}
      >
        3bstudio.me →
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 70, ...useReveal(70) }}>
        <Img src={staticFile("ThreeBugsStudio.webp")} style={{ width: 64, height: 64, borderRadius: 12 }} />
        <span style={{ fontFamily: mono, fontSize: 26, color: MUTED, letterSpacing: "0.3em" }}>THREE BUGS STUDIO</span>
      </div>
    </AbsoluteFill>
  );
};

const at = ([start, len]: readonly [number, number]) => ({ from: Math.round(start * S), durationInFrames: Math.round(len * S) });

// Sound cues, in frames, synced to the animations above.
const sec = (k: keyof typeof SCENES) => Math.round(SCENES[k][0] * S);
const CUES: [string, number, number][] = [
  // Typing the boot command (frames 10-70)
  ...Array.from({ length: 15 }, (_, i) => ["key.wav", 10 + i * 4, 0.5] as [string, number, number]),
  ["boot.wav", 80, 0.6],
  // Whoosh slightly ahead of each scene change
  ...(["headline", "services", "work", "cta"] as const).map((k) => ["whoosh.wav", sec(k) - 8, 0.7] as [string, number, number]),
  ["pop.wav", sec("headline") + 12, 0.5],
  ["pop.wav", sec("headline") + 30, 0.5],
  ...SERVICES.map((_, i) => ["pop.wav", sec("services") + 30 + i * 14, 0.4] as [string, number, number]),
  ...[1, 2].map((k) => ["whoosh.wav", sec("work") + Math.round((SCENES.work[1] * S * k) / PROJECTS.length) - 8, 0.45] as [string, number, number]),
  ["pop.wav", sec("cta") + 40, 0.7],
  ["boot.wav", sec("cta") + 40, 0.35],
];

const SoundTrack: React.FC = () => (
  <>
    <Audio src={staticFile("sfx/hum.wav")} volume={0.5} />
    {CUES.map(([file, from, volume], i) => (
      <Sequence key={i} from={Math.max(0, from)} durationInFrames={2 * S} layout="none">
        <Audio src={staticFile(`sfx/${file}`)} volume={volume} />
      </Sequence>
    ))}
  </>
);

export const Promo: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: BG }}>
      <SoundTrack />
      <DotGrid />
      {/* Vignette keeps text readable over the grid */}
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at 30% 50%, ${BG}ee 20%, ${BG}55 70%, ${BG}cc 100%)` }} />
      <Sequence {...at(SCENES.boot)}><Boot /></Sequence>
      <Sequence {...at(SCENES.headline)}><Headline /></Sequence>
      <Sequence {...at(SCENES.services)}><Services /></Sequence>
      <Sequence {...at(SCENES.work)}><Work /></Sequence>
      <Sequence {...at(SCENES.cta)}><Cta /></Sequence>
      {/* Thin progress bar along the bottom, like the site's terminal chrome */}
      <div style={{ position: "absolute", left: 0, bottom: 0, height: 6, width: `${(f / PROMO_FRAMES) * 100}%`, background: ORANGE }} />
    </AbsoluteFill>
  );
};
