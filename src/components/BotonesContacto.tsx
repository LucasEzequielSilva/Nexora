import { CAL_LINK, INSTAGRAM_DM_URL, hayAgenda, hayWhatsapp, whatsappUrl } from "@/lib/contacto";
import { Flecha, IconoInstagram, IconoWhatsapp } from "./Iconos";

/* Los dos llamados de la web: agendar la llamada y escribir por WhatsApp.
   El que no tenga destino cargado en lib/contacto no aparece; si no hay ninguno, queda el Instagram. */

type Tam = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const tamanos: Record<Tam, string> = {
  md: "px-5 py-2.5 text-[14px]",
  lg: "px-7 py-3.5 text-[15px]",
};
const primario =
  "destello bg-accent text-accent-ink hover:bg-accent-hover hover:-translate-y-px shadow-[0_0_0_1px_rgba(0,230,118,0.4),0_8px_30px_-8px_rgba(0,230,118,0.55)] hover:shadow-[0_0_0_1px_rgba(0,230,118,0.6),0_10px_40px_-6px_rgba(0,230,118,0.7)]";
const secundario =
  "border border-border-strong bg-white/[0.04] backdrop-blur-md text-text-primary hover:bg-white/[0.08] hover:border-white/25";

export function BotonAgenda({ tam = "lg", texto = "Agendá tu llamada", className = "" }: { tam?: Tam; texto?: string; className?: string }) {
  if (!hayAgenda) return null;
  return (
    <button
      type="button"
      data-cal-namespace="llamada"
      data-cal-link={CAL_LINK}
      data-cal-config='{"layout":"month_view"}'
      className={`${base} ${tamanos[tam]} ${primario} ${className}`}
    >
      {texto}
      <Flecha />
    </button>
  );
}

export function BotonWhatsapp({
  tam = "lg",
  destacado = false,
  texto = "Escribinos por WhatsApp",
  className = "",
}: {
  tam?: Tam;
  destacado?: boolean;
  texto?: string;
  className?: string;
}) {
  if (!hayWhatsapp) return null;
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${tamanos[tam]} ${destacado ? primario : secundario} ${className}`}
    >
      <IconoWhatsapp />
      {texto}
    </a>
  );
}

export function BotonInstagram({ tam = "lg", className = "" }: { tam?: Tam; className?: string }) {
  return (
    <a
      href={INSTAGRAM_DM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${tamanos[tam]} ${primario} ${className}`}
    >
      <IconoInstagram />
      Escribinos por Instagram
    </a>
  );
}

/* Los dos botones juntos: la llamada como principal y el WhatsApp al lado. */
export default function BotonesContacto({ tam = "lg", className = "" }: { tam?: Tam; className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <BotonAgenda tam={tam} />
      <BotonWhatsapp tam={tam} destacado={!hayAgenda} />
      {!hayAgenda && !hayWhatsapp && <BotonInstagram tam={tam} />}
    </div>
  );
}
