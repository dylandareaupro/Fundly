"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";

type Props = {
  to: number;
  from?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  format?: (v: number) => string;
  className?: string;
};

export function AnimatedCounter({
  to,
  from = 0,
  duration = 2.2,
  decimals = 0,
  prefix = "",
  suffix = "",
  format,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(from, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(value) {
        if (format) {
          node.textContent = `${prefix}${format(value)}${suffix}`;
        } else {
          node.textContent = `${prefix}${value.toFixed(decimals)}${suffix}`;
        }
      },
    });
    return () => controls.stop();
  }, [inView, from, to, duration, decimals, prefix, suffix, format]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {from.toFixed(decimals)}
      {suffix}
    </span>
  );
}
