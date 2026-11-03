"use client";

import Lenis from "lenis";
import { useEffect } from "react";

// Плавный скролл колесом на десктопе. Тач остаётся нативным, reduced motion отключает.
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Отступ под шапку берётся из scroll-padding-top в globals.css
    const lenis = new Lenis({ lerp: 0.11, anchors: true, autoRaf: true });
    return () => lenis.destroy();
  }, []);
  return null;
}
