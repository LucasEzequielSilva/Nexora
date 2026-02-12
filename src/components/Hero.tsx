"use client";

import Image from "next/image";
import FadeUp from "./FadeUp";
import DotGrid from "./DotGrid";

export default function Hero() {
  return (
    <section className="max-w-[840px] mx-auto pt-15 pb-10 px-6 text-center relative overflow-hidden">
      <DotGrid fade="radial-top" />
      <FadeUp>
        <Image
          src="/logo_white.png"
          alt="Nexora"
          width={160}
          height={40}
          className="mx-auto mb-8"
          priority
        />
      </FadeUp>

      <FadeUp>
        <div className="inline-flex items-center gap-2 px-5 py-2 bg-accent-glow border border-[rgba(34,197,94,0.2)] rounded-full text-[13px] font-medium text-accent font-mono uppercase tracking-widest mb-7">
          <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          En vivo &middot; Sistema probado
        </div>
      </FadeUp>

      <FadeUp delay={0.1}>
        <h1 className="text-[clamp(32px,5vw,52px)] font-extrabold leading-[1.1] mb-6 tracking-tight">
          Deja de depender del boca en boca.
          <br />
          <span className="bg-gradient-to-r from-[#22c55e] via-[#10b981] to-[#059669] bg-clip-text text-transparent">
            Llenamos tu agenda cada mes.
          </span>
        </h1>
      </FadeUp>

      <FadeUp delay={0.2}>
        <p className="text-lg text-text-secondary leading-relaxed max-w-[620px] mx-auto">
          Implementamos un sistema de captacion de clientes automatico para tu
          negocio. Sin que tengas que entender de tecnologia. Sin perder tiempo
          en redes. Sin depender de la suerte.
        </p>
      </FadeUp>
    </section>
  );
}
