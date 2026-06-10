"use client";

import { useRef, useState } from "react";
import FadeUp from "./FadeUp";

const VSL = "/vsl_web.mp4";

/* Borde de energía verde "vivo": un rect redondeado con trazo orgánico (turbulencia
   + displacement) y glow — estilo Graphizo. Va sobre el container del video. */
function EnergyBorder() {
  return (
    <svg
      className="absolute pointer-events-none"
      aria-hidden="true"
      viewBox="0 0 1600 900"
      preserveAspectRatio="none"
      style={{ inset: "-12px", width: "calc(100% + 24px)", height: "calc(100% + 24px)", overflow: "visible", zIndex: 5 }}
    >
      <defs>
        <filter id="vslEnergy" x="-25%" y="-25%" width="150%" height="150%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04 0.05" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="11" xChannelSelector="R" yChannelSelector="G" result="disp" />
          <feGaussianBlur in="disp" stdDeviation="7" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="glow" />
            <feMergeNode in="glow" />
            <feMergeNode in="disp" />
          </feMerge>
        </filter>
        <linearGradient id="vslStroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d6ffe2" />
          <stop offset="30%" stopColor="#86efac" />
          <stop offset="65%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
        {/* fade diagonal: el borde brilla en top+left y se desvanece hacia right+bottom */}
        <linearGradient id="vslFade" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1600" y2="900">
          <stop offset="0%" stopColor="white" />
          <stop offset="14%" stopColor="white" />
          <stop offset="38%" stopColor="white" stopOpacity="0.22" />
          <stop offset="58%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id="vslFadeMask" maskUnits="userSpaceOnUse" x="-400" y="-400" width="2400" height="1700">
          <rect x="-400" y="-400" width="2400" height="1700" fill="url(#vslFade)" />
        </mask>
      </defs>
      <rect x="8" y="8" width="1584" height="884" rx="34" ry="34" fill="none" stroke="url(#vslStroke)" strokeWidth="4" filter="url(#vslEnergy)" mask="url(#vslFadeMask)" />
    </svg>
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
    { k: "El sistema responde", sub: "24/7, sin recepción" },
    { k: "Turno confirmado", sub: "agendado y al CRM" },
  ];

  return (
    <section className="relative overflow-hidden py-24" style={{ background: "#0a0a0b" }}>
      <div className="relative max-w-[1080px] mx-auto px-6 text-center" style={{ zIndex: 10 }}>
        <FadeUp>
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="h-px w-8 bg-accent opacity-50" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-accent">Cómo funciona</span>
            <span className="h-px w-8 bg-accent opacity-50" />
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="text-[clamp(24px,2.6vw,30px)] font-extrabold tracking-tight leading-tight mb-4">
            Todo lo que hace el sistema, <span style={{ color: "#22c55e" }}>en 3 minutos.</span>
          </h2>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="text-text-secondary text-base max-w-xl mx-auto mb-9">
            Sabemos que no tenés tiempo. En pocos minutos ves todo lo que el sistema hace por tu consultorio — sin teoría, sin humo.
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
            {/* card con borde de energía verde (estilo Graphizo) */}
            <div className="relative rounded-2xl" style={{ zIndex: 2 }}>
              <div className="relative rounded-2xl overflow-hidden bg-black" style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.6)" }}>
                <video ref={videoRef} src={VSL} controls={playing} playsInline preload="metadata" className="w-full block aspect-video bg-black object-cover" />
                {!playing && (
                  <button onClick={play} className="absolute inset-0 flex items-center justify-center group cursor-pointer" style={{ background: "rgba(10,10,11,0.35)" }} aria-label="Reproducir video">
                    <span className="w-[72px] h-[72px] rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110" style={{ background: "linear-gradient(135deg,#22c55e,#16a34a)", boxShadow: "0 0 40px rgba(34,197,94,0.6)" }}>
                      <span className="text-black text-2xl ml-1.5">▶</span>
                    </span>
                  </button>
                )}
              </div>

              {/* borde de energía verde orgánico */}
              <EnergyBorder />
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
