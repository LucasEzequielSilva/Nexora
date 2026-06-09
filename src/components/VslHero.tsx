"use client";

import { useState, useRef, useEffect } from "react";
import FadeUp from "./FadeUp";

const CAL_LINK = "nexoragrowth/30min";
const COGNE = "/cogne.webp";
const VSL = "/vsl_web.mp4";

/* ── Cards reales del "mundo" de Asiri (texto real, sin gibberish de IA) ── */

const cardShell: React.CSSProperties = {
  background: "linear-gradient(135deg, #1a1a1e 0%, #16191f 100%)",
  border: "1px solid rgba(34,197,94,0.22)",
  boxShadow: "0 0 24px rgba(34,197,94,0.08), 0 18px 50px rgba(0,0,0,0.55)",
};

/* Notificación estilo Nubank — sombra + glow ("shadowcito lightning") */
const notifShell: React.CSSProperties = {
  background: "linear-gradient(135deg, rgba(28,32,36,0.96) 0%, rgba(15,18,22,0.96) 100%)",
  border: "1px solid rgba(34,197,94,0.2)",
  boxShadow: "0 0 36px rgba(34,197,94,0.14), 0 28px 66px rgba(0,0,0,0.62)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
};

function ChatCard() {
  const msgs: { from: "patient" | "bot"; text: string; check?: boolean }[] = [
    { from: "patient", text: "Hola, atienden ortodoncia? quería un turno 🦷" },
    { from: "bot", text: "¡Hola! 👋 Tengo jueves 15:30 o viernes 10:00. ¿Cuál te queda mejor?" },
    { from: "patient", text: "Jueves 15:30" },
    { from: "bot", text: "Listo ✅ Te agendé el jueves 15:30. Te confirmo 24h antes.", check: true },
  ];
  return (
    <div className="w-[256px] rounded-2xl overflow-hidden" style={cardShell}>
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
            <div className="max-w-[84%] rounded-2xl px-3 py-1.5" style={{ background: m.from === "bot" ? "rgba(34,197,94,0.16)" : "rgba(255,255,255,0.05)", border: m.from === "bot" ? "1px solid rgba(34,197,94,0.28)" : "1px solid rgba(255,255,255,0.07)" }}>
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
  ];
  return (
    <div className="w-[244px] rounded-2xl overflow-hidden" style={cardShell}>
      <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-text-muted font-mono">Agenda · Hoy</p>
          <p className="text-[14px] font-bold text-white">Miércoles 12</p>
        </div>
        <span className="text-[10px] font-bold text-accent px-2.5 py-1 rounded-full" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.22)" }}>8 turnos</span>
      </div>
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
  );
}

function ConfirmPill() {
  return (
    <div className="flex items-start gap-3.5 px-5 py-4 rounded-2xl w-[330px]" style={notifShell}>
      <span className="w-11 h-11 rounded-xl flex items-center justify-center text-[18px] shrink-0" style={{ background: "rgba(34,197,94,0.16)", border: "1px solid rgba(34,197,94,0.35)", color: "#22c55e" }}>✓</span>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <p className="text-[14px] font-bold text-white leading-tight">Turno confirmado</p>
          <span className="text-[11px] text-text-muted shrink-0">Ahora</span>
        </div>
        <p className="text-[12px] text-text-muted leading-snug mt-1">Ana López · jueves 15:30. Recordatorio enviado ✓✓</p>
      </div>
    </div>
  );
}

function CrmPill() {
  return (
    <div className="flex items-start gap-3.5 px-5 py-4 rounded-2xl w-[330px]" style={notifShell}>
      <span className="w-11 h-11 rounded-xl flex items-center justify-center text-[20px] font-bold text-black shrink-0" style={{ background: "linear-gradient(135deg, #4ade80, #16a34a)" }}>+</span>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <p className="text-[14px] font-bold text-white leading-tight">Nuevo paciente cargado</p>
          <span className="text-[11px] text-text-muted shrink-0">Ahora</span>
        </div>
        <p className="text-[12px] text-text-muted leading-snug mt-1">Ana López · vino de WhatsApp, al CRM solo.</p>
      </div>
    </div>
  );
}

/* ── Demo en loop: el chat "se reproduce" solo el flujo completo ── */
type TypingSide = "asiri" | "patient" | null;
type DemoState = { visible: number; typing: TypingSide; crm: boolean; confirm: boolean; fade: boolean };

const DEMO_STEPS: (DemoState & { dur: number })[] = [
  { visible: 0, typing: "asiri", crm: false, confirm: false, fade: false, dur: 1400 },
  { visible: 1, typing: null, crm: false, confirm: false, fade: false, dur: 1300 },
  { visible: 1, typing: "patient", crm: false, confirm: false, fade: false, dur: 1200 },
  { visible: 2, typing: null, crm: true, confirm: false, fade: false, dur: 1900 },
  { visible: 2, typing: "asiri", crm: true, confirm: false, fade: false, dur: 1500 },
  { visible: 3, typing: null, crm: true, confirm: false, fade: false, dur: 1300 },
  { visible: 3, typing: "patient", crm: true, confirm: false, fade: false, dur: 1000 },
  { visible: 4, typing: null, crm: true, confirm: false, fade: false, dur: 1500 },
  { visible: 4, typing: "asiri", crm: true, confirm: false, fade: false, dur: 1600 },
  { visible: 5, typing: null, crm: true, confirm: true, fade: false, dur: 4500 },
  { visible: 5, typing: null, crm: true, confirm: true, fade: true, dur: 700 },
  { visible: 0, typing: null, crm: false, confirm: false, fade: false, dur: 1000 },
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const h = () => setReduced(mq.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);
  return reduced;
}

function useDemoLoop(reduced: boolean): DemoState {
  const [s, setS] = useState<DemoState>({ visible: 0, typing: null, crm: false, confirm: false, fade: false });
  useEffect(() => {
    if (reduced) {
      setS({ visible: 5, typing: null, crm: true, confirm: true, fade: false });
      return;
    }
    let i = 0;
    let t: ReturnType<typeof setTimeout>;
    const run = () => {
      const { dur, ...rest } = DEMO_STEPS[i];
      setS(rest);
      i = (i + 1) % DEMO_STEPS.length;
      t = setTimeout(run, dur);
    };
    run();
    return () => clearTimeout(t);
  }, [reduced]);
  return s;
}

function TypingBubble({ side }: { side: "asiri" | "patient" }) {
  const sent = side === "patient";
  return (
    <div className={`flex ${sent ? "justify-end" : "justify-start"}`}>
      <div className="flex items-center gap-1 px-3.5 py-3" style={{ background: sent ? "#005c4b" : "#202c33", borderRadius: sent ? "8px 8px 2px 8px" : "8px 8px 8px 2px", animation: "msgIn 0.3s ease-out both" }}>
        {[0, 1, 2].map((d) => (
          <span key={d} className="w-1.5 h-1.5 rounded-full" style={{ background: "#8696a0", animation: "typingBounce 1.2s ease-in-out infinite", animationDelay: `${d * 0.18}s` }} />
        ))}
      </div>
    </div>
  );
}

/* ── PATRÓN: campo de dots/pixeles parpadeantes (canvas, sutil) ── */
type Dot = { x: number; y: number; base: number; amp: number; phase: number; speed: number };

function TwinkleDots({ reduced }: { reduced: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !parent || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let dots: Dot[] = [];
    let raf = 0;

    const build = () => {
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      const gap = 22;
      for (let y = gap / 2; y < h; y += gap) {
        for (let x = gap / 2; x < w; x += gap) {
          const twinkles = Math.random() < 0.22;
          dots.push({
            x,
            y,
            base: 0.04 + Math.random() * 0.05,
            amp: twinkles ? 0.18 + Math.random() * 0.22 : 0,
            phase: Math.random() * Math.PI * 2,
            speed: 0.5 + Math.random() * 1.3,
          });
        }
      }
    };

    const paint = (alphaFor: (d: Dot) => number) => {
      ctx.clearRect(0, 0, parent.clientWidth, parent.clientHeight);
      for (const d of dots) {
        ctx.fillStyle = `rgba(130, 240, 175, ${alphaFor(d)})`;
        ctx.fillRect(d.x, d.y, 1.6, 1.6);
      }
    };

    const loop = (t: number) => {
      const time = t / 1000;
      paint((d) => (d.amp ? d.base + Math.max(0, Math.sin(time * d.speed + d.phase)) * d.amp : d.base));
      raf = requestAnimationFrame(loop);
    };

    build();
    if (reduced) paint((d) => d.base);
    else raf = requestAnimationFrame(loop);

    const onResize = () => {
      cancelAnimationFrame(raf);
      build();
      if (reduced) paint((d) => d.base);
      else raf = requestAnimationFrame(loop);
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [reduced]);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />;
}

/* Interfaz de WhatsApp Web (dark) que llena el fondo del hero (estilo Lubo) */
function WhatsAppBg({ visible, typing, fade }: { visible: number; typing: TypingSide; fade: boolean }) {
  const chats = [
    { n: "Ana López", m: "¡Confirmado! Gracias 🙌", t: "10:32", on: true },
    { n: "Bruno Méndez", m: "Quiero reprogramar mi turno", t: "10:18", badge: 2 },
    { n: "Carla Ríos", m: "Hola, atienden los sábados?", t: "09:54" },
    { n: "Diego Fernández", m: "Listo, nos vemos el jueves ✅", t: "Ayer" },
    { n: "Lucía Sosa", m: "Perfecto, agendado", t: "Ayer" },
    { n: "Martín Paz", m: "¿Cuánto sale la consulta?", t: "Ayer", badge: 1 },
    { n: "Sofía Vega", m: "Gracias por el recordatorio", t: "Mar" },
    { n: "Tomás Gil", m: "Buenas! quería un turno", t: "Mar" },
  ];
  const msgs: { from: "patient" | "asiri"; text: string; time: string }[] = [
    { from: "asiri", text: "¡Hola! 🙋 Soy Asiri, la secretaria virtual de la Dra. Raquel. ¿En qué te ayudo?", time: "10:30" },
    { from: "patient", text: "Hola, quería un turno para ortodoncia 🦷", time: "10:31" },
    { from: "asiri", text: "¡Genial! Tengo jueves 15:30 o viernes 10:00. ¿Cuál te queda mejor?", time: "10:31" },
    { from: "patient", text: "Jueves 15:30", time: "10:32" },
    { from: "asiri", text: "Listo ✅ Te agendé el jueves 15:30. Te confirmo 24h antes 🙌", time: "10:32" },
  ];
  return (
    <div className="flex h-full w-full overflow-hidden" style={{ background: "#0b141a" }}>
      {/* Sidebar — lista de chats */}
      <div className="w-[360px] shrink-0 flex flex-col" style={{ background: "#111b21", borderRight: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="flex items-center justify-between px-4 shrink-0" style={{ background: "#202c33", height: "60px" }}>
          <span className="text-[15px] font-semibold" style={{ color: "#e9edef" }}>Chats</span>
          <span className="text-[16px]" style={{ color: "#aebac1" }}>⋮</span>
        </div>
        <div className="px-3 py-2 shrink-0">
          <div className="h-9 rounded-lg flex items-center px-4 text-[13px]" style={{ background: "#202c33", color: "#8696a0" }}>Buscá un chat…</div>
        </div>
        <div className="flex-1">
          {chats.map((c, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-2.5" style={{ background: c.on ? "#2a3942" : "transparent", borderBottom: "1px solid rgba(255,255,255,0.03)", animation: "msgIn 0.5s ease-out both", animationDelay: `${0.1 + i * 0.07}s` }}>
              <span className="w-11 h-11 rounded-full shrink-0 flex items-center justify-center text-[15px] font-bold text-white" style={{ background: "#3b4a54" }}>{c.n[0]}</span>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center"><span className="text-[14px] font-medium truncate" style={{ color: "#e9edef" }}>{c.n}</span><span className="text-[11px] shrink-0 ml-2" style={{ color: c.badge ? "#22c55e" : "#8696a0" }}>{c.t}</span></div>
                <div className="flex justify-between items-center gap-2"><span className="text-[12.5px] truncate" style={{ color: "#8696a0" }}>{c.m}</span>{c.badge && <span className="shrink-0 text-[10px] font-bold text-black rounded-full w-4 h-4 flex items-center justify-center" style={{ background: "#22c55e" }}>{c.badge}</span>}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Conversación abierta */}
      <div className="flex-1 flex flex-col min-w-0" style={{ background: "#0b141a" }}>
        <div className="flex items-center gap-3 px-5 shrink-0" style={{ background: "#202c33", height: "60px" }}>
          <span className="w-10 h-10 rounded-full flex items-center justify-center text-[15px] font-bold text-black shrink-0" style={{ background: "linear-gradient(135deg,#4ade80,#16a34a)" }}>A</span>
          <div className="leading-tight"><p className="text-[14px] font-semibold" style={{ color: "#e9edef" }}>Asiri · Dra. Raquel</p><p className="text-[11px]" style={{ color: "#22c55e" }}>en línea · responde sola</p></div>
        </div>
        <div className="flex-1 flex flex-col gap-2 justify-end px-8 py-6" style={{ opacity: fade ? 0 : 1, transition: "opacity 0.5s ease" }}>
          {msgs.slice(0, visible).map((m, i) => {
            const sent = m.from === "patient";
            return (
              <div key={i} className={`flex ${sent ? "justify-end" : "justify-start"}`}>
                <div className="max-w-[58%] px-3 py-1.5" style={{ background: sent ? "#005c4b" : "#202c33", borderRadius: sent ? "8px 8px 2px 8px" : "8px 8px 8px 2px", animation: "msgIn 0.4s ease-out both" }}>
                  <p className="text-[13.5px] leading-snug" style={{ color: "#e9edef" }}>{m.text}</p>
                  <div className="flex items-center justify-end gap-1 mt-0.5"><span className="text-[10px]" style={{ color: "#8696a0" }}>{m.time}</span>{sent && <span className="text-[11px]" style={{ color: "#53bdeb" }}>✓✓</span>}</div>
                </div>
              </div>
            );
          })}
          {typing && <TypingBubble side={typing} />}
        </div>
        <div className="flex items-center gap-3 px-5 shrink-0" style={{ background: "#202c33", height: "56px" }}>
          <div className="flex-1 h-9 rounded-lg flex items-center px-4 text-[13px]" style={{ background: "#2a3942", color: "#8696a0" }}>Escribí un mensaje…</div>
        </div>
      </div>
    </div>
  );
}

export default function VslHero() {
  const [showVsl, setShowVsl] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const demo = useDemoLoop(reduced);

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!panelRef.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    panelRef.current.style.transform = `rotateY(${-30 + x * 7}deg) rotateX(${5 - y * 4}deg) scale(1.02)`;
  };

  return (
    <section onMouseMove={onMove} className="relative overflow-hidden min-h-[100svh] flex items-center" style={{ background: "#0a0a0b" }}>
      {/* ───────── CAPA 0 · Fondo atmosférico (CSS) ───────── */}
      {/* glow verde grande detrás de cogne */}
      <div className="absolute pointer-events-none" style={{ width: 900, height: 900, right: "-80px", top: "50%", transform: "translateY(-50%)", background: "radial-gradient(circle, rgba(34,197,94,0.18) 0%, rgba(34,197,94,0.05) 35%, transparent 65%)", filter: "blur(20px)", zIndex: 0 }} />
      {/* bokeh */}
      <div className="absolute pointer-events-none rounded-full" style={{ width: 220, height: 220, right: "18%", top: "12%", background: "#22c55e", opacity: 0.06, filter: "blur(70px)", zIndex: 0 }} />
      <div className="absolute pointer-events-none rounded-full" style={{ width: 300, height: 300, right: "4%", bottom: "8%", background: "#16a34a", opacity: 0.05, filter: "blur(80px)", zIndex: 0 }} />
      {/* ───────── CAPA 2 · Cogne (PNG recortado) ───────── */}
      {/* resplandor detrás de cogne (su "photoshop" en CSS) */}
      <div className="absolute pointer-events-none hidden md:block" style={{ right: "0%", bottom: 0, width: 760, height: "100%", background: "radial-gradient(ellipse at 56% 44%, rgba(34,197,94,0.30) 0%, rgba(34,197,94,0.10) 38%, transparent 66%)", filter: "blur(20px)", zIndex: 10 }} />
      <div className="absolute pointer-events-none hidden md:block" style={{ right: "13%", top: "20%", width: 400, height: 400, background: "radial-gradient(circle, rgba(74,222,128,0.38) 0%, rgba(34,197,94,0.12) 40%, transparent 68%)", filter: "blur(30px)", zIndex: 10 }} />

      {/* ── Cogne + glow de silueta (duplicación de capa estilo Lubo, en CSS) ── */}
      {/* fade mask bottom→top: el bottom de cogne se desvanece y conecta con la sección siguiente */}
      <div className="absolute bottom-0 right-0 lg:right-[4%] h-[92%] pointer-events-none" style={{ zIndex: 11, WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 15%)", maskImage: "linear-gradient(to top, transparent 0%, black 15%)" }}>
        <div className="relative h-full">
          {/* el rim light verde ya viene horneado del relight de Nano */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={COGNE} alt="" className="relative h-full w-auto object-contain object-bottom select-none opacity-95 md:opacity-100" style={{ filter: "drop-shadow(0 20px 50px rgba(0,0,0,0.6)) brightness(1.1) contrast(1.03)", maxWidth: "none" }} />
        </div>
      </div>

      {/* fusión a negro (bordes + abajo + izquierda para el texto) */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(90deg, #0a0a0b 0%, #0a0a0b 34%, rgba(10,10,11,0.6) 54%, rgba(10,10,11,0) 76%)", zIndex: 4 }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(10,10,11,0) 46%, rgba(10,10,11,0.6) 72%, rgba(10,10,11,0.95) 90%, #0a0a0b 100%)", zIndex: 4 }} />
      {/* scrim extra full en mobile */}
      <div className="absolute inset-0 pointer-events-none lg:hidden" style={{ background: "rgba(10,10,11,0.5)", zIndex: 4 }} />

      {/* ── Glow balls de transición en el bottom (conectan con la sección de abajo) ── */}
      <div className="absolute pointer-events-none" style={{ left: "50%", bottom: 0, transform: "translateX(-50%)", width: "75%", height: 240, background: "radial-gradient(ellipse 70% 100% at 50% 100%, rgba(34,197,94,0.16) 0%, rgba(34,197,94,0.05) 40%, transparent 72%)", filter: "blur(40px)", zIndex: 7 }} />
      <div className="absolute pointer-events-none rounded-full" style={{ left: "14%", bottom: "-20px", width: 240, height: 240, background: "radial-gradient(circle, rgba(74,222,128,0.14) 0%, transparent 64%)", filter: "blur(44px)", zIndex: 7 }} />
      <div className="absolute pointer-events-none rounded-full" style={{ right: "24%", bottom: "-30px", width: 280, height: 280, background: "radial-gradient(circle, rgba(34,197,94,0.11) 0%, transparent 64%)", filter: "blur(50px)", zIndex: 7 }} />

      {/* ───────── CAPA 3 · Cards cercanas (nítidas, delante de cogne) ───────── */}
      {(demo.crm || reduced) && (
        <div className="hidden xl:block absolute right-[28%] top-[7%] pointer-events-none" style={{ zIndex: 20, transform: "rotate(-3deg)", opacity: demo.fade ? 0 : 1, transition: "opacity 0.5s ease" }}>
          <div style={{ animation: reduced ? undefined : "popIn 0.5s ease-out both" }}>
            <CrmPill />
          </div>
        </div>
      )}
      {/* ── Fondo: WhatsApp en perspectiva PROFUNDA, anclado a la derecha, combina con el body ── */}
      <div className="absolute inset-0 hidden md:block pointer-events-none overflow-hidden" style={{ zIndex: 1, perspective: "1600px" }}>
        <div ref={panelRef} className="absolute" style={{ top: "-14%", right: "-10%", width: "64%", height: "130%", transformOrigin: "right center", transform: "rotateY(-30deg) rotateX(5deg) scale(1.02)", transformStyle: "preserve-3d", opacity: 0.3, transition: "transform 0.3s ease-out", willChange: "transform" }}>
          <WhatsAppBg visible={demo.visible} typing={demo.typing} fade={demo.fade} />
        </div>
      </div>

      {/* ── PATRÓN: dots/pixeles PARPADEANTES concentrados en la zona de luz (top-right) ── */}
      <div className="absolute inset-0 pointer-events-none hidden md:block" style={{ zIndex: 2, WebkitMaskImage: "radial-gradient(ellipse 65% 80% at 80% 24%, black 0%, rgba(0,0,0,0.45) 40%, transparent 72%)", maskImage: "radial-gradient(ellipse 65% 80% at 80% 24%, black 0%, rgba(0,0,0,0.45) 40%, transparent 72%)" }}>
        <TwinkleDots reduced={reduced} />
      </div>

      {/* ── PATRÓN: light rays + beam verde desde el top-right ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
        {/* origen de luz (arriba-derecha) */}
        <div className="absolute" style={{ top: "-8%", right: "1%", width: 340, height: 340, background: "radial-gradient(circle, rgba(224,255,236,0.45) 0%, rgba(74,222,128,0.26) 24%, rgba(34,197,94,0.07) 48%, transparent 70%)", filter: "blur(26px)" }} />
        {/* haz ancho difuso */}
        <div className="absolute" style={{ top: "-25%", right: "-8%", width: "55%", height: "150%", background: "linear-gradient(202deg, rgba(74,222,128,0.16) 0%, rgba(34,197,94,0.06) 28%, transparent 52%)", filter: "blur(34px)", transform: "rotate(6deg)" }} />
        {/* núcleo brillante del haz */}
        <div className="absolute" style={{ top: "-10%", right: "7%", width: 70, height: "92%", background: "linear-gradient(to bottom, rgba(224,255,236,0.4) 0%, rgba(74,222,128,0.2) 18%, rgba(34,197,94,0.05) 44%, transparent 64%)", filter: "blur(13px)", transform: "rotate(13deg)", transformOrigin: "top" }} />
        {/* rayos finos definidos */}
        <div className="absolute" style={{ top: "-12%", right: "8%", width: "2px", height: "92%", background: "linear-gradient(to bottom, rgba(224,255,236,0.5), transparent 60%)", filter: "blur(1px)", transform: "rotate(15deg)", transformOrigin: "top" }} />
        <div className="absolute" style={{ top: "-12%", right: "15%", width: "1.5px", height: "88%", background: "linear-gradient(to bottom, rgba(74,222,128,0.32), transparent 58%)", filter: "blur(2px)", transform: "rotate(21deg)", transformOrigin: "top" }} />
        <div className="absolute" style={{ top: "-12%", right: "23%", width: "1.5px", height: "82%", background: "linear-gradient(to bottom, rgba(74,222,128,0.22), transparent 55%)", filter: "blur(2.5px)", transform: "rotate(27deg)", transformOrigin: "top" }} />
        <div className="absolute" style={{ top: "-12%", right: "31%", width: "1px", height: "76%", background: "linear-gradient(to bottom, rgba(74,222,128,0.15), transparent 52%)", filter: "blur(3px)", transform: "rotate(33deg)", transformOrigin: "top" }} />
      </div>
      {(demo.confirm || reduced) && (
        <div className="hidden lg:block absolute right-[5%] bottom-[18%] pointer-events-none" style={{ zIndex: 20, transform: "rotate(4deg)", filter: "blur(0.4px)", opacity: demo.fade ? 0 : 1, transition: "opacity 0.5s ease" }}>
          <div style={{ animation: reduced ? undefined : "popIn 0.5s ease-out both" }}>
            <ConfirmPill />
          </div>
        </div>
      )}

      {/* ── Máscara de anclaje: pincel redondo que difumina los extremos de la escena hacia el fondo ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 92% at 70% 52%, rgba(10,10,11,0) 0%, rgba(10,10,11,0) 42%, rgba(10,10,11,0.5) 70%, rgba(10,10,11,0.88) 88%, #0a0a0b 100%)", zIndex: 6 }} />

      {/* ── Luces + UI fuera de foco en las puntas del texto (ambiente, no legible) ── */}
      <div className="absolute pointer-events-none hidden lg:block" style={{ left: "-4%", top: "6%", width: 340, height: 340, background: "radial-gradient(circle, rgba(34,197,94,0.16) 0%, transparent 66%)", filter: "blur(42px)", zIndex: 12 }} />
      <div className="absolute pointer-events-none hidden lg:block" style={{ left: "0%", bottom: "4%", width: 300, height: 300, background: "radial-gradient(circle, rgba(74,222,128,0.12) 0%, transparent 64%)", filter: "blur(48px)", zIndex: 12 }} />
      {/* fragmento de UI difuminado · esquina arriba-izq */}
      <div className="absolute pointer-events-none hidden xl:block" style={{ left: "0.5%", top: "11%", zIndex: 13, opacity: 0.5, filter: "blur(5px)", transform: "rotate(-5deg)" }}>
        <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl w-[200px]" style={notifShell}>
          <span className="w-8 h-8 rounded-lg shrink-0" style={{ background: "linear-gradient(135deg,#4ade80,#16a34a)" }} />
          <div className="flex-1">
            <div className="h-2 rounded-full mb-1.5" style={{ background: "rgba(255,255,255,0.22)", width: "75%" }} />
            <div className="h-2 rounded-full" style={{ background: "rgba(255,255,255,0.1)", width: "52%" }} />
          </div>
        </div>
      </div>
      {/* fragmento de UI difuminado · esquina abajo-izq */}
      <div className="absolute pointer-events-none hidden xl:block" style={{ left: "5%", bottom: "9%", zIndex: 13, opacity: 0.42, filter: "blur(6px)", transform: "rotate(4deg)" }}>
        <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl w-[176px]" style={notifShell}>
          <span className="w-7 h-7 rounded-full shrink-0" style={{ background: "#3b4a54" }} />
          <div className="flex-1">
            <div className="h-2 rounded-full mb-1.5" style={{ background: "rgba(255,255,255,0.18)", width: "66%" }} />
            <div className="h-2 rounded-full" style={{ background: "rgba(255,255,255,0.09)", width: "46%" }} />
          </div>
        </div>
      </div>

      {/* ───────── CAPA 4 · Contenido (texto) ───────── */}
      <div className="relative w-full max-w-[1180px] mx-auto px-6" style={{ zIndex: 30 }}>
        <div className="max-w-[560px] text-center lg:text-left mx-auto lg:mx-0">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6" style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}>
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
              <span className="text-[12px] font-semibold text-accent uppercase tracking-wider">Sistema para consultorios y clínicas</span>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1 className="text-[clamp(2rem,3.6vw,3.2rem)] font-bold leading-[1.12] tracking-[-1px] mb-6">
              La agenda de tu consultorio,{" "}
              <span style={{ background: "linear-gradient(to bottom, #22c55e 0%, #4ade80 50%, #f0fdf4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", filter: "drop-shadow(0 0 50px rgba(34,197,94,0.3))" }}>
                llena sola.
              </span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-[17px] text-text-secondary leading-[1.7] max-w-[500px] mx-auto lg:mx-0 mb-7 font-light">
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
              <div style={{ display: "inline-block", borderRadius: "13px", padding: "1px", background: "linear-gradient(135deg, rgba(240,253,244,1) 0%, rgba(34,197,94,0.6) 50%, rgba(22,163,74,1) 100%)", boxShadow: "0 0 24px rgba(34,197,94,0.25)" }}>
                <button data-cal-namespace="30min" data-cal-link={CAL_LINK} data-cal-config='{"layout":"month_view"}' className="inline-flex items-center gap-2 px-8 py-4 text-black font-bold text-[15px] rounded-xl transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer" style={{ borderRadius: "12px", background: "linear-gradient(180deg, #62e995 0%, #2bc961 46%, #15a046 100%)", boxShadow: "inset 0 1.5px 0 rgba(255,255,255,0.5), inset 0 -14px 22px -12px rgba(3,30,15,0.55), 0 10px 26px -8px rgba(34,197,94,0.55), 0 0 28px rgba(34,197,94,0.28)" }}>
                  Quiero la agenda llena →
                </button>
              </div>
              <button onClick={() => setShowVsl(true)} className="inline-flex items-center gap-2 px-7 py-4 text-[15px] font-medium rounded-xl transition-all duration-200 hover:border-accent hover:text-accent cursor-pointer" style={{ color: "#e4e4e7", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.02)" }}>
                <span className="text-accent">▶</span> Ver el video
              </button>
            </div>
          </FadeUp>

          <FadeUp delay={0.5}>
            <p className="text-[13px] text-text-muted">
              El mismo sistema que ya opera en el consultorio de la <strong className="text-text-secondary font-semibold">Dra. Raquel Rodríguez</strong> · ortodoncia, Jujuy.
            </p>
          </FadeUp>
        </div>
      </div>

      {/* ───────── Modal VSL ───────── */}
      {showVsl && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(4px)" }} onClick={() => setShowVsl(false)}>
          <div className="relative w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowVsl(false)} className="absolute -top-10 right-0 text-white/70 hover:text-white text-3xl leading-none cursor-pointer">×</button>
            <video src={VSL} controls autoPlay playsInline className="w-full rounded-xl" style={{ border: "1px solid rgba(34,197,94,0.3)", boxShadow: "0 0 60px rgba(34,197,94,0.15)" }} />
          </div>
        </div>
      )}
    </section>
  );
}
