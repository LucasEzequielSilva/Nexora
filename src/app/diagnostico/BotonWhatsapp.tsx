"use client";

/* Link a WhatsApp con el mensaje ya escrito. Solo se muestra si hay número (DIAGNOSTICO_WHATSAPP). */
export default function BotonWhatsapp({
  numero,
  mensaje,
  className,
  children,
}: {
  numero: string;
  mensaje: string;
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
    >
      {children}
    </a>
  );
}
