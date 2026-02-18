"use client";

import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 300;

interface Particle {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  opacity: number;
  vx: number;
  vy: number;
  pulseSpeed: number;
  pulseOffset: number;
}

function createParticles(w: number, h: number): Particle[] {
  const particles: Particle[] = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const side = Math.random() > 0.5 ? 1 : 0;
    const sourceX = side === 0 ? 0 : w;

    const angle = side === 0
      ? (Math.random() * 80 + 10) * (Math.PI / 180)
      : (Math.random() * 80 + 90) * (Math.PI / 180);

    const dist = Math.random() * Math.max(w, h) * 0.85 + 15;

    const x = sourceX + Math.cos(angle) * dist;
    const y = Math.sin(angle) * dist;

    const distFromSource = Math.sqrt((x - sourceX) ** 2 + y ** 2);
    const maxDist = Math.sqrt(w * w + h * h);
    const proximity = 1 - Math.min(distFromSource / maxDist, 1);

    const baseOpacity = 0.06 + proximity * 0.25;
    const size = 0.15 + Math.random() * 0.25 + proximity * 0.2;

    particles.push({
      x, y, size, baseOpacity,
      opacity: baseOpacity,
      vx: (Math.random() - 0.5) * 0.06,
      vy: (Math.random() - 0.5) * 0.04,
      pulseSpeed: 0.15 + Math.random() * 0.4,
      pulseOffset: Math.random() * Math.PI * 2,
    });
  }

  return particles;
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

    let time = 0;

    const animate = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016;

      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -5) p.x = w + 5;
        if (p.x > w + 5) p.x = -5;
        if (p.y < -5) p.y = h + 5;
        if (p.y > h + 5) p.y = -5;

        const pulse = Math.sin(time * p.pulseSpeed + p.pulseOffset);
        p.opacity = p.baseOpacity + pulse * 0.04;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${Math.max(0, p.opacity)})`;
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
    />
  );
}
