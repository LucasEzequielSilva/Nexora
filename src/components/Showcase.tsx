"use client";

import FadeUp from "./FadeUp";

const demos = [
  {
    rubro: "Barbería",
    tag: "Reservas + seña + panel del dueño",
    desc: "El cliente reserva y paga la seña, cada barbero ve su agenda y el dueño ve toda la caja en vivo.",
    slug: "barberia",
    img: "/demos/barberia.png",
    url: "https://tnw-barber.netlify.app/?v=3",
  },
  {
    rubro: "Lavadero de autos",
    tag: "Turnos + box + facturación",
    desc: "Turno en un minuto, el operario carga cada auto en el box y el dueño ve la facturación sin planillas.",
    slug: "lavadero",
    img: "/demos/lavadero.png",
    url: "https://qwash-demo.netlify.app/",
  },
  {
    rubro: "Limpieza de tapizados",
    tag: "Reserva a domicilio + operarios",
    desc: "Reserva online a domicilio, precio al instante y un operador va a la casa del cliente.",
    slug: "tapizados",
    img: "/demos/tapizados.png",
    url: "https://strong-kelpie-60d41b.netlify.app",
  },
];

export default function Showcase() {
  return (
    <section id="construimos" className="mx-auto px-6 pb-24" style={{ maxWidth: "1100px" }}>
      <FadeUp>
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="h-px w-8 bg-accent opacity-50" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-accent">
              Lo que construimos
            </span>
            <span className="h-px w-8 bg-accent opacity-50" />
          </div>
          <h2 className="text-[clamp(26px,3.5vw,40px)] font-extrabold tracking-tight leading-[1.08] mb-4">
            Sistemas reales, funcionando.
          </h2>
          <p className="text-text-secondary text-base max-w-xl mx-auto">
            Cada negocio, su sistema a medida. Tocá cualquiera y velo funcionando — esto es lo que podés tener.
          </p>
        </div>
      </FadeUp>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {demos.map((d, i) => (
          <FadeUp key={d.rubro} delay={0.1 * (i + 1)}>
            <div
              className="rounded-2xl overflow-hidden flex flex-col h-full transition-transform duration-300 hover:-translate-y-1"
              style={{
                background: "linear-gradient(135deg, #1a1a1e, #16191f)",
                border: "1px solid rgba(34,197,94,0.2)",
                boxShadow: "0 0 20px rgba(34,197,94,0.06)",
              }}
            >
              {/* Barra de navegador */}
              <div
                className="flex items-center gap-1.5 px-4 py-2.5"
                style={{ background: "rgba(0,0,0,0.4)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#febc2e" }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
                <span className="ml-3 text-[10px] font-mono text-text-muted truncate">nexora.app/{d.slug}</span>
              </div>

              {/* Preview (captura recortada, sin nombre) */}
              <a
                href={d.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block"
                style={{
                  height: "210px",
                  backgroundColor: "#0e1014",
                  backgroundImage: `url(${d.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "top center",
                }}
                aria-label={`Ver demo de ${d.rubro}`}
              />

              {/* Cuerpo */}
              <div className="p-5 flex flex-col flex-1">
                <div className="font-mono text-[10px] uppercase tracking-widest text-accent mb-2">{d.tag}</div>
                <h3 className="text-[16px] font-bold text-white mb-2">{d.rubro}</h3>
                <p className="text-[13px] text-text-muted leading-relaxed flex-1">{d.desc}</p>
                {d.url && (
                  <a
                    href={d.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 text-[13px] font-semibold text-accent hover:underline"
                  >
                    Ver demo en vivo →
                  </a>
                )}
              </div>
            </div>
          </FadeUp>
        ))}
      </div>

      <p className="text-center mt-8 text-xs text-text-muted max-w-xl mx-auto">
        Prototipos reales construidos por Nexora. Mostramos el sistema, no los nombres de los clientes.
      </p>
    </section>
  );
}
