"use client";

import FadeUp from "./FadeUp";

const testimonials = [
  {
    name: "Mariela V.",
    role: "Salón de belleza · Buenos Aires",
    avatar: "M",
    color: "#16a34a",
    quote:
      "Antes coordinaba todos los turnos a mano por WhatsApp. Ahora el sistema los gestiona solo — perdemos cero turnos por no responder. Me ahorró dos horas por día desde la primera semana.",
    stat: "+40 turnos/mes",
    statLabel: "",
  },
  {
    name: "Rodrigo M.",
    role: "Kinesiólogo · Córdoba",
    avatar: "R",
    color: "#15803d",
    quote:
      "La parte del seguimiento automático me cambió el negocio. El sistema detecta los pacientes que no volvieron y les manda un mensaje solo. Antes eso no lo hacía nadie.",
    stat: "+28% retención",
    statLabel: "",
  },
  {
    name: "Tomás F.",
    role: "Barbería · Mendoza",
    avatar: "T",
    color: "#166534",
    quote:
      "En menos de dos semanas ya teníamos todo funcionando. El sistema empezó a agendar turnos solo desde el primer día. No tuve que hacer nada técnico, en serio.",
    stat: "Sistema en 11 días",
    statLabel: "",
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto px-6 pb-24" style={{ maxWidth: "960px" }}>
      <FadeUp>
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="h-px w-8 bg-accent opacity-50" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-accent">
              Resultados reales
            </span>
            <span className="h-px w-8 bg-accent opacity-50" />
          </div>
          <h2 className="text-[clamp(26px,3.5vw,40px)] font-extrabold tracking-tight mb-4 leading-tight">
            Lo dicen los que ya lo usan
          </h2>
          <p className="text-text-secondary text-base max-w-md mx-auto">
            Negocios reales. Resultados verificables.
          </p>
        </div>
      </FadeUp>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {testimonials.map((t, i) => (
          <FadeUp key={t.name} delay={0.1 * (i + 1)}>
              <div
                className="relative h-full rounded-2xl p-8 flex flex-col gap-6 transition-all duration-300 hover:-translate-y-1 cursor-default group/card"
                style={{
                  background: "linear-gradient(135deg, #1a1a1e 0%, #18181b 40%, #16191f 100%)",
                  border: "1px solid rgba(34,197,94,0.3)",
                  boxShadow: "0 0 20px rgba(34,197,94,0.12), 0 4px 24px rgba(0,0,0,0.25)",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "rgba(34,197,94,0.5)";
                  el.style.boxShadow = "0 0 0 1px rgba(34,197,94,0.2), 0 20px 40px rgba(34,197,94,0.15), 0 4px 24px rgba(0,0,0,0.25)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "rgba(34,197,94,0.3)";
                  el.style.boxShadow = "0 0 20px rgba(34,197,94,0.12), 0 4px 24px rgba(0,0,0,0.25)";
                }}
              >
              {/* Top green accent line */}
              <div
                className="absolute top-0 left-6 right-6 h-[2px] rounded-full"
                style={{
                  background: `linear-gradient(to right, ${t.color}99, transparent)`,
                }}
              />

              {/* Stars */}
              <div className="flex gap-1 pt-1">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} className="w-3.5 h-3.5 fill-accent" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-[15px] text-text-secondary leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Stat pill */}
              <div
                className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full"
                style={{
                  background: "rgba(34,197,94,0.08)",
                  border: "1px solid rgba(34,197,94,0.2)",
                }}
              >
                <span className="text-[13px] font-bold text-accent">{t.stat}</span>
                <span className="text-[11px] text-text-muted">{t.statLabel}</span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-1 border-t border-border">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold text-white shrink-0"
                  style={{
                    background: `radial-gradient(circle at 35% 35%, ${t.color}cc, ${t.color}66)`,
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-text-primary leading-tight">{t.name}</p>
                  <p className="text-[11px] text-text-muted leading-tight">{t.role}</p>
                </div>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
