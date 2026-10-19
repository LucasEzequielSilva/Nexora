import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prueba del asistente — Nexora",
  description: "Probá el asistente de WhatsApp como si fueras un cliente.",
  robots: { index: false, follow: false },
};

export default function PruebaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
