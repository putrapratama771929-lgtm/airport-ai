import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { Inbox } from "lucide-react";

type EmptyStateProps = {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
};

export function EmptyState({ icon: Icon = Inbox, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("glass-panel rounded-2xl border border-white/10 px-6 py-10 text-center", className)}>
      <span className="mx-auto grid size-12 place-items-center rounded-xl bg-cyan-500/15 text-[#00d2ff] border border-cyan-400/30">
        <Icon className="size-5" />
      </span>
      <h3 className="font-display mt-4 text-base font-bold text-white">{title}</h3>
      <p className="mt-2 text-sm text-slate-400 max-w-md mx-auto leading-relaxed">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
