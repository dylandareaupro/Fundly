"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Drawer } from "vaul";
import { Eyebrow } from "@/components/ui/eyebrow";

const QUESTIONS = [
  {
    q: "Est-ce que Fundly est une vraie banque ?",
    a: "Fundly est un établissement de monnaie électronique agréé, régulé par la FCA. Les dépôts jusqu'à £85 000 sont protégés par le dispositif FSCS via notre partenaire bancaire, Modulr.",
  },
  {
    q: "À quelle vitesse partent les virements internationaux ?",
    a: "Moins d'une seconde entre comptes Fundly. Les virements SWIFT/IBAN sont réglés en 30 à 90 secondes au vrai taux interbancaire, sans spread, sans marge, sans surprise.",
  },
  {
    q: "Comment fonctionne concrètement la compensation carbone ?",
    a: "Chaque transaction déclenche un micro-achat on-chain de crédits carbone vérifiés — reforestation au Bénin, mangroves au Sénégal, solaire en Inde. Vous choisissez votre portfolio et vous pouvez auditer chaque retirement.",
  },
  {
    q: "Et si je ne suis pas satisfait·e de ma formule ?",
    a: "Annulez ou changez de plan à tout moment, depuis l'app. Pas de questions, pas d'appel de rétention. Votre historique d'impact reste avec vous, pour toujours.",
  },
  {
    q: "Est-ce que je peux ramener mon entreprise sur Fundly ?",
    a: "Oui — Growth et Impact supportent les sous-comptes pro, le multi-utilisateur et le matching de compensations sur-mesure. Notre équipe peut onboarder votre team en moins d'une heure.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const [mobileIndex, setMobileIndex] = useState<number | null>(null);

  return (
    <section
      id="contact"
      className="relative bg-[var(--bg-base)] px-5 py-20 sm:px-6 sm:py-24 md:py-32"
    >
      <div className="mx-auto max-w-[920px]">
        <Eyebrow variant="light">QUESTIONS / RÉPONSES</Eyebrow>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="h-section mt-6 text-[clamp(2.5rem,5vw,4.25rem)] text-[var(--fg-primary)]"
        >
          <span className="block">Une question ?</span>
          <span className="block italic">Nous avons la réponse.</span>
        </motion.h2>

        {/* Desktop: inline accordion */}
        <ul className="mt-12 hidden space-y-3 md:block">
          {QUESTIONS.map((item, i) => (
            <FaqItemDesktop
              key={item.q}
              item={item}
              index={i}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </ul>

        {/* Mobile: each question opens a bottom-sheet via vaul */}
        <ul className="mt-10 space-y-3 md:hidden">
          {QUESTIONS.map((item, i) => (
            <motion.li
              key={item.q}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.7,
                delay: i * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="rounded-2xl bg-white/60 ring-1 ring-[var(--border-light)]"
            >
              <button
                onClick={() => setMobileIndex(i)}
                data-cursor="hover"
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
              >
                <span className="text-[15px] font-bold text-[var(--fg-primary)]">
                  {item.q}
                </span>
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[var(--border-light-strong)] text-[var(--accent-bright)]">
                  <PlusIcon />
                </span>
              </button>
            </motion.li>
          ))}
        </ul>

        <Drawer.Root
          open={mobileIndex !== null}
          onOpenChange={(o) => !o && setMobileIndex(null)}
        >
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm" />
            <Drawer.Content
              aria-describedby={undefined}
              className="fixed inset-x-0 bottom-0 z-[80] flex flex-col rounded-t-[28px] bg-[var(--bg-card)] outline-none"
              style={{ maxHeight: "85vh" }}
            >
              <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-[var(--border-light-strong)]" />
              <div className="overflow-y-auto px-6 pb-10 pt-6">
                {mobileIndex !== null && (
                  <>
                    <Drawer.Title className="text-[20px] font-bold leading-tight text-[var(--fg-primary)]">
                      {QUESTIONS[mobileIndex].q}
                    </Drawer.Title>
                    <p className="mt-4 text-[15px] leading-[1.65] text-[var(--fg-secondary)]">
                      {QUESTIONS[mobileIndex].a}
                    </p>
                    <button
                      onClick={() => setMobileIndex(null)}
                      className="mt-7 w-full rounded-full bg-[var(--accent)] py-3.5 text-[14px] font-semibold text-white"
                    >
                      Fermer
                    </button>
                  </>
                )}
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
    </section>
  );
}

function FaqItemDesktop({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: { q: string; a: string };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.7,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`rounded-[20px] transition-colors duration-500 ${
        isOpen
          ? "bg-[var(--accent-tint)] ring-1 ring-[var(--accent)]/30"
          : "bg-white/60 ring-1 ring-[var(--border-light)]"
      }`}
    >
      <button
        onClick={onToggle}
        data-cursor="hover"
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-[16px] font-bold text-[var(--fg-primary)]">
          {item.q}
        </span>
        <span
          className={`grid h-7 w-7 shrink-0 place-items-center rounded-full ${
            isOpen ? "bg-[var(--accent)]" : "border border-[var(--border-light-strong)]"
          }`}
        >
          {isOpen ? <CloseIcon /> : <PlusIcon />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 pr-12 text-[15px] leading-[1.65] text-[var(--fg-secondary)]">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

function PlusIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
      <path
        d="M5.5 1v9M1 5.5h9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
      <path
        d="M2 2l7 7M9 2l-7 7"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
