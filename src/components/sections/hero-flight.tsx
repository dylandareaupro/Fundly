"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Hero } from "@/components/sections/hero";
import { DataStats } from "@/components/sections/data-stats";
import { FundlyCard } from "@/components/ui/fundly-card";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/**
 * Hero block — Hero (with press marquee overlay) + DataStats.
 * The card sits at the bottom of the hero and visually overlaps into
 * the stats below. On page load, the card rises from far below with a
 * dramatic scale + rotation arc to act as the centerpiece of the
 * cinematic intro.
 */
export function HeroFlight() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [slotRect, setSlotRect] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    const measure = () => {
      const wrap = wrapperRef.current;
      if (!wrap) return;
      const slot = wrap.querySelector<HTMLDivElement>("[data-card-slot]");
      if (!slot) return;
      const slotR = slot.getBoundingClientRect();
      const wrapR = wrap.getBoundingClientRect();
      setSlotRect({
        top: slotR.top - wrapR.top,
        left: slotR.left - wrapR.left,
        width: slotR.width,
        height: slotR.height,
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <Hero />
      <DataStats />

      {slotRect && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: slotRect.top + Math.round(slotRect.height * 0.5),
            left: slotRect.left,
            width: slotRect.width,
            zIndex: 30,
            pointerEvents: "none",
          }}
        >
          <motion.div
            initial={{
              y: 200,
              opacity: 0,
              scale: 0.86,
              rotate: -6,
            }}
            animate={{
              y: 0,
              opacity: 1,
              scale: 1,
              rotate: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 55,
              damping: 18,
              mass: 1.1,
              restDelta: 0.001,
              delay: 1.1,
              opacity: { duration: 0.9, ease: EASE_OUT, delay: 1.1 },
            }}
            style={{
              pointerEvents: "auto",
              willChange: "transform, opacity",
              backfaceVisibility: "hidden",
            }}
          >
            <FundlyCard />
          </motion.div>
        </div>
      )}
    </div>
  );
}
