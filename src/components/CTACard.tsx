"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import FadeUp from "./FadeUp";

const CAL_LINK = "nexoragrowth/30min";

interface CTACardProps {
  heading: string;
  description: string;
  buttonText: string;
  subtext: string;
  variant?: "card" | "banner";
}

export default function CTACard({
  heading,
  description,
  buttonText,
  variant = "card",
}: CTACardProps) {
  const isCard = variant === "card";

  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", {
        theme: "dark",
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <section
      className={`mx-auto px-6 ${isCard ? "max-w-[600px] pb-20" : "max-w-[840px] pb-28"} text-center`}
    >
      <FadeUp>
        {/* ── CARD VARIANT ── */}
        {isCard && (
          <div className="bg-bg-card border border-border rounded-2xl p-12 px-10 relative overflow-hidden">
            {/* Top green accent line */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#22c55e] via-[#10b981] to-[#059669]" />

            {/* Bottom radial glow */}
            <div
              className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 120%, rgba(34,197,94,0.15) 0%, transparent 60%)",
              }}
            />

            <h2 className="text-[28px] font-bold mb-3 tracking-tight relative z-10">
              {heading}
            </h2>

            <p className="text-text-secondary mb-8 leading-relaxed text-base relative z-10">
              {description}
            </p>

            <div className="relative z-10 group">
              <button
                data-cal-namespace="30min"
                data-cal-link={CAL_LINK}
                data-cal-config='{"layout":"month_view"}'
                className="inline-flex items-center gap-2.5 w-full justify-center px-10 py-[18px] bg-gradient-to-r from-[#22c55e] via-[#10b981] to-[#059669] text-black font-bold text-[17px] rounded-xl uppercase tracking-wide transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(34,197,94,0.3)] active:translate-y-0 cursor-pointer"
                style={{ boxShadow: "0 0 0 1px transparent" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 0 0 1px rgba(34,197,94,0.3), 0 8px 30px rgba(34,197,94,0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 0 0 1px transparent";
                }}
              >
                {buttonText}
                <svg
                  className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>

            {/* Trust row */}
            <div className="relative z-10 mt-5 flex items-center justify-center gap-4 flex-wrap">
              <span className="text-[12px] text-text-muted">✓ Sin contrato</span>
              <span className="text-[12px] text-text-muted">·</span>
              <span className="text-[12px] text-text-muted">✓ 30 días o devolvemos</span>
              <span className="text-[12px] text-text-muted">·</span>
              <span className="text-[12px] text-text-muted">✓ Configurado en 48hs</span>
            </div>
          </div>
        )}

        {/* ── BANNER VARIANT ── */}
        {!isCard && (
          <div
            className="relative rounded-3xl py-16 px-12 overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(34,197,94,0.12) 0%, rgba(16,185,129,0.06) 50%, rgba(5,150,105,0.04) 100%)",
              border: "1px solid rgba(34,197,94,0.2)",
              boxShadow: "0 0 60px rgba(34,197,94,0.08) inset",
            }}
          >
            {/* Grid pattern overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(34,197,94,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.05) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            {/* Large decorative number */}
            <div
              className="absolute right-6 bottom-0 select-none pointer-events-none leading-none font-black"
              style={{
                fontSize: "180px",
                color: "rgba(34,197,94,0.06)",
                lineHeight: 1,
              }}
            >
              3
            </div>

            {/* Scarcity indicator */}
            <div className="relative z-10 flex items-center justify-center gap-2 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-widest text-orange-400">
                Solo 3 cupos disponibles este mes
              </span>
            </div>

            <h2
              className="relative z-10 font-bold mb-4 tracking-tight"
              style={{ fontSize: "clamp(32px, 5vw, 52px)" }}
            >
              {heading}
            </h2>

            <p className="relative z-10 text-text-secondary mb-10 leading-relaxed text-[17px] max-w-[500px] mx-auto">
              {description}
            </p>

            <div className="relative z-10 group">
              <button
                data-cal-namespace="30min"
                data-cal-link={CAL_LINK}
                data-cal-config='{"layout":"month_view"}'
                className="inline-flex items-center gap-2.5 px-10 bg-gradient-to-r from-[#22c55e] via-[#10b981] to-[#059669] text-black font-bold text-[17px] rounded-xl uppercase tracking-wide transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(34,197,94,0.35)] active:translate-y-0 cursor-pointer"
                style={{ paddingTop: "20px", paddingBottom: "20px" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 0 0 1px rgba(34,197,94,0.3), 0 8px 30px rgba(34,197,94,0.35)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                }}
              >
                {buttonText}
                <svg
                  className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </FadeUp>
    </section>
  );
}
