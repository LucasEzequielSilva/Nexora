"use client";

import FadeUp from "./FadeUp";

/* Prueba honesta — NO "casos de éxito" inflados. Un solo cliente real, andando.
   La transparencia genera más confianza que el humo. Cierra con el framing productizado. */
export default function ComoLoAplicamos() {
  const corre = [
    "Agenda los turnos sola por WhatsApp, 24/7 — también fuera de hora.",
    "Recuerda y confirma cada turno: bajan las ausencias.",
    "La encuentran en Google — web propia con SEO local.",
  ];

  return (
    <section id="caso" className="mx-auto px-6 pb-24" style={{ maxWidth: "1000px" }}>
      <FadeUp>
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="h-px w-8 bg-accent opacity-50" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-accent">Cómo lo estamos aplicando</span>
            <span className="h-px w-8 bg-accent opacity-50" />
          </div>
          <h2 className="text-[clamp(24px,2.6vw,30px)] font-extrabold tracking-tight mb-4 leading-tight">
            Hoy ya está andando en un consultorio real.
          </h2>
          <p className="text-text-secondary text-base max-w-xl mx-auto">
            No te vamos a inflar con cien casos. Tenemos uno, andando y productivo: la <strong className="text-white font-semibold">Dra. Raquel Rodríguez</strong> — ortodoncia en Jujuy. Esto es lo que su consultorio tiene funcionando hoy.
          </p>
        </div>
      </FadeUp>

      <FadeUp delay={0.1}>
        <div
          className="grid md:grid-cols-[260px_1fr] gap-7 md:gap-9 items-center rounded-2xl p-6 md:p-8"
          style={{ background: "linear-gradient(135deg, #1a1a1e 0%, #16191f 100%)", border: "1px solid rgba(34,197,94,0.2)", boxShadow: "0 0 24px rgba(34,197,94,0.06)" }}
        >
          {/* foto real de la Dra. Raquel */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/raquel/raquel.png"
            alt="Dra. Raquel Rodríguez en su consultorio"
            className="rounded-[22px] mx-auto w-full max-w-[240px] block"
            style={{ border: "1px solid rgba(34,197,94,0.25)", boxShadow: "0 18px 50px rgba(0,0,0,0.5)" }}
          />

          {/* qué corre + link */}
          <div>
            <div className="mb-5">
              <p className="text-[18px] font-bold text-white leading-tight">Dra. Raquel Rodríguez</p>
              <p className="text-[12.5px] text-text-muted leading-tight mt-1">Ortodoncia · San Salvador de Jujuy</p>
            </div>
            <ul className="flex flex-col gap-3 mb-6">
              {corre.map((t) => (
                <li key={t} className="flex items-start gap-2.5">
                  <span className="text-accent mt-0.5 shrink-0">✓</span>
                  <span className="text-[14px] text-text-secondary leading-snug">{t}</span>
                </li>
              ))}
            </ul>
            <a
              href="https://raquelrodriguez.com.ar/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent hover:underline"
            >
              Ver su web andando · raquelrodriguez.com.ar →
            </a>
          </div>
        </div>
      </FadeUp>

      {/* framing productizado — el sistema ya existe, se adapta */}
      <FadeUp delay={0.15}>
        <p className="text-center text-[15px] text-text-secondary max-w-2xl mx-auto mt-8 leading-relaxed">
          El sistema <strong className="text-white font-semibold">ya está desarrollado y andando</strong> — no se construye de cero. Lo adaptamos a tu consultorio en <strong className="text-white font-semibold">menos de 2 semanas</strong>.
        </p>
      </FadeUp>
    </section>
  );
}
