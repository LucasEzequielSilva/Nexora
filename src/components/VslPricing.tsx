"use client";

import { useState } from "react";
import FadeUp from "./FadeUp";
import CardTexture from "./CardTexture";

const CAL_LINK = "nexoragrowth/30min";

interface Plan {
  badge: string;
  name: string;
  price: string;
  period: string;
  tagline: string;
  features: string[];
  btnLabel: string;
  featured?: boolean;
}

/* ⚠ PRECIOS PLACEHOLDER — confirmar con Lucas (moneda + setup).
   Anclados al rango: piso 250 / target ~500 / premium como ancla alta. */
const plans: Plan[] = [
  {
    badge: "Para arrancar",
    name: "Consultorio",
    price: "USD 250",
    period: "/mes",
    tagline: "El sistema base para no perder un turno más desde el día uno.",
    features: [
      "Agenda online con tu marca",
      "Asistente de WhatsApp que agenda sola 24/7",
      "Recordatorios automáticos (24h y 2h antes)",
      "CRM de pacientes",
      "Soporte por WhatsApp",
    ],
    btnLabel: "Empezar con Consultorio",
  },
  {
    badge: "⭐ Más elegido",
    name: "Consultorio Pro",
    price: "USD 490",
    period: "/mes",
    tagline: "El sistema completo: agenda, confirma, hace triage y te trae pacientes.",
    features: [
      "Todo lo de Consultorio",
      "Triage de urgencias directo a la doctora",
      "Web propia + SEO local (te encuentran en Google)",
      "Confirmación y reprogramación automática",
      "Dashboard de métricas y ausencias",
      "Call mensual de revisión",
    ],
    btnLabel: "Quiero el Pro →",
    featured: true,
  },
  {
    badge: "Cupos limitados",
    name: "Clínica",
    price: "USD 790",
    period: "/mes",
    tagline: "Para clínicas con varios profesionales y captación activa.",
    features: [
      "Todo lo del Pro",
      "Multi-profesional / multi-agenda",
      "Motor de captación de pacientes nuevos",
      "Campañas de reactivación por WhatsApp",
      "Soporte prioritario",
      "Máx. 5 clínicas por mes",
    ],
    btnLabel: "Ver disponibilidad",
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

/* Slider de un input del simulador */
function Slider({ label, value, display, min, max, step, onChange }: { label: string; value: number; display: string; min: number; max: number; step: number; onChange: (n: number) => void }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-[13px] text-text-secondary leading-tight">{label}</span>
        <span className="text-[15px] font-extrabold text-white tabular-nums shrink-0 ml-2">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        style={{ accentColor: "#22c55e", background: "rgba(255,255,255,0.12)" }}
      />
    </div>
  );
}

/* Simulador de ganancias perdidas (ROI). La cuenta sale de los números del propio cliente
   → no inventamos métricas (regla 1). El precio queda ANTES de mostrar el plan (regla 3). */
function ROISimulator() {
  const [precio, setPrecio] = useState(40000);
  const [turnosSem, setTurnosSem] = useState(4);
  const [ausencias, setAusencias] = useState(10);
  const perdida = (turnosSem * 4 + ausencias) * precio;
  const fmt = (n: number) => "$" + n.toLocaleString("es-AR");

  return (
    <div className="max-w-3xl mx-auto mb-14 rounded-2xl p-7 md:p-9" style={{ background: "linear-gradient(135deg, #1a1a1e 0%, #16191f 100%)", border: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="flex items-center gap-2 mb-1">
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#ef4444", boxShadow: "0 0 8px rgba(239,68,68,0.6)" }} />
        <p className="text-[12px] font-bold uppercase tracking-wider" style={{ color: "#ef4444" }}>La plata que tu consultorio pierde, por mes</p>
      </div>
      <p className="text-[13px] text-text-muted mb-7">Movelo con tus números reales:</p>

      <div className="grid sm:grid-cols-3 gap-x-7 gap-y-6 mb-7">
        <Slider label="Precio de una consulta" value={precio} display={fmt(precio)} min={10000} max={150000} step={5000} onChange={setPrecio} />
        <Slider label="Turnos que se te escapan / semana" value={turnosSem} display={String(turnosSem)} min={0} max={15} step={1} onChange={setTurnosSem} />
        <Slider label="Ausencias / mes" value={ausencias} display={String(ausencias)} min={0} max={40} step={1} onChange={setAusencias} />
      </div>

      <div className="h-px mb-6" style={{ background: "rgba(255,255,255,0.08)" }} />

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <p className="text-[13px] text-text-muted mb-1.5">Estás dejando sobre la mesa, cada mes:</p>
          <p className="text-[clamp(32px,5.5vw,46px)] font-extrabold leading-none tabular-nums" style={{ color: "#ef4444" }}>{fmt(perdida)}</p>
        </div>
        <p className="text-[13px] text-text-secondary max-w-[240px] sm:text-right leading-snug">
          El sistema sale una <strong className="text-white font-semibold">fracción</strong> de eso — y se paga solo con los turnos que recuperás.
        </p>
      </div>
    </div>
  );
}

export default function VslPricing() {
  return (
    <section id="planes" className="relative py-24 px-6 overflow-hidden">
      <div className="absolute pointer-events-none rounded-full" style={{ width: 800, height: 800, background: "#22c55e", opacity: 0.03, top: "50%", left: "50%", transform: "translate(-50%, -50%)", filter: "blur(120px)" }} />

      <div className="relative z-10 mx-auto" style={{ maxWidth: "1100px" }}>
        <FadeUp>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-accent opacity-50" />
              <span className="font-mono text-[11px] uppercase tracking-widest text-accent">Inversión</span>
              <span className="h-px w-8 bg-accent opacity-50" />
            </div>
            <h2 className="text-[clamp(24px,2.6vw,30px)] font-extrabold tracking-tight leading-[1.08]">
              El precio es una fracción de lo que ya estás perdiendo.
            </h2>
            <p className="text-text-secondary text-base mt-4 max-w-md mx-auto">
              Antes de ver el número, hacé esta cuenta:
            </p>
          </div>
        </FadeUp>

        {/* Simulador de ganancias perdidas (ROI) — antes del precio (regla 3). */}
        <FadeUp delay={0.1}>
          <ROISimulator />
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
                  <span className="text-[34px] font-extrabold text-white leading-none tracking-tight">{plan.price}</span>
                  <span className="text-[14px] text-text-muted mb-1">{plan.period}</span>
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
