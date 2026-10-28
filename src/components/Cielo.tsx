/* Fondo de toda la página: cielo de noche con estrellas, dos nebulosas (verde de marca y azul) y grano.
   Es solo CSS: las estrellas son box-shadows calculadas una vez en el servidor, siempre las mismas
   (generador con semilla fija, así el HTML no cambia entre builds). */

function generador(semilla: number) {
  let s = semilla;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function estrellas(cantidad: number, semilla: number, alfaMin: number, alfaMax: number) {
  const azar = generador(semilla);
  const puntos: string[] = [];
  for (let i = 0; i < cantidad; i++) {
    // El cielo queda fijo detrás de la página: alcanza con cubrir una pantalla grande
    const x = Math.round(azar() * 2600);
    const y = Math.round(azar() * 1600);
    const alfa = (alfaMin + azar() * (alfaMax - alfaMin)).toFixed(2);
    puntos.push(`${x}px ${y}px rgba(255,255,255,${alfa})`);
  }
  return puntos.join(",");
}

const CHICAS = estrellas(260, 7, 0.15, 0.55);
const MEDIANAS = estrellas(70, 31, 0.3, 0.8);
const GRANDES = estrellas(18, 97, 0.6, 1);

export default function Cielo() {
  return (
    <div className="cielo" aria-hidden="true">
      <div className="nebulosa nebulosa-verde" />
      <div className="nebulosa nebulosa-azul" />
      <div className="estrellas" style={{ width: 1, height: 1, boxShadow: CHICAS }} />
      <div className="estrellas titilar" style={{ width: 1.5, height: 1.5, boxShadow: MEDIANAS }} />
      <div className="estrellas titilar-lento" style={{ width: 2, height: 2, boxShadow: GRANDES }} />
      <div className="grano" />
    </div>
  );
}
