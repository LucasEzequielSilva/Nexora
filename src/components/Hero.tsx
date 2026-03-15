"use client";

import { useEffect, useState, useRef } from "react";
import { getCalApi } from "@calcom/embed-react";
import FadeUp from "./FadeUp";
import Particles from "./Particles";

const CAL_LINK = "nexoragrowth/30min";

/* ── Animated counter hook ── */
function useAnimatedCounter(target: number, suffix: string, duration: number, start: boolean) {
  const [value, setValue] = useState("0" + suffix);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!start || hasRun.current) return;
    hasRun.current = true;
    const steps = 50;
    const stepTime = duration / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += target / steps;
      if (current >= target) {
        setValue(target + suffix);
        clearInterval(interval);
      } else {
        setValue(Math.floor(current) + suffix);
      }
    }, stepTime);
    return () => clearInterval(interval);
  }, [start, target, suffix, duration]);

  return value;
}

/* ── Dashboard Mockup ── */
function DashboardMockup() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const turnos = useAnimatedCounter(34, "", 1000, visible);
  const confirm = useAnimatedCounter(97, "%", 1200, visible);
  const pacs = useAnimatedCounter(218, "", 1400, visible);
  const aus = useAnimatedCounter(2, "%", 800, visible);

  return (
    <div
      ref={ref}
      className="rounded-2xl p-5 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1a1a1e 0%, #18181b 40%, #16191f 100%)",
        border: "1px solid rgba(34,197,94,0.2)",
        boxShadow: "0 0 30px rgba(34,197,94,0.08), 0 20px 40px rgba(0,0,0,0.4)",
      }}
    >
      {/* Subtle glow */}
      <div
        className="absolute -top-16 -right-16 w-40 h-40 rounded-full pointer-events-none"
        style={{ background: "#22c55e", opacity: 0.04, filter: "blur(40px)" }}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <span className="text-[11px] font-bold text-text-muted uppercase tracking-widest">
          Panel de métricas
        </span>
        <span className="flex items-center gap-1.5 text-[11px] font-semibold text-accent">
          <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
          En vivo
        </span>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 gap-2.5 mb-5">
        {[
          { val: turnos, label: "Turnos hoy", delta: "↑ 12 vs ayer", color: "text-accent" },
          { val: confirm, label: "Confirmados", delta: "↑ 8% semanal", color: "text-white" },
          { val: pacs, label: "Pac. activos", delta: "↑ 23 este mes", color: "text-white" },
          { val: aus, label: "Ausentismo", delta: "↓ 34% vs antes", color: "text-yellow-400" },
        ].map((m, i) => (
          <div
            key={i}
            className="rounded-xl p-3.5"
            style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className={`text-[28px] font-extrabold leading-none ${m.color}`}>{m.val}</div>
            <div className="text-[10px] text-text-muted uppercase tracking-wider mt-1">{m.label}</div>
            <div className="text-[11px] text-accent font-semibold mt-1.5">{m.delta}</div>
          </div>
        ))}
      </div>

      {/* Occupation bars */}
      <div className="text-[10px] text-text-muted uppercase tracking-wider font-semibold mb-3">
        Ocupación por especialidad
      </div>
      {[
        { label: "Cardiología", pct: 87, color: "#22c55e" },
        { label: "Ginecología", pct: 73, color: "#7B61FF" },
        { label: "Nutrición", pct: 91, color: "#eab308" },
      ].map((bar, i) => (
        <div key={i} className="flex items-center gap-2.5 mb-2">
          <span className="text-[11px] text-text-muted w-[72px] text-right shrink-0">{bar.label}</span>
          <div className="flex-1 h-[5px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
            <div
              className="h-full rounded-full"
              style={{
                width: visible ? `${bar.pct}%` : "0%",
                background: bar.color,
                transition: "width 1.8s cubic-bezier(0.4, 0, 0.2, 1)",
                transitionDelay: `${0.5 + i * 0.15}s`,
              }}
            />
          </div>
          <span className="text-[11px] text-text-secondary w-7 text-right shrink-0">{bar.pct}%</span>
        </div>
      ))}

      {/* Footer */}
      <div
        className="flex items-center justify-between mt-4 pt-3.5"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <span className="text-[11px] text-text-muted">Próx. turno</span>
        <span className="text-[12px] font-semibold text-accent">14:30 — Dra. Stechina</span>
      </div>
    </div>
  );
}

/* ── Hero Section ── */
export default function Hero() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "hero-30min" });
      cal("ui", { theme: "dark", hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <section className="relative overflow-hidden min-h-[93vh] flex items-center">

      {/* Particles */}
      <Particles />

      {/* Blobs */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{ width: 700, height: 700, background: "#22c55e", opacity: 0.055, top: -180, right: -120, filter: "blur(100px)" }}
      />
      <div
        className="absolute pointer-events-none rounded-full"
        style={{ width: 600, height: 600, background: "#7B61FF", opacity: 0.065, bottom: -140, left: -80, filter: "blur(110px)" }}
      />
      <div
        className="absolute pointer-events-none rounded-full"
        style={{ width: 300, height: 300, background: "#eab308", opacity: 0.03, top: "40%", right: "35%", filter: "blur(80px)" }}
      />

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

      <div className="relative max-w-[1200px] mx-auto py-20 px-6" style={{ zIndex: 2 }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-16 items-center">

          {/* ── LEFT: copy ── */}
          <div>
            {/* Eyebrow badge */}
            <FadeUp>
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-7"
                style={{
                  background: "rgba(34,197,94,0.08)",
                  border: "1px solid rgba(34,197,94,0.2)",
                }}
              >
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                <span className="text-[12px] font-semibold text-accent uppercase tracking-wider">
                  +127 negocios instalados · Argentina
                </span>
              </div>
            </FadeUp>

            {/* H1 */}
            <FadeUp delay={0.1}>
              <h1 className="text-[clamp(3.2rem,6.5vw,5.6rem)] font-extrabold leading-[1.03] tracking-[-2.5px] mb-7">
                Tu negocio,
                <br />
                con{" "}
                <span
                  style={{
                    background: "linear-gradient(to bottom, #22c55e 0%, #4ade80 50%, #f0fdf4 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textShadow: "none",
                    filter: "drop-shadow(0 0 50px rgba(34,197,94,0.3))",
                  }}
                >
                  sistema.
                </span>
              </h1>
            </FadeUp>

            {/* Subtitle */}
            <FadeUp delay={0.2}>
              <p className="text-[18px] text-text-muted leading-[1.75] max-w-[500px] mb-9 font-light">
                De adivinar a saber exactamente qué pasa — agenda, clientes y captación, automatizados. Sin que el equipo tenga que tocar tecnología.
              </p>
            </FadeUp>

            {/* Proof items */}
            <FadeUp delay={0.3}>
              <div className="flex flex-wrap gap-6 mb-10">
                {[
                  "Sistema activo en menos de 2 semanas",
                  "Soporte WhatsApp incluido",
                  "Sin contrato largo",
                ].map((item, i) => (
                  <span key={i} className="flex items-center gap-2 text-[13px] text-text-muted">
                    <span className="text-accent font-bold text-[14px]">✓</span>
                    {item}
                  </span>
                ))}
              </div>
            </FadeUp>

            {/* CTA Buttons */}
            <FadeUp delay={0.4}>
              <div className="flex flex-wrap gap-3.5">
                {/* Primary CTA */}
                <div
                  style={{
                    display: "inline-block",
                    borderRadius: "9px",
                    padding: "1px",
                    position: "relative",
                    overflow: "hidden",
                    background:
                      "linear-gradient(135deg, rgba(240,253,244,1) 0%, rgba(34,197,94,0.6) 50%, rgba(22,163,74,1) 100%)",
                    boxShadow: "0 0 20px rgba(34,197,94,0.2), 0 0 40px rgba(34,197,94,0.1)",
                  }}
                >
                  {/* Shine */}
                  <div
                    style={{
                      position: "absolute",
                      top: "-50%",
                      left: "-50%",
                      width: "200%",
                      height: "200%",
                      background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
                      animation: "shine 3s infinite",
                      pointerEvents: "none",
                    }}
                  />
                  <style>{`@keyframes shine { 0% { transform: translate(-100%, -100%); } 100% { transform: translate(100%, 100%); } }`}</style>
                  <button
                    data-cal-namespace="hero-30min"
                    data-cal-link={CAL_LINK}
                    data-cal-config='{"layout":"month_view"}'
                    className="inline-flex items-center gap-2 px-7 py-4 bg-gradient-to-b from-[#22c55e] to-[#16a34a] text-black font-bold text-[15px] rounded-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                    style={{
                      boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(0,0,0,0.2), 0 10px 20px -10px rgba(34,197,94,0.5)",
                    }}
                  >
                    Quiero ver cómo funciona →
                  </button>
                </div>

                {/* Ghost CTA */}
                <a
                  href="#planes"
                  className="inline-flex items-center px-7 py-4 text-[15px] font-medium rounded-lg transition-all duration-200 hover:border-accent hover:text-accent"
                  style={{
                    color: "#e4e4e7",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "transparent",
                  }}
                >
                  Ver los planes
                </a>
              </div>
            </FadeUp>
          </div>

          {/* ── RIGHT: Dashboard Mockup ── */}
          <div className="hidden lg:block">
            <FadeUp delay={0.25}>
              <DashboardMockup />
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
