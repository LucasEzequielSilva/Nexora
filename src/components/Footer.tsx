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
          href="#"
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

        {/* LinkedIn */}
        <a
          href="#"
          aria-label="LinkedIn"
          className="w-8 h-8 rounded-lg border border-border flex items-center justify-center transition-colors duration-200 hover:border-[rgba(34,197,94,0.4)]"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 stroke-text-muted fill-none stroke-[1.5]"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="2" width="20" height="20" rx="3" ry="3" />
            <line x1="8" y1="10" x2="8" y2="17" />
            <line x1="8" y1="7" x2="8" y2="7.5" strokeWidth="2" />
            <line x1="12" y1="10" x2="12" y2="17" />
            <path d="M12 13a3 3 0 0 1 6 0v4" />
          </svg>
        </a>

        {/* WhatsApp */}
        <a
          href="#"
          aria-label="WhatsApp"
          className="w-8 h-8 rounded-lg border border-border flex items-center justify-center transition-colors duration-200 hover:border-[rgba(34,197,94,0.4)]"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 stroke-text-muted fill-none stroke-[1.5]"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        </a>
      </div>

      {/* Small links row */}
      <div className="flex items-center justify-center gap-6 mb-5 flex-wrap">
        <a
          href="#"
          className="text-[12px] text-text-muted hover:text-text-secondary transition-colors duration-200"
        >
          Politica de Privacidad
        </a>
        <span className="text-border">|</span>
        <a
          href="#"
          className="text-[12px] text-text-muted hover:text-text-secondary transition-colors duration-200"
        >
          Terminos
        </a>
        <span className="text-border">|</span>
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
