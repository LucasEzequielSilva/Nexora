import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import s from "./diagnostico.module.css";

/* Landing de la pauta. Fuera de los buscadores: es el destino de los anuncios, no la web. */

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const TITULO = "Diagnóstico gratis para tu negocio — Nexora";
const DESCRIPCION =
  "En 30 minutos te mostramos dónde se le escapa tiempo y plata a tu negocio. Gratis y sin compromiso, con Valentino.";

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRIPCION,
  robots: { index: false, follow: false },
  openGraph: {
    title: TITULO,
    description: DESCRIPCION,
    type: "website",
    images: [{ url: "/thumbnail-profile.jpg", width: 1024, height: 1024, alt: "Logo de Nexora" }],
  },
  twitter: { card: "summary", title: TITULO, description: DESCRIPCION, images: ["/thumbnail-profile.jpg"] },
};

export default function DiagnosticoLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${dmSans.variable} ${s.marco}`}>{children}</div>;
}
