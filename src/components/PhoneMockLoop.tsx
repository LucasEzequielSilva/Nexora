"use client";

import { useState, useEffect } from "react";

const PHONE = "/phone-mock.webp"; // mano + iPhone recortado (499×896)

type Msg = { from: "patient" | "asiri"; text: string };
type Flow = { tag: string; msgs: Msg[] };

/* Los core use cases, cada uno como mini-conversación real */
const FLOWS: Flow[] = [
  { tag: "Agenda un turno", msgs: [
    { from: "patient", text: "Hola, quería un turno para ortodoncia 🦷" },
    { from: "asiri", text: "¡Hola! 🙋 Tengo jueves 15:30 o viernes 10:00. ¿Cuál te queda?" },
    { from: "patient", text: "Jueves 15:30" },
    { from: "asiri", text: "Listo ✅ Agendado jueves 15:30. Te confirmo 24h antes 🙌" },
  ] },
  { tag: "Cancela y reasigna", msgs: [
    { from: "patient", text: "Necesito cancelar mi turno de mañana 🙏" },
    { from: "asiri", text: "Hecho, lo cancelé. Libero el horario y aviso a la lista de espera." },
    { from: "asiri", text: "Turno reasignado a otra paciente ✅ Cero huecos." },
  ] },
  { tag: "Reprograma", msgs: [
    { from: "patient", text: "¿Puedo pasar mi turno al lunes?" },
    { from: "asiri", text: "Claro. El lunes tengo 11:00 o 16:30. ¿Cuál preferís?" },
    { from: "patient", text: "16:30 🙌" },
    { from: "asiri", text: "Reprogramado al lunes 16:30 ✅ Agenda actualizada." },
  ] },
  { tag: "Recuerda y confirma", msgs: [
    { from: "asiri", text: "👋 Hola Ana, te recuerdo tu turno mañana 15:30 con la Dra. Raquel." },
    { from: "patient", text: "Sí, confirmo 👍" },
    { from: "asiri", text: "¡Genial! Te espero. Menos ausencias, agenda que rinde ✨" },
  ] },
];

function Dots() {
  return (
    <div className="flex gap-1 rounded-xl w-fit" style={{ background: "#202c33", padding: "6px 9px" }}>
      {[0, 1, 2].map((i) => (
        <span key={i} className="rounded-full" style={{ width: 5, height: 5, background: "#8696a0", animation: "typingBounce 1.2s infinite", animationDelay: `${i * 0.18}s` }} />
      ))}
    </div>
  );
}

export default function PhoneMockLoop({ reduced, width = 300 }: { reduced: boolean; width?: number }) {
  const [flow, setFlow] = useState(0);
  const [visible, setVisible] = useState(reduced ? FLOWS[0].msgs.length : 0);
  const [typing, setTyping] = useState<"patient" | "asiri" | null>(null);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (reduced) return;
    let cancelled = false;
    const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
    const run = async () => {
      while (!cancelled) {
        for (let f = 0; f < FLOWS.length; f++) {
          if (cancelled) return;
          setFlow(f); setVisible(0); setTyping(null); setFade(false);
          await sleep(500); if (cancelled) return;
          const msgs = FLOWS[f].msgs;
          for (let i = 0; i < msgs.length; i++) {
            setTyping(msgs[i].from);
            await sleep(820); if (cancelled) return;
            setTyping(null);
            setVisible(i + 1);
            await sleep(820); if (cancelled) return;
          }
          await sleep(2200); if (cancelled) return;
          setFade(true);
          await sleep(600); if (cancelled) return;
        }
      }
    };
    run();
    return () => { cancelled = true; };
  }, [reduced]);

  const msgs = FLOWS[flow].msgs;
  const height = Math.round((width * 896) / 499);

  return (
    <div className="relative select-none" style={{ width, height }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={PHONE} alt="" className="absolute inset-0 w-full h-full object-contain" style={{ filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.55))" }} />

      {/* Pantalla = chat en vivo (tapa el placeholder violeta del mockup) */}
      <div className="absolute overflow-hidden flex flex-col" style={{ top: "3.4%", bottom: "3.4%", left: "14%", right: "13.6%", borderRadius: Math.round(width * 0.085), background: "#0b141a" }}>
        {/* header (debajo del notch) */}
        <div className="flex items-center gap-2 shrink-0" style={{ background: "#202c33", paddingLeft: 12, paddingRight: 12, paddingTop: Math.round(height * 0.052), paddingBottom: 8 }}>
          <span className="rounded-full flex items-center justify-center font-bold text-black shrink-0" style={{ width: 26, height: 26, fontSize: 12, background: "linear-gradient(135deg,#4ade80,#16a34a)" }}>A</span>
          <div className="leading-tight min-w-0">
            <p className="font-semibold truncate" style={{ color: "#e9edef", fontSize: 11 }}>Asiri · Dra. Raquel</p>
            <p style={{ color: "#22c55e", fontSize: 8.5 }}>en línea · responde sola</p>
          </div>
        </div>

        {/* chip del caso actual */}
        <div className="shrink-0 flex justify-center" style={{ background: "#0b141a", paddingTop: 6, paddingBottom: 4 }}>
          <span className="rounded-full" style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.25)", color: "#4ade80", fontSize: 8.5, fontWeight: 600, padding: "2px 9px" }}>{FLOWS[flow].tag}</span>
        </div>

        {/* mensajes */}
        <div className="flex-1 flex flex-col gap-1 justify-end overflow-hidden" style={{ paddingLeft: 9, paddingRight: 9, paddingBottom: 6, opacity: fade ? 0 : 1, transition: "opacity 0.45s ease" }}>
          {msgs.slice(0, visible).map((m, i) => {
            const sent = m.from === "patient";
            return (
              <div key={`${flow}-${i}`} className={`flex ${sent ? "justify-end" : "justify-start"}`}>
                <div style={{ maxWidth: "82%", padding: "5px 8px", background: sent ? "#005c4b" : "#202c33", borderRadius: sent ? "9px 9px 3px 9px" : "9px 9px 9px 3px", animation: "msgIn 0.35s ease-out both" }}>
                  <p style={{ color: "#e9edef", fontSize: 10.5, lineHeight: 1.35 }}>{m.text}</p>
                </div>
              </div>
            );
          })}
          {typing && (
            <div className={`flex ${typing === "patient" ? "justify-end" : "justify-start"}`}>
              <Dots />
            </div>
          )}
        </div>

        {/* input */}
        <div className="flex items-center gap-2 shrink-0" style={{ background: "#202c33", paddingLeft: 10, paddingRight: 10, paddingTop: 7, paddingBottom: Math.round(height * 0.028) }}>
          <div className="flex-1 rounded-full flex items-center px-3" style={{ height: 26, background: "#2a3942", color: "#8696a0", fontSize: 9.5 }}>Mensaje…</div>
          <span className="rounded-full flex items-center justify-center text-black shrink-0" style={{ width: 26, height: 26, fontSize: 11, background: "#22c55e" }}>➤</span>
        </div>
      </div>
    </div>
  );
}
