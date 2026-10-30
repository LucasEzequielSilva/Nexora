import { createHash, createHmac, timingSafeEqual } from "node:crypto";

/* Acceso al panel de /diagnostico y a los conteos del juez. Env var (server-side):
   DIAGNOSTICO_PANEL_CLAVE, de 12 caracteres o más. La cookie guarda una firma de la clave,
   nunca la clave: si la clave cambia, hay que volver a entrar. */

export const COOKIE_PANEL = "diagnostico_panel";
export const RUTA_PANEL = "/diagnostico/panel";

const clave = () => process.env.DIAGNOSTICO_PANEL_CLAVE || "";

export const claveConfigurada = () => clave().length >= 12;

const iguales = (a: string, b: string) =>
  timingSafeEqual(createHash("sha256").update(a).digest(), createHash("sha256").update(b).digest());

export const firmaDelPanel = () => createHmac("sha256", clave()).update("diagnostico-panel").digest("hex");

export const claveValida = (dada: string) => claveConfigurada() && iguales(dada, clave());

export const sesionValida = (valor: string | undefined) => claveConfigurada() && !!valor && iguales(valor, firmaDelPanel());

/* Días hacia atrás para los conteos: entero entre 1 y 365; 30 si no vino o no sirve. */
export function diasDe(v: unknown) {
  const n = Number(Array.isArray(v) ? v[0] : v);
  return Number.isInteger(n) && n >= 1 && n <= 365 ? n : 30;
}
