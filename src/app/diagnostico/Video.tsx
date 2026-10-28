"use client";

import { useRef } from "react";
import { contar } from "@/lib/diagnostico/evento";
import type { Origen } from "@/lib/diagnostico/origen";

/* El video de Valentino a cámara, vertical y con los subtítulos ya puestos en el archivo.
   No arranca solo: se reproduce cuando la persona toca play, y ese primer play suma en los
   conteos del anuncio ("vieron el video"). */
export default function Video({ src, portada, origen }: { src: string; portada: string; origen: Origen }) {
  const contado = useRef(false);
  return (
    <video
      src={src}
      poster={portada || undefined}
      controls
      playsInline
      preload="metadata"
      className="aspect-[9/16] w-full rounded-2xl border border-white/[0.08] bg-[#0b101b] object-cover"
      onPlay={() => {
        if (contado.current) return;
        contado.current = true;
        contar("video", origen);
      }}
    >
      Tu navegador no puede mostrar el video.
    </video>
  );
}
