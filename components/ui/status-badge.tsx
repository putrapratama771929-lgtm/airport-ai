import { cn } from "@/lib/utils";

type Status = "Tepat waktu" | "On Time" | "Boarding" | "Tertunda" | "Delayed" | "Mendarat" | "Landed";

const styles: Record<string, { container: string; dot: string }> = {
  "Tepat waktu": {
    container: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.25)]",
    dot: "bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]",
  },
  "On Time": {
    container: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.25)]",
    dot: "bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]",
  },
  Boarding: {
    container: "bg-cyan-500/20 text-cyan-300 border-cyan-400/40 shadow-[0_0_12px_rgba(0,210,255,0.3)]",
    dot: "bg-cyan-400 shadow-[0_0_8px_rgba(0,210,255,0.8)] animate-pulse",
  },
  Tertunda: {
    container: "bg-amber-500/15 text-amber-400 border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.25)]",
    dot: "bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]",
  },
  Delayed: {
    container: "bg-amber-500/15 text-amber-400 border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.25)]",
    dot: "bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]",
  },
  Mendarat: {
    container: "bg-blue-500/15 text-blue-300 border-blue-500/30 shadow-[0_0_12px_rgba(59,130,246,0.25)]",
    dot: "bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.8)]",
  },
  Landed: {
    container: "bg-blue-500/15 text-blue-300 border-blue-500/30 shadow-[0_0_12px_rgba(59,130,246,0.25)]",
    dot: "bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.8)]",
  },
};

export function StatusBadge({ status }: { status: Status | string }) {
  const current = styles[status] || styles["Tepat waktu"];
  return (
    <span
      className={cn(
        "font-mono inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold tracking-wider backdrop-blur-md",
        current.container
      )}
    >
      <span className={cn("size-1.5 rounded-full", current.dot)} />
      {status}
    </span>
  );
}
