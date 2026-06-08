"use client";

import FadeUp from "./FadeUp";

const CAL_LINK = "nexoragrowth/30min";

/* ──────────────────────────────────────────────────────────
   "Nuestro mundo" flotando detrás del sujeto (la VSL).
   Mismo principio que la referencia (bandeja de Gmail + docs),
   pero con NUESTROS objetos: chat del agente, agenda y CRM.
   Profundidad real → blur diverso + opacidad por capa. Estático.
   ────────────────────────────────────────────────────────── */

function ChatCard() {
  const msgs: { from: "patient" | "bot"; text: string; tag?: string; check?: boolean }[] = [
    { from: "patient", text: "Hola, atienden ortodoncia? quería un turno 🦷" },
    { from: "bot", text: "¡Hola! 👋 Sí. Tengo jueves 15:30 o viernes 10:00. ¿Cuál te queda mejor?" },
    { from: "patient", text: "Jueves 15:30" },
    { from: "bot", text: "Listo ✅ Te agendé el jueves 15:30. Te confirmo 24h antes.", check: true },
  ];
  return (
    <div className="w-[270px] rounded-2xl overflow-hidden" style={cardShell}>
      <div className="flex items-center gap-2 px-3.5 py-2.5" style={{ background: "rgba(34,197,94,0.10)", borderBottom: "1px solid rgba(34,197,94,0.18)" }}>
        <span className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold text-black shrink-0" style={{ background: "linear-gradient(135deg,#4ade80,#16a34a)" }}>A</span>
        <div className="leading-tight">
          <p className="text-[12px] font-bold text-white">Asiri · Asistente</p>
          <p className="text-[10px] text-accent">en línea · responde sola</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-3.5" style={{ background: "rgba(0,0,0,0.22)" }}>
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.from === "bot" ? "justify-end" : "justify-start"}`}>
            <div
              className="max-w-[84%] rounded-2xl px-3 py-1.5"
              style={{
                background: m.from === "bot" ? "rgba(34,197,94,0.16)" : "rgba(255,255,255,0.05)",
                border: m.from === "bot" ? "1px solid rgba(34,197,94,0.28)" : "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <p className="text-[12px] text-text-secondary leading-snug">{m.text}</p>
              {m.check && <span className="block text-right text-[10px] text-accent mt-0.5">✓✓</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AgendaCard() {
  const slots = [
    { t: "09:00", n: "Ana L.", tag: "Control" },
    { t: "10:30", n: "Bruno M.", tag: "Ortodoncia" },
    { t: "15:30", n: "Nuevo paciente", tag: "Primera vez", hot: true },
    { t: "17:00", n: "Carla R.", tag: "Control" },
  ];
  return (
    <div className="w-[260px] rounded-2xl overflow-hidden" style={cardShell}>
      <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-text-muted font-mono">Agenda · Hoy</p>
          <p className="text-[14px] font-bold text-white">Miércoles 12</p>
        </div>
        <span className="text-[10px] font-bold text-accent px-2.5 py-1 rounded-full" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.22)" }}>8 turnos</span>
      </div>
      <div className="flex flex-col">
        {slots.map((s, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-2.5" style={{ borderBottom: i < slots.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
            <span className="text-[12px] font-mono text-accent w-10 shrink-0">{s.t}</span>
            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-semibold text-white truncate">{s.n}</p>
              <p className="text-[10px] text-text-muted">{s.tag}</p>
            </div>
            {s.hot && <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />}
          </div>
        ))}
      </div>
    </div>
  );
}

function ConfirmPill() {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl w-[228px]" style={cardShell}>
      <span className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(34,197,94,0.14)", border: "1px solid rgba(34,197,94,0.3)" }}>
        <span className="text-accent text-[14px]">✓</span>
      </span>
      <div className="leading-tight">
        <p className="text-[12px] font-bold text-white">Turno confirmado</p>
        <p className="text-[10px] text-text-muted">Ana L. · recordatorio 24h ✓✓</p>
      </div>
    </div>
  );
}

function CrmPill() {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl w-[244px]" style={cardShell}>
      <span className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold text-black shrink-0" style={{ background: "radial-gradient(circle at 35% 35%, #4ade80, #16a34a)" }}>+</span>
      <div className="leading-tight min-w-0">
        <p className="text-[12px] font-bold text-white">Nuevo paciente cargado</p>
        <p className="text-[10px] text-text-muted">vino de WhatsApp · al CRM solo</p>
      </div>
    </div>
  );
}

const cardShell: React.CSSProperties = {
  background: "linear-gradient(135deg, #1a1a1e 0%, #16191f 100%)",
  border: "1px solid rgba(34,197,94,0.22)",
  boxShadow: "0 0 24px rgba(34,197,94,0.08), 0 18px 50px rgba(0,0,0,0.5)",
};

/* Capa de profundidad: cada hijo recibe rotación, blur y opacidad */
function Floating({
  children,
  className,
  rotate = "0deg",
  blur = 0,
  opacity = 1,
}: {
  children: React.ReactNode;
  className: string;
  rotate?: string;
  blur?: number;
  opacity?: number;
}) {
  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      style={{ transform: `rotate(${rotate})`, filter: blur ? `blur(${blur}px)` : undefined, opacity, zIndex: 1 }}
    >
      {children}
    </div>
  );
}

export default function VslHero() {
  return (
    <section className="relative overflow-hidden min-h-[100vh] flex items-center pt-24 pb-16">
      {/* Blobs verdes ambientales */}
      <div className="absolute pointer-events-none rounded-full" style={{ width: 760, height: 760, background: "#22c55e", opacity: 0.06, top: -220, right: -160, filter: "blur(120px)" }} />
      <div className="absolute pointer-events-none rounded-full" style={{ width: 560, height: 560, background: "#16a34a", opacity: 0.05, bottom: -160, left: -120, filter: "blur(120px)" }} />

      {/* Dot grid sutil */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage: "linear-gradient(to bottom, black 0%, black 55%, transparent 92%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 55%, transparent 92%)",
        }}
      />

      {/* ── Atmósfera de fondo: nuestro mundo, muy difuminado, full-bleed ── */}
      <Floating className="hidden lg:block left-[2%] top-[14%]" rotate="-7deg" blur={5} opacity={0.4}>
        <ChatCard />
      </Floating>
      <Floating className="hidden xl:block left-[6%] bottom-[10%]" rotate="5deg" blur={4} opacity={0.45}>
        <CrmPill />
      </Floating>

      <div className="relative w-full max-w-[1180px] mx-auto px-6 grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-8 items-center" style={{ zIndex: 3 }}>
        {/* ── Izquierda: oferta Hormozi (ICP · dolor · transformación) ── */}
        <div className="relative text-center lg:text-left">
          {/* scrim para legibilidad sobre la atmósfera */}
          <div className="absolute -inset-x-10 -inset-y-16 pointer-events-none hidden lg:block" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(10,10,11,0.92) 0%, rgba(10,10,11,0.55) 55%, transparent 80%)", zIndex: -1 }} />

          <FadeUp>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6" style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}>
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
              <span className="text-[12px] font-semibold text-accent uppercase tracking-wider">Sistema para consultorios y clínicas</span>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1 className="text-[clamp(2.6rem,5vw,4.4rem)] font-extrabold leading-[1.04] tracking-[-2px] mb-6">
              La agenda de tu consultorio,{" "}
              <span
                style={{
                  background: "linear-gradient(to bottom, #22c55e 0%, #4ade80 50%, #f0fdf4 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 50px rgba(34,197,94,0.3))",
                }}
              >
                llena sola.
              </span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-[17px] text-text-secondary leading-[1.7] max-w-[520px] mx-auto lg:mx-0 mb-7 font-light">
              Cada paciente que escribe fuera de horario y no respondés a tiempo es un turno que se va a otro lado. El sistema responde, agenda y confirma <strong className="text-white font-semibold">solo — 24/7</strong> — y descarga a tu recepción. Vos solo atendés.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2.5 mb-9">
              {["Andando en menos de 2 semanas", "Recordatorios que matan las ausencias", "Sin contrato largo"].map((item, i) => (
                <span key={i} className="flex items-center gap-2 text-[13px] text-text-muted">
                  <span className="text-accent font-bold text-[14px]">✓</span>
                  {item}
                </span>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.4}>
            <div className="flex flex-wrap justify-center lg:justify-start gap-3.5 mb-6">
              <div
                style={{
                  display: "inline-block", borderRadius: "13px", padding: "1px", position: "relative", overflow: "hidden",
                  background: "linear-gradient(135deg, rgba(240,253,244,1) 0%, rgba(34,197,94,0.6) 50%, rgba(22,163,74,1) 100%)",
                  boxShadow: "0 0 24px rgba(34,197,94,0.25)",
                }}
              >
                <button
                  data-cal-namespace="30min"
                  data-cal-link={CAL_LINK}
                  data-cal-config='{"layout":"month_view"}'
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#22c55e] via-[#10b981] to-[#059669] text-black font-bold text-[15px] rounded-xl transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  style={{ borderRadius: "12px", boxShadow: "inset 0 2px 0 rgba(255,255,255,0.2), inset 0 -2px 0 rgba(0,0,0,0.15), 0 10px 24px -8px rgba(34,197,94,0.5)" }}
                >
                  Quiero la agenda llena →
                </button>
              </div>

              <a
                href="#prueba"
                className="inline-flex items-center px-7 py-4 text-[15px] font-medium rounded-xl transition-all duration-200 hover:border-accent hover:text-accent"
                style={{ color: "#e4e4e7", border: "1px solid rgba(255,255,255,0.1)", background: "transparent" }}
              >
                Ver cómo funciona ↓
              </a>
            </div>
          </FadeUp>

          <FadeUp delay={0.5}>
            <p className="text-[13px] text-text-muted">
              El mismo sistema que ya opera en el consultorio de la{" "}
              <strong className="text-text-secondary font-semibold">Dra. Raquel Rodríguez</strong> · ortodoncia, Jujuy.
            </p>
          </FadeUp>
        </div>

        {/* ── Derecha: el sujeto = la VSL, con nuestros objetos flotando ── */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[440px]">
            {/* Glow detrás del video */}
            <div className="absolute -inset-6 pointer-events-none rounded-[32px]" style={{ background: "radial-gradient(ellipse at 60% 40%, rgba(34,197,94,0.22) 0%, transparent 70%)", filter: "blur(8px)" }} />

            {/* Marco glass del video */}
            <FadeUp delay={0.2}>
              <div
                className="relative rounded-[22px] overflow-hidden"
                style={{ border: "1px solid rgba(34,197,94,0.3)", boxShadow: "0 0 40px rgba(34,197,94,0.14), 0 30px 70px rgba(0,0,0,0.6)", zIndex: 2 }}
              >
                <video
                  src="/vsl_web.mp4"
                  poster="/thumbnail-profile.jpg"
                  controls
                  playsInline
                  preload="metadata"
                  className="block w-full"
                />
              </div>
            </FadeUp>

            {/* Objetos nuestros — nítidos (foreground) cerca del video */}
            <Floating className="-left-[42%] top-[6%] hidden md:block" rotate="-6deg" blur={0} opacity={1}>
              <ChatCard />
            </Floating>
            <Floating className="-right-[30%] top-[40%] hidden lg:block" rotate="6deg" blur={1} opacity={0.96}>
              <AgendaCard />
            </Floating>
            <Floating className="-left-[20%] -bottom-[4%] hidden md:block" rotate="-3deg" blur={0} opacity={1}>
              <ConfirmPill />
            </Floating>
            <Floating className="right-[2%] -top-[7%] hidden lg:block" rotate="4deg" blur={0} opacity={1}>
              <CrmPill />
            </Floating>
          </div>
        </div>
      </div>
    </section>
  );
}
