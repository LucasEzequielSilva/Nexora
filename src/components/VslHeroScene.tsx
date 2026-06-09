"use client";

import { useState } from "react";
import FadeUp from "./FadeUp";
import { useDemoLoop, usePrefersReducedMotion, CrmPill, ConfirmPill } from "./VslHero";

const CAL_LINK = "nexoragrowth/30min";
const VSL = "/vsl_web.mp4";
const SCENE = "/tiaxe0s30E5ds5PmNPqsp_yVyeC20a.png";

/* Test C — hero en capas sobre la escena fusionada (cogne + consultorio, generada por IA).
   La UI (cards, texto) va crisp en HTML encima; objetos blur dan profundidad estilo Lubo. */
export default function VslHeroScene() {
  const [showVsl, setShowVsl] = useState(false);
  const reduced = usePrefersReducedMotion();
  const demo = useDemoLoop(reduced);

  return (
    <section className="relative overflow-hidden min-h-[100svh] flex items-center" style={{ background: "#0a0a0b" }}>
      {/* ── CAPA 1 · Fondo fusionado (cogne + consultorio, IA) ── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={SCENE} alt="" className="absolute inset-0 w-full h-full object-cover object-right select-none" />

      {/* scrim izquierda → legibilidad del texto */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(90deg, #0a0a0b 0%, rgba(10,10,11,0.92) 24%, rgba(10,10,11,0.55) 44%, rgba(10,10,11,0) 66%)" }} />
      <div className="absolute inset-0 pointer-events-none lg:hidden" style={{ background: "rgba(10,10,11,0.6)" }} />

      {/* ── CAPA 2 · Cards blurreadas (profundidad estilo Lubo) ── */}
      {/* midground · detrás del sujeto */}
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "36%", top: "9%", width: 232, zIndex: 2, filter: "blur(6px)", transform: "rotate(-6deg)", opacity: 0.7 }}>
        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(26,32,30,0.78), rgba(12,18,16,0.72))", border: "1px solid rgba(34,197,94,0.18)" }}>
          <span className="w-9 h-9 rounded-xl shrink-0" style={{ background: "linear-gradient(135deg,#4ade80,#16a34a)" }} />
          <div className="flex-1">
            <div className="h-2 rounded-full mb-1.5" style={{ background: "rgba(255,255,255,0.26)", width: "70%" }} />
            <div className="h-2 rounded-full" style={{ background: "rgba(255,255,255,0.12)", width: "48%" }} />
          </div>
        </div>
      </div>
      {/* foreground · delante del sujeto */}
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "4%", bottom: "8%", width: 254, zIndex: 14, filter: "blur(9px)", transform: "rotate(4deg)", opacity: 0.62 }}>
        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(22,28,26,0.72), rgba(10,14,12,0.66))", border: "1px solid rgba(34,197,94,0.15)" }}>
          <span className="w-8 h-8 rounded-lg shrink-0" style={{ background: "rgba(34,197,94,0.32)" }} />
          <div className="flex-1">
            <div className="h-2 rounded-full mb-1.5" style={{ background: "rgba(255,255,255,0.2)", width: "62%" }} />
            <div className="h-2 rounded-full" style={{ background: "rgba(255,255,255,0.1)", width: "44%" }} />
          </div>
        </div>
      </div>
      <div className="absolute pointer-events-none rounded-full" style={{ right: "22%", top: "34%", width: 10, height: 10, background: "rgba(74,222,128,0.75)", filter: "blur(2px)", zIndex: 14 }} />
      <div className="absolute pointer-events-none rounded-full" style={{ right: "12%", bottom: "32%", width: 7, height: 7, background: "rgba(134,255,175,0.7)", filter: "blur(2px)", zIndex: 14 }} />

      {/* ── CAPA 3 · Notificaciones crisp (animadas por el demo loop) ── */}
      {(demo.crm || reduced) && (
        <div className="hidden xl:block absolute right-[2%] top-[44%] pointer-events-none" style={{ zIndex: 20, opacity: demo.fade ? 0 : 1, transition: "opacity 0.5s ease" }}>
          <div style={{ animation: reduced ? undefined : "popIn 0.5s ease-out both" }}><CrmPill /></div>
        </div>
      )}
      {(demo.confirm || reduced) && (
        <div className="hidden lg:block absolute right-[2%] top-[62%] pointer-events-none" style={{ zIndex: 20, opacity: demo.fade ? 0 : 1, transition: "opacity 0.5s ease" }}>
          <div style={{ animation: reduced ? undefined : "popIn 0.5s ease-out both" }}><ConfirmPill /></div>
        </div>
      )}

      {/* grano para cohesión */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 22, opacity: 0.05, mixBlendMode: "overlay", backgroundImage: "url(\"data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='180'%20height='180'%3E%3Cfilter%20id='n'%3E%3CfeTurbulence%20type='fractalNoise'%20baseFrequency='0.85'%20numOctaves='2'%20stitchTiles='stitch'/%3E%3C/filter%3E%3Crect%20width='100%25'%20height='100%25'%20filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "180px 180px", backgroundRepeat: "repeat" }} />

      {/* divider bottom → transición friendly */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none" style={{ height: "26%", background: "linear-gradient(to top, #0a0a0b 0%, rgba(10,10,11,0.72) 36%, rgba(10,10,11,0.3) 64%, transparent 100%)", zIndex: 25 }} />

      {/* ── CAPA 4 · Contenido (texto) ── */}
      <div className="relative w-full max-w-[1180px] mx-auto px-6" style={{ zIndex: 30 }}>
        <div className="max-w-[560px] text-center lg:text-left mx-auto lg:mx-0">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6" style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}>
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
              <span className="text-[12px] font-semibold text-accent uppercase tracking-wider">Sistema para consultorios y clínicas</span>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1 className="text-[clamp(1.75rem,2.8vw,38px)] font-bold leading-[1.15] tracking-[-0.6px] mb-6">
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

      {/* ── Modal VSL ── */}
      {showVsl && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(4px)" }} onClick={() => setShowVsl(false)}>
          <div className="relative w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowVsl(false)} className="absolute -top-10 right-0 text-white/70 hover:text-white text-3xl leading-none cursor-pointer">×</button>
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video src={VSL} controls autoPlay playsInline className="w-full rounded-xl" style={{ border: "1px solid rgba(34,197,94,0.3)", boxShadow: "0 0 60px rgba(34,197,94,0.15)" }} />
          </div>
        </div>
      )}
    </section>
  );
}
