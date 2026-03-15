"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FadeUp from "./FadeUp";

interface TabData {
  label: string;
  num: string;
  title: string;
  desc: string;
  features: string[];
  visuals: VisRow[];
  note?: { text: string; variant?: "default" | "warn" };
  extraVisual?: React.ReactNode;
}

interface VisRow {
  icon: string;
  title: string;
  sub: string;
  pill?: string;
  pillVariant?: "default" | "warn" | "gold";
  accent?: boolean;
  dim?: boolean;
  iconStyle?: React.CSSProperties;
}

const tabs: TabData[] = [
  {
    label: "Turnero online",
    num: "Módulo 01",
    title: "Tus clientes agendan solos, 24/7.",
    desc: "Sin llamadas, sin WhatsApp de ida y vuelta. El sistema gestiona disponibilidad en tiempo real por especialidad y profesional.",
    features: [
      "Agenda por especialidad y profesional con cupos automáticos",
      "Confirmación instantánea al paciente al momento de reservar",
      "Integración con el sistema de agenda actual del negocio",
      "Funciona aunque recepción esté cerrada",
    ],
    visuals: [
      { icon: "📅", title: "Nuevo turno — Cardiología", sub: "Lucía M. · Martes 16:00", pill: "Automático", accent: true },
      { icon: "📅", title: "Nuevo turno — Ginecología", sub: "Carmen R. · Miércoles 11:30", pill: "Automático", accent: true },
      { icon: "📅", title: "Horario libre — Nutrición", sub: "Jueves 17:00 · Disponible", dim: true },
    ],
    note: { text: "3 turnos agendados hoy sin intervención del equipo" },
  },
  {
    label: "Chatbot WhatsApp",
    num: "Módulo 02",
    title: "El asistente que nunca duerme.",
    desc: "Atiende en el WhatsApp del negocio cuando recepción no está. Responde consultas, gestiona urgencias y agenda turnos a cualquier hora.",
    features: [
      "FAQs automáticas: obras sociales, precios, horarios, ubicación",
      "Protocolo de urgencias con alerta inmediata al profesional",
      "Tono y personalidad configurados para sonar como el negocio",
      "Derivación inteligente: lo complejo pasa a recepción",
    ],
    visuals: [
      { icon: "💬", title: "Paciente: \"¿Trabajan con IOMA?\"", sub: "22:14 · Fuera de horario", dim: true },
      { icon: "🤖", title: "Bot: \"Sí, trabajamos con IOMA y PAMI. ¿Agendamos?\"", sub: "22:14 · Respuesta instantánea", pill: "IA", accent: true },
      { icon: "💬", title: "Paciente: \"Sí, para Cardiología\"", sub: "22:15", dim: true },
      { icon: "🤖", title: "Bot muestra horarios y confirma el turno", sub: "22:15 · Sin intervención humana", pill: "IA", accent: true },
    ],
  },
  {
    label: "Recordatorios",
    num: "Módulo 03",
    title: "Ausentismo a cero.",
    desc: "Recordatorio automático por WhatsApp antes de cada turno. El paciente confirma con un mensaje. Si cancela, el horario se libera solo.",
    features: [
      "Recordatorio 24hs antes con todos los datos del turno",
      "Recordatorio 2hs antes con confirmación de un mensaje",
      "Cancelación con reasignación automática del horario",
      "Recordatorio de control para pacientes que deben volver",
    ],
    visuals: [
      { icon: "🔔", title: "Recordatorio enviado — Ana G.", sub: "Turno mañana 10:00 · Dra. Rodríguez", pill: "24hs antes", accent: true },
      { icon: "✅", title: "Ana G. confirmó su turno", sub: "\"Confirmo, gracias!\" · 23:41", pill: "Confirmado", accent: true },
      { icon: "❌", title: "Roberto M. canceló — horario liberado", sub: "10:00 disponible para nuevo turno", pill: "Libre", pillVariant: "warn", iconStyle: { background: "rgba(239,68,68,0.08)", borderColor: "rgba(239,68,68,0.15)" } },
    ],
    note: { text: "Ausentismo: 2.1% — era 18% antes del sistema" },
  },
  {
    label: "CRM",
    num: "Módulo 04",
    title: "El sistema sabe quién falta.",
    desc: "Historial completo de cada paciente: visitas, especialidad, pagos. Detecta automáticamente quiénes no volvieron y los contacta solo.",
    features: [
      "Historial por paciente: visitas, especialidad, última consulta",
      "Alerta de pacientes inactivos sin turno en X días",
      "Segmentación por especialidad para seguimiento dirigido",
      "Base de pacientes siempre actualizada, sin duplicados",
    ],
    visuals: [
      { icon: "👤", title: "Lucía Martínez — Cardiología", sub: "Última visita: hace 68 días", pill: "Inactiva", pillVariant: "warn", accent: true },
      { icon: "👤", title: "Jorge Peralta — Ginecología", sub: "Próximo turno: 18 mar", pill: "Activo", accent: true },
      { icon: "👤", title: "Ana Gómez — Nutrición", sub: "Control pendiente", pill: "Seguimiento", pillVariant: "gold", accent: true },
    ],
    note: { text: "14 pacientes inactivos → el sistema los contacta solo", variant: "warn" },
  },
  {
    label: "Dashboard",
    num: "Módulo 05",
    title: "Los números del negocio, en tiempo real.",
    desc: "Un panel donde la dirección ve cuántos turnos se dieron, qué especialidad tiene más demanda y cuántos pacientes no volvieron.",
    features: [
      "Turnos por día, semana y mes por especialidad",
      "Tasa de ausentismo y confirmación por profesional",
      "Pacientes inactivos sin turno en más de 60 días",
      "Ocupación por horario: qué turnos están saturados o vacíos",
    ],
    visuals: [
      { icon: "📈", title: "Especialidad más demandada", sub: "Cardiología — 89 turnos · ↑ 23%", pill: "Este mes", accent: true },
    ],
    extraVisual: (
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div
          className="rounded-xl p-4"
          style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="text-[26px] font-extrabold text-accent leading-none">347</div>
          <div className="text-[10px] text-text-muted uppercase tracking-wider mt-2">Turnos este mes</div>
        </div>
        <div
          className="rounded-xl p-4"
          style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="text-[26px] font-extrabold text-white leading-none">97.9%</div>
          <div className="text-[10px] text-text-muted uppercase tracking-wider mt-2">Tasa confirmación</div>
        </div>
      </div>
    ),
    note: { text: "Dashboard actualizado en tiempo real — sin exportar nada" },
  },
];

function PillBadge({ text, variant = "default" }: { text: string; variant?: "default" | "warn" | "gold" }) {
  const styles: Record<string, React.CSSProperties> = {
    default: { background: "rgba(34,197,94,0.12)", color: "#22c55e" },
    warn: { background: "rgba(239,68,68,0.12)", color: "#ef4444" },
    gold: { background: "rgba(234,179,8,0.1)", color: "#eab308" },
  };
  return (
    <span
      className="text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap shrink-0"
      style={styles[variant]}
    >
      {text}
    </span>
  );
}

export default function HowItWorksSection() {
  const [active, setActive] = useState(0);

  return (
    <section id="como-funciona" className="mx-auto px-6 pb-24" style={{ maxWidth: "1100px" }}>
      <FadeUp>
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="h-px w-8 bg-accent opacity-50" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-accent">
              Cómo funciona
            </span>
            <span className="h-px w-8 bg-accent opacity-50" />
          </div>
          <h2 className="text-[clamp(26px,3.5vw,40px)] font-extrabold tracking-tight leading-[1.08]">
            5 módulos. Un sistema.
            <br />
            Todo conectado.
          </h2>
        </div>
      </FadeUp>

      {/* Tabs */}
      <FadeUp delay={0.1}>
        <div
          className="flex gap-0 overflow-x-auto mb-10"
          style={{
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            scrollbarWidth: "none",
          }}
        >
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="px-6 py-4 text-[13.5px] font-medium whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0"
              style={{
                color: active === i ? "#22c55e" : "#71717a",
                fontWeight: active === i ? 600 : 500,
                borderBottom: active === i
                  ? "2px solid #22c55e"
                  : "2px solid transparent",
                marginBottom: "-1px",
                background: "transparent",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </FadeUp>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start"
        >
          {/* Left: text */}
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-accent mb-3">
              {tabs[active].num}
            </div>
            <h3 className="text-[28px] font-extrabold tracking-tight text-white mb-5 leading-[1.1]">
              {tabs[active].title}
            </h3>
            <p className="text-[15px] text-text-muted leading-relaxed mb-8">
              {tabs[active].desc}
            </p>
            <ul className="flex flex-col gap-3">
              {tabs[active].features.map((feat, i) => (
                <li key={i} className="flex items-start gap-3 text-[14px] text-text-secondary leading-snug">
                  <span
                    className="w-[6px] h-[6px] rounded-full shrink-0 mt-2"
                    style={{ background: "#22c55e" }}
                  />
                  {feat}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: visual mockup */}
          <div
            className="rounded-2xl p-6 flex flex-col gap-3"
            style={{
              background: "linear-gradient(135deg, #1a1a1e 0%, #18181b 40%, #16191f 100%)",
              border: "1px solid rgba(34,197,94,0.2)",
              boxShadow: "0 0 20px rgba(34,197,94,0.08)",
            }}
          >
            {tabs[active].extraVisual}

            {tabs[active].visuals.map((vis, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl px-4 py-3"
                style={{
                  background: vis.accent
                    ? "rgba(34,197,94,0.04)"
                    : "rgba(0,0,0,0.3)",
                  border: vis.accent
                    ? "1px solid rgba(34,197,94,0.15)"
                    : "1px solid transparent",
                  opacity: vis.dim ? 0.45 : 1,
                }}
              >
                <div
                  className="w-[34px] h-[34px] rounded-lg flex items-center justify-center shrink-0 text-[15px]"
                  style={
                    vis.iconStyle || {
                      background: vis.dim
                        ? "rgba(255,255,255,0.04)"
                        : "rgba(34,197,94,0.1)",
                      border: vis.dim
                        ? "1px solid rgba(255,255,255,0.06)"
                        : "1px solid rgba(34,197,94,0.18)",
                    }
                  }
                >
                  {vis.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-semibold text-white truncate">
                    {vis.title}
                  </div>
                  <div className="text-[11px] text-text-muted mt-0.5">{vis.sub}</div>
                </div>
                {vis.pill && (
                  <PillBadge text={vis.pill} variant={vis.pillVariant} />
                )}
              </div>
            ))}

            {tabs[active].note && (
              <div
                className="px-4 py-3 rounded-lg text-[11.5px] mt-1"
                style={{
                  background:
                    tabs[active].note!.variant === "warn"
                      ? "rgba(239,68,68,0.04)"
                      : "rgba(34,197,94,0.05)",
                  border:
                    tabs[active].note!.variant === "warn"
                      ? "1px solid rgba(239,68,68,0.15)"
                      : "1px solid rgba(34,197,94,0.12)",
                  color:
                    tabs[active].note!.variant === "warn"
                      ? "#ef4444"
                      : "#22c55e",
                }}
              >
                {tabs[active].note!.text}
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
