import TopBar from "@/components/TopBar";
import Hero from "@/components/Hero";
import CTACard from "@/components/CTACard";
import PainPoints from "@/components/PainPoints";
import Pillars from "@/components/Pillars";
import Niches from "@/components/Niches";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <div className="relative z-[2]">
      <TopBar />
      <Hero />

      <CTACard
        heading="&#191;Funciona para tu negocio?"
        description="20 minutos. Sin compromiso. Te mostramos exactamente que sistema usariamos para vos y cuantos clientes podrias sumar por mes."
        buttonText="AGENDAR LLAMADA GRATUITA"
        subtext="Sin compromiso · Solo 3 lugares disponibles"
      />

      <PainPoints />
      <Pillars />
      <Niches />

      <CTACard
        variant="banner"
        heading="3 lugares disponibles este mes"
        description="Cada mes trabajamos con un numero limitado de negocios para garantizar resultados reales. Si el tuyo califica, empezamos esta semana."
        buttonText="QUIERO MI LUGAR AHORA"
        subtext="Cupos limitados · Sin letra chica · Resultados en 30 dias"
      />

      <Footer />
    </div>
  );
}
