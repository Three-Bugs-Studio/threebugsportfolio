import React, { useEffect, useRef, useState } from "react";

// Terminal-style decode effect, adapted from the Text Scramble idea in Motion Primitives (MIT, @ibelick on 21st.dev).
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_/<>#";

interface TextScrambleProps {
  children: string;
  trigger?: boolean; // scramble each time this turns true
  scrambleOnHover?: boolean;
  duration?: number; // seconds
  className?: string;
}

export function TextScramble({ children, trigger = true, scrambleOnHover = false, duration = 0.6, className }: TextScrambleProps) {
  // Waiting for a trigger: show a masked placeholder so the text decodes in, instead of flashing then scrambling.
  const masked = children.replace(/\S/g, "_");
  const [text, setText] = useState(trigger || scrambleOnHover ? children : masked);
  const frame = useRef(0);

  const run = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(children);
      return;
    }
    cancelAnimationFrame(frame.current);
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / (duration * 1000));
      const settled = Math.floor(progress * children.length);
      setText(
        children
          .split("")
          .map((ch, i) => (i < settled || ch === " " ? ch : CHARS[Math.floor(Math.random() * CHARS.length)]))
          .join("")
      );
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (trigger) run();
    else setText(scrambleOnHover ? children : masked);
    return () => cancelAnimationFrame(frame.current);
  }, [trigger, children]);

  return (
    <span
      className={className}
      aria-label={children}
      onMouseEnter={scrambleOnHover ? run : undefined}
    >
      <span aria-hidden="true">{text}</span>
    </span>
  );
}

export default TextScramble;
