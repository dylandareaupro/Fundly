"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const [variant, setVariant] = useState<"default" | "hover">("default");
  const rafRef = useRef<number | null>(null);

  const cursorX = useSpring(x, { stiffness: 700, damping: 50, mass: 0.5 });
  const cursorY = useSpring(y, { stiffness: 700, damping: 50, mass: 0.5 });
  const ringX = useSpring(x, { stiffness: 180, damping: 22, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 180, damping: 22, mass: 0.6 });

  useEffect(() => {
    const isCoarse = window.matchMedia("(hover: none)").matches;
    if (isCoarse) return;

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

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden md:block"
        style={{ x: cursorX, y: cursorY }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)] shadow-[0_0_12px_rgba(1,136,70,0.7)]"
          animate={{
            width: variant === "default" ? 8 : 5,
            height: variant === "default" ? 8 : 5,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9997] hidden md:block"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--accent)]"
          animate={{
            width: variant === "hover" ? 44 : 28,
            height: variant === "hover" ? 44 : 28,
            opacity: variant === "hover" ? 0.9 : 0.55,
          }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
        />
      </motion.div>
    </>
  );
}
