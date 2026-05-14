"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const [variant, setVariant] = useState<"default" | "hover">("default");
  const rafRef = useRef<number | null>(null);
  const [enabled, setEnabled] = useState(false);

  const ringX = useSpring(x, { stiffness: 220, damping: 24, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 220, damping: 24, mass: 0.5 });

  useEffect(() => {
    const isCoarse = window.matchMedia("(hover: none)").matches;
    if (isCoarse) return;
    setEnabled(true);

    let mouseX = 0;
    let mouseY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        x.set(mouseX);
        y.set(mouseY);
        rafRef.current = null;
      });
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        "a, button, [role='button'], [data-cursor='hover']"
      );
      setVariant(interactive ? "hover" : "default");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9998] hidden md:block"
      style={{ x: ringX, y: ringY, willChange: "transform" }}
    >
      <motion.div
        className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--accent)] bg-[var(--accent)]/10"
        animate={{
          width: variant === "hover" ? 42 : 22,
          height: variant === "hover" ? 42 : 22,
          opacity: variant === "hover" ? 1 : 0.85,
        }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
      />
    </motion.div>
  );
}
