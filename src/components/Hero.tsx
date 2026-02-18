"use client";

import Image from "next/image";
import FadeUp from "./FadeUp";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Layer 1a — Main volumetric glow from top center */}
      <div
        className="hero-glow absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(34,197,94,0.45) 0%, rgba(34,197,94,0.2) 25%, rgba(16,185,129,0.1) 45%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Layer 1b — Concentrated core glow (brighter center) */}
      <div
        className="absolute pointer-events-none hero-glow"
        style={{
          top: "-80px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "500px",
          height: "400px",
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(34,197,94,0.5) 0%, rgba(34,197,94,0.15) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Layer 1c — Light beams from top */}
      <div
        className="absolute top-0 left-1/2 pointer-events-none"
        style={{
          width: "180px",
          height: "70%",
          transform: "translateX(-140%) rotate(-8deg)",
          background:
            "linear-gradient(180deg, rgba(34,197,94,0.18) 0%, rgba(34,197,94,0.04) 50%, transparent 80%)",
          filter: "blur(30px)",
          transformOrigin: "top center",
        }}
      />
      <div
        className="absolute top-0 left-1/2 pointer-events-none"
        style={{
          width: "120px",
          height: "65%",
          transform: "translateX(-50%)",
          background:
            "linear-gradient(180deg, rgba(34,197,94,0.2) 0%, rgba(34,197,94,0.05) 45%, transparent 75%)",
          filter: "blur(25px)",
          transformOrigin: "top center",
        }}
      />
      <div
        className="absolute top-0 left-1/2 pointer-events-none"
        style={{
          width: "160px",
          height: "60%",
          transform: "translateX(40%) rotate(6deg)",
          background:
            "linear-gradient(180deg, rgba(34,197,94,0.15) 0%, rgba(16,185,129,0.03) 50%, transparent 80%)",
          filter: "blur(35px)",
          transformOrigin: "top center",
        }}
      />

      {/* Layer 2 — Dot grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* Layer 3 — Noise texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.8' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
          opacity: 0.04,
          mixBlendMode: "overlay",
        }}
      />

      <div className="relative z-10 max-w-[1100px] mx-auto pt-14 pb-14 px-6">

        {/* Logo — full width, centered */}
        <FadeUp>
          <Image
            src="/logo_white.png"
            alt="Nexora"
            width={160}
            height={40}
            className="mx-auto mb-10"
            priority
          />
        </FadeUp>

        {/* Row on desktop, stack on mobile */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

          {/* ── LEFT: copy ── */}
          <div className="flex-1 text-center lg:text-left">
            <FadeUp>
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-accent-glow border border-[rgba(34,197,94,0.2)] rounded-full text-[13px] font-medium text-accent font-mono uppercase tracking-widest mb-7">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                En vivo &middot; Sistema probado
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h1 className="text-[clamp(30px,3.8vw,52px)] font-extrabold leading-[1.1] mb-6 tracking-tight">
                Deja de depender del boca en boca.
                <br />
                <span className="bg-gradient-to-r from-[#22c55e] via-[#10b981] to-[#059669] bg-clip-text text-transparent">
                  Llenamos tu agenda cada mes.
                </span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="text-lg text-text-secondary leading-relaxed max-w-[520px] lg:mx-0 mx-auto">
                Implementamos un sistema de captacion de clientes automatico para tu
                negocio. Sin que tengas que entender de tecnologia. Sin perder tiempo
                en redes. Sin depender de la suerte.
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

              {/* Chevron arrow */}
              <div className="flex justify-center mb-3">
                <svg
                  className="w-5 h-5 text-accent opacity-70"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </FadeUp>

            {/* Vertical video — 9:16 */}
            <FadeUp delay={0.35}>
              <div
                className="relative rounded-2xl overflow-hidden border border-border bg-bg-secondary shadow-[0_0_60px_rgba(34,197,94,0.06)]"
                style={{ width: "290px", aspectRatio: "9/16", maxHeight: "516px" }}
              >
                <video
                  src="/vsl_web.mp4"
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="/thumbnail-profile.jpg"
                />

                {/* Fallback overlay si el video no carga */}
                <noscript>
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-bg-secondary">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#22c55e] via-[#10b981] to-[#059669] rounded-full flex items-center justify-center">
                      <svg className="w-7 h-7 fill-black ml-1" viewBox="0 0 24 24">
                        <polygon points="5,3 19,12 5,21" />
                      </svg>
                    </div>
                  </div>
                </noscript>
              </div>
            </FadeUp>

          </div>
        </div>
      </div>
    </section>
  );
}
