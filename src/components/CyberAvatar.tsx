import React from "react";

export type Hair = "spike" | "bob" | "buzz" | "mohawk" | "hood" | "long" | "cap";
export type Gear = "visor" | "glasses" | "goggles" | "headset" | "halfmask" | "monocle";

export interface CyberLook {
  hair: Hair;
  gear: Gear;
  skin: string;
}

// Shade a hex colour towards black (amt < 0) or white (amt > 0).
const shade = (hex: string, amt: number) => {
  const n = parseInt(hex.slice(1), 16);
  const mix = (c: number) => Math.round(amt < 0 ? c * (1 + amt) : c + (255 - c) * amt);
  return `rgb(${mix(n >> 16)}, ${mix((n >> 8) & 255)}, ${mix(n & 255)})`;
};

const INK = "#1a1238";
const DARK_HAIR = "#2a2440";
const line = { stroke: INK, strokeWidth: 5, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

const HAIR: Record<Hair, (fill: string, gloss: string) => React.ReactNode> = {
  spike: (f, g) => (
    <g>
      <path {...line} fill={f} d="M136 238 C126 176 150 130 200 126 C254 126 282 172 266 238 L254 200 L246 222 L236 178 L224 208 L214 168 L202 204 L188 166 L178 204 L166 176 L158 214 L148 188 Z" />
      <path fill="none" stroke={g} strokeWidth="6" strokeLinecap="round" d="M174 146 C192 136 216 136 234 148" />
    </g>
  ),
  bob: (f, g) => (
    <g>
      <path {...line} fill={f} d="M126 302 C108 212 138 132 204 130 C272 132 298 214 278 302 C266 308 254 296 256 272 C258 222 244 194 220 182 C200 202 170 208 148 200 C144 238 146 274 150 302 C142 308 132 308 126 302 Z" />
      <path fill="none" stroke={g} strokeWidth="7" strokeLinecap="round" d="M156 162 C178 146 212 142 238 156" />
    </g>
  ),
  buzz: (f, g) => (
    <g>
      <path {...line} fill={f} d="M142 224 C140 172 166 146 200 144 C234 146 260 172 258 224 C246 194 226 182 200 182 C174 182 154 194 142 224 Z" />
      <path fill="none" stroke={g} strokeWidth="5" strokeLinecap="round" d="M184 156 C196 152 212 152 224 158" />
    </g>
  ),
  mohawk: (f, g) => (
    <g>
      <path {...line} fill={DARK_HAIR} d="M144 214 C146 178 166 160 188 156 L188 184 C168 188 154 198 144 214 Z M256 214 C254 178 234 160 212 156 L212 184 C232 188 246 198 256 214 Z" />
      <path {...line} fill={f} d="M184 186 C174 142 180 104 202 80 C224 104 230 142 218 186 Z" />
      <path fill="none" stroke={g} strokeWidth="5" strokeLinecap="round" d="M200 98 C194 122 194 150 198 176" />
    </g>
  ),
  hood: (f, g) => (
    <g>
      <path {...line} fill={f} d="M100 362 C88 220 130 120 200 116 C270 120 312 220 300 362 L268 362 C276 262 262 198 200 184 C138 198 124 262 132 362 Z" />
      <path fill="none" stroke={g} strokeWidth="6" strokeLinecap="round" d="M140 160 C162 136 196 128 226 132" />
    </g>
  ),
  long: (f, g) => (
    <g>
      <path {...line} fill={f} d="M116 404 C90 292 102 150 196 128 C292 120 316 236 292 330 C284 370 292 392 302 410 L256 410 C262 330 258 232 236 194 C212 218 172 222 150 206 C138 272 142 352 152 404 Z" />
      <path fill="none" stroke={g} strokeWidth="7" strokeLinecap="round" d="M150 168 C174 144 214 138 248 156 M272 250 C280 290 278 330 270 370" />
    </g>
  ),
  cap: (f, g) => (
    <g>
      <path {...line} fill={f} d="M136 216 C138 162 166 140 202 140 C240 140 266 162 268 216 Z" />
      <path {...line} fill={DARK_HAIR} d="M200 208 L306 216 C308 232 290 236 262 232 L200 224 Z" />
      <path {...line} strokeWidth={3} fill={g} d="M204 156 L192 180 L204 180 L196 200 L216 172 L204 172 L212 156 Z" />
    </g>
  ),
};

function Eyes() {
  return (
    <g>
      <path {...line} strokeWidth={3} fill="#FFE9A8" d="M156 246 C164 232 188 232 196 244 C186 254 166 254 156 246 Z" />
      <path {...line} strokeWidth={3} fill="#FFE9A8" d="M204 244 C212 232 236 232 244 246 C234 254 214 254 204 244 Z" />
      <circle cx="180" cy="244" r="6" fill={INK} />
      <circle cx="220" cy="244" r="6" fill={INK} />
      <circle cx="182" cy="241" r="2" fill="#ffffff" />
      <circle cx="222" cy="241" r="2" fill="#ffffff" />
      <path fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" d="M153 244 C163 228 190 228 199 242 M201 242 C210 228 237 228 247 244" />
      <path fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" d="M160 222 L190 226 M210 226 L240 222" />
    </g>
  );
}

// Gear drawn over the eyes. The domino mask ("visor") sits under them, see the render below.
const GEAR: Record<Exclude<Gear, "visor">, (neon: string, light: string, dark: string) => React.ReactNode> = {
  glasses: (n) => (
    <g {...line} strokeWidth={4} fill={n} fillOpacity={0.3}>
      <circle cx="176" cy="244" r="22" />
      <circle cx="224" cy="244" r="22" />
      <path fill="none" d="M198 242 L202 242 M154 240 L140 236 M246 240 L260 236" />
    </g>
  ),
  goggles: (_n, l) => (
    <g>
      <path {...line} fill="none" strokeWidth={9} d="M136 242 L264 242" />
      <circle {...line} cx="178" cy="244" r="24" fill={l} fillOpacity={0.75} />
      <circle {...line} cx="222" cy="244" r="24" fill={l} fillOpacity={0.75} />
      <path fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" d="M166 234 L174 228 M210 234 L218 228" />
    </g>
  ),
  headset: (n, _l, d) => (
    <g>
      <path {...line} fill="none" strokeWidth={9} d="M134 224 C138 134 262 134 266 224" />
      <rect {...line} x="118" y="222" width="26" height="44" rx="12" fill={d} />
      <rect {...line} x="256" y="222" width="26" height="44" rx="12" fill={d} />
      <path {...line} fill="none" strokeWidth={4} d="M132 262 C136 292 160 300 180 296" />
      <circle {...line} strokeWidth={3} cx="182" cy="296" r="7" fill={n} />
    </g>
  ),
  halfmask: (_n, l, d) => (
    <g>
      <path {...line} fill={d} d="M144 266 C158 304 242 304 256 266 L258 294 C236 326 164 326 142 294 Z" />
      <path fill="none" stroke={l} strokeWidth="4" strokeLinecap="round" d="M174 292 L174 306 M188 294 L188 312 M200 295 L200 314 M212 294 L212 312 M226 292 L226 306" />
    </g>
  ),
  monocle: (n, l) => (
    <g>
      <circle {...line} cx="220" cy="244" r="22" fill={l} fillOpacity={0.45} />
      <path {...line} fill="none" strokeWidth={3} d="M242 244 L264 238" />
      <path {...line} strokeWidth={3} fill={n} d="M176 196 L166 214 L176 214 L168 230 L188 208 L178 208 L186 196 Z" />
    </g>
  ),
};

/** A comic-style cyberpunk character bust: thick outlines, flat colour, a blob backdrop in the member's colour. */
export default function CyberAvatar({ look, neon, title, wide = false, className = "" }: { look: CyberLook; neon: string; title: string; wide?: boolean; className?: string }) {
  const light = shade(neon, 0.45);
  const mid = shade(neon, -0.15);
  const dark = shade(neon, -0.55);
  const skinShade = shade(look.skin, -0.18);

  return (
    <svg viewBox={wide ? "20 96 360 225" : "40 70 320 400"} preserveAspectRatio="xMidYMid slice" role="img" aria-label={title} className={className}>
      {/* Backdrop: night sky, a blob in the member's colour, speed streaks */}
      <rect width="400" height="500" fill="#110f2c" />
      <path fill={shade(neon, -0.35)} d="M80 120 C120 50 262 38 332 92 C392 138 382 232 362 302 C346 362 384 432 322 466 C252 506 120 492 70 432 C20 372 40 302 50 242 C58 192 50 160 80 120 Z" />
      <g strokeLinecap="round" fill="none">
        <path stroke={light} strokeWidth="16" d="M302 78 L344 36 M326 132 L380 80 M34 300 L76 258 M26 372 L56 342" />
        <path stroke="#110f2c" strokeWidth="9" d="M352 196 L372 176 M60 170 L80 150 M330 400 L350 380" />
      </g>

      {/* Costume */}
      <path {...line} fill={mid} d="M78 500 C84 420 140 386 200 384 C260 386 316 420 322 500 Z" />
      <path {...line} fill={light} d="M150 392 L200 470 L250 392 L234 386 L200 440 L166 386 Z" />
      <path {...line} strokeWidth={4} fill={neon} d="M200 452 L214 468 L200 484 L186 468 Z" />

      {/* Neck, ears, face */}
      <path {...line} fill={skinShade} d="M178 300 L178 386 L222 386 L222 300 Z" />
      <rect {...line} strokeWidth={4} x="176" y="350" width="48" height="12" rx="6" fill={dark} />
      <ellipse {...line} cx="140" cy="250" rx="12" ry="16" fill={skinShade} />
      <ellipse {...line} cx="260" cy="250" rx="12" ry="16" fill={skinShade} />
      <circle {...line} strokeWidth={3} cx="140" cy="272" r="5" fill={light} />
      <circle {...line} strokeWidth={3} cx="260" cy="272" r="5" fill={light} />
      <path {...line} fill={look.skin} d="M140 238 C140 178 168 152 200 152 C232 152 260 178 260 238 C260 288 232 320 200 322 C168 320 140 288 140 238 Z" />
      <path fill={skinShade} d="M244 196 C258 222 258 270 236 300 C250 280 254 236 244 196 Z" />

      {HAIR[look.hair](shade(neon, -0.25), light)}

      {look.gear === "visor" && (
        <path {...line} fill={neon} d="M146 232 C160 214 186 218 200 232 C214 218 240 214 254 232 C262 250 250 264 236 264 C222 264 212 256 200 250 C188 256 178 264 164 264 C150 264 138 250 146 232 Z" />
      )}
      <Eyes />
      <path fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" d="M200 262 L195 274 L204 274" />
      {look.gear !== "halfmask" && <path {...line} strokeWidth={3} fill="#9b3a5e" d="M186 290 C194 296 206 296 214 290 C206 300 194 300 186 290 Z" />}
      {look.gear !== "visor" && GEAR[look.gear](neon, light, dark)}
    </svg>
  );
}
