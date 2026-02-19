"use client";

import FadeUp from "./FadeUp";

const niches = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-accent fill-none stroke-[1.5]">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    title: "Salud & Clinicas",
    description: "Dentistas, nutricionistas, kinesiologos",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-accent fill-none stroke-[1.5]">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: "Inmobiliarias",
    description: "Corredores, desarrolladoras, brokers",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-accent fill-none stroke-[1.5]">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: "Fitness & Estetica",
    description: "Gimnasios, centros de estetica, spas",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-accent fill-none stroke-[1.5]">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: "Servicios B2B",
    description: "Agencias, consultoras, coaches",
  },
];

export default function Niches() {
  return (
    <section className="max-w-[840px] mx-auto px-6 pb-20 text-center">
      <FadeUp>
        <h2 className="text-[clamp(24px,3.5vw,36px)] font-extrabold tracking-tight mb-3">
          Probado en estos rubros
        </h2>
        <p className="text-text-secondary text-base mb-10">
          Si tu negocio aparece aca, el sistema ya fue validado en tu industria.
        </p>
      </FadeUp>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {niches.map((niche, i) => (
          <FadeUp key={niche.title} delay={0.1 * (i + 1)}>
            <div className="bg-bg-card border border-border rounded-[14px] py-8 px-5 transition-all duration-300 hover:border-[rgba(34,197,94,0.25)] hover:-translate-y-1">
              <div className="flex justify-center mb-4 opacity-90">{niche.icon}</div>
              <h3 className="text-base font-semibold mb-1.5">{niche.title}</h3>
              <p className="text-[13px] text-text-muted">{niche.description}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
