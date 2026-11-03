import { useId } from "react";

// Логотип кафе без изменений: оригинальный PNG используется как маска и красится токеном.
export function Logo({ className = "", color = "var(--color-brass)" }: { className?: string; color?: string }) {
  return (
    <span
      role="img"
      aria-label="Дом для дома"
      className={`inline-block aspect-square ${className}`}
      style={{
        backgroundColor: color,
        WebkitMaskImage: "url(/logo.png)",
        maskImage: "url(/logo.png)",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}

// Крыша «Д» из логотипа: треугольник и две внутренние балки. Мотив, не логотип.
export function Roof({ className = "", strokeWidth = 1.5 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 440 300" fill="none" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 290 L220 6 L430 290" />
        <path d="M255 54 L120 290" />
        <path d="M305 122 L215 290" />
        <path d="M0 290 H440" />
      </g>
    </svg>
  );
}

// Подвесная лампа-капля, как над столами в зале.
export function Lamp({ cord = 120, className = "" }: { cord?: number; className?: string }) {
  const h = cord + 96;
  const uid = useId().replace(/:/g, "");
  return (
    <svg viewBox={`0 0 120 ${h + 80}`} width="120" height={h + 80} className={className} aria-hidden="true">
      <defs>
        <radialGradient id={`glow-${uid}`} cx="50%" cy="0%" r="70%">
          <stop offset="0%" stopColor="#ffd9a0" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#c9964a" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#c9964a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`brass-${uid}`} x1="0" x2="1">
          <stop offset="0%" stopColor="#7a5520" />
          <stop offset="45%" stopColor="#e2b56a" />
          <stop offset="100%" stopColor="#8a6224" />
        </linearGradient>
      </defs>
      <line x1="60" y1="0" x2="60" y2={cord} stroke="#3a424f" strokeWidth="1.5" />
      <path
        d={`M60 ${cord} C 66 ${cord + 30}, 74 ${cord + 62}, 74 ${cord + 78} A 14 14 0 0 1 46 ${cord + 78} C 46 ${cord + 62}, 54 ${cord + 30}, 60 ${cord} Z`}
        fill={`url(#brass-${uid})`}
      />
      <ellipse cx="60" cy={h - 4} rx="60" ry="80" fill={`url(#glow-${uid})`} />
      <circle cx="60" cy={h - 6} r="9" fill="#fff4dc" />
    </svg>
  );
}

// Лампа, висящая с потолка секции, с тёплым пятном света вокруг лампочки.
// Позиция задаётся снаружи: лампочка находится на 86px выше нижнего края блока.
export function HangingLamp({ cord, className = "" }: { cord: number; className?: string }) {
  return (
    <span aria-hidden="true" className={`pointer-events-none absolute block origin-bottom ${className}`}>
      <span
        className="absolute left-1/2 block h-[440px] w-[640px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(201,150,74,0.17)_0%,transparent_100%)]"
        style={{ top: cord + 90 }}
      />
      <span className="sway relative block">
        <Lamp cord={cord} />
      </span>
    </span>
  );
}
