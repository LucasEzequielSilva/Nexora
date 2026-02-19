"use client";

import FadeUp from "./FadeUp";

const niches = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-accent fill-none stroke-[1.5]">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    title: "Salud & Clinicas",
    description: "Dentistas, nutricionistas, kinesiologos",
    stat: "+23 clientes",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-accent fill-none stroke-[1.5]">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: "Inmobiliarias",
    description: "Corredores, desarrolladoras, brokers",
    stat: "+18 cierres",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-accent fill-none stroke-[1.5]">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: "Fitness & Estetica",
    description: "Gimnasios, centros de estetica, spas",
    stat: "+31 socios",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-accent fill-none stroke-[1.5]">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: "Servicios B2B",
    description: "Agencias, consultoras, coaches",
    stat: "+15 contratos",
  },
];

export default function Niches() {
  return (
    <section className="mx-auto px-6 pb-24 text-center" style={{ maxWidth: "1100px" }}>
      <FadeUp>
        <div className="inline-flex items-center gap-3 mb-5">
          <span className="h-px w-8 bg-accent opacity-50" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-accent">
            Rubros Validados
          </span>
          <span className="h-px w-8 bg-accent opacity-50" />
        </div>
        <h2 className="text-[clamp(26px,3.5vw,40px)] font-extrabold tracking-tight mb-3">
          Probado en estos rubros
        </h2>
        <p className="text-text-secondary text-base mb-10">
          Si tu negocio aparece aca, el sistema ya fue validado en tu industria.
        </p>
      </FadeUp>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-stretch">
        {niches.map((niche, i) => (
          <FadeUp key={niche.title} delay={0.1 * (i + 1)} className="h-full">
            <div
              className="relative h-full rounded-[16px] py-8 px-5 transition-all duration-300 hover:-translate-y-1.5 group cursor-default flex flex-col"
              style={{
                background:
                  "linear-gradient(135deg, rgba(24,24,27,0.9), rgba(20,20,24,0.95))",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.border =
                  "1px solid rgba(34,197,94,0.25)";
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 0 40px rgba(34,197,94,0.08), 0 20px 40px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.border =
                  "1px solid rgba(255,255,255,0.07)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              {/* Stat badge */}
              <div className="absolute top-3 right-3">
                <span
                  className="text-[10px] font-mono text-accent rounded-full px-2 py-1"
                  style={{
                    background: "rgba(34,197,94,0.08)",
                    border: "1px solid rgba(34,197,94,0.2)",
                  }}
                >
                  {niche.stat}
                </span>
              </div>

              {/* Icon container */}
              <div className="flex justify-center mb-5">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{
                    background: "rgba(34,197,94,0.07)",
                    border: "1px solid rgba(34,197,94,0.12)",
                  }}
                >
                  {niche.icon}
                </div>
              </div>

              <h3 className="text-[15px] font-semibold mb-1.5">{niche.title}</h3>
              <p className="text-[13px] text-text-muted leading-relaxed flex-1">{niche.description}</p>

              {/* Radial green glow on hover */}
              <div
                className="absolute inset-0 rounded-[16px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 80%, rgba(34,197,94,0.06) 0%, transparent 70%)",
                }}
              />
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
