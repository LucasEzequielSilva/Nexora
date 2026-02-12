"use client";

import FadeUp from "./FadeUp";
import DotGrid from "./DotGrid";

const pillars = [
  {
    number: "01",
    title: "Captacion Inteligente",
    description:
      "Publicidad estrategica que atrae personas interesadas en tu servicio. No seguidores — clientes potenciales reales.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-accent fill-none stroke-2">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Filtro Automatico",
    description:
      "Un sistema que califica a cada interesado y solo te pasa a los que estan listos para comprar. Sin perder tiempo con curiosos.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-accent fill-none stroke-2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Seguimiento 24/7",
    description:
      "Seguimiento automatico por WhatsApp y email que cierra ventas mientras dormis. El 80% de ventas se pierden sin seguimiento.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-accent fill-none stroke-2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
];

export default function Pillars() {
  return (
    <section className="max-w-[1000px] mx-auto px-6 pb-20 relative overflow-hidden">
      <DotGrid fade="radial" />
      <FadeUp>
        <div className="text-center mb-12">
          <h2 className="text-[clamp(24px,3.5vw,36px)] font-extrabold tracking-tight mb-3">
            El Sistema de 3 Pilares
          </h2>
          <p className="text-text-secondary text-base">
            Simple. Automatizado. Predecible.
          </p>
        </div>
      </FadeUp>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {pillars.map((pillar, i) => (
          <FadeUp key={pillar.number} delay={0.1 * (i + 1)}>
            <div className="bg-bg-card border border-border rounded-2xl p-9 px-7 transition-all duration-300 hover:border-[rgba(34,197,94,0.25)] hover:-translate-y-1">
              <div className="font-mono text-[13px] text-accent font-bold mb-4 tracking-[2px]">
                {pillar.number}
              </div>
              <div className="w-12 h-12 bg-accent-glow rounded-xl flex items-center justify-center mb-5">
                {pillar.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 tracking-tight">
                {pillar.title}
              </h3>
              <p className="text-[15px] text-text-secondary leading-relaxed">
                {pillar.description}
              </p>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
