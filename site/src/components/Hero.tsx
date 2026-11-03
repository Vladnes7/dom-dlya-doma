"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Lamp } from "./Logo";

// Окно-дом на десктопе: точки многоугольника (лево крыши, конёк, право крыши, низ справа, низ слева).
const HOUSE = [
  [55, 30],
  [74, 9],
  [93, 30],
  [93, 92],
  [55, 92],
];
const FULL = [
  [0, 0],
  [50, 0],
  [100, 0],
  [100, 100],
  [0, 100],
];

const ease = (t: number) => 1 - Math.pow(1 - t, 3);

// Заставка «Свет включается»: тайминги одной последовательности, секунды
const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const T = { lamps: 0.15, window: 0.4, roof: 0.6, title: 0.7, rest: 1.15 };

// Лампа загорается с коротким мерцанием, как настоящая
function LampOn({ i, children }: { i: number; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.7, 0.25, 1] }}
      transition={{ duration: 0.7, times: [0, 0.35, 0.55, 1], delay: T.lamps + i * 0.12 }}
    >
      {children}
    </motion.div>
  );
}

// Окно раскрывается сверху вниз, от конька крыши
function WindowReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
      animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
      transition={{ duration: 1, ease: EASE_OUT, delay: T.window }}
    >
      {children}
    </motion.div>
  );
}

// Крыша «Д» из логотипа прорисовывается линиями
function HeroRoof() {
  const lines = ["M10 290 L220 6 L430 290", "M255 54 L120 290", "M305 122 L215 290", "M0 290 H440"];
  return (
    <svg viewBox="0 0 440 300" fill="none" className="h-auto w-full" aria-hidden="true">
      <g stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
        {lines.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.1, ease: EASE_OUT, delay: T.roof + i * 0.1 }}
          />
        ))}
      </g>
    </svg>
  );
}

// Слово заголовка поднимается из-под линии
function RiseWord({ children, i }: { children: React.ReactNode; i: number }) {
  return (
    <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
      <motion.span
        className="inline-block"
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.9, ease: EASE_OUT, delay: T.title + i * 0.08 }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function FadeUp({ children, delay, className = "" }: { children: React.ReactNode; delay: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

function useHouseClip(p: MotionValue<number>) {
  return useTransform(p, (v) => {
    const t = ease(clamp01((v - 0.12) / 0.5));
    const pts = HOUSE.map(([x, y], i) => {
      const [fx, fy] = FULL[i];
      return `${(x + (fx - x) * t).toFixed(2)}% ${(y + (fy - y) * t).toFixed(2)}%`;
    });
    return `polygon(${pts.join(", ")})`;
  });
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [pinned, setPinned] = useState(false);
  const [mobileMotion, setMobileMotion] = useState(false);
  const pinnedRef = useRef(false);
  const mobileRef = useRef(false);

  useEffect(() => {
    const desk = window.matchMedia("(min-width: 1024px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      pinnedRef.current = desk.matches && !reduce.matches;
      mobileRef.current = !desk.matches && !reduce.matches;
      setPinned(pinnedRef.current);
      setMobileMotion(mobileRef.current);
    };
    sync();
    desk.addEventListener("change", sync);
    reduce.addEventListener("change", sync);
    return () => {
      desk.removeEventListener("change", sync);
      reduce.removeEventListener("change", sync);
    };
  }, []);

  // Десктоп: прогресс за время закрепления. Телефон: прогресс ухода hero вверх.
  const { scrollYProgress: deskRaw } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const { scrollYProgress: mobRaw } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const p = useTransform(deskRaw, (v) => (pinnedRef.current ? v : 0));
  const m = useTransform(mobRaw, (v) => (mobileRef.current ? v : 0));

  const clip = useHouseClip(p);
  const photoScale = useTransform(p, [0.12, 0.62], [1.16, 1]);
  // В начале окно смотрит на горшок с борщом, к раскрытию кадр встаёт по центру
  const photoX = useTransform(p, (v) => `${(43 * (1 - ease(clamp01((v - 0.12) / 0.5)))).toFixed(2)}vw`);
  const bgY = useTransform(p, [0, 1], ["0%", "-6%"]);
  const roofY = useTransform(p, [0, 0.6], ["0vh", "-16vh"]);
  const roofScale = useTransform(p, [0, 0.6], [1, 1.3]);
  const roofOpacity = useTransform(p, [0.3, 0.55], [0.75, 0]);
  const lampsY = useTransform(p, [0, 0.6], ["0vh", "-70vh"]);
  const plateY = useTransform(p, [0, 0.6], ["0vh", "-48vh"]);
  const plateRotate = useTransform(p, [0, 0.6], [0, -28]);
  const plateOpacity = useTransform(p, [0.12, 0.28], [1, 0]);
  const textY = useTransform(p, [0, 0.2], ["0vh", "-10vh"]);
  const textOpacity = useTransform(p, [0.02, 0.14], [1, 0]);
  const beatOpacity = useTransform(p, [0.6, 0.74], [0, 1]);
  const beatY = useTransform(p, [0.6, 0.78], [48, 0]);

  const mLampsY = useTransform(m, [0, 1], [0, -140]);
  const mPhotoY = useTransform(m, [0, 1], ["0%", "10%"]);
  const mPlateY = useTransform(m, [0, 1], [0, -90]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative"
      style={{ height: pinned ? "240vh" : undefined }}
      aria-label="Кафе Дом для дома"
    >
      <div className="grain relative overflow-hidden lg:sticky lg:top-0 lg:h-[100svh]">
        {/* Слой 0: тёплый зал в расфокусе, самый дальний */}
        <motion.div className="absolute inset-0 -z-0 hidden lg:block" style={{ y: bgY }} aria-hidden="true">
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: T.lamps }}
          >
          <Image
            src="/img/bar-kofe.jpg"
            alt=""
            fill
            sizes="100vw"
            className="scale-110 object-cover opacity-[0.16] blur-md"
          />
          </motion.div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_40%,transparent_0%,var(--color-ink)_70%)]" />
        </motion.div>

        {/* ===== Десктоп: слои ===== */}
        <div className="hidden lg:block">
          {/* Слой 1: крыша из логотипа, за окном */}
          <motion.div
            className="absolute top-[1vh] left-[51vw] w-[46vw] text-brass"
            style={{ y: roofY, scale: roofScale, opacity: roofOpacity, transformOrigin: "50% 30%" }}
            aria-hidden="true"
          >
            <HeroRoof />
          </motion.div>

          {/* Слой 2: окно-дом, раскрывается на весь экран */}
          <WindowReveal className="absolute inset-0">
          <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
            <motion.div className="absolute inset-0" style={{ scale: photoScale, x: photoX }}>
              <Image
                src="/img/borsch.jpg"
                alt="Борщ с пампушками на деревянной доске"
                fill
                preload
                sizes="100vw"
                className="object-cover object-[30%_58%]"
              />
            </motion.div>
            {/* Подложка только под вторым текстом, в углу */}
            <motion.div
              className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_0%_100%,rgba(21,26,34,0.92)_0%,rgba(21,26,34,0.55)_40%,transparent_70%)]"
              style={{ opacity: beatOpacity }}
              aria-hidden="true"
            />
          </motion.div>
          </WindowReveal>

          {/* Слой 3: тарелка, ближе окна */}
          <motion.div
            className="absolute top-[58vh] left-[44vw] aspect-square w-[16vw] max-w-[260px] rounded-full shadow-[0_30px_60px_-20px_rgba(5,7,10,0.8)]"
            style={{ y: plateY, rotate: plateRotate, opacity: plateOpacity }}
            aria-hidden="true"
          >
            <motion.div
              className="size-full"
              initial={{ opacity: 0, scale: 0.9, rotate: -24 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: EASE_OUT, delay: T.title + 0.2 }}
            >
              <div className="absolute -inset-2 rounded-full border border-brass/40" />
              <div className="relative size-full overflow-hidden rounded-full">
                <Image src="/img/steak.jpg" alt="" fill sizes="260px" className="scale-125 object-cover object-[55%_45%]" />
              </div>
            </motion.div>
          </motion.div>

          {/* Слой 4: лампы, самый ближний и самый быстрый */}
          <motion.div className="pointer-events-none absolute inset-x-0 top-0" style={{ y: lampsY }} aria-hidden="true">
            <div className="sway absolute top-0 left-[61vw]">
              <LampOn i={0}>
                <Lamp cord={70} />
              </LampOn>
            </div>
            <div className="sway absolute top-0 left-[77vw] [animation-delay:-2.4s]">
              <LampOn i={1}>
                <Lamp cord={170} />
              </LampOn>
            </div>
            <div className="sway absolute top-0 left-[87vw] [animation-delay:-4.1s]">
              <LampOn i={2}>
                <Lamp cord={40} />
              </LampOn>
            </div>
          </motion.div>

          {/* Текст первого экрана, между залом и окном */}
          <motion.div
            className="absolute inset-y-0 left-0 flex w-[50vw] flex-col justify-center pl-[var(--gutter)] xl:pl-[max(var(--gutter),calc((100vw-88rem)/2+var(--gutter)))]"
            style={{ y: textY, opacity: textOpacity }}
          >
            <HeroCopy />
          </motion.div>

          {/* Второй такт: окно стало залом */}
          <motion.div
            className="absolute bottom-[10vh] left-0 max-w-[40rem] pl-[var(--gutter)] xl:pl-[max(var(--gutter),calc((100vw-88rem)/2+var(--gutter)))]"
            style={{ opacity: beatOpacity, y: beatY }}
          >
            <p className="display text-[clamp(2.75rem,4.6vw,4.75rem)]">
              Как дома. <em className="text-brass">Только посуду</em> моем мы.
            </p>
            <p className="mt-5 text-ink-soft">
              Борщ с пампушками, домашнее сало и сметана · <span className="tabular text-cream">450 ₽</span>
            </p>
          </motion.div>
        </div>

        {/* ===== Телефон и планшет ===== */}
        <div className="relative flex min-h-[100svh] flex-col pt-24 lg:hidden">
          <div className="wrap relative z-10">
            <HeroCopy />
          </div>
          <div className="relative mt-8 h-[44svh] min-h-[280px] md:h-[52svh]">
            <motion.div className="pointer-events-none absolute inset-x-0 -top-10 z-20" style={{ y: mLampsY }} aria-hidden="true">
              <div className="sway absolute top-0 left-[58%] origin-top scale-75">
                <LampOn i={0}>
                  <Lamp cord={40} />
                </LampOn>
              </div>
              <div className="sway absolute top-0 left-[76%] origin-top scale-75 [animation-delay:-3s]">
                <LampOn i={1}>
                  <Lamp cord={90} />
                </LampOn>
              </div>
            </motion.div>
            <WindowReveal className="relative mx-[var(--gutter)] ml-[18%] h-full sm:ml-[30%]">
            <div className="house-clip relative h-full overflow-hidden">
              <motion.div className="absolute -inset-y-[8%] inset-x-0" style={{ y: mobileMotion ? mPhotoY : 0 }}>
                <Image
                  src="/img/borsch.jpg"
                  alt="Борщ с пампушками на деревянной доске"
                  fill
                  sizes="100vw"
                  className="object-cover object-[28%_60%]"
                />
              </motion.div>
            </div>
            </WindowReveal>
            <motion.div
              className="absolute bottom-6 left-[var(--gutter)] aspect-square w-[34vw] max-w-[180px] rounded-full shadow-[0_24px_48px_-16px_rgba(5,7,10,0.85)]"
              style={{ y: mPlateY }}
              aria-hidden="true"
            >
              <motion.div
                className="size-full"
                initial={{ opacity: 0, scale: 0.9, rotate: -24 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1, ease: EASE_OUT, delay: T.title + 0.2 }}
              >
                <div className="absolute -inset-1.5 rounded-full border border-brass/40" />
                <div className="relative size-full overflow-hidden rounded-full">
                  <Image src="/img/steak.jpg" alt="" fill sizes="180px" className="scale-125 object-cover object-[55%_45%]" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroCopy() {
  return (
    <>
      <FadeUp delay={T.title - 0.15}>
        <p className="text-[0.95rem] text-ink-soft">Кафе и бар · проспект Маркса, 61, Обнинск</p>
      </FadeUp>
      <h1 className="display mt-4 text-[clamp(2.75rem,7.4vw,7rem)] lg:mt-5">
        <RiseWord i={0}>Сегодня</RiseWord> <RiseWord i={1}>готовить</RiseWord>{" "}
        <em className="text-brass">
          <RiseWord i={2}>не</RiseWord> <RiseWord i={3}>нужно</RiseWord>
        </em>
      </h1>
      <FadeUp delay={T.rest}>
        <p className="mt-5 max-w-[34ch] text-[1.0625rem] text-cream/85 lg:mt-6 lg:text-[1.125rem]">
          Борщ с пампушками, стейки на гриле и пиво с крана. По пятницам и субботам открыты до двух ночи.
        </p>
      </FadeUp>
      <FadeUp delay={T.rest + 0.1} className="mt-7 flex flex-wrap gap-3 lg:mt-9">
        <a href="#bron" className="btn btn-primary">
          Забронировать стол
        </a>
        <a href="#menu" className="btn btn-ghost">
          Смотреть меню
        </a>
      </FadeUp>
    </>
  );
}
