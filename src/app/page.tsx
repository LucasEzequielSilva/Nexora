import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import CintaDolores from "@/components/home/CintaDolores";
import Servicios from "@/components/home/Servicios";
import Proceso from "@/components/home/Proceso";
import Casos from "@/components/home/Casos";
import Preguntas from "@/components/home/Preguntas";
import Cierre from "@/components/home/Cierre";

/* Home: quién es Nexora para el que la busca después de ver un anuncio o un video.
   Hero → dolores → qué hacemos → cómo trabajamos → casos → preguntas → contacto.
   Reglas del texto: sin precios ni planes, sin cupos, garantías ni plazos, sin cifras sin fuente. */
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CintaDolores />
        <div className="linea-luz" aria-hidden="true" />
        <Servicios />
        <Proceso />
        <Casos />
        <div className="linea-luz" aria-hidden="true" />
        <Preguntas />
        <Cierre />
      </main>
      <Footer />
    </>
  );
}
