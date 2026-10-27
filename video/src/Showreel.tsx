import React from "react";
import {
  AbsoluteFill,
  Audio,
  getStaticFiles,
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

// Studio showreel in the structure of a kinetic-type agency reel: one huge word per beat over a wall of real work.
const display = loadDisplay("normal", { weights: ["500", "700"], subsets: ["latin", "vietnamese"] }).fontFamily;
const mono = loadMono("normal", { weights: ["400", "600"], subsets: ["latin", "vietnamese"] }).fontFamily;

const ORANGE = "#FF6A00";
const BG = "#090909";
const TEXT = "#F5F5F3";
const MUTED = "#8E8E93";
const S = 60;

// All on-screen text, per language. The animation code below is shared.
const COPY = {
  vi: {
    hello: "> Xin chào, chúng tôi là",
    helps: ["Giúp doanh nghiệp", "tăng trưởng online."],
    web: "Website",
    app: "Web App & AI",
    appChip: "H1T MICRO · 1.800+ người dùng · #1 Unikorn",
    templates: "Mẫu website",
    templatesChip: "7 mẫu có sẵn · giao trong 2–3 ngày",
    pitch: ["Thay vì thuê cả một đội ngũ…", "chúng tôi là đội ngũ của bạn ✦", "Chỉ từ 2,5 triệu"],
    chips: ["Thiết kế", "Lập trình", "Ra mắt", "Bảo trì"],
    findUs: "Tìm chúng tôi tại",
    wall: ["Dành cho start-up & doanh nghiệp", "cần ra mắt thật nhanh."],
    studioShot: "3bstudio.jpg",
  },
  en: {
    hello: "> Hi, we're",
    helps: ["We help businesses", "grow online."],
    web: "Websites",
    app: "Web Apps & AI",
    appChip: "H1T MICRO · 1,800+ users · #1 Unikorn",
    templates: "Templates",
    templatesChip: "7 ready-made designs · live in 2–3 days",
    pitch: ["Skip hiring a whole team…", "we are your team ✦", "From 2.5M VND"],
    chips: ["Design", "Code", "Launch", "Care"],
    findUs: "Find us at",
    wall: ["For startups & businesses", "that need to move fast."],
    studioShot: "3bstudio-en.jpg",
  },
};
type Lang = keyof typeof COPY;
const CopyContext = React.createContext(COPY.vi);
const useCopy = () => React.useContext(CopyContext);

type SceneKey = "intro" | "helps" | "web" | "app" | "templates" | "pitch" | "search" | "wall" | "outro";
type Timing = {
  total: number; // seconds
  scenes: Record<SceneKey, readonly [number, number]>; // [start, length] in seconds
  pitchBeats: [number, number, number, number]; // frames inside the pitch scene: end of line 1, line 2, chips, price
  chipAt: [number, number, number, number]; // frames inside the pitch scene where each chip pops
  vo: [string, number][]; // voiceover clip and start time in seconds
};

// Vietnamese: the original 32s cut. English: stretched to 40s so each ElevenLabs line fits its scene,
// with the pitch beats placed on the pauses measured in vo-06.
const TIMING: Record<Lang, Timing> = {
  vi: {
    total: 32,
    scenes: { intro: [0, 3], helps: [3, 2], web: [5, 3], app: [8, 3], templates: [11, 2], pitch: [13, 6], search: [19, 3], wall: [22, 6], outro: [28, 4] },
    pitchBeats: [90, 180, 270, 360],
    chipAt: [180, 188, 196, 204],
    vo: [],
  },
  en: {
    total: 40,
    scenes: { intro: [0, 3], helps: [3, 2.6], web: [5.6, 2.4], app: [8, 6.2], templates: [14.2, 3.4], pitch: [17.6, 9.6], search: [27.2, 3.2], wall: [30.4, 3.8], outro: [34.2, 5.8] },
    pitchBeats: [135, 225, 423, 576],
    chipAt: [239, 282, 321, 354],
    vo: [
      ["vo-01.mp3", 0.3],
      ["vo-02.mp3", 3.15],
      ["vo-03.mp3", 5.75],
      ["vo-04.mp3", 8.15],
      ["vo-05.mp3", 14.3],
      ["vo-06.mp3", 17.75],
      ["vo-07.mp3", 27.35],
      ["vo-08.mp3", 30.5],
      ["vo-09.mp3", 34.4],
    ],
  },
};
export const showreelFrames = (lang: Lang) => TIMING[lang].total * S;

const ease = Easing.bezier(0.16, 1, 0.3, 1);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const shot = (f: string) => staticFile(`shots/${f}`);

const SHOTS = {
  sukajan: shot("sukajan-product.jpg"),
  sukajanAbout: shot("sukajan-about.jpg"),
  h1tHome: shot("lehongkhanh_homepage.webp"),
  h1tFeatures: shot("lehongkhanh_features.webp"),
  h1tDetails: shot("lehongkhanh_details.webp"),
  aurelle: shot("aurelle-motors.jpg"),
  voltline: shot("voltline-garage.jpg"),
  vivu: shot("vivu-travel.jpg"),
  betonform: shot("betonform.jpg"),
  timbera: shot("timbera.jpg"),
  studio: shot("3bstudio.jpg"),
  fortify: staticFile("fortify_homepage.webp"),
  qmd: staticFile("qmd_tech_homepage.webp"),
  store: shot("sukajan-store.jpg"),
};

// In at `delay`, optional fade-out over the last 15 frames before `end`.
const useIn = (delay: number, end?: number, rise = 50) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [delay, delay + 24], [0, 1], { ...clamp, easing: ease });
  const out = end ? interpolate(f, [end - 15, end], [1, 0], clamp) : 1;
  return { opacity: p * out, transform: `translateY(${(1 - p) * rise}px)` };
};

const Shot: React.FC<{ src: string; style?: React.CSSProperties; w?: number }> = ({ src, style, w = 520 }) => (
  <div
    style={{
      position: "absolute",
      width: w,
      aspectRatio: "16 / 10",
      borderRadius: 14,
      overflow: "hidden",
      border: "1px solid #ffffff22",
      boxShadow: "0 30px 60px #000c",
      background: "#111",
      ...style,
    }}
  >
    <Img src={src} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
  </div>
);

const BigWord: React.FC<{ children: React.ReactNode; delay?: number; size?: number; color?: string; end?: number }> = ({ children, delay = 6, size = 190, color = TEXT, end }) => (
  <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", pointerEvents: "none" }}>
    <div
      style={{
        fontFamily: display,
        fontWeight: 700,
        fontSize: size,
        letterSpacing: "-0.04em",
        color,
        textShadow: "0 10px 60px #000, 0 0 30px #000",
        textAlign: "center",
        lineHeight: 1,
        ...useIn(delay, end, 70),
      }}
    >
      {children}
    </div>
  </AbsoluteFill>
);

const DotField: React.FC = () => {
  const f = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const drift = (f * 0.25) % 48;
  return (
    <AbsoluteFill
      style={{
        backgroundImage: `radial-gradient(${ORANGE}33 1.6px, transparent 1.6px)`,
        backgroundSize: "48px 48px",
        backgroundPosition: `${drift}px ${drift / 2}px`,
        maskImage: `radial-gradient(ellipse ${width * 0.45}px ${height * 0.5}px at 50% 50%, #000 30%, transparent 100%)`,
      }}
    />
  );
};

const Typed: React.FC<{ text: string; start: number; cps?: number; style?: React.CSSProperties }> = ({ text, start, cps = 22, style }) => {
  const f = useCurrentFrame();
  const n = Math.floor(interpolate(f, [start, start + (text.length / cps) * S], [0, text.length], clamp));
  return (
    <span style={style}>
      {text.slice(0, n)}
      <span style={{ color: ORANGE, opacity: Math.floor(f / 18) % 2 ? 0 : 1 }}>▌</span>
    </span>
  );
};

/* ---------------- Scenes ---------------- */

const Intro: React.FC = () => {
  const t = useCopy();
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: f - 70, fps, config: { damping: 14 } });
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <DotField />
      <div style={{ position: "relative", fontFamily: mono, fontSize: 44, color: MUTED, marginBottom: 30 }}>
        <Typed text={t.hello} start={8} />
      </div>
      <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 36, opacity: pop, transform: `scale(${0.85 + pop * 0.15})` }}>
        <Img src={staticFile("ThreeBugsStudio.webp")} style={{ width: 150, height: 150, borderRadius: 26, border: `2px solid ${ORANGE}66` }} />
        <div style={{ fontFamily: display, fontWeight: 700, fontSize: 150, color: TEXT, letterSpacing: "-0.03em" }}>Three Bugs Studio</div>
      </div>
    </AbsoluteFill>
  );
};

const Helps: React.FC<{ len: number }> = ({ len }) => {
  const t = useCopy();
  return (
  <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", textAlign: "center" }}>
    <div style={{ fontFamily: display, fontWeight: 500, fontSize: 130, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
      <div style={{ color: TEXT, ...useIn(0, len) }}>{t.helps[0]}</div>
      <div style={{ color: ORANGE, ...useIn(14, len) }}>{t.helps[1]}</div>
    </div>
  </AbsoluteFill>
  );
};

// Six screenshots spread out from the centre around the word.
const Web: React.FC<{ len: number }> = ({ len }) => {
  const t = useCopy();
  const f = useCurrentFrame();
  const spread = interpolate(f, [0, 40], [0.35, 1], { ...clamp, easing: ease });
  const zoom = interpolate(f, [0, len], [1.05, 0.95]);
  const tiles: [string, number, number, number][] = [
    [SHOTS.store, -620, -300, -4],
    [SHOTS.aurelle, 0, -360, 2],
    [SHOTS.vivu, 620, -300, 4],
    [SHOTS.fortify, -620, 300, 3],
    [SHOTS.qmd, 0, 360, -2],
    [SHOTS.timbera, 620, 300, -3],
  ];
  const out = interpolate(f, [len - 15, len], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <AbsoluteFill style={{ transform: `scale(${zoom})` }}>
        {tiles.map(([src, x, y, r], i) => (
          <Shot
            key={src}
            src={src}
            style={{
              left: 960 - 260 + x * spread,
              top: 540 - 162 + y * spread,
              transform: `rotate(${r * spread}deg)`,
              opacity: interpolate(f, [i * 3, i * 3 + 20], [0, 1], clamp),
            }}
          />
        ))}
      </AbsoluteFill>
      <BigWord delay={10}>{t.web}</BigWord>
    </AbsoluteFill>
  );
};

// H1T MICRO screens slide in from three corners, with the real traction numbers.
const App: React.FC<{ len: number }> = ({ len }) => {
  const t = useCopy();
  const f = useCurrentFrame();
  const slide = (d: number) => interpolate(f, [d, d + 30], [1, 0], { ...clamp, easing: ease });
  const out = interpolate(f, [len - 15, len], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <Shot src={SHOTS.h1tHome} w={760} style={{ left: 60 - slide(0) * 900, top: 70, transform: "rotate(-3deg)" }} />
      <Shot src={SHOTS.h1tFeatures} w={700} style={{ right: 60 - slide(8) * 900, top: 120, transform: "rotate(3deg)" }} />
      <Shot src={SHOTS.h1tDetails} w={720} style={{ left: 600, bottom: 40 - slide(16) * 700, transform: "rotate(-1deg)" }} />
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 50%, #090909dd 25%, transparent 70%)" }} />
      <BigWord delay={12} size={170}>{t.app}</BigWord>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", paddingTop: 300 }}>
        <div
          style={{
            fontFamily: mono,
            fontSize: 34,
            color: BG,
            background: ORANGE,
            padding: "14px 30px",
            borderRadius: 999,
            fontWeight: 600,
            ...useIn(40, undefined, 30),
          }}
        >
          {t.appChip}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Template screenshots ride across in one row.
const Templates: React.FC<{ len: number }> = ({ len }) => {
  const t = useCopy();
  const f = useCurrentFrame();
  const x = interpolate(f, [0, len], [300, -300 - len * 5]);
  const row = [SHOTS.aurelle, SHOTS.voltline, SHOTS.vivu, SHOTS.betonform, SHOTS.timbera, SHOTS.fortify];
  const out = interpolate(f, [len - 15, len], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ opacity: out }}>
      {row.map((src, i) => (
        <Shot key={src} src={src} w={560} style={{ top: 360, left: x + i * 600 }} />
      ))}
      <AbsoluteFill style={{ background: "linear-gradient(180deg, #090909ee 0%, #09090966 30%, #090909d9 45%, #090909d9 62%, #09090966 75%, #090909ee 100%)" }} />
      <BigWord delay={4} size={170}>{t.templates}</BigWord>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", paddingTop: 290 }}>
        <div style={{ fontFamily: mono, fontSize: 36, color: TEXT, background: "#090909e6", border: `1px solid ${ORANGE}66`, padding: "12px 28px", borderRadius: 999, ...useIn(20, undefined, 20) }}>{t.templatesChip}</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Four pitch beats with the studio site in a browser frame behind; beat ends come from TIMING.
const Pitch: React.FC<{ beats: Timing["pitchBeats"]; chipAt: Timing["chipAt"] }> = ({ beats, chipAt }) => {
  const t = useCopy();
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const laptopIn = interpolate(f, [10, 50], [0, 1], { ...clamp, easing: ease });
  const lines: [string, number, number, string][] = [
    [t.pitch[0], 0, beats[0], TEXT],
    [t.pitch[1], beats[0], beats[1], TEXT],
    ["", beats[1], beats[2], TEXT],
    [t.pitch[2], beats[2], beats[3], ORANGE],
  ];
  const chips = t.chips;
  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 960 - 560,
          top: 400 + (1 - laptopIn) * 300,
          width: 1120,
          opacity: laptopIn * interpolate(f, [beats[1] - 10, beats[1] + 10], [1, 0.25], clamp),
          borderRadius: 16,
          overflow: "hidden",
          border: "1px solid #ffffff22",
          boxShadow: `0 40px 120px #000, 0 0 80px ${ORANGE}22`,
        }}
      >
        <div style={{ height: 40, background: "#141414", display: "flex", alignItems: "center", gap: 10, paddingLeft: 18 }}>
          {["#FF5F56", "#FFBD2E", "#27C93F"].map((c) => (
            <div key={c} style={{ width: 13, height: 13, borderRadius: 7, background: c }} />
          ))}
          <span style={{ fontFamily: mono, fontSize: 18, color: MUTED, marginLeft: 16 }}>3bstudio.me</span>
        </div>
        <Img src={shot(t.studioShot)} style={{ width: "100%", display: "block" }} />
      </div>
      {lines.map(([text, a, b, color]) =>
        text ? (
          <Sequence key={text} from={a} durationInFrames={b - a} layout="none">
            <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: 170 }}>
              <PitchLine text={text} color={color} len={b - a} />
            </AbsoluteFill>
          </Sequence>
        ) : null
      )}
      <Sequence from={beats[1]} durationInFrames={beats[2] - beats[1]} layout="none">
        <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: 170 }}>
          <div style={{ display: "flex", gap: 24 }}>
            {chips.map((c, i) => {
              const p = spring({ frame: f - chipAt[i], fps, config: { damping: 13 } });
              return (
                <div
                  key={c}
                  style={{
                    fontFamily: display,
                    fontWeight: 700,
                    fontSize: 72,
                    color: i === 3 ? BG : TEXT,
                    background: i === 3 ? ORANGE : "#161616",
                    border: `2px solid ${i === 3 ? ORANGE : "#ffffff22"}`,
                    padding: "18px 40px",
                    borderRadius: 18,
                    transform: `scale(${p})`,
                    opacity: interpolate(f, [beats[2] - 15, beats[2]], [1, 0], clamp),
                  }}
                >
                  {c}
                </div>
              );
            })}
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};

const PitchLine: React.FC<{ text: string; color: string; len: number }> = ({ text, color, len }) => (
  <div
    style={{
      fontFamily: display,
      fontWeight: 700,
      fontSize: 120,
      letterSpacing: "-0.03em",
      color,
      textShadow: "0 10px 50px #000",
      ...useIn(0, len, 60),
    }}
  >
    {text}
  </div>
);

const Search: React.FC<{ len: number }> = ({ len }) => {
  const t = useCopy();
  const f = useCurrentFrame();
  const bar = interpolate(f, [10, 40], [0, 1], { ...clamp, easing: ease });
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <DotField />
      <div style={{ position: "relative", fontFamily: display, fontWeight: 500, fontSize: 96, color: TEXT, marginBottom: 50, ...useIn(0, len, 40) }}>
        {t.findUs}
      </div>
      <div
        style={{
          position: "relative",
          width: 1100 * bar + 200,
          height: 130,
          borderRadius: 999,
          background: "#F5F5F3",
          display: "flex",
          alignItems: "center",
          padding: "0 50px",
          gap: 30,
          boxShadow: `0 0 0 6px ${ORANGE}55, 0 30px 80px #000`,
          opacity: interpolate(f, [len - 15, len], [1, 0], clamp),
          overflow: "hidden",
        }}
      >
        <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2.6" strokeLinecap="round">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        <Typed text="3bstudio.me" start={45} cps={9} style={{ fontFamily: mono, fontWeight: 600, fontSize: 68, color: BG }} />
      </div>
    </AbsoluteFill>
  );
};

// Two rows of all the work drifting in opposite directions behind two closing lines.
const Wall: React.FC<{ len: number }> = ({ len }) => {
  const t = useCopy();
  const f = useCurrentFrame();
  const all = Object.values(SHOTS);
  const rowA = all.slice(0, 7);
  const rowB = all.slice(7);
  const half = Math.round(len / 2);
  const a = interpolate(f, [0, len], [0, -700]);
  const b = interpolate(f, [0, len], [-900, -200]);
  const out = interpolate(f, [len - 15, len], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ opacity: out }}>
      {rowA.map((src, i) => (
        <Shot key={`a${i}`} src={src} w={500} style={{ top: 110, left: a + i * 530 }} />
      ))}
      {rowB.map((src, i) => (
        <Shot key={`b${i}`} src={src} w={500} style={{ top: 650, left: b + i * 530 }} />
      ))}
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 50%, #090909f2 30%, #09090966 75%)" }} />
      <Sequence from={0} durationInFrames={half} layout="none">
        <BigWord delay={6} size={110} end={half}>{t.wall[0]}</BigWord>
      </Sequence>
      <Sequence from={half} durationInFrames={len - half} layout="none">
        <BigWord delay={6} size={130} color={ORANGE} end={len - half}>{t.wall[1]}</BigWord>
      </Sequence>
    </AbsoluteFill>
  );
};

const Outro: React.FC<{ len: number }> = ({ len }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: f - 10, fps, config: { damping: 15 } });
  const glow = interpolate(f, [0, len], [0.4, 1]);
  const toWhite = interpolate(f, [len - 35, len], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse 70% 55% at 50% 60%, ${ORANGE}${Math.round(glow * 70).toString(16).padStart(2, "0")} 0%, transparent 70%)` }} />
      <div style={{ display: "flex", alignItems: "center", gap: 34, transform: `scale(${0.85 + pop * 0.15})`, opacity: pop }}>
        <Img src={staticFile("ThreeBugsStudio.webp")} style={{ width: 140, height: 140, borderRadius: 26 }} />
        <div style={{ fontFamily: display, fontWeight: 700, fontSize: 130, color: TEXT, letterSpacing: "-0.03em" }}>
          Three Bugs<span style={{ color: ORANGE }}>/studio</span>
        </div>
      </div>
      <div style={{ fontFamily: mono, fontSize: 34, color: MUTED, letterSpacing: "0.25em", marginTop: 40, ...useIn(50, undefined, 20) }}>
        EVERY BUG TEACHES. EVERY BUILD IMPROVES.
      </div>
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 50%, #ffffffcc 0%, #f5f5f3 100%)", opacity: toWhite * 0.9 }} />
    </AbsoluteFill>
  );
};

/* ---------------- Sound ---------------- */

const at = ([start, len]: readonly [number, number]) => ({ from: Math.round(start * S), durationInFrames: Math.round(len * S) });
type Cue = [string, number, number];
const makeCues = (tm: Timing): Cue[] => {
  const sec = (k: SceneKey) => Math.round(tm.scenes[k][0] * S);
  const wallHalf = Math.round((tm.scenes.wall[1] * S) / 2);
  return [
    ...Array.from({ length: 12 }, (_, i): Cue => ["key.wav", 8 + i * 3, 0.45]),
    ["boot.wav", 70, 0.6],
    ...(["helps", "web", "app", "templates", "pitch", "search", "wall"] as const).map((k): Cue => ["whoosh.wav", sec(k) - 8, 0.7]),
    ["pop.wav", sec("app") + 40, 0.6],
    ["pop.wav", sec("templates") + 20, 0.4],
    ...tm.chipAt.map((c): Cue => ["pop.wav", sec("pitch") + c, 0.5]),
    ["boot.wav", sec("pitch") + tm.pitchBeats[2], 0.4],
    ...Array.from({ length: 11 }, (_, i): Cue => ["key.wav", sec("search") + 45 + Math.round(i * (S / 9)), 0.5]),
    ["whoosh.wav", sec("wall") + wallHalf - 8, 0.45],
    ["whoosh.wav", sec("outro") - 8, 0.7],
    ["boot.wav", sec("outro") + 10, 0.7],
  ];
};

// Voiceover clips live in public/vo; any clip not present is skipped so the video still renders.
const SoundTrack: React.FC<{ tm: Timing }> = ({ tm }) => {
  const available = new Set(getStaticFiles().map((f) => f.name));
  const voice = tm.vo.filter(([file]) => available.has(`vo/${file}`));
  // Duck the bed and effects under the voice so it stays clear.
  const duck = voice.length ? 0.45 : 1;
  return (
    <>
      <Audio src={staticFile("sfx/hum.wav")} volume={0.5 * duck} />
      {makeCues(tm).map(([file, from, volume], i) => (
        <Sequence key={i} from={Math.max(0, from)} durationInFrames={2 * S} layout="none">
          <Audio src={staticFile(`sfx/${file}`)} volume={volume * duck} />
        </Sequence>
      ))}
      {voice.map(([file, at]) => (
        <Sequence key={file} from={Math.round(at * S)} layout="none">
          <Audio src={staticFile(`vo/${file}`)} volume={1} />
        </Sequence>
      ))}
    </>
  );
};

export const Showreel: React.FC<{ lang?: Lang }> = ({ lang = "vi" }) => {
  const tm = TIMING[lang];
  const sc = tm.scenes;
  const len = (k: SceneKey) => Math.round(sc[k][1] * S);
  return (
    <CopyContext.Provider value={COPY[lang]}>
      <AbsoluteFill style={{ background: BG }}>
        <SoundTrack tm={tm} />
        <Sequence {...at(sc.intro)}><Intro /></Sequence>
        <Sequence {...at(sc.helps)}><Helps len={len("helps")} /></Sequence>
        <Sequence {...at(sc.web)}><Web len={len("web")} /></Sequence>
        <Sequence {...at(sc.app)}><App len={len("app")} /></Sequence>
        <Sequence {...at(sc.templates)}><Templates len={len("templates")} /></Sequence>
        <Sequence {...at(sc.pitch)}><Pitch beats={tm.pitchBeats} chipAt={tm.chipAt} /></Sequence>
        <Sequence {...at(sc.search)}><Search len={len("search")} /></Sequence>
        <Sequence {...at(sc.wall)}><Wall len={len("wall")} /></Sequence>
        <Sequence {...at(sc.outro)}><Outro len={len("outro")} /></Sequence>
      </AbsoluteFill>
    </CopyContext.Provider>
  );
};
