import VslHero from "@/components/VslHero";
import CasosDeUso from "@/components/CasosDeUso";
import VslPricing from "@/components/VslPricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTACard from "@/components/CTACard";
import Footer from "@/components/Footer";
import CalProvider from "@/components/CalProvider";

export default function Vsl1() {
  return (
    <div className="relative z-[2]">
      <CalProvider />

      {/* Hero funnel — oferta + VSL */}
      <VslHero />

      {/* Casos de uso — qué hace Asiri (switcher + video mobile) */}
      <CasosDeUso />

      {/* Prueba — caso real Raquel */}
      <div id="prueba">
        <Testimonials />
      </div>

      {/* Oferta — planes con precio */}
      <VslPricing />

      {/* Objeciones */}
      <FAQ />

      {/* Cierre */}
      <CTACard
        variant="banner"
        heading="Tu agenda puede estar llenándose esta semana."
        description="Trabajamos con un número limitado de consultorios por mes para garantizar la instalación. Si el tuyo califica, arrancamos ya."
        buttonText="AGENDAR LLAMADA GRATIS"
        subtext="30 minutos · Sin compromiso · Solo 3 cupos este mes"
      />

      <Footer />
    </div>
  );
}
