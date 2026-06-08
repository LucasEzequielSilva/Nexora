import Hero from "@/components/Hero";
import CTACard from "@/components/CTACard";
import Comparison from "@/components/Comparison";
import CalProvider from "@/components/CalProvider";
import PainPoints from "@/components/PainPoints";
import TransformSection from "@/components/TransformSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import Niches from "@/components/Niches";
// import Showcase from "@/components/Showcase"; // GUARDADO: reactivar cuando cerremos con todos los clientes
import Testimonials from "@/components/Testimonials";
import LeadCapture from "@/components/LeadCapture";
import PlansSection from "@/components/PlansSection";
import ProcessSection from "@/components/ProcessSection";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative z-[2]">
      <CalProvider />
      <Hero />

      {/* Problem */}
      <PainPoints />

      {/* Transform */}
      <TransformSection />

      {/* How it works — bento */}
      <HowItWorksSection />

      {/* Proof of concept — rubros */}
      <Niches />

      {/* Showcase — GUARDADO para cuando cerremos con todos los clientes */}
      {/* <Showcase /> */}

      {/* Caso de éxito — Raquel */}
      <Testimonials />

      {/* Lead capture secundario — va al Growth Engine */}
      <LeadCapture />

      {/* Pricing */}
      <PlansSection />

      {/* Comparison */}
      <Comparison />

      {/* Process */}
      <ProcessSection />

      {/* FAQ */}
      <FAQ />

      {/* Final CTA */}
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
