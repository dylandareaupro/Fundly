"use client";

import { type ReactNode, type ButtonHTMLAttributes } from "react";
import { motion } from "motion/react";
import { Magnetic } from "@/components/magnetic";
import { cn } from "@/lib/cn";

type Variant = "accent" | "dark" | "light" | "ghost-light" | "ghost-dark";
type Size = "sm" | "md" | "lg";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  iconRight?: ReactNode;
  iconLeft?: ReactNode;
  magnetic?: boolean;
};

const variantClasses: Record<Variant, string> = {
  accent:
    "bg-[var(--accent)] text-white hover:bg-[var(--accent-deep)] shadow-[0_8px_24px_-12px_rgba(0,166,83,0.5)]",
  dark:
    "bg-[var(--bg-dark)] text-white hover:bg-[#1A1F18]",
  light:
    "bg-white text-[var(--fg-primary)] hover:bg-[var(--bg-light)] border border-[var(--border-light)]",
  "ghost-light":
    "bg-transparent text-[var(--fg-primary)] border border-[var(--border-light-strong)] hover:bg-black/[0.03]",
  "ghost-dark":
    "bg-transparent text-white border border-white/20 hover:bg-white/[0.06]",
};

const sizeClasses: Record<Size, string> = {
  sm: "text-[13px] px-4 py-2",
  md: "text-[14px] px-5 py-3",
  lg: "text-[15px] px-7 py-3.5",
};

export function Button({
  variant = "accent",
  size = "md",
  iconRight,
  iconLeft,
  className,
  children,
  magnetic = true,
  ...rest
}: Props) {
  const content = (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ y: -1 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-[-0.005em] transition-[background,color,border,box-shadow,transform] duration-300 ease-out will-change-transform",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...(rest as Record<string, unknown>)}
    >
      {iconLeft && <span className="inline-flex">{iconLeft}</span>}
      <span className="relative">{children}</span>
      {iconRight && <span className="inline-flex">{iconRight}</span>}
    </motion.button>
  );

  if (!magnetic) return content;
  return (
    <Magnetic strength={0.25} className="inline-block">
      {content}
    </Magnetic>
  );
}

export function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path
        d="M2.5 7H11.5M11.5 7L7.5 3M11.5 7L7.5 11"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
