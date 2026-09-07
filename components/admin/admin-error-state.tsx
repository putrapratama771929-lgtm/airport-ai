"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
  errorCode?: string;
}

export function AdminErrorState({
  title = "Gagal Memuat Data Admin",
  description = "Terjadi gangguan saat menghubungkan ke gateway AI concierge bandara. Silakan coba kembali.",
  onRetry,
  className,
  errorCode = "ERR_AIRPORT_SYNC_TIMEOUT",
}: AdminErrorStateProps) {
  return (
    <div
      className={cn(
        "glass-panel rounded-2xl border border-red-500/30 p-8 sm:p-12 text-center bg-red-950/10 shadow-[0_8px_32px_rgba(239,68,68,0.15)]",
        className
      )}
    >
      <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-red-500/15 text-red-400 border border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.25)]">
        <AlertTriangle className="size-6 text-red-400 animate-pulse" />
      </div>

      <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-red-400 font-bold">
        STATUS KONEKSI GAGAL · {errorCode}
      </p>

      <h3 className="font-display mt-2 text-lg sm:text-xl font-bold text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
        {description}
      </p>

      {onRetry && (
        <div className="mt-6">
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-400/40 px-5 py-2.5 text-sm font-semibold text-red-200 hover:bg-red-500/30 hover:border-red-400 transition-all shadow-[0_4px_16px_rgba(239,68,68,0.2)] active:scale-95 cursor-pointer"
          >
            <RefreshCw className="size-4" />
            Coba Lagi
          </button>
        </div>
      )}
    </div>
  );
}
