import Image from "next/image";
import { origenDeUtm } from "@/lib/diagnostico/origen";
import { encabezadoPara } from "@/lib/diagnostico/textos";
import BotonWhatsapp from "./BotonWhatsapp";
import Formulario from "./Formulario";
import { Flecha } from "./Iconos";
import s from "./diagnostico.module.css";

/* Landing de la pauta (/diagnostico): una sola oferta, el diagnóstico con Valentino, sin precio.
   El título cambia según el ángulo del anuncio (utm_content); sin ángulo conocido, va el general.
   Sirve sea cual sea el destino de los anuncios: si van al formulario de Meta queda publicada para
   quien busca Nexora; si vienen acá, junta y mide; y el WhatsApp aparece cuando haya número.
   Env vars (server-side): DIAGNOSTICO_WHATSAPP, número con código de país y solo dígitos (opcional). */

const numeroWhatsapp = () => {
  const n = (process.env.DIAGNOSTICO_WHATSAPP || "").replace(/\D/g, "");
  return n.length >= 10 && n.length <= 15 ? n : "";
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

const PREGUNTAS = [
  {
    q: "¿Cuánto sale?",
    a: "El diagnóstico no se cobra. Si después hay algo para hacer juntos, la inversión la ves en la propuesta, antes de decidir.",
  },
  {
    q: "¿Qué pasa después de mandar el formulario?",
    a: "Te escribe Valentino por WhatsApp. Si es de noche, a primera hora de la mañana.",
  },
  {
    q: "¿Qué hacen con mis datos?",
    a: "Los usamos solo para escribirte por esta consulta. No te pedimos datos de tus clientes ni de pacientes. El detalle está en la política de privacidad.",
  },
];

export default async function Diagnostico({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const origen = origenDeUtm(await searchParams);
  const { titulo, bajada } = encabezadoPara(origen.angulo);
  const whatsapp = numeroWhatsapp();

  return (
    <>
      <div className={s.fondo} aria-hidden="true" />

      <header className="mx-auto flex max-w-[1120px] items-center justify-between px-5 pt-6 sm:px-8">
        <Image src="/logo_white.png" alt="Nexora" width={118} height={16} priority />
        <span className="text-[13px] text-[#7c869a]">La Plata</span>
      </header>

      <main className="mx-auto grid max-w-[1120px] grid-cols-1 gap-x-14 px-5 pb-20 pt-12 sm:px-8 lg:grid-cols-[minmax(0,1fr)_440px] lg:pt-20">
        <section className="lg:col-start-1">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#00e676]/30 bg-[#00e676]/[0.07] px-3 py-1.5 text-[13px] font-medium text-[#00e676]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00e676]" aria-hidden="true" />
            Diagnóstico gratis · 30 minutos
          </p>
          <h1 className="text-[clamp(34px,6vw,58px)] font-extrabold leading-[1.05]">{titulo}</h1>
          <div className="mt-6 flex max-w-[56ch] flex-col gap-3 text-[17px] leading-relaxed text-[#a7b0c0] sm:text-[18px]">
            {bajada.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:hidden">
            <a href="#formulario" className={s.boton}>
              Quiero mi diagnóstico <Flecha />
            </a>
          </div>
          <BotonWhatsapp
            numero={whatsapp}
            mensaje="Hola, quiero el diagnóstico."
            className="mt-4 inline-block text-[15px] text-[#a7b0c0] underline underline-offset-4 hover:text-[#f3f5f9]"
          >
            ¿Preferís WhatsApp? Escribinos
          </BotonWhatsapp>
        </section>

        <section className="mt-16 lg:col-start-1" aria-labelledby="que-es">
          <h2 id="que-es" className="text-[26px] font-bold">
            Qué es el diagnóstico
          </h2>
          <p className="mt-3 max-w-[56ch] text-[16px] leading-relaxed text-[#a7b0c0]">
            Una charla de 30 minutos con Valentino, de Nexora. Es gratis y sin compromiso.
          </p>
          <ol className="mt-8 flex flex-col gap-6">
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

          <h2 className="mt-14 text-[26px] font-bold">Para quién es</h2>
          <div className="mt-3 flex max-w-[56ch] flex-col gap-3 text-[16px] leading-relaxed text-[#a7b0c0]">
            <p>
              Para dueños de negocios que ya facturan y viven de turnos y consultas: consultorios, estética,
              peluquerías, academias y servicios con agenda.
            </p>
            <p>
              Somos de La Plata. No te vendemos una herramienta: primero entendemos cómo trabajás y después
              construimos lo que haga falta.
            </p>
          </div>
        </section>

        <section
          id="formulario"
          aria-labelledby="pedi"
          className="mt-16 scroll-mt-6 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0"
        >
          <div className={`${s.esquinas} rounded-2xl border border-white/[0.08] bg-[#0b101b] p-6 sm:p-8 lg:sticky lg:top-8`}>
            <p className="mb-2 text-[13px] font-medium uppercase tracking-[0.12em] text-[#00e676]">Pedí tu diagnóstico</p>
            <h2 id="pedi" className="text-[24px] font-extrabold leading-tight">
              Contanos de tu negocio
            </h2>
            <p className="mb-7 mt-2 text-[15px] leading-relaxed text-[#a7b0c0]">
              Completalo y te escribe Valentino por WhatsApp.
            </p>
            <Formulario origen={origen} whatsapp={whatsapp} />
          </div>
        </section>
      </main>

      <section className="mx-auto max-w-[760px] px-5 pb-20 sm:px-8" aria-labelledby="preguntas">
        <h2 id="preguntas" className="text-[26px] font-bold">
          Preguntas
        </h2>
        <div className="mt-6 divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {PREGUNTAS.map((p) => (
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
