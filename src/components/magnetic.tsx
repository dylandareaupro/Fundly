"use client";

import {
  useRef,
  type ReactNode,
  type MouseEvent,
  type ElementType,
} from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

type MagneticProps = {
  children: ReactNode;
  strength?: number;
  className?: string;
  as?: ElementType;
};

export function Magnetic({
  children,
  strength = 0.35,
  className,
  as = "div",
}: MagneticProps) {
  const ref = useRef<HTMLElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.5 });

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const MotionComp = motion.create(as);

  return (
    <MotionComp
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </MotionComp>
  );
}
