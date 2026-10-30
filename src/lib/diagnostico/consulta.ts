/* El formulario de /diagnostico: las mismas preguntas que califican en el borrador del plan
   de la campaña 1 (qué hace el negocio, cuántos son, qué le come más tiempo, cuándo lo quiere
   resolver, nombre y WhatsApp). Nada clínico. Lo usan el formulario y la API, así validan igual. */

export const EQUIPO = [
  { valor: "1", texto: "Solo yo" },
  { valor: "2-5", texto: "2 a 5" },
  { valor: "6-15", texto: "6 a 15" },
  { valor: "mas-15", texto: "Más de 15" },
] as const;

export const URGENCIA = [
  { valor: "ahora", texto: "Ahora" },
  { valor: "proximos-meses", texto: "En los próximos meses" },
  { valor: "viendo", texto: "Estoy viendo" },
] as const;

export type Consulta = {
  nombre: string;
  whatsapp: string;
  negocio: string;
  equipo: string;
  dolor: string;
  urgencia: string;
};

export const LARGOS = { nombre: 80, whatsapp: 30, negocio: 120, dolor: 400 } as const;

/* Calificada, provisorio: contó qué le come el tiempo (obligatorio) y lo quiere resolver ahora.
   El calificado de verdad lo marca Cogne después de hablar. */
export const esCalificada = (c: Pick<Consulta, "urgencia">) => c.urgencia === "ahora";

export const textoDe = (lista: readonly { valor: string; texto: string }[], valor: string) =>
  lista.find((x) => x.valor === valor)?.texto ?? valor;

const campo = (v: unknown, n: number) => (typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, n) : "");

/* Deja + y dígitos. Entre 8 y 15 dígitos: alcanza para 221 555 1234 y para +54 9 221 555 1234. */
export function whatsappLimpio(v: string) {
  const solo = v.replace(/[^\d+]/g, "").replace(/(?!^)\+/g, "");
  const digitos = solo.replace(/\D/g, "").length;
  return digitos >= 8 && digitos <= 15 ? solo : "";
}

/* Link de WhatsApp solo si el número se puede leer con seguridad (con 54 adelante o 10 dígitos de Argentina). */
export function linkWhatsapp(numero: string) {
  let d = numero.replace(/\D/g, "");
  if (d.length === 11 && d.startsWith("0")) d = d.slice(1);
  if (d.length === 10) d = `549${d}`;
  return d.startsWith("54") && d.length >= 12 && d.length <= 13 ? `https://wa.me/${d}` : "";
}

export function validarConsulta(v: unknown): { ok: true; consulta: Consulta } | { ok: false; error: string } {
  const o = v && typeof v === "object" ? (v as Record<string, unknown>) : {};
  const consulta: Consulta = {
    nombre: campo(o.nombre, LARGOS.nombre),
    whatsapp: whatsappLimpio(campo(o.whatsapp, LARGOS.whatsapp)),
    negocio: campo(o.negocio, LARGOS.negocio),
    equipo: campo(o.equipo, 10),
    dolor: campo(o.dolor, LARGOS.dolor),
    urgencia: campo(o.urgencia, 20),
  };
  if (consulta.negocio.length < 2) return { ok: false, error: "Contanos qué hace tu negocio." };
  if (!EQUIPO.some((x) => x.valor === consulta.equipo)) return { ok: false, error: "Elegí cuántos son en el equipo." };
  if (consulta.dolor.length < 3) return { ok: false, error: "Contanos qué es lo que más tiempo te come." };
  if (!URGENCIA.some((x) => x.valor === consulta.urgencia)) return { ok: false, error: "Elegí cuándo lo querés resolver." };
  if (consulta.nombre.length < 2) return { ok: false, error: "Poné tu nombre." };
  if (!consulta.whatsapp) return { ok: false, error: "Revisá el WhatsApp: con código de área, solo números." };
  return { ok: true, consulta };
}
