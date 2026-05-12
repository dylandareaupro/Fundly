"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";

/**
 * Word-by-word reveal that reads like a sentence being typed/read.
 * Each word lifts from below + fades in with a tight stagger.
 */
const wordContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
};

const wordItem: Variants = {
  hidden: { y: "80%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

type Segment = {
  text: string;
  /** "regular" | "green" | "italic" */
  style?: "green" | "italic";
};

const SEGMENTS: Segment[] = [
  { text: "Fundly", style: "green" },
  { text: "est conçue pour ceux qui veulent que leur argent" },
  {
    text: "ait du sens. Une banque qui aide à dépenser, épargner et investir",
    style: "italic",
  },
];

function classFor(style?: Segment["style"]) {
  if (style === "green") return "italic font-bold text-[var(--accent)]";
  if (style === "italic") return "italic font-bold text-[var(--fg-secondary)]";
  return "font-bold";
}

export function Manifesto() {
  return (
    <section className="relative bg-[var(--bg-base)] px-5 py-28 sm:px-6 sm:py-40 md:py-56">
      <div className="mx-auto max-w-[1280px]">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={wordContainer}
          className="h-section text-[clamp(2rem,4.4vw,3.8rem)] tracking-[-0.04em] text-[var(--fg-primary)]"
        >
          {SEGMENTS.map((seg, segIndex) => {
            const words = seg.text.split(" ");
            return (
              <span key={segIndex} className={classFor(seg.style)}>
                {words.map((w, i) => (
                  <span
                    key={`${segIndex}-${i}`}
                    className="inline-block overflow-hidden align-bottom"
                    style={{
                      paddingBottom: "0.1em",
                      marginBottom: "-0.1em",
                    }}
                  >
                    <motion.span
                      variants={wordItem}
                      className="inline-block"
                    >
                      {w}
                      {i < words.length - 1 ? " " : ""}
                    </motion.span>
                  </span>
                ))}
                {segIndex < SEGMENTS.length - 1 ? " " : ""}
              </span>
            );
          })}
        </motion.h2>

        {/* Bottom row: pill + italic closing line, left-aligned together */}
        <div className="mt-20 flex flex-wrap items-center gap-x-12 gap-y-8 md:mt-28">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <TrustedPill />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[420px] text-[clamp(1.4rem,2.4vw,2rem)] font-bold italic leading-tight tracking-[-0.02em] text-[var(--fg-primary)]"
          >
            sans laisser de trace derrière vous.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

function TrustedPill() {
  const AVATARS = ["/media/group-1.png", "/media/group-2.png", "/media/group-3.png"];
  return (
    <div className="inline-flex items-center gap-5 rounded-full bg-white py-5 pl-5 pr-7 shadow-[0_6px_30px_-10px_rgba(0,0,0,0.12)]">
      <div className="flex -space-x-3">
        {AVATARS.map((src, i) => (
          <span
            key={i}
            className="relative h-14 w-14 overflow-hidden rounded-full ring-[3px] ring-white"
          >
            <Image src={src} alt="" fill sizes="56px" className="object-cover" />
          </span>
        ))}
        <span className="grid h-14 w-14 place-items-center rounded-full bg-black ring-[3px] ring-white text-white">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 2.5v11M2.5 8h11"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </div>
      <p className="text-[16px] font-bold leading-tight text-[var(--fg-primary)]">
        Approuvé par 250 000+
        <br />
        utilisateurs
      </p>
    </div>
  );
}
