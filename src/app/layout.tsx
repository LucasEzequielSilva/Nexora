import type { Metadata, Viewport } from "next";
import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import MotionProvider from "@/components/MotionProvider";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const TITULO = "Nexora · La estructura que le falta a tu negocio";
const DESCRIPCION =
  "Agencia de La Plata para negocios que ya facturan. Primero entendemos cómo trabajás y dónde se te va el tiempo o la plata. Después construimos.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nexoragrowth.es"),
  alternates: { canonical: "./" },
  title: TITULO,
  description: DESCRIPCION,
  openGraph: {
    title: TITULO,
    description: DESCRIPCION,
    type: "website",
    locale: "es_AR",
    siteName: "Nexora",
    images: [{ url: "/thumbnail-profile.jpg", width: 1024, height: 1024, alt: "Logo de Nexora" }],
  },
  twitter: {
    card: "summary",
    title: TITULO,
    description: DESCRIPCION,
    images: ["/thumbnail-profile.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#070A12",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${plusJakarta.variable} ${dmSans.variable} antialiased`}>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
