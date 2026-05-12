"use client";

import { motion } from "motion/react";
import { AnimatedCounter } from "@/components/animated-counter";
import { LivingGrid } from "@/components/ui/living-grid";

const PROJECTS = [
  { name: "Reforestation · Bénin", value: 78 },
  { name: "Énergie solaire · Inde", value: 63 },
  { name: "Mangroves · Sénégal", value: 91 },
];

export function ImpactDashboard() {
  return (
    <section
      id="technology"
      className="relative bg-[var(--bg-base)] px-5 py-20 sm:px-6 sm:py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1280px]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[24px] bg-[var(--bg-dark)] p-6 sm:rounded-[32px] sm:p-8 md:p-12"
        >
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-bright)]">
                Impact 2026
              </p>

              <h2 className="mt-7 text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1] tracking-[-0.03em] text-white">
                <span className="inline-flex items-baseline gap-3">
                  <span className="text-[var(--accent-bright)]">
                    <AnimatedCounter to={0} duration={1} />
                  </span>
                  <span className="text-[clamp(1.5rem,2.6vw,2.25rem)] font-bold">
                    tonnes de CO<sub className="text-[0.6em]">2</sub>
                  </span>
                </span>
              </h2>

              <p className="mt-7 max-w-[420px] text-[15px] leading-[1.6] text-[var(--fg-on-dark-secondary)]">
                Chaque dépense finance un projet vérifié. Reforestation au
                Bénin, énergie solaire en Inde, mangroves au Sénégal. Dashboard
                temps réel dans l&apos;app.
              </p>

              <ul className="mt-10 space-y-5">
                {PROJECTS.map((p, i) => (
                  <motion.li
                    key={p.name}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.15 + i * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <div className="flex items-baseline justify-between text-[14px] text-white">
                      <span>{p.name}</span>
                      <span className="font-bold tabular-nums">
                        <AnimatedCounter to={p.value} suffix="%" decimals={0} />
                      </span>
                    </div>
                    <div className="mt-2 h-px bg-white/10 overflow-hidden">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: p.value / 100 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{
                          duration: 1.2,
                          delay: 0.2 + i * 0.08,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        style={{ originX: 0 }}
                        className="h-px bg-[var(--accent-bright)]"
                      />
                    </div>
                  </motion.li>
                ))}
              </ul>

              <motion.a
                href="#"
                data-cursor="hover"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-[13px] font-semibold text-white transition-all hover:bg-white/[0.06]"
              >
                Voir le tableau de bord →
              </motion.a>
            </div>

            <div className="relative hidden h-[460px] md:block">
              <LivingGrid className="h-full w-full" cols={11} rows={9} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
