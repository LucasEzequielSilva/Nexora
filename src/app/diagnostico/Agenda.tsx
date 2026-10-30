"use client";

import { useEffect, useRef, useState } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { contar } from "@/lib/diagnostico/evento";
import type { Origen } from "@/lib/diagnostico/origen";

/* La agenda de Cal.com dentro de la página, para la que calificó. Llega con el nombre y el código
   de la consulta ya puestos, así la reserva se cruza con la consulta del panel. Cuando Cal avisa
   que se reservó, suma "agendaron" en los conteos del anuncio: no se guarda ni el día ni la hora.
   Si Cal no carga, lo dice; abajo queda que le escribe Valentino (la consulta ya quedó guardada). */

const NAMESPACE = "diagnostico";

export default function Agenda({
  calLink,
  nombre,
  codigo,
  origen,
  alAgendar,
}: {
  calLink: string;
  nombre: string;
  codigo: string;
  origen: Origen;
  alAgendar: () => void;
}) {
  const contada = useRef(false);
  const [carga, setCarga] = useState<"cargando" | "lista" | "fallo">("cargando");

  // alAgendar es un setState: no cambia entre renders y el aviso de Cal se registra una sola vez.
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: NAMESPACE });
      cal("ui", {
        theme: "dark",
        hideEventTypeDetails: true,
        layout: "month_view",
        cssVarsPerTheme: {
          light: {},
          dark: { "cal-brand": "#00e676", "cal-brand-text": "#04110a", "cal-bg": "#0b101b", "cal-bg-muted": "#0b101b" },
        },
      });
      cal("on", { action: "linkReady", callback: () => setCarga("lista") });
      cal("on", { action: "linkFailed", callback: () => setCarga("fallo") });
      cal("on", {
        action: "bookingSuccessfulV2",
        callback: () => {
          if (contada.current) return;
          contada.current = true;
          contar("agenda", origen);
          alAgendar();
        },
      });
    })();
  }, [origen, alAgendar]);

  if (carga === "fallo") {
    return (
      <p className="text-center text-[15px] leading-relaxed text-[#a7b0c0]">
        No pudimos cargar la agenda.
      </p>
    );
  }

  return (
    <>
      {carga === "cargando" && (
        <p className="py-6 text-center text-[14px] text-[#7c869a]" role="status">
          Cargando la agenda…
        </p>
      )}
      <Cal
        namespace={NAMESPACE}
        calLink={calLink}
        config={{
          layout: "month_view",
          theme: "dark",
          name: nombre,
          notes: `Consulta ${codigo}`,
          "metadata[consulta]": codigo,
        }}
        className="min-h-[520px] w-full overflow-auto"
      />
    </>
  );
}
