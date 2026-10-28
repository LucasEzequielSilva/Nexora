import Image from "next/image";
import { origenDeUtm } from "@/lib/diagnostico/origen";
import { encabezadoPara } from "@/lib/diagnostico/textos";
import BotonWhatsapp from "./BotonWhatsapp";
import Formulario from "./Formulario";
import { Flecha } from "./Iconos";
import Video from "./Video";
import Visita from "./Visita";
import s from "./diagnostico.module.css";

/* Landing de la pauta (/diagnostico): una sola oferta, el diagnóstico con Valentino, sin precio.
   El armado sigue la referencia de funnel que pasó Lucas (28/10): título grande, el video de
   Valentino arriba, un solo botón y, abajo, el formulario que califica; si califica, la agenda.
   Los colores y las letras son los de la pauta. El título cambia según el ángulo del anuncio
   (utm_content); sin ángulo conocido, va el general.
   Env vars (server-side), todas opcionales:
   - DIAGNOSTICO_WHATSAPP: número con código de país y solo dígitos.
   - DIAGNOSTICO_VIDEO: link https al MP4 vertical. Sin video, la página se arma sin ese lugar.
   - DIAGNOSTICO_VIDEO_PORTADA: link https a la imagen que se ve antes del play.
   - DIAGNOSTICO_CAL: el link de Cal.com sin el dominio (usuario/evento). Sin agenda, le escribe Valentino. */

const numeroWhatsapp = () => {
  const n = (process.env.DIAGNOSTICO_WHATSAPP || "").replace(/\D/g, "");
  return n.length >= 10 && n.length <= 15 ? n : "";
};

/* https, o http solo en local para probar. */
const linkSeguro = (v: string | undefined) => {
  const u = (v || "").trim();
  return /^https:\/\/\S+$/.test(u) || /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?\/\S*$/.test(u) ? u : "";
};

const linkCal = () => {
  const l = (process.env.DIAGNOSTICO_CAL || "").trim().replace(/^https:\/\/cal\.com\//, "");
  return /^[\w.-]+(\/[\w.-]+){1,2}$/.test(l) ? l : "";
};

const PASOS = [
  {
    titulo: "Nos contás cómo trabajás",
    texto: "Cómo te llegan las consultas, quién las contesta y qué se sigue haciendo a mano.",
  },
  {
    titulo: "Te mostramos dónde se te escapa tiempo y plata",
    texto: "Dónde se te enfrían las consultas, dónde se te van las horas y qué conviene resolver primero.",
  },
  {
    titulo: "Si hay algo para hacer, te lo proponemos por escrito",
    texto: "Con lo que se entrega y cómo se mide, antes de arrancar. Decidís vos.",
  },
];

const preguntas = (agenda: boolean) => [
  {
    q: "¿Cuánto sale?",
    a: "El diagnóstico no se cobra. Si después hay algo para hacer juntos, la inversión la ves en la propuesta, antes de decidir.",
  },
  {
    q: "¿Qué pasa después de mandar el formulario?",
    a: agenda
      ? "Si lo querés resolver ahora, elegís día y horario ahí mismo. Si no, te escribe Valentino por WhatsApp. Si es de noche, a primera hora de la mañana."
      : "Te escribe Valentino por WhatsApp. Si es de noche, a primera hora de la mañana.",
  },
  {
    q: "¿Qué hacen con mis datos?",
    a: "Los usamos solo para escribirte por esta consulta. No te pedimos datos de tus clientes ni de pacientes. El detalle está en la política de privacidad.",
  },
];

function Llamado({ className = "" }: { className?: string }) {
  return (
    <div className={`flex-col items-center gap-3 ${className}`}>
      <a href="#formulario" className={`${s.boton} ${s.botonGrande} w-full sm:w-auto`}>
        Quiero mi diagnóstico <Flecha />
      </a>
      <p className="text-[14px] text-[#7c869a]">Son seis preguntas cortas.</p>
    </div>
  );
}

export default async function Diagnostico({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const origen = origenDeUtm(await searchParams);
  const { titulo, bajada } = encabezadoPara(origen.angulo);
  const whatsapp = numeroWhatsapp();
  const video = linkSeguro(process.env.DIAGNOSTICO_VIDEO);
  const portada = linkSeguro(process.env.DIAGNOSTICO_VIDEO_PORTADA);
  const calLink = linkCal();

  return (
    <>
      <Visita origen={origen} />
      <div className={s.fondo} aria-hidden="true" />

      <header className="flex justify-center px-5 pt-7">
        <Image src="/logo_white.png" alt="Nexora" width={118} height={16} priority />
      </header>

      <main className="mx-auto max-w-[1040px] px-5 pb-16 pt-10 sm:px-8 lg:pt-14">
        <section className="text-center">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#00e676]/30 bg-[#00e676]/[0.07] px-3 py-1.5 text-[13px] font-medium text-[#00e676]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00e676]" aria-hidden="true" />
            Diagnóstico gratis · 30 minutos
          </p>
          <h1 className="mx-auto max-w-[18ch] text-balance text-[clamp(36px,6.4vw,64px)] font-extrabold leading-[1.04]">
            {titulo}
          </h1>
          <div className="mx-auto mt-6 flex max-w-[58ch] flex-col gap-3 text-[17px] leading-relaxed text-[#a7b0c0] sm:text-[18px]">
            {bajada.map((p) => (
              <p key={p}>{p}</p>
            ))}
            {video && <p className="font-medium text-[#f3f5f9]">Mirá el video: Valentino te cuenta cómo es el diagnóstico.</p>}
          </div>
        </section>

        <div
          className={`mt-8 grid grid-cols-1 gap-8 lg:mt-14 ${video ? "lg:grid-cols-[minmax(0,1fr)_340px] lg:items-center lg:gap-12" : ""}`}
        >
          {video && (
            <div className="mx-auto w-full max-w-[300px] sm:max-w-[340px] lg:col-start-2 lg:row-start-1">
              <Video src={video} portada={portada} origen={origen} />
            </div>
          )}

          <Llamado className="flex lg:hidden" />

          <section
            aria-labelledby="que-es"
            className={`${s.esquinas} rounded-2xl border border-white/[0.08] bg-[#0b101b] p-6 sm:p-8 lg:col-start-1 lg:row-start-1 ${video ? "" : "lg:mx-auto lg:max-w-[880px]"}`}
          >
            <p className="mb-2 text-[13px] font-medium uppercase tracking-[0.12em] text-[#00e676]">El diagnóstico</p>
            <h2 id="que-es" className="text-[26px] font-bold leading-tight">
              Una charla de 30 minutos con Valentino
            </h2>
            <p className="mt-2 max-w-[56ch] text-[16px] leading-relaxed text-[#a7b0c0]">
              Es gratis y sin compromiso. Para dueños de negocios de La Plata que ya facturan y viven de turnos y
              consultas.
            </p>
            <ol className={`mt-7 grid grid-cols-1 gap-6 ${video ? "" : "lg:grid-cols-3"}`}>
              {PASOS.map((p, i) => (
                <li key={p.titulo} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#00e676]/30 text-[14px] font-bold text-[#00e676]">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-[17px] font-bold">{p.titulo}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-[#a7b0c0]">{p.texto}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <Llamado className="mt-10 hidden lg:flex" />

        <section id="formulario" aria-labelledby="pedi" className="mx-auto mt-16 max-w-[640px] scroll-mt-6">
          <div className="rounded-2xl border border-white/[0.08] bg-[#0b101b] p-6 sm:p-8">
            <p className="mb-2 text-[13px] font-medium uppercase tracking-[0.12em] text-[#00e676]">Pedí tu diagnóstico</p>
            <h2 id="pedi" className="text-[24px] font-extrabold leading-tight">
              Contanos de tu negocio
            </h2>
            <p className="mb-7 mt-2 text-[15px] leading-relaxed text-[#a7b0c0]">
              {calLink ? "Completalo y coordinamos la charla con Valentino." : "Completalo y te escribe Valentino por WhatsApp."}
            </p>
            <Formulario origen={origen} whatsapp={whatsapp} calLink={calLink} />
          </div>
          <p className="mt-5 text-center">
            <BotonWhatsapp
              numero={whatsapp}
              mensaje="Hola, quiero el diagnóstico."
              origen={origen}
              className="text-[15px] text-[#a7b0c0] underline underline-offset-4 hover:text-[#f3f5f9]"
            >
              ¿Preferís WhatsApp? Escribinos
            </BotonWhatsapp>
          </p>
        </section>
      </main>

      <section className="mx-auto max-w-[760px] px-5 pb-20 sm:px-8" aria-labelledby="preguntas">
        <h2 id="preguntas" className="text-[26px] font-bold">
          Preguntas
        </h2>
        <div className="mt-6 divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {preguntas(Boolean(calLink)).map((p) => (
            <details key={p.q} className={`${s.pregunta} py-5`}>
              <summary className="flex items-center justify-between gap-4 text-[17px] font-medium">
                {p.q}
                <span className={`${s.signo} text-[22px] leading-none text-[#00e676] transition-transform`} aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="mt-3 text-[15px] leading-relaxed text-[#a7b0c0]">{p.a}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/[0.06] px-5 py-8 text-center text-[13px] text-[#7c869a]">
        Nexora · La Plata ·{" "}
        <a href="/privacidad" className="underline underline-offset-2 hover:text-[#a7b0c0]">
          Política de privacidad
        </a>
      </footer>
    </>
  );
}
