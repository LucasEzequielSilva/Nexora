"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeUp from "./FadeUp";

const faqs = [
  {
    q: "¿En qué se diferencia de una agencia de marketing?",
    a: "Las agencias hacen publicidad. Nosotros instalamos el software que opera tu negocio — agenda, atención y seguimiento automático. No depende de ads para funcionar.",
  },
  {
    q: "¿En cuánto tiempo está funcionando?",
    a: "Entre 10 y 14 días desde el onboarding. El tiempo depende en parte de qué tan rápido el negocio comparte el material necesario: logo, fotos, horarios y accesos. Cuando eso llega rápido, el sistema puede estar activo antes.",
  },
  {
    q: "¿Qué pasa si dejo de usar el servicio?",
    a: "En el modelo SaaS, el sistema se pausa y los datos quedan guardados para exportar. Si preferís ser dueño del código, existe la modalidad custom con un setup más alto.",
  },
  {
    q: "¿Necesito saber de tecnología?",
    a: "No. Configuramos absolutamente todo. El equipo solo usa el dashboard para ver métricas y recibe los turnos. Nada más.",
  },
  {
    q: "¿Funciona para negocios chicos?",
    a: "Sí, siempre que ya tengas clientes. El sistema está pensado para negocios que ya funcionan y quieren funcionar mejor, no para emprendimientos que recién arrancan.",
  },
  {
    q: "¿Tienen garantía?",
    a: "Si en 30 días no ves mejoras concretas en la gestión de turnos, devolvemos el setup. Sin discusión.",
  },
  {
    q: "¿Qué es la modalidad custom?",
    a: "Lucas construye algo completamente a medida. El código te pertenece. Para empresas medianas con necesidades muy específicas. Precio más alto, soporte mensual opcional.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="mx-auto px-6 pb-24" style={{ maxWidth: "760px" }}>
      <FadeUp>
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="h-px w-8 bg-accent opacity-50" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-accent">
              Preguntas frecuentes
            </span>
            <span className="h-px w-8 bg-accent opacity-50" />
          </div>
          <h2 className="text-[clamp(26px,3.5vw,40px)] font-extrabold tracking-tight leading-tight">
            Todo lo que querés saber
          </h2>
        </div>
      </FadeUp>

      <div className="flex flex-col gap-3">
        {faqs.map((faq, i) => {
          const isOpen = open === i;
          return (
            <FadeUp key={i} delay={0.06 * i}>
               <div
                 className="rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer"
                 style={{
                   background: isOpen
                     ? "linear-gradient(135deg, rgba(34,197,94,0.08) 0%, rgba(24,24,27,0.98) 100%)"
                     : "linear-gradient(135deg, rgba(24,24,27,0.95) 0%, rgba(18,18,20,0.98) 100%)",
                   border: "1px solid rgba(34,197,94,0.2)",
                   boxShadow: "0 0 20px rgba(34,197,94,0.08)",
                 }}
                 onClick={() => setOpen(isOpen ? null : i)}
               >
                {/* Question row */}
                <div className="flex items-center justify-between gap-4 px-7 py-6">
                  <span className="text-[16px] font-semibold text-text-primary leading-snug">
                    {faq.q}
                  </span>
                  <motion.div
                    className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
                    animate={{
                      background: isOpen ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.04)",
                      borderColor: isOpen ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.08)",
                    }}
                    transition={{ duration: 0.25 }}
                    style={{ border: "1px solid" }}
                  >
                    <motion.svg
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
                  </motion.div>
                </div>

                {/* Answer — AnimatePresence para smooth height */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
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
