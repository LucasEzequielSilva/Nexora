import type { ReactNode } from "react";
import FadeUp from "../FadeUp";
import Encabezado, { Resaltado } from "../Encabezado";

/* Lo que hace Nexora. Cada tarjeta dice en qué trabajo real se apoya; lo que está en construcción
   se dice así. */

const trazo = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const ICONOS: Record<string, ReactNode> = {
  chat: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
      <path {...trazo} d="M4 5.5h16v10H9l-5 4v-14Z" />
      <path {...trazo} d="M8.5 10.5h7" />
    </svg>
  ),
  campana: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
      <path {...trazo} d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15L6 16Z" />
      <path {...trazo} d="M10 20.5a2.2 2.2 0 0 0 4 0" />
    </svg>
  ),
  web: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
      <rect {...trazo} x="3" y="4.5" width="18" height="15" rx="2.5" />
      <path {...trazo} d="M3 9h18M6.5 6.8h.01M9 6.8h.01" />
    </svg>
  ),
  calculo: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
      <rect {...trazo} x="5" y="3" width="14" height="18" rx="2.5" />
      <path {...trazo} d="M8.5 7.5h7M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 15.5h.01M12 15.5h.01M15.5 15.5h.01" />
    </svg>
  ),
  caja: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
      <path {...trazo} d="M3.5 7.5 12 3.5l8.5 4v9L12 20.5l-8.5-4v-9Z" />
      <path {...trazo} d="M3.5 7.5 12 11.5l8.5-4M12 11.5v9" />
    </svg>
  ),
  tuberia: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
      <path {...trazo} d="M3 8h6a3 3 0 0 1 3 3v2a3 3 0 0 0 3 3h6" />
      <path {...trazo} d="M3 5.5v5M21 13.5v5" />
    </svg>
  ),
};

const SERVICIOS = [
  {
    icono: "chat",
    titulo: "Atención y turnos por WhatsApp",
    texto:
      "Contesta las consultas a cualquier hora, ofrece los horarios libres y agenda. Lo que necesita criterio de una persona, te lo pasa.",
    prueba: "Lo usa la Dra. Raquel Rodríguez",
  },
  {
    icono: "campana",
    titulo: "Recordatorios y confirmaciones",
    texto:
      "Avisa antes de cada turno y pide confirmación, así llegás a la mañana sabiendo quién viene. Si alguien cancela o pide otro día, se reprograma.",
    prueba: "Lo usa la Dra. Raquel Rodríguez",
  },
  {
    icono: "web",
    titulo: "La web de tu negocio",
    texto: "Con tu marca, lo que ofrecés y cómo pedirte un turno. La armamos sobre tus colores, tus fotos y tus servicios.",
    prueba: "Hicimos la de la Dra. Raquel Rodríguez",
  },
  {
    icono: "calculo",
    titulo: "Cuánto se le paga a cada uno",
    texto:
      "El cálculo hecho con tus reglas, que se cambian desde una pantalla, abierto peso por peso y con el rastro de quién aprobó qué.",
    prueba: "En construcción para Traslap",
    enConstruccion: true,
  },
  {
    icono: "caja",
    titulo: "Stock, ventas y consignación en un solo lugar",
    texto:
      "Compras, stock, ventas, canje, garantías y lo que dejaste en consignación, con las cuentas que antes se hacían a mano.",
    prueba: "Lo usa MB Cell",
  },
  {
    icono: "tuberia",
    titulo: "Que tus sistemas se hablen",
    texto:
      "Hoy alguien carga baldes: copia del WhatsApp a una planilla y de la planilla al Excel. Nosotros ponemos la cañería para que nadie tenga que pasar datos a mano.",
    prueba: "Lo hicimos con la agenda del consultorio de Raquel",
  },
];

export default function Servicios() {
  return (
    <section id="servicios" className="relative mx-auto max-w-6xl px-4 sm:px-6 py-20 md:py-28">
      <Encabezado
        etiqueta="Qué hacemos"
        titulo={
          <>
            Lo que <Resaltado>resolvemos</Resaltado> en un negocio
          </>
        }
        bajada="No vendemos una herramienta: armamos lo que tu negocio necesita, a medida de cómo trabaja."
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICIOS.map((s, i) => (
          <FadeUp
            key={s.titulo}
            delay={(i % 3) * 0.06}
            as="article"
            className="group flex flex-col rounded-2xl border border-border bg-bg-card p-6 md:p-7 hover:border-border-strong hover:bg-bg-card-hover transition-colors"
          >
            <span className="w-11 h-11 rounded-xl border border-accent/20 bg-accent/[0.07] text-accent flex items-center justify-center">
              {ICONOS[s.icono]}
            </span>
            <h3 className="mt-5 text-[19px] font-bold leading-snug text-text-primary">{s.titulo}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">{s.texto}</p>
            <p
              className={`mt-auto pt-6 text-[13px] font-medium ${s.enConstruccion ? "text-text-muted" : "text-accent/90"}`}
            >
              {s.prueba}
            </p>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
