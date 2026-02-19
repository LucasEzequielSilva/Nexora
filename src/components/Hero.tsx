"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import Image from "next/image";
import FadeUp from "./FadeUp";
import Particles from "./Particles";

const CAL_LINK = "nexoragrowth/30min";

export default function Hero() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "hero-30min" });
      cal("ui", { theme: "dark", hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <section className="relative overflow-hidden">

      {/* Snow particles */}
      <Particles />

      {/* Layer 1a — Main volumetric glow from top center */}
      <div
        className="hero-glow absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(34,197,94,0.45) 0%, rgba(34,197,94,0.2) 25%, rgba(16,185,129,0.1) 45%, transparent 70%)",
          filter: "blur(80px)",
          zIndex: 0,
        }}
      />

      {/* Layer 1b — Concentrated core glow */}
      <div
        className="absolute pointer-events-none hero-glow"
        style={{
          top: "-80px", left: "50%", transform: "translateX(-50%)",
          width: "500px", height: "400px",
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(34,197,94,0.5) 0%, rgba(34,197,94,0.15) 40%, transparent 70%)",
          filter: "blur(60px)",
          zIndex: 0,
        }}
      />

      {/* Layer 1c — Light beams */}
      <div className="absolute top-0 left-1/2 pointer-events-none" style={{ width: "180px", height: "70%", transform: "translateX(-140%) rotate(-8deg)", background: "linear-gradient(180deg, rgba(34,197,94,0.18) 0%, rgba(34,197,94,0.04) 50%, transparent 80%)", filter: "blur(30px)", transformOrigin: "top center", zIndex: 0 }} />
      <div className="absolute top-0 left-1/2 pointer-events-none" style={{ width: "120px", height: "65%", transform: "translateX(-50%)", background: "linear-gradient(180deg, rgba(34,197,94,0.2) 0%, rgba(34,197,94,0.05) 45%, transparent 75%)", filter: "blur(25px)", transformOrigin: "top center", zIndex: 0 }} />
      <div className="absolute top-0 left-1/2 pointer-events-none" style={{ width: "160px", height: "60%", transform: "translateX(40%) rotate(6deg)", background: "linear-gradient(180deg, rgba(34,197,94,0.15) 0%, rgba(16,185,129,0.03) 50%, transparent 80%)", filter: "blur(35px)", transformOrigin: "top center", zIndex: 0 }} />

      {/* Layer 2 — Dot grid (faded at bottom) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
          maskImage: "linear-gradient(to bottom, black 0%, black 35%, transparent 80%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 35%, transparent 80%)",
          zIndex: 0,
        }}
      />

      {/* Layer 2b — Vertical grid lines (Pavyon style) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 80px)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 70%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 70%, transparent 100%)",
          zIndex: 0,
        }}
      />

      {/* Layer 3 — Noise texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.8' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
          opacity: 0.04,
          mixBlendMode: "overlay",
          zIndex: 0,
        }}
      />

      <div className="relative max-w-[1100px] mx-auto pt-14 pb-14 px-6" style={{ zIndex: 2 }}>

        {/* Logo */}
        <FadeUp>
          <Image src="/logo_white.png" alt="Nexora" width={160} height={40} className="mx-auto mb-10" priority />
        </FadeUp>

        {/* Row: copy left | video right */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

          {/* ── LEFT: copy column ── */}
          <div className="flex-1 text-center lg:text-left">

            {/* Badge */}
            <FadeUp>
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-accent-glow border border-[rgba(34,197,94,0.2)] rounded-full text-[13px] font-medium text-accent font-mono uppercase tracking-widest mb-7">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                +127 negocios &middot; Resultados en 30 dias
              </div>
            </FadeUp>

            {/* H1 — accent gradient top (strong) → bottom (illuminated) */}
            <FadeUp delay={0.1}>
              <h1 className="text-[clamp(34px,4.2vw,58px)] font-extrabold leading-[1.08] mb-6 tracking-tight">
                Tu agenda llena,{" "}
                <br className="hidden sm:block" />
                <span
                  style={{
                    background: "linear-gradient(to bottom, #16a34a 0%, #22c55e 35%, #4ade80 70%, #86efac 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  cada mes.
                </span>
                <br />
                <span className="text-text-secondary text-[clamp(22px,2.8vw,38px)] font-bold">
                  Garantizado.
                </span>
              </h1>
            </FadeUp>

            {/* Paragraph */}
            <FadeUp delay={0.2}>
              <p className="text-[17px] text-text-secondary leading-relaxed max-w-[500px] lg:mx-0 mx-auto mb-8">
                Meta Ads + IA + seguimiento automatico. Atraemos prospectos calificados,
                filtramos curiosos y llenamos tu agenda &mdash; sin que toques una red social.
              </p>
            </FadeUp>

            {/* Social proof bar */}
            <FadeUp delay={0.3}>
              <div className="flex items-center gap-3 justify-center lg:justify-start mb-8">
                {/* Avatar stack */}
                <div className="flex items-center">
                  {["#16a34a","#15803d","#166534","#22c55e","#4ade80"].map((color, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-bg-primary flex items-center justify-center text-[10px] font-bold text-white"
                      style={{
                        background: `radial-gradient(circle at 35% 35%, ${color}cc, ${color}66)`,
                        marginLeft: i === 0 ? 0 : "-8px",
                        zIndex: 5 - i,
                        position: "relative",
                      }}
                    >
                      {["A","M","R","C","L"][i]}
                    </div>
                  ))}
                </div>
                {/* Stars */}
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5 fill-accent" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <span className="text-[13px] text-text-secondary font-medium">
                  <strong className="text-text-primary">127</strong> negocios confian en Nexora
                </span>
              </div>
            </FadeUp>

            {/* CTA button */}
            <FadeUp delay={0.4}>
              <button
                data-cal-namespace="hero-30min"
                data-cal-link={CAL_LINK}
                data-cal-config='{"layout":"month_view"}'
                className="inline-flex items-center gap-2.5 px-8 py-[16px] bg-gradient-to-r from-[#22c55e] via-[#10b981] to-[#059669] text-black font-bold text-[16px] rounded-xl uppercase tracking-wide transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(34,197,94,0.35)] active:translate-y-0 cursor-pointer"
              >
                Agendar llamada gratis
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
              <p className="text-[12px] text-text-muted mt-3">
                Sin compromiso &middot; 20 min &middot; Solo 3 lugares disponibles
              </p>
            </FadeUp>

          </div>

          {/* ── RIGHT: step + video vertical ── */}
          <div className="flex flex-col items-center flex-shrink-0">

            {/* Step badge */}
            <FadeUp delay={0.25}>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-4 py-1.5 bg-accent text-black text-[13px] font-extrabold font-mono rounded-full tracking-wide">
                  Paso 1
                </span>
                <span className="text-text-secondary text-[15px] font-medium">
                  Mira este breve video
                </span>
              </div>
              <div className="flex justify-center mb-3">
                <svg className="w-5 h-5 text-accent opacity-70" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </FadeUp>

            {/* Vertical video — 9:16 */}
            <FadeUp delay={0.35}>
              <div className="relative" style={{ width: "300px" }}>

                {/* Floating card 1 — Nueva consulta */}
                <div
                  className="hidden lg:flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl pointer-events-none"
                  style={{
                    position: "absolute", top: "60px", left: "-168px", zIndex: 20,
                    background: "rgba(24,24,27,0.92)",
                    border: "1px solid rgba(34,197,94,0.2)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                    backdropFilter: "blur(12px)",
                    animation: "floatY 5s ease-in-out infinite",
                    minWidth: "155px",
                  }}
                >
                  <span className="w-2 h-2 rounded-full bg-accent shrink-0" style={{ boxShadow: "0 0 6px rgba(34,197,94,0.8)" }} />
                  <div>
                    <p className="text-[11px] font-semibold text-text-primary leading-tight">Nueva consulta</p>
                    <p className="text-[10px] text-text-muted leading-tight">Hace 2 minutos</p>
                  </div>
                </div>

                {/* Floating card 2 — Stats */}
                <div
                  className="hidden lg:flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl pointer-events-none"
                  style={{
                    position: "absolute", bottom: "130px", left: "-168px", zIndex: 20,
                    background: "rgba(24,24,27,0.92)",
                    border: "1px solid rgba(34,197,94,0.2)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                    backdropFilter: "blur(12px)",
                    animation: "floatY 5s ease-in-out infinite 1.8s",
                    minWidth: "155px",
                  }}
                >
                  <svg viewBox="0 0 24 24" className="w-7 h-7 shrink-0" fill="none" stroke="rgba(34,197,94,1)" strokeWidth="2">
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                    <polyline points="16 7 22 7 22 13" />
                  </svg>
                  <div>
                    <p className="text-[13px] font-bold text-accent leading-tight">+47 clientes</p>
                    <p className="text-[10px] text-text-muted leading-tight">este mes</p>
                  </div>
                </div>

                {/* Ambient glow */}
                <div
                  className="absolute inset-0 rounded-3xl pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse at 50% 60%, rgba(34,197,94,0.18) 0%, transparent 70%)",
                    filter: "blur(24px)",
                    transform: "scale(1.08)",
                  }}
                />

                {/* Video container */}
                <div
                  className="relative rounded-3xl overflow-hidden"
                  style={{
                    aspectRatio: "9/16",
                    maxHeight: "530px",
                    boxShadow: "0 0 0 1px rgba(34,197,94,0.15), 0 32px 64px rgba(0,0,0,0.5)",
                  }}
                >
                  {/* Animated light ring */}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{ zIndex: 10 }}
                    viewBox="0 0 300 534"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <filter id="ringGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                    <rect x="1.5" y="1.5" width="297" height="531" rx="23" ry="23"
                      fill="none" stroke="rgba(34,197,94,0.12)" strokeWidth="1.5" />
                    <rect x="1.5" y="1.5" width="297" height="531" rx="23" ry="23"
                      fill="none" stroke="rgba(74,222,128,0.95)" strokeWidth="2.5"
                      strokeDasharray="130 1497" strokeLinecap="round" filter="url(#ringGlow)"
                    >
                      <animate attributeName="stroke-dashoffset" from="0" to="-1627" dur="4s" repeatCount="indefinite" />
                    </rect>
                  </svg>

                  <video
                    src="/vsl_web.mp4"
                    className="w-full h-full object-cover"
                    controls
                    playsInline
                    poster="/thumbnail-profile.jpg"
                  />

                  {/* Bottom fade mask */}
                  <div
                    className="absolute bottom-0 left-0 w-full pointer-events-none"
                    style={{
                      height: "96px",
                      background: "linear-gradient(to top, #0a0a0b 0%, transparent 100%)",
                      zIndex: 5,
                    }}
                  />
                </div>
              </div>
            </FadeUp>

          </div>
        </div>
      </div>
    </section>
  );
}
