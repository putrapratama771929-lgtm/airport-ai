import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "cyan" | "glass" | "glass-dark" | "outline";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

const variants = {
  primary:
    "rounded-full bg-gradient-to-r from-[#00d2ff] via-[#38d4f6] to-[#3a7bd5] text-[#0A0F1C] font-bold shadow-[0_4px_20px_rgba(0,210,255,0.4)] hover:opacity-90 active:scale-[0.98] border border-cyan-300/40",
  secondary:
    "rounded-full bg-white/10 backdrop-blur-md text-white border border-white/15 shadow-[0_4px_16px_rgba(0,0,0,0.3)] hover:bg-white/20 hover:border-cyan-400/40 active:scale-[0.98]",
  cyan:
    "rounded-full bg-[#00d2ff]/20 text-[#00d2ff] border border-[#00d2ff]/40 shadow-[0_0_15px_rgba(0,210,255,0.2)] hover:bg-[#00d2ff]/30 active:scale-[0.98]",
  glass:
    "rounded-full bg-slate-800/40 backdrop-blur-xl text-white border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.3)] hover:bg-slate-800/60 hover:border-cyan-400/40 active:scale-[0.98]",
  "glass-dark":
    "rounded-full bg-[#0A0F1C]/70 backdrop-blur-xl text-white border border-white/15 shadow-[0_8px_24px_rgba(0,0,0,0.4)] hover:bg-[#0A0F1C]/90 active:scale-[0.98]",
  outline:
    "rounded-full bg-transparent border border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/10 active:scale-[0.98]",
  ghost:
    "rounded-lg text-slate-300 hover:bg-white/10 hover:text-white transition-colors",
};

export function Button({ href, children, className, variant = "primary", onClick, type }: ButtonProps) {
  const styles = cn(
    "inline-flex h-11 items-center justify-center px-5 text-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 cursor-pointer",
    variants[variant],
    className
  );
  return href ? (
    <Link href={href} className={styles}>
      {children}
    </Link>
  ) : (
    <button type={type} onClick={onClick} className={styles}>{children}</button>
  );
}
