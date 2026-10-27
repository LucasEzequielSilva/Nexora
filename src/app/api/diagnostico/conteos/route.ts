import { NextResponse } from "next/server";
import { hayBase, resumenPorOrigen } from "@/lib/diagnostico/datos";
import { anguloDe } from "@/lib/diagnostico/origen";
import { claveValida, diasDe } from "@/lib/diagnostico/panel";
import { ipDe, limitado } from "@/lib/diagnostico/pedido";

// Conteos de /diagnostico por origen para el juez de la Marketing Machine: solo números, sin datos
// personales y solo de producción. GET /api/diagnostico/conteos?dias=7
// con el encabezado Authorization: Bearer <DIAGNOSTICO_PANEL_CLAVE>.

export const runtime = "nodejs";

export async function GET(req: Request) {
  if (limitado(`conteos:${ipDe(req)}`, 30, 15 * 60 * 1000)) {
    return NextResponse.json({ ok: false, error: "Demasiados pedidos" }, { status: 429 });
  }
  const auth = req.headers.get("authorization") || "";
  if (!claveValida(auth.startsWith("Bearer ") ? auth.slice(7) : "")) {
    return NextResponse.json({ ok: false, error: "Sin acceso" }, { status: 401 });
  }
  if (!hayBase()) return NextResponse.json({ ok: false, error: "Falta DATABASE_URL" }, { status: 503 });

  const dias = diasDe(new URL(req.url).searchParams.get("dias"));
  try {
    const filas = await resumenPorOrigen(dias, false);
    return NextResponse.json(
      {
        ok: true,
        dias,
        entorno: "production",
        generado: new Date().toISOString(),
        calificada: "dijo 'Ahora' (provisorio: el calificado real lo marca Cogne)",
        origenes: filas.map((f) => ({ ...f, angulo: anguloDe(f.origen) })),
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (e) {
    console.error("[diagnostico] conteos", e instanceof Error ? e.message : e);
    return NextResponse.json({ ok: false, error: "No se pudo leer la base" }, { status: 500 });
  }
}
