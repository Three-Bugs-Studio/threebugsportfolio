import React, { useId } from "react";

// [3B] Bracket mark. With `wordmark`, it gets the Plate: "THREE BUGS" on a chamfered plate
// that fades out to the right. Geometry matches the logo board: B is the 3 plus a stem.
const BRACKET_L = "M14 6 H4 V74 H14";
const BRACKET_R = "M106 6 H116 V74 H106";
const LETTERS =
  "M20 16 H44 L52 24 V36 L48 40 L52 44 V56 L44 64 H20 V56 H40.7 L44 52.7 V48 L40 44 H28 V36 H40 L44 32 V27.3 L40.7 24 H20 Z " +
  "M62 16 H88 L96 24 V36 L92 40 L96 44 V56 L88 64 H62 Z M70 24 V36 H84 L88 32 V27.3 L84.7 24 Z M70 44 V56 H84.7 L88 52.7 V48 L84 44 Z";
const ANTENNAE = "M74 20 V12 L68 6 M84 20 V12 L90 6";

interface LogoProps {
  className?: string;
  wordmark?: boolean;
  /** Turn off when the mark renders under ~64px wide; the antennae read as a tone mark there. */
  antennae?: boolean;
  /** Play the one-shot boot sequence on mount (keyframes in index.css, skipped for reduced motion). */
  animate?: boolean;
}

export default function Logo({ className = "h-9", wordmark = false, antennae = true, animate = false }: LogoProps) {
  const id = useId().replace(/:/g, "");
  const brand = { stopColor: "var(--brand-ink)" };
  const bracket = { fill: "none", strokeWidth: 5, strokeLinecap: "square" as const, style: { stroke: "var(--brand-ink)" } };

  return (
    <svg
      viewBox={`0 0 ${wordmark ? 480 : 120} 80`}
      className={`w-auto shrink-0 text-ink ${animate ? "logo-boot " : ""}${className}`}
      role="img"
      aria-label="Three Bugs Studio"
    >
      <path className="lb-l" d={BRACKET_L} {...bracket} />
      <path className="lb-r" d={BRACKET_R} {...bracket} />
      <g transform="translate(2 0)">
        {animate && <path className="lb-ghost" d={LETTERS} style={{ fill: "var(--brand-ink)" }} />}
        <path className="lb-letters" d={LETTERS} fill="currentColor" />
        {antennae && <path className="lb-ant" d={ANTENNAE} pathLength={1} fill="none" stroke="currentColor" strokeWidth={4} />}
      </g>
      {wordmark && (
        <>
          <defs>
            <linearGradient id={`${id}f`} x1="0" x2="1">
              <stop offset="0" style={{ ...brand, stopOpacity: 0.22 }} />
              <stop offset="1" style={{ ...brand, stopOpacity: 0 }} />
            </linearGradient>
            <linearGradient id={`${id}s`} x1="0" x2="1">
              <stop offset="0" style={brand} />
              <stop offset="0.75" style={{ ...brand, stopOpacity: 0 }} />
            </linearGradient>
          </defs>
          <polygon className="lb-fill" points="134,22 142,14 480,14 480,66 134,66" fill={`url(#${id}f)`} />
          <polygon
            className="lb-plate"
            points="134,22 142,14 480,14 480,66 134,66"
            pathLength={1}
            fill="none"
            stroke={`url(#${id}s)`}
            strokeWidth={2}
          />
          <text className="lb-word" x="154" y="49" fill="currentColor" fontFamily="Michroma, sans-serif" fontSize="24" letterSpacing="5">
            THREE BUGS
          </text>
        </>
      )}
    </svg>
  );
}
