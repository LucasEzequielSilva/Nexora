import FadeUp from "./FadeUp";
import RoiSimulator from "./RoiSimulator";

const CAL_LINK = "nexoragrowth/30min";

/* Bloque de oferta: el calculador, los casos y la web propia en mosaicos del mismo peso,
   y un único botón que abre el calendario. Lo comparten "/" (negocio) y "/vsl-1"
   (consultorio); la variante solo cambia las palabras del calculador. */

type Variant = "negocio" | "consultorio";

/* El de negocio usa "turno" en la etiqueta del precio; el de consultorio deja las palabras por defecto. */
const ROI: Record<Variant, { priceLabel?: string }> = {
  negocio: { priceLabel: "Precio de turno" },
  consultorio: {},
};

interface Mosaico {
  titulo: string;
  linea?: string;
}

const MOSAICOS: Mosaico[] = [
  {
    titulo: "Agendamiento de turnos",
    linea: "Te escriben a cualquier hora y el sistema ofrece los horarios libres y cierra el turno.",
  },
  {
    titulo: "Cancelaciones",
    linea: "Si alguien cancela, el sistema libera el horario y le ofrece una nueva fecha.",
  },
  {
    titulo: "Reprogramación",
    linea: "Si te piden otro día, el sistema reacomoda la agenda.",
  },
  {
    titulo: "Recordatorios",
    linea: "Avisa antes del turno y te confirman de un toque.",
  },
  {
    titulo: "Confirmaciones",
    linea: "Pide confirmación y te arma el día cerrado.",
  },
  {
    titulo: "Web propia con tu marca",
    linea: "Hecha por Nexora para tu negocio.",
  },
];

export default function SistemaCompleto({ variant }: { variant: Variant }) {
  return (
    <section id="sistema" className="relative py-24 px-6 overflow-hidden">
      <div className="absolute pointer-events-none rounded-full" style={{ width: 800, height: 800, background: "#22c55e", opacity: 0.03, top: "50%", left: "50%", transform: "translate(-50%, -50%)", filter: "blur(120px)" }} />

      <div className="relative z-10 mx-auto" style={{ maxWidth: "1080px" }}>
        <FadeUp>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-accent opacity-50" />
              <span className="font-mono text-[11px] uppercase tracking-widest text-accent">La cuenta</span>
              <span className="h-px w-8 bg-accent opacity-50" />
            </div>
            <h2 className="text-[clamp(24px,2.6vw,30px)] font-extrabold tracking-tight leading-tight">
              Hacé la cuenta con tus números.
            </h2>
          </div>
        </FadeUp>

        {/* Calculador (ROI), con las palabras del rubro. */}
        <FadeUp delay={0.1}>
          <RoiSimulator {...ROI[variant]} />
        </FadeUp>

        <FadeUp>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-accent opacity-50" />
              <span className="font-mono text-[11px] uppercase tracking-widest text-accent">Qué incluye</span>
              <span className="h-px w-8 bg-accent opacity-50" />
            </div>
            <h2 className="text-[clamp(24px,2.6vw,30px)] font-extrabold tracking-tight leading-tight">
              El sistema completo
            </h2>
          </div>
        </FadeUp>

        {/* Seis mosaicos del mismo peso: tres por fila en escritorio, uno en móvil. */}
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {MOSAICOS.map((m, i) => (
            <li key={m.titulo}>
              <FadeUp delay={0.08 * (i % 3)}>
                <div
                  className="relative isolate rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 flex items-start gap-3"
                  style={{
                    background: "linear-gradient(135deg, rgba(24,24,27,0.95) 0%, rgba(18,18,20,0.98) 100%)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                  }}
                >
                  <span aria-hidden="true" className="text-accent text-[14px] font-bold leading-snug mt-0.5 shrink-0">✓</span>
                  <div className="min-w-0">
                    <h3 className="text-[17px] font-extrabold text-white tracking-tight leading-snug">{m.titulo}</h3>
                    {m.linea && (
                      <p className="mt-2 text-[14px] text-text-secondary leading-snug">{m.linea}</p>
                    )}
                  </div>
                </div>
              </FadeUp>
            </li>
          ))}
        </ul>

        <FadeUp delay={0.4}>
          <div className="text-center mt-12">
            <p className="text-text-secondary text-base max-w-lg mx-auto mb-7">
              No hay precio de lista: depende del tamaño de tu operación. Lo vemos en la llamada.
            </p>

            {/* Botón único de la sección: abre el calendario. */}
            <div className="mx-auto w-full max-w-xs">
              <div style={{ borderRadius: "13px", padding: "1px", background: "linear-gradient(135deg, rgba(74,222,128,0.85) 0%, rgba(34,197,94,0.55) 50%, rgba(5,150,105,0.85) 100%)", boxShadow: "0 0 25px rgba(34,197,94,0.25)" }}>
                <button
                  data-cal-namespace="30min"
                  data-cal-link={CAL_LINK}
                  data-cal-config='{"layout":"month_view"}'
                  className="w-full py-4 rounded-xl font-bold text-[14px] tracking-wide cursor-pointer transition-all duration-200 bg-gradient-to-r from-[#22c55e] via-[#10b981] to-[#059669] text-black"
                  style={{ borderRadius: "12px", boxShadow: "inset 0 2px 0 rgba(255,255,255,0.15), inset 0 -2px 0 rgba(0,0,0,0.15), 0 6px 24px rgba(34,197,94,0.25)" }}
                >
                  Agendá tu llamada
                </button>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
