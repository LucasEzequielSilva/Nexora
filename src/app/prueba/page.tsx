"use client";

import { useEffect, useRef, useState } from "react";

type Horario = { id: string; fecha: string; texto: string };
type Mensaje = { rol: "cliente" | "asistente" | "sistema"; texto: string; ofrecidos?: Horario[] };
type Ficha = { nombre: string; actividad: string; condicion_iva: string; facturacion: string; tiene_contador: string; servicio: string };
type Evento = { hora: string; texto: string };

const ESTUDIO = "Global 360";
const FICHA_VACIA: Ficha = { nombre: "", actividad: "", condicion_iva: "", facturacion: "", tiene_contador: "", servicio: "" };
const SERVICIOS: Record<string, string> = {
  mono: "Monotributo", ri: "Responsable inscripto", sueldos: "Liquidación de sueldos", soc: "Sociedades", consulta: "Consulta puntual",
};
const ETAPAS = ["Lead entrante", "Calificación", "Reunión"];
const IDEAS = [
  "Hola, soy monotributista y me quiero pasar a responsable inscripto",
  "¿Cuánto me van a cobrar por llevarme la contabilidad?",
  "¿Cuánto IVA voy a pagar este mes?",
  "Me llegó una intimación de ARCA, ¿qué hago?",
  "Mi CUIT es 20-12345678-9, fijate si debo algo",
  "Ya soy cliente de ustedes, necesito el comprobante del mes pasado",
  "Quiero hablar con una persona",
];
const CLAVE = "nexora-prueba-codigo";

const ahoraHora = () => new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit", hour12: false });

export default function Prueba() {
  const [codigo, setCodigo] = useState("");
  const [quien, setQuien] = useState("");
  const [entrada, setEntrada] = useState("");
  const [errorAcceso, setErrorAcceso] = useState("");
  const [validando, setValidando] = useState(false);

  const [msgs, setMsgs] = useState<Mensaje[]>([]);
  const [ficha, setFicha] = useState<Ficha>(FICHA_VACIA);
  const [etapa, setEtapa] = useState(0);
  const [reunion, setReunion] = useState<Horario | null>(null);
  const [ocupados, setOcupados] = useState<string[]>([]);
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [pausa, setPausa] = useState("");
  const [texto, setTexto] = useState("");
  const [pensando, setPensando] = useState(false);
  const [aviso, setAviso] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Código desde el link (?c=...) o recordado en este navegador.
  useEffect(() => {
    let c = new URLSearchParams(window.location.search).get("c") || "";
    if (!c) {
      try { c = localStorage.getItem(CLAVE) || ""; } catch { /* sin almacenamiento */ }
    }
    if (c) entrar(c);
  }, []);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, pensando]);

  async function entrar(c: string) {
    setValidando(true);
    setErrorAcceso("");
    try {
      const r = await fetch("/api/prueba", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ codigo: c, soloValidar: true }) });
      const j = await r.json();
      if (j.ok) {
        setCodigo(c);
        setQuien(j.quien);
        try { localStorage.setItem(CLAVE, c); } catch { /* sin almacenamiento */ }
      } else {
        setErrorAcceso(j.error || "No pudimos validar el código.");
      }
    } catch {
      setErrorAcceso("No hay conexión. Probá de nuevo.");
    } finally {
      setValidando(false);
    }
  }

  function evento(t: string) {
    setEventos((e) => [{ hora: ahoraHora(), texto: t }, ...e]);
  }

  function reiniciar() {
    setMsgs([]); setFicha(FICHA_VACIA); setEtapa(0); setReunion(null); setOcupados([]);
    setEventos([]); setPausa(""); setAviso(""); setTexto("");
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  async function enviar(t: string) {
    const limpio = t.trim().slice(0, 600);
    if (!limpio || pensando || pausa) return;
    const nuevos: Mensaje[] = [...msgs, { rol: "cliente", texto: limpio }];
    const primero = !msgs.some((m) => m.rol === "cliente");
    setMsgs(nuevos);
    setTexto("");
    setAviso("");
    setPensando(true);
    if (primero) evento("Entró un mensaje nuevo: se creó el contacto en Lead entrante.");
    try {
      const r = await fetch("/api/prueba", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          codigo,
          mensajes: nuevos.filter((m) => m.rol !== "sistema").map((m) => ({ rol: m.rol, texto: m.texto })),
          ficha,
          reunion: reunion?.texto || "",
          ocupados,
        }),
      });
      const j = await r.json();
      if (!j.ok) {
        setAviso(j.error || "El asistente no respondió. Volvé a mandar el mensaje.");
        setMsgs(msgs);
        setTexto(limpio);
        return;
      }
      aplicar(j, primero, nuevos);
    } catch {
      setAviso("Se cortó la conexión. Volvé a mandar el mensaje.");
      setMsgs(msgs);
      setTexto(limpio);
    } finally {
      setPensando(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }

  function aplicar(
    j: { mensajes: string[]; ficha: Ficha; ofrecidos: Horario[]; agendado: Horario | null; derivar: string; clienteActual: boolean },
    primero: boolean,
    base: Mensaje[],
  ) {
    const respuesta: Mensaje[] = j.mensajes.map((m) => ({ rol: "asistente", texto: m }));
    if (j.ofrecidos?.length && !j.agendado) respuesta[respuesta.length - 1].ofrecidos = j.ofrecidos;
    if (primero) evento("El asistente se presentó con el aviso breve: quedó registrado.");

    const cambios: string[] = [];
    const nueva: Ficha = { ...ficha };
    (Object.keys(FICHA_VACIA) as (keyof Ficha)[]).forEach((k) => {
      const v = (j.ficha?.[k] || "").trim();
      if (v && v !== ficha[k]) { nueva[k] = v; cambios.push(EN_EVENTO[k]); }
    });
    if (cambios.length) {
      setFicha(nueva);
      evento(`Ficha: ${cambios.join(", ")}. Sin montos exactos, CUIT ni claves.`);
      if (etapa < 1) { setEtapa(1); evento("El contacto pasó a Calificación."); }
    }
    if (j.agendado) {
      setOcupados((o) => [...o.filter((f) => f !== reunion?.fecha), j.agendado!.fecha]);
      evento(`${reunion ? "Reunión reprogramada" : "Reunión agendada"}: ${j.agendado.texto}. El contacto pasó a Reunión y el contador recibió el aviso.`);
      setReunion(j.agendado);
      setEtapa(2);
    }
    if (j.derivar) {
      respuesta.push({ rol: "sistema", texto: "El asistente queda en pausa en esta conversación: responde una persona del estudio." });
      evento(`Derivado a una persona (${j.derivar}): se creó la tarea «Responder» y se avisó al equipo.`);
      setPausa("derivado");
    } else if (j.clienteActual) {
      respuesta.push({ rol: "sistema", texto: "Es cliente del estudio: el asistente no le vende y avisa a su contador." });
      evento("Es cliente actual: no entra al pipeline; se avisó a su contador.");
      setPausa("cliente");
    }
    setMsgs([...base, ...respuesta]);
  }

  async function copiar() {
    const t = `Prueba del asistente de ${ESTUDIO} (${quien})\n\n` +
      msgs.map((m) => `${m.rol === "cliente" ? "Cliente" : m.rol === "asistente" ? "Asistente" : "Sistema"}: ${m.texto}`).join("\n") +
      `\n\nQué hizo el sistema:\n${[...eventos].reverse().map((e) => `- ${e.texto}`).join("\n")}`;
    try {
      await navigator.clipboard.writeText(t);
      setAviso("Conversación copiada: pegala en el WhatsApp de Nexora.");
    } catch {
      setAviso("No se pudo copiar automáticamente. Seleccioná el chat y copialo a mano.");
    }
  }

  if (!codigo) {
    return (
      <main className="relative z-10 mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-12">
        <div className="rounded-2xl p-7" style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}>
          <p className="font-mono text-[12px] uppercase tracking-[0.2em]" style={{ color: "var(--color-accent)" }}>Nexora · prueba</p>
          <h1 className="mt-2 text-[26px] font-bold leading-tight">Probá el asistente de {ESTUDIO}</h1>
          <p className="mt-2 text-[15px]" style={{ color: "var(--color-text-secondary)" }}>
            Le escribís como si fueras un cliente y ves lo que registra el estudio. No necesitás ninguna cuenta.
          </p>
          <form className="mt-6 flex flex-col gap-3" onSubmit={(e) => { e.preventDefault(); entrar(entrada.trim()); }}>
            <label htmlFor="codigo" className="text-[13px] font-semibold">Código de acceso</label>
            <input
              id="codigo" value={entrada} onChange={(e) => setEntrada(e.target.value)} autoComplete="off"
              className="w-full rounded-lg px-4 py-3 text-[15px] text-white outline-none focus-visible:ring-2 focus-visible:ring-green-500"
              style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.12)" }}
              placeholder="El que te pasó Nexora"
            />
            {errorAcceso && <p role="alert" className="text-[14px] text-red-400">{errorAcceso}</p>}
            <button type="submit" disabled={validando || !entrada.trim()} className="rounded-lg px-4 py-3 text-[15px] font-semibold text-black disabled:opacity-50" style={{ background: "var(--color-accent)" }}>
              {validando ? "Validando…" : "Entrar"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="relative z-10 mx-auto max-w-6xl px-4 py-8 md:py-12">
      <header className="mb-6 flex flex-col gap-2">
        <p className="font-mono text-[12px] uppercase tracking-[0.2em]" style={{ color: "var(--color-accent)" }}>Nexora · prueba del asistente</p>
        <h1 className="text-[28px] font-bold leading-tight md:text-[34px]">Asistente de WhatsApp de {ESTUDIO}</h1>
        <p className="max-w-[70ch] text-[15px]" style={{ color: "var(--color-text-secondary)" }}>
          Escribile como si fueras un cliente del estudio. En «Lo que ve el estudio» aparece lo que registra el sistema con cada mensaje. Los servicios y horarios son de prueba: se ajustan con el relevamiento de {ESTUDIO}.
        </p>
      </header>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <section aria-label="Chat de prueba" className="flex min-w-0 flex-col overflow-hidden rounded-2xl" style={{ background: "#0b141a", border: "1px solid var(--color-border)" }}>
          <div className="flex items-center gap-3 px-4 py-3" style={{ background: "#1f2c34" }}>
            <span className="grid h-9 w-9 place-items-center rounded-full text-[13px] font-bold text-black" style={{ background: "var(--color-accent)" }}>G3</span>
            <div className="min-w-0">
              <p className="text-[15px] font-semibold">{ESTUDIO}</p>
              <p className="text-[12px]" style={{ color: "#8696a0" }}>{pensando ? "escribiendo…" : "Cuenta de empresa · asistente de IA"}</p>
            </div>
          </div>

          <div ref={chatRef} className="flex h-[56vh] min-h-[380px] flex-col gap-2 overflow-y-auto px-3 py-4" aria-live="polite">
            {!msgs.length && (
              <div className="mx-auto mt-4 max-w-[92%] rounded-xl px-4 py-3 text-center text-[13px]" style={{ background: "#182229", color: "#8696a0" }}>
                Escribí abajo como si fueras un cliente, o tocá una de las ideas para probar.
              </div>
            )}
            {msgs.map((m, i) =>
              m.rol === "sistema" ? (
                <div key={i} className="mx-auto max-w-[92%] rounded-lg px-3 py-1.5 text-center text-[12px] font-medium" style={{ background: "#3b2f12", color: "#f5d48b" }}>{m.texto}</div>
              ) : (
                <div key={i} className={`flex flex-col gap-1.5 ${m.rol === "cliente" ? "items-end" : "items-start"}`}>
                  <p className="max-w-[85%] whitespace-pre-wrap break-words rounded-xl px-3 py-2 text-[14px] leading-snug" style={{ background: m.rol === "cliente" ? "#005c4b" : "#202c33", color: "#e9edef" }}>{m.texto}</p>
                  {m.ofrecidos && i === msgs.length - 1 && !pensando && !pausa && (
                    <div className="flex w-[85%] flex-col gap-1.5">
                      {m.ofrecidos.map((h) => (
                        <button key={h.id} onClick={() => enviar(h.texto)} className="rounded-xl px-3 py-2 text-[13px] font-semibold" style={{ border: "1px solid var(--color-accent)", color: "var(--color-accent)", background: "transparent" }}>
                          {h.texto.charAt(0).toUpperCase() + h.texto.slice(1)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ),
            )}
            {pensando && (
              <div className="flex gap-1 self-start rounded-xl px-3 py-3" style={{ background: "#202c33" }} aria-label="El asistente está escribiendo">
                {[0, 1, 2].map((k) => <i key={k} className="h-1.5 w-1.5 rounded-full bg-zinc-400" style={{ animation: `typingBounce 1.2s ${k * 0.15}s infinite` }} />)}
              </div>
            )}
          </div>

          <form className="flex items-center gap-2 px-3 py-3" style={{ background: "#1f2c34" }} onSubmit={(e) => { e.preventDefault(); enviar(texto); }}>
            <input
              ref={inputRef} value={texto} onChange={(e) => setTexto(e.target.value)} maxLength={600} disabled={!!pausa}
              aria-label="Mensaje" placeholder={pausa ? "El asistente quedó en pausa: empezá de nuevo para otro caso" : "Escribí como cliente…"}
              className="min-w-0 flex-1 rounded-full px-4 py-2.5 text-[14px] text-white outline-none focus-visible:ring-2 focus-visible:ring-green-500 disabled:opacity-60"
              style={{ background: "#2a3942" }}
            />
            <button type="submit" disabled={pensando || !!pausa || !texto.trim()} aria-label="Enviar" className="grid h-10 w-10 flex-none place-items-center rounded-full text-black disabled:opacity-40" style={{ background: "var(--color-accent)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.4 20.4 21 12 3.4 3.6 3.4 10l12.6 2-12.6 2z" /></svg>
            </button>
          </form>
        </section>

        <aside className="flex min-w-0 flex-col gap-4">
          <div className="rounded-2xl p-5" style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}>
            <h2 className="text-[16px] font-bold">Lo que ve el estudio</h2>
            <ol className="mt-3 grid grid-cols-3 gap-2" aria-label="Etapa del contacto">
              {ETAPAS.map((n, k) => (
                <li key={n} className="flex flex-col gap-1.5">
                  <span className="h-1.5 rounded-full" style={{ background: msgs.length && k <= etapa ? "var(--color-accent)" : "var(--color-border)" }} />
                  <span className="text-[12px]" style={{ color: msgs.length && k === etapa ? "var(--color-text-primary)" : "var(--color-text-muted)", fontWeight: msgs.length && k === etapa ? 700 : 400 }}>{n}</span>
                </li>
              ))}
            </ol>
            {pausa && <p className="mt-3 rounded-lg px-3 py-2 text-[13px]" style={{ background: "#3b2f12", color: "#f5d48b" }}>{pausa === "derivado" ? "Derivado a una persona: hay una tarea «Responder» para el equipo." : "Cliente actual: no entra al pipeline."}</p>}
            <dl className="mt-4 grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-2 text-[14px]">
              {(Object.keys(FICHA_VACIA) as (keyof Ficha)[]).map((k) => (
                <div key={k} className="contents">
                  <dt style={{ color: "var(--color-text-muted)" }}>{ETIQUETAS[k]}</dt>
                  <dd className="break-words font-semibold">{(k === "servicio" ? SERVICIOS[ficha[k]] || ficha[k] : k === "tiene_contador" ? ({ si: "Sí", no: "No" } as Record<string, string>)[ficha[k]] || ficha[k] : ficha[k]) || <span className="font-normal" style={{ color: "var(--color-text-muted)" }}>—</span>}</dd>
                </div>
              ))}
              <dt style={{ color: "var(--color-text-muted)" }}>Reunión</dt>
              <dd className="font-semibold">{reunion ? reunion.texto : <span className="font-normal" style={{ color: "var(--color-text-muted)" }}>—</span>}</dd>
            </dl>
          </div>

          <div className="rounded-2xl p-5" style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}>
            <h2 className="text-[16px] font-bold">Qué hizo el sistema</h2>
            {eventos.length ? (
              <ul className="mt-3 flex max-h-56 flex-col gap-2 overflow-y-auto text-[13px]">
                {eventos.map((e, i) => (
                  <li key={i} className="flex gap-3"><span className="w-11 flex-none font-mono" style={{ color: "var(--color-text-muted)" }}>{e.hora}</span><span style={{ color: "var(--color-text-secondary)" }}>{e.texto}</span></li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-[13px]" style={{ color: "var(--color-text-muted)" }}>Cuando escribas, acá aparece cada paso que registra el sistema.</p>
            )}
          </div>

          <div className="rounded-2xl p-5" style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}>
            <h2 className="text-[16px] font-bold">Ideas para probar</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {IDEAS.map((t) => (
                <button key={t} onClick={() => { setTexto(t); inputRef.current?.focus(); }} disabled={!!pausa} className="rounded-full px-3 py-1.5 text-left text-[12.5px] disabled:opacity-50" style={{ border: "1px solid var(--color-border)", color: "var(--color-text-secondary)" }}>
                  {t}
                </button>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button onClick={reiniciar} className="rounded-lg px-4 py-2 text-[14px] font-semibold text-black" style={{ background: "var(--color-accent)" }}>Empezar de nuevo</button>
              <button onClick={copiar} disabled={!msgs.length} className="rounded-lg px-4 py-2 text-[14px] font-semibold disabled:opacity-50" style={{ border: "1px solid var(--color-border)" }}>Copiar la conversación</button>
            </div>
            {aviso && <p role="status" className="mt-3 text-[13px]" style={{ color: "var(--color-text-secondary)" }}>{aviso}</p>}
          </div>
        </aside>
      </div>
    </main>
  );
}

const ETIQUETAS: Record<keyof Ficha, string> = {
  nombre: "Nombre",
  actividad: "Actividad",
  condicion_iva: "Condición frente a IVA",
  facturacion: "Facturación anual",
  tiene_contador: "¿Tiene contador?",
  servicio: "Servicio de interés",
};

const EN_EVENTO: Record<keyof Ficha, string> = {
  nombre: "nombre",
  actividad: "actividad",
  condicion_iva: "condición frente a IVA",
  facturacion: "rango de facturación",
  tiene_contador: "si tiene contador",
  servicio: "servicio de interés",
};
