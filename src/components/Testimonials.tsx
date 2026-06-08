"use client";

import FadeUp from "./FadeUp";

const beneficios = [
  { t: "Agenda sola, 24/7", s: "La asistente responde y agenda incluso fuera de horario — no se pierde el paciente que escribe a la noche." },
  { t: "Menos ausencias", s: "Recuerda y confirma cada turno solo, 24h y 2h antes." },
  { t: "Recepción liberada", s: "Todo cae ordenado en su sistema de gestión, sin cargar nada a mano." },
  { t: "Urgencias directo a la doctora", s: "El triage detecta lo urgente y se lo deriva al instante." },
  { t: "La encuentran en Google", s: "Web propia con SEO local — más pacientes nuevos." },
];

const recordatorio: { from: "patient" | "bot"; text: string; time: string; tag?: string; check?: boolean }[] = [
  { from: "bot", text: "Hola Ana 👋 Te recuerdo tu turno de mañana a las 10:30 con la Dra. Rodríguez. ¿Lo confirmás?", time: "10:30", tag: "24h antes" },
  { from: "patient", text: "Sí, confirmo", time: "10:32" },
  { from: "bot", text: "¡Genial! Te esperamos. Si necesitás reprogramar, avisame con tiempo 🦷", time: "10:32", check: true },
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
            <span className="font-mono text-[11px] uppercase tracking-widest text-accent">Caso de éxito</span>
            <span className="h-px w-8 bg-accent opacity-50" />
          </div>
          <h2 className="text-[clamp(26px,3.5vw,40px)] font-extrabold tracking-tight mb-4 leading-tight">
            Hechos. No promesas.
          </h2>
          <p className="text-text-secondary text-base max-w-xl mx-auto">
            La web y el sistema que le hicimos a la <strong className="text-white font-semibold">Dra. Raquel Rodríguez</strong> — ortodoncia en Jujuy. Agenda sola, confirma los turnos sola, y la encuentran en Google.
          </p>
        </div>
      </FadeUp>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <FadeUp delay={0.1}>
          <Label>Agenda los turnos sola</Label>
          <div className="flex flex-col items-center">
            <div
              className="rounded-[26px] overflow-hidden mx-auto"
              style={{
                maxWidth: "270px",
                border: "1px solid rgba(34,197,94,0.25)",
                boxShadow: "0 0 30px rgba(34,197,94,0.12), 0 20px 50px rgba(0,0,0,0.5)",
              }}
            >
              <video src="/raquel/agenda-asiri.mp4" autoPlay muted loop playsInline controls className="block w-full" />
            </div>
            <p className="text-[12px] text-text-muted mt-4 text-center">
              Video real · <span className="text-accent font-semibold">Asiri</span> responde y agenda, 24/7.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.15}>
          <Label>Y confirma cada turno</Label>

          <div
            className="rounded-2xl overflow-hidden mb-6"
            style={{ background: "linear-gradient(135deg, #1a1a1e 0%, #16191f 100%)", border: "1px solid rgba(34,197,94,0.2)" }}
          >
            <div className="flex flex-col gap-2.5 p-5" style={{ background: "rgba(0,0,0,0.18)" }}>
              {recordatorio.map((m, i) => (
                <div key={i} className={`flex ${m.from === "bot" ? "justify-end" : "justify-start"}`}>
                  <div
                    className="max-w-[82%] rounded-2xl px-3.5 py-2"
                    style={{
                      background: m.from === "bot" ? "rgba(34,197,94,0.14)" : "rgba(255,255,255,0.05)",
                      border: m.from === "bot" ? "1px solid rgba(34,197,94,0.25)" : "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    {m.tag && <span className="text-[9px] font-bold text-accent uppercase tracking-wider block mb-1">{m.tag}</span>}
                    <p className="text-[13px] text-text-secondary leading-snug">{m.text}</p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <span className="text-[10px] text-text-muted">{m.time}</span>
                      {m.check && <span className="text-[10px] text-accent">✓✓</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-text-muted px-5 py-2.5 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              Ejemplo del recordatorio · datos de muestra
            </p>
          </div>

          <Label>Lo que gana la clínica</Label>
          <div
            className="relative rounded-2xl p-6"
            style={{
              background: "linear-gradient(135deg, #1a1a1e 0%, #18181b 40%, #16191f 100%)",
              border: "1px solid rgba(34,197,94,0.25)",
              boxShadow: "0 0 20px rgba(34,197,94,0.08)",
            }}
          >
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full" style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[12px] font-bold text-accent uppercase tracking-wider">Instalado y andando</span>
            </div>
            <ul className="flex flex-col gap-3.5">
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
        </FadeUp>
      </div>

      <FadeUp delay={0.2}>
        <Label>La clínica que lo usa hoy</Label>
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
      </FadeUp>
    </section>
  );
}
