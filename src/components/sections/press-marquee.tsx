"use client";

import { motion } from "motion/react";

const OUTLETS = [
  "Le Monde",
  "Les Échos",
  "BFM Business",
  "Forbes France",
  "Capital",
  "L'Express",
  "Challenges",
  "Le Figaro",
  "Reuters",
  "Bloomberg",
];

type Props = {
  /** When rendered as overlay on top of the hero video, skip the background. */
  transparent?: boolean;
};

export function PressMarquee({ transparent = false }: Props) {
  const Wrapper = transparent ? "div" : "section";
  return (
    <Wrapper
      className={`relative py-10 ${transparent ? "" : "bg-[var(--bg-dark)]"}`}
    >
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="f-eyebrow text-center text-white/55"
      >
        Vu dans la presse
      </motion.p>

      <div className="mt-7 overflow-hidden edge-mask-x">
        <div className="marquee-track flex w-[200%] items-center">
          {[...OUTLETS, ...OUTLETS, ...OUTLETS, ...OUTLETS].map((o, i) => (
            <span
              key={`${o}-${i}`}
              className="mx-16 shrink-0 text-[26px] font-bold tracking-[-0.02em] text-white/55"
            >
              {o}
            </span>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}
