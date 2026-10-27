import { NextResponse } from "next/server";
import { COOKIE_PANEL, RUTA_PANEL, claveValida, firmaDelPanel } from "@/lib/diagnostico/panel";
import { ipDe, limitado, mismoSitio } from "@/lib/diagnostico/pedido";

// Entrar y salir del panel de /diagnostico (formulario con la clave DIAGNOSTICO_PANEL_CLAVE).

export const runtime = "nodejs";

export async function POST(req: Request) {
  const volver = (q = "") => NextResponse.redirect(new URL(`${RUTA_PANEL}${q}`, req.url), 303);
  const form = await req.formData().catch(() => null);

  if (form?.get("accion") === "salir") {
    const r = volver();
    r.cookies.set(COOKIE_PANEL, "", { path: RUTA_PANEL, maxAge: 0 });
    return r;
  }

  if (!mismoSitio(req)) return volver("?error=1");
  if (limitado(`panel:${ipDe(req)}`, 8, 15 * 60 * 1000)) return volver("?error=2");
  const dada = form?.get("clave");
  if (typeof dada !== "string" || !claveValida(dada)) return volver("?error=1");

  const r = volver();
  r.cookies.set(COOKIE_PANEL, firmaDelPanel(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: RUTA_PANEL,
    maxAge: 60 * 60 * 24 * 30,
  });
  return r;
}
