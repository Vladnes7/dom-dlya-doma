"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMemo, useRef, useState } from "react";
import menuData from "@/data/menu.json";
import { Logo } from "./Logo";

type Item = {
  id: string | number;
  title: string;
  text: string;
  descr: string;
  price: number | null;
  options: { title: string; values: { label: string; price: number }[] } | null;
  img: { src: string; w: number; h: number; quality: string } | null;
};
type Section = { id: string; title: string; items: Item[] };

const MENU = menuData as unknown as Section[];
const TOTAL = MENU.reduce((n, s) => n + s.items.length, 0);
const rub = (n: number) => `${new Intl.NumberFormat("ru-RU").format(n)} ₽`;
const unwrap = (t: string) => t.replace(/^\(([\s\S]*)\)$/, "$1").trim();

// Строки вида «"ХАСКИ" 50мл./0,5л. | 145/1400р.» превращаются в позицию и цену
function variantLines(text: string) {
  return text.split("\n").map((line) => {
    const [name, price] = line.split("|").map((s) => s.trim());
    return { name, price: price?.replace(/р\.?$/, " ₽") ?? "" };
  });
}

export function Menu() {
  const [sectionId, setSectionId] = useState(MENU[0].id);
  const section = useMemo(() => MENU.find((s) => s.id === sectionId) ?? MENU[0], [sectionId]);
  const firstWithImg = section.items.find((i) => i.img) ?? null;
  const [hovered, setHovered] = useState<Item | null>(null);
  const active = hovered && section.items.includes(hovered) ? hovered : firstWithImg;
  const reduce = useReducedMotion();
  const listTop = useRef<HTMLDivElement>(null);

  const choose = (id: string) => {
    setSectionId(id);
    setHovered(null);
    const el = listTop.current;
    if (el && el.getBoundingClientRect().top < 0) {
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
  };

  return (
    <section id="menu" aria-labelledby="menu-title" className="on-cream relative py-[var(--section)]">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="menu-title" className="display text-[clamp(2.75rem,6vw,5.5rem)]">
            Меню
          </h2>
          <p className="max-w-[40ch] text-cream-soft">
            <span className="tabular">{TOTAL}</span> позиций в <span className="tabular">{MENU.length}</span> разделах
          </p>
        </div>
      </div>

      {/* Разделы: лента с прокруткой, прилипает под шапкой */}
      <div ref={listTop} className="sticky top-16 z-30 mt-10 border-y border-cream-line bg-cream md:top-[4.5rem]">
        <div
          role="tablist"
          aria-label="Разделы меню"
          className="no-scrollbar wrap flex gap-1 overflow-x-auto overscroll-x-contain py-2"
        >
          {MENU.map((s) => {
            const on = s.id === sectionId;
            return (
              <button
                key={s.id}
                role="tab"
                id={`tab-${s.id}`}
                aria-selected={on}
                aria-controls="menu-panel"
                onClick={() => choose(s.id)}
                className={`shrink-0 rounded-[var(--radius-ui)] px-3.5 py-2.5 text-[0.95rem] whitespace-nowrap transition-colors duration-150 ${
                  on ? "bg-ink text-cream" : "text-cream-soft [@media(hover:hover)]:hover:text-ink"
                }`}
              >
                {s.title}
              </button>
            );
          })}
        </div>
      </div>

      <div className="wrap mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-10">
        {/* Тарелка: показывает блюдо, на которое смотрит гость */}
        <div className="hidden lg:col-span-5 lg:block">
          <div className="sticky top-40">
            <div className="relative mx-auto aspect-square w-full max-w-[460px]">
              <div className="absolute inset-0 rounded-full bg-cream-2 shadow-[inset_0_2px_0_rgba(255,255,255,0.6),0_40px_70px_-30px_rgba(60,40,20,0.45)]" />
              <div className="absolute inset-[3.5%] rounded-full border border-cream-line" />
              <div className="absolute inset-[7%] overflow-hidden rounded-full bg-cream">
                <AnimatePresence initial={false} mode="popLayout">
                  {active?.img ? (
                    <motion.div
                      key={active.id}
                      className="absolute inset-0"
                      initial={reduce ? { opacity: 0 } : { opacity: 0, rotate: -38, scale: 0.94 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={reduce ? { opacity: 0 } : { opacity: 0, rotate: 24, scale: 1.02 }}
                      transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
                    >
                      <Image
                        src={active.img.src}
                        alt={active.title}
                        fill
                        sizes="460px"
                        className="scale-[1.18] object-cover"
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      className="absolute inset-0 grid place-items-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Logo className="w-[46%]" color="var(--color-cream-line)" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div className="mx-auto mt-8 max-w-[460px] text-center" aria-live="polite">
              <p className="display text-[1.5rem] leading-tight">{active?.title ?? section.title}</p>
              {active?.descr && <p className="mt-1.5 text-sm text-cream-soft">{active.descr}</p>}
            </div>
          </div>
        </div>

        <div id="menu-panel" role="tabpanel" aria-labelledby={`tab-${section.id}`} className="lg:col-span-7">
          <h3 className="display text-[clamp(2rem,3.4vw,3rem)]">{section.title}</h3>
          <ul className="mt-8 border-t border-cream-line">
            {section.items.map((item) => (
              <MenuRow key={item.id} item={item} active={active?.id === item.id} onLook={() => item.img && setHovered(item)} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function MenuRow({ item, active, onLook }: { item: Item; active: boolean; onLook: () => void }) {
  const lines = item.price == null && item.text.includes("\n") ? variantLines(item.text) : null;
  const composition = lines ? "" : unwrap(item.text);

  return (
    <li
      onMouseEnter={onLook}
      onFocus={onLook}
      className="relative border-b border-cream-line py-5 transition-colors duration-150"
    >
      <span
        aria-hidden="true"
        className={`absolute top-5 bottom-5 -left-4 hidden w-px bg-brass-deep transition-opacity duration-150 lg:block ${
          active ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="flex gap-4">
        {item.img && (
          <div className="relative size-16 shrink-0 overflow-hidden rounded-full bg-cream-2 lg:hidden">
            <Image src={item.img.src} alt="" fill sizes="64px" className="scale-125 object-cover" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-3">
            <h4 className="text-[1.05rem] font-medium">{item.title}</h4>
            {(item.price != null || item.options) && <span className="leader" aria-hidden="true" />}
            {item.options ? (
              <span className="tabular shrink-0 text-right font-medium">
                {item.options.values.map((v) => rub(v.price)).join(" / ")}
              </span>
            ) : item.price != null ? (
              <span className="tabular shrink-0 font-medium">{rub(item.price)}</span>
            ) : null}
          </div>
          {item.options && (
            <p className="mt-0.5 text-sm text-cream-soft">
              {item.options.values.map((v) => v.label).join(" / ")}
            </p>
          )}
          {composition && <p className="mt-1.5 max-w-[58ch] text-[0.95rem] whitespace-pre-line text-cream-soft">{composition}</p>}
          {lines && (
            <ul className="mt-3 space-y-1.5">
              {lines.map((l, i) => (
                <li key={i} className="flex items-baseline gap-3 text-[0.95rem] text-cream-soft">
                  <span>{l.name}</span>
                  {l.price && (
                    <>
                      <span className="leader" aria-hidden="true" />
                      <span className="tabular shrink-0 text-ink">{l.price}</span>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
          {item.descr && <p className="tabular mt-1 text-sm text-cream-soft">{item.descr}</p>}
        </div>
      </div>
    </li>
  );
}
