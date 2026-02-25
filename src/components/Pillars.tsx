"use client";

import FadeUp from "./FadeUp";

const pillars = [
  {
    number: "01",
    title: "Captacion con IA",
    description:
      "Meta Ads + inteligencia artificial identifican y atraen personas con intencion de compra real. No seguidores — prospectos que ya buscan lo que ofreces.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-accent fill-none stroke-2">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Filtro automatico",
    description:
      "El sistema califica cada prospecto y solo te agenda reuniones con quienes estan listos para comprar. Cero tiempo perdido con curiosos.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-accent fill-none stroke-2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Cierre automatico",
    description:
      "Seguimiento por WhatsApp e email que convierte mientras dorms. El 80% de las ventas requieren 5+ contactos — el sistema lo hace por vos.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-accent fill-none stroke-2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
];

export default function Pillars() {
  return (
    <section className="mx-auto px-6 pb-24 relative overflow-hidden" style={{ maxWidth: "1100px" }}>

      {/* Section header */}
      <FadeUp>
        <div className="text-center mb-14">
          {/* Eyebrow label */}
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="h-px w-8 bg-accent opacity-50" />
            <span
              className="font-mono text-[11px] uppercase tracking-widest text-accent"
            >
              El Sistema
            </span>
            <span className="h-px w-8 bg-accent opacity-50" />
          </div>

          <h2 className="text-[clamp(26px,3.5vw,40px)] font-extrabold tracking-tight mb-4 leading-tight">
            Como llenamos tu agenda en 30 dias
          </h2>

          <p className="text-text-secondary text-base max-w-md mx-auto">
            Un sistema de 3 pasos. Predecible, automatizado, sin friccion.
          </p>
        </div>
      </FadeUp>

      {/* Cards grid */}
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-5">

        {pillars.map((pillar, i) => (
          <FadeUp key={pillar.number} delay={0.1 * (i + 1)}>
            {/* group wrapper for hover state coordination */}
            <div className="group relative h-full rounded-2xl overflow-hidden cursor-default">

              {/* Green left accent border — always visible */}
               <div
                 className="absolute left-0 top-0 bottom-0 w-[3px] z-10 transition-opacity duration-300"
                 style={{
                   background:
                     "linear-gradient(to bottom, rgba(34,197,94,0.9), rgba(34,197,94,0.4))",
                 }}
               />

               {/* Card */}
               <div
                 className="relative h-full rounded-2xl overflow-hidden p-8 pl-9 transition-all duration-300"
                 style={{
                   background:
                     "linear-gradient(135deg, #1a1a1e 0%, #18181b 40%, #16191f 100%)",
                   border: "1px solid rgba(34,197,94,0.25)",
                   boxShadow: "0 0 20px rgba(34,197,94,0.1), 0 4px 24px rgba(0,0,0,0.25)",
                 }}
                 onMouseEnter={(e) => {
                   const el = e.currentTarget;
                   el.style.borderColor = "rgba(34,197,94,0.5)";
                   el.style.boxShadow =
                     "0 0 0 1px rgba(34,197,94,0.2), 0 20px 40px rgba(34,197,94,0.15), 0 4px 24px rgba(0,0,0,0.4)";
                   el.style.transform = "translateY(-6px)";
                 }}
                 onMouseLeave={(e) => {
                   const el = e.currentTarget;
                   el.style.borderColor = "rgba(34,197,94,0.25)";
                   el.style.boxShadow = "0 0 20px rgba(34,197,94,0.1), 0 4px 24px rgba(0,0,0,0.25)";
                   el.style.transform = "translateY(0)";
                 }}
               >
                 {/* Radial glow — always on */}
                 <div
                   className="pointer-events-none absolute inset-0 opacity-100 transition-opacity duration-500 z-0"
                   style={{
                     background:
                       "radial-gradient(ellipse at 0% 100%, rgba(34,197,94,0.1) 0%, transparent 60%)",
                   }}
                 />

                {/* Large watermark number */}
                <div
                  className="pointer-events-none absolute bottom-3 right-4 select-none z-0 leading-none"
                  style={{
                    fontSize: "120px",
                    fontWeight: 900,
                    color: "rgba(255,255,255,0.025)",
                    fontFamily: "var(--font-outfit, sans-serif)",
                  }}
                  aria-hidden="true"
                >
                  {pillar.number}
                </div>

                {/* Card content */}
                <div className="relative z-10 flex flex-col h-full">

                  {/* Paso micro-label */}
                  <div className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-3">
                    Paso {pillar.number}
                  </div>

                  {/* Icon container */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300"
                    style={{
                      background: "rgba(34,197,94,0.08)",
                      border: "1px solid rgba(34,197,94,0.15)",
                    }}
                  >
                    {pillar.icon}
                  </div>

                  {/* Title */}
                  <h3
                    className="font-bold tracking-tight mb-3 text-white"
                    style={{ fontSize: "18px" }}
                  >
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-text-muted leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            </div>
          </FadeUp>
        ))}


      </div>
    </section>
  );
}
