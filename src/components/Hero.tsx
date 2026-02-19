"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import Image from "next/image";
import FadeUp from "./FadeUp";
import Particles from "./Particles";

const CAL_LINK = "nexoragrowth/30min";

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-4 h-4 shrink-0" style={{ fill: "currentColor" }}>
    <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM112,184a8,8,0,0,1-16,0V132.94l-4.42,2.22a8,8,0,0,1-7.16-14.32l16-8A8,8,0,0,1,112,120Zm56-8a8,8,0,0,1,0,16H136a8,8,0,0,1-6.4-12.8l28.78-38.37A8,8,0,1,0,145.07,132a8,8,0,1,1-13.85-8A24,24,0,0,1,176,136a23.76,23.76,0,0,1-4.84,14.45L152,176ZM48,80V48H72v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80Z" />
  </svg>
);

export default function Hero() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "hero-30min" });
      cal("ui", { theme: "dark", hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <section className="relative overflow-hidden">

      {/* Particles */}
      <Particles />

      {/* ── Single ambient glow — top-left origin, organic/natural ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "80%",
          height: "100%",
          top: 0,
          left: "-10%",
          background:
            "radial-gradient(ellipse at 15% 10%, rgba(34,197,94,0.10) 0%, rgba(34,197,94,0.04) 35%, transparent 65%)",
          zIndex: 0,
        }}
      />

      {/* Dot grid — very subtle, full coverage */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.022) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          maskImage: "linear-gradient(to bottom, black 0%, black 50%, transparent 90%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 50%, transparent 90%)",
          zIndex: 0,
        }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.8' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E\")",
          opacity: 0.02,
          mixBlendMode: "overlay",
          zIndex: 0,
        }}
      />

      <div className="relative max-w-[1100px] mx-auto pt-14 pb-14 px-6" style={{ zIndex: 2 }}>

        {/* Logo */}
        <FadeUp>
          <Image
            src="/logo_white.png"
            alt="Nexora"
            width={160}
            height={40}
            className="mx-auto lg:mx-0 mb-10"
            priority
          />
        </FadeUp>

        {/* Row: copy left | video right */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

          {/* ── LEFT: copy column ── */}
          <div className="flex-1 text-center lg:text-left">

            {/* Eyebrow badge — mismo formato que el resto */}
            <FadeUp>
              <div className="inline-flex items-center gap-3 mb-7">
                <span className="h-px w-8 bg-accent opacity-50" />
                <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-accent">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse shrink-0" />
                  +127 negocios &middot; Resultados en 30 dias
                </span>
                <span className="h-px w-8 bg-accent opacity-50" />
              </div>
            </FadeUp>

            {/* H1 */}
            <FadeUp delay={0.1}>
              <h1 className="text-[clamp(34px,4.2vw,58px)] font-extrabold leading-[1.08] mb-6 tracking-tight">
                Tu agenda llena,{" "}
                <br className="hidden sm:block" />
                <span
                  style={{
                    background:
                      "linear-gradient(to bottom, #16a34a 0%, #22c55e 35%, #4ade80 70%, #86efac 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  cada mes,
                </span>
                <br />
                <span className="text-white">
                  garantizado
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

            {/* Social proof — pill card style */}
            <FadeUp delay={0.3}>
              <div className="flex justify-center lg:justify-start mb-8">
                <div
                  className="inline-flex items-center gap-4 pl-2 pr-5 py-2 rounded-2xl"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {/* Avatar stack — fotos reales */}
                  <div className="flex">
                    {[
                      { src: "/6QmMqUMA0WAe6gXNmeiXr5JOwmM.avif", z: 3 },
                      { src: "/AvwhY88llWviCMFbwsZAsOkveog.avif", z: 2 },
                      { src: "/KAd1u3jS4UEa017akfQiGhmGTtk.avif", z: 1 },
                    ].map((av, i) => (
                      <div
                        key={i}
                        className="w-9 h-9 rounded-full border-[2px] border-bg-primary overflow-hidden relative shrink-0"
                        style={{ zIndex: av.z, marginLeft: i > 0 ? "-10px" : 0 }}
                      >
                        <Image
                          src={av.src}
                          alt="Cliente Nexora"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Stars + text */}
                  <div>
                    <div className="flex gap-0.5 mb-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-3 h-3" viewBox="0 0 24 24" style={{ fill: "#f59e0b" }}>
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-[12px] text-text-secondary">
                      Confiado por <strong className="text-text-primary">127+</strong> negocios
                    </span>
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* CTA button */}
            <FadeUp delay={0.4}>
              <div
                style={{
                  display: "inline-block",
                  borderRadius: "13px",
                  padding: "1px",
                    background:
                      "linear-gradient(135deg, rgba(134,239,172,0.75) 0%, rgba(74,222,128,0.5) 50%, rgba(34,197,94,0.75) 100%)",
                }}
              >
                <button
                  data-cal-namespace="hero-30min"
                  data-cal-link={CAL_LINK}
                  data-cal-config='{"layout":"month_view"}'
                  className="inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-[#16a34a] via-[#22c55e] to-[#4ade80] text-black font-bold text-base uppercase tracking-wide transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  style={{
                    borderRadius: "12px",
                    boxShadow:
                      "inset 0 2px 0 rgba(255,255,255,0.15), inset 0 -2px 0 rgba(0,0,0,0.15)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.boxShadow =
                      "inset 0 2px 0 rgba(255,255,255,0.2), inset 0 -2px 0 rgba(0,0,0,0.2), 0 8px 32px rgba(34,197,94,0.35)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.boxShadow =
                      "inset 0 2px 0 rgba(255,255,255,0.15), inset 0 -2px 0 rgba(0,0,0,0.15)";
                  }}
                >
                  Agendar llamada gratis
                  <CalendarIcon />
                </button>
              </div>
              <p className="text-[12px] text-text-muted mt-3">
                Sin compromiso &middot; 20 min &middot; Solo 3 cupos disponibles
              </p>
            </FadeUp>

          </div>

          {/* ── RIGHT: step + video vertical ── */}
          <div className="flex flex-col items-center flex-shrink-0">

            {/* Step badge */}
            <FadeUp delay={0.25}>
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="px-4 py-1.5 text-[12px] font-extrabold font-mono rounded-full tracking-widest uppercase"
                  style={{
                    background: "rgba(34,197,94,0.08)",
                    border: "1px solid rgba(34,197,94,0.45)",
                    color: "#4ade80",
                    letterSpacing: "0.12em",
                  }}
                >
                  Paso 1
                </span>
                <span className="text-text-secondary text-[15px] font-medium tracking-tight">
                  Mira este breve video
                </span>
              </div>
              <div className="flex justify-center mb-3">
                <svg
                  className="w-5 h-5 opacity-40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </FadeUp>

            {/* Vertical video */}
            <FadeUp delay={0.35}>
              <div className="relative w-full max-w-[300px]">

                {/* Ambient glow behind video */}
                <div
                  className="absolute inset-0 rounded-3xl pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse at 50% 60%, rgba(34,197,94,0.15) 0%, transparent 70%)",
                    filter: "blur(24px)",
                    transform: "scale(1.08)",
                  }}
                />

                {/* Video container */}
                <div
                  className="relative rounded-3xl overflow-hidden"
                  style={{
                    aspectRatio: "9/16",
                    maxHeight: "480px",
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
                      fill="none" stroke="rgba(34,197,94,0.10)" strokeWidth="1.5" />
                    <rect x="1.5" y="1.5" width="297" height="531" rx="23" ry="23"
                      fill="none" stroke="rgba(74,222,128,0.9)" strokeWidth="2"
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

                  {/* Bottom fade */}
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
