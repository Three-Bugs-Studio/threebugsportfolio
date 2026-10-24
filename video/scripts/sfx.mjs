// Synthesizes the promo's sound effects as 16-bit mono WAVs in public/sfx (run: node scripts/sfx.mjs).
import { mkdirSync, writeFileSync } from "node:fs";

const RATE = 44100;
const OUT = new URL("../public/sfx/", import.meta.url);
mkdirSync(OUT, { recursive: true });

const write = (name, seconds, fn) => {
  const n = Math.round(seconds * RATE);
  const buf = Buffer.alloc(44 + n * 2);
  buf.write("RIFF", 0); buf.writeUInt32LE(36 + n * 2, 4); buf.write("WAVE", 8);
  buf.write("fmt ", 12); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(1, 22);
  buf.writeUInt32LE(RATE, 24); buf.writeUInt32LE(RATE * 2, 28); buf.writeUInt16LE(2, 32); buf.writeUInt16LE(16, 34);
  buf.write("data", 36); buf.writeUInt32LE(n * 2, 40);
  let lp = 0;
  for (let i = 0; i < n; i++) {
    const t = i / RATE;
    const s = Math.max(-1, Math.min(1, fn(t, t / seconds, (x, a) => (lp += a * (x - lp)))));
    buf.writeInt16LE(Math.round(s * 32767), 44 + i * 2);
  }
  writeFileSync(new URL(name, OUT), buf);
};
const noise = () => Math.random() * 2 - 1;
const sin = (f, t) => Math.sin(2 * Math.PI * f * t);

// Mechanical key click: short filtered noise tick plus a tiny body thump.
write("key.wav", 0.05, (t, p, lowpass) => (lowpass(noise(), 0.5) * 0.6 + sin(180, t) * 0.3) * Math.exp(-t * 120));

// Scene whoosh: noise swept by a rising-then-falling lowpass, swelling in and out.
write("whoosh.wav", 0.6, (t, p, lowpass) => lowpass(noise(), 0.02 + 0.25 * Math.sin(Math.PI * p)) * Math.sin(Math.PI * p) ** 2 * 1.4);

// UI pop: quick downward sine blip.
write("pop.wav", 0.14, (t) => sin(900 - t * 3000, t) * Math.exp(-t * 30) * 0.5);

// Boot chime: A-major chord with a soft attack and long tail.
write("boot.wav", 1.6, (t) =>
  ([220, 277.18, 329.63, 440].reduce((a, f) => a + sin(f, t), 0) / 4) * Math.min(1, t * 20) * Math.exp(-t * 2.2) * 0.6);

// Background bed: the site's 55/110 Hz studio hum with a slow swell, 30s.
write("hum.wav", 30, (t, p) =>
  (sin(55, t) * 0.6 + sin(110, t) * 0.25 + sin(165, t) * 0.08) * (0.8 + 0.2 * sin(0.15, t)) * Math.min(1, t * 2, (1 - p) * 60) * 0.35);

console.log("sfx written to", OUT.pathname);
