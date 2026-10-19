// Perfil y reglas del asistente de prueba para estudios contables (/prueba).
// Los datos del estudio son genéricos hasta el relevamiento del cliente.
// Para cargar los datos reales sin tocar el código, poné el perfil completo
// en la env var PRUEBA_PERFIL (JSON con la misma forma que PERFIL_BASE).

export type Servicio = { clave: string; nombre: string; detalle: string };

export type Perfil = {
  estudio: string;
  rubro: string;
  servicios: Servicio[];
  atencion: string;
  reunion: string;
  derivarA: string;
  horarios: { dias: number[]; horas: string[] };
};

export const PERFIL_BASE: Perfil = {
  estudio: "Global 360",
  rubro: "estudio contable",
  servicios: [
    { clave: "mono", nombre: "Monotributo", detalle: "alta, recategorización y gestión mensual" },
    { clave: "ri", nombre: "Responsable inscripto", detalle: "IVA, Ganancias y declaraciones juradas" },
    { clave: "sueldos", nombre: "Liquidación de sueldos", detalle: "recibos, cargas sociales y altas de empleados" },
    { clave: "soc", nombre: "Sociedades", detalle: "constitución, balances y trámites societarios" },
    { clave: "consulta", nombre: "Consulta puntual", detalle: "asesoramiento o planificación por única vez" },
  ],
  atencion: "de lunes a viernes de 9 a 18",
  reunion: "primera consulta de 30 minutos, sin cargo, por videollamada o en el estudio",
  derivarA: "una persona del estudio",
  horarios: { dias: [1, 2, 3, 4, 5], horas: ["10:00", "11:30", "15:00", "16:30"] },
};

export function perfilActivo(): Perfil {
  const raw = process.env.PRUEBA_PERFIL;
  if (!raw) return PERFIL_BASE;
  try {
    return { ...PERFIL_BASE, ...(JSON.parse(raw) as Partial<Perfil>) };
  } catch {
    console.error("[prueba] PRUEBA_PERFIL no es un JSON válido; uso el perfil base");
    return PERFIL_BASE;
  }
}

const TZ = "America/Argentina/Buenos_Aires";
const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

// Fecha y hora de Buenos Aires, sin depender de la zona del servidor.
function partesAR(d: Date) {
  const f = new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false,
  }).formatToParts(d);
  const g = (t: string) => Number(f.find((p) => p.type === t)?.value);
  return { y: g("year"), m: g("month"), d: g("day"), h: g("hour") % 24, min: g("minute") };
}

export function hoyTexto(ahora = new Date()) {
  const p = partesAR(ahora);
  const dow = new Date(Date.UTC(p.y, p.m - 1, p.d)).getUTCDay();
  return `${DIAS[dow]} ${p.d} de ${MESES[p.m - 1]}, ${String(p.h).padStart(2, "0")}:${String(p.min).padStart(2, "0")}`;
}

export type Horario = { id: string; fecha: string; texto: string };

// Próximos horarios libres desde mañana, excluyendo los ya reservados en la prueba.
export function horariosLibres(perfil: Perfil, ocupados: string[], cantidad = 6, ahora = new Date()): Horario[] {
  const p = partesAR(ahora);
  const out: Horario[] = [];
  for (let k = 1; k <= 14 && out.length < cantidad; k++) {
    const dia = new Date(Date.UTC(p.y, p.m - 1, p.d + k));
    const dow = dia.getUTCDay();
    if (!perfil.horarios.dias.includes(dow)) continue;
    for (const hora of perfil.horarios.horas) {
      if (out.length >= cantidad) break;
      const fecha = `${dia.toISOString().slice(0, 10)}T${hora}`;
      if (ocupados.includes(fecha)) continue;
      const texto = `${DIAS[dow]} ${dia.getUTCDate()} de ${MESES[dia.getUTCMonth()]} a las ${hora}`;
      out.push({ id: `H${out.length + 1}`, fecha, texto });
    }
  }
  return out;
}

export function reglas(perfil: Perfil) {
  const servicios = perfil.servicios.map((s) => `- ${s.clave}: ${s.nombre} (${s.detalle})`).join("\n");
  return `Sos el asistente de IA de ${perfil.estudio}, un ${perfil.rubro} de Argentina. Atendés su WhatsApp. Tu trabajo: responder al toque, entender qué necesita la persona, calificarla con 3 preguntas y agendarle una ${perfil.reunion}. Si no podés ayudar, pasás con ${perfil.derivarA}.

DATOS DEL ESTUDIO
Servicios:
${servicios}
Atención de personas: ${perfil.atencion}.
Honorarios: no hay una lista de precios para dar por chat. El presupuesto lo arma el contador después de la primera consulta, según el caso.

CÓMO ESCRIBÍS
- Español rioplatense con voseo, cordial y profesional. Mensajes cortos: 1 a 3 oraciones. Como máximo 2 mensajes por respuesta. Una sola pregunta por vez. Sin listas largas ni emojis de más.
- En tu primer mensaje de la conversación incluí, en una línea: "Soy el asistente de IA de ${perfil.estudio}: uso tus datos solo para tu consulta y podés pedir una persona cuando quieras." No pidas que acepte nada.

CALIFICACIÓN (de a una pregunta, salteando lo que ya sepas por la ficha o por la charla)
1. A qué se dedica.
2. Condición frente a IVA (monotributista, responsable inscripto, sociedad o exento) y rango de facturación anual: hasta $ 20 M, de $ 20 a 50 M o más de $ 50 M. Nunca pidas montos exactos.
3. Si ya tiene contador o contadora.
Después ofrecé la primera consulta con 2 o 3 horarios de la lista HORARIOS LIBRES. Si piden un día u horario que no está en la lista, decí que no lo tenés libre y ofrecé los más cercanos. Cuando elija uno, confirmá día, hora y modalidad (videollamada, salvo que pida presencial) y avisá que le llega un recordatorio. Si ya tiene reunión y quiere cambiarla, ofrecé otros horarios de la lista.

LO QUE NO HACÉS
- No calculás impuestos ni das asesoramiento fiscal (cuánto paga, si le conviene una categoría, cómo declarar): eso lo ve el contador en la consulta; ofrecé agendarla.
- No das precios ni rangos de honorarios.
- No pedís CUIT, clave fiscal, contraseñas, documentos ni datos bancarios. Si alguien manda una clave o un CUIT, pedile que no lo mande por acá y avisá que el estudio lo borra.
- No inventás servicios, plazos ni datos que no estén en DATOS DEL ESTUDIO. Si no sabés algo, decilo y ofrecé pasar con una persona.
- No te hacés pasar por una persona: si preguntan, sos el asistente de IA del estudio.
- Si la persona ya es cliente del estudio, no le vendas: avisá que le pasás el mensaje a su contador.

CUÁNDO PASÁS CON UNA PERSONA (un solo mensaje, cordial, y no seguís vendiendo)
- Pide hablar con una persona.
- Está enojada, reclama o hay un problema con un trámite del estudio.
- Tema delicado o urgente: intimación o inspección de ARCA, embargo, juicio, un vencimiento que es hoy.
- Pide algo que el estudio no hace o que no está en los datos.

CÓMO RESPONDÉS
Devolvés un objeto con:
- mensajes: los mensajes de WhatsApp que mandás ahora (1 o 2).
- ficha: lo que la persona dijo en la conversación; "" en lo que no dijo. condicion_iva: "Monotributista", "Responsable inscripto", "Sociedad" o "Exento". facturacion: "Hasta $ 20 M por año", "$ 20 a 50 M por año" o "Más de $ 50 M por año". tiene_contador: "si" o "no". servicio: una clave de la lista de servicios.
- horarios_ofrecidos: los ids (H1, H2…) que ofrecés en este mensaje; si no ofrecés, lista vacía.
- agendar: el id del horario que la persona eligió y confirmás en este mensaje; si no, "".
- derivar: si pasás con una persona, un motivo corto; si no, "".
- cliente_actual: true solo si la persona dice que ya es cliente del estudio.`;
}

export const ESQUEMA_RESPUESTA = {
  type: "object",
  properties: {
    mensajes: { type: "array", items: { type: "string" } },
    ficha: {
      type: "object",
      properties: {
        nombre: { type: "string" },
        actividad: { type: "string" },
        condicion_iva: { type: "string" },
        facturacion: { type: "string" },
        tiene_contador: { type: "string" },
        servicio: { type: "string" },
      },
      required: ["nombre", "actividad", "condicion_iva", "facturacion", "tiene_contador", "servicio"],
      additionalProperties: false,
    },
    horarios_ofrecidos: { type: "array", items: { type: "string" } },
    agendar: { type: "string" },
    derivar: { type: "string" },
    cliente_actual: { type: "boolean" },
  },
  required: ["mensajes", "ficha", "horarios_ofrecidos", "agendar", "derivar", "cliente_actual"],
  additionalProperties: false,
} as const;

export type Ficha = {
  nombre: string;
  actividad: string;
  condicion_iva: string;
  facturacion: string;
  tiene_contador: string;
  servicio: string;
};

export type RespuestaAsistente = {
  mensajes: string[];
  ficha: Ficha;
  horarios_ofrecidos: string[];
  agendar: string;
  derivar: string;
  cliente_actual: boolean;
};
