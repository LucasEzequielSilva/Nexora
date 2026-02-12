"use client";

export default function Rays() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Central vertical ray */}
      <div
        className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[120%] opacity-[0.07]"
        style={{
          background:
            "linear-gradient(180deg, rgba(34,197,94,0.6) 0%, rgba(34,197,94,0) 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Left diagonal ray */}
      <div
        className="absolute top-[-10%] left-[15%] w-[300px] h-[100%] opacity-[0.05] rotate-[15deg]"
        style={{
          background:
            "linear-gradient(180deg, rgba(106,127,161,0.8) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />

      {/* Right diagonal ray */}
      <div
        className="absolute top-[-10%] right-[10%] w-[250px] h-[100%] opacity-[0.05] -rotate-[20deg]"
        style={{
          background:
            "linear-gradient(180deg, rgba(106,127,161,0.7) 0%, transparent 50%)",
          filter: "blur(50px)",
        }}
      />

      {/* Wide soft glow at top */}
      <div
        className="absolute top-[-5%] left-1/2 -translate-x-1/2 w-[1200px] h-[600px] opacity-[0.04]"
        style={{
          background:
            "radial-gradient(ellipse at center top, rgba(34,197,94,0.5) 0%, transparent 70%)",
        }}
      />

      {/* Subtle side accent left */}
      <div
        className="absolute top-[30%] left-[-5%] w-[400px] h-[600px] opacity-[0.03] rotate-[25deg]"
        style={{
          background:
            "linear-gradient(180deg, rgba(16,185,129,0.6) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      {/* Subtle side accent right */}
      <div
        className="absolute top-[50%] right-[-5%] w-[350px] h-[500px] opacity-[0.03] -rotate-[15deg]"
        style={{
          background:
            "linear-gradient(180deg, rgba(16,185,129,0.5) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />
    </div>
  );
}
