"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button, ArrowRight } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PressMarquee } from "@/components/sections/press-marquee";

const ROTATING_TAGLINES = [
  "nouvelle génération",
  "transparence",
  "transition",
  "vraie valeur",
];

// Master easing curves
const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const EASE_INOUT = [0.65, 0, 0.35, 1] as const;

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] w-full flex-col items-center overflow-hidden bg-[var(--bg-base)] px-5 pt-24 sm:px-6 sm:pt-28">
      {/* Video background */}
      <video
        aria-hidden
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
        disableRemotePlayback
        className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover"
        src="/media/header.mp4"
      />

      {/* Bottom dark gradient for marquee legibility */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[55vh]"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.45) 35%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Cinematic curtain — full-screen reveal that fades out on mount */}
      <IntroCurtain />

      <div className="flex flex-1 w-full flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE_OUT }}
        >
          <Eyebrow variant="accent" showDot>
            GRATUIT À VIE · SANS VÉRIFICATION DE CRÉDIT
          </Eyebrow>
        </motion.div>

        {/* Headline drops from above, line by line */}
        <h1 className="h-hero mt-7 max-w-[1100px] text-balance text-[clamp(2.25rem,8vw,6rem)] text-white drop-shadow-[0_2px_30px_rgba(0,0,0,0.35)]">
          <DropLine text="La banque de la" delay={0.45} />
          <RotatingLine delay={1.0} interval={2240} />
        </h1>

        <motion.p
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.85, ease: EASE_OUT }}
          className="mt-6 max-w-[600px] text-balance text-[16px] leading-[1.55] text-white/90"
        >
          Découvrez le futur des transactions, propulsé par la blockchain. Fini
          les frais cachés et les délais à rallonge — votre argent bouge à la
          vitesse de la lumière, et compense votre empreinte à chaque dépense.
        </motion.p>

        <motion.div
          initial={{ y: 28, opacity: 0, scale: 0.96 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.0, ease: EASE_OUT }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <Button variant="accent" size="lg" iconRight={<ArrowRight />}>
            Rejoindre le mouvement
          </Button>
          <Button variant="ghost-dark" size="lg" iconRight={<DownloadIcon />}>
            Télécharger l&apos;app
          </Button>
        </motion.div>
      </div>

      {/* Card slot — placed near the bottom of the hero so that the
          absolute card rendered by <HeroFlight /> visually passes
          across the stats section below. */}
      <div
        aria-hidden
        className="w-full max-w-[558px] aspect-[1.586]"
        data-card-slot
      />

      {/* Press marquee overlaid at the very bottom of the hero, on the video */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.6, ease: EASE_OUT }}
        className="relative z-10 w-full"
      >
        <PressMarquee transparent />
      </motion.div>
    </section>
  );
}

/**
 * Black/dark curtain that wipes off the screen at page load,
 * revealing the hero in a single cinematic move.
 */
function IntroCurtain() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 250);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="curtain"
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.65, ease: EASE_INOUT }}
          className="pointer-events-none fixed inset-0 z-[55] bg-[var(--bg-dark)]"
          aria-hidden
        >
          {/* subtle bottom glow as the curtain lifts */}
          <div
            className="absolute inset-x-0 bottom-0 h-[30%]"
            style={{
              background:
                "linear-gradient(to top, rgba(1,136,70,0.18), transparent)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DropLine({
  text,
  delay = 0,
  italicGreen = false,
}: {
  text: string;
  delay?: number;
  italicGreen?: boolean;
}) {
  return (
    <span
      className="block overflow-hidden"
      style={{ paddingBottom: "0.25em", marginBottom: "-0.18em" }}
    >
      <motion.span
        initial={{ y: "-110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.1, ease: EASE_OUT, delay }}
        className={`block ${italicGreen ? "italic text-[var(--accent)] font-bold" : ""}`}
      >
        {text}
      </motion.span>
    </span>
  );
}

function RotatingLine({
  delay = 0,
  interval = 3200,
}: {
  delay?: number;
  interval?: number;
}) {
  const [index, setIndex] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % ROTATING_TAGLINES.length);
    }, interval);
    return () => clearInterval(id);
  }, [started, interval]);

  return (
    <span
      className="relative block overflow-hidden"
      style={{ paddingBottom: "0.25em", marginBottom: "-0.18em" }}
    >
      {/* Initial entry from below for the first phrase, after the first
          line has dropped from above. */}
      <AnimatePresence mode="wait" initial={true}>
        <motion.span
          key={ROTATING_TAGLINES[index]}
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-110%", opacity: 0 }}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: index === 0 ? delay - 0.7 : 0 }}
          className="block italic text-[var(--accent)] font-bold"
        >
          {ROTATING_TAGLINES[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M7 1V9M7 9L3.5 5.5M7 9L10.5 5.5M2 11.5h10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
