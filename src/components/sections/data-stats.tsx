"use client";

import { motion } from "motion/react";
import { AnimatedCounter } from "@/components/animated-counter";

const STATS = [
  { value: 250, suffix: "K+", label: "Utilisateurs actifs", note: "dans plus de 40 marchés" },
  { value: 2, prefix: "$", suffix: "B+", label: "Transactions traitées", note: "annualisé 2026" },
  { value: 15, suffix: "K", label: "Tonnes de CO₂ compensées", note: "compensations vérifiées" },
  { value: 40, suffix: "+", label: "Pays couverts", note: "et en croissance" },
];

export function DataStats() {
  return (
    <section className="relative bg-[var(--bg-dark)] py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12 md:gap-x-12">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.08,
              }}
              className="relative border-l border-white/[0.1] pl-5 sm:pl-6 [&:nth-child(odd)]:border-l-0 [&:nth-child(odd)]:pl-0 md:[&:nth-child(odd)]:border-l md:[&:nth-child(odd)]:pl-6 md:[&:nth-child(1)]:border-l-0 md:[&:nth-child(1)]:pl-0"
            >
              <div className="text-[clamp(3rem,5.5vw,4.5rem)] font-bold leading-none tracking-[-0.04em] text-white">
                <AnimatedCounter
                  to={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  decimals={0}
                />
              </div>
              <p className="mt-5 text-[16px] font-semibold text-[var(--fg-on-dark-primary)]">
                {stat.label}
              </p>
              <p className="mt-1 text-[14px] text-[var(--fg-on-dark-secondary)]">
                {stat.note}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
