import { randomInt } from "node:crypto";
import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import type { Consulta } from "./consulta";
import type { Origen } from "./origen";

/* Base de /diagnostico en Neon. Variable de entorno (server-side): DATABASE_URL.
   Las tablas llevan el prefijo diagnostico_ y se crean solas la primera vez.
   Producción y vistas previas pueden compartir la base: cada fila guarda su entorno
   (VERCEL_ENV) y el panel muestra solo producción salvo que se pida lo contrario.
   No se guardan IP, navegador ni cookies: solo los UTM y lo que la persona escribe. */

export type TipoEvento = "visita" | "inicio" | "whatsapp";
export const TIPOS_EVENTO: readonly TipoEvento[] = ["visita", "inicio", "whatsapp"];

export const hayBase = () => Boolean(process.env.DATABASE_URL);
export const entorno = () => process.env.VERCEL_ENV || "development";

let conexion: NeonQueryFunction<false, false> | null = null;
let esquema: Promise<void> | null = null;

function sql() {
  if (!conexion) {
    if (!process.env.DATABASE_URL) throw new Error("Falta DATABASE_URL");
    conexion = neon(process.env.DATABASE_URL);
  }
  return conexion;
}

function asegurarEsquema() {
  if (!esquema) {
    const q = sql();
    esquema = (async () => {
      await q`CREATE TABLE IF NOT EXISTS diagnostico_consultas (
        codigo text PRIMARY KEY,
        creado timestamptz NOT NULL DEFAULT now(),
        entorno text NOT NULL,
        nombre text NOT NULL,
        whatsapp text NOT NULL,
        negocio text NOT NULL,
        equipo text NOT NULL,
        dolor text NOT NULL,
        urgencia text NOT NULL,
        fuente text NOT NULL DEFAULT '',
        medio text NOT NULL DEFAULT '',
        campana text NOT NULL DEFAULT '',
        conjunto text NOT NULL DEFAULT '',
        anuncio text NOT NULL DEFAULT '',
        angulo text NOT NULL DEFAULT ''
      )`;
      await q`CREATE TABLE IF NOT EXISTS diagnostico_eventos (
        id bigserial PRIMARY KEY,
        creado timestamptz NOT NULL DEFAULT now(),
        entorno text NOT NULL,
        tipo text NOT NULL,
        fuente text NOT NULL DEFAULT '',
        medio text NOT NULL DEFAULT '',
        campana text NOT NULL DEFAULT '',
        conjunto text NOT NULL DEFAULT '',
        anuncio text NOT NULL DEFAULT '',
        angulo text NOT NULL DEFAULT '',
        referente text NOT NULL DEFAULT ''
      )`;
      await q`CREATE INDEX IF NOT EXISTS diagnostico_eventos_creado ON diagnostico_eventos (creado)`;
      await q`CREATE INDEX IF NOT EXISTS diagnostico_consultas_creado ON diagnostico_consultas (creado)`;
    })().catch((e) => {
      esquema = null;
      throw e;
    });
  }
  return esquema;
}

/* Código corto para nombrar la consulta por WhatsApp (D-7KQ2M). Sin 0/O ni 1/I. */
const ALFABETO = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
const nuevoCodigo = () => "D-" + Array.from({ length: 5 }, () => ALFABETO[randomInt(ALFABETO.length)]).join("");

export async function guardarConsulta(c: Consulta, o: Origen) {
  await asegurarEsquema();
  for (let intento = 0; intento < 4; intento++) {
    const codigo = nuevoCodigo();
    const filas = await sql()`
      INSERT INTO diagnostico_consultas
        (codigo, entorno, nombre, whatsapp, negocio, equipo, dolor, urgencia,
         fuente, medio, campana, conjunto, anuncio, angulo)
      VALUES
        (${codigo}, ${entorno()}, ${c.nombre}, ${c.whatsapp}, ${c.negocio}, ${c.equipo}, ${c.dolor}, ${c.urgencia},
         ${o.fuente}, ${o.medio}, ${o.campana}, ${o.conjunto}, ${o.anuncio}, ${o.angulo})
      ON CONFLICT (codigo) DO NOTHING
      RETURNING codigo, creado`;
    if (filas.length) return { codigo, creado: new Date(filas[0].creado as string).toISOString() };
  }
  throw new Error("No hubo código libre");
}

export async function registrarEvento(tipo: TipoEvento, o: Origen, referente: string) {
  await asegurarEsquema();
  await sql()`
    INSERT INTO diagnostico_eventos (entorno, tipo, fuente, medio, campana, conjunto, anuncio, angulo, referente)
    VALUES (${entorno()}, ${tipo}, ${o.fuente}, ${o.medio}, ${o.campana}, ${o.conjunto}, ${o.anuncio}, ${o.angulo}, ${referente})`;
}

/* Consultas de la última hora, de todos los entornos: el freno de los avisos por WhatsApp. */
export async function consultasDeLaUltimaHora() {
  await asegurarEsquema();
  const filas = await sql()`
    SELECT count(*)::int AS n FROM diagnostico_consultas WHERE creado > now() - interval '1 hour'`;
  return Number(filas[0]?.n ?? 0);
}

/* Cómo se nombra el origen en los conteos: el anuncio si vino de uno; si no, fuente / medio.
   Igual que etiquetaDe en origen.ts. */
const ETIQUETA = `CASE WHEN anuncio <> '' THEN anuncio
  WHEN fuente <> '' THEN fuente || CASE WHEN medio <> '' THEN ' / ' || medio ELSE '' END
  ELSE '(directo)' END`;

export type FilaResumen = {
  origen: string;
  visitas: number;
  inicios: number;
  envios: number;
  calificadas: number;
  proximos: number;
  whatsapp: number;
};

/* Por origen: visitas → empezaron el formulario → lo mandaron → dijeron "ahora" (y "próximos meses")
   → tocaron WhatsApp. Los envíos salen de las consultas guardadas, no de un evento del navegador. */
export async function resumenPorOrigen(dias: number, todos: boolean): Promise<FilaResumen[]> {
  await asegurarEsquema();
  const q = sql();
  const filas = await q`
    WITH ev AS (
      SELECT ${q.unsafe(ETIQUETA)} AS origen,
        count(*) FILTER (WHERE tipo = 'visita') AS visitas,
        count(*) FILTER (WHERE tipo = 'inicio') AS inicios,
        count(*) FILTER (WHERE tipo = 'whatsapp') AS whatsapp
      FROM diagnostico_eventos
      WHERE creado > now() - make_interval(days => ${dias}::int) AND (${todos}::boolean OR entorno = 'production')
      GROUP BY 1
    ), co AS (
      SELECT ${q.unsafe(ETIQUETA)} AS origen,
        count(*) AS envios,
        count(*) FILTER (WHERE urgencia = 'ahora') AS calificadas,
        count(*) FILTER (WHERE urgencia = 'proximos-meses') AS proximos
      FROM diagnostico_consultas
      WHERE creado > now() - make_interval(days => ${dias}::int) AND (${todos}::boolean OR entorno = 'production')
      GROUP BY 1
    )
    SELECT coalesce(ev.origen, co.origen) AS origen,
      coalesce(ev.visitas, 0)::int AS visitas,
      coalesce(ev.inicios, 0)::int AS inicios,
      coalesce(co.envios, 0)::int AS envios,
      coalesce(co.calificadas, 0)::int AS calificadas,
      coalesce(co.proximos, 0)::int AS proximos,
      coalesce(ev.whatsapp, 0)::int AS whatsapp
    FROM ev FULL OUTER JOIN co ON ev.origen = co.origen
    ORDER BY visitas DESC, envios DESC, origen`;
  return filas as FilaResumen[];
}

export type FilaConsulta = Consulta & { codigo: string; creado: string; entorno: string; origen: string };

export async function ultimasConsultas(dias: number, todos: boolean, limite = 100): Promise<FilaConsulta[]> {
  await asegurarEsquema();
  const q = sql();
  const filas = await q`
    SELECT codigo, creado, entorno, nombre, whatsapp, negocio, equipo, dolor, urgencia,
      ${q.unsafe(ETIQUETA)} AS origen
    FROM diagnostico_consultas
    WHERE creado > now() - make_interval(days => ${dias}::int) AND (${todos}::boolean OR entorno = 'production')
    ORDER BY creado DESC
    LIMIT ${limite}::int`;
  return filas.map((f) => ({ ...f, creado: new Date(f.creado as string).toISOString() })) as FilaConsulta[];
}
