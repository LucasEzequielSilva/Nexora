"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FadeUp from "../FadeUp";
import Encabezado from "../Encabezado";

/* Preguntas frecuentes: los textos que se aprobaron para la web el 2026-10-11, sin tocar. */
const PREGUNTAS = [
  {
    q: "¿Reemplaza a quien atiende mi negocio?",
    a: "No: lo libera. El asistente se hace cargo de lo repetitivo —contestar, agendar, recordar y confirmar— para que tu equipo se dedique al cliente que está adentro.",
  },
  {
    q: "¿Tengo que instalar o aprender algo?",
    a: "Nada. Lo configuramos e instalamos nosotros sobre el WhatsApp que ya usás: vos solo nos pasás la info por audio o WhatsApp. En la propuesta te decimos cuándo estaría andando.",
  },
  {
    q: "¿Y si responde cualquier cosa?",
    a: "El asistente responde solo sobre tu negocio: turnos, horarios, ubicación, servicios y precios, con la información que cargamos. Lo que necesita criterio humano, te lo deriva.",
  },
  {
    q: "¿Y si quien escribe quiere hablar con una persona?",
    a: "Lo detecta y te pasa la conversación. Todo queda ordenado en un solo lugar.",
  },
  {
    q: "¿Sirve para mi rubro?",
    a: "Lo armamos a medida de cómo trabaja cada negocio. Hoy el caso andando es un consultorio de ortodoncia; si el tuyo es de otro rubro, lo vemos en la llamada.",
  },
  {
    q: "¿Cómo son los plazos y las condiciones?",
    a: "Los plazos y las condiciones los vemos en la llamada y quedan por escrito en la propuesta.",
  },
  {
    q: "¿Cómo sé qué voy a recibir?",
    a: "Lo que se entrega y cómo se mide queda por escrito en la propuesta que te presentamos en la llamada, antes de arrancar.",
  },
];

export default function Preguntas() {
  const [abierta, setAbierta] = useState<number | null>(0);
  const base = useId();

  return (
    <section id="preguntas" className="relative mx-auto max-w-6xl px-4 sm:px-6 py-20 md:py-28 grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
      <Encabezado
        etiqueta="Preguntas"
        titulo="Lo que nos preguntan siempre"
        bajada="Si tu duda no está acá, escribinos y te contestamos."
      />

      <FadeUp className="space-y-3">
        {PREGUNTAS.map((p, i) => {
          const estaAbierta = abierta === i;
          const idBoton = `${base}-q${i}`;
          const idPanel = `${base}-a${i}`;
          return (
            <div
              key={p.q}
              className={`rounded-2xl border transition-colors ${
                estaAbierta ? "border-accent/30 bg-bg-card" : "border-border bg-bg-card/60 hover:bg-bg-card"
              }`}
            >
              <h3>
                <button
                  id={idBoton}
                  type="button"
                  aria-expanded={estaAbierta}
                  aria-controls={idPanel}
                  onClick={() => setAbierta(estaAbierta ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 text-[16.5px] font-semibold text-text-primary"
                >
                  {p.q}
                  <motion.svg
                    aria-hidden="true"
                    animate={{ rotate: estaAbierta ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className={`w-4 h-4 shrink-0 ${estaAbierta ? "text-accent" : "text-text-muted"}`}
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </motion.svg>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {estaAbierta && (
                  <motion.div
                    id={idPanel}
                    role="region"
                    aria-labelledby={idBoton}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-[15.5px] leading-relaxed text-text-secondary">{p.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </FadeUp>
    </section>
  );
}
