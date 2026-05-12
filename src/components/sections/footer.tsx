"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { toast } from "sonner";

const COLUMNS = [
  {
    title: "PRODUIT",
    links: ["Tarifs", "Télécharger l'app", "À propos", "Recrutement", "Contact"],
  },
  {
    title: "LÉGAL",
    links: ["Confidentialité", "Cookies", "Sécurité", "Mentions FCA"],
  },
];

export function Footer() {
  const [email, setEmail] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Merci d'entrer un email valide.");
      return;
    }
    toast.success("Bienvenue dans le club des emails calmes.");
    setEmail("");
  };

  return (
    <footer className="relative overflow-hidden bg-[var(--bg-dark)] text-[var(--fg-on-dark-primary)]">
      <div className="mx-auto max-w-[1280px] px-5 pt-16 pb-0 overflow-hidden sm:px-6 sm:pt-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {COLUMNS.map((col, i) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.05 }}
              className="md:col-span-2"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">
                {col.title}
              </p>
              <ul className="mt-5 space-y-3 text-[14px] text-white/85">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      data-cursor="hover"
                      className="hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="md:col-span-5"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">
              NEWSLETTER
            </p>
            <p className="mt-5 max-w-[360px] text-[14px] leading-[1.55] text-white/75">
              Un email calme par mois. Nouveautés produit, zéro growth-hack.
            </p>
            <form onSubmit={onSubmit} className="mt-5 flex max-w-[400px] items-center gap-2 rounded-full bg-white/[0.08] p-1.5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@exemple.com"
                className="flex-1 bg-transparent px-4 py-2 text-[14px] text-white placeholder:text-white/40 focus:outline-none"
              />
              <button
                data-cursor="hover"
                type="submit"
                className="rounded-full bg-[var(--accent)] px-5 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-[var(--accent-deep)]"
              >
                S&apos;abonner
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="md:col-span-3 flex flex-col items-start gap-3 md:items-end"
          >
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--accent)] text-white font-bold text-[18px]">
                F
              </span>
              <span className="text-[16px] font-semibold tracking-tight text-white">
                Fundly
              </span>
            </div>
            <p className="text-[13px] text-white/65 md:text-right">
              La banque de la nouvelle génération.
            </p>
          </motion.div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-[12px] text-white/55 md:flex-row md:items-center">
          <p>© 2026 Fundly Banking Ltd. · Régulée par la FCA (réf. 924–FD)</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a href="#" data-cursor="hover" className="hover:text-white">Statut</a>
            <a href="#" data-cursor="hover" className="hover:text-white">Twitter</a>
            <a href="#" data-cursor="hover" className="hover:text-white">LinkedIn</a>
          </div>
        </div>

        {/* Giant FUNDLY logo SVG — sits at the bottom, the SVG itself
            already has a designed-in baseline crop (viewBox cuts the
            letter bottoms), so we don't add extra overflow crop. */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden
          className="relative mt-12 flex w-full justify-center"
        >
          <Image
            src="/media/logo-fundly.svg"
            alt=""
            width={1379}
            height={214}
            priority={false}
            className="pointer-events-none block h-auto w-full select-none"
            draggable={false}
          />
        </motion.div>
      </div>
    </footer>
  );
}
