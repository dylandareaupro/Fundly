"use client";

import { motion } from "motion/react";
import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "light" | "dark" | "image" | "accent";

/**
 * Single frosted-glass aesthetic — same surface across the site,
 * only the text color changes to keep legibility on different backgrounds.
 *
 * The dusty/warm tone you see on dark/image variants comes from the
 * heavy backdrop blur + saturate picking up colors of what's behind.
 */
const TEXT_BY_VARIANT: Record<Variant, string> = {
  light: "text-[var(--fg-primary)]",
  dark: "text-white",
  image: "text-white",
  accent: "text-white",
};

type Props = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
  showDot?: boolean;
};

export function Eyebrow({
  variant = "light",
  className,
  children,
  showDot = false,
}: Props) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold tracking-[0.14em]",
        "bg-white/15 ring-1 ring-white/35",
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.55),inset_0_-1px_0_0_rgba(255,255,255,0.15),0_6px_20px_-10px_rgba(0,0,0,0.14)]",
        TEXT_BY_VARIANT[variant],
        className
      )}
      style={{
        backdropFilter: "blur(22px) saturate(180%)",
        WebkitBackdropFilter: "blur(22px) saturate(180%)",
        backgroundImage:
          "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 60%)",
      }}
    >
      {showDot && (
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_8px_rgba(0,166,83,0.6)]" />
      )}
      {children}
    </motion.span>
  );
}
