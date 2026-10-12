import Hero from "@/components/Hero";
import CasosDeUso, { type Caso } from "@/components/CasosDeUso";
import Niches from "@/components/Niches";
import PlansSection from "@/components/PlansSection";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTACard from "@/components/CTACard";
import Footer from "@/components/Footer";
import CalProvider from "@/components/CalProvider";

/* Página general: mismo esqueleto que /vsl-1 con otra piel, sin precios (el número se ve en la llamada).
   Estructura espejada de la VSL:
   Hero → Casos de uso → Para quién (rubros) → Planes + Calculador → Prueba (Raquel) → FAQ → CTA.

   Secciones de la general que quedaron fuera de este flujo (siguen en el repo, listas para
   reactivar si se quiere: PainPoints, TransformSection, HowItWorksSection, Comparison,
   ProcessSection, LeadCapture). Se priorizó el flujo de la VSL para no duplicar el discurso. */

/* Casos de uso generalizados (mismos demos que la VSL, redactados para cualquier negocio de turnos). */
const casosGeneral: Caso[] = [
  {
    key: "agendamiento",
    label: "Agendamiento de turnos",
    desc: "Te escriben a cualquier hora y el sistema ofrece los horarios libres y cierra el turno al instante. Aunque sean las 11 de la noche.",
    frena: "El turno que se iba porque nadie contestaba a tiempo.",
    video: "/casos/agendamiento.mp4",
    icon: "calendar",
  },
  {
    key: "cancelaciones",
    label: "Cancelaciones",
    desc: "Si alguien cancela, el sistema libera el horario y le ofrece una nueva fecha.",
    frena: "El turno cancelado que quedaba sin nueva fecha.",
    video: "/casos/cancelaciones.mp4",
    icon: "x",
  },
  {
    key: "reprogramacion",
    label: "Reprogramación",
    desc: "Si te piden otro día, el sistema reacomoda la agenda. Tu equipo no tiene que mover nada a mano.",
    frena: "El ida y vuelta eterno por WhatsApp para mover un turno.",
    video: "/casos/reprogramacion.mp4",
    icon: "refresh",
  },
  {
    key: "recordatorios",
    label: "Recordatorios",
    desc: "Avisa antes del turno. Te confirman de un toque y tu agenda se actualiza.",
    frena: "El ausentismo que te come la agenda mes a mes.",
    video: "/casos/recordatorios.mp4",
    icon: "bell",
  },
  {
    key: "confirmaciones",
    label: "Confirmaciones",
    desc: "Pide confirmación y te arma el día cerrado: sabés quién viene antes de abrir.",
    frena: "Llegar a la mañana sin saber si la agenda es real.",
    video: "/casos/confirmaciones.mp4",
    icon: "check",
  },
];

/* FAQ generalizada (la VSL usa el set clínico por default). */
const faqsGeneral = [
  {
    q: "¿Reemplaza a quien atiende mi negocio?",
    a: "No: lo libera. El asistente se hace cargo de lo repetitivo —contestar, agendar, recordar y confirmar— para que tu equipo se dedique al cliente que está adentro.",
  },
  {
    q: "¿Tengo que instalar o aprender algo?",
    a: "Nada. Lo configuramos e instalamos nosotros sobre el WhatsApp que ya usás: vos solo nos pasás la info por audio o WhatsApp. En la propuesta te decimos cuándo estaría andando.",
  },
  {
    q: "¿Y si responde cualquier cosa?",
    a: "El asistente responde solo sobre tu negocio: turnos, horarios, ubicación, servicios y precios, con la información que cargamos. Lo que necesita criterio humano, te lo deriva.",
  },
  {
    q: "¿Y si quien escribe quiere hablar con una persona?",
    a: "Lo detecta y te pasa la conversación. Todo queda ordenado en un solo lugar.",
  },
  {
    q: "¿Sirve para mi rubro?",
    a: "Lo armamos a medida de cómo trabaja cada negocio. Hoy el caso andando es un consultorio de ortodoncia; si el tuyo es de otro rubro, lo vemos en la llamada.",
  },
  {
    q: "¿Cómo son los plazos y las condiciones?",
    a: "Los plazos y las condiciones los vemos en la llamada y quedan por escrito en la propuesta.",
  },
  {
    q: "¿Cómo sé qué voy a recibir?",
    a: "Lo que se entrega y cómo se mide queda por escrito en la propuesta que te presentamos en la llamada, antes de arrancar.",
  },
];

export default function Home() {
  return (
    <div className="relative z-[2]">
      <CalProvider />

      <Hero />

      {/* Casos de uso — mismos demos que la VSL, generalizados */}
      <CasosDeUso
        casos={casosGeneral}
        subheading="Desde que te escriben hasta que confirman. Tocá un caso y mirá cómo se resuelve."
      />

      {/* Para quién — qué cambia en cada tipo de negocio */}
      <Niches />

      {/* Planes (sin precio) + calculador */}
      <PlansSection />

      {/* Prueba — la Dra. Raquel como negocio real andando */}
      <Testimonials />

      {/* FAQ generalizada */}
      <FAQ faqs={faqsGeneral} />

      {/* CTA final — CTA único: agendá tu llamada */}
      <CTACard
        variant="banner"
        heading="¿Tu negocio vive de turnos? Puede tener un empleado nuevo atendiendo el WhatsApp."
        description="Contanos cómo trabajás y te mostramos cómo se vería en tu negocio."
        buttonText="Agendá tu llamada"
        subtext="Una llamada corta · Sin compromiso"
      />

      <Footer />
    </div>
  );
}
