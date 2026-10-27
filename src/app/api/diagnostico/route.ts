import { NextResponse } from "next/server";
import { EQUIPO, URGENCIA, esCalificada, textoDe, validarConsulta } from "@/lib/diagnostico/consulta";
import { entorno, guardarConsulta, hayBase } from "@/lib/diagnostico/datos";
import { origenDeCuerpo } from "@/lib/diagnostico/origen";
import { ipDe, limitado, mismoSitio } from "@/lib/diagnostico/pedido";

// Recibe la consulta del formulario de /diagnostico y la guarda con un código.
// Env vars (server-side):
//   DATABASE_URL           base Neon donde quedan las consultas (obligatoria)
//   DIAGNOSTICO_AVISO_URL  opcional, recibe cada consulta para avisarle a quien atiende.
//                          La conecta Lucas con el OK de Cogne: nunca al Portal ni a un flujo
//                          que le escriba solo a la persona.

export const runtime = "nodejs";

const NO_SE_GUARDO = "No pudimos guardar tu consulta. Probá de nuevo en un rato.";

export async function POST(req: Request) {
  if (!mismoSitio(req)) {
    return NextResponse.json({ ok: false, error: "Pedido no válido." }, { status: 403 });
  }
  if (limitado(`consulta:${ipDe(req)}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json(
      { ok: false, error: "Ya recibimos varias consultas seguidas. Esperá unos minutos y probá de nuevo." },
      { status: 429 },
    );
  }

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "Pedido no válido." }, { status: 400 });
  }
  // Campo trampa: una persona no lo ve ni lo completa.
  if (typeof body.sitio === "string" && body.sitio.trim()) return NextResponse.json({ ok: true, codigo: "" });

  const v = validarConsulta(body);
  if (!v.ok) return NextResponse.json({ ok: false, error: v.error }, { status: 400 });

  if (!hayBase()) {
    console.error("[diagnostico] falta DATABASE_URL: la consulta no se guardó");
    return NextResponse.json({ ok: false, error: NO_SE_GUARDO }, { status: 503 });
  }

  const origen = origenDeCuerpo(body.origen);
  let guardada: { codigo: string; creado: string };
  try {
    guardada = await guardarConsulta(v.consulta, origen);
  } catch (e) {
    console.error("[diagnostico] no se guardó", e instanceof Error ? e.message : e);
    return NextResponse.json({ ok: false, error: NO_SE_GUARDO }, { status: 500 });
  }

  const aviso = process.env.DIAGNOSTICO_AVISO_URL;
  if (aviso) {
    const c = v.consulta;
    await fetch(aviso, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        origen: "landing-diagnostico",
        entorno: entorno(),
        codigo: guardada.codigo,
        creado: guardada.creado,
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
    }).catch((e) => console.error("[diagnostico] aviso", e instanceof Error ? e.message : e));
  }

  return NextResponse.json({ ok: true, codigo: guardada.codigo });
}
