"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Magnetic } from "@/components/magnetic";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "Notre vision", href: "#about" },
  { label: "La carte", href: "#product" },
  { label: "Impact", href: "#technology" },
  { label: "Tarifs", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);
  const accum = useRef(0);

  // Smart hide on scroll-down, show on scroll-up
  useEffect(() => {
    const THRESHOLD = 10; // px of movement before reacting
    const TOP_ALWAYS = 80; // always show within first 80px

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;

      // Always show when near the top
      if (y < TOP_ALWAYS) {
        setVisible(true);
        lastY.current = y;
        accum.current = 0;
        return;
      }

      // Accumulate movement so we react only when intent is clear
      if ((delta > 0 && accum.current < 0) || (delta < 0 && accum.current > 0)) {
        accum.current = delta;
      } else {
        accum.current += delta;
      }

      if (accum.current > THRESHOLD) {
        setVisible(false);
        accum.current = 0;
      } else if (accum.current < -THRESHOLD) {
        setVisible(true);
        accum.current = 0;
      }
      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reveal header whenever the mobile menu is open
  useEffect(() => {
    if (open) setVisible(true);
  }, [open]);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    if (open) {
      const prev = document.documentElement.style.overflow;
      document.documentElement.style.overflow = "hidden";
      return () => {
        document.documentElement.style.overflow = prev;
      };
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{
          y: visible ? 0 : -120,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.45,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="fixed inset-x-0 top-4 z-50 flex justify-center px-3 sm:top-5 sm:px-4"
      >
        <nav
          className="relative flex w-full items-center justify-between gap-2 rounded-full bg-[var(--bg-dark)] pl-2 pr-2 py-2 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.4)] sm:gap-4"
          style={{ maxWidth: "760px" }}
        >
          <a
            href="#"
            className="flex shrink-0 items-center gap-2 pl-1 pr-2"
            data-cursor="hover"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--accent)] text-white font-bold text-[18px] leading-none">
              F
            </span>
            <span className="text-[16px] font-semibold tracking-tight text-white">
              Fundly
            </span>
          </a>

          <ul className="hidden md:flex items-center text-[13px] font-medium text-white/70">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  data-cursor="hover"
                  className="inline-flex items-center whitespace-nowrap px-2.5 py-2 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-1 md:gap-2">
            <a
              href="#"
              data-cursor="hover"
              className="hidden lg:inline-flex items-center whitespace-nowrap text-[13px] font-medium text-white/70 hover:text-white transition-colors"
            >
              Se connecter
            </a>
            <Magnetic strength={0.3} className="hidden sm:inline-block">
              <Button
                variant="accent"
                size="sm"
                className="!px-4 !py-2 whitespace-nowrap"
              >
                Rejoindre
              </Button>
            </Magnetic>

            {/* Mobile burger */}
            <button
              type="button"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              data-cursor="hover"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden grid h-10 w-10 place-items-center rounded-full text-white"
            >
              <BurgerIcon open={open} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <motion.div
              className="absolute inset-0 bg-black/55 backdrop-blur-md"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute inset-x-3 top-20 rounded-[26px] bg-[var(--bg-dark)] p-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
            >
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.1 + i * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-2xl px-4 py-4 text-[16px] font-semibold text-white hover:bg-white/[0.06] transition-colors"
                    >
                      {link.label}
                      <span className="text-white/35">→</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-4 border-t border-white/10 pt-4">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="block w-full rounded-full bg-[var(--accent)] py-3.5 text-center text-[14px] font-semibold text-white hover:bg-[var(--accent-deep)] transition-colors"
                >
                  Rejoindre le mouvement
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function BurgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
    >
      <motion.path
        initial={false}
        d={open ? "M4 4 L16 16" : "M3 7 L17 7"}
        animate={{ d: open ? "M4 4 L16 16" : "M3 7 L17 7" }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <motion.path
        initial={false}
        d={open ? "M4 16 L16 4" : "M3 13 L17 13"}
        animate={{ d: open ? "M4 16 L16 4" : "M3 13 L17 13" }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
