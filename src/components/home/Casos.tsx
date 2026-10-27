import Image from "next/image";
import Link from "next/link";
import FadeUp from "../FadeUp";
import Encabezado, { Resaltado } from "../Encabezado";
import { Flecha } from "../Iconos";

/* Los tres casos que se pueden nombrar. Sin cifras: se cuentan cuando estén medidas y confirmadas.
   Traslap está en construcción y se cuenta así. */

function Rubro({ children }: { children: string }) {
  return <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-text-muted">{children}</span>;
}

/* Ilustración del sistema de MB Cell: solo las partes, sin datos. */
function PanelGestion() {
  const partes = ["Stock", "Ventas", "Canje", "Consignación", "Garantías", "Proveedores"];
  return (
    <div className="absolute inset-0 p-6 grid grid-cols-3 gap-2.5 content-center" aria-hidden="true">
      {partes.map((p, i) => (
        <div
          key={p}
          className={`rounded-xl border px-2 py-4 text-center text-[12px] font-semibold ${
            i === 3 ? "border-accent/40 bg-accent/[0.08] text-accent" : "border-border bg-white/[0.03] text-text-secondary"
          }`}
        >
          {p}
        </div>
      ))}
    </div>
  );
}

/* Ilustración del cálculo de Traslap: de qué depende lo que se le paga a un chofer. Sin montos ni nombres. */
function PanelReglas() {
  return (
    <div className="absolute inset-0 p-6 flex flex-col items-center justify-center gap-3" aria-hidden="true">
      <div className="flex flex-wrap justify-center gap-2">
        {["Chofer", "Zona", "Tipo de día", "Cliente", "Bultos"].map((r) => (
          <span key={r} className="rounded-full border border-border bg-white/[0.03] px-3 py-1.5 text-[12px] font-semibold text-text-secondary">
            {r}
          </span>
        ))}
      </div>
      <svg className="w-5 h-5 text-accent/70 rotate-90" viewBox="0 0 16 16" fill="none">
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="rounded-xl border border-accent/40 bg-accent/[0.08] px-4 py-2.5 text-[13px] font-semibold text-accent">
        Lo que le toca a cada uno
      </span>
    </div>
  );
}

export default function Casos() {
  return (
    <section id="casos" className="relative mx-auto max-w-6xl px-4 sm:px-6 py-20 md:py-28">
      <Encabezado
        etiqueta="Casos"
        titulo={
          <>
            Negocios reales, <Resaltado>sin cifras infladas</Resaltado>
          </>
        }
        bajada="Te contamos qué hicimos y qué estamos haciendo. Los números, cuando estén medidos."
      />

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        <FadeUp as="article" className="lg:col-span-1">
          <Link
            href="/casos/raquel"
            className="group corners flex h-full flex-col rounded-3xl border border-border bg-bg-card overflow-hidden hover:border-accent/40 transition-colors"
          >
            <div className="relative h-[260px] overflow-hidden">
              <Image
                src="/raquel/raquel.png"
                alt="Retrato de la Dra. Raquel Rodríguez"
                fill
                sizes="(min-width: 1024px) 380px, 100vw"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent" />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <Rubro>Salud · San Salvador de Jujuy</Rubro>
              <h3 className="mt-2 text-[22px] font-extrabold text-text-primary">Dra. Raquel Rodríguez</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">
                Le hicimos la web y el sistema que agenda, confirma y recuerda los turnos por WhatsApp. Trabaja al lado de
                su secretaria.
              </p>
              <span className="mt-auto pt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-accent">
                Ver el caso <Flecha className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        </FadeUp>

        <FadeUp as="article" delay={0.06}>
          <Link
            href="/casos/mbcell"
            className="group flex h-full flex-col rounded-3xl border border-border bg-bg-card overflow-hidden hover:border-accent/40 transition-colors"
          >
            <div className="relative h-[260px] overflow-hidden border-b border-border bg-[radial-gradient(circle_at_30%_20%,rgba(0,230,118,0.08),transparent_60%)]">
              <PanelGestion />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <Rubro>Comercio · Reventa de celulares</Rubro>
              <h3 className="mt-2 text-[22px] font-extrabold text-text-primary">MB Cell</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">
                Un sistema de gestión con compras, stock, ventas, canje y consignación, y las cuentas que antes se hacían a
                mano.
              </p>
              <span className="mt-auto pt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-accent">
                Ver el caso <Flecha className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        </FadeUp>

        <FadeUp as="article" delay={0.12}>
          <div className="flex h-full flex-col rounded-3xl border border-border bg-bg-card overflow-hidden">
            <div className="relative h-[260px] overflow-hidden border-b border-border">
              <PanelReglas />
              <span className="absolute top-4 right-4 rounded-full border border-white/15 bg-bg-primary/70 px-3 py-1 text-[12px] font-semibold text-text-secondary">
                En construcción
              </span>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <Rubro>Logística · Última milla</Rubro>
              <h3 className="mt-2 text-[22px] font-extrabold text-text-primary">Traslap</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">
                Le estamos armando el cálculo de cuánto se le paga a cada chofer: 17 reglas que se cambian desde una
                pantalla, leyendo los envíos del sistema que ya usan, sin modificarlo.
              </p>
              <span className="mt-auto pt-6 text-[14px] text-text-muted">Lo contamos entero cuando esté andando.</span>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
