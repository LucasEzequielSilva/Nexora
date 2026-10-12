import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import Particles from "@/components/Particles";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nexoragrowth.es"),
  alternates: { canonical: "./" },
  title: "Nexora — WhatsApp, agenda y CRM para negocios de turnos",
  description:
    "Un empleado nuevo en tu WhatsApp que responde, agenda y confirma turnos, al lado de tu equipo, para que tu negocio no pierda clientes.",
  openGraph: {
    title: "Nexora — WhatsApp, agenda y CRM para negocios de turnos",
    description:
      "Un empleado nuevo en tu WhatsApp que responde, agenda y confirma turnos, al lado de tu equipo, para que tu negocio no pierda clientes.",
    type: "website",
    images: [
      {
        url: "/thumbnail-profile.jpg",
        width: 1024,
        height: 1024,
        alt: "Logo de Nexora",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Nexora — WhatsApp, agenda y CRM para negocios de turnos",
    description:
      "Un empleado nuevo en tu WhatsApp que responde, agenda y confirma turnos, al lado de tu equipo, para que tu negocio no pierda clientes.",
    images: ["/thumbnail-profile.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/* Fontshare — Satoshi (body) */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${plusJakarta.variable} ${spaceMono.variable} antialiased`}>
        <Particles fixed />
        {children}
      </body>
    </html>
  );
}
