"use client";

import { useState } from "react";

/* Simulador de ganancias perdidas (ROI) — COMPARTIDO entre /vsl-1 y / (general).
   La cuenta sale de los números del propio cliente → no inventamos métricas.
   Las labels vienen por prop para poder hablarle al rubro (consulta/turno, consultorio/negocio)
   sin duplicar la lógica. Defaults = versión clínica (para que /vsl-1 quede idéntica).
   Sin número precargado: hasta que el visitante mueve algún control, el precio y el resultado
   quedan en guion y no se afirma ninguna pérdida. */

const PRECIO_MIN = 10000;
const PRECIO_MAX = 150000;

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
  /* línea roja en mayúsculas sobre el resultado */
  lostLabel?: string;
  turnosLabel?: string;
  ausenciasLabel?: string;
}

export default function RoiSimulator({
  priceLabel = "Precio de una consulta",
  lostLabel = "Tu cuenta, por mes",
  turnosLabel = "Turnos que se te escapan / semana",
  ausenciasLabel = "Ausencias / mes",
}: RoiSimulatorProps) {
  const [precio, setPrecio] = useState(PRECIO_MIN);
  const [turnosSem, setTurnosSem] = useState(0);
  const [ausencias, setAusencias] = useState(0);
  /* Flag interno: queda en false hasta que el visitante mueve algún control. */
  const [tocado, setTocado] = useState(false);
  const perdida = (turnosSem * 4 + ausencias) * precio;
  const hayCuenta = tocado && perdida > 0;
  const fmt = (n: number) => "$" + n.toLocaleString("es-AR");
  const mover = (set: (n: number) => void) => (n: number) => {
    setTocado(true);
    set(n);
  };

  return (
    <div className="max-w-3xl mx-auto mb-14 rounded-2xl p-7 md:p-9" style={{ background: "linear-gradient(135deg, #1a1a1e 0%, #16191f 100%)", border: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="flex items-center gap-2 mb-1">
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#ef4444", boxShadow: "0 0 8px rgba(239,68,68,0.6)" }} />
        <p className="text-[12px] font-bold uppercase tracking-wider" style={{ color: "#ef4444" }}>{lostLabel}</p>
      </div>
      <p className="text-[13px] text-text-muted mb-7">Movelo con tus números reales:</p>

      <div className="grid sm:grid-cols-3 gap-x-7 gap-y-6 mb-7">
        <Slider label={priceLabel} value={precio} display={tocado ? fmt(precio) : "—"} min={PRECIO_MIN} max={PRECIO_MAX} step={5000} onChange={mover(setPrecio)} />
        <Slider label={turnosLabel} value={turnosSem} display={String(turnosSem)} min={0} max={15} step={1} onChange={mover(setTurnosSem)} />
        <Slider label={ausenciasLabel} value={ausencias} display={String(ausencias)} min={0} max={40} step={1} onChange={mover(setAusencias)} />
      </div>

      <div className="h-px mb-6" style={{ background: "rgba(255,255,255,0.08)" }} />

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <p className="text-[13px] text-text-muted mb-1.5">Con los números que cargaste, la cuenta da:</p>
          <p
            className={`text-[clamp(32px,5.5vw,46px)] font-extrabold leading-none tabular-nums${hayCuenta ? "" : " text-text-muted"}`}
            style={hayCuenta ? { color: "#ef4444" } : undefined}
          >
            {hayCuenta ? fmt(perdida) : "—"}
          </p>
        </div>
        <p className="text-[13px] text-text-secondary max-w-[280px] sm:text-right leading-snug">
          Es una estimación con tus propios números, no una promesa de recupero. En la llamada vemos tu caso y armamos el número según tu operación.
        </p>
      </div>

      <p className="text-[12px] text-text-muted leading-snug mt-6">
        La fórmula: (turnos que se escapan por semana × 4 + ausencias del mes) × precio
      </p>
    </div>
  );
}
