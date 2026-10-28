import { after, NextResponse } from "next/server";
import { avisar, linkAlPanel } from "@/lib/diagnostico/aviso";
import { validarConsulta } from "@/lib/diagnostico/consulta";
import { guardarConsulta, hayBase } from "@/lib/diagnostico/datos";
import { origenDeCuerpo } from "@/lib/diagnostico/origen";
import { ipDe, limitado, mismoSitio } from "@/lib/diagnostico/pedido";

// Recibe la consulta del formulario de /diagnostico, la guarda con un código y avisa.
// Env vars (server-side):
//   DATABASE_URL  base Neon donde quedan las consultas (obligatoria)
//   El aviso por WhatsApp y el webhook son opcionales: sus variables están en lib/diagnostico/aviso.ts.

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

  const panel = linkAlPanel(req);
  after(() => avisar({ consulta: v.consulta, codigo: guardada.codigo, creado: guardada.creado, origen, panel }));

  return NextResponse.json({ ok: true, codigo: guardada.codigo });
}
