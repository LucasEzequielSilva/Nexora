"use client";

import FadeUp from "./FadeUp";

export default function VideoSection() {
  return (
    <section className="max-w-[840px] mx-auto px-6 pb-15">
      <FadeUp delay={0.3}>
        <div className="relative rounded-2xl overflow-hidden border border-border bg-bg-secondary aspect-video cursor-pointer group transition-all duration-300 hover:border-[rgba(34,197,94,0.3)] hover:shadow-[0_0_60px_rgba(34,197,94,0.08)]">
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-bg-secondary to-bg-primary">
            <div className="w-20 h-20 bg-gradient-to-br from-[#22c55e] via-[#10b981] to-[#059669] rounded-full flex items-center justify-center mb-4 shadow-[0_0_40px_rgba(34,197,94,0.3)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_60px_rgba(34,197,94,0.4)]">
              <svg className="w-8 h-8 fill-black ml-1" viewBox="0 0 24 24">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </div>
            <span className="text-sm text-text-muted font-mono">
              MIRA COMO FUNCIONA &middot; 6 MIN
            </span>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
