/* De dónde viene cada visita de /diagnostico. Sale solo de los UTM del link (sin cookies):
   utm_source → fuente, utm_medium → medio, utm_campaign → campana, utm_term → conjunto
   y utm_content → anuncio. En Meta, utm_content lleva {{ad.name}}, y el nombre del anuncio
   trae el código del ángulo (A01, A02…), que se usa para elegir el título de la página. */

export type Origen = {
  fuente: string;
  medio: string;
  campana: string;
  conjunto: string;
  anuncio: string;
  angulo: string;
};

export const ORIGEN_VACIO: Origen = { fuente: "", medio: "", campana: "", conjunto: "", anuncio: "", angulo: "" };

const LARGO = 150;

export const limpio = (v: unknown, n = LARGO) =>
  typeof v === "string" ? v.replace(/\p{Cc}/gu, " ").trim().slice(0, n) : "";

export const anguloDe = (anuncio: string) => anuncio.match(/\bA(\d{2})\b/i)?.[0].toUpperCase() ?? "";

/* Cómo se nombra el origen: el anuncio si vino de uno; si no, fuente / medio. Igual que ETIQUETA en datos.ts. */
export const etiquetaDe = (o: Origen) =>
  o.anuncio || (o.fuente ? o.fuente + (o.medio ? ` / ${o.medio}` : "") : "(directo)");

type Params = Record<string, string | string[] | undefined>;

const primero = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export function origenDeUtm(params: Params): Origen {
  const anuncio = limpio(primero(params.utm_content));
  return {
    fuente: limpio(primero(params.utm_source)),
    medio: limpio(primero(params.utm_medium)),
    campana: limpio(primero(params.utm_campaign)),
    conjunto: limpio(primero(params.utm_term)),
    anuncio,
    angulo: anguloDe(anuncio),
  };
}

/* Lo que llega del navegador se vuelve a limpiar: nunca se confía en el cuerpo del pedido. */
export function origenDeCuerpo(v: unknown): Origen {
  const o = v && typeof v === "object" ? (v as Record<string, unknown>) : {};
  const anuncio = limpio(o.anuncio);
  return {
    fuente: limpio(o.fuente),
    medio: limpio(o.medio),
    campana: limpio(o.campana),
    conjunto: limpio(o.conjunto),
    anuncio,
    angulo: anguloDe(anuncio),
  };
}
