"use client";

import FadeUp from "./FadeUp";

const CAL_LINK = "nexoragrowth/30min";

interface Plan {
  badge: string;
  badgeStyle: React.CSSProperties;
  name: string;
  tagline: string;
  features: string[];
  btnLabel: string;
  btnStyle: "ghost" | "primary" | "violet";
  featured?: boolean;
}

const plans: Plan[] = [
  {
    badge: "Para arrancar",
    badgeStyle: { background: "rgba(107,114,128,0.1)", color: "#71717a", border: "1px solid rgba(107,114,128,0.15)" },
    name: "Essential",
    tagline: "El sistema base para operar en serio desde el día uno.",
    features: [
      "Turnero online con tu marca",
      "Recordatorios automáticos WhatsApp",
      "CRM básico de clientes",
      "Dashboard de métricas",
      "Soporte por email",
    ],
    btnLabel: "Empezar con Essential",
    btnStyle: "ghost",
  },
  {
    badge: "⭐ Más elegido",
    badgeStyle: { background: "rgba(34,197,94,0.12)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.2)" },
    name: "Full System",
    tagline: "El sistema completo para operar y atender mejor.",
    features: [
      "Todo el Essential",
      "Chatbot WhatsApp con IA",
      "Lógica de urgencias y alertas",
      "Pagos integrados (MP + transferencia)",
      "Landing page personalizada",
      "Call mensual de revisión 30 min",
      "Soporte WhatsApp directo",
    ],
    btnLabel: "Quiero el Full System →",
    btnStyle: "primary",
    featured: true,
  },
  {
    badge: "Cupos limitados",
    badgeStyle: { background: "rgba(123,97,255,0.12)", color: "#7B61FF", border: "1px solid rgba(123,97,255,0.2)" },
    name: "Growth Partner",
    tagline: "Sistema completo más motor de captación activa.",
    features: [
      "Todo el Full System",
      "Motor de captación outbound",
      "Scraping de leads por zona y nicho",
      "Mensajería IA multicanal",
      "Lead scoring automático",
      "Sesión estratégica mensual 1h",
      "Máx. 5 clientes — cupos limitados",
    ],
    btnLabel: "Ver disponibilidad",
    btnStyle: "violet",
  },
];

function PlanButton({ style, label }: { style: Plan["btnStyle"]; label: string }) {
  const base = "w-full py-4 rounded-xl font-bold text-[14px] tracking-wide cursor-pointer transition-all duration-200";

  if (style === "primary") {
    return (
      <div
        style={{
          borderRadius: "13px",
          padding: "1px",
          background:
            "linear-gradient(135deg, rgba(74,222,128,0.85) 0%, rgba(34,197,94,0.55) 50%, rgba(5,150,105,0.85) 100%)",
          boxShadow: "0 0 25px rgba(34,197,94,0.25)",
        }}
      >
        <button
          data-cal-namespace="30min"
          data-cal-link={CAL_LINK}
          data-cal-config='{"layout":"month_view"}'
          className={`${base} bg-gradient-to-r from-[#22c55e] via-[#10b981] to-[#059669] text-black`}
          style={{
            borderRadius: "12px",
            boxShadow:
              "inset 0 2px 0 rgba(255,255,255,0.15), inset 0 -2px 0 rgba(0,0,0,0.15), 0 6px 24px rgba(34,197,94,0.25)",
          }}
        >
          {label}
        </button>
      </div>
    );
  }

  if (style === "violet") {
    return (
      <button
        data-cal-namespace="30min"
        data-cal-link={CAL_LINK}
        data-cal-config='{"layout":"month_view"}'
        className={`${base} hover:opacity-90`}
        style={{
          background: "rgba(123,97,255,0.12)",
          color: "#7B61FF",
          border: "1px solid rgba(123,97,255,0.25)",
        }}
      >
        {label}
      </button>
    );
  }

  return (
    <button
      data-cal-namespace="30min"
      data-cal-link={CAL_LINK}
      data-cal-config='{"layout":"month_view"}'
      className={`${base} hover:border-accent hover:text-accent`}
      style={{
        background: "transparent",
        color: "#e4e4e7",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {label}
    </button>
  );
}

export default function PlansSection() {
  return (
    <section id="planes" className="relative py-24 px-6 overflow-hidden">
      {/* Ambient violet blob */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 800,
          height: 800,
          background: "#7B61FF",
          opacity: 0.025,
          borderRadius: "50%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          filter: "blur(110px)",
        }}
      />

      <div className="relative z-10 mx-auto" style={{ maxWidth: "1100px" }}>
        <FadeUp>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-accent opacity-50" />
              <span className="font-mono text-[11px] uppercase tracking-widest text-accent">
                Planes
              </span>
              <span className="h-px w-8 bg-accent opacity-50" />
            </div>
            <h2 className="text-[clamp(26px,3.5vw,40px)] font-extrabold tracking-tight leading-[1.08]">
              Elegí tu plan
            </h2>
            <p className="text-text-secondary text-base mt-4 max-w-md mx-auto">
              Setup único + licencia mensual. Sin contratos largos. Sin letra chica.
            </p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {plans.map((plan, i) => (
            <FadeUp key={plan.name} delay={0.1 * (i + 1)}>
              <div
                className="relative rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 flex flex-col"
                style={{
                  background: plan.featured
                    ? "linear-gradient(135deg, #1a1a1e 0%, #18181b 40%, #16191f 100%)"
                    : "linear-gradient(135deg, rgba(24,24,27,0.95) 0%, rgba(18,18,20,0.98) 100%)",
                  border: plan.featured
                    ? "1px solid rgba(34,197,94,0.35)"
                    : "1px solid rgba(255,255,255,0.06)",
                  boxShadow: plan.featured
                    ? "0 0 30px rgba(34,197,94,0.12), 0 4px 24px rgba(0,0,0,0.25)"
                    : "0 1px 3px rgba(0,0,0,0.3)",
                }}
              >
                {/* Featured gradient border effect */}
                {plan.featured && (
                  <>
                    <div
                      className="absolute -inset-[1px] rounded-2xl -z-10"
                      style={{
                        background: "linear-gradient(145deg, #22c55e, #7B61FF)",
                      }}
                    />
                    <div
                      className="absolute inset-0 rounded-2xl -z-10"
                      style={{
                        background: "linear-gradient(135deg, #1a1a1e 0%, #18181b 40%, #16191f 100%)",
                      }}
                    />
                    {/* Glow */}
                    <div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{ boxShadow: "0 0 60px rgba(34,197,94,0.06)" }}
                    />
                  </>
                )}

                {/* Badge */}
                <span
                  className="inline-block text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-5 w-fit"
                  style={plan.badgeStyle}
                >
                  {plan.badge}
                </span>

                <h3 className="text-[22px] font-extrabold text-white tracking-tight mb-2">
                  {plan.name}
                </h3>
                <p className="text-[14px] text-text-muted leading-relaxed mb-6">
                  {plan.tagline}
                </p>

                <div className="h-px mb-6" style={{ background: "rgba(255,255,255,0.06)" }} />

                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-start gap-3 text-[14px] text-text-secondary leading-snug">
                      <span className="text-accent text-[12px] font-bold mt-0.5 shrink-0">✓</span>
                      {feat}
                    </li>
                  ))}
                </ul>

                <PlanButton style={plan.btnStyle} label={plan.btnLabel} />
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.5}>
          <p className="text-center mt-6 text-[13px] text-text-muted">
            ¿Necesitás algo a medida? Tenemos modalidad custom.{" "}
            <a href="mailto:hola@nexoragrowth.es" className="text-accent hover:underline">
              Escribinos →
            </a>
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
