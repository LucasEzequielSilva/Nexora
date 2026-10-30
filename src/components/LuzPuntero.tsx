"use client";

import { useEffect } from "react";

/* Un solo listener para toda la página: a la tarjeta .luz que está bajo el puntero le pasa la posición
   (--luz-x, --luz-y) y el CSS dibuja el brillo. Así las tarjetas siguen siendo componentes de servidor. */
export default function LuzPuntero() {
  useEffect(() => {
    const alMover = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const tarjeta = (e.target as Element | null)?.closest?.<HTMLElement>(".luz");
      if (!tarjeta) return;
      const r = tarjeta.getBoundingClientRect();
      tarjeta.style.setProperty("--luz-x", `${e.clientX - r.left}px`);
      tarjeta.style.setProperty("--luz-y", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", alMover, { passive: true });
    return () => document.removeEventListener("pointermove", alMover);
  }, []);

  return null;
}
