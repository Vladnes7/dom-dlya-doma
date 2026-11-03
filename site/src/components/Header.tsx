"use client";

import { Menu, Phone, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { NAV, PHONE_DISPLAY, PHONE_HREF, WHATSAPP_HREF } from "@/data/site";
import { Logo } from "./Logo";

export function Header() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setSolid(y > 40);
    setShowBar(y > window.innerHeight * 0.6);
  });

  // Открытое меню на весь экран: страница под ним не прокручивается, Esc закрывает
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    html.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay: 1.2 }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-200 ${
          solid || open ? "border-b border-ink-line bg-ink" : "border-b border-transparent"
        }`}
      >
        <div className="wrap flex h-16 items-center gap-6 md:h-[4.5rem]">
          <a href="#top" className="flex items-center gap-3" aria-label="Дом для дома, наверх">
            <Logo className="size-10 md:size-11" />
            <span className="display text-[1.15rem] leading-none tracking-[-0.01em]">Дом для дома</span>
          </a>

          <nav aria-label="Разделы" className="ml-auto hidden lg:block">
            <ul className="flex items-center gap-7 text-[0.95rem]">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="nav-link">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href={PHONE_HREF}
            className="tabular hidden items-center gap-2 text-[0.95rem] xl:flex"
          >
            <Phone className="size-4 text-brass" aria-hidden="true" />
            {PHONE_DISPLAY}
          </a>
          <a href="#bron" className="btn btn-primary hidden !min-h-11 sm:ml-auto sm:inline-flex lg:ml-0">
            Забронировать стол
          </a>

          <button
            type="button"
            className="-mr-2 ml-auto grid size-11 place-items-center sm:ml-0 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              id="mobile-nav"
              aria-label="Разделы"
              className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto bg-ink pb-[max(2rem,env(safe-area-inset-bottom))] md:top-[4.5rem] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="wrap flex min-h-full flex-col">
                <ul className="flex flex-col border-t border-ink-line">
                  {NAV.map((n, i) => (
                    <motion.li
                      key={n.href}
                      className="border-b border-ink-line"
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1], delay: 0.04 + i * 0.05 }}
                    >
                      <a href={n.href} onClick={() => setOpen(false)} className="display block py-5 text-[2rem] leading-tight">
                        {n.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
                <motion.div
                  className="mt-auto pt-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <a href={PHONE_HREF} className="display tabular block text-[1.75rem] text-brass">
                    {PHONE_DISPLAY}
                  </a>
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <a href="#bron" onClick={() => setOpen(false)} className="btn btn-primary">
                      Забронировать стол
                    </a>
                    <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                      WhatsApp
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Телефон: бронь всегда под пальцем */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-ink-line bg-ink px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-300 ease-[var(--ease-out-soft)] motion-reduce:transition-none sm:hidden ${
          showBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="grid grid-cols-2 gap-3">
          <a href={PHONE_HREF} className="btn btn-primary" tabIndex={showBar ? 0 : -1}>
            <Phone className="size-4" aria-hidden="true" />
            Позвонить
          </a>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
            tabIndex={showBar ? 0 : -1}
          >
            WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
