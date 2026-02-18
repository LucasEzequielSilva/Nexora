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
  subtext,
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
      className={`max-w-${isCard ? "[600px]" : "[840px]"} mx-auto px-6 ${isCard ? "pb-20" : "pb-25"} text-center`}
    >
      <FadeUp>
        <div
          className={
            isCard
              ? "bg-bg-card border border-border rounded-2xl p-12 px-10 relative overflow-hidden"
              : "bg-gradient-to-br from-[rgba(34,197,94,0.1)] to-[rgba(16,185,129,0.05)] border border-[rgba(34,197,94,0.15)] rounded-3xl py-16 px-12"
          }
        >
          {isCard && (
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#22c55e] via-[#10b981] to-[#059669]" />
          )}

          <h2
            className={`${isCard ? "text-[28px]" : "text-[clamp(28px,4vw,40px)]"} font-bold mb-3 tracking-tight`}
          >
            {heading}
          </h2>

          <p
            className={`text-text-secondary mb-8 leading-relaxed ${!isCard ? "text-[17px] max-w-[500px] mx-auto" : "text-base"}`}
          >
            {description}
          </p>

          <button
            data-cal-namespace="30min"
            data-cal-link={CAL_LINK}
            data-cal-config='{"layout":"month_view"}'
            className={`inline-flex items-center gap-2.5 ${isCard ? "w-full justify-center" : ""} px-10 py-[18px] bg-gradient-to-r from-[#22c55e] via-[#10b981] to-[#059669] text-black font-bold text-[17px] rounded-xl uppercase tracking-wide transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(34,197,94,0.3)] active:translate-y-0 cursor-pointer`}
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

          <p className="text-[13px] text-text-muted mt-4 flex items-center justify-center gap-1.5">
            <svg className="w-3.5 h-3.5 fill-accent" viewBox="0 0 24 24">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            {subtext}
          </p>
        </div>
      </FadeUp>
    </section>
  );
}
