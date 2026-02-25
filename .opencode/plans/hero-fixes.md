# Hero Section Fixes Plan

## 1. Fix doble scroll
**File:** `src/components/Hero.tsx` line 26

```diff
- <section className="relative overflow-x-hidden">
+ <section className="relative overflow-hidden">
```

## 2. Particles — spawn desde top-left, caer hacia abajo
**File:** `src/components/Particles.tsx` — rewrite completo

Replace the entire file with:

```tsx
"use client";

import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 75;

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
    x: Math.random() * w * 0.6,            // spawn in left 60%
    y: -(Math.random() * h * 0.3),          // spawn above viewport (staggered)
    size: 0.3 + Math.random() * 0.55,
    opacity: 0.04 + Math.random() * 0.12,
    vx: 0.02 + Math.random() * 0.08,        // gentle drift right only
    vy: 0.08 + Math.random() * 0.14,        // always downward
    isGreen: i < Math.floor(PARTICLE_COUNT * 0.22),
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

        // Reset to top-left area when particle goes off bottom or right
        if (p.y > h + 2 || p.x > w + 2) {
          p.y = -(Math.random() * 20);
          p.x = Math.random() * w * 0.6;
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
```

Key changes:
- Spawn position: left 60% of width, above viewport (staggered entry)
- Velocity: only positive vx (rightward drift) + positive vy (downward)
- Reset: when off bottom OR right edge -> back to top-left area
- No more horizontal wrap / bidirectional movement

## 3. Textura mas clean
**File:** `src/components/Hero.tsx` lines 57-67 — noise texture

```diff
-          opacity: 0.035,
+          opacity: 0.02,
```

**File:** `src/app/globals.css` lines 36-46 — body stipple

```diff
-  opacity: 0.045;
+  opacity: 0.03;
```

## 4. Color del boton — usar gradiente del H1
**File:** `src/components/Hero.tsx` lines 183-215

Change the button gradient from the current dark green to match the H1 "cada mes," gradient colors:

**Outer border wrapper** (line 189-190):
```diff
-                    background:
-                      "linear-gradient(135deg, rgba(74,222,128,0.75) 0%, rgba(34,197,94,0.45) 50%, rgba(5,150,105,0.75) 100%)",
+                    background:
+                      "linear-gradient(135deg, rgba(134,239,172,0.75) 0%, rgba(74,222,128,0.5) 50%, rgba(34,197,94,0.75) 100%)",
```

**Inner button** (line 197):
```diff
-                  className="inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-[#22c55e] via-[#10b981] to-[#059669] text-black font-bold text-base uppercase tracking-wide transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
+                  className="inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-[#16a34a] via-[#22c55e] to-[#4ade80] text-black font-bold text-base uppercase tracking-wide transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
```

This uses the same green tones as the H1 gradient: `#16a34a -> #22c55e -> #4ade80`

## 5. Logo alineado a la izquierda
**File:** `src/components/Hero.tsx` line 78

```diff
-            className="mx-auto mb-10"
+            className="mx-auto lg:mx-0 mb-10"
```

This keeps the logo centered on mobile but left-aligned on desktop, matching the alignment of the H1, paragraph, and button.
