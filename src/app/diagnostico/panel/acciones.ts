"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { mandarWhatsapp, textoDePrueba } from "@/lib/diagnostico/aviso";
import { COOKIE_PANEL, RUTA_PANEL, sesionValida } from "@/lib/diagnostico/panel";
import { ipDe, limitado } from "@/lib/diagnostico/pedido";

/* Botón del panel: manda un aviso de prueba por WhatsApp, para ver que el número esté conectado.
   Es una acción de la página (y no una API) porque la cookie del panel solo viaja a /diagnostico/panel. */
export async function probarAviso() {
  if (!sesionValida((await cookies()).get(COOKIE_PANEL)?.value)) redirect(RUTA_PANEL);
  if (limitado(`prueba-aviso:${ipDe({ headers: await headers() })}`, 5, 10 * 60 * 1000)) {
    redirect(`${RUTA_PANEL}?aviso=espera`);
  }
  redirect(`${RUTA_PANEL}?aviso=${await mandarWhatsapp(textoDePrueba())}`);
}
