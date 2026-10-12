import React from "react";

// ---------------------------------------------------------------------------
// Compact Mini CRT Loader for Skeletons (Calm, zero ping flicker)
// ---------------------------------------------------------------------------
export function MiniCrtLoader() {
  return (
    <div className="relative flex flex-col items-center justify-center p-5 bg-[#0a0a0c] border border-brand-orange/25 rounded-sm shadow-[0_0_20px_rgba(255,106,0,0.08)] select-none max-w-xs mx-auto">
      {/* Top Mini Bezel */}
      <div className="w-full flex items-center justify-between border-b border-white/10 pb-1.5 mb-2.5 font-mono text-[9px]">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shadow-[0_0_6px_rgba(255,106,0,0.7)]" />
          <span className="text-brand-orange font-bold">CRT-SYS</span>
        </div>
        <span className="text-[#8E8E93]">60Hz PHOSPHOR</span>
      </div>

      {/* Mini CRT Monitor Screen Display */}
      <div className="relative w-40 h-24 bg-[#050505] border border-brand-orange/35 rounded-sm overflow-hidden flex flex-col items-center justify-center p-2 text-center shadow-[inset_0_0_12px_rgba(255,106,0,0.12)]">
        {/* Soft Scanline bar */}
        <div className="absolute inset-x-0 h-[1px] bg-brand-orange/25 shadow-[0_0_6px_#FF6A00] animate-scanline pointer-events-none" />

        {/* Pulse Radar Grid - Calm steady glow, NO aggressive ping */}
        <div className="w-8 h-8 rounded-full border border-brand-orange/25 flex items-center justify-center mb-1 relative">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-orange shadow-[0_0_6px_#FF6A00]" />
        </div>

        <span className="font-mono text-[9px] text-brand-orange font-bold tracking-wider">
          THREE BUGS STUDIO
        </span>
        <span className="font-mono text-[8px] text-[#8E8E93]">
          LOADING SYSTEM...
        </span>
      </div>

      {/* Mini Status LEDs */}
      <div className="w-full flex items-center justify-between pt-2 mt-2 border-t border-white/5 font-mono text-[8px] text-[#8E8E93]/60">
        <span>STATUS: BOOTING</span>
        <span className="text-brand-orange font-bold">OK</span>
      </div>
    </div>
  );
}
