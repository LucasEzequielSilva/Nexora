"use client";

import { useRef, useState } from "react";
import FadeUp from "./FadeUp";

const VSL = "/vsl_web.mp4";

/* Rayos de luz que irradian del video hacia los costados (estilo Jhonny Lubo) */
function RaysFromSides() {
  const fan = [-16, -9, -3, 3, 9, 16];
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* glow lateral a cada lado del video */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2" style={{ width: "40%", height: "70%", background: "radial-gradient(ellipse at left center, rgba(34,197,94,0.22), transparent 72%)", filter: "blur(36px)" }} />
      <div className="absolute top-1/2 right-0 -translate-y-1/2" style={{ width: "40%", height: "70%", background: "radial-gradient(ellipse at right center, rgba(34,197,94,0.22), transparent 72%)", filter: "blur(36px)" }} />
      {/* streaks izquierda (brillan en el centro, se apagan al borde) */}
      {fan.map((deg, i) => {
        const strong = i === 2 || i === 3;
        return (
          <div
            key={`l${i}`}
            className="absolute top-1/2"
            style={{ right: "50%", width: "50%", height: strong ? 2 : 1.5, transformOrigin: "right center", transform: `translateY(-50%) rotate(${deg}deg)`, background: "linear-gradient(to left, rgba(224,255,236,0.75), rgba(74,222,128,0.4) 38%, transparent)", filter: "blur(0.6px)", opacity: strong ? 0.95 : 0.55 }}
          />
        );
      })}
      {/* streaks derecha */}
      {fan.map((deg, i) => {
        const strong = i === 2 || i === 3;
        return (
          <div
            key={`r${i}`}
            className="absolute top-1/2"
            style={{ left: "50%", width: "50%", height: strong ? 2 : 1.5, transformOrigin: "left center", transform: `translateY(-50%) rotate(${deg}deg)`, background: "linear-gradient(to right, rgba(224,255,236,0.75), rgba(74,222,128,0.4) 38%, transparent)", filter: "blur(0.6px)", opacity: strong ? 0.95 : 0.55 }}
          />
        );
      })}
    </div>
  );
}

export default function VslVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    videoRef.current?.play();
    setPlaying(true);
  };

  const formula = [
    { k: "Paciente escribe", sub: "a cualquier hora" },
    { k: "Asiri responde sola", sub: "24/7, sin recepción" },
    { k: "Turno confirmado", sub: "agendado y al CRM" },
  ];

  return (
    <section className="relative overflow-hidden py-24 md:py-32" style={{ background: "#0a0a0b" }}>
      {/* ── CAPA 0 · background premium (cohesivo con el hero) ── */}
      {/* spotlight verde detrás del video */}
      <div className="absolute pointer-events-none" style={{ zIndex: 0, left: "50%", top: "56%", transform: "translate(-50%,-50%)", width: 980, height: 560, background: "radial-gradient(ellipse at center, rgba(34,197,94,0.14) 0%, rgba(34,197,94,0.04) 42%, transparent 70%)", filter: "blur(50px)" }} />
      {/* glows laterales tenues */}
      <div className="absolute pointer-events-none rounded-full hidden lg:block" style={{ zIndex: 0, width: 360, height: 360, left: "3%", top: "28%", background: "radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 66%)", filter: "blur(60px)" }} />
      <div className="absolute pointer-events-none rounded-full hidden lg:block" style={{ zIndex: 0, width: 380, height: 380, right: "2%", bottom: "8%", background: "radial-gradient(circle, rgba(22,163,74,0.09) 0%, transparent 66%)", filter: "blur(64px)" }} />
      {/* vignette para enfocar */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0, background: "radial-gradient(ellipse 88% 84% at 50% 48%, transparent 54%, rgba(10,10,11,0.6) 100%)" }} />
      {/* grano para cohesión cinematográfica */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0, opacity: 0.045, mixBlendMode: "overlay", backgroundImage: "url(\"data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='180'%20height='180'%3E%3Cfilter%20id='n'%3E%3CfeTurbulence%20type='fractalNoise'%20baseFrequency='0.85'%20numOctaves='2'%20stitchTiles='stitch'/%3E%3C/filter%3E%3Crect%20width='100%25'%20height='100%25'%20filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "180px 180px", backgroundRepeat: "repeat" }} />

      <div className="relative max-w-[1080px] mx-auto px-6 text-center" style={{ zIndex: 10 }}>
        <FadeUp>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5" style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}>
            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
            <span className="text-[11px] font-semibold text-accent uppercase tracking-wider font-mono">El sistema en vivo</span>
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="text-[clamp(24px,2.6vw,30px)] font-bold tracking-tight leading-[1.15] mb-4">
            Mirá cómo <span style={{ color: "#22c55e" }}>Asiri agenda un turno sola</span>, de punta a punta.
          </h2>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="text-text-secondary text-[16px] max-w-xl mx-auto mb-9 font-light">
            3 minutos. El flujo real andando en el consultorio de la Dra. Raquel — sin ediciones, sin humo.
          </p>
        </FadeUp>

        {/* fórmula (estilo Lubo: A + B = C) */}
        <FadeUp delay={0.25}>
          <div className="hidden sm:flex items-center justify-center gap-4 mb-10">
            {formula.map((f, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-[14px] font-bold text-white leading-tight">{f.k}</p>
                  <p className="text-[11px] text-text-muted font-mono mt-0.5">{f.sub}</p>
                </div>
                {i < formula.length - 1 && <span className="text-accent text-[18px] font-bold">{i === 0 ? "+" : "="}</span>}
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Video card con rayos */}
        <FadeUp delay={0.3}>
          <div className="relative mx-auto max-w-[760px]">
            {/* rayos detrás del video, desbordan a los costados */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden md:block" style={{ width: "126%", height: "120%", zIndex: 0 }}>
              <RaysFromSides />
            </div>
            {/* dots recortados = halo que abraza el container (el card opaco tapa el centro, solo se ve el anillo) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden md:block" style={{ width: "130%", height: "138%", zIndex: 0, opacity: 0.5, filter: "blur(2.5px)", backgroundImage: "url(/dots-base.webp)", backgroundRepeat: "repeat", backgroundSize: "200px 200px", WebkitMaskImage: "radial-gradient(ellipse at center, black 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.25) 72%, transparent 90%)", maskImage: "radial-gradient(ellipse at center, black 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.25) 72%, transparent 90%)" }} />
            {/* glow del card */}
            <div className="absolute -inset-4 pointer-events-none rounded-[28px]" style={{ background: "radial-gradient(ellipse at center, rgba(34,197,94,0.22), transparent 70%)", filter: "blur(30px)", zIndex: 1 }} />
            {/* card */}
            <div className="relative rounded-2xl overflow-hidden" style={{ zIndex: 2, border: "1px solid rgba(34,197,94,0.4)", boxShadow: "0 0 60px rgba(34,197,94,0.2), 0 30px 80px rgba(0,0,0,0.6)" }}>
              <video ref={videoRef} src={VSL} controls={playing} playsInline preload="metadata" className="w-full block aspect-video bg-black object-cover" />
              {!playing && (
                <button onClick={play} className="absolute inset-0 flex items-center justify-center group cursor-pointer" style={{ background: "rgba(10,10,11,0.35)" }} aria-label="Reproducir video">
                  <span className="w-[72px] h-[72px] rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110" style={{ background: "linear-gradient(135deg,#22c55e,#16a34a)", boxShadow: "0 0 40px rgba(34,197,94,0.6)" }}>
                    <span className="text-black text-2xl ml-1.5">▶</span>
                  </span>
                </button>
              )}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
