"use client";

import { useState } from "react";

/* Simulador de cuenta (ROI) — compartido entre /vsl-1 y / (general).
   Las labels vienen por prop para hablarle al rubro (consulta/turno, consultorio/negocio)
   sin duplicar la lógica. Defaults = versión clínica.
   Hasta que el visitante elige el precio, el monto y el resultado quedan en guion. */

const PRECIO_MIN = 10000;
const PRECIO_MAX = 150000;

/* Slider de un input del simulador */
function Slider({ label, value, display, min, max, step, onChange, valueText, onInteract }: { label: string; value: number; display: string; min: number; max: number; step: number; onChange: (n: number) => void; valueText?: string; onInteract?: () => void }) {
  return (
    <div>
      <div className="flex items-end justify-between mb-2.5 sm:min-h-[34px]">
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
        onPointerDown={onInteract}
        onKeyDown={onInteract}
        aria-label={label}
        aria-valuetext={valueText}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        style={{ accentColor: "#22c55e", background: "rgba(255,255,255,0.12)" }}
      />
    </div>
  );
}

interface RoiSimulatorProps {
  /* "Precio de una consulta" (clínica) → "Precio de turno" (general) */
  priceLabel?: string;
  /* rótulo rojo en mayúsculas, arriba del calculador */
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
  /* Queda en false hasta que el visitante elige el precio. */
  const [precioElegido, setPrecioElegido] = useState(false);
  const perdida = (turnosSem * 4 + ausencias) * precio;
  const hayCuenta = precioElegido && perdida > 0;
  const fmt = (n: number) => "$" + n.toLocaleString("es-AR");

  return (
    <div className="max-w-3xl mx-auto mb-14 rounded-2xl p-7 md:p-9" style={{ background: "linear-gradient(135deg, #1a1a1e 0%, #16191f 100%)", border: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="flex items-center gap-2 mb-1">
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#ef4444", boxShadow: "0 0 8px rgba(239,68,68,0.6)" }} />
        <p className="text-[12px] font-bold uppercase tracking-wider" style={{ color: "#ef4444" }}>{lostLabel}</p>
      </div>
      <p className="text-[13px] text-text-secondary mb-7">Movelo con tus números reales:</p>

      <div className="grid sm:grid-cols-3 gap-x-7 gap-y-6 mb-7">
        <Slider
          label={priceLabel}
          value={precio}
          display={precioElegido ? fmt(precio) : "—"}
          valueText={precioElegido ? undefined : "sin elegir"}
          min={PRECIO_MIN}
          max={PRECIO_MAX}
          step={5000}
          onInteract={() => setPrecioElegido(true)}
          onChange={(n) => {
            setPrecioElegido(true);
            setPrecio(n);
          }}
        />
        <Slider label={turnosLabel} value={turnosSem} display={String(turnosSem)} min={0} max={15} step={1} onChange={setTurnosSem} />
        <Slider label={ausenciasLabel} value={ausencias} display={String(ausencias)} min={0} max={40} step={1} onChange={setAusencias} />
      </div>

      <div className="h-px mb-6" style={{ background: "rgba(255,255,255,0.08)" }} />

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <p className="text-[13px] text-text-secondary mb-1.5">
            {hayCuenta
              ? "Con los números que cargaste, la cuenta da:"
              : precioElegido
                ? "Sumá turnos que se te escapan o ausencias para ver tu cuenta:"
                : turnosSem > 0 || ausencias > 0
                  ? "Elegí el precio para ver tu cuenta:"
                  : "Movés los controles y acá aparece tu cuenta:"}
          </p>
          <p
            className={`text-[clamp(32px,5.5vw,46px)] font-extrabold leading-none tabular-nums${hayCuenta ? "" : " text-text-muted"}`}
            style={hayCuenta ? { color: "#ef4444" } : undefined}
          >
            {hayCuenta ? fmt(perdida) : "—"}
          </p>
        </div>
        <p className="text-[13px] text-text-secondary max-w-[280px] sm:text-right leading-snug">
          Es una estimación, no una promesa de recupero. En la llamada vemos tu caso y armamos el número según tu operación.
        </p>
      </div>

      <p className="text-[12px] text-text-secondary leading-snug mt-6">
        La fórmula: (turnos que se escapan por semana × 4 + ausencias del mes) × precio
      </p>
    </div>
  );
}
