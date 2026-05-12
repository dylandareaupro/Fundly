"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Eyebrow } from "@/components/ui/eyebrow";

const STEPS = [
  {
    image: "/media/plant.jpg",
    container: "/media/step-1.png",
    containerW: 1352,
    containerH: 660,
    badge: "/media/badge-01.png",
    title: "Téléchargez l'app",
    body:
      "Disponible sur iOS et Android. Inscrivez-vous en moins de deux minutes — sans vérification de crédit, sans liste d'attente, sans paperasse.",
  },
  {
    image: "/media/sand.jpg",
    container: "/media/step-2.png",
    containerW: 1239,
    containerH: 914,
    badge: "/media/badge-02.png",
    title: "Connectez votre compte",
    body:
      "Reliez une source — ancienne banque, carte, exchange — en quelques touches. Vos identifiants ne sont jamais stockés. Entrez et sortez quand vous voulez.",
  },
  {
    image: "/media/water.jpg",
    container: "/media/step-3.png",
    containerW: 1239,
    containerH: 738,
    badge: "/media/badge-03.png",
    title: "Banquez vert",
    body:
      "Transactez, déposez de la crypto, virez depuis n'importe où. Chaque transaction finance une compensation carbone vérifiée — en temps réel.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative bg-[var(--bg-base)] px-5 py-20 sm:px-6 sm:py-24 md:py-32">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <Eyebrow variant="light">COMMENT ÇA MARCHE</Eyebrow>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="h-section mt-6 max-w-[680px] text-[clamp(2.25rem,5vw,4rem)] text-[var(--fg-primary)]"
            >
              <span className="font-bold">Du téléchargement </span>
              <span className="italic font-bold">au premier virement, </span>
              <span className="font-bold">en quelques minutes.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[320px] text-[14px] leading-[1.6] text-[var(--fg-secondary)]"
          >
            Pas d&apos;intermédiaire, pas de chargé de clientèle. Un onboarding
            rapide et privé qui respecte votre temps et vos données.
          </motion.p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.9,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative flex h-[520px] flex-col overflow-hidden rounded-[26px] sm:h-[580px] md:h-[640px]"
            >
              {/* Background image */}
              <Image
                src={s.image}
                alt=""
                fill
                className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/85" />

              {/* BIG container preview — top portion of the card */}
              <div className="relative z-10 flex flex-1 items-start justify-center px-5 pt-8">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: 1,
                    delay: 0.3 + i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="w-full max-w-[400px]"
                >
                  <Image
                    src={s.container}
                    alt=""
                    width={s.containerW}
                    height={s.containerH}
                    quality={100}
                    unoptimized
                    className="h-auto w-full select-none drop-shadow-[0_24px_50px_rgba(0,0,0,0.55)]"
                    sizes="(max-width: 768px) 90vw, 460px"
                    draggable={false}
                  />
                </motion.div>
              </div>

              {/* Bottom text block: 01 badge → title → description */}
              <div className="relative z-10 px-6 pb-7 pt-6 text-white">
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.4 + i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-flex"
                >
                  <Image
                    src={s.badge}
                    alt={`Étape ${i + 1}`}
                    width={128}
                    height={128}
                    className="h-12 w-12 select-none drop-shadow-[0_6px_18px_rgba(0,0,0,0.35)]"
                    sizes="48px"
                    draggable={false}
                  />
                </motion.div>
                <p className="mt-4 text-[20px] font-bold leading-tight">
                  {s.title}
                </p>
                <p className="mt-2 text-[13px] leading-[1.55] text-white/75">
                  {s.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
