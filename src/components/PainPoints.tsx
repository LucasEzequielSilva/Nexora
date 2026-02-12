"use client";

import FadeUp from "./FadeUp";

const pains = [
  {
    text: "Publicas en redes todos los dias",
    detail:
      " pero no se convierte en clientes reales. Likes no pagan las cuentas.",
  },
  {
    text: "Un mes te va bien, el siguiente silencio total.",
    detail:
      " Vivis con la incertidumbre de no saber cuantos clientes van a entrar.",
  },
  {
    text: "Te escriben por WhatsApp y no llegas a responder a tiempo.",
    detail: " Perdes ventas porque estas ocupado atendiendo.",
  },
  {
    text: "Probaste publicidad y no funciono.",
    detail:
      " Gastaste plata sin ver resultados porque no habia un sistema detras.",
  },
];

export default function PainPoints() {
  return (
    <section className="max-w-[840px] mx-auto px-6 pb-20">
      <FadeUp>
        <div className="text-center mb-10">
          <h2 className="text-[clamp(24px,3.5vw,36px)] font-extrabold tracking-tight">
            &iquest;Te suena familiar?
          </h2>
        </div>
      </FadeUp>

      <div className="grid gap-4">
        {pains.map((pain, i) => (
          <FadeUp key={i} delay={0.1 * (i + 1)}>
            <div className="flex items-start gap-4 p-6 bg-bg-card border border-border rounded-xl transition-colors duration-300 hover:border-[rgba(239,68,68,0.3)]">
              <div className="shrink-0 w-8 h-8 bg-[rgba(239,68,68,0.1)] rounded-lg flex items-center justify-center text-[#ef4444] font-bold text-base">
                &#10005;
              </div>
              <p className="text-base leading-relaxed text-text-secondary">
                <strong className="text-text-primary">{pain.text}</strong>
                {pain.detail}
              </p>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
