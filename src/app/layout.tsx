import type { Metadata } from "next";
import { Outfit, Space_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Sistema de Clientes Predecible — Llena tu agenda cada mes",
  description:
    "Implementamos un sistema de captacion de clientes automatico para tu negocio. Sin que tengas que entender de tecnologia. Sin perder tiempo en redes. Sin depender de la suerte.",
  openGraph: {
    title: "Sistema de Clientes Predecible — Llena tu agenda cada mes",
    description:
      "Implementamos un sistema de captacion de clientes automatico para tu negocio.",
    type: "website",
    images: [
      {
        url: "/thumbnail-profile.jpg",
        width: 1200,
        height: 630,
        alt: "Nexora — Sistema de Clientes Predecible",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sistema de Clientes Predecible — Llena tu agenda cada mes",
    description:
      "Implementamos un sistema de captacion de clientes automatico para tu negocio.",
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
      <body className={`${outfit.variable} ${spaceMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
