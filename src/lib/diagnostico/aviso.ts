import { EQUIPO, URGENCIA, esCalificada, linkWhatsapp, textoDe, type Consulta } from "./consulta";
import { consultasDeLaUltimaHora, entorno } from "./datos";
import { etiquetaDe, type Origen } from "./origen";
import { RUTA_PANEL } from "./panel";

/* Aviso a quien atiende cada vez que entra una consulta de /diagnostico. Le escribe solo a Nexora,
   nunca a la persona que dejó la consulta. Env vars (server-side, todas opcionales):
     DIAGNOSTICO_EVOLUTION_URL        servidor de Evolution (v2) donde está conectado por QR el número de Nexora
     DIAGNOSTICO_EVOLUTION_INSTANCIA  la conexión del número de Nexora en ese servidor (nunca la de Raquel)
     DIAGNOSTICO_EVOLUTION_CLAVE      la clave de esa conexión sola, no la general del servidor
     DIAGNOSTICO_AVISO_A              quién recibe el aviso: 549, característica y número, solo dígitos
     DIAGNOSTICO_AVISO_URL            además, un webhook que recibe la consulta entera. La conecta Lucas
                                      con el OK de Cogne: nunca al Portal ni a un flujo que le escriba a la persona.
   El número va por QR, que no es la vía oficial, así que se cuida: si entran más de TOPE_POR_HORA
   consultas en una hora, manda un solo mensaje para mirar el panel y deja de avisar hasta que baje. */

const TOPE_POR_HORA = 10;

type Whatsapp = { url: string; instancia: string; clave: string; destino: string };

function configWhatsapp(): Whatsapp | null {
  const url = (process.env.DIAGNOSTICO_EVOLUTION_URL || "").trim().replace(/\/+$/, "");
  const instancia = (process.env.DIAGNOSTICO_EVOLUTION_INSTANCIA || "").trim();
  const clave = (process.env.DIAGNOSTICO_EVOLUTION_CLAVE || "").trim();
  const destino = (process.env.DIAGNOSTICO_AVISO_A || "").replace(/\D/g, "");
  // La clave viaja en un encabezado: solo por https, salvo un servidor en la misma máquina para probar.
  const seguro = /^https:\/\/[^/]/i.test(url) || /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?(\/|$)/i.test(url);
  if (!seguro || !instancia || !clave || destino.length < 10 || destino.length > 15) return null;
  return { url, instancia, clave, destino };
}

export const hayAvisoPorWhatsapp = () => configWhatsapp() !== null;

export type ResultadoAviso = "ok" | "falta" | "error";

export async function mandarWhatsapp(texto: string): Promise<ResultadoAviso> {
  const w = configWhatsapp();
  if (!w) return "falta";
  try {
    const r = await fetch(`${w.url}/message/sendText/${encodeURIComponent(w.instancia)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: w.clave },
      body: JSON.stringify({ number: w.destino, text: texto, linkPreview: false }),
      signal: AbortSignal.timeout(8000),
    });
    if (r.ok) return "ok";
    console.error("[diagnostico] aviso por WhatsApp: Evolution respondió", r.status);
  } catch (e) {
    console.error("[diagnostico] aviso por WhatsApp", e instanceof Error ? e.message : e);
  }
  return "error";
}

const marcaDePrueba = () => (entorno() === "production" ? "" : `PRUEBA (${entorno()}) · `);

/* El link al panel apunta al dominio de producción; en una vista previa, a esa misma vista previa. */
export function linkAlPanel(req: Request) {
  const produccion = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const base = entorno() === "production" && produccion ? `https://${produccion}` : new URL(req.url).origin;
  return `${base}${RUTA_PANEL}`;
}

type Entrada = { consulta: Consulta; codigo: string; creado: string; origen: Origen; panel: string };

export function textoDelAviso({ consulta: c, codigo, origen, panel }: Entrada) {
  const urgencia = textoDe(URGENCIA, c.urgencia);
  const link = linkWhatsapp(c.whatsapp);
  return [
    `*${marcaDePrueba()}Consulta nueva ${codigo}*`,
    `${c.nombre} · ${c.negocio}`,
    `Lo quiere resolver: ${esCalificada(c) ? `*${urgencia}*` : urgencia}`,
    `Vino de: ${etiquetaDe(origen)}`,
    "",
    link ? `Escribile: ${link}` : `Su WhatsApp: ${c.whatsapp}`,
    `Panel: ${panel}`,
  ].join("\n");
}

export const textoDePrueba = () =>
  [`*${marcaDePrueba()}Prueba del aviso de /diagnostico*`, "Si te llegó, cada consulta nueva te va a llegar así."].join("\n");

async function avisarPorWhatsapp(e: Entrada) {
  if (!hayAvisoPorWhatsapp()) return;
  // Si no se puede contar, avisa igual: perder un aviso es peor que mandar uno de más.
  const enLaHora = await consultasDeLaUltimaHora().catch(() => 0);
  if (enLaHora > TOPE_POR_HORA + 1) return;
  const texto =
    enLaHora === TOPE_POR_HORA + 1
      ? [
          `*${marcaDePrueba()}Entraron más de ${TOPE_POR_HORA} consultas en la última hora*`,
          "Para cuidar el número, no aviso más hasta que baje el ritmo. Están todas en el panel:",
          e.panel,
        ].join("\n")
      : textoDelAviso(e);
  await mandarWhatsapp(texto);
}

async function avisarPorWebhook({ consulta: c, codigo, creado, origen }: Entrada) {
  const url = process.env.DIAGNOSTICO_AVISO_URL;
  if (!url) return;
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      origen: "landing-diagnostico",
      entorno: entorno(),
      codigo,
      creado,
      calificada: esCalificada(c),
      nombre: c.nombre,
      whatsapp: c.whatsapp,
      negocio: c.negocio,
      equipo: textoDe(EQUIPO, c.equipo),
      dolor: c.dolor,
      urgencia: textoDe(URGENCIA, c.urgencia),
      anuncio: origen.anuncio,
    }),
    signal: AbortSignal.timeout(3000),
  }).catch((e) => console.error("[diagnostico] aviso por webhook", e instanceof Error ? e.message : e));
}

/* Corre después de responderle a la persona (after), así el formulario no espera al aviso. */
export async function avisar(e: Entrada) {
  await Promise.all([avisarPorWhatsapp(e), avisarPorWebhook(e)]);
}
