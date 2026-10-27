import type { Metadata } from "next";
import PaginaCaso, { BloqueCaso } from "@/components/caso/PaginaCaso";
import FadeUp from "@/components/FadeUp";

/* Caso MB Cell. Va sin resultados (no hay ninguno medido) y sin datos reales del negocio:
   ni clientes, ni precios, ni cuánto vende. Tampoco con qué está hecho. */

export const metadata: Metadata = {
  title: "Caso MB Cell · Nexora",
  description:
    "El sistema de gestión de MB Cell: compras, stock, ventas, canje y consignación en un solo lugar, con las cuentas que antes se hacían a mano.",
  alternates: { canonical: "/casos/mbcell" },
};

const PARTES = [
  {
    titulo: "Cada equipo, por su número de serie",
    texto:
      "Se instala en la computadora del negocio y lleva cada equipo por su número de serie, con su batería y su color. Las compras se cargan por lote o equipo por equipo.",
  },
  {
    titulo: "El canje como forma de pago",
    texto: "El equipo usado que se recibe entra como parte del pago y vuelve al stock con su valor de toma.",
  },
  {
    titulo: "Consignación",
    texto:
      "Lo que se le dejó a cada revendedor, lo que se va cobrando a medida que se vende, los pagos parciales y el saldo a favor si alguien paga de más.",
  },
  {
    titulo: "Las cuentas que se hacían a mano",
    texto:
      "La deuda con cada proveedor, las garantías con su vencimiento, lo que vale el stock a costo y un tablero del mes con trece indicadores, con un botón para ocultar los números cuando hay alguien mirando.",
  },
  {
    titulo: "Para el mostrador",
    texto:
      "Arma la lista de precios lista para mandar por WhatsApp, imprime etiquetas con código de barras, comprobantes y remitos, y lee la salud de la batería de un teléfono cuando se lo conecta por cable.",
  },
  {
    titulo: "Sus datos, cuidados",
    texto: "Guarda la base cifrada, hace una copia de seguridad por día y se actualiza solo.",
  },
];

export default function CasoMbCell() {
  return (
    <PaginaCaso
      rubro="Caso · Comercio"
      nombre="MB Cell"
      bajada="Reventa de celulares"
      resumen={
        <p>
          Un sistema de gestión que le armó el equipo: compras, stock, ventas, canje y consignación en un solo lugar, con
          las cuentas que antes se hacían a mano.
        </p>
      }
      cierre="¿Tu negocio vive en un Excel?"
    >
      <BloqueCaso titulo="Qué lleva">
        <p>
          Las compras, el stock, las ventas, lo dejado en consignación, los proveedores, las garantías y los gastos. Todo
          en un mismo programa.
        </p>
      </BloqueCaso>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PARTES.map((p, i) => (
          <FadeUp
            key={p.titulo}
            delay={(i % 3) * 0.06}
            className="rounded-2xl border border-border bg-bg-card p-6 hover:border-border-strong hover:bg-bg-card-hover transition-colors"
          >
            <span className="font-display text-[13px] font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-3 text-[18px] font-bold leading-snug text-text-primary">{p.titulo}</h3>
            <p className="mt-2.5 text-[15px] leading-relaxed text-text-secondary">{p.texto}</p>
          </FadeUp>
        ))}
      </section>
    </PaginaCaso>
  );
}
