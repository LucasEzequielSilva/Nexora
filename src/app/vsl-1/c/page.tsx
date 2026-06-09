import VslHeroScene from "@/components/VslHeroScene";
import VslVideo from "@/components/VslVideo";
import CasosDeUso from "@/components/CasosDeUso";
import VslPricing from "@/components/VslPricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTACard from "@/components/CTACard";
import Footer from "@/components/Footer";
import CalProvider from "@/components/CalProvider";

export default function Vsl1C() {
  return (
    <div className="relative z-[2]">
      <CalProvider />

      {/* Hero funnel — Test C: escena fusionada (cogne + consultorio IA) + UI en capas */}
      <VslHeroScene />

      <VslVideo />

      <CasosDeUso />

      <div id="prueba">
        <Testimonials />
      </div>

      <VslPricing />

      <FAQ />

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
