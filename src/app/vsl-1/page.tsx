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
        heading="Tu consultorio puede estar atendiendo solo esta semana."
        description="Instalamos el sistema en pocos consultorios por mes para cuidar cada instalación. Si el tuyo califica, lo dejamos andando en menos de 2 semanas."
        buttonText="AGENDAR LLAMADA GRATIS"
        subtext="30 minutos · Sin compromiso · Solo 3 cupos este mes"
      />

      <Footer />
    </div>
  );
}
