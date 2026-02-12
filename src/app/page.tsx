import TopBar from "@/components/TopBar";
import Hero from "@/components/Hero";
import VideoSection from "@/components/VideoSection";
import CTACard from "@/components/CTACard";
import PainPoints from "@/components/PainPoints";
import Pillars from "@/components/Pillars";
import Niches from "@/components/Niches";
import Footer from "@/components/Footer";
import Rays from "@/components/Rays";

export default function Home() {
  return (
    <div className="relative z-[2]">
      <Rays />

      <TopBar />
      <Hero />
      <VideoSection />

      <CTACard
        heading="&#191;Listo para llenar tu agenda?"
        description="Agenda una llamada estrategica gratuita de 20 minutos. Analizamos tu negocio y te mostramos tu sistema personalizado."
        buttonText="AGENDAR MI LLAMADA GRATIS"
        subtext="Sin compromiso · 100% gratuita · Sin letra chica"
      />

      <PainPoints />
      <Pillars />
      <Niches />

      <CTACard
        variant="banner"
        heading="Tu proximo cliente esta esperando"
        description="20 minutos. Una llamada. El primer paso para dejar de depender del boca en boca para siempre."
        buttonText="QUIERO MI LLAMADA ESTRATEGICA"
        subtext="Solo 10 lugares disponibles este mes"
      />

      <Footer />
    </div>
  );
}
