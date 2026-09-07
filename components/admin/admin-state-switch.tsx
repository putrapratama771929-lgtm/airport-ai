"use client";

import { CheckCircle2, Loader2, Inbox, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export type AdminViewMode = "data" | "loading" | "empty" | "error";

interface AdminStateSwitchProps {
  currentMode: AdminViewMode;
  onModeChange: (mode: AdminViewMode) => void;
  className?: string;
}

export function AdminStateSwitch({
  currentMode,
  onModeChange,
  className,
}: AdminStateSwitchProps) {
  const modes: Array<{
    id: AdminViewMode;
    label: string;
    icon: React.ElementType;
  }> = [
    { id: "data", label: "Data Normal", icon: CheckCircle2 },
    { id: "loading", label: "Skeleton", icon: Loader2 },
    { id: "empty", label: "State Kosong", icon: Inbox },
    { id: "error", label: "State Error", icon: AlertCircle },
  ];

  return (
    <div
      className={cn(
        "glass-panel inline-flex items-center p-1 rounded-xl border border-white/10 text-xs",
        className
      )}
    >
      <span className="hidden sm:inline-block px-2.5 py-1 text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider">
        Mode Demo:
      </span>
      <div className="flex items-center gap-1">
        {modes.map((m) => {
          const Icon = m.icon;
          const isActive = currentMode === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onModeChange(m.id)}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer text-xs",
                isActive
                  ? m.id === "error"
                    ? "bg-red-500/20 text-red-300 border border-red-400/40 shadow-[0_0_10px_rgba(239,68,68,0.2)] font-semibold"
                    : m.id === "loading"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-400/40 font-semibold"
                    : m.id === "empty"
                    ? "bg-purple-500/20 text-purple-300 border border-purple-400/40 font-semibold"
                    : "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_10px_rgba(0,210,255,0.2)] font-semibold"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <Icon
                className={cn(
                  "size-3.5",
                  isActive && m.id === "loading" && "animate-spin"
                )}
              />
              <span>{m.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
