import type { TipoEvento } from "./datos";
import type { Origen } from "./origen";

/* Cuenta un paso de la visita desde el navegador, sin cookies ni nada guardado en el teléfono:
   manda el tipo, los UTM y, en la visita, el sitio del que vino (solo el dominio). */

const URL_EVENTO = "/api/diagnostico/evento";

function referente() {
  try {
    return document.referrer ? new URL(document.referrer).host : "";
  } catch {
    return "";
  }
}

export function contar(tipo: TipoEvento, origen: Origen) {
  const cuerpo = JSON.stringify({ tipo, origen, referente: tipo === "visita" ? referente() : "" });
  try {
    if (navigator.sendBeacon?.(URL_EVENTO, cuerpo)) return;
  } catch {
    /* si sendBeacon falla, va por fetch */
  }
  fetch(URL_EVENTO, { method: "POST", body: cuerpo, keepalive: true }).catch(() => {});
}
