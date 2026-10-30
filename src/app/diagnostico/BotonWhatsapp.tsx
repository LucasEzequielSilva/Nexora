"use client";

import { contar } from "@/lib/diagnostico/evento";
import type { Origen } from "@/lib/diagnostico/origen";

/* Link a WhatsApp con el mensaje ya escrito. Solo se muestra si hay número (DIAGNOSTICO_WHATSAPP).
   Cada clic suma en los conteos del anuncio del que vino la persona. */
export default function BotonWhatsapp({
  numero,
  mensaje,
  origen,
  className,
  children,
}: {
  numero: string;
  mensaje: string;
  origen: Origen;
  className?: string;
  children: React.ReactNode;
}) {
  if (!numero) return null;
  return (
    <a
      href={`https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => contar("whatsapp", origen)}
    >
      {children}
    </a>
  );
}
