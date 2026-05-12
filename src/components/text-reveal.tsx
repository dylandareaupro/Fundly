"use client";

import { motion, type Variants } from "motion/react";
import { type ReactNode } from "react";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  staggerWord?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
};

const containerVariants: Variants = {
  hidden: {},
  visible: (custom: number) => ({
    transition: { staggerChildren: custom, delayChildren: 0.05 },
  }),
};

const wordVariants: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
};

export function TextReveal({
  text,
  className,
  delay = 0,
  staggerWord = 0.05,
  as = "h2",
}: Props) {
  const Tag = motion[as] as typeof motion.div;
  const words = text.split(/(\s+)/);

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay }}
      custom={staggerWord}
      variants={containerVariants}
    >
      {words.map((w, i) =>
        w.trim() === "" ? (
          <span key={i}>{w}</span>
        ) : (
          <span
            key={i}
            style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}
          >
            <motion.span
              variants={wordVariants}
              style={{ display: "inline-block" }}
            >
              {w}
            </motion.span>
          </span>
        )
      )}
    </Tag>
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
