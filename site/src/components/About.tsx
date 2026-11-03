"use client";

import Image from "next/image";
import { Car, Coffee, Gift, ShoppingBag, Tv, Wifi } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { FEATURES, RATING } from "@/data/site";
import { HangingLamp } from "./Logo";
import { CountUp, Reveal, useReducedFlag } from "./Reveal";

const ICONS = { tv: Tv, wifi: Wifi, car: Car, bag: ShoppingBag, coffee: Coffee, gift: Gift };

export function About() {
  const ref = useRef<HTMLElement>(null);
  const { ref: reduceRef } = useReducedFlag();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Три плана коллажа едут с разной скоростью: ближний быстрее
  const lane = (from: number, to: number) => (v: number) => (reduceRef.current ? 0 : from + (to - from) * v);
  const far = useTransform(scrollYProgress, lane(40, -40));
  const near = useTransform(scrollYProgress, lane(140, -160));
  const mid = useTransform(scrollYProgress, lane(80, -70));

  return (
    <section id="mesto" ref={ref} className="relative overflow-hidden bg-ink-2 py-[var(--section)]">
      <div className="wrap grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5 lg:pt-10">
          <Reveal className="relative">
            <HangingLamp cord={420} className="right-[4%] bottom-[calc(100%-122px)] lg:right-[10%]" />
            <h2 className="relative display text-[clamp(2.4rem,4.6vw,4.25rem)]">
              Тот самый <span className="text-brass">ДДД</span> на Маркса
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-7 max-w-[46ch] text-cream/85">
              Кафе на втором этаже торгового центра «Дом для дома». Кирпичные стены, бархатные диваны, лампы
              над столами и бар с разливным пивом. Отдельные залы подходят для дней рождения и корпоративов.
            </p>
          </Reveal>

          <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-9 border-t border-ink-line pt-9">
            <Reveal>
              <dt className="sr-only">Рейтинг</dt>
              <dd className="display text-[3.25rem] leading-none text-brass">
                <CountUp to={RATING.value} decimals={1} />
              </dd>
              <dd className="mt-2 text-[0.95rem] text-ink-soft">
                на Яндекс.Картах, <span className="tabular">{RATING.votes.toLocaleString("ru-RU")}</span> оценок
              </dd>
            </Reveal>
            <Reveal delay={0.06}>
              <dt className="sr-only">Часы в выходные</dt>
              <dd className="display tabular text-[3.25rem] leading-none text-brass">02:00</dd>
              <dd className="mt-2 text-[0.95rem] text-ink-soft">закрываемся в пятницу и субботу</dd>
            </Reveal>
            <Reveal delay={0.12} className="col-span-2">
              <dt className="sr-only">Средний чек</dt>
              <dd className="display tabular text-[2.25rem] leading-none">1000–1500 ₽</dd>
              <dd className="mt-2 text-[0.95rem] text-ink-soft">
                средний чек · «Хорошее место 2026» по версии Яндекс.Карт
              </dd>
            </Reveal>
          </dl>

          <ul className="mt-12 grid grid-cols-2 border-t border-ink-line">
            {FEATURES.map((f, i) => {
              const Icon = ICONS[f.icon];
              return (
                <Reveal
                  as="li"
                  key={f.text}
                  delay={i * 0.05}
                  className="flex items-center gap-3 border-b border-ink-line py-4 pr-4"
                >
                  <Icon className="size-5 shrink-0 text-brass" strokeWidth={1.5} aria-hidden="true" />
                  <span className="text-[0.95rem]">{f.text}</span>
                </Reveal>
              );
            })}
          </ul>
        </div>

        {/* Коллаж зала: три фото на разной глубине */}
        <div className="relative min-h-[560px] sm:min-h-[680px] lg:col-span-7 lg:min-h-[820px]">
          <motion.figure className="absolute top-0 right-0 w-[86%] lg:w-[80%]" style={{ y: far }}>
            <div className="relative aspect-[3/2] overflow-hidden">
              <Image
                src="/img/bar-polki.jpg"
                alt="Бар: подсвеченные стеллажи с бутылками"
                fill
                sizes="(min-width:1024px) 46vw, 86vw"
                className="object-cover"
              />
            </div>
          </motion.figure>

          <motion.figure
            className="absolute top-[30%] left-0 z-10 w-[52%] lg:w-[44%]"
            style={{ y: near }}
          >
            <div className="relative aspect-[4/5] overflow-hidden shadow-[0_40px_80px_-30px_rgba(5,7,10,0.9)]">
              <Image
                src="/img/zal-kirpich.jpg"
                alt="Зал: кирпичная стена, синие бархатные диваны и подвесные лампы"
                fill
                sizes="(min-width:1024px) 26vw, 52vw"
                className="object-cover"
              />
            </div>
          </motion.figure>

          <motion.figure className="absolute right-[4%] bottom-0 w-[40%] lg:w-[34%]" style={{ y: mid }}>
            <div className="relative aspect-square overflow-hidden">
              <Image
                src="/img/zal-shtory.jpg"
                alt="Зал с красными шторами и цветочными обоями"
                fill
                sizes="(min-width:1024px) 20vw, 40vw"
                className="object-cover"
              />
            </div>
          </motion.figure>
        </div>
      </div>

    </section>
  );
}
