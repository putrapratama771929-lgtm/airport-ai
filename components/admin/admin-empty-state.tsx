"use client";

import type { LucideIcon } from "lucide-react";
import { Inbox, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminEmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  actionNode?: React.ReactNode;
  className?: string;
}

export function AdminEmptyState({
  icon: Icon = Inbox,
  title,
  description,
  actionText,
  onAction,
  actionNode,
  className,
}: AdminEmptyStateProps) {
  return (
    <div
      className={cn(
        "glass-panel rounded-2xl border border-white/10 p-8 sm:p-12 text-center shadow-xl",
        className
      )}
    >
      <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-cyan-500/10 text-cyan-300 border border-cyan-400/20 shadow-[0_0_20px_rgba(0,210,255,0.15)]">
        <Icon className="size-6 text-[#00d2ff]" />
      </div>

      <h3 className="font-display mt-4 text-lg font-bold text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
        {description}
      </p>

      {actionNode ? (
        <div className="mt-6">{actionNode}</div>
      ) : actionText && onAction ? (
        <div className="mt-6">
          <button
            type="button"
            onClick={onAction}
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-500/20 border border-cyan-400/30 px-5 py-2.5 text-sm font-semibold text-cyan-300 hover:bg-cyan-500/30 hover:border-cyan-400 transition-all shadow-[0_0_15px_rgba(0,210,255,0.2)] active:scale-95 cursor-pointer"
          >
            <RotateCcw className="size-4" />
            {actionText}
          </button>
        </div>
      ) : null}
    </div>
  );
}
