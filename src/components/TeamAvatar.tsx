import React, { useId } from "react";

export type AvatarHair = "cap" | "bald" | "spiky" | "side" | "curly" | "beanie" | "long";
export type AvatarBeard = "none" | "stubble" | "full" | "mustache" | "short";

export interface AvatarLook {
  hair: AvatarHair;
  beard: AvatarBeard;
  glasses?: boolean;
  skin: string;
  hairColor: string;
}

// Shade a hex colour towards black (amt < 0) or white (amt > 0).
const shade = (hex: string, amt: number) => {
  const n = parseInt(hex.slice(1), 16);
  const mix = (c: number) => Math.round(amt < 0 ? c * (1 + amt) : c + (255 - c) * amt);
  return `rgb(${mix(n >> 16)}, ${mix((n >> 8) & 255)}, ${mix(n & 255)})`;
};

const OUT = "#4a2b2b";
const ln = { stroke: OUT, strokeWidth: 3.5, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
const HEAD = "M62 92 C62 62 78 44 100 44 C122 44 138 62 138 92 L138 112 C138 136 122 150 100 150 C78 150 62 136 62 112 Z";

/** A friendly line-art portrait in a gradient circle (or square, for ID-card photos), tinted with the member's colour. */
export default function TeamAvatar({ look, color, title, className = "", square = false }: { look: AvatarLook; color: string; title: string; className?: string; square?: boolean }) {
  const id = useId().replace(/:/g, "");
  const skinShade = shade(look.skin, -0.12);
  const hair = look.hairColor;
  const isLong = look.hair === "long";

  return (
    <svg viewBox="0 0 200 200" role="img" aria-label={title} className={className}>
      <defs>
        <linearGradient id={`bg${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={shade(color, 0.7)} />
          <stop offset="1" stopColor={shade(color, 0.2)} />
        </linearGradient>
        <clipPath id={`c${id}`}>
          {square ? <rect width="200" height="200" /> : <circle cx="100" cy="100" r="100" />}
        </clipPath>
      </defs>

      {square ? <rect width="200" height="200" fill={`url(#bg${id})`} /> : <circle cx="100" cy="100" r="100" fill={`url(#bg${id})`} />}
      <g clipPath={`url(#c${id})`}>
        {/* Long hair sits behind the head */}
        {isLong && <path {...ln} fill={hair} d="M56 166 C44 112 52 50 100 40 C148 50 156 112 144 166 Z" />}

        {/* Shirt and neck */}
        <path {...ln} fill="#ffffff" d="M36 204 C42 170 70 156 100 156 C130 156 158 170 164 204 Z" />
        <rect {...ln} x="86" y="134" width="28" height="28" fill={skinShade} />
        <path {...ln} fill="none" d="M80 158 C86 170 114 170 120 158" />

        {/* Ears and head */}
        <path {...ln} fill={look.skin} d="M63 92 C50 92 50 116 64 114" />
        <path {...ln} fill={look.skin} d="M137 92 C150 92 150 116 136 114" />
        {isLong && (
          <g>
            <circle {...ln} strokeWidth={2.5} cx="58" cy="118" r="4" fill={color} />
            <circle {...ln} strokeWidth={2.5} cx="142" cy="118" r="4" fill={color} />
          </g>
        )}
        <path {...ln} fill={look.skin} d={HEAD} />
        <circle cx="78" cy="114" r="6" fill="#F49A9A" opacity="0.55" />
        <circle cx="122" cy="114" r="6" fill="#F49A9A" opacity="0.55" />

        {/* Beard */}
        {look.beard === "full" && (
          <g>
            <path {...ln} fill={hair} d="M62 106 C62 138 80 156 100 156 C120 156 138 138 138 106 C132 118 122 122 112 120 C106 128 94 128 88 120 C78 122 68 118 62 106 Z" />
            <path fill="none" stroke={shade(hair, -0.35)} strokeWidth="2.5" strokeLinecap="round" d="M92 136 C98 140 94 146 102 148 M108 132 C112 138 108 142 114 146" />
          </g>
        )}
        {look.beard === "stubble" && (
          <path fill={hair} opacity="0.3" d="M64 108 C64 138 80 150 100 150 C120 150 136 138 136 108 C130 120 120 124 112 122 C106 128 94 128 88 122 C80 124 70 120 64 108 Z" />
        )}
        {look.beard === "short" && <path {...ln} fill={hair} d="M80 128 C84 148 116 148 120 128 C112 138 88 138 80 128 Z" />}
        {look.beard === "mustache" && (
          <path {...ln} strokeWidth={2.5} fill={hair} d="M86 122 C92 115 98 117 100 120 C102 117 108 115 114 122 C108 126 102 124 100 123 C98 124 92 126 86 122 Z" />
        )}

        {/* Face */}
        <circle cx="86" cy="100" r="3.2" fill={OUT} />
        <circle cx="114" cy="100" r="3.2" fill={OUT} />
        {isLong ? (
          <path fill="none" stroke={OUT} strokeWidth="2.5" strokeLinecap="round" d="M80 96 L82 99 M120 96 L118 99 M80 88 C84 85 90 85 94 87 M106 87 C110 85 116 85 120 88" />
        ) : (
          <path fill="none" stroke={hair} strokeWidth="5" strokeLinecap="round" d="M78 89 L94 91 M106 91 L122 89" />
        )}
        <path fill="none" stroke={OUT} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="M100 100 L97 113 L103 113" />
        {isLong ? (
          <path {...ln} strokeWidth={2.5} fill="#D9686F" d="M92 126 C96 130 104 130 108 126 C104 133 96 133 92 126 Z" />
        ) : (
          <path fill="none" stroke={OUT} strokeWidth="3" strokeLinecap="round" d="M92 127 C96 130 104 130 108 127" />
        )}
        {look.glasses && (
          <g {...ln} strokeWidth={3} fill="#ffffff" fillOpacity={0.25}>
            <rect x="73" y="91" width="25" height="18" rx="7" />
            <rect x="102" y="91" width="25" height="18" rx="7" />
            <path fill="none" d="M98 99 L102 99" />
          </g>
        )}

        {/* Hair and headwear */}
        {look.hair === "cap" && (
          <g>
            <path {...ln} fill={color} d="M60 84 C60 52 80 38 100 38 C122 38 140 54 140 84 Z" />
            <path {...ln} fill={shade(color, -0.2)} d="M138 74 L160 77 C160 84 150 86 138 84 Z" />
            <path {...ln} fill="none" d="M60 82 L140 82 M100 38 L100 50" />
          </g>
        )}
        {look.hair === "bald" && <path fill="none" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="4" strokeLinecap="round" d="M84 56 C92 51 106 51 114 56" />}
        {look.hair === "spiky" && (
          <path {...ln} fill={hair} d="M62 90 C58 58 76 40 100 40 C124 40 142 58 138 90 L130 74 L124 84 L118 70 L110 82 L102 66 L94 80 L86 68 L80 82 L72 72 Z" />
        )}
        {look.hair === "side" && (
          <path {...ln} fill={hair} d="M62 92 C58 58 80 40 104 42 C130 44 144 64 138 92 C132 72 116 62 98 66 C84 70 72 80 62 92 Z" />
        )}
        {look.hair === "curly" && (
          <path {...ln} fill={hair} d="M62 92 C52 80 58 62 70 60 C70 46 86 38 96 44 C104 34 122 38 124 50 C138 50 146 66 138 82 C140 86 140 90 138 94 C130 80 116 72 100 72 C84 72 70 80 62 92 Z" />
        )}
        {look.hair === "beanie" && (
          <g>
            <path {...ln} fill={shade(color, -0.1)} d="M60 82 C60 50 80 36 100 36 C120 36 140 50 140 82 Z" />
            <path {...ln} fill={shade(color, 0.3)} d="M57 74 L143 74 L143 90 L57 90 Z" />
            <circle {...ln} cx="100" cy="32" r="8" fill={shade(color, 0.3)} />
          </g>
        )}
        {isLong && (
          <path {...ln} fill={hair} d="M62 94 C60 60 80 44 100 44 C120 44 140 60 138 94 C130 78 120 70 110 72 C102 82 90 86 78 86 C70 88 66 90 62 94 Z" />
        )}
      </g>
    </svg>
  );
}
