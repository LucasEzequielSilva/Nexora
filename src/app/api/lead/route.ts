import { NextResponse } from "next/server";

// Recibe el lead del formulario y lo reenvía al webhook del Growth Engine.
// La URL del webhook va en la env var GROWTH_ENGINE_WEBHOOK_URL (server-side).
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const whatsapp = (body.whatsapp || "").toString().trim();
    const email = (body.email || "").toString().trim();
    const tipo = (body.tipo || "").toString().trim();

    if (!whatsapp && !email) {
      return NextResponse.json({ ok: false, error: "Faltan datos de contacto" }, { status: 400 });
    }

    const payload = {
      whatsapp,
      email,
      segmento: tipo, // Clínica/consultorio · Otro negocio con turnos · Explorando
      source: "landing-caso-raquel",
      createdAt: new Date().toISOString(),
    };

    const url = process.env.GROWTH_ENGINE_WEBHOOK_URL;
    if (url) {
      const r = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!r.ok) {
        console.error("[lead] webhook respondió", r.status);
      }
    } else {
      // En dev / sin webhook configurado: solo logueamos para no romper el flujo.
      console.log("[lead] GROWTH_ENGINE_WEBHOOK_URL no seteado. Lead recibido:", payload);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[lead] error", e);
    return NextResponse.json({ ok: false, error: "Error del servidor" }, { status: 500 });
  }
}
