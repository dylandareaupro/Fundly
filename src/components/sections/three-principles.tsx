"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Eyebrow } from "@/components/ui/eyebrow";

const FEATURES = [
  {
    icon: "bolt",
    title: "Virements blockchain instantanés",
    body: "Vos fonds arrivent en secondes, pas en jours. Chaque transaction est vérifiée on-chain et finale avant que votre café ne refroidisse.",
  },
  {
    icon: "lock",
    title: "Tarifs transparents, toujours",
    body: "Aucun frais de virement caché, aucune marge sur le change, aucune ligne surprise en fin de mois.",
  },
  {
    icon: "leaf",
    title: "Positive par défaut",
    body: "Chaque dépense compense du carbone. Notre infrastructure tourne sur des énergies renouvelables vérifiées, auditées chaque trimestre.",
  },
];

export function ThreePrinciples() {
  return (
    <section
      id="about"
      className="relative bg-[var(--bg-base)] px-4 py-16 sm:px-5 md:px-6 md:py-24"
    >
      <div className="mx-auto max-w-[1280px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[24px] bg-[var(--bg-dark)] px-5 py-12 sm:rounded-[32px] sm:px-12 sm:py-16 md:px-16 md:py-24"
        >
          <div className="text-center">
            <Eyebrow variant="dark">POURQUOI FUNDLY ?</Eyebrow>
            <h2 className="h-section mt-7 text-[clamp(2.25rem,5.5vw,4.25rem)] text-white">
              <span className="block">Trois principes.</span>
              <span className="block italic">Zéro compromis.</span>
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12">
            <PhoneScreen />

            <ul className="space-y-3">
              {FEATURES.map((f, i) => (
                <motion.li
                  key={f.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.2 + i * 0.08,
                  }}
                  className="flex items-start gap-4 rounded-2xl bg-[#0F1F12] p-5 ring-1 ring-white/[0.04]"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--accent)]/15 text-[var(--accent-bright)] ring-1 ring-[var(--accent)]/25">
                    <FeatureIcon name={f.icon} />
                  </span>
                  <div>
                    <p className="text-[16px] font-semibold text-white">
                      {f.title}
                    </p>
                    <p className="mt-2 text-[14px] leading-[1.55] text-[var(--fg-on-dark-secondary)]">
                      {f.body}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PhoneScreen() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="relative mx-auto w-full max-w-[420px]"
    >
      <div className="relative aspect-[688/716] overflow-hidden rounded-[32px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/[0.06]">
        <Image
          src="/media/screen-principles.webp"
          alt="Aperçu de l'application Fundly"
          fill
          sizes="(max-width: 768px) 90vw, 420px"
          className="object-cover"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, x: 20, y: 10 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
        className="absolute -right-2 top-1/4 hidden w-48 rounded-2xl bg-white px-3 py-2.5 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.4)] sm:block"
      >
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[var(--accent)]/15 text-[var(--accent-deep)]">
            <LeafIcon />
          </span>
          <div>
            <p className="text-[11px] font-bold text-black">+10g CO₂ compensés</p>
            <p className="text-[10px] text-black/50">Café · 4€</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function FeatureIcon({ name }: { name: string }) {
  if (name === "bolt")
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M10 1L3 10h5l-1 7 7-9h-5l1-7z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
          fill="currentColor"
          fillOpacity="0.15"
        />
      </svg>
    );
  if (name === "lock")
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect
          x="4"
          y="8"
          width="10"
          height="7"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M6 8V6a3 3 0 016 0v2"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    );
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M15 3c0 6-3 11-12 13 0-6 3-11 12-13z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 11.5L9.5 8.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path
        d="M11 1c0 5-2 9-9 11 0-5 2-9 9-11z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}
