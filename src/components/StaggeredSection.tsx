import React, { useRef } from "react";
import { motion, useInView } from "motion/react";

interface StaggeredSectionProps {
  children: React.ReactNode;
  id: string;
  sectorName: string;
  /** Section index shown in the header rule, e.g. "01". */
  sectorCode: string;
  lang: "vi" | "en";
}

// Corporate section shell: an index + title rule on top, then the content fades in once.
export default function StaggeredSection({ children, id, sectorName, sectorCode }: StaggeredSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-120px" });

  return (
    <div ref={containerRef} id={id} className="relative border-b border-line scroll-mt-24">
      <div className="border-b border-line px-6 md:px-12 select-none">
        <div className="max-w-7xl mx-auto flex items-center gap-4 py-4 font-mono text-xs uppercase tracking-[0.3em]">
          <span className="text-brand-ink font-semibold">{sectorCode}</span>
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isInView ? 1 : 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ originX: 0 }}
            className="h-px w-10 bg-ink-muted/60"
          />
          <span className="text-ink font-medium">{sectorName}</span>
          <span className="ml-auto hidden md:inline text-ink-muted">Three Bugs Studio</span>
        </div>
      </div>

      {/* Variant labels (not plain targets) so children using hidden/visible variants still animate */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 16 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.08 } },
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative"
      >
        {children}
      </motion.div>
    </div>
  );
}
