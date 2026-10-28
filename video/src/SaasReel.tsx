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
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadMono } from "@remotion/google-fonts/IBMPlexMono";

// Vertical SaaS-style service reel, cut on the bar lines of the original 120 BPM track in public/music (scripts/music.mjs).
const inter = loadInter("normal", { weights: ["400", "600", "800"], subsets: ["latin", "vietnamese"] }).fontFamily;
const mono = loadMono("normal", { weights: ["400", "600"], subsets: ["latin", "vietnamese"] }).fontFamily;

const ORANGE = "#FF6A00";
const AMBER = "#FFB020";
const BG = "#07070A";
const TEXT = "#F5F5F3";
const MUTED = "#9A9AA3";
const BEAT = 30; // frames per beat at 60 fps, 120 BPM
const BAR = BEAT * 4;
export const SAAS_FRAMES = 15 * BAR;

const ease = Easing.bezier(0.16, 1, 0.3, 1);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const shot = (f: string) => staticFile(`shots/${f}`);
const ramp = (f: number, at: number, dur = 18) => interpolate(f, [at, at + dur], [0, 1], { ...clamp, easing: ease });

// Mirrors kickBar in scripts/music.mjs: the picture pulses on every kick.
const kickBar = (b: number) => b >= 2 && b <= 13 && b !== 7;
const kickPulse = (f: number) => (kickBar(Math.floor(f / BAR)) ? Math.exp(-(f % BEAT) / 7) : 0);

/* ---------------- Building blocks ---------------- */

const Backdrop: React.FC = () => {
  const f = useCurrentFrame();
  const pulse = kickPulse(f);
  const blob = (x: number, y: number, color: string, size: number) => (
    <div
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 65%)`,
        opacity: 0.55 + pulse * 0.25,
      }}
    />
  );
  return (
    <AbsoluteFill style={{ background: BG, overflow: "hidden" }}>
      {blob(200 + Math.sin(f / 90) * 120, 380 + Math.cos(f / 110) * 140, `${ORANGE}66`, 1100)}
      {blob(900 + Math.cos(f / 100) * 120, 1500 + Math.sin(f / 80) * 160, `${AMBER}40`, 1200)}
      {blob(540 + Math.sin(f / 70) * 200, 980, "#7A2BFF22", 900)}
      <AbsoluteFill
        style={{
          backgroundImage: "linear-gradient(#ffffff0d 1px, transparent 1px), linear-gradient(90deg, #ffffff0d 1px, transparent 1px)",
          backgroundSize: "90px 90px",
          backgroundPosition: `0 ${(f * 0.6) % 90}px`,
          maskImage: "radial-gradient(ellipse 70% 55% at 50% 50%, #000 20%, transparent 100%)",
        }}
      />
    </AbsoluteFill>
  );
};

// Blur-and-scale in over 12 frames, out over the last 10, so every bar-line cut feels like one camera move.
const Scene: React.FC<{ len: number; children: React.ReactNode }> = ({ len, children }) => {
  const f = useCurrentFrame();
  const inP = ramp(f, 0, 12);
  const outP = interpolate(f, [len - 10, len], [0, 1], clamp);
  return (
    <AbsoluteFill
      style={{
        opacity: inP * (1 - outP),
        transform: `scale(${1.06 - inP * 0.06 - outP * 0.03})`,
        filter: `blur(${(1 - inP) * 14 + outP * 10}px)`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

const Reveal: React.FC<{ text: string; at: number; style?: React.CSSProperties; stagger?: number }> = ({ text, at, style, stagger = 4 }) => {
  const f = useCurrentFrame();
  return (
    <div style={style}>
      {text.split(" ").map((w, i) => {
        const p = ramp(f, at + i * stagger);
        return (
          <span key={i} style={{ display: "inline-block", marginRight: "0.24em", opacity: p, transform: `translateY(${(1 - p) * 40}px)`, filter: `blur(${(1 - p) * 10}px)` }}>
            {w}
          </span>
        );
      })}
    </div>
  );
};

const Pill: React.FC<{ children: React.ReactNode; at?: number; style?: React.CSSProperties }> = ({ children, at = 0, style }) => {
  const f = useCurrentFrame();
  const p = ramp(f, at);
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 14,
        fontFamily: mono,
        fontWeight: 600,
        fontSize: 30,
        letterSpacing: "0.12em",
        color: TEXT,
        background: "#ffffff0d",
        border: "1px solid #ffffff1f",
        borderRadius: 999,
        padding: "12px 28px",
        opacity: p,
        transform: `translateY(${(1 - p) * 20}px)`,
        ...style,
      }}
    >
      <span style={{ width: 12, height: 12, borderRadius: 6, background: ORANGE, boxShadow: `0 0 16px ${ORANGE}` }} />
      {children}
    </div>
  );
};

const Heading: React.FC<{ pill: string; title: string; top?: number }> = ({ pill, title, top = 230 }) => (
  <div style={{ position: "absolute", top, left: 80, right: 80, display: "flex", flexDirection: "column", alignItems: "center", gap: 34, textAlign: "center" }}>
    <Pill>{pill}</Pill>
    <Reveal text={title} at={6} style={{ fontFamily: inter, fontWeight: 800, fontSize: 92, lineHeight: 1.08, letterSpacing: "-0.035em", color: TEXT , textWrap: "balance" }} />
  </div>
);

const Card: React.FC<{ style?: React.CSSProperties; children: React.ReactNode; glow?: number }> = ({ style, children, glow = 0 }) => (
  <div
    style={{
      position: "absolute",
      background: "linear-gradient(160deg, #ffffff12, #ffffff05)",
      border: `1.5px solid ${glow > 0.01 ? `rgba(255,106,0,${0.25 + glow * 0.75})` : "#ffffff1c"}`,
      borderRadius: 36,
      boxShadow: `0 30px 80px #000a, 0 0 ${60 * glow}px ${ORANGE}66`,
      ...style,
    }}
  >
    {children}
  </div>
);

const Browser: React.FC<{ src: string; label: string; style?: React.CSSProperties }> = ({ src, label, style }) => (
  <div style={{ position: "absolute", borderRadius: 26, overflow: "hidden", border: "1.5px solid #ffffff24", background: "#111", boxShadow: "0 40px 100px #000c", ...style }}>
    <div style={{ height: 58, background: "#16161a", display: "flex", alignItems: "center", gap: 12, padding: "0 24px" }}>
      {["#FF5F56", "#FFBD2E", "#27C93F"].map((c) => (
        <div key={c} style={{ width: 16, height: 16, borderRadius: 8, background: c }} />
      ))}
      <div style={{ marginLeft: 18, flex: 1, height: 34, borderRadius: 10, background: "#0b0b0e", fontFamily: mono, fontSize: 20, color: MUTED, display: "flex", alignItems: "center", paddingLeft: 18 }}>{label}</div>
    </div>
    <Img src={src} style={{ width: "100%", aspectRatio: "16 / 10", objectFit: "cover", objectPosition: "top", display: "block" }} />
  </div>
);

const Icon: React.FC<{ d: string[] }> = ({ d }) => (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {d.map((p) => (
      <path key={p} d={p} />
    ))}
  </svg>
);

/* ---------------- Scenes (one per bar group) ---------------- */

const Intro: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logo = spring({ frame: f - 10, fps, config: { damping: 13 } });
  const push = interpolate(f, [150, 240], [1, 1.12], { ...clamp, easing: Easing.in(Easing.cubic) });
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", transform: `scale(${push})` }}>
      <div style={{ position: "relative", transform: `scale(${logo})`, marginBottom: 70 }}>
        <div style={{ position: "absolute", inset: -40, borderRadius: 80, background: `radial-gradient(circle, ${ORANGE}55, transparent 70%)` }} />
        <Img src={staticFile("ThreeBugsStudio.webp")} style={{ position: "relative", width: 230, height: 230, borderRadius: 54, border: `2px solid ${ORANGE}88` }} />
      </div>
      <Reveal text="Three Bugs" at={45} stagger={6} style={{ fontFamily: inter, fontWeight: 800, fontSize: 158, letterSpacing: "-0.045em", color: TEXT, lineHeight: 1 }} />
      <Reveal text="Studio" at={57} style={{ fontFamily: inter, fontWeight: 800, fontSize: 158, letterSpacing: "-0.045em", color: ORANGE, lineHeight: 1.05, marginBottom: 60 }} />
      <Pill at={100}>SOFTWARE STUDIO · VIỆT NAM</Pill>
    </AbsoluteFill>
  );
};

// Three words, one per beat, then the promise.
const Hero: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words: [string, string][] = [["Thiết kế.", TEXT], ["Lập trình.", TEXT], ["Ra mắt.", ORANGE]];
  return (
    <AbsoluteFill style={{ justifyContent: "center", paddingLeft: 90 }}>
      {words.map(([w, color], i) => {
        const p = spring({ frame: f - i * BEAT, fps, config: { damping: 14, stiffness: 180 } });
        return (
          <div
            key={w}
            style={{
              fontFamily: inter,
              fontWeight: 800,
              fontSize: 168,
              letterSpacing: "-0.05em",
              lineHeight: 1.08,
              color,
              opacity: Math.min(1, p * 1.5),
              transform: `translateX(${(1 - p) * -120}px) scale(${1.25 - p * 0.25})`,
              transformOrigin: "left center",
            }}
          >
            {w}
          </div>
        );
      })}
      <div style={{ height: 6, width: interpolate(f, [100, 140], [0, 300], { ...clamp, easing: ease }), background: `linear-gradient(90deg, ${ORANGE}, ${AMBER})`, borderRadius: 3, margin: "50px 0 44px" }} />
      <Reveal
        text="Website & app cho doanh nghiệp của bạn, từ ý tưởng đến ngày ra mắt."
        at={120}
        stagger={3}
        style={{ fontFamily: inter, fontWeight: 400, fontSize: 56, lineHeight: 1.3, color: MUTED, maxWidth: 880 }}
      />
    </AbsoluteFill>
  );
};

const SERVICES: [string, string, string[]][] = [
  ["Thiết kế UI/UX", "Figma, tập trung trải nghiệm người dùng", ["M12 19l7-7 3 3-7 7-3-3z", "M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z", "M2 2l7.586 7.586"]],
  ["Website", "Tải nhanh, chuẩn SEO, mọi thiết bị", ["M3 4h18v12H3z", "M8 20h8", "M12 16v4"]],
  ["Backend", "Golang · FastAPI · NestJS", ["M4 4h16v6H4z", "M4 14h16v6H4z", "M8 7h.01", "M8 17h.01"]],
  ["Tích hợp AI", "Chatbot & tự động hóa quy trình", ["M12 3l1.9 5.8L20 10l-6.1 1.2L12 17l-1.9-5.8L4 10l6.1-1.2z", "M19 17l.8 2.2L22 20l-2.2.8L19 23l-.8-2.2L16 20l2.2-.8z"]],
];

const Services: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Heading pill="DỊCH VỤ" title="Mọi thứ để bạn lên online" />
      {SERVICES.map(([title, desc, icon], i) => {
        const at = BEAT * (i + 1);
        const p = spring({ frame: f - at, fps, config: { damping: 15 } });
        const glow = f >= at ? Math.exp(-(f - at) / 25) : 0;
        return (
          <Card
            key={title}
            glow={glow}
            style={{
              left: 80 + (i % 2) * 475,
              top: 700 + Math.floor(i / 2) * 475,
              width: 445,
              height: 445,
              padding: 44,
              boxSizing: "border-box",
              opacity: p,
              transform: `translateY(${(1 - p) * 120}px) scale(${0.9 + p * 0.1})`,
            }}
          >
            <div style={{ width: 104, height: 104, borderRadius: 28, background: `${ORANGE}1f`, border: `1px solid ${ORANGE}44`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon d={icon} />
            </div>
            <div style={{ fontFamily: inter, fontWeight: 800, fontSize: 52, color: TEXT, letterSpacing: "-0.03em", marginTop: 56 }}>{title}</div>
            <div style={{ fontFamily: inter, fontSize: 32, lineHeight: 1.35, color: MUTED, marginTop: 16 }}>{desc}</div>
          </Card>
        );
      })}
    </AbsoluteFill>
  );
};

// A deck of real projects, one card per beat.
const WORK: [string, string, string][] = [
  ["sukajan-store.jpg", "Sukajan", "E-commerce"],
  ["lehongkhanh_homepage.webp", "H1T MICRO", "Web App"],
  ["sukajan-product.jpg", "Sukajan", "Trang sản phẩm"],
  ["lehongkhanh_features.webp", "H1T MICRO", "Tính năng"],
];
const Work: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const current = Math.min(WORK.length - 1, Math.floor(f / BEAT));
  return (
    <AbsoluteFill>
      <Heading pill="DỰ ÁN THẬT" title="Đã ra mắt, đang chạy" />
      {WORK.map(([src, name], i) => {
        const p = spring({ frame: f - i * BEAT, fps, config: { damping: 16, stiffness: 170 } });
        const behind = Math.max(0, current - i);
        return (
          <Browser
            key={src}
            src={shot(src)}
            label={name.toLowerCase().replace(" ", "")}
            style={{
              left: 70,
              width: 940,
              top: 760 - behind * 46 + (1 - p) * 1100,
              transform: `scale(${1 - behind * 0.06})`,
              opacity: (i === 0 ? 1 : p) * (1 - behind * 0.3),
              zIndex: i,
            }}
          />
        );
      })}
      <div style={{ position: "absolute", top: 1480, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <div key={current} style={{ fontFamily: inter, fontWeight: 600, fontSize: 40, color: TEXT, background: "#ffffff10", border: "1px solid #ffffff22", borderRadius: 999, padding: "16px 36px" }}>
          <span style={{ color: ORANGE }}>{WORK[current][1]}</span> · {WORK[current][2]}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Breakdown bar: H1T MICRO traction as a live dashboard card.
const Stats: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const n = Math.round(interpolate(f, [8, 85], [0, 1800], { ...clamp, easing: Easing.out(Easing.cubic) }));
  const draw = interpolate(f, [8, 85], [1, 0], { ...clamp, easing: Easing.out(Easing.cubic) });
  const badge = spring({ frame: f - 72, fps, config: { damping: 11 } });
  const path = "M0 300 C 80 290, 120 270, 180 250 S 300 230, 360 190 S 480 150, 540 120 S 680 60, 800 20";
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <Card style={{ position: "relative", width: 920, padding: 56, boxSizing: "border-box" }} glow={0.4}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontFamily: mono, fontSize: 30, color: MUTED, letterSpacing: "0.1em" }}>H1T MICRO · DASHBOARD</div>
          <div style={{ fontFamily: mono, fontSize: 24, color: "#27C93F" }}>● LIVE</div>
        </div>
        <div style={{ fontFamily: inter, fontWeight: 800, fontSize: 200, letterSpacing: "-0.05em", color: TEXT, lineHeight: 1, marginTop: 40 }}>
          {n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          <span style={{ color: ORANGE }}>+</span>
        </div>
        <div style={{ fontFamily: inter, fontSize: 44, color: MUTED, marginTop: 10 }}>người dùng</div>
        <svg width="808" height="320" viewBox="0 0 800 320" style={{ marginTop: 40, overflow: "visible" }}>
          <defs>
            <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={ORANGE} stopOpacity="0.35" />
              <stop offset="100%" stopColor={ORANGE} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={`${path} L 800 320 L 0 320 Z`} fill="url(#area)" opacity={1 - draw} />
          <path d={path} fill="none" stroke={ORANGE} strokeWidth="6" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset={draw} />
        </svg>
        <div
          style={{
            position: "absolute",
            right: 50,
            top: 170,
            fontFamily: inter,
            fontWeight: 800,
            fontSize: 44,
            color: BG,
            background: `linear-gradient(135deg, ${AMBER}, ${ORANGE})`,
            borderRadius: 22,
            padding: "16px 28px",
            transform: `scale(${badge}) rotate(${(1 - badge) * -12 + 4}deg)`,
            boxShadow: `0 20px 60px ${ORANGE}66`,
          }}
        >
          #1 Unikorn
        </div>
      </Card>
    </AbsoluteFill>
  );
};

const TEMPLATES = ["aurelle-motors.jpg", "voltline-garage.jpg", "vivu-travel.jpg", "betonform.jpg", "timbera.jpg"].map(shot).concat(
  staticFile("fortify_homepage.webp"),
  staticFile("qmd_tech_homepage.webp")
);

// Tilted wall of the seven templates scrolling in opposite directions.
const Templates: React.FC = () => {
  const f = useCurrentFrame();
  const col = (offset: number, dir: number, base: number) =>
    [...TEMPLATES, ...TEMPLATES].map((src, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: offset,
          top: base + i * 350 + dir * f * 2.2,
          width: 520,
          aspectRatio: "16 / 10",
          borderRadius: 20,
          overflow: "hidden",
          border: "1px solid #ffffff22",
          boxShadow: "0 20px 50px #000b",
        }}
      >
        <Img src={src} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
      </div>
    ));
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ transform: "perspective(1800px) rotateX(22deg) rotateZ(-10deg) scale(1.25)", transformOrigin: "50% 50%" }}>
        {col(-60, -1, -900)}
        {col(500, 1, -3300)}
      </AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(180deg, #07070acc 0%, #07070a33 22%, #07070aee 40%, #07070aee 64%, #07070a33 80%, #07070acc 100%)" }} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", textAlign: "center", gap: 30 }}>
        <Pill at={0}>MẪU WEBSITE</Pill>
        <Reveal text="7 mẫu web" at={BEAT} stagger={5} style={{ fontFamily: inter, fontWeight: 800, fontSize: 150, letterSpacing: "-0.05em", color: TEXT, lineHeight: 1 }} />
        <Reveal text="có sẵn." at={BEAT * 2} style={{ fontFamily: inter, fontWeight: 800, fontSize: 150, letterSpacing: "-0.05em", color: ORANGE, lineHeight: 1 }} />
        <Pill at={BEAT * 4} style={{ fontSize: 34, letterSpacing: "0.04em", marginTop: 20 }}>
          Giao trong 2–3 ngày
        </Pill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const PRICES: [string, string, string][] = [
  ["Landing từ mẫu", "Thay logo, màu & nội dung theo thương hiệu", "2,5"],
  ["Thiết kế riêng", "Figma độc quyền, landing & web giới thiệu", "8"],
  ["Doanh nghiệp & E‑commerce", "Có trang quản trị, bán hàng, đặt lịch", "25"],
];
const Pricing: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Heading pill="BẢNG GIÁ" title="Minh bạch ngay từ đầu" />
      {PRICES.map(([name, desc, price], i) => {
        const p = spring({ frame: f - BEAT * (i + 1), fps, config: { damping: 16 } });
        return (
          <Card
            key={name}
            glow={i === 0 ? interpolate(f, [BEAT * 5, BEAT * 6, BEAT * 7.5], [0, 1, 0.3], clamp) : 0}
            style={{
              left: 80,
              width: 920,
              top: 640 + i * 300,
              height: 260,
              padding: "0 50px",
              boxSizing: "border-box",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              opacity: p,
              transform: `translateX(${(1 - p) * 500}px)`,
            }}
          >
            <div style={{ maxWidth: 520 }}>
              <div style={{ fontFamily: inter, fontWeight: 800, fontSize: 46, color: TEXT, letterSpacing: "-0.02em" }}>{name}</div>
              <div style={{ fontFamily: inter, fontSize: 30, lineHeight: 1.3, color: MUTED, marginTop: 12 }}>{desc}</div>
            </div>
            <div style={{ textAlign: "right", whiteSpace: "nowrap" }}>
              <div style={{ fontFamily: mono, fontSize: 26, color: MUTED }}>TỪ</div>
              <div style={{ fontFamily: inter, fontWeight: 800, fontSize: 92, color: ORANGE, letterSpacing: "-0.04em", lineHeight: 1 }}>{price}</div>
              <div style={{ fontFamily: inter, fontSize: 30, color: TEXT }}>triệu</div>
            </div>
          </Card>
        );
      })}
      <div style={{ position: "absolute", top: 1590, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <Pill at={BEAT * 5} style={{ fontSize: 30, letterSpacing: "0.04em" }}>
          Báo giá chi tiết theo quy mô dự án
        </Pill>
      </div>
    </AbsoluteFill>
  );
};

const STEPS = ["Tư vấn & báo giá", "Thiết kế trên Figma", "Lập trình & kiểm thử", "Bàn giao & bảo hành"];
const Process: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Heading pill="QUY TRÌNH" title="4 bước, không rườm rà" />
      <div style={{ position: "absolute", left: 160, top: 740, width: 6, height: interpolate(f, [4, 100], [0, 690], { ...clamp, easing: ease }), background: `linear-gradient(${ORANGE}, ${AMBER})`, borderRadius: 3 }} />
      {STEPS.map((s, i) => {
        const at = 6 + i * 26;
        const p = spring({ frame: f - at, fps, config: { damping: 13 } });
        return (
          <div key={s} style={{ position: "absolute", left: 110, top: 690 + i * 230, display: "flex", alignItems: "center", gap: 50, opacity: Math.min(1, p * 1.4), transform: `translateX(${(1 - p) * 60}px)` }}>
            <div style={{ width: 106, height: 106, borderRadius: 53, background: ORANGE, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${p})`, boxShadow: `0 0 ${40 * p}px ${ORANGE}88` }}>
              <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke={BG} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12l5 5L20 7" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - ramp(f, at + 6, 14)} />
              </svg>
            </div>
            <div>
              <div style={{ fontFamily: mono, fontSize: 28, color: MUTED }}>0{i + 1}</div>
              <div style={{ fontFamily: inter, fontWeight: 800, fontSize: 60, color: TEXT, letterSpacing: "-0.03em" }}>{s}</div>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

const URL_TEXT = "3bstudio.me";
const TYPE_AT = 14;
const TYPE_CPS = 14;
const CLICK_AT = 88;
const Cta: React.FC = () => {
  const f = useCurrentFrame();
  const typed = Math.floor(interpolate(f, [TYPE_AT, TYPE_AT + (URL_TEXT.length / TYPE_CPS) * 60], [0, URL_TEXT.length], clamp));
  const move = interpolate(f, [52, CLICK_AT - 4], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const press = interpolate(f, [CLICK_AT - 2, CLICK_AT + 2, CLICK_AT + 10], [1, 0.93, 1], clamp);
  const ripple = interpolate(f, [CLICK_AT, CLICK_AT + 26], [0, 1], clamp);
  return (
    <AbsoluteFill>
      <Heading pill="BẮT ĐẦU" title="Dự án tiếp theo là của bạn" top={330} />
      <div style={{ position: "absolute", top: 860, left: 90, width: 900, height: 130, borderRadius: 999, background: TEXT, display: "flex", alignItems: "center", padding: "0 48px", gap: 26, boxSizing: "border-box", boxShadow: `0 0 0 8px ${ORANGE}44, 0 30px 80px #000` }}>
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2.6" strokeLinecap="round">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        <span style={{ fontFamily: mono, fontWeight: 600, fontSize: 64, color: BG }}>
          {URL_TEXT.slice(0, typed)}
          <span style={{ color: ORANGE, opacity: Math.floor(f / 15) % 2 ? 0 : 1 }}>▌</span>
        </span>
      </div>
      <div style={{ position: "absolute", top: 1080, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <div style={{ position: "relative", ...{ opacity: ramp(f, 40), transform: `translateY(${(1 - ramp(f, 40)) * 30}px) scale(${press})` } }}>
          <div style={{ position: "absolute", inset: -40 * ripple, borderRadius: 999, border: `3px solid ${ORANGE}`, opacity: f >= CLICK_AT ? 1 - ripple : 0 }} />
          <div style={{ fontFamily: inter, fontWeight: 800, fontSize: 54, color: BG, background: `linear-gradient(135deg, ${AMBER}, ${ORANGE})`, borderRadius: 999, padding: "34px 70px", boxShadow: `0 20px 70px ${ORANGE}77` }}>
            Liên hệ tư vấn →
          </div>
        </div>
      </div>
      <svg width="70" height="70" viewBox="0 0 24 24" style={{ position: "absolute", left: interpolate(move, [0, 1], [900, 620]), top: interpolate(move, [0, 1], [1700, 1150]), opacity: ramp(f, 48, 8), transform: `scale(${press})` }}>
        <path d="M4 2l16 9-7 2-3 7z" fill={TEXT} stroke={BG} strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    </AbsoluteFill>
  );
};

const Outro: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: f - 4, fps, config: { damping: 14 } });
  const flash = interpolate(f, [0, 14], [0.7, 0], clamp);
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse 80% 50% at 50% 50%, ${ORANGE}55, transparent 70%)` }} />
      <Img src={staticFile("ThreeBugsStudio.webp")} style={{ width: 200, height: 200, borderRadius: 48, transform: `scale(${pop})`, marginBottom: 56 }} />
      <div style={{ fontFamily: inter, fontWeight: 800, fontSize: 132, letterSpacing: "-0.045em", color: TEXT, lineHeight: 1, opacity: pop }}>Three Bugs</div>
      <div style={{ fontFamily: inter, fontWeight: 800, fontSize: 132, letterSpacing: "-0.045em", color: ORANGE, lineHeight: 1.05, opacity: pop }}>/studio</div>
      <div style={{ fontFamily: mono, fontSize: 28, color: MUTED, letterSpacing: "0.2em", marginTop: 56, textAlign: "center", lineHeight: 1.6, opacity: ramp(f, 30) }}>
        EVERY BUG TEACHES.
        <br />
        EVERY BUILD IMPROVES.
      </div>
      <Pill at={50} style={{ marginTop: 60, fontSize: 36, letterSpacing: "0.06em" }}>
        3bstudio.me
      </Pill>
      <AbsoluteFill style={{ background: "#fff", opacity: flash }} />
    </AbsoluteFill>
  );
};

/* ---------------- Timeline ---------------- */

// [component, start bar, length in bars]
const TIMELINE: [React.FC, number, number][] = [
  [Intro, 0, 2],
  [Hero, 2, 2],
  [Services, 4, 2],
  [Work, 6, 1],
  [Stats, 7, 1],
  [Templates, 8, 2],
  [Pricing, 10, 2],
  [Process, 12, 1],
  [Cta, 13, 1],
  [Outro, 14, 1],
];

export const SaasReel: React.FC = () => {
  const f = useCurrentFrame();
  const ctaFrom = 13 * BAR;
  return (
    <AbsoluteFill style={{ background: BG }}>
      <Audio src={staticFile("music/ebm-120.wav")} />
      {Array.from({ length: URL_TEXT.length }, (_, i) => (
        <Sequence key={i} from={ctaFrom + TYPE_AT + Math.round((i * 60) / TYPE_CPS)} durationInFrames={20} layout="none">
          <Audio src={staticFile("sfx/key.wav")} volume={0.35} />
        </Sequence>
      ))}
      <Sequence from={ctaFrom + CLICK_AT} durationInFrames={30} layout="none">
        <Audio src={staticFile("sfx/pop.wav")} volume={0.5} />
      </Sequence>
      <Backdrop />
      <AbsoluteFill style={{ transform: `scale(${1 + kickPulse(f) * 0.008})` }}>
        {TIMELINE.map(([C, bar, bars]) => (
          <Sequence key={bar} from={bar * BAR} durationInFrames={bars * BAR}>
            <Scene len={bars * BAR}>
              <C />
            </Scene>
          </Sequence>
        ))}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
