import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import {
  ESQUEMA_RESPUESTA,
  horariosLibres,
  hoyTexto,
  perfilActivo,
  reglas,
  type Ficha,
  type RespuestaAsistente,
} from "@/lib/prueba/perfil";

// Asistente de prueba para que socios y clientes lo prueben sin cuenta propia.
// Env vars (server-side):
//   ANTHROPIC_API_KEY  clave de la API de Claude de Nexora
//   PRUEBA_CODIGOS     accesos "nombre:codigo,nombre2:codigo2"
//   PRUEBA_MODELO      opcional, por defecto claude-opus-5-5
//   PRUEBA_ESFUERZO    opcional: low | medium | high (por defecto low, para chat)
//   PRUEBA_PERFIL      opcional, JSON con los datos reales del estudio
//   PRUEBA_WEBHOOK_URL opcional, recibe cada intercambio (por ejemplo, n8n → planilla)

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_MENSAJES = 40;
const MAX_LARGO = 600;
const LIMITE_VENTANA = 20; // mensajes por código cada 10 minutos
const VENTANA_MS = 10 * 60 * 1000;
const uso = new Map<string, number[]>(); // por instancia: alcanza como freno, no como cuota exacta

type Turno = { rol: "cliente" | "asistente"; texto: string };

function accesos() {
  const out = new Map<string, string>();
  for (const par of (process.env.PRUEBA_CODIGOS || "").split(",")) {
    const [nombre, codigo] = par.split(":").map((x) => x?.trim());
    if (nombre && codigo) out.set(codigo, nombre);
  }
  return out;
}

function limitado(codigo: string) {
  const ahora = Date.now();
  const recientes = (uso.get(codigo) || []).filter((t) => ahora - t < VENTANA_MS);
  if (recientes.length >= LIMITE_VENTANA) {
    uso.set(codigo, recientes);
    return true;
  }
  recientes.push(ahora);
  uso.set(codigo, recientes);
  return false;
}

const texto = (v: unknown, n: number) => (typeof v === "string" ? v.trim().slice(0, n) : "");

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const lista = accesos();
  if (!lista.size || !process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ ok: false, error: "La prueba todavía no está configurada." }, { status: 503 });
  }
  const codigo = texto(body.codigo, 80);
  const quien = lista.get(codigo);
  if (!quien) {
    return NextResponse.json({ ok: false, error: "El código de acceso no es válido." }, { status: 401 });
  }
  if (body.soloValidar === true) return NextResponse.json({ ok: true, quien });

  const turnos: Turno[] = (Array.isArray(body.mensajes) ? body.mensajes : [])
    .map((m: { rol?: unknown; texto?: unknown }) => ({
      rol: m?.rol === "asistente" ? "asistente" : "cliente",
      texto: texto(m?.texto, MAX_LARGO * 2),
    }))
    .filter((m: Turno) => m.texto)
    .slice(-MAX_MENSAJES);
  const ultimo = turnos[turnos.length - 1];
  if (!ultimo || ultimo.rol !== "cliente" || ultimo.texto.length > MAX_LARGO) {
    return NextResponse.json({ ok: false, error: "Mandá un mensaje de hasta 600 caracteres." }, { status: 400 });
  }
  if (limitado(codigo)) {
    return NextResponse.json({ ok: false, error: "Muchos mensajes seguidos. Esperá unos minutos y seguí." }, { status: 429 });
  }

  const perfil = perfilActivo();
  const ocupados: string[] = (Array.isArray(body.ocupados) ? body.ocupados : []).map((x: unknown) => texto(x, 20)).slice(0, 20);
  const libres = horariosLibres(perfil, ocupados);
  const ficha = body.ficha && typeof body.ficha === "object" ? (body.ficha as Partial<Ficha>) : {};
  const reunion = texto(body.reunion, 80);
  const primerMensaje = !turnos.some((t) => t.rol === "asistente");

  const estado = [
    `HOY: ${hoyTexto()}`,
    `HORARIOS LIBRES (ofrecé solo estos):\n${libres.map((h) => `- ${h.id}: ${h.texto}`).join("\n") || "(no hay horarios libres: ofrecé que una persona coordine)"}`,
    `FICHA ACTUAL DEL CONTACTO: ${JSON.stringify(ficha)}`,
    reunion ? `YA TIENE REUNIÓN: ${reunion}` : "",
    primerMensaje ? "Es el PRIMER mensaje del asistente en esta conversación: incluí el aviso breve." : "",
  ].filter(Boolean).join("\n\n");

  const messages: Anthropic.Beta.BetaMessageParam[] = turnos.map((t) => ({
    role: t.rol === "cliente" ? "user" : "assistant",
    content: t.texto,
  }));
  if (messages[0]?.role !== "user") messages.shift();

  const client = new Anthropic();
  let salida: RespuestaAsistente | null = null;
  try {
    const r = await client.beta.messages.create({
      model: process.env.PRUEBA_MODELO || "claude-opus-5-5",
      max_tokens: 4000,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      system: [
        { type: "text", text: reglas(perfil), cache_control: { type: "ephemeral" } },
        { type: "text", text: estado },
      ],
      messages,
      output_config: {
        effort: (["low", "medium", "high"].includes(process.env.PRUEBA_ESFUERZO || "") ? process.env.PRUEBA_ESFUERZO : "low") as "low" | "medium" | "high",
        format: { type: "json_schema", schema: ESQUEMA_RESPUESTA as unknown as Record<string, unknown> },
      },
    });
    if (r.stop_reason === "refusal") {
      salida = {
        mensajes: [`Gracias por escribir. Te paso con ${perfil.derivarA} para que lo vea.`],
        ficha: { nombre: "", actividad: "", condicion_iva: "", facturacion: "", tiene_contador: "", servicio: "" },
        horarios_ofrecidos: [], agendar: "", derivar: "El asistente no pudo responder este mensaje", cliente_actual: false,
      };
    } else {
      const bloque = r.content.find((b) => b.type === "text");
      salida = bloque && bloque.type === "text" ? (JSON.parse(bloque.text) as RespuestaAsistente) : null;
    }
  } catch (e) {
    if (e instanceof Anthropic.RateLimitError) {
      return NextResponse.json({ ok: false, error: "El asistente está con mucha demanda. Probá en un minuto." }, { status: 429 });
    }
    if (e instanceof Anthropic.APIError) {
      console.error("[prueba] error de la API", e.status, e.message);
      return NextResponse.json({ ok: false, error: "El asistente no respondió. Volvé a mandar el mensaje." }, { status: 502 });
    }
    console.error("[prueba] error", e);
    return NextResponse.json({ ok: false, error: "El asistente no respondió. Volvé a mandar el mensaje." }, { status: 500 });
  }
  if (!salida || !Array.isArray(salida.mensajes) || !salida.mensajes.length) {
    return NextResponse.json({ ok: false, error: "El asistente no respondió. Volvé a mandar el mensaje." }, { status: 502 });
  }

  const porId = new Map(libres.map((h) => [h.id, h]));
  const respuesta = {
    ok: true,
    mensajes: salida.mensajes.map((m) => texto(m, 1200)).filter(Boolean).slice(0, 3),
    ficha: salida.ficha,
    ofrecidos: (salida.horarios_ofrecidos || []).map((id) => porId.get(id)).filter(Boolean).slice(0, 4),
    agendado: porId.get(salida.agendar) || null,
    derivar: texto(salida.derivar, 160),
    clienteActual: salida.cliente_actual === true,
  };

  const webhook = process.env.PRUEBA_WEBHOOK_URL;
  if (webhook) {
    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ origen: "prueba-asistente", quien, estudio: perfil.estudio, conversacion: turnos, respuesta, at: new Date().toISOString() }),
      signal: AbortSignal.timeout(3000),
    }).catch((e) => console.error("[prueba] webhook", e));
  }

  return NextResponse.json(respuesta);
}
