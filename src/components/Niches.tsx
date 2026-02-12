"use client";

import FadeUp from "./FadeUp";

const niches = [
  { emoji: "\uD83C\uDFE5", title: "Clinicas", description: "Dentistas, nutricionistas, kinesiologos" },
  { emoji: "\uD83C\uDF7D\uFE0F", title: "Gastronomia", description: "Restaurantes, bares, dark kitchens" },
  { emoji: "\uD83C\uDFE0", title: "Inmobiliarias", description: "Corredores, desarrolladoras, brokers" },
  { emoji: "\uD83D\uDCAA", title: "Fitness & Estetica", description: "Gimnasios, centros de estetica, spas" },
];

export default function Niches() {
  return (
    <section className="max-w-[840px] mx-auto px-6 pb-20 text-center">
      <FadeUp>
        <h2 className="text-[clamp(24px,3.5vw,36px)] font-extrabold tracking-tight mb-10">
          Funciona para tu negocio
        </h2>
      </FadeUp>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {niches.map((niche, i) => (
          <FadeUp key={niche.title} delay={0.1 * (i + 1)}>
            <div className="bg-bg-card border border-border rounded-[14px] py-8 px-5 transition-all duration-300 hover:border-[rgba(34,197,94,0.25)] hover:-translate-y-1">
              <span className="text-4xl mb-3.5 block">{niche.emoji}</span>
              <h3 className="text-base font-semibold mb-1.5">{niche.title}</h3>
              <p className="text-[13px] text-text-muted">{niche.description}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
