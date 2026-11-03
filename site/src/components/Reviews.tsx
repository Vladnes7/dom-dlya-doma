"use client";

import { Star } from "lucide-react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { RATING, REVIEW_MAIN, REVIEWS, YANDEX_REVIEWS_HREF } from "@/data/site";
import { Reveal, useReducedFlag } from "./Reveal";

function Word({ word, i, total, p }: { word: string; i: number; total: number; p: MotionValue<number> }) {
  const start = i / total;
  const opacity = useTransform(p, [start, Math.min(1, start + 1.6 / total)], [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {word}{" "}
    </motion.span>
  );
}

function Stars({ label }: { label?: string }) {
  return (
    <span className="flex gap-0.5 text-brass" {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} className="size-4" fill="currentColor" strokeWidth={0} aria-hidden="true" />
      ))}
    </span>
  );
}

export function Reviews() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { reduce } = useReducedFlag();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = REVIEW_MAIN.text.split(" ");

  return (
    <section id="otzyvy" aria-labelledby="reviews-title" className="relative bg-ink py-[var(--section)]">
      <div className="wrap">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <h2 id="reviews-title" className="text-[0.95rem] text-ink-soft">
            Что пишут гости
          </h2>
          <a
            href={YANDEX_REVIEWS_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline inline-flex items-center gap-2 text-[0.95rem]"
          >
            <Stars />
            <span className="tabular">
              {String(RATING.value).replace(".", ",")} · {RATING.reviews} отзывов на Яндекс.Картах
            </span>
          </a>
        </div>

        {/* Главная цитата проявляется словами под скролл */}
        <figure className="mt-10">
          <blockquote>
            <p ref={ref} className="display max-w-[16em] text-[clamp(2.1rem,4.4vw,4.4rem)] leading-[1.08]">
              «
              {reduce
                ? REVIEW_MAIN.text
                : words.map((w, i) => <Word key={i} word={w} i={i} total={words.length} p={scrollYProgress} />)}
              »
            </p>
          </blockquote>
          <figcaption className="mt-8 text-ink-soft">
            {REVIEW_MAIN.author}, {REVIEW_MAIN.date}
          </figcaption>
        </figure>

        <ul className="mt-16 grid gap-5 md:grid-cols-2 lg:mt-24 lg:grid-cols-3 lg:gap-6">
          {REVIEWS.map((r, i) => (
            <Reveal as="li" key={r.author} delay={(i % 3) * 0.07} className="flex">
              <figure className="flex w-full flex-col rounded-[var(--radius-ui)] border border-ink-line bg-ink-2 p-7 shadow-[inset_0_1px_0_rgba(243,235,221,0.05)] lg:p-8">
                <Stars label="Оценка 5 из 5" />
                <blockquote className="mt-5 flex-1">
                  <p className="text-[1.05rem] text-cream/90">«{r.text}»</p>
                </blockquote>
                <figcaption className="mt-6 flex items-baseline justify-between gap-4 border-t border-ink-line pt-4 text-sm">
                  <span className="text-cream">{r.author}</span>
                  <span className="text-ink-soft">{r.date ? `${r.date} · ` : ""}Яндекс.Карты</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
