"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CalProvider from "./CalProvider";
import { BotonAgenda, BotonInstagram, BotonWhatsapp } from "./BotonesContacto";
import { hayAgenda, hayWhatsapp } from "@/lib/contacto";
import { SECCIONES } from "@/lib/secciones";

/* Menú fijo arriba. En el celular se abre un panel con las secciones y los botones. */
export default function Header() {
  const [abierto, setAbierto] = useState(false);
  const [conFondo, setConFondo] = useState(false);

  useEffect(() => {
    const alScrollear = () => setConFondo(window.scrollY > 12);
    alScrollear();
    window.addEventListener("scroll", alScrollear, { passive: true });
    return () => window.removeEventListener("scroll", alScrollear);
  }, []);

  useEffect(() => {
    if (!abierto) return;
    const alTeclear = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(false);
    window.addEventListener("keydown", alTeclear);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", alTeclear);
      document.body.style.overflow = "";
    };
  }, [abierto]);

  const cerrar = () => setAbierto(false);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 md:bg-transparent md:border-transparent md:backdrop-blur-none ${
        conFondo || abierto ? "bg-bg-primary/80 backdrop-blur-xl border-b border-border" : "border-b border-transparent"
      }`}
    >
      <CalProvider />
      {/* En escritorio, al bajar, la barra se achica y queda como una píldora de vidrio flotando */}
      <div
        className={`mx-auto px-4 sm:px-6 h-[68px] flex items-center justify-between gap-6 transition-all duration-500 ease-out ${
          conFondo
            ? "max-w-6xl md:max-w-5xl md:mt-3 md:h-[58px] md:rounded-full md:border md:border-white/10 md:bg-bg-primary/70 md:backdrop-blur-xl md:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.7)] md:pr-2"
            : "max-w-6xl"
        }`}
      >
        <Link href="/" onClick={cerrar} className="shrink-0" aria-label="Nexora, ir al inicio">
          <Image src="/logo_white.png" alt="Nexora" width={4544} height={616} priority className="h-[22px] w-auto" />
        </Link>

        <nav aria-label="Secciones" className="hidden md:flex items-center gap-1">
          {SECCIONES.map((s) => (
            <a
              key={s.href}
              href={s.href}
              className="px-3.5 py-2 rounded-full text-[14px] text-text-secondary hover:text-text-primary hover:bg-white/[0.05] transition-colors"
            >
              {s.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          {hayWhatsapp && hayAgenda && <BotonWhatsapp tam="md" texto="WhatsApp" />}
          {hayAgenda ? (
            <BotonAgenda tam="md" />
          ) : hayWhatsapp ? (
            <BotonWhatsapp tam="md" destacado texto="Escribinos" />
          ) : (
            <BotonInstagram tam="md" />
          )}
        </div>

        <button
          type="button"
          onClick={() => setAbierto((v) => !v)}
          aria-expanded={abierto}
          aria-controls="menu-celular"
          aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
          className="md:hidden -mr-2 p-2.5 rounded-full text-text-primary hover:bg-white/[0.06]"
        >
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            {abierto ? (
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            ) : (
              <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {abierto && (
        <div id="menu-celular" className="md:hidden border-t border-border bg-bg-primary h-[calc(100dvh-68px)] overflow-y-auto">
          <nav aria-label="Secciones" className="px-4 pt-4 flex flex-col">
            {SECCIONES.map((s) => (
              <a
                key={s.href}
                href={s.href}
                onClick={cerrar}
                className="py-4 border-b border-border font-display text-[22px] font-bold text-text-primary"
              >
                {s.label}
              </a>
            ))}
          </nav>
          <div className="px-4 py-6 flex flex-col gap-3" onClick={cerrar}>
            <BotonAgenda className="w-full" />
            <BotonWhatsapp className="w-full" destacado={!hayAgenda} />
            {!hayAgenda && !hayWhatsapp && <BotonInstagram className="w-full" />}
          </div>
        </div>
      )}
    </header>
  );
}
