/* Textura premium para cards: campo de pixels CUADRADOS (pixel-highlight) denso —
   gap chico (~5px) y opacidad DIVERSA (brillo variado, tipo dispersión de pixeles) +
   máscara difuminada + light glow verde sutil arriba-izq. Estático.
   Independiente del DotGrid global. Requiere contenedor `relative isolate`. */

// arma un tile 15x15 con los pixeles que se le pasen (x, y, opacidad)
const tile = (px: [number, number, string][]) =>
  "url(\"data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='15'%20height='15'%3E" +
  px
    .map(
      ([x, y, o]) =>
        `%3Crect%20x='${x}'%20y='${y}'%20width='2'%20height='2'%20fill='white'%20fill-opacity='${o}'/%3E`
    )
    .join("") +
  "%3C/svg%3E\")";

// tile 3x3 con opacidad diversa (brillo disperso)
const PX = tile([
  [1, 1, "0.19"],
  [6, 1, "0.07"],
  [11, 1, "0.13"],
  [1, 6, "0.06"],
  [6, 6, "0.18"],
  [11, 6, "0.10"],
  [1, 11, "0.12"],
  [6, 11, "0.05"],
  [11, 11, "0.16"],
]);

export default function CardTexture({
  rounded = "rounded-2xl",
  accent = false,
}: {
  rounded?: string;
  accent?: boolean;
}) {
  // máscara: banda full-width pegada al top (elipse blurreada), se concentra arriba
  // y se desvanece hacia abajo antes de pisar el texto
  const mask =
    "radial-gradient(ellipse 135% 55% at 50% -10%, black 0%, rgba(0,0,0,0.5) 26%, rgba(0,0,0,0.12) 50%, transparent 72%)";
  return (
    <>
      {/* pixeles cuadrados, densos y de brillo diverso */}
      <div
        className={`absolute inset-0 pointer-events-none -z-10 ${rounded}`}
        style={{
          backgroundImage: PX,
          backgroundSize: "15px 15px",
          backgroundRepeat: "repeat",
          opacity: 0.5,
          WebkitMaskImage: mask,
          maskImage: mask,
        }}
      />
      {/* glow cenital DENTRO de la card (recortado al rounded): barra de luz pegada
          al top + halo que baja — no desborda hacia afuera */}
      <div
        className={`absolute inset-0 pointer-events-none -z-10 ${rounded}`}
        style={{
          background: accent
            ? "radial-gradient(ellipse 55% 14% at 50% 0%, rgba(74,222,128,0.5) 0%, transparent 72%), radial-gradient(ellipse 92% 48% at 50% 0%, rgba(34,197,94,0.1) 0%, transparent 66%)"
            : "radial-gradient(ellipse 55% 14% at 50% 0%, rgba(74,222,128,0.26) 0%, transparent 72%), radial-gradient(ellipse 92% 48% at 50% 0%, rgba(34,197,94,0.05) 0%, transparent 64%)",
        }}
      />
    </>
  );
}
