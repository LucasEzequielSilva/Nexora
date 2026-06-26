"use client";

import FadeUp from "./FadeUp";
import CardTexture from "./CardTexture";
import RoiSimulator from "./RoiSimulator";

const CAL_LINK = "nexoragrowth/30min";

/* NOTA NOMBRES DE PLANES:
   Estos nombres (Negocio / Negocio Pro / Multi-local) espejan el escalonamiento de la VSL
   (Consultorio → Consultorio Pro → Clínica) pero generalizados para cualquier negocio de turnos.
   Si más adelante se quiere afinar el naming para un rubro puntual, es el único lugar a tocar.
   A diferencia de la VSL: acá NO mostramos precio — el número se ve en la llamada (CTA único). */

interface Plan {
  badge: string;
  name: string;
  tagline: string;
  features: string[];
  featured?: boolean;
}

const plans: Plan[] = [
  {
    badge: "Para arrancar",
    name: "Negocio",
    tagline: "El sistema base para no perder un turno más desde el día uno.",
    features: [
      "Agenda online con tu marca",
      "Asistente de WhatsApp que agenda solo 24/7",
      "Recordatorios automáticos (24h y 2h antes)",
      "CRM de clientes",
      "Soporte por WhatsApp",
    ],
  },
  {
    badge: "⭐ Más elegido",
    name: "Negocio Pro",
    tagline: "El sistema completo: agenda, confirma, reprograma y te trae clientes.",
    features: [
      "Todo lo de Negocio",
      "Confirmación y reprogramación automática",
      "Web propia + SEO local (te encuentran en Google)",
      "Dashboard de métricas y ausencias",
      "Pagos integrados (MP + transferencia)",
      "Call mensual de revisión",
    ],
    featured: true,
  },
  {
    badge: "Cupos limitados",
    name: "Multi-local",
    tagline: "Para negocios con varios profesionales o sucursales y captación activa.",
    features: [
      "Todo lo del Pro",
      "Multi-profesional / multi-agenda",
      "Motor de captación de clientes nuevos",
      "Campañas de reactivación por WhatsApp",
      "Soporte prioritario",
      "Máx. 5 negocios por mes",
    ],
  },
];

/* CTA único en toda la página: el precio se ve en la llamada. */
function PlanButton({ featured }: { featured?: boolean }) {
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
          Agendá tu llamada
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
      Agendá tu llamada
    </button>
  );
}

export default function PlansSection() {
  return (
    <section id="planes" className="relative py-24 px-6 overflow-hidden">
      <div className="absolute pointer-events-none rounded-full" style={{ width: 800, height: 800, background: "#22c55e", opacity: 0.03, top: "50%", left: "50%", transform: "translate(-50%, -50%)", filter: "blur(120px)" }} />

      <div className="relative z-10 mx-auto" style={{ maxWidth: "1080px" }}>
        <FadeUp>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-accent opacity-50" />
              <span className="font-mono text-[11px] uppercase tracking-widest text-accent">Planes</span>
              <span className="h-px w-8 bg-accent opacity-50" />
            </div>
            <h2 className="text-[clamp(24px,2.6vw,30px)] font-extrabold tracking-tight leading-tight">
              Lo que perdés hoy pesa más que lo que cuesta el sistema.
            </h2>
            <p className="text-text-secondary text-base mt-4 max-w-md mx-auto">
              El precio te lo damos en la llamada. Antes, hacé esta cuenta con tus números:
            </p>
          </div>
        </FadeUp>

        {/* Calculador (ROI) — mismo componente que la VSL, con labels para negocio de turnos. */}
        <FadeUp delay={0.1}>
          <RoiSimulator
            priceLabel="Precio de turno"
            lostLabel="La plata que tu negocio pierde, por mes"
          />
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

                {/* En lugar del precio: el número se ve en la llamada. */}
                <div className="flex items-end gap-1 mb-3">
                  <span className="text-[20px] font-extrabold text-accent leading-none tracking-tight">Precio en la llamada</span>
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

                <PlanButton featured={plan.featured} />
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.5}>
          <p className="text-center mt-6 text-[13px] text-text-muted">
            Todos incluyen setup inicial único.{" "}
            <button data-cal-namespace="30min" data-cal-link={CAL_LINK} data-cal-config='{"layout":"month_view"}' className="text-accent hover:underline cursor-pointer">
              Agendá una llamada y vemos cuál te sirve →
            </button>
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
