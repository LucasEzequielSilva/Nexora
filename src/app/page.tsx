import TopBar from "@/components/TopBar";
import Hero from "@/components/Hero";
import CTACard from "@/components/CTACard";
import Comparison from "@/components/Comparison";
import CalProvider from "@/components/CalProvider";
import PainPoints from "@/components/PainPoints";
import Pillars from "@/components/Pillars";
import Niches from "@/components/Niches";
import Testimonials from "@/components/Testimonials";
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

      {/* Solution — show how you fix it */}
      <Pillars />

      {/* Proof of concept — validated niches */}
      <Niches />

      {/* Social proof — real testimonials */}
      <Testimonials />

      {/* Objection handling — FAQ */}
      <FAQ />

      {/* Mid section — tabla comparativa antes del CTA final */}
      <Comparison />

      {/* Final CTA — urgency + scarcity */}
      <CTACard
        variant="banner"
        heading="3 cupos disponibles este mes"
        description="Cada mes trabajamos con un numero limitado de negocios para garantizar resultados reales. Si el tuyo califica, empezamos esta semana."
        buttonText="QUIERO MI CUPO AHORA"
        subtext="Cupos limitados · Sin letra chica · Resultados en 30 dias"
      />

      <Footer />
    </div>
  );
}
