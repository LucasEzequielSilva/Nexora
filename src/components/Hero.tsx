"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import FadeUp from "./FadeUp";

const CAL_LINK = "nexoragrowth/30min";

/* Capturas de funciones reales de las demos, flotando alrededor del título */
const floats = [
  { img: "/demos/sweet-zona.png", pos: "left-[1%] top-[11%]", rotate: "-6deg", w: 170, h: 300 },
  { img: "/demos/barberia.png", pos: "left-[3%] top-[48%]", rotate: "4deg", w: 248, h: 150 },
  { img: "/demos/tnw-booking.png", pos: "left-[6%] bottom-[6%]", rotate: "-3deg", w: 236, h: 150 },
  { img: "/demos/lavadero.png", pos: "right-[2%] top-[12%]", rotate: "5deg", w: 270, h: 150 },
  { img: "/demos/sweet-items.png", pos: "right-[1%] top-[43%]", rotate: "6deg", w: 170, h: 300 },
  { img: "/demos/tapizados.png", pos: "right-[5%] bottom-[7%]", rotate: "-4deg", w: 248, h: 150 },
];

function FloatCard({ img, pos, rotate, w, h }: { img: string; pos: string; rotate: string; w: number; h: number }) {
  return (
    <div
      className={`hidden xl:block absolute ${pos}`}
      style={{ width: w, transform: `rotate(${rotate})`, zIndex: 1, opacity: 0.9 }}
    >
      <div
        className="rounded-xl overflow-hidden"
        style={{
          border: "1px solid rgba(34,197,94,0.18)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.55)",
          background: "#16191f",
        }}
      >
        <div
          className="flex items-center gap-1.5 px-3 py-2"
          style={{ background: "rgba(0,0,0,0.5)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <span className="w-2 h-2 rounded-full" style={{ background: "#ff5f57" }} />
          <span className="w-2 h-2 rounded-full" style={{ background: "#febc2e" }} />
          <span className="w-2 h-2 rounded-full" style={{ background: "#28c840" }} />
        </div>
        <div
          style={{
            height: h,
            backgroundColor: "#0e1014",
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
        />
      </div>
    </div>
  );
}

export default function Hero() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "hero-30min" });
      cal("ui", { theme: "dark", hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <section className="relative overflow-hidden min-h-[93vh] flex items-center">
      {/* Blobs */}
      <div className="absolute pointer-events-none rounded-full" style={{ width: 700, height: 700, background: "#22c55e", opacity: 0.055, top: -180, right: -120, filter: "blur(100px)" }} />
      <div className="absolute pointer-events-none rounded-full" style={{ width: 600, height: 600, background: "#7B61FF", opacity: 0.065, bottom: -140, left: -80, filter: "blur(110px)" }} />
      <div className="absolute pointer-events-none rounded-full" style={{ width: 300, height: 300, background: "#eab308", opacity: 0.03, top: "40%", right: "35%", filter: "blur(80px)" }} />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.022) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          maskImage: "linear-gradient(to bottom, black 0%, black 50%, transparent 90%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 50%, transparent 90%)",
        }}
      />

      {/* Capturas flotantes */}
      {floats.map((f) => (
        <FloatCard key={f.img} {...f} />
      ))}

      {/* Contenido centrado */}
      <div className="relative w-full max-w-[760px] mx-auto py-20 px-6 text-center" style={{ zIndex: 2 }}>
        <FadeUp>
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-7"
            style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}
          >
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
            <span className="text-[12px] font-semibold text-accent uppercase tracking-wider">
              Sistemas de WhatsApp, agenda y CRM · Argentina
            </span>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h1 className="text-[clamp(3rem,6.5vw,5.4rem)] font-extrabold leading-[1.03] tracking-[-2.5px] mb-7">
            Tu negocio,
            <br />
            con{" "}
            <span
              style={{
                background: "linear-gradient(to bottom, #22c55e 0%, #4ade80 50%, #f0fdf4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 50px rgba(34,197,94,0.3))",
              }}
            >
              sistema.
            </span>
          </h1>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="text-[18px] text-text-muted leading-[1.75] max-w-[560px] mx-auto mb-9 font-light">
            Dejá de perder turnos por no contestar a tiempo y de cargar con las ausencias. El sistema responde, agenda y confirma solo — 24/7, sin que tu equipo toque nada.
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {["Sistema activo en menos de 2 semanas", "Soporte WhatsApp incluido", "Sin contrato largo"].map((item, i) => (
              <span key={i} className="flex items-center gap-2 text-[13px] text-text-muted">
                <span className="text-accent font-bold text-[14px]">✓</span>
                {item}
              </span>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.4}>
          <div className="flex flex-wrap justify-center gap-3.5">
            <div
              style={{
                display: "inline-block",
                borderRadius: "9px",
                padding: "1px",
                position: "relative",
                overflow: "hidden",
                background: "linear-gradient(135deg, rgba(240,253,244,1) 0%, rgba(34,197,94,0.6) 50%, rgba(22,163,74,1) 100%)",
                boxShadow: "0 0 20px rgba(34,197,94,0.2), 0 0 40px rgba(34,197,94,0.1)",
              }}
            >
              <div
                style={{
                  position: "absolute", top: "-50%", left: "-50%", width: "200%", height: "200%",
                  background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
                  animation: "shine 3s infinite", pointerEvents: "none",
                }}
              />
              <style>{`@keyframes shine { 0% { transform: translate(-100%, -100%); } 100% { transform: translate(100%, 100%); } }`}</style>
              <button
                data-cal-namespace="hero-30min"
                data-cal-link={CAL_LINK}
                data-cal-config='{"layout":"month_view"}'
                className="inline-flex items-center gap-2 px-7 py-4 bg-gradient-to-b from-[#22c55e] to-[#16a34a] text-black font-bold text-[15px] rounded-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(0,0,0,0.2), 0 10px 20px -10px rgba(34,197,94,0.5)" }}
              >
                Agendá tu llamada →
              </button>
            </div>

            <a
              href="#planes"
              className="inline-flex items-center px-7 py-4 text-[15px] font-medium rounded-lg transition-all duration-200 hover:border-accent hover:text-accent"
              style={{ color: "#e4e4e7", border: "1px solid rgba(255,255,255,0.08)", background: "transparent" }}
            >
              Ver los planes
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
