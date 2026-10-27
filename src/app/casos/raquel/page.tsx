import type { Metadata } from "next";
import Image from "next/image";
import PaginaCaso, { BloqueCaso, ListaCaso } from "@/components/caso/PaginaCaso";
import { Flecha } from "@/components/Iconos";

/* Caso de la Dra. Raquel Rodríguez. Va sin cifras: sus números se publican recién cuando estén
   confirmados. Su foto y su web se muestran con su OK. Nada de pacientes ni de conversaciones. */

export const metadata: Metadata = {
  title: "Caso Dra. Raquel Rodríguez · Nexora",
  description:
    "La web y el sistema que atiende el WhatsApp del consultorio de la Dra. Raquel Rodríguez, ortodoncista en San Salvador de Jujuy.",
  alternates: { canonical: "/casos/raquel" },
};

const WEB = "https://www.raquelrodriguez.com.ar/";

export default function CasoRaquel() {
  return (
    <PaginaCaso
      rubro="Caso · Salud"
      nombre="Dra. Raquel Rodríguez"
      bajada="Ortodoncia · San Salvador de Jujuy"
      resumen={
        <p>
          Le hicimos la web y el sistema que atiende el WhatsApp del consultorio: agenda, confirma, recuerda, cancela y
          reprograma turnos, y cuando es una urgencia se la pasa a la doctora.
        </p>
      }
      imagen={
        <div className="corners relative mx-auto w-full max-w-[380px] aspect-[4/5] rounded-3xl overflow-hidden border border-border bg-bg-card">
          <Image
            src="/raquel/raquel.png"
            alt="Retrato de la Dra. Raquel Rodríguez"
            fill
            sizes="(min-width: 768px) 380px, 90vw"
            className="object-cover"
            priority
          />
        </div>
      }
      cierre="¿Tenés un consultorio o un negocio con turnos?"
    >
      <BloqueCaso titulo="Cómo era antes">
        <p>
          La secretaría atendía media jornada, unos días a la mañana y otros a la tarde, y el fin de semana no. Lo que
          entraba fuera de ese horario esperaba hasta que volvía la secretaría.
        </p>
      </BloqueCaso>

      <BloqueCaso titulo="Qué le hicimos">
        <ListaCaso
          items={[
            "Su web, con sus casos, sus tratamientos y las instrucciones de cuidado para pacientes, que antes se entregaban en un PDF.",
            "Un sistema en su WhatsApp que agenda, confirma, recuerda, cancela y reprograma turnos.",
            "Conectado al sistema de gestión que el consultorio ya usaba: los turnos se dan mirando esa misma agenda.",
            "Una pantalla donde se ven los recordatorios que salieron y lo que se le pasó a una persona.",
          ]}
        />
      </BloqueCaso>

      <BloqueCaso titulo="Al lado de su secretaria, no en su lugar">
        <p>
          A los pacientes que ya están en tratamiento se los pasa a la secretaria a propósito. El sistema toma las
          consultas y los turnos de los pacientes nuevos.
        </p>
        <p>Si le preguntan algo clínico o urgente, no opina: se lo pasa a una persona.</p>
      </BloqueCaso>

      <BloqueCaso titulo="Su web">
        <a
          href={WEB}
          target="_blank"
          rel="noopener noreferrer"
          className="group block rounded-2xl border border-border bg-bg-card overflow-hidden hover:border-accent/40 transition-colors"
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
            <span className="ml-3 text-[13px] text-text-muted truncate">raquelrodriguez.com.ar</span>
          </div>
          <div className="relative hidden sm:block h-[420px] overflow-hidden bg-white">
            <iframe
              src={WEB}
              title="Web de la Dra. Raquel Rodríguez"
              loading="lazy"
              tabIndex={-1}
              aria-hidden="true"
              className="absolute top-0 left-0 border-0 pointer-events-none origin-top-left w-[200%] h-[840px] scale-50"
            />
          </div>
          <div className="flex items-center justify-between gap-3 px-4 py-4">
            <span className="text-[15px] text-text-primary font-semibold">Visitá su web</span>
            <span className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-accent">
              raquelrodriguez.com.ar
              <Flecha className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </a>
      </BloqueCaso>
    </PaginaCaso>
  );
}
