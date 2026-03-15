"use client";

import FadeUp from "./FadeUp";

const niches = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-accent fill-none stroke-[1.5]">
        <path d="M4 4h4v4H4zM16 4h4v4h-4zM8 8h8M12 8v12M8 16h8" />
      </svg>
    ),
    title: "Barberías y salones",
    before: { val: "5–10", desc: "turnos perdidos por semana por no responder a tiempo" },
    after: { val: "~0", desc: "el sistema responde y agenda 24/7 sin intervención" },
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-accent fill-none stroke-[1.5]">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    title: "Clínicas y consultorios",
    before: { val: "15–20%", desc: "ausentismo mensual sin recordatorios automáticos" },
    after: { val: "< 3%", desc: "recordatorio 24hs y 2hs antes con confirmación" },
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-accent fill-none stroke-[1.5]">
        <circle cx="12" cy="5" r="3" />
        <path d="M6.8 21a6 6 0 0110.4 0M6 9l6 4 6-4" />
      </svg>
    ),
    title: "Gimnasios y studios",
    before: { val: "2 hs", desc: "diarias en gestión manual de clases y turnos" },
    after: { val: "15 min", desc: "revisión del dashboard, el resto es automático" },
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-accent fill-none stroke-[1.5]">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: "Inmobiliarias",
    before: { val: "+6 hs", desc: "promedio para responder una consulta entrante" },
    after: { val: "< 2 min", desc: "respuesta automática y calificación del lead al instante" },
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-accent fill-none stroke-[1.5]">
        <path d="M12 2a5 5 0 015 5c0 3.5-5 9-5 9S7 10.5 7 7a5 5 0 015-5z" />
        <circle cx="12" cy="7" r="2" />
      </svg>
    ),
    title: "Veterinarias",
    before: { val: "40%", desc: "de pacientes que no vuelven a control sin seguimiento" },
    after: { val: "+30%", desc: "retención por recordatorio automático de vacunas y controles" },
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-accent fill-none stroke-[1.5]">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
        <line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    ),
    title: "Estudios profesionales",
    before: { val: "Sin web", desc: "invisible en Google para nuevos clientes que buscan el servicio" },
    after: { val: "+SEO", desc: "landing propia indexada con turnos online desde el día uno" },
  },
];

export default function Niches() {
  return (
    <section id="rubros" className="mx-auto px-6 pb-24 text-center" style={{ maxWidth: "1100px" }}>
      <FadeUp>
        <div className="inline-flex items-center gap-3 mb-5">
          <span className="h-px w-8 bg-accent opacity-50" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-accent">
            Qué cambia por rubro
          </span>
          <span className="h-px w-8 bg-accent opacity-50" />
        </div>
        <h2 className="text-[clamp(26px,3.5vw,40px)] font-extrabold tracking-tight mb-3">
          El impacto concreto,
          <br />
          por tipo de negocio
        </h2>
        <p className="text-text-secondary text-base mb-10">
          Datos basados en lo que el sistema resuelve en cada rubro. Sin vueltas.
        </p>
      </FadeUp>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-stretch">
        {niches.map((niche, i) => (
          <FadeUp key={niche.title} delay={0.08 * (i + 1)} className="h-full">
            <div
              className="relative h-full rounded-[16px] p-6 transition-all duration-300 hover:-translate-y-1.5 group cursor-default flex flex-col text-left"
              style={{
                background:
                  "linear-gradient(135deg, rgba(24,24,27,0.9), rgba(20,20,24,0.95))",
                border: "1px solid rgba(34,197,94,0.2)",
                boxShadow: "0 0 30px rgba(34,197,94,0.08)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.border =
                  "1px solid rgba(34,197,94,0.4)";
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 0 40px rgba(34,197,94,0.15), 0 20px 40px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.border =
                  "1px solid rgba(34,197,94,0.2)";
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 0 30px rgba(34,197,94,0.08)";
              }}
            >
              {/* Icon */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{
                  background: "rgba(34,197,94,0.07)",
                  border: "1px solid rgba(34,197,94,0.12)",
                }}
              >
                {niche.icon}
              </div>

              {/* Title */}
              <h3 className="text-[15px] font-bold text-white mb-4">{niche.title}</h3>

              {/* Divider */}
              <div className="h-px w-full mb-4" style={{ background: "rgba(255,255,255,0.06)" }} />

              {/* Before / After */}
              <div className="grid grid-cols-2 gap-3 flex-1">
                <div className="flex flex-col gap-1">
                  <span className="text-[9.5px] font-bold uppercase tracking-wider text-text-muted">
                    Antes
                  </span>
                  <span
                    className="text-[18px] font-extrabold leading-none line-through"
                    style={{ color: "#a1a1aa", textDecorationColor: "#ef4444" }}
                  >
                    {niche.before.val}
                  </span>
                  <span className="text-[10px] text-text-muted leading-snug mt-1">
                    {niche.before.desc}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[9.5px] font-bold uppercase tracking-wider text-text-muted">
                    Con Nexora
                  </span>
                  <span className="text-[18px] font-extrabold leading-none text-accent">
                    {niche.after.val}
                  </span>
                  <span className="text-[10px] text-text-muted leading-snug mt-1">
                    {niche.after.desc}
                  </span>
                </div>
              </div>

              {/* Radial green glow */}
              <div
                className="absolute inset-0 rounded-[16px] pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 80%, rgba(34,197,94,0.08) 0%, transparent 70%)",
                }}
              />
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
