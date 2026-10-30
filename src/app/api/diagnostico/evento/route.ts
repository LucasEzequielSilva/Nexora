import { NextResponse } from "next/server";
import { TIPOS_EVENTO, hayBase, registrarEvento } from "@/lib/diagnostico/datos";
import { limpio, origenDeCuerpo } from "@/lib/diagnostico/origen";
import { ipDe, limitado, mismoSitio } from "@/lib/diagnostico/pedido";

// Cuenta los pasos de /diagnostico (visita, play del video, inicio del formulario, reserva en la
// agenda, clic a WhatsApp) por origen.
// Los envíos no pasan por acá: salen de las consultas guardadas. Sin DATABASE_URL no cuenta nada.

export const runtime = "nodejs";

const ROBOTS = /bot|crawl|spider|preview|facebookexternalhit|headless/i;

const sinCuerpo = (status: number) => new NextResponse(null, { status });

export async function POST(req: Request) {
  if (!mismoSitio(req)) return sinCuerpo(403);
  if (ROBOTS.test(req.headers.get("user-agent") || "")) return sinCuerpo(204);
  if (limitado(`evento:${ipDe(req)}`, 60, 10 * 60 * 1000)) return sinCuerpo(429);

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(await req.text());
  } catch {
    return sinCuerpo(400);
  }
  const tipo = TIPOS_EVENTO.find((t) => t === body?.tipo);
  if (!tipo) return sinCuerpo(400);
  if (!hayBase()) return sinCuerpo(204);

  const host = limpio(body.referente, 100);
  try {
    await registrarEvento(tipo, origenDeCuerpo(body.origen), /^[a-z0-9.-]+$/i.test(host) ? host : "");
  } catch (e) {
    console.error("[diagnostico] evento", e instanceof Error ? e.message : e);
    return sinCuerpo(500);
  }
  return sinCuerpo(204);
}
