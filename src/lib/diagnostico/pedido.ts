/* Frenos simples para las APIs de /diagnostico. La IP se usa solo en memoria, para contar pedidos
   seguidos; no se guarda en ningún lado. Por instancia: alcanza como freno, no como cuota exacta. */

const usos = new Map<string, number[]>();

export function ipDe(req: Request) {
  return (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || req.headers.get("x-real-ip") || "sin-ip";
}

export function limitado(clave: string, maximo: number, ventanaMs: number) {
  const ahora = Date.now();
  const recientes = (usos.get(clave) || []).filter((t) => ahora - t < ventanaMs);
  recientes.push(ahora);
  usos.set(clave, recientes);
  if (usos.size > 5000) {
    for (const [k, v] of usos) if (!v.some((t) => ahora - t < ventanaMs)) usos.delete(k);
  }
  return recientes.length > maximo;
}

/* Solo pedidos que salen de la misma página: si el navegador manda Origin, tiene que ser este sitio. */
export function mismoSitio(req: Request) {
  const origen = req.headers.get("origin");
  if (!origen) return true;
  try {
    return new URL(origen).host === (req.headers.get("x-forwarded-host") || req.headers.get("host"));
  } catch {
    return false;
  }
}
