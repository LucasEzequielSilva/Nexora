"use client";

import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 120;

interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  vx: number;
  vy: number;
  isGreen: boolean;
}

function createParticles(w: number, h: number): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    x: Math.random() * w * 0.4,
    y: -(Math.random() * h * 0.5),
    size: 0.4 + Math.random() * 0.7,
    opacity: 0.08 + Math.random() * 0.15,
    vx: 0.05 + Math.random() * 0.15,
    vy: 0.15 + Math.random() * 0.25,
    isGreen: i < Math.floor(PARTICLE_COUNT * 0.3),
  }));
}

export default function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const dpr = window.devicePixelRatio;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particlesRef.current = createParticles(rect.width, rect.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const { width: w, height: h } = rect;

      ctx.clearRect(0, 0, w, h);

      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.y > h + 2 || p.x > w + 2) {
          p.y = -(Math.random() * 20);
          p.x = Math.random() * w * 0.4;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.isGreen
          ? `rgba(34,197,94,${p.opacity * 0.65})`
          : `rgba(255,255,255,${p.opacity})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
