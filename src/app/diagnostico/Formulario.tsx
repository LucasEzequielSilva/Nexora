"use client";

import { useCallback, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { EQUIPO, LARGOS, URGENCIA, esCalificada, validarConsulta, type Consulta } from "@/lib/diagnostico/consulta";
import { contar } from "@/lib/diagnostico/evento";
import type { Origen } from "@/lib/diagnostico/origen";
import Agenda from "./Agenda";
import BotonWhatsapp from "./BotonWhatsapp";
import { Flecha, Tilde } from "./Iconos";
import s from "./diagnostico.module.css";

/* El formulario que califica (borrador del plan de la campaña 1): qué hace el negocio, cuántos son,
   qué le come más tiempo, cuándo lo quiere resolver, nombre y WhatsApp. Guarda la consulta con un
   código. Si calificó y hay agenda (DIAGNOSTICO_CAL), elige día y horario ahí mismo; si no, le
   escribe Valentino, y si hay número puede adelantarse por WhatsApp con ese código. */

type Estado = "listo" | "enviando" | "hecho" | "error";

const VACIA: Consulta = { nombre: "", whatsapp: "", negocio: "", equipo: "", dolor: "", urgencia: "" };

const etiqueta = "block text-[15px] font-medium text-[#f3f5f9] mb-2";

export default function Formulario({ origen, whatsapp, calLink }: { origen: Origen; whatsapp: string; calLink: string }) {
  const [c, setC] = useState<Consulta>(VACIA);
  const [trampa, setTrampa] = useState("");
  const [estado, setEstado] = useState<Estado>("listo");
  const [error, setError] = useState("");
  const [fallo, setFallo] = useState(false);
  const [codigo, setCodigo] = useState("");
  const [agendo, setAgendo] = useState(false);
  const empezo = useRef(false);
  const marcarAgendado = useCallback(() => setAgendo(true), []);

  const cambiar = (k: keyof Consulta) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!empezo.current) {
      empezo.current = true;
      contar("inicio", origen);
    }
    setC((x) => ({ ...x, [k]: e.target.value }));
    if (estado === "error" && !fallo) setEstado("listo");
  };

  async function enviar(e: FormEvent) {
    e.preventDefault();
    const v = validarConsulta(c);
    if (!v.ok) {
      setError(v.error);
      setFallo(false);
      setEstado("error");
      return;
    }
    setEstado("enviando");
    setError("");
    try {
      const r = await fetch("/api/diagnostico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...v.consulta, origen, sitio: trampa }),
      });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j.ok) {
        setCodigo(typeof j.codigo === "string" ? j.codigo : "");
        setEstado("hecho");
        return;
      }
      setError(j.error || "No pudimos guardar tu consulta. Probá de nuevo en un rato.");
      setFallo(r.status >= 500);
    } catch {
      setError("No pudimos mandar tu consulta. Revisá la conexión y probá de nuevo.");
      setFallo(true);
    }
    setEstado("error");
  }

  const nombre = c.nombre.trim().split(" ")[0];

  if (estado === "hecho" && calLink && codigo && esCalificada(c)) {
    return (
      <div role="status">
        <h3 className="text-center text-[24px] font-extrabold">Listo{nombre ? `, ${nombre}` : ""}.</h3>
        <p className="mx-auto mb-5 mt-2 max-w-[38ch] text-center text-[16px] leading-relaxed text-[#a7b0c0]">
          {agendo ? "Quedó agendado. Te llega la confirmación por mail." : "Elegí día y horario para la charla con Valentino."}
        </p>
        <Agenda calLink={calLink} nombre={c.nombre.trim()} codigo={codigo} origen={origen} alAgendar={marcarAgendado} />
        {!agendo && (
          <p className="mt-5 text-center text-[14px] leading-relaxed text-[#7c869a]">
            ¿No te queda ningún horario? Te escribe Valentino por WhatsApp. Tu consulta quedó con el código{" "}
            <span className="font-bold text-[#f3f5f9]">{codigo}</span>.
          </p>
        )}
      </div>
    );
  }

  if (estado === "hecho") {
    return (
      <div className="py-4 text-center" role="status">
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-[#00e676]/40 bg-[#00e676]/10 text-[#00e676]">
          <Tilde />
        </div>
        <h3 className="mb-3 text-[24px] font-extrabold">Listo{nombre ? `, ${nombre}` : ""}.</h3>
        <p className="mx-auto max-w-[34ch] text-[16px] leading-relaxed text-[#a7b0c0]">
          Te escribe Valentino por WhatsApp. Si es de noche, a primera hora de la mañana.
        </p>
        {codigo && (
          <p className="mt-4 text-[14px] text-[#7c869a]">
            Tu consulta quedó con el código <span className="font-bold text-[#f3f5f9]">{codigo}</span>.
          </p>
        )}
        {codigo && (
          <BotonWhatsapp
            numero={whatsapp}
            mensaje={`Hola, soy ${nombre}. Dejé la consulta ${codigo} en la web.`}
            origen={origen}
            className={`${s.secundario} mt-6`}
          >
            ¿Querés adelantarte? Escribinos
          </BotonWhatsapp>
        )}
      </div>
    );
  }

  const enviando = estado === "enviando";

  return (
    <form onSubmit={enviar} noValidate className="flex flex-col gap-6" aria-describedby={error ? "diagnostico-error" : undefined}>
      <div>
        <label htmlFor="d-negocio" className={etiqueta}>
          ¿Qué hace tu negocio?
        </label>
        <input
          id="d-negocio"
          className={s.campo}
          value={c.negocio}
          onChange={cambiar("negocio")}
          maxLength={LARGOS.negocio}
          placeholder="Ej.: peluquería, consultorio, academia de inglés"
          required
        />
      </div>

      <fieldset>
        <legend className={etiqueta}>¿Cuántos son en el equipo?</legend>
        <div className="flex flex-wrap gap-2">
          {EQUIPO.map((o) => (
            <label key={o.valor}>
              <input
                type="radio"
                name="equipo"
                value={o.valor}
                checked={c.equipo === o.valor}
                onChange={cambiar("equipo")}
                className="sr-only"
              />
              <span className={s.opcion}>{o.texto}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="d-dolor" className={etiqueta}>
          ¿Qué es lo que más tiempo te come en el día?
        </label>
        <textarea
          id="d-dolor"
          className={`${s.campo} min-h-[96px] resize-y`}
          value={c.dolor}
          onChange={cambiar("dolor")}
          maxLength={LARGOS.dolor}
          rows={3}
          placeholder="Ej.: contestar consultas, confirmar turnos, pasar datos a una planilla"
          aria-describedby="d-dolor-ayuda"
          required
        />
        <p id="d-dolor-ayuda" className="mt-2 text-[13px] text-[#7c869a]">
          Contalo en general, sin datos de tus clientes ni de pacientes.
        </p>
      </div>

      <fieldset>
        <legend className={etiqueta}>¿Cuándo lo querés resolver?</legend>
        <div className="flex flex-wrap gap-2">
          {URGENCIA.map((o) => (
            <label key={o.valor}>
              <input
                type="radio"
                name="urgencia"
                value={o.valor}
                checked={c.urgencia === o.valor}
                onChange={cambiar("urgencia")}
                className="sr-only"
              />
              <span className={s.opcion}>{o.texto}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="d-nombre" className={etiqueta}>
            Tu nombre
          </label>
          <input
            id="d-nombre"
            className={s.campo}
            value={c.nombre}
            onChange={cambiar("nombre")}
            maxLength={LARGOS.nombre}
            autoComplete="name"
            required
          />
        </div>
        <div>
          <label htmlFor="d-whatsapp" className={etiqueta}>
            Tu WhatsApp
          </label>
          <input
            id="d-whatsapp"
            type="tel"
            inputMode="tel"
            className={s.campo}
            value={c.whatsapp}
            onChange={cambiar("whatsapp")}
            maxLength={LARGOS.whatsapp}
            autoComplete="tel"
            placeholder="Con código de área"
            required
          />
        </div>
      </div>

      {/* Campo trampa para bots: oculto para las personas y para los lectores de pantalla. */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="d-sitio">Sitio web</label>
        <input id="d-sitio" tabIndex={-1} autoComplete="off" value={trampa} onChange={(e) => setTrampa(e.target.value)} />
      </div>

      <div className="flex flex-col gap-3">
        <button type="submit" disabled={enviando} className={`${s.boton} w-full`}>
          {enviando ? "Enviando…" : "Quiero mi diagnóstico"}
          {!enviando && <Flecha />}
        </button>

        {estado === "error" && error && (
          <p id="diagnostico-error" role="alert" className="text-center text-[14px] text-[#ff8a8a]">
            {error}
          </p>
        )}
        {estado === "error" && fallo && (
          <BotonWhatsapp
            numero={whatsapp}
            mensaje={`Hola, soy ${c.nombre.trim()}. Quiero el diagnóstico.\nMi negocio: ${c.negocio.trim()}.\nLo que más tiempo me come: ${c.dolor.trim()}.`}
            origen={origen}
            className={`${s.secundario} w-full`}
          >
            Mandalo por WhatsApp
          </BotonWhatsapp>
        )}

        <p className="text-center text-[13px] leading-relaxed text-[#7c869a]">
          Usamos tus datos solo para escribirte por esta consulta.{" "}
          <a href="/privacidad" className="underline underline-offset-2 hover:text-[#a7b0c0]">
            Política de privacidad
          </a>
          .
        </p>
      </div>
    </form>
  );
}
