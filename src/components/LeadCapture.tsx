"use client";

import { useState } from "react";
import FadeUp from "./FadeUp";

export default function LeadCapture() {
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [tipo, setTipo] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!whatsapp.trim() && !email.trim()) return;
    setStatus("loading");
    try {
      const r = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ whatsapp, email, tipo }),
      });
      const j = await r.json();
      setStatus(j.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  const inputStyle =
    "w-full rounded-lg px-4 py-3 text-[14px] text-white outline-none transition-colors";
  const inputBg = {
    background: "rgba(0,0,0,0.3)",
    border: "1px solid rgba(255,255,255,0.1)",
  } as React.CSSProperties;

  return (
    <section className="mx-auto px-6 pb-24" style={{ maxWidth: "680px" }}>
      <FadeUp>
        <div
          className="rounded-2xl p-8 md:p-10"
          style={{
            background: "linear-gradient(135deg, #1a1a1e 0%, #16191f 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {status === "done" ? (
            <div className="text-center py-6">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-[20px]"
                style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)" }}
              >
                ✓
              </div>
              <h3 className="text-[20px] font-bold text-white mb-2">¡Listo!</h3>
              <p className="text-text-secondary text-[14px]">
                Te lo mandamos por WhatsApp en breve. Gracias por el interés.
              </p>
            </div>
          ) : (
            <>
              <div className="font-mono text-[11px] uppercase tracking-widest text-accent mb-3">
                ¿Querés ver más?
              </div>
              <h3 className="text-[clamp(20px,2.6vw,28px)] font-extrabold tracking-tight text-white mb-2 leading-tight">
                Mirá cómo lo construimos por dentro.
              </h3>
              <p className="text-text-secondary text-[14px] leading-relaxed mb-6">
                Te mostramos el detrás de escena del sistema — sin compromiso. Dejanos por dónde escribirte.
              </p>

              <form onSubmit={submit} className="flex flex-col gap-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="tel"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="WhatsApp"
                    className={inputStyle}
                    style={inputBg}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email (opcional)"
                    className={inputStyle}
                    style={inputBg}
                  />
                </div>

                <select
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  className={inputStyle}
                  style={{ ...inputBg, color: tipo ? "#fff" : "#71717a" }}
                >
                  <option value="">¿Qué tenés?</option>
                  <option value="clinica">Clínica / consultorio</option>
                  <option value="otro_turnos">Otro negocio con turnos</option>
                  <option value="explorando">Estoy explorando</option>
                </select>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="mt-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-[15px] font-bold text-black transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60 cursor-pointer"
                  style={{ background: "linear-gradient(to bottom, #22c55e, #16a34a)" }}
                >
                  {status === "loading" ? "Enviando…" : "Quiero verlo →"}
                </button>

                {status === "error" && (
                  <p className="text-[13px] text-red-400 text-center mt-1">
                    Hubo un error. Probá de nuevo en un momento.
                  </p>
                )}
              </form>
            </>
          )}
        </div>
      </FadeUp>
    </section>
  );
}
