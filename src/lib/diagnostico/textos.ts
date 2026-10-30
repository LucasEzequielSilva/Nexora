/* Título y bajada de /diagnostico según el ángulo del anuncio, así el que llega lee lo mismo que vio.
   Salen del banco de ángulos de la Marketing Machine (produccion/angulos.md, 27/10), solo del lado
   del problema del dueño. Quedan afuera los que afirman lo que hace el sistema y esperan a Lucas
   (A07, A11), la línea de marca (A08), el caso con nombre de un cliente (A13) y el que está fuera
   del público de la campaña 1 (A05): esos, y cualquier código que no esté acá, usan GENERAL. */

export type Encabezado = { titulo: string; bajada: string[] };

export const GENERAL: Encabezado = {
  titulo: "Te mostramos dónde se le escapa tiempo y plata a tu negocio",
  bajada: [
    "Nos contás cómo trabajás y te mostramos dónde se te enfrían las consultas, dónde se te van las horas y qué conviene resolver primero.",
  ],
};

const POR_ANGULO: Record<string, Encabezado> = {
  A01: {
    titulo: "¿Cuánto tardás en contestar un mensaje?",
    bajada: [
      "Pagás publicidad, te escriben… y contestás horas después. Para entonces, esa persona ya le escribió a otro.",
      "Casi nunca el problema es la publicidad: es lo que pasa después del mensaje.",
    ],
  },
  A02: {
    titulo: "Te escriben de noche. ¿Quién contesta?",
    bajada: [
      "El que te escribe a las once de la noche no espera a mañana: sigue buscando.",
      "Si tu negocio atiende de día y las consultas llegan a cualquier hora, por ese hueco se te va gente.",
    ],
  },
  A03: {
    titulo: "Cerraste el local. El celular sigue.",
    bajada: [
      "Bajaste la persiana, llegaste a tu casa y seguís contestando mensajes del negocio.",
      "No es falta de orden: es que todo pasa por tu celular.",
    ],
  },
  A04: {
    titulo: "Te cancelaron y quedó el hueco.",
    bajada: [
      "Te cancelan un turno a último momento y el horario queda vacío. O peor: no avisan y no vienen.",
      "En el diagnóstico vemos cómo está tu agenda hoy y dónde se te vacía.",
    ],
  },
  A06: {
    titulo: "Grupos de WhatsApp, papel y Excel.",
    bajada: [
      "Hoy alguien de tu equipo carga baldes: copia del grupo de WhatsApp a una planilla, de la planilla al Excel, y vuelta a empezar.",
      "Nosotros ponemos la cañería: que tus sistemas se hablen entre ellos y nadie tenga que pasar datos a mano.",
    ],
  },
  A09: {
    titulo: "No te prometo que multiplicás por diez.",
    bajada: [
      "Te voy a mostrar dónde se te va el tiempo y la plata, y lo dejamos por escrito.",
      "Lo que se entrega y cómo se mide queda en la propuesta, antes de arrancar.",
    ],
  },
  A10: {
    titulo: "Primero entendemos cómo trabajás.",
    bajada: [
      "Antes de venderte nada, nos sentamos a entender cómo trabaja tu negocio y dónde se te va el tiempo o la plata.",
      "Después te presentamos una propuesta por escrito, con lo que se entrega y cómo se mide.",
    ],
  },
  A12: {
    titulo: "Preguntá esto antes de pagarle a una agencia.",
    bajada: [
      "Qué te entrega, cómo lo mide y qué pasa cuando alguien pide hablar con una persona.",
      "Nosotros lo dejamos por escrito en la propuesta, antes de arrancar.",
    ],
  },
  A14: {
    titulo: "Busco dueños de negocios con turnos en La Plata.",
    bajada: [
      "Si estás cansado de contestar el WhatsApp a la noche, completá el formulario: te escribo yo, vemos cómo trabajás y te muestro dónde se te escapa tiempo.",
    ],
  },
  A15: {
    titulo: "Somos de La Plata. Primero te escuchamos.",
    bajada: [
      "Trabajamos con negocios que ya facturan y a los que la operación se les está yendo de las manos.",
      "No te vendemos una herramienta: primero entendemos cómo trabajás y dónde se te va la plata. Después construimos.",
    ],
  },
};

export const encabezadoPara = (angulo: string) => POR_ANGULO[angulo] ?? GENERAL;
