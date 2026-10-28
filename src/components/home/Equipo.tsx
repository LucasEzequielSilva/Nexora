import Image from "next/image";
import FadeUp from "../FadeUp";
import Encabezado, { Resaltado } from "../Encabezado";
import { EQUIPO, FOTO_GRUPAL } from "@/lib/equipo";

export default function Equipo() {
  return (
    <section id="equipo" className="relative border-y border-border bg-white/[0.012] overflow-hidden">
      <div className="absolute right-[-200px] top-[-120px] w-[620px] h-[520px] glow-accent pointer-events-none" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-20 md:py-28">
        <Encabezado
          etiqueta="Equipo"
          titulo={
            <>
              Somos personas. <Resaltado>Somos de La Plata.</Resaltado>
            </>
          }
          bajada="Del otro lado no hay un call center: te atiende el mismo equipo que arma tu sistema."
        />

        {FOTO_GRUPAL && (
          <FadeUp className="corners mt-12 relative aspect-[16/7] rounded-3xl overflow-hidden border border-border">
            <Image src={FOTO_GRUPAL} alt="El equipo de Nexora" fill sizes="(min-width: 1152px) 1104px, 100vw" className="object-cover" />
          </FadeUp>
        )}

        <ul className="mt-12 grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {EQUIPO.map((p, i) => (
            <FadeUp
              as="li"
              key={p.nombre}
              delay={i * 0.05}
              className="luz filo flex flex-col rounded-2xl border border-border bg-bg-card/60 backdrop-blur-sm overflow-hidden"
            >
              <div className="relative aspect-[4/5] bg-[radial-gradient(circle_at_50%_30%,rgba(0,230,118,0.12),transparent_65%)]">
                {p.foto ? (
                  <Image
                    src={p.foto}
                    alt={`Foto de ${p.nombreCompleto ?? p.nombre}`}
                    fill
                    sizes="(min-width: 1280px) 220px, (min-width: 768px) 30vw, 48vw"
                    className="object-cover object-top"
                  />
                ) : (
                  <span
                    className="absolute inset-0 flex items-center justify-center font-display text-[64px] font-extrabold text-accent/70"
                    aria-hidden="true"
                  >
                    {p.nombre.charAt(0)}
                  </span>
                )}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg-card to-transparent" />
              </div>
              <div className="flex flex-1 flex-col px-4 sm:px-5 pb-5 -mt-2 relative">
                <h3 className="text-[19px] font-extrabold text-text-primary">{p.nombre}</h3>
                {p.nombreCompleto && <p className="text-[13px] text-text-muted">{p.nombreCompleto}</p>}
                <p className="mt-2 text-[12.5px] font-semibold uppercase tracking-[0.1em] text-accent">{p.rol}</p>
                <p className="mt-2 text-[14px] leading-relaxed text-text-secondary">{p.descripcion}</p>
              </div>
            </FadeUp>
          ))}
        </ul>
      </div>
    </section>
  );
}
