"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  Database,
  ArrowLeft,
  Menu,
  X,
  ShieldCheck,
  Cpu,
} from "lucide-react";
import { AIRPORT_CONFIG } from "@/lib/airport-config";
import { cn } from "@/lib/utils";

interface AdminShellProps {
  children: React.ReactNode;
}

const adminNavItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
    description: "Metrik & aktivitas concierge",
  },
  {
    label: "Percakapan",
    href: "/admin/conversations",
    icon: MessageSquare,
    description: "Log interaksi & transkrip AI",
  },
  {
    label: "Knowledge Base",
    href: "/admin/knowledge",
    icon: Database,
    description: "Aturan, FAQ & basis data",
  },
];

export function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getPageTitle = () => {
    if (pathname.includes("/admin/conversations")) return "Percakapan Penumpang";
    if (pathname.includes("/admin/knowledge")) return "Knowledge Base";
    return "Dashboard Analitik";
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white flex flex-col md:flex-row relative selection:bg-cyan-500/30 selection:text-white">
      {/* Background glow effects */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-cyan-600/10 blur-[130px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-600/10 blur-[150px]" />
      </div>

      {/* Mobile Topbar */}
      <header className="md:hidden glass-header sticky top-0 left-0 w-full z-40 flex items-center justify-between px-4 h-16 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <span className="text-[#00d2ff] font-bold text-lg">✦</span>
          <div>
            <p className="font-display text-sm font-bold leading-none text-white">
              {AIRPORT_CONFIG.brandName}
            </p>
            <p className="text-[10px] font-mono text-cyan-400 mt-0.5">
              ADMIN · {AIRPORT_CONFIG.code}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
          className="p-2 rounded-xl glass-panel text-slate-300 hover:text-white border border-white/10"
        >
          {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md md:hidden flex flex-col"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="w-4/5 max-w-xs h-full bg-[#0E1626] border-r border-white/15 p-6 flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <p className="font-display font-bold text-white text-base">
                  {AIRPORT_CONFIG.brandName}
                </p>
                <p className="text-xs font-mono text-cyan-400">
                  PORTAL ADMIN · {AIRPORT_CONFIG.code}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="size-5" />
              </button>
            </div>

            <nav className="mt-6 flex flex-col gap-2 flex-1">
              {adminNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                      isActive
                        ? "bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-400/40 shadow-[0_0_15px_rgba(0,210,255,0.2)]"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <Icon className={cn("size-4.5", isActive ? "text-[#00d2ff]" : "text-slate-400")} />
                    <div>
                      <p>{item.label}</p>
                      <p className="text-[10px] text-slate-400 font-normal">{item.description}</p>
                    </div>
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-white/10">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-xs text-slate-300 hover:text-white hover:bg-white/5 transition"
              >
                <ArrowLeft className="size-4 text-cyan-400" />
                Kembali ke Aplikasi Penumpang
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Glass Sidebar */}
      <aside className="fixed inset-y-0 hidden w-64 glass-sidebar p-6 text-slate-300 md:flex flex-col z-30 border-r border-white/10 shadow-2xl">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-display font-bold text-white hover:text-cyan-300 transition group"
        >
          <span className="text-[#00d2ff] group-hover:scale-110 transition-transform">✦</span>
          <span>{AIRPORT_CONFIG.brandName}</span>
        </Link>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-xs text-cyan-400 font-mono font-semibold tracking-wider">
            ADMIN PORTAL · {AIRPORT_CONFIG.code}
          </span>
          <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)] animate-pulse" />
        </div>

        <nav className="mt-8 flex flex-col gap-1.5 text-sm flex-1">
          {adminNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3.5 py-3 transition-all",
                  isActive
                    ? "bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-400/40 shadow-[0_0_15px_rgba(0,210,255,0.2)] backdrop-blur-md"
                    : "text-slate-300 hover:bg-white/5 hover:text-white border border-transparent"
                )}
              >
                <Icon className={cn("size-4.5", isActive ? "text-[#00d2ff]" : "text-slate-400")} />
                <div className="flex-1 min-w-0">
                  <p className="truncate">{item.label}</p>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/10 mb-4">
          <div className="flex items-center gap-2 text-[11px] text-slate-300 font-medium">
            <Cpu className="size-3.5 text-[#00d2ff]" />
            <span>AI Concierge Gateway</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 font-mono">
            <span>Terminal MDC</span>
            <span className="text-emerald-400">99.9% Uptime</span>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-cyan-300 transition font-medium"
          >
            <ArrowLeft className="size-3.5" />
            Kembali ke Aplikasi Penumpang
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 relative z-10 flex flex-col min-h-screen">
        {/* Top Breadcrumb & Status Bar */}
        <div className="glass-header px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="size-4 text-cyan-400" />
            <span className="font-mono uppercase tracking-wider text-slate-400">Admin Portal</span>
            <span>/</span>
            <span className="text-white font-medium">{getPageTitle()}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono font-semibold backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              Sistem Operasional · Latensi 18ms
            </span>
          </div>
        </div>

        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
