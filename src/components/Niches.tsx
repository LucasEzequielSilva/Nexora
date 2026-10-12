"use client";

import FadeUp from "./FadeUp";

const niches = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-accent fill-none stroke-[1.5]">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    title: "Clínicas y consultorios",
    pain: "Turnos que se pierden o quedan vacíos cuando nadie contesta a tiempo",
    change: "Se contesta, se agenda y se confirma el turno por WhatsApp, al lado de tu equipo",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-accent fill-none stroke-[1.5]">
        <path d="M4 4h4v4H4zM16 4h4v4h-4zM8 8h8M12 8v12M8 16h8" />
      </svg>
    ),
    title: "Barberías y salones",
    pain: "Mensajes que quedan sin contestar mientras estás con un cliente",
    change: "Se responde y se agenda por WhatsApp",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-accent fill-none stroke-[1.5]">
        <circle cx="12" cy="5" r="3" />
        <path d="M6.8 21a6 6 0 0110.4 0M6 9l6 4 6-4" />
      </svg>
    ),
    title: "Gimnasios y studios",
    pain: "Clases y turnos que se gestionan a mano",
    change: "Pide confirmación y te arma el día cerrado",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-accent fill-none stroke-[1.5]">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: "Inmobiliarias",
    pain: "Consultas que se enfrían esperando respuesta",
    change: "Las consultas se contestan por WhatsApp y quedan ordenadas",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-accent fill-none stroke-[1.5]">
        <path d="M12 2a5 5 0 015 5c0 3.5-5 9-5 9S7 10.5 7 7a5 5 0 015-5z" />
        <circle cx="12" cy="7" r="2" />
      </svg>
    ),
    title: "Veterinarias",
    pain: "El control que se pasa porque nadie se acuerda de avisar",
    change: "Recordatorios antes de cada turno de control",
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
    pain: "Sin una web propia que muestre tu trabajo",
    change: "Web propia con tu marca",
  },
];

export default function Niches() {
  return (
    <section id="rubros" className="mx-auto px-6 pb-24 text-center" style={{ maxWidth: "1100px" }}>
      <FadeUp>
        <div className="inline-flex items-center gap-3 mb-5">
          <span className="h-px w-8 bg-accent opacity-50" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-accent">
            Para quién
          </span>
          <span className="h-px w-8 bg-accent opacity-50" />
        </div>
        <h2 className="text-[clamp(26px,3.5vw,40px)] font-extrabold tracking-tight mb-3">
          Qué cambia
          <br />
          en cada tipo de negocio
        </h2>
        <p className="text-text-secondary text-base mb-10">
          Hoy lo tenemos andando en un consultorio de ortodoncia; en otros rubros lo armamos a medida y lo vemos en la llamada.
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

              {/* El dolor / Lo que cambia */}
              <div className="grid grid-cols-2 gap-3 flex-1">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
                    Hoy
                  </span>
                  <span className="text-[12.5px] text-text-secondary leading-snug">
                    {niche.pain}
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-accent">
                    Lo que cambia
                  </span>
                  <span className="text-[12.5px] text-text-primary leading-snug">
                    {niche.change}
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
