import VslHeroScene from "@/components/VslHeroScene";
import VslVideo from "@/components/VslVideo";
import CasosDeUso from "@/components/CasosDeUso";
import VslPricing from "@/components/VslPricing";
import ComoLoAplicamos from "@/components/ComoLoAplicamos";
import FAQ from "@/components/FAQ";
import CTACard from "@/components/CTACard";
import Footer from "@/components/Footer";
import CalProvider from "@/components/CalProvider";

export default function Vsl1() {
  return (
    <div className="relative z-[2]">
      <CalProvider />

      {/* Hero funnel — escena fusionada (cogne + consultorio IA) + UI en capas */}
      <VslHeroScene />

      <VslVideo />

      <CasosDeUso />

      <VslPricing />

      <FAQ />

      <ComoLoAplicamos />

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
