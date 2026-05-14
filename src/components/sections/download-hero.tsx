"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Button, ArrowRight } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";

const AWARDS = [
  { name: "Forbes", note: "Meilleure App Fintech 2026" },
  { name: "TechCrunch", note: "Plus Innovante 2026" },
];

export function DownloadHero() {
  return (
    <section className="relative isolate overflow-visible">
      {/* Background video */}
      <video
        aria-hidden
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        disableRemotePlayback
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        src="/media/footer.mp4"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/10 via-transparent to-black/50" />

      <div className="relative mx-auto flex max-w-[1280px] flex-col items-center px-5 pt-24 pb-0 text-center sm:px-6 sm:pt-28 md:pt-36">
        <Eyebrow variant="image" showDot>
          GRATUIT À VIE · SANS VÉRIFICATION DE CRÉDIT
        </Eyebrow>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="h-section mt-7 text-[clamp(2.75rem,7vw,5.5rem)] text-white drop-shadow-[0_2px_30px_rgba(0,0,0,0.45)]"
        >
          <span className="font-bold">Téléchargez </span>
          <span className="italic font-bold">Fundly</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-[460px] text-[15px] leading-[1.6] text-white/85"
        >
          Rejoignez 250 000+ personnes qui banquent plus intelligemment et plus
          vert. Opérationnel en deux minutes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9"
        >
          <Button variant="accent" size="lg" iconRight={<ArrowRight />}>
            Rejoindre le mouvement
          </Button>
        </motion.div>

        {/* Award badges */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 flex flex-wrap items-center justify-center gap-12 text-white"
        >
          {AWARDS.map((a) => (
            <div key={a.name} className="flex items-end gap-4">
              <Image
                src="/media/laurel-left.svg"
                alt=""
                width={28}
                height={64}
                className="h-16 w-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]"
              />
              <div className="text-center">
                <p className="text-[22px] font-bold italic leading-tight">
                  {a.name}
                </p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/85">
                  {a.note}
                </p>
              </div>
              <Image
                src="/media/laurel-right.svg"
                alt=""
                width={28}
                height={64}
                className="h-16 w-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]"
              />
            </div>
          ))}
        </motion.div>

        {/* Phone screenshot — sits at the bottom of the section, full
            image visible. The section above has the video, the footer
            below is dark — the phone naturally bridges the two. */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-14 mb-[-32px] w-full max-w-[340px]"
        >
          <Image
            src="/media/phone-download.webp"
            alt="Aperçu de l'application Fundly"
            width={594}
            height={520}
            priority={false}
            className="h-auto w-full select-none drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
            draggable={false}
          />
        </motion.div>
      </div>
    </section>
  );
}

