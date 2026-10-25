import React from "react";

// Looping ticker, adapted from the Infinite Slider idea in Motion Primitives (MIT, @ibelick on 21st.dev).
// Pure CSS transform animation, so it runs on the GPU and never re-renders React.
interface MarqueeProps {
  items: string[];
  durationSeconds?: number;
  className?: string;
}

export function Marquee({ items, durationSeconds = 40, className = "" }: MarqueeProps) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item} className="flex items-center gap-10 whitespace-nowrap">
          <span>{item}</span>
          <span className="w-1.5 h-1.5 bg-brand-orange" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`marquee overflow-hidden ${className}`}>
      <div className="marquee-track flex w-max" style={{ animationDuration: `${durationSeconds}s` }}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

export default Marquee;
