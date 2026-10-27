import FadeUp from "../FadeUp";
import Encabezado, { Resaltado } from "../Encabezado";
import { Flecha } from "../Iconos";

/* Cómo trabaja Nexora, en pasos. Sin plazos, sin duración de la llamada y sin "gratis". */

const PASOS = [
  {
    titulo: "Una llamada para conocernos",
    texto: "Nos contás cómo trabaja tu negocio y dónde sentís que se te va el tiempo o la plata.",
    entrega: "Sin compromiso",
  },
  {
    titulo: "Un formulario desde el celular",
    texto:
      "Con tus respuestas armamos una ficha: tus problemas con tus palabras, tus prioridades y la cuenta con los números que elegís vos.",
    entrega: "La ficha de tu negocio",
  },
  {
    titulo: "La propuesta, por escrito",
    texto: "Te la presentamos en una segunda reunión: qué se entrega, cómo se mide y cuándo estaría andando.",
    entrega: "Todo por escrito, antes de arrancar",
  },
  {
    titulo: "Lo construimos",
    texto: "A medida de cómo trabaja tu negocio. Si hace falta, antes vamos a ver el trabajo con nuestros propios ojos.",
    entrega: "Hecho a medida",
  },
  {
    titulo: "Lo ponemos a andar con tu equipo",
    texto:
      "Trabaja al lado de tu equipo, no en su lugar: se queda con lo repetitivo, y lo que necesita criterio lo resuelve una persona.",
    entrega: "Al lado de tu equipo",
  },
];

export default function Proceso() {
  return (
    <section id="proceso" className="relative border-y border-border bg-bg-secondary">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 md:py-28 grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-28 self-start">
          <Encabezado
            etiqueta="Cómo trabajamos"
            titulo={
              <>
                Primero entendemos. <Resaltado>Después construimos.</Resaltado>
              </>
            }
            bajada="Antes de venderte nada, nos sentamos a entender cómo trabaja tu negocio y dónde se te va el tiempo o la plata."
          />
          <FadeUp delay={0.1} className="mt-8">
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-white/[0.04] px-6 py-3 text-[15px] font-semibold text-text-primary hover:bg-white/[0.08] transition-colors"
            >
              Empezar por la llamada
              <Flecha />
            </a>
          </FadeUp>
        </div>

        <div className="relative">
          <span
            className="absolute left-[38px] md:left-[42px] top-6 bottom-6 w-px bg-gradient-to-b from-accent/50 via-border-strong to-transparent"
            aria-hidden="true"
          />
          <ol className="relative space-y-4">
            {PASOS.map((p, i) => (
              <FadeUp
                as="li"
                key={p.titulo}
                delay={i * 0.05}
                className="relative flex gap-5 rounded-2xl border border-border bg-bg-card p-5 md:p-6"
              >
                <span className="relative z-[1] shrink-0 w-[34px] h-[34px] mt-0.5 rounded-full border border-accent/40 bg-bg-primary text-accent font-display text-[13px] font-bold flex items-center justify-center">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[18px] font-bold text-text-primary">{p.titulo}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-text-secondary">{p.texto}</p>
                  <span className="mt-4 inline-flex rounded-full border border-accent/20 bg-accent/[0.06] px-3 py-1 text-[12.5px] font-medium text-accent">
                    {p.entrega}
                  </span>
                </div>
              </FadeUp>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
