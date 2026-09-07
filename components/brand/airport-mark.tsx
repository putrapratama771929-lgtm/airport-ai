import { Plane } from "lucide-react";

export function AirportMark() {
  return (
    <span className="relative grid size-10 place-items-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 text-white shadow-[0_0_15px_rgba(0,210,255,0.3)] border border-cyan-400/40 overflow-hidden backdrop-blur-md">
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
      <Plane className="relative size-4.5 -rotate-45 text-[#00d2ff] drop-shadow-[0_0_6px_rgba(0,210,255,0.6)]" strokeWidth={2.5} />
    </span>
  );
}
