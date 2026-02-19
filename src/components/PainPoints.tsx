"use client";

import FadeUp from "./FadeUp";

const pains = [
  {
    text: "Publicás contenido todos los días...",
    detail:
      " y el 97% de tus seguidores jamás te compra. Los likes no pagan las cuentas.",
  },
  {
    text: "Un mes lleno, el siguiente en silencio.",
    detail:
      " La inconsistencia te impide crecer. Sin sistema, no hay previsibilidad.",
  },
  {
    text: "Perdiste ventas por no responder a tiempo.",
    detail: " El que responde primero, vende. El resto pierde el cliente.",
  },
  {
    text: "Probaste publicidad y quemaste plata.",
    detail:
      " Sin un sistema detrás que filtre y cierre, los ads son un pozo sin fondo.",
  },
];

export default function PainPoints() {
  return (
    <section className="max-w-[840px] mx-auto px-6 pb-20">
      <FadeUp>
        <div className="text-center mb-10">
          <h2 className="text-[clamp(24px,3.5vw,36px)] font-extrabold tracking-tight">
            &iquest;Cuanta facturacion perdiste por esto?
          </h2>
          <p className="text-text-secondary text-base mt-3">
            Si alguno de estos te suena, el problema no sos vos &mdash; es el sistema que usas.
          </p>
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
