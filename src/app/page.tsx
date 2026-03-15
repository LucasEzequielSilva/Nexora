import TopBar from "@/components/TopBar";
import Hero from "@/components/Hero";
import CTACard from "@/components/CTACard";
import Comparison from "@/components/Comparison";
import CalProvider from "@/components/CalProvider";
import PainPoints from "@/components/PainPoints";
import TransformSection from "@/components/TransformSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import Niches from "@/components/Niches";
import Testimonials from "@/components/Testimonials";
import PlansSection from "@/components/PlansSection";
import ProcessSection from "@/components/ProcessSection";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative z-[2]">
      {/* Single Cal.com initializer for "30min" namespace */}
      <CalProvider />
      <TopBar />
      <Hero />

      {/* Problem — create empathy before asking for action */}
      <PainPoints />

      {/* Transform — before vs after with Nexora */}
      <TransformSection />

      {/* How it works — 5 modules explained with tabs */}
      <HowItWorksSection />

      {/* Proof of concept — impact by industry */}
      <Niches />

      {/* Social proof — real testimonials */}
      <Testimonials />

      {/* Pricing — three plans */}
      <PlansSection />

      {/* Comparison — Nexora vs alternatives */}
      <Comparison />

      {/* Process — from zero to active system */}
      <ProcessSection />

      {/* Objection handling — FAQ */}
      <FAQ />

      {/* Final CTA — urgency + scarcity */}
      <CTACard
        variant="banner"
        heading="¿Funciona para tu negocio?"
        description="Trabajamos con un número limitado de negocios por mes para garantizar resultados. Si el tuyo califica, arrancamos esta semana."
        buttonText="AGENDAR REUNIÓN GRATIS"
        subtext="30 minutos · Sin compromiso · Solo 3 cupos disponibles"
      />

      <Footer />
    </div>
  );
}
