"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

type Props = {
  className?: string;
  interactive?: boolean;
  rotateZ?: number;
  src?: string;
  /** aspect ratio as a CSS string like "2263 / 1541" */
  aspect?: string;
};

export function FundlyCard({
  className,
  interactive = true,
  rotateZ = 0,
  src = "/media/card-hd.webp",
  aspect = "2263 / 1541",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(useTransform(my, [-1, 1], [10, -10]), {
    stiffness: 200,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mx, [-1, 1], [-14, 14]), {
    stiffness: 200,
    damping: 22,
  });
  const glareX = useTransform(mx, [-1, 1], ["0%", "100%"]);
  const glareY = useTransform(my, [-1, 1], ["0%", "100%"]);
  const glareBg = useTransform(
    [glareX, glareY] as unknown as MotionValue<string>[],
    ([x, y]: string[]) =>
      `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.28), transparent 55%)`
  );

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div className={className} style={{ perspective: 1400 }}>
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{
          rotateX: interactive ? rotateX : 0,
          rotateY: interactive ? rotateY : 0,
          rotateZ,
          aspectRatio: aspect,
          transformStyle: "preserve-3d",
          borderRadius: "5.5%",
          boxShadow: "0 30px 80px rgba(0,0,0,0.25)",
        }}
        className="relative w-full will-change-transform"
      >
        <Image
          src={src}
          alt="Carte Fundly"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 560px"
          className="select-none object-contain"
          draggable={false}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: interactive ? glareBg : undefined,
            mixBlendMode: "overlay",
            WebkitMaskImage: `url(${src})`,
            maskImage: `url(${src})`,
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
          }}
        />
      </motion.div>
    </div>
  );
}
