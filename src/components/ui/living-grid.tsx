"use client";

import { useMemo, useRef } from "react";
import { useInView } from "motion/react";

type Props = {
  cols?: number;
  rows?: number;
  className?: string;
};

/**
 * One-shot reveal grid for the Impact 2026 dashboard.
 * Cells fade in along a diagonal wave with subtle scale + glow,
 * then settle into a static, calm state. Uses CSS animations driven
 * by inline custom properties so all 99 cells share a single keyframe
 * animation instead of spawning 99 motion components.
 */
export function LivingGrid({
  cols = 11,
  rows = 9,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  const cells = useMemo(() => {
    const arr: { delay: number; intensity: number }[] = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const delay = (x + y * 0.6) * 0.045;
        const cx = (cols - 1) / 2;
        const cy = (rows - 1) / 2;
        const d = Math.hypot(x - cx, y - cy) / Math.hypot(cx, cy);
        const intensity = 1 - d * 0.55;
        arr.push({ delay, intensity });
      }
    }
    return arr;
  }, [cols, rows]);

  return (
    <div
      ref={ref}
      className={className}
      data-in-view={inView ? "true" : "false"}
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
      <style>{`
        @keyframes lg-cell-in {
          0%   { opacity: 0; transform: scale(0.4); }
          100% { opacity: var(--lg-target-opacity, 0.6); transform: scale(1); }
        }
        @keyframes lg-sweep {
          0%   { opacity: 0; transform: translateX(-30%); }
          25%  { opacity: 0.6; }
          100% { opacity: 0; transform: translateX(130%); }
        }
        [data-in-view="true"] .lg-cell {
          animation: lg-cell-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: var(--lg-delay, 0s);
        }
        [data-in-view="true"] .lg-sweep {
          animation: lg-sweep 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
        }
      `}</style>

      <div
        aria-hidden
        className="lg-sweep"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(110deg, transparent 30%, rgba(43,211,127,0.35) 50%, transparent 70%)",
          mixBlendMode: "screen",
          zIndex: 0,
          opacity: 0,
          willChange: "transform, opacity",
        }}
      />

      {cells.map((c, i) => (
        <div
          key={i}
          className="lg-cell"
          style={{
            opacity: 0,
            borderRadius: 6,
            background:
              "linear-gradient(135deg, rgba(0,166,83,0.95) 0%, rgba(0,129,63,0.85) 100%)",
            boxShadow:
              c.intensity > 0.7
                ? "0 0 14px rgba(43,211,127,0.18)"
                : "none",
            zIndex: 1,
            ["--lg-delay" as string]: `${c.delay}s`,
            ["--lg-target-opacity" as string]: `${0.2 + c.intensity * 0.55}`,
          }}
        />
      ))}
    </div>
  );
}
