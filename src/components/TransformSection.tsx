"use client";

import FadeUp from "./FadeUp";

const rows = [
  { before: "Turnos por WhatsApp manual", after: "Clientes agendan solos 24/7" },
  { before: "Ausentismos sin aviso", after: "Recordatorio automático — ausentismo a cero" },
  { before: "Clientes perdidos sin seguimiento", after: "El sistema los contacta solo" },
  { before: "Invisible en Google", after: "Web propia + SEO local activo" },
  { before: "Dependés del boca en boca", after: "Motor de captación activo en tu zona" },
];

export default function TransformSection() {
  return (
    <section className="mx-auto px-6 pb-24" style={{ maxWidth: "860px" }}>
      <FadeUp>
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="h-px w-8 bg-accent opacity-50" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-accent">
              La transformación
            </span>
            <span className="h-px w-8 bg-accent opacity-50" />
          </div>
          <h2 className="text-[clamp(26px,3.5vw,40px)] font-extrabold tracking-tight leading-[1.08]">
            Lo que cambia cuando
            <br />
            instalamos Nexora
          </h2>
        </div>
      </FadeUp>

      <FadeUp delay={0.15}>
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            border: "1px solid rgba(34,197,94,0.2)",
            boxShadow: "0 0 30px rgba(34,197,94,0.08)",
          }}
        >
          {/* Header */}
          <div
            className="grid items-center px-6 py-4"
            style={{
              gridTemplateColumns: "1fr 48px 1fr",
              background: "rgba(34,197,94,0.04)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted text-right pr-4">
              Antes
            </span>
            <div />
            <span className="text-[10px] font-mono uppercase tracking-widest text-accent pl-4">
              Después
            </span>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div
              key={i}
              className="grid items-center px-6"
              style={{
                gridTemplateColumns: "1fr 48px 1fr",
                borderBottom:
                  i < rows.length - 1
                    ? "1px solid rgba(255,255,255,0.04)"
                    : "none",
              }}
            >
              {/* Before */}
              <div className="flex items-center justify-end gap-3 py-5 pr-4">
                <span className="text-[14px] text-text-muted leading-snug text-right">
                  {row.before}
                </span>
                <span className="text-[13px] font-bold shrink-0" style={{ color: "#ef4444" }}>
                  ×
                </span>
              </div>

              {/* Center dot + line */}
              <div className="relative flex items-center justify-center h-full">
                <div
                  className="absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent, rgba(34,197,94,0.3), transparent)",
                  }}
                />
                <div
                  className="relative z-10 w-[10px] h-[10px] rounded-full"
                  style={{
                    background: "#22c55e",
                    boxShadow: "0 0 14px rgba(34,197,94,0.7)",
                  }}
                />
              </div>

              {/* After */}
              <div className="flex items-center gap-3 py-5 pl-4">
                <span className="text-accent text-[13px] font-bold shrink-0">✓</span>
                <span className="text-[14px] text-text-primary font-medium leading-snug">
                  {row.after}
                </span>
              </div>
            </div>
          ))}
        </div>
      </FadeUp>
    </section>
  );
}
