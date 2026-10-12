import Image from "next/image";

export default function Footer() {
  return (
    <footer className="text-center py-14 px-6 text-[13px] text-text-muted">
      {/* Gradient top divider */}
      <div
        className="mb-10 h-px w-full max-w-[840px] mx-auto"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)",
        }}
      />

      {/* Logo */}
      <Image
        src="/logo_white.png"
        alt="Nexora"
        width={100}
        height={25}
        className="mx-auto mb-6 opacity-60"
      />

      {/* Social icons */}
      <div className="flex items-center justify-center gap-3 mb-6">
        {/* Instagram */}
        <a
          href="https://www.instagram.com/nexorasistem.ar/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="w-8 h-8 rounded-lg border border-border flex items-center justify-center transition-colors duration-200 hover:border-[rgba(34,197,94,0.4)]"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 stroke-text-muted fill-none stroke-[1.5]"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
          </svg>
        </a>
      </div>

      {/* Contacto */}
      <div className="flex items-center justify-center gap-6 mb-5 flex-wrap">
        <a
          href="mailto:hola@nexoragrowth.es"
          className="text-[12px] text-text-muted hover:text-text-secondary transition-colors duration-200"
        >
          Contacto: hola@nexoragrowth.es
        </a>
      </div>

      {/* Copyright */}
      <p className="text-[12px] text-text-muted">
        &copy; 2026 Nexora Growth &middot; Todos los derechos reservados
      </p>
    </footer>
  );
}
