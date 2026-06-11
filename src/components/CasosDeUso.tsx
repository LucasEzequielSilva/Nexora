"use client";

import { useState } from "react";
import FadeUp from "./FadeUp";

/* Video real existente — placeholder hasta tener uno por caso.
   Cuando Lucas grabe cada flujo, dropear en /public/casos/<key>.mp4 */
const PLACEHOLDER = "/raquel/agenda-asiri.mp4";

type Caso = {
  key: string;
  label: string;
  desc: string;
  /* el dolor concreto que este caso le frena al consultorio (antes → ahora) */
  frena: string;
  video: string;
  Icon: () => React.ReactNode;
};

const Calendar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
    <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);
const XCircle = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
    <circle cx="12" cy="12" r="10" /><path d="m15 9-6 6M9 9l6 6" />
  </svg>
);
const Refresh = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
    <path d="M21 12a9 9 0 1 1-3-6.7L21 8" /><path d="M21 3v5h-5" />
  </svg>
);
const Bell = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);
const CheckCircle = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
    <circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" />
  </svg>
);

const casos: Caso[] = [
  {
    key: "agendamiento",
    label: "Agendamiento de turnos",
    desc: "El paciente escribe a cualquier hora, el sistema le ofrece los horarios libres y cierra el turno al instante. Aunque sean las 11 de la noche.",
    frena: "El turno que se iba porque nadie contestaba a tiempo.",
    video: "/casos/agendamiento.mp4",
    Icon: Calendar,
  },
  {
    key: "cancelaciones",
    label: "Cancelaciones",
    desc: "Si alguien cancela, el sistema libera el horario al toque y se lo ofrece al próximo paciente. La agenda no queda con huecos.",
    frena: "Las horas muertas que igual pagás.",
    video: "/casos/cancelaciones.mp4",
    Icon: XCircle,
  },
  {
    key: "reprogramacion",
    label: "Reprogramación",
    desc: "El paciente pide otro día y el sistema reacomoda la agenda solo. Tu recepción no toca nada.",
    frena: "El ida y vuelta eterno por WhatsApp para mover un turno.",
    video: "/casos/reprogramacion.mp4",
    Icon: Refresh,
  },
  {
    key: "recordatorios",
    label: "Recordatorios",
    desc: "Avisa 24h y 2h antes. El paciente confirma de un toque y la agenda se actualiza sola.",
    frena: "El ausentismo que te come la agenda mes a mes.",
    video: "/casos/recordatorios.mp4",
    Icon: Bell,
  },
  {
    key: "confirmaciones",
    label: "Confirmaciones",
    desc: "Pide confirmación y te arma el día cerrado: sabés quién viene antes de abrir el consultorio.",
    frena: "Llegar a la mañana sin saber si la agenda es real.",
    video: "/casos/confirmaciones.mp4",
    Icon: CheckCircle,
  },
];

export default function CasosDeUso() {
  const [active, setActive] = useState(0);
  const caso = casos[active];

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="relative z-10 mx-auto" style={{ maxWidth: "1080px" }}>
        <FadeUp>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-accent opacity-50" />
              <span className="font-mono text-[11px] uppercase tracking-widest text-accent">Casos de uso</span>
              <span className="h-px w-8 bg-accent opacity-50" />
            </div>
            <h2 className="text-[clamp(24px,2.6vw,30px)] font-extrabold tracking-tight mb-4 leading-tight">
              El sistema se ocupa del turno de punta a punta.
            </h2>
            <p className="text-text-secondary text-base max-w-xl mx-auto">
              Desde que el paciente escribe hasta que confirma. Tocá un caso y mirá cómo lo resuelve solo.
            </p>
          </div>
        </FadeUp>

        <div className="grid lg:grid-cols-[1fr_320px] gap-8 lg:gap-12 items-center">
          {/* Acordeón — un solo container, filas apiladas sin gap */}
          <FadeUp delay={0.1}>
            <div
              role="tablist"
              aria-label="Casos de uso"
              className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(20,21,25,0.6)", boxShadow: "0 18px 50px rgba(0,0,0,0.35)" }}
            >
              {casos.map((c, i) => {
                const on = i === active;
                return (
                  <button
                    key={c.key}
                    role="tab"
                    aria-selected={on}
                    onClick={() => setActive(i)}
                    className="group block w-full text-left px-5 py-[18px] cursor-pointer transition-colors duration-200"
                    style={{
                      background: on ? "linear-gradient(135deg, rgba(34,197,94,0.10) 0%, rgba(22,25,31,0.5) 100%)" : "transparent",
                      borderBottom: i < casos.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                      borderLeft: `2px solid ${on ? "#22c55e" : "transparent"}`,
                    }}
                  >
                    <div className="flex items-center gap-3.5">
                      <span
                        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-200"
                        style={{
                          background: on ? "rgba(34,197,94,0.14)" : "rgba(255,255,255,0.04)",
                          border: on ? "1px solid rgba(34,197,94,0.3)" : "1px solid rgba(255,255,255,0.06)",
                          color: on ? "#22c55e" : "#71717a",
                        }}
                      >
                        <c.Icon />
                      </span>
                      <span className={`flex-1 text-[15px] font-bold tracking-tight transition-colors ${on ? "text-white" : "text-text-secondary group-hover:text-white"}`}>
                        {c.label}
                      </span>
                      <span className="font-mono text-[11px] tabular-nums shrink-0 transition-colors duration-200" style={{ color: on ? "rgba(34,197,94,0.7)" : "rgba(255,255,255,0.18)" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Contenido expandible del caso activo (acordeón) */}
                    <div className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: on ? "1fr" : "0fr", opacity: on ? 1 : 0 }}>
                      <div className="overflow-hidden">
                        <p className="text-[13px] text-text-muted leading-relaxed mt-2.5 pl-[50px]">{c.desc}</p>
                        <div className="flex items-start gap-2 mt-2.5 pl-[50px]">
                          <span className="mt-[3px] w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#ef4444", boxShadow: "0 0 8px rgba(239,68,68,0.6)" }} />
                          <p className="text-[12px] leading-snug">
                            <span className="text-text-muted">Le frena: </span>
                            <span className="text-text-secondary">{c.frena}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </FadeUp>

          {/* Celular — marco premium (el video cambia con el caso activo) */}
          <FadeUp delay={0.15}>
            <div className="flex justify-center lg:justify-end">
              <div className="relative" style={{ width: 282 }}>
                <div className="absolute -inset-6 pointer-events-none rounded-[48px]" style={{ background: "radial-gradient(ellipse at 50% 38%, rgba(34,197,94,0.2) 0%, transparent 70%)", filter: "blur(8px)" }} />
                <div
                  className="relative rounded-[44px] p-[10px]"
                  style={{
                    background: "linear-gradient(155deg, #34383d 0%, #0d0f12 55%, #1a1d21 100%)",
                    boxShadow: "0 48px 96px rgba(0,0,0,0.6), 0 0 56px rgba(34,197,94,0.18), inset 0 1.5px 0 rgba(255,255,255,0.14), inset 0 0 0 1px rgba(0,0,0,0.5)",
                  }}
                >
                  <div className="relative rounded-[34px] overflow-hidden" style={{ background: "#0b141a", aspectRatio: "9 / 19.3" }}>
                    <div className="absolute top-[9px] left-1/2 -translate-x-1/2 rounded-full z-20" style={{ width: 84, height: 21, background: "#000" }} />
                    <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: "rgba(0,0,0,0.45)", border: "1px solid rgba(34,197,94,0.3)", backdropFilter: "blur(6px)" }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                      <span className="text-[9px] font-mono uppercase tracking-wider text-accent">Real</span>
                    </div>
                    <video
                      key={caso.key}
                      src={caso.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      className="block w-full h-full object-cover"
                      onError={(e) => {
                        const v = e.currentTarget;
                        if (!v.src.endsWith(PLACEHOLDER)) v.src = PLACEHOLDER;
                      }}
                    />
                  </div>
                </div>
                <p className="text-[12px] text-text-muted mt-5 text-center">
                  Grabado en el consultorio de la <span className="text-text-secondary font-semibold">Dra. Raquel</span> · <span className="text-accent font-semibold">{caso.label}</span>
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
