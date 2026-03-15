"use client";

import FadeUp from "./FadeUp";

type Val = true | "partial" | false | "dim";

const features: { label: string; nexora: Val; agency: Val; saas: Val; diy: Val }[] = [
  { label: "Sistema instalado listo para usar",  nexora: true,  agency: false,  saas: "partial", diy: false },
  { label: "Personalizado con tu marca",          nexora: true,  agency: "partial", saas: false, diy: "partial" },
  { label: "Soporte local en español",            nexora: true,  agency: "dim",  saas: false,    diy: false },
  { label: "Chatbot IA configurado",              nexora: true,  agency: "partial", saas: false, diy: false },
  { label: "CRM + seguimiento automático",        nexora: true,  agency: false,  saas: "partial", diy: false },
  { label: "Captación de clientes nuevos",         nexora: true,  agency: "dim",  saas: false,    diy: false },
  { label: "Precio predecible mes a mes",          nexora: true,  agency: false,  saas: "dim",    diy: "partial" },
];

function Cell({ value }: { value: Val }) {
  if (value === true) {
    return (
      <div className="flex justify-center">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center"
          style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.22)" }}
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>
    );
  }
  if (value === "dim") {
    return (
      <div className="flex justify-center">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center"
          style={{ background: "rgba(161,161,170,0.06)", border: "1px solid rgba(161,161,170,0.12)" }}
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>
    );
  }
  if (value === "partial") {
    return (
      <div className="flex justify-center">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center"
          style={{ background: "rgba(234,179,8,0.07)", border: "1px solid rgba(234,179,8,0.18)" }}
        >
          <span className="text-yellow-500 text-[13px] font-bold leading-none">~</span>
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-center">
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center"
        style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.12)" }}
      >
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="rgba(239,68,68,0.55)" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </div>
    </div>
  );
}

export default function Comparison() {
  return (
    <section className="mx-auto px-6 pb-24" style={{ maxWidth: "900px" }}>
      <FadeUp>
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="h-px w-8 bg-accent opacity-50" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-accent">
              Por qué Nexora
            </span>
            <span className="h-px w-8 bg-accent opacity-50" />
          </div>
          <h2 className="text-[clamp(26px,3.5vw,40px)] font-extrabold tracking-tight mb-3">
            ¿Por qué Nexora
            <br />
            y no las alternativas?
          </h2>
        </div>
      </FadeUp>

      <FadeUp delay={0.15}>
        <div
           className="overflow-x-auto rounded-2xl"
           style={{ 
             border: "1px solid rgba(34,197,94,0.2)",
             boxShadow: "0 0 30px rgba(34,197,94,0.08)"
           }}
         >
          <table className="w-full min-w-[640px]" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                {/* Feature label col */}
                <th
                  className="text-left px-6 py-5 text-[11px] font-mono uppercase tracking-widest text-text-muted"
                  style={{ width: "40%" }}
                >
                  Característica
                </th>

                {/* Nexora — highlighted */}
                 <th
                   className="px-6 py-5"
                   style={{
                     background: "rgba(34,197,94,0.08)",
                     borderLeft: "1px solid rgba(34,197,94,0.25)",
                     borderRight: "1px solid rgba(34,197,94,0.25)",
                     boxShadow: "inset 0 0 20px rgba(34,197,94,0.06)"
                   }}
                 >
                  <div className="flex flex-col items-center gap-1.5">
                    <span
                      className="text-[10px] font-mono uppercase tracking-widest text-accent rounded-full px-2.5 py-0.5"
                      style={{
                        background: "rgba(34,197,94,0.1)",
                        border: "1px solid rgba(34,197,94,0.2)",
                      }}
                    >
                      Nosotros
                    </span>
                    <span className="text-[15px] font-bold text-white">Nexora</span>
                  </div>
                </th>

                <th className="px-4 py-5 text-center text-[13px] font-medium text-text-muted">
                  Agencia
                </th>
                <th className="px-4 py-5 text-center text-[13px] font-medium text-text-muted">
                  SaaS<br />
                  <span className="text-[11px] text-text-muted opacity-70">genérico</span>
                </th>
                <th className="px-4 py-5 text-center text-[13px] font-medium text-text-muted">
                  Por tu<br />
                  <span className="text-[11px] text-text-muted opacity-70">cuenta</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((f, i) => (
                <tr
                  key={f.label}
                  style={{
                    borderTop: "1px solid rgba(255,255,255,0.04)",
                    background: i % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent",
                  }}
                >
                  <td className="px-6 py-4 text-[14px] text-text-secondary font-medium">
                    {f.label}
                  </td>
                   <td
                     className="px-6 py-4"
                     style={{
                       background: "rgba(34,197,94,0.06)",
                       borderLeft: "1px solid rgba(34,197,94,0.15)",
                       borderRight: "1px solid rgba(34,197,94,0.15)",
                     }}
                   >
                    <Cell value={f.nexora} />
                  </td>
                  <td className="px-4 py-4"><Cell value={f.agency} /></td>
                  <td className="px-4 py-4"><Cell value={f.saas} /></td>
                  <td className="px-4 py-4"><Cell value={f.diy} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FadeUp>
    </section>
  );
}
