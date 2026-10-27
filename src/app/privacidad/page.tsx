import type { Metadata } from "next";
import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { EMAIL } from "@/lib/contacto";

/* Política de privacidad: una sola para la web y para la página de los anuncios.
   Tiene que decir lo que de verdad se hace con los datos. Si se suma una herramienta de medición
   o de publicidad, o cambia dónde se guardan las consultas, se actualiza acá antes de publicarlo. */

const ACTUALIZADA = "27 de octubre de 2026";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Qué datos junta Nexora, para qué los usa y cómo pedir que los corrijamos o los borremos.",
  alternates: { canonical: "/privacidad" },
};

function Parte({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <section className="border-t border-border pt-8">
      <h2 className="text-[22px] font-extrabold text-text-primary">{titulo}</h2>
      <div className="mt-4 space-y-4 text-[16px] leading-relaxed text-text-secondary">{children}</div>
    </section>
  );
}

export default function Privacidad() {
  const mail = (
    <a href={`mailto:${EMAIL}`} className="text-accent underline underline-offset-4">
      {EMAIL}
    </a>
  );

  return (
    <>
      <Header />
      <main className="pt-[68px]">
        <article className="mx-auto max-w-3xl px-4 sm:px-6 py-14 md:py-20">
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-text-muted">Última actualización: {ACTUALIZADA}</p>
          <h1 className="mt-4 text-[clamp(2.2rem,5vw,3.4rem)] font-extrabold leading-[1.05] text-text-primary">
            Política de privacidad
          </h1>
          <p className="mt-6 text-[18px] leading-relaxed text-text-secondary">
            Acá te contamos qué datos tuyos juntamos, para qué los usamos y qué podés pedirnos. Vale para este sitio
            (nexoragrowth.es, con todas sus páginas) y para los formularios de nuestros anuncios.
          </p>

          <div className="mt-12 space-y-10">
            <Parte titulo="Quiénes somos">
              <p>
                Nexora es una agencia de La Plata, provincia de Buenos Aires, Argentina. Somos los responsables de los
                datos que nos dejás. Para cualquier consulta sobre tus datos, escribinos a {mail}.
              </p>
            </Parte>

            <Parte titulo="Qué datos juntamos">
              <p>Solo los que vos nos das:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Si completás un formulario nuestro, en este sitio o en un anuncio: tu nombre, tu WhatsApp o tu correo, y
                  lo que nos cuentes de tu negocio (a qué se dedica, cuántos son, qué te come más tiempo y cuándo lo
                  querés resolver).
                </li>
                <li>Si nos escribís por WhatsApp, Instagram o correo: tu nombre, tu contacto y lo que nos escribas.</li>
                <li>
                  Si agendás una llamada: los datos que cargues al reservar (nombre, correo y lo que quieras contarnos).
                </li>
              </ul>
              <p>
                No te pedimos datos de salud ni de tus clientes o pacientes. Si sos un consultorio, no nos mandes
                información de ningún paciente.
              </p>
            </Parte>

            <Parte titulo="Para qué los usamos">
              <ul className="list-disc pl-5 space-y-2">
                <li>Para contestarte y coordinar la llamada.</li>
                <li>Para preparar esa llamada y, si avanzamos, la propuesta para tu negocio.</li>
                <li>Para hacerte un seguimiento sobre lo que nos consultaste.</li>
              </ul>
              <p>No vendemos tus datos ni se los pasamos a nadie para que te ofrezca otra cosa.</p>
            </Parte>

            <Parte titulo="Quién más los ve">
              <p>
                Los ve el equipo de Nexora que atiende tu consulta. Para funcionar usamos servicios de terceros, que
                guardan o procesan datos por nosotros:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Vercel, donde está alojado este sitio.</li>
                <li>Meta (Facebook, Instagram y WhatsApp), si nos escribís por ahí o completás el formulario de un anuncio.</li>
                <li>Cal.com, si agendás la llamada desde el sitio.</li>
                <li>Las herramientas en las que ordenamos las consultas que recibimos.</li>
              </ul>
              <p>Algunos de esos servicios guardan la información fuera de la Argentina.</p>
            </Parte>

            <Parte titulo="Cookies y medición">
              <p>
                Hoy este sitio no usa cookies propias ni herramientas de publicidad o de medición. Como cualquier sitio,
                el servicio que lo aloja registra datos técnicos de cada visita (por ejemplo, la dirección IP y el
                navegador) para que funcione y sea seguro.
              </p>
              <p>
                Si agendás una llamada, la agenda la maneja Cal.com, que puede usar sus propias cookies. Si en algún
                momento sumamos herramientas de medición o de publicidad, lo vamos a contar en esta página antes de
                usarlas.
              </p>
            </Parte>

            <Parte titulo="Cuánto tiempo los guardamos">
              <p>
                Mientras haga falta para atender tu consulta y, si trabajamos juntos, mientras dure esa relación. Si nos
                pedís que los borremos antes, los borramos.
              </p>
            </Parte>

            <Parte titulo="Tus derechos">
              <p>
                Podés pedirnos ver los datos que tenemos tuyos, corregirlos, actualizarlos o borrarlos, escribiendo a{" "}
                {mail}. Te respondemos en los plazos que fija la Ley 25.326 de Protección de los Datos Personales.
              </p>
              <p>
                El titular de los datos personales tiene la facultad de ejercer el derecho de acceso a los mismos en forma
                gratuita a intervalos no inferiores a seis meses, salvo que se acredite un interés legítimo al efecto,
                conforme lo establecido en el artículo 14, inciso 3 de la Ley N° 25.326.
              </p>
              <p>
                La AGENCIA DE ACCESO A LA INFORMACIÓN PÚBLICA, en su carácter de Órgano de Control de la Ley N° 25.326,
                tiene la atribución de atender las denuncias y reclamos que interpongan quienes resulten afectados en sus
                derechos por incumplimiento de las normas vigentes en materia de protección de datos personales.
              </p>
            </Parte>

            <Parte titulo="Cambios en esta política">
              <p>
                Si cambiamos algo, lo publicamos en esta misma página con la fecha de la última actualización arriba de
                todo.
              </p>
            </Parte>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
