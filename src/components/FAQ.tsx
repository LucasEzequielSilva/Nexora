"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeUp from "./FadeUp";

const faqs = [
  {
    q: "¿En qué se diferencia Nexora de contratar una agencia de publicidad?",
    a: "Una agencia te trae tráfico. Nexora te trae reuniones agendadas con personas que ya quieren comprar. No pagás por clics ni por likes — pagás por resultados medibles: consultas calificadas en tu agenda. Sin nosotros siguiendo el proceso, la publicidad sola quema plata.",
  },
  {
    q: "¿Cuánto tarda en funcionar?",
    a: "El sistema queda configurado en 48 horas. Los primeros prospectos empiezan a entrar dentro de los primeros 7 días. Resultados consistentes se ven en las primeras 3 a 4 semanas, dependiendo del rubro y el volumen de inversión en ads.",
  },
  {
    q: "¿Funciona para negocios chicos o recién arrancando?",
    a: "Sí, de hecho es donde más impacto genera. Un negocio chico sin sistema predecible está en modo supervivencia. Nuestro sistema más básico puede funcionar con una inversión en ads desde $300 USD/mes. La llamada diagnóstico te dice si calificás.",
  },
  {
    q: "¿Qué pasa si no veo resultados en 30 días?",
    a: "Te devolvemos el dinero. Sin letra chica, sin excusas. Nuestra garantía existe porque estamos seguros del sistema. Si aplicamos el proceso completo y no generamos reuniones calificadas en el primer mes, devolvemos el 100% de lo invertido en el servicio.",
  },
  {
    q: "¿Necesito saber de publicidad o tecnología?",
    a: "Cero. Nosotros manejamos todo: ads, automatizaciones, seguimiento, integraciones. Vos solo tenés que aparecer a las llamadas y cerrar. El sistema trabaja solo — incluso mientras dormís.",
  },
  {
    q: "¿Tengo que firmar un contrato largo?",
    a: "No. Trabajamos mes a mes. Si en algún momento no estás conforme, podés parar. Pero en la práctica, nadie para cuando la agenda está llena.",
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
