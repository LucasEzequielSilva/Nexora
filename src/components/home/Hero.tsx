import BotonesContacto from "../BotonesContacto";
import { Etiqueta, Resaltado } from "../Encabezado";
import { Flecha } from "../Iconos";

export default function Hero() {
  return (
    <section className="relative pt-[68px] overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[760px] grid-bg pointer-events-none" aria-hidden="true" />
      <div
        className="absolute left-1/2 -translate-x-1/2 top-[-180px] w-[min(1000px,140vw)] h-[620px] glow-accent pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 pt-16 pb-14 md:pt-24 md:pb-20 text-center">
        <div className="aparecer" style={{ animationDelay: "0s" }}>
          <Etiqueta>Agencia de La Plata · para negocios que ya facturan</Etiqueta>
        </div>

        <div className="aparecer" style={{ animationDelay: "0.08s" }}>
          <h1 className="mt-7 text-[clamp(2.6rem,7vw,5.3rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-text-primary">
            Instalamos la estructura
            <br className="hidden sm:block" /> que le <Resaltado>falta a tu negocio</Resaltado>
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
    </section>
  );
}
