import Image from "next/image";
import Link from "next/link";
import { IconoInstagram, IconoMail, IconoWhatsapp } from "./Iconos";
import { SECCIONES } from "@/lib/secciones";
import { EMAIL, INSTAGRAM_URL, INSTAGRAM_USUARIO, hayWhatsapp, whatsappUrl } from "@/lib/contacto";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Image src="/logo_white.png" alt="Nexora" width={4544} height={616} className="h-[20px] w-auto mb-5" />
          <p className="text-[15px] text-text-secondary max-w-[300px] leading-relaxed">
            Instalamos la estructura que le falta a tu negocio. Desde La Plata.
          </p>
        </div>

        <div>
          <p className="text-[12px] font-semibold tracking-[0.14em] text-text-muted mb-4">SECCIONES</p>
          <ul className="space-y-2.5">
            {SECCIONES.map((s) => (
              <li key={s.href}>
                <a href={s.href} className="text-[14px] text-text-secondary hover:text-text-primary transition-colors">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[12px] font-semibold tracking-[0.14em] text-text-muted mb-4">CONTACTO</p>
          <ul className="space-y-2.5">
            {hayWhatsapp && (
              <li>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[14px] text-text-secondary hover:text-text-primary transition-colors"
                >
                  <IconoWhatsapp /> WhatsApp
                </a>
              </li>
            )}
            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[14px] text-text-secondary hover:text-text-primary transition-colors"
              >
                <IconoInstagram /> @{INSTAGRAM_USUARIO}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 text-[14px] text-text-secondary hover:text-text-primary transition-colors"
              >
                <IconoMail /> {EMAIL}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 flex flex-col sm:flex-row gap-3 sm:items-center justify-between text-[13px] text-text-muted">
          <p>Nexora · La Plata, Argentina</p>
          <Link href="/" className="hover:text-text-secondary transition-colors">
            nexoragrowth.es
          </Link>
        </div>
      </div>
    </footer>
  );
}
