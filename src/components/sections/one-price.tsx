"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Eyebrow } from "@/components/ui/eyebrow";

type Plan = {
  tier: string;
  tierColor: string;
  monthly: number;
  annual: number;
  desc: string;
  cta: string;
  features: string[];
  highlight?: boolean;
};

const PLANS: Plan[] = [
  {
    tier: "STARTER",
    tierColor: "var(--fg-on-dark-secondary)",
    monthly: 0,
    annual: 0,
    desc: "Tout ce qu'il vous faut pour bouger votre argent avec sens.",
    cta: "Ouvrir un compte",
    features: [
      "Virements blockchain instantanés",
      "Carte Fundly virtuelle",
      "Tableau de bord carbone",
      "Statistiques de base",
      "2 virements gratuits / mois",
    ],
  },
  {
    tier: "GROWTH",
    tierColor: "var(--accent-bright)",
    monthly: 18,
    annual: 14,
    desc: "Pour les pros qui veulent chaque avantage, et chaque compensation.",
    cta: "Essai 30 jours",
    highlight: true,
    features: [
      "Tout de Starter",
      "Carte Fundly métal brossé",
      "Zéro frais sur virements internationaux",
      "Sous-comptes illimités",
      "Support humain prioritaire",
      "Analytics éco avancées",
    ],
  },
  {
    tier: "IMPACT",
    tierColor: "var(--fg-on-dark-secondary)",
    monthly: 48,
    annual: 38,
    desc: "Pour patrimoines à fort impact et engagements climatiques sérieux.",
    cta: "Nous contacter",
    features: [
      "Tout de Growth",
      "Compensation carbone x2",
      "Conseiller dédié",
      "Banque privée incluse",
      "Portfolio de reforestation sur-mesure",
      "Rapport d'impact trimestriel",
    ],
  },
];

export function OnePrice() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="relative bg-[var(--bg-base)] px-5 py-20 sm:px-6 sm:py-24 md:py-32">
      <div className="mx-auto max-w-[1280px]">
        <div className="text-center">
          <Eyebrow variant="light">TARIFS</Eyebrow>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="h-section mt-6 text-[clamp(2.5rem,5vw,4.25rem)] text-[var(--fg-primary)]"
          >
            <span className="block">Un prix.</span>
            <span className="block italic text-[var(--accent)]">
              Aucune étoile.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-6 max-w-[420px] text-[16px] leading-[1.55] text-[var(--fg-secondary)]"
          >
            Annulez à tout moment. Changez de formule à tout moment. Chaque palier est neutre en carbone.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 inline-flex items-center rounded-full bg-[var(--bg-dark)] p-1"
          >
            <button
              onClick={() => setAnnual(false)}
              data-cursor="hover"
              className="relative rounded-full px-5 py-2.5 text-[13px] font-semibold"
            >
              {!annual && (
                <motion.span
                  layoutId="price-toggle-bg"
                  className="absolute inset-0 rounded-full bg-white"
                />
              )}
              <span className={`relative ${!annual ? "text-black" : "text-white/70"}`}>
                Mensuel
              </span>
            </button>
            <button
              onClick={() => setAnnual(true)}
              data-cursor="hover"
              className="relative rounded-full px-5 py-2.5 text-[13px] font-semibold"
            >
              {annual && (
                <motion.span
                  layoutId="price-toggle-bg"
                  className="absolute inset-0 rounded-full bg-white"
                />
              )}
              <span
                className={`relative inline-flex items-center gap-2 ${
                  annual ? "text-black" : "text-white/70"
                }`}
              >
                Annuel
                <span className="text-[11px] font-semibold text-[var(--accent)]">
                  −22%
                </span>
              </span>
            </button>
          </motion.div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.tier}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.9,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative flex flex-col rounded-[26px] bg-[var(--bg-dark)] p-7 text-white"
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-7 rounded-full bg-[var(--accent)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                  Le plus populaire
                </span>
              )}

              <p
                className="text-[12px] font-bold uppercase tracking-[0.16em]"
                style={{ color: plan.tierColor }}
              >
                {plan.tier}
              </p>

              <div className="mt-7 flex items-baseline gap-1">
                <span className="text-[15px] text-white/50">$</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={annual ? "a" : "m"}
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -12, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-[52px] font-bold leading-none tracking-[-0.04em] text-white"
                  >
                    {annual ? plan.annual : plan.monthly}
                  </motion.span>
                </AnimatePresence>
                <span className="ml-2 text-[13px] text-white/50">
                  / mois, facturé {annual ? "annuellement" : "mensuellement"}
                </span>
              </div>

              <p className="mt-4 text-[12px] font-semibold text-[var(--accent-bright)]">
                {plan.monthly === 0 ? "Gratuit à vie" : "Par mois"}
              </p>

              <p className="mt-6 text-[14px] leading-[1.55] text-white/70">
                {plan.desc}
              </p>

              <ul className="mt-7 flex-1 space-y-3 border-t border-white/10 pt-7">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-[14px] text-white/85"
                  >
                    <span className="mt-1 text-[var(--accent-bright)]">
                      <CheckIcon />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                data-cursor="hover"
                className={`mt-8 w-full rounded-full py-3.5 text-[14px] font-semibold transition-all ${
                  plan.highlight
                    ? "bg-[var(--accent)] text-white hover:bg-[var(--accent-deep)]"
                    : "bg-white text-black hover:bg-white/90"
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 text-center text-[13px] text-[var(--fg-tertiary)]"
        >
          Toutes les formules incluent la protection FSCS jusqu&apos;à £85 000 · Fundly est régulée par la FCA
        </motion.p>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path
        d="M2 6.5L5.5 10L11 3.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
