"use client";

import { useEffect, useRef } from "react";
import { contar } from "@/lib/diagnostico/evento";
import type { Origen } from "@/lib/diagnostico/origen";

/* Cuenta la visita una vez por carga de la página. Corre en el navegador: las vistas previas
   que arma Meta al revisar el anuncio no ejecutan JavaScript y no suman. */
export default function Visita({ origen }: { origen: Origen }) {
  const contada = useRef(false);
  useEffect(() => {
    if (contada.current) return;
    contada.current = true;
    contar("visita", origen);
  }, [origen]);
  return null;
}
