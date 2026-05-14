"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button, ArrowRight } from "@/components/ui/button";
import { FundlyCard } from "@/components/ui/fundly-card";
import { Eyebrow } from "@/components/ui/eyebrow";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FEATURES = [
  { l: "Acceptée", v: "Partout sur Terre" },
  { l: "Frais à l'étranger", v: "Vrai taux du jour" },
  { l: "Notifications", v: "Push, e-mail ou SMS" },
  { l: "Impact par tx", v: "10g CO₂ compensés" },
];

export function CardShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!sectionRef.current || !cardRef.current || !contentRef.current) return;

    // Only pin on desktop — on mobile keep natural flow
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: sectionRef.current!,
          start: "top top+=80",
          end: () =>
            "+=" +
            (sectionRef.current!.offsetHeight - window.innerHeight + 80),
          pin: cardRef.current!,
          pinSpacing: false,
        });

        // Stagger reveal of features as we scroll through the section
        gsap.utils
          .toArray<HTMLElement>("[data-feature-row]")
          .forEach((el) => {
            gsap.fromTo(
              el,
              { opacity: 0, y: 28 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: el,
                  start: "top 85%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          });

        // Card subtle rotate/scale through the scroll
        gsap.to(cardRef.current, {
          rotate: 3,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current!,
            start: "top top+=80",
            end: "bottom top",
            scrub: 2,
          },
        });
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="product"
      ref={sectionRef}
      className="relative bg-[var(--bg-base)] px-5 py-20 sm:px-6 sm:py-24 md:py-40"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-16">
          {/* Left: pinned card on desktop */}
          <div ref={cardRef} className="md:will-change-transform">
            <motion.div
              initial={{ y: 50, opacity: 0, rotateZ: -3 }}
              whileInView={{ y: 0, opacity: 1, rotateZ: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto w-full max-w-[560px]"
            >
              <FundlyCard src="/media/card-hd.webp" aspect="2263 / 1541" />
            </motion.div>
          </div>

          {/* Right: text content (will scroll past pinned card on desktop) */}
          <div ref={contentRef} className="md:pl-4">
            <div data-feature-row>
              <Eyebrow variant="light">LA CARTE FUNDLY</Eyebrow>
            </div>

            <motion.h2
              data-feature-row
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="h-section mt-6 text-[clamp(2.5rem,4.8vw,4rem)] text-[var(--fg-primary)]"
            >
              <span className="block">Métal brossé.</span>
              <span className="block italic text-[var(--accent)]">
                Aluminium recyclé.
              </span>
              <span className="block">Zéro plastique.</span>
            </motion.h2>

            <p
              data-feature-row
              className="mt-6 max-w-[460px] text-[16px] leading-[1.6] text-[var(--fg-secondary)]"
            >
              Chaque carte est frappée dans une plaque d&apos;aluminium
              post-consommation et expédiée dans un emballage en papier-graine
              qui pousse en fleurs sauvages. Chaque transaction compense plus
              de carbone qu&apos;elle n&apos;en émet.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
              {FEATURES.map((f) => (
                <div key={f.l} data-feature-row>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--fg-tertiary)]">
                    {f.l}
                  </p>
                  <p className="mt-1.5 text-[15px] font-semibold text-[var(--fg-primary)]">
                    {f.v}
                  </p>
                </div>
              ))}
            </div>

            <div data-feature-row className="mt-10">
              <Button variant="dark" size="lg" iconRight={<ArrowRight />}>
                Rejoindre le mouvement
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
