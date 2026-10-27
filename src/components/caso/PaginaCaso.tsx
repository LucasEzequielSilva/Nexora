import type { ReactNode } from "react";
import Link from "next/link";
import Header from "../Header";
import Footer from "../Footer";
import FadeUp from "../FadeUp";
import BotonesContacto from "../BotonesContacto";
import { Etiqueta } from "../Encabezado";
import { Flecha, IconoCheck } from "../Iconos";

/* Esqueleto de la página de un caso: volver, encabezado, bloques y cierre con los botones. */
export default function PaginaCaso({
  rubro,
  nombre,
  bajada,
  resumen,
  imagen,
  cierre,
  children,
}: {
  rubro: string;
  nombre: string;
  bajada: string;
  resumen: ReactNode;
  imagen?: ReactNode;
  cierre: string;
  children: ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="relative pt-[68px]">
        <div className="absolute inset-x-0 top-0 h-[520px] grid-bg pointer-events-none" aria-hidden="true" />
        <div className="absolute left-1/2 -translate-x-1/2 top-[-120px] w-[760px] h-[480px] glow-accent pointer-events-none" aria-hidden="true" />

        <section className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-12 pb-16 md:pt-16">
          <Link
            href="/#casos"
            className="inline-flex items-center gap-2 text-[14px] text-text-secondary hover:text-text-primary transition-colors"
          >
            <Flecha className="w-4 h-4 rotate-180" />
            Todos los casos
          </Link>

          <div className={`mt-8 grid gap-10 items-center ${imagen ? "md:grid-cols-[1.15fr_0.85fr]" : ""}`}>
            <FadeUp>
              <Etiqueta>{rubro}</Etiqueta>
              <h1 className="mt-5 text-[clamp(2.4rem,6vw,4.2rem)] font-extrabold leading-[1.02] text-text-primary">{nombre}</h1>
              <p className="mt-3 text-[17px] text-text-muted">{bajada}</p>
              <div className="mt-6 text-[18px] leading-relaxed text-text-secondary max-w-[600px]">{resumen}</div>
            </FadeUp>
            {imagen && <FadeUp delay={0.1}>{imagen}</FadeUp>}
          </div>
        </section>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 space-y-16 md:space-y-20 pb-20">{children}</div>

        <section className="relative mx-auto max-w-6xl px-4 sm:px-6 pb-16">
          <FadeUp className="corners rounded-3xl border border-border bg-bg-card p-8 md:p-12 text-center">
            <h2 className="text-[clamp(1.7rem,3.6vw,2.5rem)] font-extrabold leading-tight text-text-primary">{cierre}</h2>
            <p className="mt-4 text-[16px] text-text-secondary max-w-[520px] mx-auto">
              Contanos cómo trabajás y te mostramos cómo sería en tu negocio. Sin compromiso.
            </p>
            <BotonesContacto className="mt-8 justify-center" />
          </FadeUp>
        </section>
      </main>
      <Footer />
    </>
  );
}

/* Un bloque del caso: título a la izquierda y contenido a la derecha. */
export function BloqueCaso({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <FadeUp as="section" className="grid gap-6 md:grid-cols-[0.8fr_1.2fr] border-t border-border pt-10">
      <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] font-extrabold leading-tight text-text-primary">{titulo}</h2>
      <div className="text-[17px] leading-relaxed text-text-secondary space-y-4">{children}</div>
    </FadeUp>
  );
}

/* Lista con tildes verdes. */
export function ListaCaso({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-3.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-1 shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center">
            <IconoCheck className="w-3.5 h-3.5" />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
