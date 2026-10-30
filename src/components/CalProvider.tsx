"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { hayAgenda } from "@/lib/contacto";

/* Inicializa la agenda de Cal.com una sola vez por página (lo monta el menú).
   Sin agenda configurada no hace nada. */
export default function CalProvider() {
  useEffect(() => {
    if (!hayAgenda) return;
    (async () => {
      const cal = await getCalApi({ namespace: "llamada" });
      cal("ui", { theme: "dark", hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);
  return null;
}
