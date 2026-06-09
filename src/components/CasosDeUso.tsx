"use client";

import { useState } from "react";
import FadeUp from "./FadeUp";

/* Video real existente — placeholder hasta tener uno por caso.
   Cuando Lucas grabe cada flujo, dropear en /public/casos/<key>.mp4 */
const PLACEHOLDER = "/raquel/agenda-asiri.mp4";

type Caso = { key: string; label: string; desc: string; video: string; Icon: () => React.ReactNode };

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
  { key: "agendamiento", label: "Agendamiento de turnos", desc: "El paciente escribe, Asiri ofrece los horarios libres y agenda al instante — 24/7, aunque sea de madrugada.", video: "/casos/agendamiento.mp4", Icon: Calendar },
  { key: "cancelaciones", label: "Cancelaciones", desc: "Si un paciente cancela, Asiri libera el turno solo y lo ofrece a quien estaba esperando. Cero huecos.", video: "/casos/cancelaciones.mp4", Icon: XCircle },
  { key: "reprogramacion", label: "Reprogramación", desc: "Mueve el turno a otro día y horario sin que tu recepción toque nada. El paciente elige, Asiri reacomoda.", video: "/casos/reprogramacion.mp4", Icon: Refresh },
  { key: "recordatorios", label: "Recordatorios", desc: "Avisa 24h y 2h antes para que nadie se olvide. Menos ausencias, agenda que rinde.", video: "/casos/recordatorios.mp4", Icon: Bell },
  { key: "confirmaciones", label: "Confirmaciones", desc: "Pide confirmación y actualiza la agenda según la respuesta. Sabés con anticipación quién viene.", video: "/casos/confirmaciones.mp4", Icon: CheckCircle },
];

export default function CasosDeUso() {
  const [active, setActive] = useState(0);
  const caso = casos[active];

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="relative z-10 mx-auto" style={{ maxWidth: "1060px" }}>
        <FadeUp>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-accent opacity-50" />
              <span className="font-mono text-[11px] uppercase tracking-widest text-accent">Casos de uso</span>
              <span className="h-px w-8 bg-accent opacity-50" />
            </div>
            <h2 className="text-[clamp(26px,3.5vw,40px)] font-extrabold tracking-tight mb-4 leading-tight">
              Asiri maneja el turno de punta a punta.
            </h2>
            <p className="text-text-secondary text-base max-w-xl mx-auto">
              Desde que el paciente escribe hasta que confirma. Elegí un caso y mirá cómo lo resuelve sola.
            </p>
          </div>
        </FadeUp>

        <div className="grid lg:grid-cols-[1fr_320px] gap-8 lg:gap-12 items-center">
          {/* Tabs */}
          <FadeUp delay={0.1}>
            <div className="flex flex-col gap-2.5">
              {casos.map((c, i) => {
                const on = i === active;
                return (
                  <button
                    key={c.key}
                    onClick={() => setActive(i)}
                    className="group text-left rounded-2xl px-5 py-4 transition-all duration-200 cursor-pointer"
                    style={{
                      background: on ? "linear-gradient(135deg, rgba(34,197,94,0.10) 0%, rgba(22,25,31,0.9) 100%)" : "rgba(24,24,27,0.5)",
                      border: on ? "1px solid rgba(34,197,94,0.35)" : "1px solid rgba(255,255,255,0.06)",
                      boxShadow: on ? "0 0 24px rgba(34,197,94,0.08)" : "none",
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
                      <span className={`text-[15px] font-bold tracking-tight ${on ? "text-white" : "text-text-secondary group-hover:text-white"}`}>
                        {c.label}
                      </span>
                    </div>
                    {on && (
                      <p className="text-[13px] text-text-muted leading-relaxed mt-2.5 pl-[50px]">
                        {caso.desc}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </FadeUp>

          {/* Celular */}
          <FadeUp delay={0.15}>
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-5 pointer-events-none rounded-[40px]" style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(34,197,94,0.18) 0%, transparent 70%)" }} />
                <div
                  className="relative rounded-[30px] overflow-hidden mx-auto"
                  style={{
                    width: "270px",
                    border: "1px solid rgba(34,197,94,0.25)",
                    boxShadow: "0 0 36px rgba(34,197,94,0.12), 0 24px 60px rgba(0,0,0,0.55)",
                    background: "#0e1014",
                  }}
                >
                  <video
                    key={caso.key}
                    src={caso.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="block w-full"
                    onError={(e) => {
                      const v = e.currentTarget;
                      if (!v.src.endsWith(PLACEHOLDER)) v.src = PLACEHOLDER;
                    }}
                  />
                </div>
                <p className="text-[12px] text-text-muted mt-4 text-center">
                  Video real · <span className="text-accent font-semibold">{caso.label}</span>
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
