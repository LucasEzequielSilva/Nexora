/* Datos de contacto de toda la web, en un solo lugar.
   Un canal vacío no se muestra: si no hay agenda ni WhatsApp, los botones llevan al Instagram. */

/* Evento de Cal.com de Nexora, como "usuario/evento" (por ejemplo "nexora/llamada"). */
export const CAL_LINK = "";

/* Número de WhatsApp de Nexora: solo dígitos, con código de país (por ejemplo "5492210000000"). */
export const WHATSAPP_NUMERO = "";

export const WHATSAPP_MENSAJE = "Hola, vengo de la web de Nexora y quiero contarles cómo trabaja mi negocio.";

export const INSTAGRAM_USUARIO = "nexorasistem.ar";
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_USUARIO}/`;
export const INSTAGRAM_DM_URL = `https://ig.me/m/${INSTAGRAM_USUARIO}`;

export const EMAIL = "hola@nexoragrowth.es";

export const whatsappUrl = (mensaje: string = WHATSAPP_MENSAJE) =>
  WHATSAPP_NUMERO ? `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}` : "";

export const hayAgenda = CAL_LINK !== "";
export const hayWhatsapp = WHATSAPP_NUMERO !== "";
