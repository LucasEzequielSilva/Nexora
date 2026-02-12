interface DotGridProps {
  className?: string;
  fade?: "top" | "bottom" | "both" | "radial" | "radial-top";
}

export default function DotGrid({ className = "", fade = "both" }: DotGridProps) {
  const maskMap: Record<string, string> = {
    top: "linear-gradient(to bottom, transparent 0%, white 40%, white 100%)",
    bottom: "linear-gradient(to bottom, white 0%, white 60%, transparent 100%)",
    both: "linear-gradient(to bottom, transparent 0%, white 25%, white 75%, transparent 100%)",
    radial: "radial-gradient(ellipse 60% 50% at 50% 50%, white 0%, transparent 100%)",
    "radial-top": "radial-gradient(ellipse 70% 60% at 50% 30%, white 0%, transparent 100%)",
  };

  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        WebkitMaskImage: maskMap[fade],
        maskImage: maskMap[fade],
      }}
    />
  );
}
