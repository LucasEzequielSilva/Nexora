/* El equipo que aparece en la web. Cada foto se publica con el OK de esa persona.
   Para sumar una foto: dejarla en public/equipo/ y poner la ruta en `foto` (por ejemplo "/equipo/juan.jpg").
   Sin foto, la tarjeta muestra la inicial. */

export type Persona = {
  nombre: string;
  nombreCompleto?: string;
  rol: string;
  descripcion: string;
  foto?: string;
};

export const EQUIPO: Persona[] = [
  {
    nombre: "Cogne",
    nombreCompleto: "Valentino Cognetti",
    rol: "Fundador",
    descripcion: "Es quien te atiende en la primera llamada y arma tu propuesta.",
    foto: "/cogne.webp",
  },
  {
    nombre: "Lucas",
    rol: "Cofundador",
    descripcion: "Construye los sistemas y los mantiene andando.",
  },
  {
    nombre: "Juan",
    rol: "Primer contacto y contenido",
    descripcion: "Es el primero que les escribe a los negocios y arma nuestros videos.",
  },
  {
    nombre: "Chapu",
    rol: "Ventas",
    descripcion: "Habla con los negocios que nos escriben y los acompaña hasta la llamada.",
  },
  {
    nombre: "Migue",
    rol: "Cámara y contenido",
    descripcion: "Graba y edita los videos donde nos ves la cara.",
  },
];

/* Foto del equipo completo. Vacía, no se muestra. */
export const FOTO_GRUPAL = "";
