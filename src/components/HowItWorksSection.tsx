"use client";

import FadeUp from "./FadeUp";

const cardBg =
  "linear-gradient(135deg, #1a1a1e 0%, #18181b 40%, #16191f 100%)";

const rest = [
  {
    icon: "📅",
    title: "Agendan solos, 24/7",
    desc: "Tus clientes eligen día y hora sin llamadas ni idas y vueltas por WhatsApp.",
  },
  {
    icon: "💬",
    title: "Atiende 24/7, sin vos",
    desc: "El asistente responde consultas, gestiona urgencias y agenda a cualquier hora.",
  },
  {
    icon: "🔔",
    title: "Ausentismo a cero",
    desc: "Recordatorio automático y confirmación. El que cancela libera el horario solo.",
  },
  {
    icon: "👤",
    title: "Recupera a los que no vuelven",
    desc: "Detecta a los clientes inactivos y los contacta solo. No se pierde nadie.",
  },
];

const dashboardStats = [
  { v: "34", l: "Turnos hoy", c: "#22c55e" },
  { v: "97%", l: "Confirmados", c: "#ffffff" },
  { v: "218", l: "Pac. activos", c: "#ffffff" },
  { v: "2%", l: "Ausentismo", c: "#eab308" },
];

const dashboardBars = [
  { l: "Cardiología", pct: 87, c: "#22c55e" },
  { l: "Ginecología", pct: 73, c: "#8b5cf6" },
  { l: "Nutrición", pct: 91, c: "#eab308" },
];

export default function HowItWorksSection() {
  return (
    <section id="como-funciona" className="mx-auto px-6 pb-24" style={{ maxWidth: "1100px" }}>
      <FadeUp>
        <div className="text-center mb-12">
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

      {/* Bento grid — todo visible, sin interacción */}
      <FadeUp delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-fr">
          {/* Card estrella: Dashboard (2x2 en desktop) */}
          <div
            className="md:col-span-2 lg:row-span-2 rounded-2xl p-7 flex flex-col transition-transform duration-300 hover:-translate-y-1"
            style={{
              background: cardBg,
              border: "1px solid rgba(34,197,94,0.3)",
              boxShadow: "0 0 30px rgba(34,197,94,0.1)",
            }}
          >
            <div className="flex items-center gap-2 mb-5">
              <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
                Tu panel de control
              </span>
            </div>
            <h3 className="text-[26px] font-extrabold tracking-tight text-white leading-[1.1] mb-3">
              Tus números, en tiempo real.
            </h3>
            <p className="text-[15px] text-text-muted leading-relaxed mb-6 max-w-[440px]">
              Turnos, ausentismo, ocupación y qué especialidad rinde más — todo en un panel.
              Ves los cuellos de botella y decidís con datos, no a ojo.
            </p>

            {/* Panel completo */}
            <div className="mt-auto">
              <div className="grid grid-cols-2 gap-3 mb-5">
                {dashboardStats.map((s) => (
                  <div
                    key={s.l}
                    className="rounded-xl p-4"
                    style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <div className="text-[22px] font-extrabold leading-none" style={{ color: s.c }}>{s.v}</div>
                    <div className="text-[10px] text-text-muted uppercase tracking-wider mt-1.5">{s.l}</div>
                  </div>
                ))}
              </div>
              <div className="text-[10px] text-text-muted uppercase tracking-wider mb-2.5">
                Ocupación por especialidad
              </div>
              <div className="flex flex-col gap-2.5">
                {dashboardBars.map((b) => (
                  <div key={b.l} className="flex items-center gap-3">
                    <span className="text-[11px] text-text-muted w-[78px] shrink-0">{b.l}</span>
                    <div
                      className="flex-1 h-[6px] rounded-full overflow-hidden"
                      style={{ background: "rgba(255,255,255,0.06)" }}
                    >
                      <div className="h-full rounded-full" style={{ width: `${b.pct}%`, background: b.c }} />
                    </div>
                    <span className="text-[11px] text-text-muted w-[34px] text-right shrink-0">{b.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 4 cards restantes */}
          {rest.map((m) => (
            <div
              key={m.title}
              className="rounded-2xl p-6 flex flex-col transition-transform duration-300 hover:-translate-y-1"
              style={{
                background: cardBg,
                border: "1px solid rgba(34,197,94,0.2)",
                boxShadow: "0 0 20px rgba(34,197,94,0.06)",
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 text-[18px]"
                style={{ background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.12)" }}
              >
                {m.icon}
              </div>
              <h3 className="text-[16px] font-bold text-white mb-2 leading-snug">{m.title}</h3>
              <p className="text-[13px] text-text-muted leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </FadeUp>
    </section>
  );
}
