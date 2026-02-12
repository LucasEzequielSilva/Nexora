import Image from "next/image";

export default function Footer() {
  return (
    <footer className="text-center py-10 px-6 border-t border-border text-[13px] text-text-muted">
      <Image
        src="/logo_white.png"
        alt="Nexora"
        width={100}
        height={25}
        className="mx-auto mb-4 opacity-50"
      />
      <p>&copy; 2026 &middot; Todos los derechos reservados</p>
    </footer>
  );
}
