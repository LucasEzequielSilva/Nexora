import type { Metadata } from "next";
import { cookies } from "next/headers";
import { hayAvisoPorWhatsapp } from "@/lib/diagnostico/aviso";
import { EQUIPO, URGENCIA, esCalificada, linkWhatsapp, textoDe } from "@/lib/diagnostico/consulta";
import { hayBase, resumenPorOrigen, ultimasConsultas, type FilaConsulta, type FilaResumen } from "@/lib/diagnostico/datos";
import { COOKIE_PANEL, RUTA_PANEL, claveConfigurada, diasDe, sesionValida } from "@/lib/diagnostico/panel";
import s from "../diagnostico.module.css";
import { probarAviso } from "./acciones";

/* Panel de /diagnostico, con clave: las consultas para escribirles y los conteos por anuncio.
   Meta mide el creativo (clics, costo por visita); acá se mide la oferta (de las visitas, cuántas
   mandan el formulario). Muestra producción; con ?ver=todo suma lo que se probó en vistas previas. */

export const metadata: Metadata = { title: "Panel del diagnóstico — Nexora" };

type Params = Record<string, string | string[] | undefined>;

const fecha = (iso: string) =>
  new Date(iso).toLocaleString("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires",
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

const porcentaje = (a: number, b: number) => (b ? `${Math.round((a / b) * 100)}%` : "—");

const RESULTADO_AVISO: Record<string, string> = {
  ok: "Mandé el aviso de prueba. Si en un minuto no te llegó, que Lucas revise la conexión del número.",
  error: "No se pudo mandar el aviso. Puede que el número se haya desconectado: que Lucas lo vuelva a conectar.",
  falta: "Faltan variables del aviso en Vercel.",
  espera: "Probaste varias veces seguidas. Esperá unos minutos.",
};

function AvisoWhatsapp({ resultado }: { resultado: string }) {
  const configurado = hayAvisoPorWhatsapp();
  return (
    <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-white/[0.08] bg-[#0b101b] px-4 py-3 text-[14px]">
      <span className="text-[#a7b0c0]">
        {configurado
          ? "Aviso por WhatsApp: configurado."
          : "Aviso por WhatsApp: sin configurar. Faltan las variables DIAGNOSTICO_EVOLUTION_* y DIAGNOSTICO_AVISO_A en Vercel."}
      </span>
      {configurado && (
        <form action={probarAviso}>
          <button type="submit" className="text-[#00e676] underline underline-offset-2">
            Mandarme uno de prueba
          </button>
        </form>
      )}
      {RESULTADO_AVISO[resultado] && <p className="w-full text-[#f3f5f9]">{RESULTADO_AVISO[resultado]}</p>}
    </div>
  );
}

/* Qué está cargado en Vercel para la página: así se ve sin abrir la landing. */
function Configuracion() {
  const cal = Boolean(process.env.DIAGNOSTICO_CAL);
  const video = Boolean(process.env.DIAGNOSTICO_VIDEO);
  return (
    <p className="mt-3 text-[14px] text-[#a7b0c0]">
      Agenda: {cal ? "configurada." : "sin configurar (DIAGNOSTICO_CAL): les escribe Valentino."} Video:{" "}
      {video ? "cargado." : "sin video (DIAGNOSTICO_VIDEO): la página sale sin ese lugar."}
    </p>
  );
}

function Marco({ children }: { children: React.ReactNode }) {
  return <main className="mx-auto max-w-[1120px] px-5 py-10 sm:px-8">{children}</main>;
}

function Aviso({ children }: { children: React.ReactNode }) {
  return (
    <Marco>
      <h1 className="text-[26px] font-extrabold">Panel del diagnóstico</h1>
      <p className="mt-4 max-w-[60ch] text-[16px] leading-relaxed text-[#a7b0c0]">{children}</p>
    </Marco>
  );
}

function Ingreso({ error }: { error: string }) {
  return (
    <Marco>
      <form method="post" action="/api/diagnostico/panel" className="mx-auto mt-10 flex max-w-[380px] flex-col gap-4">
        <h1 className="text-[26px] font-extrabold">Panel del diagnóstico</h1>
        <label htmlFor="clave" className="text-[15px] text-[#a7b0c0]">
          Clave
        </label>
        <input id="clave" name="clave" type="password" autoComplete="current-password" required className={s.campo} />
        {error && (
          <p role="alert" className="text-[14px] text-[#ff8a8a]">
            {error === "2" ? "Muchos intentos seguidos. Esperá unos minutos." : "La clave no es correcta."}
          </p>
        )}
        <button type="submit" className={s.boton}>
          Entrar
        </button>
      </form>
    </Marco>
  );
}

function Filtro({ href, activo, children }: { href: string; activo: boolean; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-current={activo ? "page" : undefined}
      className={`rounded-full border px-3 py-1.5 text-[14px] ${activo ? "border-[#00e676] bg-[#00e676]/10 text-[#f3f5f9]" : "border-white/[0.12] text-[#a7b0c0] hover:border-white/25"}`}
    >
      {children}
    </a>
  );
}

function Tarjeta({ titulo, valor, nota }: { titulo: string; valor: string | number; nota?: string }) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#0b101b] p-4">
      <p className="text-[13px] text-[#7c869a]">{titulo}</p>
      <p className="mt-1 text-[26px] font-bold">{valor}</p>
      {nota && <p className="mt-1 text-[12px] text-[#7c869a]">{nota}</p>}
    </div>
  );
}

function Consulta({ c }: { c: FilaConsulta }) {
  const link = linkWhatsapp(c.whatsapp);
  return (
    <li className="rounded-xl border border-white/[0.08] bg-[#0b101b] p-4">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-[#7c869a]">
        <span className="font-bold text-[#f3f5f9]">{c.codigo}</span>
        <span>{fecha(c.creado)}</span>
        <span className="break-all">{c.origen}</span>
        {c.entorno !== "production" && <span className="rounded bg-white/10 px-1.5 text-[#f3f5f9]">prueba ({c.entorno})</span>}
      </div>
      <p className="mt-2 text-[16px] font-bold">
        {c.nombre} ·{" "}
        {link ? (
          <a href={link} target="_blank" rel="noopener noreferrer" className="text-[#00e676] underline underline-offset-2">
            {c.whatsapp}
          </a>
        ) : (
          <span>{c.whatsapp}</span>
        )}
      </p>
      <p className="mt-1 text-[15px] text-[#a7b0c0]">
        {c.negocio} · equipo: {textoDe(EQUIPO, c.equipo)}
      </p>
      <p className="mt-2 text-[15px] leading-relaxed">{c.dolor}</p>
      <p className="mt-2 text-[14px]">
        <span
          className={`rounded-full px-2 py-0.5 ${esCalificada(c) ? "bg-[#00e676]/15 text-[#00e676]" : "bg-white/[0.06] text-[#a7b0c0]"}`}
        >
          {textoDe(URGENCIA, c.urgencia)}
        </span>
      </p>
    </li>
  );
}

export default async function Panel({ searchParams }: { searchParams: Promise<Params> }) {
  const sp = await searchParams;
  if (!claveConfigurada()) {
    return <Aviso>Falta configurar la variable DIAGNOSTICO_PANEL_CLAVE en Vercel, de 12 caracteres o más.</Aviso>;
  }
  const jar = await cookies();
  if (!sesionValida(jar.get(COOKIE_PANEL)?.value)) {
    return <Ingreso error={typeof sp.error === "string" ? sp.error : ""} />;
  }
  if (!hayBase()) {
    return <Aviso>Falta configurar la variable DATABASE_URL en Vercel: sin base, las consultas no se guardan.</Aviso>;
  }

  const dias = diasDe(sp.dias);
  const todo = sp.ver === "todo";
  let resumen: FilaResumen[];
  let consultas: FilaConsulta[];
  try {
    [resumen, consultas] = await Promise.all([resumenPorOrigen(dias, todo), ultimasConsultas(dias, todo, 100)]);
  } catch (e) {
    console.error("[diagnostico] panel", e instanceof Error ? e.message : e);
    return <Aviso>No se pudo leer la base. Probá de nuevo en un rato.</Aviso>;
  }

  const total = resumen.reduce(
    (t, f) => ({
      visitas: t.visitas + f.visitas,
      videos: t.videos + f.videos,
      inicios: t.inicios + f.inicios,
      envios: t.envios + f.envios,
      calificadas: t.calificadas + f.calificadas,
      proximos: t.proximos + f.proximos,
      agendaron: t.agendaron + f.agendaron,
      whatsapp: t.whatsapp + f.whatsapp,
    }),
    { visitas: 0, videos: 0, inicios: 0, envios: 0, calificadas: 0, proximos: 0, agendaron: 0, whatsapp: 0 },
  );
  const url = (d: number, t: boolean) => `${RUTA_PANEL}?dias=${d}${t ? "&ver=todo" : ""}`;

  return (
    <Marco>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-[26px] font-extrabold">Panel del diagnóstico</h1>
        <form method="post" action="/api/diagnostico/panel">
          <input type="hidden" name="accion" value="salir" />
          <button type="submit" className="text-[14px] text-[#a7b0c0] underline underline-offset-2 hover:text-[#f3f5f9]">
            Salir
          </button>
        </form>
      </div>

      <AvisoWhatsapp resultado={typeof sp.aviso === "string" ? sp.aviso : ""} />
      <Configuracion />

      <div className="mt-5 flex flex-wrap gap-2">
        {[7, 30, 90].map((d) => (
          <Filtro key={d} href={url(d, todo)} activo={dias === d}>
            Últimos {d} días
          </Filtro>
        ))}
        <Filtro href={url(dias, !todo)} activo={todo}>
          {todo ? "Con vistas previas" : "Sumar vistas previas"}
        </Filtro>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Tarjeta titulo="Visitas" valor={total.visitas} />
        <Tarjeta titulo="Vieron el video" valor={total.videos} nota={`${porcentaje(total.videos, total.visitas)} de las visitas`} />
        <Tarjeta titulo="Empezaron el formulario" valor={total.inicios} nota={porcentaje(total.inicios, total.visitas)} />
        <Tarjeta titulo="Lo mandaron" valor={total.envios} nota={`${porcentaje(total.envios, total.visitas)} de las visitas`} />
        <Tarjeta titulo={'Dijeron "Ahora"'} valor={total.calificadas} nota="calificadas, provisorio" />
        <Tarjeta titulo="Próximos meses" valor={total.proximos} />
        <Tarjeta titulo="Agendaron" valor={total.agendaron} nota={`${porcentaje(total.agendaron, total.calificadas)} de las que dijeron "Ahora"`} />
        <Tarjeta titulo="Clics a WhatsApp" valor={total.whatsapp} />
      </div>

      <h2 className="mt-10 text-[20px] font-bold">Por anuncio</h2>
      <p className="mt-1 text-[14px] text-[#7c869a]">
        El origen es el nombre del anuncio (utm_content); si no vino de uno, la fuente y el medio del link.
      </p>
      <div className="mt-4 overflow-x-auto rounded-xl border border-white/[0.08]">
        <table className="w-full min-w-[860px] text-left text-[14px]">
          <thead className="bg-white/[0.03] text-[#7c869a]">
            <tr>
              <th className="px-3 py-2 font-medium">Origen</th>
              <th className="px-3 py-2 text-right font-medium">Visitas</th>
              <th className="px-3 py-2 text-right font-medium">Video</th>
              <th className="px-3 py-2 text-right font-medium">Empezaron</th>
              <th className="px-3 py-2 text-right font-medium">Mandaron</th>
              <th className="px-3 py-2 text-right font-medium">% envío</th>
              <th className="px-3 py-2 text-right font-medium">Ahora</th>
              <th className="px-3 py-2 text-right font-medium">Próx. meses</th>
              <th className="px-3 py-2 text-right font-medium">Agendaron</th>
              <th className="px-3 py-2 text-right font-medium">WhatsApp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.06]">
            {resumen.length === 0 && (
              <tr>
                <td colSpan={10} className="px-3 py-4 text-[#7c869a]">
                  Todavía no hay visitas en este período.
                </td>
              </tr>
            )}
            {resumen.map((f) => (
              <tr key={f.origen}>
                <td className="max-w-[320px] break-words px-3 py-2">{f.origen}</td>
                <td className="px-3 py-2 text-right">{f.visitas}</td>
                <td className="px-3 py-2 text-right">{f.videos}</td>
                <td className="px-3 py-2 text-right">{f.inicios}</td>
                <td className="px-3 py-2 text-right">{f.envios}</td>
                <td className="px-3 py-2 text-right">{porcentaje(f.envios, f.visitas)}</td>
                <td className="px-3 py-2 text-right">{f.calificadas}</td>
                <td className="px-3 py-2 text-right">{f.proximos}</td>
                <td className="px-3 py-2 text-right">{f.agendaron}</td>
                <td className="px-3 py-2 text-right">{f.whatsapp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 text-[20px] font-bold">Consultas</h2>
      <p className="mt-1 text-[14px] text-[#7c869a]">
        Las últimas 100 del período. Son datos personales: no se sacan capturas ni se copian fuera de acá.
      </p>
      {consultas.length === 0 ? (
        <p className="mt-4 text-[15px] text-[#a7b0c0]">Todavía no hay consultas en este período.</p>
      ) : (
        <ul className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2">
          {consultas.map((c) => (
            <Consulta key={c.codigo} c={c} />
          ))}
        </ul>
      )}
    </Marco>
  );
}
