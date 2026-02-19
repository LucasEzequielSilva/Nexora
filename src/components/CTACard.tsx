"use client";

import FadeUp from "./FadeUp";

const CAL_LINK = "nexoragrowth/30min";

const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    className="w-4 h-4 shrink-0"
    style={{ fill: "currentColor", display: "inline-block" }}
  >
    <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM112,184a8,8,0,0,1-16,0V132.94l-4.42,2.22a8,8,0,0,1-7.16-14.32l16-8A8,8,0,0,1,112,120Zm56-8a8,8,0,0,1,0,16H136a8,8,0,0,1-6.4-12.8l28.78-38.37A8,8,0,1,0,145.07,132a8,8,0,1,1-13.85-8A24,24,0,0,1,176,136a23.76,23.76,0,0,1-4.84,14.45L152,176ZM48,80V48H72v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80Z" />
  </svg>
);

/* ── Gradient border + inner shadow button wrapper ── */
function PremiumButton({
  children,
  calNamespace = "30min",
  fullWidth = false,
}: {
  children: React.ReactNode;
  calNamespace?: string;
  fullWidth?: boolean;
}) {
  return (
    <div
      style={{
        display: "inline-block",
        borderRadius: "13px",
        padding: "1px",
        background:
          "linear-gradient(135deg, rgba(74,222,128,0.75) 0%, rgba(34,197,94,0.45) 50%, rgba(5,150,105,0.75) 100%)",
        width: fullWidth ? "100%" : undefined,
      }}
    >
      <button
        data-cal-namespace={calNamespace}
        data-cal-link={CAL_LINK}
        data-cal-config='{"layout":"month_view"}'
        className={`inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-[#22c55e] via-[#10b981] to-[#059669] text-black font-bold text-base rounded-xl uppercase tracking-wide transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer${fullWidth ? " w-full" : ""}`}
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
        {children}
      </button>
    </div>
  );
}

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
  subtext,
  variant = "card",
}: CTACardProps) {
  const isCard = variant === "card";

  return (
    <section
      className={`mx-auto px-6 ${isCard ? "max-w-[600px] pb-24" : "max-w-[840px] pb-28"} text-center`}
    >
      <FadeUp>
        {/* ── CARD VARIANT ── */}
        {isCard && (
          <div className="bg-bg-card border border-border rounded-2xl py-12 px-8 relative overflow-hidden">
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

            <div className="relative z-10">
              <PremiumButton fullWidth>
                {buttonText} <CalendarIcon />
              </PremiumButton>
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
            className="relative rounded-2xl py-10 px-8 sm:px-12 overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(34,197,94,0.10) 0%, rgba(16,185,129,0.05) 60%, rgba(10,10,11,0.98) 100%)",
              border: "1px solid rgba(34,197,94,0.18)",
              boxShadow: "0 0 80px rgba(34,197,94,0.06) inset, 0 4px 40px rgba(0,0,0,0.4)",
            }}
          >
            {/* Subtle dot grid */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(rgba(34,197,94,0.07) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
                maskImage: "radial-gradient(ellipse at 30% 50%, black 0%, transparent 70%)",
                WebkitMaskImage: "radial-gradient(ellipse at 30% 50%, black 0%, transparent 70%)",
              }}
            />

            {/* Ambient glow left */}
            <div
              className="absolute left-0 top-0 bottom-0 pointer-events-none"
              style={{
                width: "40%",
                background: "radial-gradient(ellipse at 0% 50%, rgba(34,197,94,0.12) 0%, transparent 70%)",
              }}
            />

            {/* Content: two-col layout on desktop */}
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:gap-8 gap-6">

              {/* Left: text */}
              <div className="flex-1 text-left">
                {/* Scarcity pill */}
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-orange-500" />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-orange-400">
                    Solo 3 cupos disponibles este mes
                  </span>
                </div>

                <h2
                  className="font-extrabold tracking-tight leading-[1.05] mb-3"
                  style={{ fontSize: "clamp(26px, 3.5vw, 40px)" }}
                >
                  {heading}
                </h2>

                <p className="text-text-secondary leading-relaxed text-[15px] max-w-[420px]">
                  {description}
                </p>
              </div>

              {/* Right: CTA */}
              <div className="flex flex-col items-start sm:items-center gap-3 shrink-0">
                <PremiumButton>
                  {buttonText} <CalendarIcon />
                </PremiumButton>
                {subtext && (
                  <p className="text-[11px] text-text-muted font-mono text-center">
                    {subtext}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </FadeUp>
    </section>
  );
}
