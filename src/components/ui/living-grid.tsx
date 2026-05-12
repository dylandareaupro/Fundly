"use client";

import { useMemo, useRef } from "react";
import { motion, useInView } from "motion/react";

type Props = {
  cols?: number;
  rows?: number;
  className?: string;
};

/**
 * One-shot reveal grid for the Impact 2026 dashboard.
 * Cells fade in along a diagonal wave with subtle scale + glow,
 * then settle into a static, calm state. No pointer interaction.
 */
export function LivingGrid({
  cols = 11,
  rows = 9,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  const cells = useMemo(() => {
    const arr: { x: number; y: number; delay: number; intensity: number }[] = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        // diagonal wave delay (top-left → bottom-right)
        const delay = (x + y * 0.6) * 0.045;
        // radial intensity from center for a soft vignette feel
        const cx = (cols - 1) / 2;
        const cy = (rows - 1) / 2;
        const d = Math.hypot(x - cx, y - cy) / Math.hypot(cx, cy);
        const intensity = 1 - d * 0.55; // 1 at center, ~0.45 at edges
        arr.push({ x, y, delay, intensity });
      }
    }
    return arr;
  }, [cols, rows]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gap: 8,
        padding: 12,
        isolation: "isolate",
      }}
    >
      {/* one-shot diagonal sweep glow */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, x: "-30%" }}
        animate={inView ? { opacity: [0, 0.6, 0], x: ["-30%", "130%", "130%"] } : { opacity: 0 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(110deg, transparent 30%, rgba(43,211,127,0.35) 50%, transparent 70%)",
          mixBlendMode: "screen",
          zIndex: 0,
        }}
      />

      {cells.map((c, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={
            inView
              ? { opacity: 0.2 + c.intensity * 0.55, scale: 1 }
              : { opacity: 0, scale: 0.4 }
          }
          transition={{
            duration: 0.7,
            delay: c.delay,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            borderRadius: 6,
            background:
              "linear-gradient(135deg, rgba(0,166,83,0.95) 0%, rgba(0,129,63,0.85) 100%)",
            boxShadow:
              c.intensity > 0.7
                ? "0 0 14px rgba(43,211,127,0.18)"
                : "none",
            zIndex: 1,
          }}
        />
      ))}
    </div>
  );
}
