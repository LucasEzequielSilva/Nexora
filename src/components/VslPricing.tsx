"use client";

import FadeUp from "./FadeUp";
import CardTexture from "./CardTexture";
import RoiSimulator from "./RoiSimulator";

const CAL_LINK = "nexoragrowth/30min";

interface Plan {
  badge: string;
  name: string;
  price: string;
  tagline: string;
  features: string[];
  btnLabel: string;
  featured?: boolean;
}

/* Sin precio: el número se ve en la llamada. */
const plans: Plan[] = [
  {
    badge: "Para arrancar",
    name: "Consultorio",
    price: "Precio en la llamada",
    tagline: "El sistema base para no perder un turno más desde el día uno.",
    features: [
      "Agenda online con tu marca",
      "Asistente de WhatsApp que agenda sola 24/7",
      "Recordatorios antes de cada turno",
      "CRM de pacientes",
      "Soporte por WhatsApp",
    ],
    btnLabel: "Agendá tu llamada",
  },
  {
    badge: "Sistema completo",
    name: "Consultorio Pro",
    price: "Precio en la llamada",
    tagline: "El sistema completo: agenda, confirma y te pasa lo urgente a vos.",
    features: [
      "Todo lo de Consultorio",
      "Si algo es urgente o clínico, el sistema no opina: te lo pasa a vos",
      "Web propia con tu marca",
      "Confirmación y reprogramación automática",
      "Una pantalla donde ves qué turnos hay y cuántas ausencias tenés",
      "Una llamada mensual de revisión",
    ],
    btnLabel: "Agendá tu llamada",
    featured: true,
  },
  {
    badge: "Varios profesionales",
    name: "Clínica",
    price: "Precio en la llamada",
    tagline: "Para clínicas con varios profesionales y captación activa.",
    features: [
      "Todo lo del Pro",
      "Multi-profesional / multi-agenda",
      "Motor de captación de pacientes nuevos",
      "Campañas de reactivación por WhatsApp",
      "Soporte prioritario",
    ],
    btnLabel: "Agendá tu llamada",
  },
];

function PlanButton({ label, featured }: { label: string; featured?: boolean }) {
  const base = "w-full py-4 rounded-xl font-bold text-[14px] tracking-wide cursor-pointer transition-all duration-200";
  if (featured) {
    return (
      <div style={{ borderRadius: "13px", padding: "1px", background: "linear-gradient(135deg, rgba(74,222,128,0.85) 0%, rgba(34,197,94,0.55) 50%, rgba(5,150,105,0.85) 100%)", boxShadow: "0 0 25px rgba(34,197,94,0.25)" }}>
        <button
          data-cal-namespace="30min"
          data-cal-link={CAL_LINK}
          data-cal-config='{"layout":"month_view"}'
          className={`${base} bg-gradient-to-r from-[#22c55e] via-[#10b981] to-[#059669] text-black`}
          style={{ borderRadius: "12px", boxShadow: "inset 0 2px 0 rgba(255,255,255,0.15), inset 0 -2px 0 rgba(0,0,0,0.15), 0 6px 24px rgba(34,197,94,0.25)" }}
        >
          {label}
        </button>
      </div>
    );
  }
  return (
    <button
      data-cal-namespace="30min"
      data-cal-link={CAL_LINK}
      data-cal-config='{"layout":"month_view"}'
      className={`${base} hover:border-accent hover:text-accent`}
      style={{ background: "transparent", color: "#e4e4e7", border: "1px solid rgba(255,255,255,0.1)" }}
    >
      {label}
    </button>
  );
}

export default function VslPricing() {
  return (
    <section id="planes" className="relative py-24 px-6 overflow-hidden">
      <div className="absolute pointer-events-none rounded-full" style={{ width: 800, height: 800, background: "#22c55e", opacity: 0.03, top: "50%", left: "50%", transform: "translate(-50%, -50%)", filter: "blur(120px)" }} />

      <div className="relative z-10 mx-auto" style={{ maxWidth: "1080px" }}>
        <FadeUp>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-accent opacity-50" />
              <span className="font-mono text-[11px] uppercase tracking-widest text-accent">El sistema</span>
              <span className="h-px w-8 bg-accent opacity-50" />
            </div>
            <h2 className="text-[clamp(24px,2.6vw,30px)] font-extrabold tracking-tight leading-tight">
              Hacé la cuenta con tus números.
            </h2>
            <p className="text-text-secondary text-base mt-4 max-w-md mx-auto">
              No hay precio de lista: depende del tamaño de tu operación. Lo vemos en la llamada.
            </p>
          </div>
        </FadeUp>

        {/* Calculador con los números del propio visitante.
            Componente compartido con la general; acá usa los defaults (labels clínicas). */}
        <FadeUp delay={0.1}>
          <RoiSimulator />
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {plans.map((plan, i) => (
            <FadeUp key={plan.name} delay={0.1 * (i + 1)}>
              <div
                className="relative isolate rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 flex flex-col"
                style={{
                  background: plan.featured
                    ? "linear-gradient(135deg, #1a1a1e 0%, #18181b 40%, #16191f 100%)"
                    : "linear-gradient(135deg, rgba(24,24,27,0.95) 0%, rgba(18,18,20,0.98) 100%)",
                  border: plan.featured ? "1px solid rgba(34,197,94,0.35)" : "1px solid rgba(255,255,255,0.06)",
                  boxShadow: plan.featured ? "0 0 30px rgba(34,197,94,0.12), 0 4px 24px rgba(0,0,0,0.25)" : "0 1px 3px rgba(0,0,0,0.3)",
                }}
              >
                {plan.featured && <CardTexture accent />}
                {plan.featured && (
                  <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ boxShadow: "0 0 60px rgba(34,197,94,0.06)" }} />
                )}

                <span
                  className="inline-block text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-5 w-fit"
                  style={plan.featured
                    ? { background: "rgba(34,197,94,0.12)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.2)" }
                    : { background: "rgba(107,114,128,0.1)", color: "#71717a", border: "1px solid rgba(107,114,128,0.15)" }}
                >
                  {plan.badge}
                </span>

                <h3 className="text-[22px] font-extrabold text-white tracking-tight mb-2">{plan.name}</h3>

                <div className="flex items-end gap-1 mb-3">
                  <span className="text-[20px] font-extrabold text-accent leading-none tracking-tight">{plan.price}</span>
                </div>

                <p className="text-[14px] text-text-muted leading-relaxed mb-6">{plan.tagline}</p>

                <div className="h-px mb-6" style={{ background: "rgba(255,255,255,0.06)" }} />

                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-start gap-3 text-[14px] text-text-secondary leading-snug">
                      <span className="text-accent text-[12px] font-bold mt-0.5 shrink-0">✓</span>
                      {feat}
                    </li>
                  ))}
                </ul>

                <PlanButton label={plan.btnLabel} featured={plan.featured} />
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.5}>
          <p className="text-center mt-6 text-[13px] text-text-muted">
            <button data-cal-namespace="30min" data-cal-link={CAL_LINK} data-cal-config='{"layout":"month_view"}' className="text-accent hover:underline cursor-pointer">
              Agendá una llamada y vemos qué necesita tu negocio →
            </button>
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
