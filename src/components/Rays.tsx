"use client";

export default function Rays() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* ============ TOP-LEFT SOURCE ============ */}

      {/* Left glow point */}
      <div
        className="absolute top-[-20px] left-[-20px] w-[120px] h-[120px] opacity-[0.5]"
        style={{
          background:
            "radial-gradient(circle, rgba(34,197,94,0.9) 0%, rgba(34,197,94,0.2) 40%, transparent 70%)",
          filter: "blur(15px)",
        }}
      />

      {/* L-Ray 1 */}
      <div
        className="absolute top-0 left-0 w-8 h-[500px] rounded-full opacity-[0.2]"
        style={{
          transformOrigin: "top left",
          transform: "rotate(22deg)",
          background: "linear-gradient(180deg, rgba(34,197,94,0.8) 0%, rgba(34,197,94,0.1) 50%, transparent 100%)",
          filter: "blur(3px)",
        }}
      />

      {/* L-Ray 2 */}
      <div
        className="absolute top-0 left-0 w-7 h-[580px] rounded-full opacity-[0.22]"
        style={{
          transformOrigin: "top left",
          transform: "rotate(38deg)",
          background: "linear-gradient(180deg, rgba(34,197,94,0.85) 0%, rgba(34,197,94,0.08) 45%, transparent 100%)",
          filter: "blur(3px)",
        }}
      />

      {/* L-Ray 3 */}
      <div
        className="absolute top-0 left-0 w-6 h-[450px] rounded-full opacity-[0.17]"
        style={{
          transformOrigin: "top left",
          transform: "rotate(52deg)",
          background: "linear-gradient(180deg, rgba(34,197,94,0.75) 0%, rgba(16,185,129,0.08) 40%, transparent 100%)",
          filter: "blur(2px)",
        }}
      />

      {/* L-Ray 4 */}
      <div
        className="absolute top-0 left-0 w-5 h-[380px] rounded-full opacity-[0.12]"
        style={{
          transformOrigin: "top left",
          transform: "rotate(68deg)",
          background: "linear-gradient(180deg, rgba(34,197,94,0.65) 0%, transparent 45%)",
          filter: "blur(2px)",
        }}
      />

      {/* ============ TOP-RIGHT SOURCE ============ */}

      {/* Right glow point */}
      <div
        className="absolute top-[-20px] right-[-20px] w-[120px] h-[120px] opacity-[0.5]"
        style={{
          background:
            "radial-gradient(circle, rgba(34,197,94,0.9) 0%, rgba(34,197,94,0.2) 40%, transparent 70%)",
          filter: "blur(15px)",
        }}
      />

      {/* R-Ray 1 */}
      <div
        className="absolute top-0 right-0 w-8 h-[500px] rounded-full opacity-[0.2]"
        style={{
          transformOrigin: "top right",
          transform: "rotate(-22deg)",
          background: "linear-gradient(180deg, rgba(34,197,94,0.8) 0%, rgba(34,197,94,0.1) 50%, transparent 100%)",
          filter: "blur(3px)",
        }}
      />

      {/* R-Ray 2 */}
      <div
        className="absolute top-0 right-0 w-7 h-[580px] rounded-full opacity-[0.22]"
        style={{
          transformOrigin: "top right",
          transform: "rotate(-38deg)",
          background: "linear-gradient(180deg, rgba(34,197,94,0.85) 0%, rgba(34,197,94,0.08) 45%, transparent 100%)",
          filter: "blur(3px)",
        }}
      />

      {/* R-Ray 3 */}
      <div
        className="absolute top-0 right-0 w-6 h-[450px] rounded-full opacity-[0.17]"
        style={{
          transformOrigin: "top right",
          transform: "rotate(-52deg)",
          background: "linear-gradient(180deg, rgba(34,197,94,0.75) 0%, rgba(16,185,129,0.08) 40%, transparent 100%)",
          filter: "blur(2px)",
        }}
      />

      {/* R-Ray 4 */}
      <div
        className="absolute top-0 right-0 w-5 h-[380px] rounded-full opacity-[0.12]"
        style={{
          transformOrigin: "top right",
          transform: "rotate(-68deg)",
          background: "linear-gradient(180deg, rgba(34,197,94,0.65) 0%, transparent 45%)",
          filter: "blur(2px)",
        }}
      />
    </div>
  );
}
