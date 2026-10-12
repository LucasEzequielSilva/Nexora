"use client";

import { useId, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeUp from "./FadeUp";

type QA = { q: string; a: string };

/* Default = versión clínica (la usa /vsl-1 sin pasar props). La general pasa su propio set. */
const faqsClinica: QA[] = [
  {
    q: "¿Reemplaza a mi recepcionista?",
    a: "No: la libera. El asistente se hace cargo de lo repetitivo —contestar, agendar, recordar y confirmar— para que tu equipo se dedique al paciente que está en el consultorio.",
  },
  {
    q: "¿Tengo que instalar o aprender algo?",
    a: "Nada. Lo configuramos e instalamos nosotros sobre el WhatsApp que ya usás: vos solo nos pasás la info por audio o WhatsApp. En la propuesta te decimos cuándo estaría andando.",
  },
  {
    q: "¿Y si responde cualquier cosa?",
    a: "El asistente responde solo sobre tu consultorio: turnos, horarios, ubicación y obras sociales, con la información que cargamos. Si alguien pregunta algo urgente o clínico, no opina: te lo pasa a vos.",
  },
  {
    q: "¿Y si el paciente quiere hablar con una persona?",
    a: "Lo detecta y te pasa la conversación al instante. No se pierde nada: todo queda ordenado en un solo lugar.",
  },
  {
    q: "¿Sirve para mi especialidad?",
    a: "Hoy el caso andando es un consultorio de ortodoncia. Si tu especialidad es otra, lo armamos a medida y lo vemos en la llamada.",
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

export default function FAQ({ faqs = faqsClinica }: { faqs?: QA[] } = {}) {
  const [open, setOpen] = useState<number | null>(null);
  const uid = useId();

  return (
    <section className="mx-auto px-6 py-24" style={{ maxWidth: "760px" }}>
      <FadeUp>
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="h-px w-8 bg-accent opacity-50" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-accent">
              Preguntas frecuentes
            </span>
            <span className="h-px w-8 bg-accent opacity-50" />
          </div>
          <h2 className="text-[clamp(24px,2.6vw,30px)] font-extrabold tracking-tight leading-tight">
            Todo lo que querés saber
          </h2>
        </div>
      </FadeUp>

      <div className="flex flex-col gap-3">
        {faqs.map((faq, i) => {
          const isOpen = open === i;
          const panelId = `${uid}-faq-${i}`;
          const buttonId = `${uid}-faq-q-${i}`;
          return (
            <FadeUp key={i} delay={0.06 * i}>
               <div
                 className="rounded-2xl overflow-hidden transition-all duration-300"
                 style={{
                   background: isOpen
                     ? "linear-gradient(135deg, rgba(34,197,94,0.08) 0%, rgba(24,24,27,0.98) 100%)"
                     : "linear-gradient(135deg, rgba(24,24,27,0.95) 0%, rgba(18,18,20,0.98) 100%)",
                   border: "1px solid rgba(34,197,94,0.2)",
                   boxShadow: "0 0 20px rgba(34,197,94,0.08)",
                 }}
               >
                {/* Question row — botón: foco y teclado (Enter / Espacio) */}
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-7 py-6 text-left cursor-pointer rounded-2xl focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
                >
                  <span className="text-[16px] font-semibold text-text-primary leading-snug">
                    {faq.q}
                  </span>
                  <motion.span
                    className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
                    animate={{
                      background: isOpen ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.04)",
                      borderColor: isOpen ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.08)",
                    }}
                    transition={{ duration: 0.25 }}
                    style={{ border: "1px solid" }}
                  >
                    <motion.svg
                      aria-hidden="true"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      style={{ stroke: isOpen ? "#22c55e" : "#71717a" }}
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </motion.svg>
                  </motion.span>
                </button>

                {/* Answer — AnimatePresence para smooth height */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <p className="px-7 pb-6 text-[15px] text-text-muted leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeUp>
          );
        })}
      </div>
    </section>
  );
}
