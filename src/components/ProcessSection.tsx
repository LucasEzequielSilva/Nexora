"use client";

import FadeUp from "./FadeUp";

interface Step {
  num: string;
  title: string;
  desc: string;
  tag: string;
  tagStyle: React.CSSProperties;
  isLast?: boolean;
}

const steps: Step[] = [
  {
    num: "01",
    title: "Reunión de diagnóstico",
    desc: "30-45 min donde relevamos toda la operación del negocio.",
    tag: "Nosotros",
    tagStyle: { background: "rgba(34,197,94,0.08)", color: "#22c55e" },
  },
  {
    num: "02",
    title: "Onboarding",
    desc: "Completás la info. Por escrito, audio o WhatsApp.",
    tag: "Ustedes",
    tagStyle: { background: "rgba(234,179,8,0.08)", color: "#eab308" },
  },
  {
    num: "03",
    title: "Configuración",
    desc: "Construimos el sistema con tus datos. Sin interrupciones.",
    tag: "Nosotros",
    tagStyle: { background: "rgba(34,197,94,0.08)", color: "#22c55e" },
  },
  {
    num: "04",
    title: "Revisión conjunta",
    desc: "Probamos todo y ajustamos antes de lanzar.",
    tag: "Juntos",
    tagStyle: { background: "rgba(34,197,94,0.08)", color: "#22c55e" },
  },
  {
    num: "05",
    title: "Sistema activo",
    desc: "Los clientes ya agendan solos desde este momento.",
    tag: "🚀 Live",
    tagStyle: {
      background: "rgba(34,197,94,0.12)",
      color: "#22c55e",
      border: "1px solid rgba(34,197,94,0.2)",
    },
    isLast: true,
  },
];

export default function ProcessSection() {
  return (
    <section className="mx-auto px-6 pb-24" style={{ maxWidth: "1100px" }}>
      <FadeUp>
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="h-px w-8 bg-accent opacity-50" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-accent">
              El proceso
            </span>
            <span className="h-px w-8 bg-accent opacity-50" />
          </div>
          <h2 className="text-[clamp(26px,3.5vw,40px)] font-extrabold tracking-tight leading-[1.08]">
            De cero a sistema activo
          </h2>
          <p className="text-text-secondary text-base mt-4 max-w-lg mx-auto">
            Entre 10 y 14 días desde el onboarding. El tiempo exacto depende de la velocidad del cliente para compartir material e información.
          </p>
        </div>
      </FadeUp>

      <FadeUp delay={0.2}>
        {/* Desktop: horizontal timeline */}
        <div className="hidden md:block relative mt-16">
          {/* Connecting line */}
          <div
            className="absolute top-[34px] h-px"
            style={{
              left: "calc(10% + 16px)",
              right: "calc(10% + 16px)",
              background:
                "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.06) 15%, rgba(34,197,94,0.4) 50%, rgba(255,255,255,0.06) 85%, transparent 100%)",
            }}
          />

          <div className="grid grid-cols-5 gap-0">
            {steps.map((step) => (
              <div key={step.num} className="flex flex-col items-center text-center px-3 relative">
                {/* Circle */}
                <div
                  className="w-[68px] h-[68px] rounded-full flex items-center justify-center text-[18px] font-extrabold text-accent mb-5 z-10 relative transition-all duration-300"
                  style={{
                    background: step.isLast
                      ? "rgba(34,197,94,0.08)"
                      : "linear-gradient(135deg, #1a1a1e, #18181b)",
                    border: step.isLast
                      ? "1px solid rgba(34,197,94,0.4)"
                      : "1px solid rgba(255,255,255,0.06)",
                    boxShadow: step.isLast
                      ? "0 0 28px rgba(34,197,94,0.15)"
                      : "0 1px 3px rgba(0,0,0,0.3)",
                  }}
                >
                  {step.num}
                </div>

                <h4 className="text-[14px] font-bold text-white mb-2">{step.title}</h4>
                <p className="text-[12px] text-text-muted leading-relaxed mb-3">{step.desc}</p>
                <span
                  className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                  style={step.tagStyle}
                >
                  {step.tag}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical list */}
        <div className="md:hidden flex flex-col gap-6 mt-10">
          {steps.map((step) => (
            <div key={step.num} className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-[14px] font-extrabold text-accent shrink-0"
                style={{
                  background: step.isLast
                    ? "rgba(34,197,94,0.08)"
                    : "linear-gradient(135deg, #1a1a1e, #18181b)",
                  border: step.isLast
                    ? "1px solid rgba(34,197,94,0.4)"
                    : "1px solid rgba(255,255,255,0.06)",
                  boxShadow: step.isLast
                    ? "0 0 20px rgba(34,197,94,0.15)"
                    : "0 1px 3px rgba(0,0,0,0.3)",
                }}
              >
                {step.num}
              </div>
              <div>
                <h4 className="text-[15px] font-bold text-white mb-1">{step.title}</h4>
                <p className="text-[13px] text-text-muted leading-relaxed mb-2">{step.desc}</p>
                <span
                  className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                  style={step.tagStyle}
                >
                  {step.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </FadeUp>
    </section>
  );
}
