"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/* Componentes motion estáticos (referencia estable).
   OJO: nunca usar motion.create(as) dentro del render → crea un componente nuevo
   en cada render, React remonta el subárbol y re-dispara la animación (jank al
   cambiar estado en accordions/tabs/FAQ). */
const MOTION = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
} as const;

interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article";
}

export default function FadeUp({
  children,
  delay = 0,
  className = "",
  as = "div",
}: FadeUpProps) {
  const Component = MOTION[as];

  return (
    <Component
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Component>
  );
}
