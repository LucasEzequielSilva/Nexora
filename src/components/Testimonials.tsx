"use client";

import FadeUp from "./FadeUp";
import CardTexture from "./CardTexture";

const beneficios = [
  { t: "Agenda sola, 24/7", s: "El asistente responde y agenda incluso fuera de horario — no se pierde el cliente que escribe a la noche." },
  { t: "Menos ausencias", s: "Recuerda y confirma cada turno solo, 24h y 2h antes." },
  { t: "Recepción liberada", s: "Todo cae ordenado en su sistema de gestión, sin cargar nada a mano." },
  { t: "Reprograma sin fricción", s: "El cliente pide otro día y la agenda se reacomoda sola." },
  { t: "La encuentran en Google", s: "Web propia con SEO local — más clientes nuevos." },
];

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <span className="font-mono text-[11px] uppercase tracking-widest text-accent">{children}</span>
      <span className="h-px flex-1 bg-accent opacity-20" />
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="mx-auto px-6 pb-24" style={{ maxWidth: "1040px" }}>
      <FadeUp>
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="h-px w-8 bg-accent opacity-50" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-accent">Prueba real</span>
            <span className="h-px w-8 bg-accent opacity-50" />
          </div>
          <h2 className="text-[clamp(24px,2.6vw,30px)] font-extrabold tracking-tight mb-4 leading-tight">
            Hechos. No promesas.
          </h2>
          <p className="text-text-secondary text-base max-w-xl mx-auto">
            Un negocio real que ya lo tiene andando: la <strong className="text-white font-semibold">Dra. Raquel Rodríguez</strong> — ortodoncia en Jujuy. Le hicimos la web y el sistema: agenda solo, confirma los turnos solo, y la encuentran en Google.
          </p>
        </div>
      </FadeUp>

      {/* Card protagonista: lo que el negocio de Raquel tiene andando hoy */}
      <FadeUp delay={0.1}>
        <div className="max-w-[760px] mx-auto mb-10">
          <Label>Lo que gana el negocio</Label>
          <div
            className="relative isolate rounded-2xl p-7 md:p-8"
            style={{
              background: "linear-gradient(135deg, #1a1a1e 0%, #18181b 40%, #16191f 100%)",
              border: "1px solid rgba(34,197,94,0.25)",
              boxShadow: "0 0 24px rgba(34,197,94,0.08)",
            }}
          >
            <CardTexture accent />
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full" style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[12px] font-bold text-accent uppercase tracking-wider">Instalado y andando</span>
            </div>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
              {beneficios.map((b) => (
                <li key={b.t} className="flex items-start gap-2.5">
                  <span className="text-accent mt-1 shrink-0">→</span>
                  <div>
                    <p className="text-[14px] font-semibold text-white leading-snug">{b.t}</p>
                    <p className="text-[12px] text-text-muted leading-snug mt-0.5">{b.s}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </FadeUp>

      <FadeUp delay={0.2}>
        <div className="max-w-[760px] mx-auto">
        <Label>El negocio que lo usa hoy</Label>
        <a
          href="https://raquelrodriguez.com.ar/"
          target="_blank"
          rel="noopener noreferrer"
          className="grid grid-cols-1 sm:grid-cols-[1fr_300px] rounded-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-1"
          style={{ background: "linear-gradient(135deg, #1a1a1e 0%, #16191f 100%)", border: "1px solid rgba(34,197,94,0.25)", boxShadow: "0 0 20px rgba(34,197,94,0.08)" }}
        >
          <div className="p-7 flex flex-col justify-center gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-[16px] font-bold text-white shrink-0" style={{ background: "radial-gradient(circle at 35% 35%, #16a34acc, #16a34a66)" }}>R</div>
              <div className="min-w-0">
                <p className="text-[16px] font-bold text-white leading-tight">Dra. Raquel Rodríguez</p>
                <p className="text-[12px] text-text-muted leading-tight">Ortodoncia · San Salvador de Jujuy</p>
              </div>
            </div>
            <p className="text-[13px] text-text-secondary leading-relaxed">
              Le desarrollamos <strong className="text-white font-semibold">la web y el sistema</strong>. Con SEO local para que la encuentren en Google, y la asistente que agenda sola.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Web propia", "SEO local", "Sistema 24/7"].map((b) => (
                <span key={b} className="text-[10px] font-semibold text-accent px-2.5 py-1 rounded-full" style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}>{b}</span>
              ))}
            </div>
            <span className="text-[13px] font-semibold text-accent inline-flex items-center gap-1">Visitar raquelrodriguez.com.ar →</span>
          </div>

          <div className="hidden sm:block relative overflow-hidden" style={{ minHeight: "240px", background: "#0e1014", borderLeft: "1px solid rgba(255,255,255,0.06)" }}>
            <iframe
              src="https://raquelrodriguez.com.ar/"
              title="Sitio de la Dra. Raquel Rodríguez"
              scrolling="no"
              loading="lazy"
              style={{ position: "absolute", top: 0, left: 0, width: "1200px", height: "900px", border: 0, transform: "scale(0.25)", transformOrigin: "top left", pointerEvents: "none" }}
            />
          </div>
        </a>
        </div>
      </FadeUp>
    </section>
  );
}
