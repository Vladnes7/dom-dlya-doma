"use client";

import Image from "next/image";
import { motion, useMotionValue, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { HITS } from "@/data/site";
import { HangingLamp } from "./Logo";

// Горизонтальная лента: на десктопе вертикальный скролл двигает её вбок.
export function Hits() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [pinned, setPinned] = useState(false);
  const pinnedRef = useRef(false);
  const distRef = useRef(0);
  const x = useMotionValue(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const apply = (v: number) => x.set(pinnedRef.current ? -v * distRef.current : 0);
  useMotionValueEvent(scrollYProgress, "change", apply);

  useEffect(() => {
    const desk = window.matchMedia("(min-width: 1024px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const measure = () => {
      const on = desk.matches && !reduce.matches;
      pinnedRef.current = on;
      setPinned(on);
      const track = trackRef.current;
      if (track) distRef.current = Math.max(0, track.scrollWidth - window.innerWidth);
      setDistance(distRef.current);
      apply(scrollYProgress.get());
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    desk.addEventListener("change", measure);
    reduce.addEventListener("change", measure);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      desk.removeEventListener("change", measure);
      reduce.removeEventListener("change", measure);
      window.removeEventListener("resize", measure);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="hits-title"
      className="relative bg-ink"
      style={{ height: pinned ? `calc(100svh + ${distance}px)` : undefined }}
    >
      <div className={`${pinned ? "sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden pt-[4.5rem]" : "overflow-hidden py-[var(--section)]"}`}>
        <div className="wrap flex flex-wrap items-end justify-between gap-6">
          <h2 id="hits-title" className="relative isolate display text-[clamp(2.4rem,4.6vw,4.25rem)]">
            С чего <em className="text-brass">начать</em>
            <HangingLamp cord={420} className="-z-10 left-[calc(100%-1rem)] bottom-[calc(50%-92px)] scale-75 lg:left-[calc(100%+0.5rem)] lg:scale-100" />
          </h2>
          <p className="max-w-[36ch] text-ink-soft">
            Восемь блюд, которые стоит попробовать первыми. Остальные 140 позиций в меню ниже.
          </p>
        </div>

        <div
          className={`mt-10 ${pinned ? "" : "no-scrollbar snap-x snap-mandatory scroll-px-[var(--gutter)] overflow-x-auto overscroll-x-contain"}`}
        >
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex w-max items-start gap-6 px-[var(--gutter)] lg:gap-10"
          >
            {HITS.map((h, i) => {
              const wide = i % 3 === 0;
              return (
                <article
                  key={h.title}
                  className={`group relative isolate shrink-0 snap-start ${
                    wide ? "w-[82vw] sm:w-[60vw] lg:w-[min(40vw,58vh*4/3)]" : "w-[68vw] sm:w-[44vw] lg:w-[min(26vw,46vh*4/5)]"
                  } ${i % 2 === 1 ? "lg:mt-[6vh]" : ""}`}
                >
                  {/* Тёплый свет за блюдом при наведении */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-x-16 -top-16 -z-10 aspect-[4/3] bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(201,150,74,0.5)_0%,transparent_100%)] opacity-0 transition-opacity duration-500 ease-[var(--ease-out-soft)] [@media(hover:hover)]:group-hover:opacity-100"
                  />
                  <div className={`relative overflow-hidden ${wide ? "aspect-[4/3]" : "aspect-[4/5]"}`}>
                    <Image
                      src={h.img}
                      alt={h.title}
                      fill
                      sizes={wide ? "(min-width:1024px) 40vw, 82vw" : "(min-width:1024px) 26vw, 68vw"}
                      className="object-cover brightness-[0.92] transition-[transform,filter] duration-700 ease-[var(--ease-out-soft)] [@media(hover:hover)]:group-hover:scale-[1.04] [@media(hover:hover)]:group-hover:brightness-105"
                    />
                  </div>
                  <div className="mt-5 flex items-baseline justify-between gap-4">
                    <h3 className="display text-[1.45rem] leading-tight">{h.title}</h3>
                    <span className="tabular shrink-0 text-lg text-brass">{h.price}</span>
                  </div>
                  <p className="mt-1.5 text-[0.95rem] text-ink-soft">{h.note}</p>
                  {h.quote && (
                    <blockquote className="mt-4 border-l border-brass/50 pl-4 text-[0.95rem] text-cream/85">
                      <p className="italic">«{h.quote.text}»</p>
                      <footer className="mt-1 text-sm text-ink-soft">{h.quote.author}, Яндекс.Карты</footer>
                    </blockquote>
                  )}
                </article>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
