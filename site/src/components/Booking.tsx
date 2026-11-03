"use client";

import Image from "next/image";
import { MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  ADDRESS,
  ADDRESS_NOTE,
  HOURS,
  PHONE_DISPLAY,
  PHONE_HREF,
  WHATSAPP_HREF,
  YANDEX_ROUTE_HREF,
  YANDEX_ORG_HREF,
} from "@/data/site";
import { Lamp } from "./Logo";
import { Reveal } from "./Reveal";

export function Booking() {
  const lampRef = useRef<HTMLDivElement>(null);
  const lit = useInView(lampRef, { once: true, margin: "0px 0px -30% 0px" });
  const reduce = useReducedMotion();
  const [today, setToday] = useState<number | null>(null);

  // День недели считаем у гостя, чтобы подсветить сегодняшние часы
  useEffect(() => {
    const id = requestAnimationFrame(() => setToday(new Date().getDay()));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section id="bron" aria-labelledby="bron-title" className="grain relative overflow-hidden bg-ink-2 pt-0 pb-[var(--section)]">
      {/* Лампа над финалом: загорается, когда гость дошёл до брони */}
      <div ref={lampRef} className="pointer-events-none relative mx-auto h-[220px] w-[120px]" aria-hidden="true">
        <div className="sway absolute top-0 left-0">
          <motion.div
            initial={false}
            animate={{ opacity: lit ? 1 : 0.25 }}
            transition={{ duration: reduce ? 0 : 1.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <Lamp cord={110} />
          </motion.div>
        </div>
      </div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-80px] left-1/2 h-[720px] w-[1000px] max-w-[160vw] -translate-x-1/2 bg-[radial-gradient(ellipse_50%_50%_at_50%_45%,rgba(201,150,74,0.16)_0%,transparent_100%)]"
        initial={false}
        animate={{ opacity: lit ? 1 : 0 }}
        transition={{ duration: reduce ? 0 : 1.6 }}
      />

      <div className="wrap relative grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <Reveal>
            <h2 id="bron-title" className="display text-[clamp(2.75rem,6vw,5.5rem)]">
              Оставим вам <em className="text-brass">стол</em>
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mt-7 max-w-[44ch] text-cream/85">
              Позвоните или напишите в WhatsApp: дата, время и сколько будет гостей. На день рождения или
              корпоратив подберём отдельный зал.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <a href={PHONE_HREF} className="display tabular mt-10 inline-block text-[clamp(2rem,4.2vw,3.5rem)] text-brass">
              {PHONE_DISPLAY}
            </a>
          </Reveal>
          <Reveal delay={0.18} className="mt-8 flex flex-wrap gap-3">
            <a href={PHONE_HREF} className="btn btn-primary">
              <Phone className="size-4" aria-hidden="true" />
              Позвонить
            </a>
            <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <MessageCircle className="size-4" aria-hidden="true" />
              Написать в WhatsApp
            </a>
          </Reveal>

          <Reveal delay={0.1} className="mt-14 grid gap-10 border-t border-ink-line pt-10 sm:grid-cols-2">
            <div>
              <h3 className="text-sm text-ink-soft">Часы работы</h3>
              <dl className="mt-4 space-y-2">
                {HOURS.map((h) => {
                  const now = today != null && h.days.includes(today);
                  return (
                    <div key={h.label} className={`flex justify-between gap-6 ${now ? "text-brass" : ""}`}>
                      <dt>
                        {h.label}
                        {now && <span className="sr-only"> (сегодня)</span>}
                      </dt>
                      <dd className="tabular">{h.time}</dd>
                    </div>
                  );
                })}
              </dl>
            </div>
            <div>
              <h3 className="text-sm text-ink-soft">Адрес</h3>
              <p className="mt-4">
                {ADDRESS}
                <br />
                <span className="text-ink-soft">{ADDRESS_NOTE}. Вход под козырьком с вывеской.</span>
              </p>
              <a
                href={YANDEX_ORG_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline mt-3 inline-flex items-center gap-2 text-[0.95rem] text-brass"
              >
                <MapPin className="size-4" aria-hidden="true" />
                Открыть на Яндекс.Картах
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-6 lg:pt-4">
          <figure>
            <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[4/3] lg:aspect-[4/5]">
              <Image
                src="/img/bar-kofe.jpg"
                alt="Барная стойка с кофемашиной и бокалами"
                fill
                sizes="(min-width:1024px) 46vw, 100vw"
                className="object-cover object-[22%_50%]"
              />
            </div>
            <figcaption className="mt-4 flex justify-end">
              <a
                href={YANDEX_ROUTE_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-flex items-center gap-2 text-[0.95rem] text-brass"
              >
                <Navigation className="size-4" aria-hidden="true" />
                Построить маршрут
              </a>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
