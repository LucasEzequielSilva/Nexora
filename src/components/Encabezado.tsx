import type { ReactNode } from "react";
import FadeUp from "./FadeUp";

/* Píldora chica que va arriba de cada título de sección. */
export function Etiqueta({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/[0.06] px-3 py-1 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-accent ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-accent pulse-dot" aria-hidden="true" />
      {children}
    </span>
  );
}

/* Palabra o frase resaltada dentro de un título. */
export function Resaltado({ children }: { children: ReactNode }) {
  return <span className="text-gradient-accent italic pr-[0.08em]">{children}</span>;
}

/* Encabezado de sección: píldora, título y bajada. */
export default function Encabezado({
  etiqueta,
  titulo,
  bajada,
  centrado = false,
  className = "",
}: {
  etiqueta: string;
  titulo: ReactNode;
  bajada?: ReactNode;
  centrado?: boolean;
  className?: string;
}) {
  return (
    <FadeUp className={`${centrado ? "text-center mx-auto" : ""} max-w-[720px] ${className}`}>
      <Etiqueta>{etiqueta}</Etiqueta>
      <h2 className="titulo-degrade mt-5 text-[clamp(2rem,4.4vw,3.1rem)] font-extrabold leading-[1.06] text-text-primary">{titulo}</h2>
      {bajada && <p className="mt-5 text-[17px] leading-relaxed text-text-secondary">{bajada}</p>}
    </FadeUp>
  );
}
