// Synthesizes the SaaS reel's original 120 BPM EBM track as a 16-bit mono WAV in public/music (run: node scripts/music.mjs).
// The arrangement (which bars have kicks) is mirrored in src/SaasReel.tsx so the picture pulses with the kick.
import { mkdirSync, writeFileSync } from "node:fs";

const RATE = 44100;
const BEAT = 0.5; // 120 BPM
const STEP = BEAT / 4; // 16th note
const BAR = BEAT * 4;
const BARS = 15; // 30 s
const N = Math.round(BARS * BAR * RATE);
const mix = new Float32Array(N);

const TAU = 2 * Math.PI;
let seed = 7; // seeded noise so every render sounds the same
const noise = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) * 2 - 1;
const lowpass = () => { let y = 0; return (x, k) => (y += k * (x - y)); };
// Chamberlin state-variable filter; stable while fc stays below ~RATE/6.
const svf = () => {
  let low = 0, band = 0;
  return (x, fc, q) => {
    const f = 2 * Math.sin((Math.PI * Math.min(fc, 6000)) / RATE);
    low += f * band;
    const high = x - low - q * band;
    band += f * high;
    return { low, band, high };
  };
};
const add = (t0, dur, gain, fn) => {
  const s0 = Math.round(t0 * RATE);
  for (let i = 0; i < Math.round(dur * RATE) && s0 + i < N; i++) mix[s0 + i] += fn(i / RATE) * gain;
};

// Arrangement: 0-1 intro build, 2-6 drop, 7 breakdown, 8-13 second drop, 14 outro hit.
export const kickBar = (b) => b >= 2 && b <= 13 && b !== 7;
const clapBar = (b) => b >= 4 && b <= 13 && b !== 7;
const hatBar = (b) => b >= 2 && b <= 13 && b !== 7;
const stabBar = (b) => b >= 8 && b <= 13;
const A1 = 55;
const ROOTS = [A1, A1, 43.65, 49]; // Am Am F G
const CHORDS = [[0, 3, 7], [0, 3, 7], [0, 4, 7], [0, 4, 7]];
const BASS = [0, 0, 12, 0, 0, 0, 12, 0, 0, 0, 12, 0, 0, 7, 12, 0]; // octave-bounce 16ths
const semi = (f, s) => f * 2 ** (s / 12);

// Drums.
const kick = (t0, gain = 1) =>
  add(t0, 0.45, gain, (t) => Math.tanh((Math.sin(TAU * (45 * t + (105 * (1 - Math.exp(-30 * t))) / 30)) * Math.exp(-6 * t) + noise() * Math.exp(-400 * t) * 0.3) * 1.6));
const clap = (t0) => {
  const a = lowpass(), b = lowpass();
  add(t0, 0.3, 0.45, (t) => {
    const n = noise();
    const env = [0, 0.011, 0.022].reduce((s, o) => s + (t >= o ? Math.exp(-(t - o) * 90) : 0), 0) * 0.5 + Math.exp(-t * 16) * 0.6;
    return (a(n, 0.45) - b(n, 0.08)) * env * 2.2;
  });
};
const hat = (t0, decay, gain) => {
  const lp = lowpass();
  add(t0, 0.25, gain, (t) => { const n = noise(); return (n - lp(n, 0.35)) * Math.exp(-t * decay); });
};
const impact = (t0) => {
  const lp = lowpass();
  add(t0, 2, 0.7, (t) => { const n = noise(); return (n - lp(n, 0.2)) * Math.exp(-t * 2.5) * 0.5 + Math.sin(TAU * 48 * t) * Math.exp(-t * 3) * 0.9; });
};
const riser = (t0, dur) => {
  const f = svf();
  add(t0, dur, 0.5, (t) => { const p = t / dur; return f(noise(), 300 + 5200 * p * p, 0.4).band * p * p; });
};
// Two detuned saws per chord tone through a closing lowpass.
const stab = (t0, bar) => {
  const f = svf();
  add(t0, 0.7, 0.16, (t) => {
    const x = CHORDS[bar % 4].reduce((s, o) => { const hz = semi(ROOTS[bar % 4] * 4, o); return s + ((hz * t) % 1) + (((hz * 1.007 * t) % 1)) - 1; }, 0);
    return f(x, 400 + 3200 * Math.exp(-t * 7), 0.7).low * Math.exp(-t * 4) * Math.min(1, t * 300);
  });
};
// Soft triangle pad for the intro and breakdown.
const pad = (t0, dur, bar) =>
  add(t0, dur, 0.09, (t) => {
    const env = Math.min(1, t / 0.6, (dur - t) / 0.4);
    return CHORDS[bar % 4].reduce((s, o) => { const ph = (semi(ROOTS[bar % 4] * 4, o) * t) % 1; return s + 4 * Math.abs(ph - 0.5) - 1; }, 0) * env;
  });

for (let b = 0; b < BARS; b++) {
  const t0 = b * BAR;
  for (let beat = 0; beat < 4; beat++) {
    const tb = t0 + beat * BEAT;
    if (kickBar(b)) kick(tb);
    if (clapBar(b) && beat % 2 === 1) clap(tb);
    if (hatBar(b)) hat(tb + BEAT / 2, 22, 0.22);
    if (stabBar(b) && beat === 0) stab(tb, b);
  }
  if (b >= 8 && b <= 13) for (let s = 0; s < 16; s++) if (s % 2) hat(t0 + s * STEP, 70, 0.07);
  if (b <= 1 || b === 7) pad(t0, BAR, b);
}
riser(BAR, BAR);
riser(7 * BAR, BAR);
[2, 8].forEach((b) => impact(b * BAR));
impact(14 * BAR);
kick(14 * BAR, 1.1);

// Bass: one continuous voice so the filter and phase carry across notes; ducked after each kick.
{
  const filter = svf();
  let phase = 0;
  for (let i = 0; i < N; i++) {
    const t = i / RATE;
    const b = Math.floor(t / BAR);
    if (b > 14) break;
    const s = Math.floor(t / STEP);
    const tl = t - s * STEP;
    let hz, amp, cut;
    if (b === 14) {
      // Final held note under the outro hit.
      const tt = t - 14 * BAR;
      hz = A1; amp = Math.exp(-tt * 1.6); cut = 200 + 900 * Math.exp(-tt * 3);
    } else {
      hz = semi(ROOTS[b % 4], BASS[s % 16]);
      const gate = tl < STEP * 0.8 ? 1 : Math.exp(-(tl - STEP * 0.8) * 250);
      amp = Math.min(1, tl * 500) * gate * (s % 4 === 0 ? 1 : 0.8);
      const build = b <= 1 ? t / (2 * BAR) : 1;
      const [base, env] = b === 7 ? [170, 350] : [150 + 120 * build, 300 + 1700 * build];
      cut = base + env * Math.exp(-tl * 28) * (s % 4 === 0 ? 1.2 : 1);
    }
    phase = (phase + hz / RATE) % 1;
    const osc = (phase * 2 - 1) * 0.7 + (phase < 0.5 ? 0.3 : -0.3);
    const duck = kickBar(b) ? 1 - 0.55 * Math.exp(-((t % BEAT) * 14)) : 1;
    mix[i] += filter(osc, cut, 0.35).low * amp * duck * 0.55;
  }
}

// Master: soft clip, normalise to -1 dBFS, short fade at both ends.
let raw = 0;
for (let i = 0; i < N; i++) raw = Math.max(raw, Math.abs(mix[i]));
let peak = 0;
for (let i = 0; i < N; i++) { mix[i] = Math.tanh((mix[i] / raw) * 1.4); peak = Math.max(peak, Math.abs(mix[i])); }
const gain = 0.89 / peak;
const buf = Buffer.alloc(44 + N * 2);
buf.write("RIFF", 0); buf.writeUInt32LE(36 + N * 2, 4); buf.write("WAVE", 8);
buf.write("fmt ", 12); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(1, 22);
buf.writeUInt32LE(RATE, 24); buf.writeUInt32LE(RATE * 2, 28); buf.writeUInt16LE(2, 32); buf.writeUInt16LE(16, 34);
buf.write("data", 36); buf.writeUInt32LE(N * 2, 40);
for (let i = 0; i < N; i++) {
  const fade = Math.min(1, i / (0.005 * RATE), (N - i) / (0.5 * RATE));
  buf.writeInt16LE(Math.round(mix[i] * gain * fade * 32767), 44 + i * 2);
}
const out = new URL("../public/music/", import.meta.url);
mkdirSync(out, { recursive: true });
writeFileSync(new URL("ebm-120.wav", out), buf);
console.log(`ebm-120.wav written (${(N / RATE).toFixed(1)} s, raw peak ${raw.toFixed(2)})`);
