"use client";

import FadeUp from "./FadeUp";

const pains = [
  {
    label: "01",
    text: "Coordinás turnos por WhatsApp todo el día",
    detail: "Horas perdidas respondiendo uno por uno. Turnos que se pierden cuando no podés responder a tiempo.",
    glow: "rgba(239,68,68,0.06)",
  },
  {
    label: "02",
    text: "Los clientes que no vuelven, desaparecen",
    detail: "Sin seguimiento automático, el que no volvió esta semana no vuelve nunca. Y nadie lo llama.",
    glow: "rgba(239,68,68,0.06)",
  },
  {
    label: "03",
    text: "Un mes lleno, el siguiente en silencio",
    detail: "Sin captación activa, tus ingresos dependen de la suerte del boca en boca. No podés planificar.",
    glow: "rgba(239,68,68,0.06)",
  },
  {
    label: "04",
    text: "No sabés los números de tu propio negocio",
    detail: "Sin dashboard, estás tomando decisiones a ciegas. No sabés qué especialidad rinde más ni cuántos clientes perdiste.",
    glow: "rgba(239,68,68,0.06)",
  },
];

export default function PainPoints() {
  return (
    <section className="mx-auto px-6 pt-16 pb-24" style={{ maxWidth: "860px" }}>
      <FadeUp>
        <div className="text-center mb-14">
          {/* Eyebrow — red variant */}
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="h-px w-8 opacity-50" style={{ background: "#ef4444" }} />
            <span className="font-mono text-[11px] uppercase tracking-widest" style={{ color: "#ef4444" }}>
              El problema
            </span>
            <span className="h-px w-8 opacity-50" style={{ background: "#ef4444" }} />
          </div>
          <h2 className="text-[clamp(26px,3.5vw,40px)] font-extrabold tracking-tight leading-[1.08] mb-3">
            El problema no es tu negocio.
            <br />
            Es que no tiene sistema.
          </h2>
        </div>
      </FadeUp>

      <div className="grid gap-4">
        {pains.map((pain, i) => (
          <FadeUp key={i} delay={0.08 * (i + 1)}>
            <div
              className="group relative flex items-start gap-5 p-6 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 cursor-default"
              style={{
                background: "linear-gradient(135deg, rgba(24,24,27,0.95) 0%, rgba(18,18,20,0.98) 100%)",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
              }}
            >
              {/* Left red accent line */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl transition-all duration-300"
                style={{
                  background: "linear-gradient(to bottom, rgba(239,68,68,0.7), rgba(239,68,68,0.2))",
                  opacity: 0.5,
                }}
              />

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(ellipse at 0% 50%, ${pain.glow} 0%, transparent 60%)` }}
              />

              {/* Big watermark number */}
              <div
                className="absolute right-5 top-1/2 -translate-y-1/2 font-mono font-black text-[72px] leading-none pointer-events-none select-none"
                style={{ color: "rgba(255,255,255,0.025)" }}
              >
                {pain.label}
              </div>

              {/* Icon */}
              <div className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center mt-0.5 relative z-10"
                style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.15)" }}>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>

              {/* Text */}
              <div className="relative z-10 flex-1 min-w-0">
                <p className="text-[16px] font-semibold text-text-primary leading-snug mb-1">
                  {pain.text}
                </p>
                <p className="text-[14px] text-text-muted leading-relaxed">
                  {pain.detail}
                </p>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
