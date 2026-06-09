"use client";

import { useState, useRef } from "react";
import FadeUp from "./FadeUp";
import { useDemoLoop, usePrefersReducedMotion, WhatsAppBg, CrmPill, ConfirmPill } from "./VslHero";

const CAL_LINK = "nexoragrowth/30min";
const VSL = "/vsl_web.mp4";

/* Test B — hero full interfaz, layout apilado: copy centrado arriba + la app de WhatsApp
   en vivo como product-shot en perspectiva abajo (bleed al fold). Sin cogne. */
export default function VslHeroInterface() {
  const [showVsl, setShowVsl] = useState(false);
  const reduced = usePrefersReducedMotion();
  const demo = useDemoLoop(reduced);
  const panelRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!panelRef.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    panelRef.current.style.transform = `rotateX(${7 - y * 3}deg) rotateY(${x * 4}deg)`;
  };

  return (
    <section onMouseMove={onMove} className="relative overflow-hidden min-h-[100svh] flex flex-col items-center" style={{ background: "#0a0a0b" }}>
      {/* ── luz direccional (top-right, consistente con los rays) + vignette ── */}
      <div className="absolute pointer-events-none" style={{ top: "-12%", right: "-6%", width: "62%", height: "78%", background: "radial-gradient(ellipse at 82% 8%, rgba(34,197,94,0.17) 0%, rgba(34,197,94,0.04) 42%, transparent 72%)", filter: "blur(28px)", zIndex: 0 }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 92% 82% at 50% 40%, transparent 52%, rgba(10,10,11,0.55) 100%)", zIndex: 1 }} />

      {/* ── light rays desde el top-right ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block" style={{ zIndex: 1 }}>
        <div className="absolute" style={{ top: "-8%", right: "8%", width: 320, height: 320, background: "radial-gradient(circle, rgba(224,255,236,0.32) 0%, rgba(74,222,128,0.18) 28%, rgba(34,197,94,0.05) 52%, transparent 74%)", filter: "blur(28px)" }} />
        <div className="absolute" style={{ top: "-12%", right: "16%", width: "2px", height: "70%", background: "linear-gradient(to bottom, rgba(224,255,236,0.4), transparent 60%)", filter: "blur(1px)", transform: "rotate(15deg)", transformOrigin: "top" }} />
        <div className="absolute" style={{ top: "-12%", right: "24%", width: "1.5px", height: "64%", background: "linear-gradient(to bottom, rgba(74,222,128,0.26), transparent 56%)", filter: "blur(2px)", transform: "rotate(22deg)", transformOrigin: "top" }} />
      </div>

      {/* ── CAPA 1 · Copy centrado arriba ── */}
      <div className="relative w-full max-w-[860px] mx-auto px-6 text-center pt-24 md:pt-28" style={{ zIndex: 30 }}>
        <FadeUp>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6" style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}>
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
            <span className="text-[12px] font-semibold text-accent uppercase tracking-wider">Sistema para consultorios y clínicas</span>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h1 className="text-[clamp(1.9rem,3.2vw,42px)] font-bold leading-[1.12] tracking-[-0.6px] mb-5">
            La agenda de tu consultorio,{" "}
            <span style={{ background: "linear-gradient(to bottom, #22c55e 0%, #4ade80 50%, #f0fdf4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", filter: "drop-shadow(0 0 50px rgba(34,197,94,0.3))" }}>
              llena sola.
            </span>
          </h1>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="text-[17px] text-text-secondary leading-[1.7] max-w-[620px] mx-auto mb-7 font-light">
            El sistema responde, agenda y confirma <strong className="text-white font-semibold">solo — 24/7</strong> — y descarga a tu recepción. Vos solo atendés.
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2.5 mb-8">
            {["Andando en menos de 2 semanas", "Recordatorios que matan las ausencias", "Sin contrato largo"].map((item, i) => (
              <span key={i} className="flex items-center gap-2 text-[13px] text-text-muted">
                <span className="text-accent font-bold text-[14px]">✓</span>
                {item}
              </span>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.4}>
          <div className="flex flex-wrap justify-center gap-3.5 mb-5">
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

      {/* ── CAPA 2 · La interfaz (WhatsApp en vivo) como product-shot abajo, bleed al fold ── */}
      <div className="relative w-full flex-1 flex justify-center px-6 mt-12 hidden md:flex" style={{ zIndex: 10, perspective: "1600px" }}>
        <div className="relative w-full max-w-[1140px]">
          {/* screen-bloom: la pantalla emite luz verde */}
          <div className="absolute pointer-events-none" style={{ top: -34, left: "-4%", right: "-4%", height: 220, background: "radial-gradient(ellipse at 50% 0%, rgba(34,197,94,0.3) 0%, rgba(34,197,94,0.08) 46%, transparent 72%)", filter: "blur(34px)", zIndex: 0 }} />
          {/* panel = ventana del producto (Asiri panel), no screenshot genérico de WhatsApp */}
          <div
            ref={panelRef}
            className="relative mx-auto rounded-[15px] overflow-hidden flex flex-col"
            style={{ width: "100%", height: "62vh", minHeight: 460, transformOrigin: "center top", transform: "rotateX(7deg)", border: "1px solid rgba(34,197,94,0.22)", boxShadow: "0 -8px 60px rgba(34,197,94,0.1), 0 50px 130px rgba(0,0,0,0.72), inset 0 1px 0 rgba(255,255,255,0.06)", background: "#0b0f13", transition: "transform 0.3s ease-out", willChange: "transform", zIndex: 1 }}
          >
            {/* chrome / barra de producto */}
            <div className="flex items-center px-4 shrink-0 relative" style={{ height: 42, background: "linear-gradient(180deg,#121922,#0b1014)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-1.5">
                {[0, 1, 2].map((d) => (
                  <span key={d} className="rounded-full" style={{ width: 9, height: 9, background: "rgba(255,255,255,0.14)" }} />
                ))}
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded-md" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-[11px] font-mono" style={{ color: "#aebac1" }}>WhatsApp · Consultorio Dra. Raquel</span>
              </div>
              <span className="ml-auto text-[11px] font-mono text-accent">en vivo</span>
            </div>
            {/* contenido = WhatsApp en vivo */}
            <div className="flex-1 min-h-0">
              <WhatsAppBg visible={demo.visible} typing={demo.typing} fade={demo.fade} />
            </div>
            {/* sheen de vidrio + rim superior (lo despega de "screenshot plano") */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(118deg, rgba(255,255,255,0.07) 0%, transparent 24%, transparent 74%, rgba(255,255,255,0.03) 100%)" }} />
            <div className="absolute inset-x-0 top-0 pointer-events-none" style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(74,222,128,0.55), transparent)" }} />
          </div>

          {/* notificaciones popeando sobre la interfaz, agrupadas arriba-derecha */}
          {(demo.crm || reduced) && (
            <div className="hidden xl:block absolute right-[1%] top-[4%] pointer-events-none" style={{ zIndex: 20, opacity: demo.fade ? 0 : 1, transition: "opacity 0.5s ease" }}>
              <div style={{ animation: reduced ? undefined : "popIn 0.5s ease-out both" }}><CrmPill /></div>
            </div>
          )}
          {(demo.confirm || reduced) && (
            <div className="hidden lg:block absolute right-[1%] top-[23%] pointer-events-none" style={{ zIndex: 20, opacity: demo.fade ? 0 : 1, transition: "opacity 0.5s ease" }}>
              <div style={{ animation: reduced ? undefined : "popIn 0.5s ease-out both" }}><ConfirmPill /></div>
            </div>
          )}
        </div>
      </div>

      {/* grano para cohesión */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 22, opacity: 0.05, mixBlendMode: "overlay", backgroundImage: "url(\"data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='180'%20height='180'%3E%3Cfilter%20id='n'%3E%3CfeTurbulence%20type='fractalNoise'%20baseFrequency='0.85'%20numOctaves='2'%20stitchTiles='stitch'/%3E%3C/filter%3E%3Crect%20width='100%25'%20height='100%25'%20filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "180px 180px", backgroundRepeat: "repeat" }} />

      {/* divider bottom → transición friendly */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none" style={{ height: "20%", background: "linear-gradient(to top, #0a0a0b 0%, rgba(10,10,11,0.7) 44%, transparent 100%)", zIndex: 25 }} />

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
