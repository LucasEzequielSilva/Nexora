"use client";

import { useRef, useEffect, useState } from "react";

type Dot = { x: number; y: number; base: number; amp: number; phase: number; speed: number; light: number };

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const h = () => setReduced(mq.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);
  return reduced;
}

/* PATRÓN reutilizable: mosaico de dots/pixeles que brillan cerca de un punto de luz y parpadean.
   lightX/lightY (0–1) = posición de la fuente de luz dentro del contenedor. */
export default function DotField({
  reduced,
  lightX = 0.8,
  lightY = 0.22,
  gap = 12,
  square = 5,
}: {
  reduced: boolean;
  lightX?: number;
  lightY?: number;
  gap?: number;
  square?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !parent || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let dots: Dot[] = [];
    let raf = 0;

    const build = () => {
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      const lx = w * lightX;
      const ly = h * lightY;
      const maxd = Math.hypot(w, h) * 0.6;
      for (let y = gap / 2; y < h; y += gap) {
        for (let x = gap / 2; x < w; x += gap) {
          const light = Math.max(0, 1 - Math.hypot(x - lx, y - ly) / maxd);
          if (light <= 0.02) continue;
          const twinkles = Math.random() < 0.35;
          dots.push({
            x,
            y,
            base: (0.06 + Math.random() * 0.12) * light,
            amp: (twinkles ? 0.3 + Math.random() * 0.6 : 0.08) * light,
            phase: Math.random() * Math.PI * 2,
            speed: 0.5 + Math.random() * 1.4,
            light,
          });
        }
      }
    };

    const paint = (alphaFor: (d: Dot) => number) => {
      ctx.clearRect(0, 0, parent.clientWidth, parent.clientHeight);
      for (const d of dots) {
        const r = Math.round(150 + d.light * 95);
        const b = Math.round(185 + d.light * 55);
        ctx.fillStyle = `rgba(${r}, 245, ${b}, ${alphaFor(d)})`;
        ctx.fillRect(d.x, d.y, square, square);
      }
    };

    const loop = (t: number) => {
      const time = t / 1000;
      paint((d) => (d.amp ? d.base + Math.max(0, Math.sin(time * d.speed + d.phase)) * d.amp : d.base));
      raf = requestAnimationFrame(loop);
    };

    build();
    if (reduced) paint((d) => d.base);
    else raf = requestAnimationFrame(loop);

    const onResize = () => {
      cancelAnimationFrame(raf);
      build();
      if (reduced) paint((d) => d.base);
      else raf = requestAnimationFrame(loop);
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [reduced, lightX, lightY, gap, square]);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />;
}
