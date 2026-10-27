/* Cinta con los dolores de los dueños (los mismos ángulos de los anuncios). Corre sola y se frena
   al pasar el mouse; con "reducir movimiento" queda quieta. */

const DOLORES = [
  "Pagás publicidad y contestás tarde",
  "Te escriben de noche. ¿Quién contesta?",
  "Cerraste el local. El celular sigue.",
  "Te cancelaron y quedó el hueco",
  "¿Tus cuentas las entiende una sola persona?",
  "Grupos de WhatsApp, papel y Excel",
  "Más clientes no tiene que ser más caos",
  "¿Creciste y ahora todo pasa por vos?",
];

function Fila({ oculta = false }: { oculta?: boolean }) {
  return (
    <ul className="flex shrink-0 gap-3 pr-3" aria-hidden={oculta || undefined}>
      {DOLORES.map((d) => (
        <li
          key={d}
          className="shrink-0 rounded-full border border-border bg-bg-card px-5 py-2.5 text-[14.5px] text-text-secondary whitespace-nowrap"
        >
          {d}
        </li>
      ))}
    </ul>
  );
}

export default function CintaDolores() {
  return (
    <section aria-label="Lo que les pasa a muchos dueños" className="relative py-6">
      <p className="text-center text-[12px] font-semibold uppercase tracking-[0.16em] text-text-muted mb-5">¿Te suena?</p>
      <div
        className="marquee overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="marquee-track flex w-max">
          <Fila />
          <Fila oculta />
        </div>
      </div>
    </section>
  );
}
