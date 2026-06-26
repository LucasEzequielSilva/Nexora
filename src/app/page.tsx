import Hero from "@/components/Hero";
import CasosDeUso, { type Caso } from "@/components/CasosDeUso";
import Niches from "@/components/Niches";
import PlansSection from "@/components/PlansSection";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTACard from "@/components/CTACard";
import Footer from "@/components/Footer";
import CalProvider from "@/components/CalProvider";

/* Página GENERAL — mismo esqueleto que /vsl-1 pero "otra piel": le habla a cualquier
   negocio que viva de turnos (clínicas, barberías, estética, gimnasios, veterinarias…),
   sin precios (el número se ve en la llamada). Estructura espejada de la VSL:
   Hero → Casos de uso → Para quién (rubros) → Planes + Calculador → Prueba (Raquel) → FAQ → CTA.

   Secciones de la general que quedaron fuera de este flujo (siguen en el repo, listas para
   reactivar si se quiere: PainPoints, TransformSection, HowItWorksSection, Comparison,
   ProcessSection, LeadCapture). Se priorizó el flujo de la VSL para no duplicar el discurso. */

/* Casos de uso generalizados (mismos demos que la VSL: "cliente" en vez de "paciente"). */
const casosGeneral: Caso[] = [
  {
    key: "agendamiento",
    label: "Agendamiento de turnos",
    desc: "El cliente escribe a cualquier hora, el sistema le ofrece los horarios libres y cierra el turno al instante. Aunque sean las 11 de la noche.",
    frena: "El turno que se iba porque nadie contestaba a tiempo.",
    video: "/casos/agendamiento.mp4",
    icon: "calendar",
  },
  {
    key: "cancelaciones",
    label: "Cancelaciones",
    desc: "Si alguien cancela, el sistema libera el horario al toque y se lo ofrece al próximo cliente. La agenda no queda con huecos.",
    frena: "Las horas muertas que igual pagás.",
    video: "/casos/cancelaciones.mp4",
    icon: "x",
  },
  {
    key: "reprogramacion",
    label: "Reprogramación",
    desc: "El cliente pide otro día y el sistema reacomoda la agenda solo. Tu recepción no toca nada.",
    frena: "El ida y vuelta eterno por WhatsApp para mover un turno.",
    video: "/casos/reprogramacion.mp4",
    icon: "refresh",
  },
  {
    key: "recordatorios",
    label: "Recordatorios",
    desc: "Avisa 24h y 2h antes. El cliente confirma de un toque y la agenda se actualiza sola.",
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
    a: "Nada. Lo configuramos e instalamos nosotros sobre el WhatsApp que ya usás. En menos de 2 semanas está andando — vos solo nos pasás la info por audio o WhatsApp.",
  },
  {
    q: "¿Y si responde cualquier cosa?",
    a: "El asistente responde solo sobre tu negocio: turnos, horarios, ubicación, servicios y precios, con la información que cargamos. Lo que necesita criterio humano, te lo deriva.",
  },
  {
    q: "¿Y si el cliente quiere hablar con una persona?",
    a: "Lo detecta y te pasa la conversación al instante. No se pierde nada: todo queda ordenado en un solo lugar.",
  },
  {
    q: "¿Sirve para mi rubro?",
    a: "Funciona en cualquier negocio que viva de turnos: clínicas, barberías, estética, gimnasios, veterinarias, estudios profesionales. Si perdés turnos por no contestar a tiempo, los recuperás.",
  },
  {
    q: "¿Hay contrato largo?",
    a: "No. Es mensual, lo dejás cuando quieras. Apostamos a que te quedás porque te llena la agenda, no por un contrato que te ata.",
  },
  {
    q: "¿Tienen garantía?",
    a: "Sí. Si en 30 días el sistema no está agendando y confirmando turnos solo como te prometimos, te devolvemos el mes. El riesgo lo corremos nosotros.",
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
        subheading="Desde que el cliente escribe hasta que confirma. Tocá un caso y mirá cómo lo resuelve solo."
        captionPrefix={
          <>
            Grabado en un negocio real · <span className="text-text-secondary font-semibold">Dra. Raquel</span>
          </>
        }
      />

      {/* Para quién — cualquier negocio que viva de turnos */}
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
        heading="¿Tu negocio vive de turnos? Puede estar atendiendo solo esta semana."
        description="Instalamos el sistema en pocos negocios por mes para cuidar cada instalación. Si el tuyo califica, lo dejamos andando en menos de 2 semanas."
        buttonText="Agendá tu llamada"
        subtext="30 minutos · Sin compromiso · Solo 3 cupos este mes"
      />

      <Footer />
    </div>
  );
}
