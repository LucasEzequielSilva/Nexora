"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

/* Tres pantallas de ejemplo debajo del hero, inclinadas en 3D, que se enderezan al bajar.
   Son ilustraciones con datos de ejemplo: sin nombres, sin montos y sin datos de ningún cliente.
   Cada una muestra algo que ya hacemos (turnos de Raquel, gestión de MB Cell, reglas de Traslap). */

function Ventana({ titulo, children, className = "" }: { titulo: string; children: ReactNode; className?: string }) {
  return (
    <div
      className={`${className || "vidrio"} rounded-2xl border border-white/[0.06] bg-[#0b1020]/90 backdrop-blur-md shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] overflow-hidden`}
    >
      <div className="flex items-center gap-1.5 px-4 h-9 border-b border-white/[0.07]">
        <span className="w-2 h-2 rounded-full bg-white/15" />
        <span className="w-2 h-2 rounded-full bg-white/15" />
        <span className="w-2 h-2 rounded-full bg-white/15" />
        <span className="ml-3 text-[11px] font-semibold text-text-muted">{titulo}</span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function Estado({ tono, children }: { tono: "ok" | "espera" | "aviso"; children: string }) {
  const tonos = {
    ok: "bg-accent/10 text-accent border-accent/25",
    espera: "bg-amber-400/10 text-amber-300 border-amber-300/25",
    aviso: "bg-sky-400/10 text-sky-300 border-sky-300/25",
  };
  return <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${tonos[tono]}`}>{children}</span>;
}

function PantallaTurnos() {
  const turnos: [string, "ok" | "espera" | "aviso", string][] = [
    ["09:00", "ok", "Confirmado"],
    ["10:30", "ok", "Confirmado"],
    ["11:15", "aviso", "Recordatorio enviado"],
    ["12:00", "espera", "Esperando respuesta"],
    ["16:30", "ok", "Confirmado"],
  ];
  return (
    <Ventana titulo="Turnos de mañana">
      <ul className="space-y-2">
        {turnos.map(([hora, tono, estado]) => (
          <li key={hora} className="flex items-center justify-between rounded-lg bg-white/[0.03] px-3 py-2">
            <span className="font-display text-[12px] font-bold text-text-primary">{hora}</span>
            <span className="h-1.5 w-16 rounded-full bg-white/10" />
            <Estado tono={tono}>{estado}</Estado>
          </li>
        ))}
      </ul>
      <div className="mt-3 ml-auto w-[85%] rounded-xl rounded-tr-sm bg-[#0f3d2a] px-3 py-2 text-[11px] leading-snug text-[#d7ffe9]">
        Hola, te recordamos tu turno de mañana a las 11:15. ¿Lo confirmás?
      </div>
    </Ventana>
  );
}

function PantallaTablero() {
  const barras = [38, 52, 44, 66, 58, 74, 62, 81, 70, 88, 76, 92];
  return (
    <Ventana titulo="Tablero del mes" className="borde-vivo">
      <div className="grid grid-cols-3 gap-2">
        {["Stock a costo", "Ventas", "Consignación"].map((k) => (
          <div key={k} className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-2.5 py-2">
            <p className="text-[9.5px] font-semibold uppercase tracking-wider text-text-muted">{k}</p>
            {/* Los números van ocultos, como con el botón del sistema para cuando hay alguien mirando */}
            <p className="mt-1 font-display text-[15px] font-bold tracking-[0.2em] text-text-secondary">•••••</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex h-[118px] items-end gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 pb-3 pt-4">
        {barras.map((h, i) => (
          <span
            key={i}
            className="flex-1 rounded-t-[3px] bg-gradient-to-t from-accent/25 to-accent/80"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between text-[10.5px] text-text-muted">
        <span>Stock · Ventas · Canje · Garantías</span>
        <span className="inline-flex items-center gap-1 text-accent">
          <span className="w-1.5 h-1.5 rounded-full bg-accent pulse-dot" /> Al día
        </span>
      </div>
    </Ventana>
  );
}

function PantallaReglas() {
  const reglas = ["Zona", "Tipo de día", "Cliente", "Bultos"];
  return (
    <Ventana titulo="Reglas de pago">
      <ul className="space-y-2">
        {reglas.map((r) => (
          <li key={r} className="flex items-center justify-between rounded-lg bg-white/[0.03] px-3 py-2.5">
            <span className="text-[12px] font-semibold text-text-secondary">{r}</span>
            <span className="relative h-4 w-7 rounded-full bg-accent/80">
              <span className="absolute right-0.5 top-0.5 h-3 w-3 rounded-full bg-white" />
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-3 rounded-lg border border-accent/30 bg-accent/[0.08] px-3 py-2.5 text-center text-[12px] font-semibold text-accent">
        Lo que le toca a cada chofer
      </div>
    </Ventana>
  );
}

export default function Vitrina() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  // Además del scroll, se inclina un poco hacia donde está el mouse (como el panel de nexora-sitio-landing)
  const mouseX = useSpring(0, { stiffness: 120, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 120, damping: 20 });
  const giroScroll = useTransform(scrollYProgress, [0, 1], [24, 0]);
  const giroX = useTransform([giroScroll, mouseY], ([s, m]: number[]) => s - m * 4);
  const giroY = useTransform(mouseX, (m) => m * 5);
  const escala = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const ladoY = useTransform(scrollYProgress, [0, 1], [16, 7]);
  const ladoYneg = useTransform(ladoY, (v) => -v);

  const alMover = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width - 0.5);
    mouseY.set((e.clientY - r.top) / r.height - 0.5);
  };
  const alSalir = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={alMover}
      onMouseLeave={alSalir}
      className="relative mx-auto max-w-6xl px-4 sm:px-6 pb-8 [perspective:1400px]"
    >
      {/* Halo verde detrás de las pantallas */}
      <div
        className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[80%] h-[60%] rounded-full bg-accent/[0.12] blur-[100px]"
        aria-hidden="true"
      />
      <motion.div
        aria-hidden="true"
        style={{ rotateX: giroX, rotateY: giroY, scale: escala, transformStyle: "preserve-3d" }}
        className="relative grid items-center gap-5 md:grid-cols-[1fr_1.25fr_1fr]"
      >
        <motion.div style={{ rotateY: ladoY }} className="hidden md:block origin-right">
          <PantallaTurnos />
        </motion.div>
        <PantallaTablero />
        <motion.div style={{ rotateY: ladoYneg }} className="hidden md:block origin-left">
          <PantallaReglas />
        </motion.div>
      </motion.div>
      <p className="relative mt-5 text-center text-[12px] text-text-muted">Pantallas de ejemplo de lo que armamos</p>
    </div>
  );
}
