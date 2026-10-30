import BotonesContacto from "../BotonesContacto";
import { Etiqueta, Resaltado } from "../Encabezado";
import { Flecha } from "../Iconos";
import Vitrina from "./Vitrina";

export default function Hero() {
  return (
    <section className="relative pt-[68px] overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[760px] grid-bg opacity-60 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute left-1/2 -translate-x-1/2 top-[-180px] w-[min(1000px,140vw)] h-[620px] glow-accent pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 pt-16 pb-14 md:pt-24 md:pb-20 text-center">
        <div className="aparecer" style={{ animationDelay: "0s" }}>
          <Etiqueta>Agencia de La Plata · para negocios que ya facturan</Etiqueta>
        </div>

        <div className="aparecer" style={{ animationDelay: "0.08s" }}>
          <h1 className="mt-7 text-[clamp(2.5rem,6.4vw,4.7rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-text-primary titulo-degrade">
            Instalamos la estructura
            <br className="hidden sm:block" /> que le <Resaltado>falta a tu negocio</Resaltado>
            {/* Ficha con el ícono de estructura, como la de la referencia */}
            <span
              className="relative ml-3 hidden sm:inline-flex h-[0.82em] w-[0.82em] -translate-y-[0.06em] items-center justify-center rounded-[0.2em] bg-gradient-to-br from-accent to-[#00a958] align-middle shadow-[0_0_40px_-4px_rgba(0,230,118,0.75),inset_0_1px_0_rgba(255,255,255,0.5)]"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" className="h-[56%] w-[56%] text-accent-ink" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
                <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
                <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
                <path d="M17 13.5v7M13.5 17h7" />
              </svg>
            </span>
          </h1>
        </div>

        <div className="aparecer" style={{ animationDelay: "0.16s" }}>
          <p className="mt-7 mx-auto max-w-[640px] text-[18px] md:text-[19px] leading-relaxed text-text-secondary">
            Para negocios a los que la operación se les está yendo de las manos. Primero entendemos cómo trabajás y dónde
            se te va el tiempo o la plata. Después construimos.
          </p>
        </div>

        <div className="aparecer" style={{ animationDelay: "0.24s" }}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <BotonesContacto className="justify-center" />
            <a
              href="#proceso"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-[15px] font-semibold text-text-secondary hover:text-text-primary transition-colors"
            >
              Mirá cómo trabajamos
              <Flecha />
            </a>
          </div>
          <p className="mt-5 text-[13px] text-text-muted">Una llamada para conocernos · Sin compromiso</p>
        </div>
      </div>

      <div className="aparecer" style={{ animationDelay: "0.36s" }}>
        <Vitrina />
      </div>
    </section>
  );
}
