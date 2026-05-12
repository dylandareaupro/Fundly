"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.4,
  });
  const opacity = useTransform(scrollYProgress, [0, 0.005, 1], [0, 1, 1]);

  return (
    <motion.div
      aria-hidden
      style={{ scaleX, opacity }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-[var(--accent)] shadow-[0_0_10px_rgba(1,136,70,0.6)]"
    />
  );
}
