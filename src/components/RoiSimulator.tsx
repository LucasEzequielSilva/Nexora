"use client";

import { useState } from "react";

/* Simulador de ganancias perdidas (ROI) — COMPARTIDO entre /vsl-1 y / (general).
   La cuenta sale de los números del propio cliente → no inventamos métricas.
   Las labels vienen por prop para poder hablarle al rubro (consulta/turno, consultorio/negocio)
   sin duplicar la lógica. Defaults = versión clínica (para que /vsl-1 quede idéntica). */

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

interface RoiSimulatorProps {
  /* "Precio de una consulta" (clínica) → "Precio de turno" (general) */
  priceLabel?: string;
  /* línea roja en mayúsculas: "...tu consultorio pierde" → "...tu negocio pierde" */
  lostLabel?: string;
  turnosLabel?: string;
  ausenciasLabel?: string;
}

export default function RoiSimulator({
  priceLabel = "Precio de una consulta",
  lostLabel = "La plata que tu consultorio pierde, por mes",
  turnosLabel = "Turnos que se te escapan / semana",
  ausenciasLabel = "Ausencias / mes",
}: RoiSimulatorProps) {
  const [precio, setPrecio] = useState(40000);
  const [turnosSem, setTurnosSem] = useState(4);
  const [ausencias, setAusencias] = useState(10);
  const perdida = (turnosSem * 4 + ausencias) * precio;
  const fmt = (n: number) => "$" + n.toLocaleString("es-AR");

  return (
    <div className="max-w-3xl mx-auto mb-14 rounded-2xl p-7 md:p-9" style={{ background: "linear-gradient(135deg, #1a1a1e 0%, #16191f 100%)", border: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="flex items-center gap-2 mb-1">
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#ef4444", boxShadow: "0 0 8px rgba(239,68,68,0.6)" }} />
        <p className="text-[12px] font-bold uppercase tracking-wider" style={{ color: "#ef4444" }}>{lostLabel}</p>
      </div>
      <p className="text-[13px] text-text-muted mb-7">Movelo con tus números reales:</p>

      <div className="grid sm:grid-cols-3 gap-x-7 gap-y-6 mb-7">
        <Slider label={priceLabel} value={precio} display={fmt(precio)} min={10000} max={150000} step={5000} onChange={setPrecio} />
        <Slider label={turnosLabel} value={turnosSem} display={String(turnosSem)} min={0} max={15} step={1} onChange={setTurnosSem} />
        <Slider label={ausenciasLabel} value={ausencias} display={String(ausencias)} min={0} max={40} step={1} onChange={setAusencias} />
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
