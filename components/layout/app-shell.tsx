"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Plane,
  Building2,
  Luggage,
  Bus,
  HelpCircle,
  Bell,
  User,
  Settings,
  Globe,
  PlaneTakeoff,
  Search,
  Home,
  MessageSquare,
  X,
} from "lucide-react";
import { AIRPORT_CONFIG } from "@/lib/airport-config";
import { activePanelForPath } from "@/lib/navigation-state";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: React.ReactNode;
}

type PanelId = "none" | "notify" | "profile" | "lang";

const navItems = [
  { label: "Beranda", href: "/", icon: Home },
  { label: "Chat", href: "/chat", icon: MessageSquare },
  { label: "Flights", href: "/flights", icon: PlaneTakeoff },
  { label: "Facilities", href: "/facilities", icon: Building2 },
  { label: "Baggage", href: "/baggage", icon: Luggage },
  { label: "Transport", href: "/transport", icon: Bus },
  { label: "Help & FAQ", href: "/faq", icon: HelpCircle },
];

const mobileNavItems = navItems.filter((item) => item.href !== "/");

function isNavActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [panelState, setPanelState] = useState<{ id: PanelId; pathname: string }>({ id: "none", pathname });
  const [isScrolled, setIsScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const openPanel = activePanelForPath(panelState, pathname);

  function closePanel() {
    setPanelState({ id: "none", pathname });
  }

  function togglePanel(panelId: Exclude<PanelId, "none">) {
    setPanelState({ id: openPanel === panelId ? "none" : panelId, pathname });
  }

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!panelRef.current?.contains(event.target as Node)) {
        setPanelState({ id: "none", pathname });
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [pathname]);

  useEffect(() => {
    function updateScrolled(target?: EventTarget | null) {
      const scrollTop = target instanceof HTMLElement ? target.scrollTop : window.scrollY;
      setIsScrolled(scrollTop > 12);
    }

    function handleWindowScroll() {
      updateScrolled();
    }

    function handleNestedScroll(event: Event) {
      updateScrolled(event.target);
    }

    updateScrolled();
    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    document.addEventListener("scroll", handleNestedScroll, { capture: true, passive: true });
    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
      document.removeEventListener("scroll", handleNestedScroll, true);
    };
  }, []);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    router.push(`/flights?q=${encodeURIComponent(q)}`);
    setSearchQuery("");
  }

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white flex flex-col font-sans relative overflow-x-hidden selection:bg-cyan-500/30 selection:text-white">
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-cyan-600/15 blur-[120px] animate-float-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-blue-600/15 blur-[150px] animate-float-reverse" />
        <div className="absolute top-[30%] left-[50%] w-[40vw] h-[40vw] rounded-full bg-violet-600/10 blur-[100px] animate-liquid-pulse" />
      </div>

      <header
        className={cn(
          "glass-header public-topbar fixed z-50 flex h-16 items-center justify-between px-4 md:px-8",
          isScrolled
            ? "public-topbar--floating top-3 left-3 right-3 md:top-4 md:left-6 md:right-6"
            : "public-topbar--docked top-0 left-0 right-0"
        )}
      >
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-display text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00d2ff] via-[#38d4f6] to-[#3a7bd5] drop-shadow-[0_0_12px_rgba(0,210,255,0.4)]">
              {AIRPORT_CONFIG.brandName}
            </span>
          </Link>
        </div>

        <nav className="hidden xl:flex gap-1 items-center h-full">
          {navItems.map((item) => {
            const isActive = isNavActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "h-full flex items-center px-3 font-medium text-sm transition-all relative",
                  isActive
                    ? "text-[#00d2ff] font-semibold border-b-2 border-[#00d2ff] shadow-[0_4px_12px_rgba(0,210,255,0.2)]"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3" ref={panelRef}>
          <form
            onSubmit={handleSearch}
            className="hidden lg:flex items-center glass-input px-3.5 py-1.5 rounded-full border border-white/10 text-xs text-slate-300"
          >
            <Search className="size-3.5 text-cyan-400 mr-2" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Cari penerbangan ${AIRPORT_CONFIG.code}...`}
              className="bg-transparent border-none outline-none text-xs text-white placeholder:text-slate-400 w-36"
              aria-label="Cari penerbangan"
            />
          </form>

          <button
            type="button"
            aria-expanded={openPanel === "notify"}
            aria-label="Notifikasi"
            onClick={() => togglePanel("notify")}
            className="text-slate-300 hover:text-white hover:bg-white/10 transition-colors p-2 rounded-full cursor-pointer"
          >
            <Bell className="size-5" />
          </button>
          <button
            type="button"
            aria-expanded={openPanel === "profile"}
            aria-label="Profil akun"
            onClick={() => togglePanel("profile")}
            className="text-slate-300 hover:text-white hover:bg-white/10 transition-colors p-2 rounded-full cursor-pointer"
          >
            <User className="size-5" />
          </button>

          {openPanel === "notify" && (
            <div className={cn("absolute right-4 w-72 glass-panel rounded-2xl p-4 border border-white/10 z-50", isScrolled ? "top-[4.75rem]" : "top-[4.25rem]")}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-mono uppercase tracking-wider text-slate-400">Notifikasi</p>
                <button type="button" aria-label="Tutup" onClick={closePanel} className="text-slate-400 hover:text-white">
                  <X className="size-4" />
                </button>
              </div>
              <p className="text-sm text-slate-300">Belum ada pengumuman terminal saat ini.</p>
              <p className="text-xs text-slate-500 mt-2">Notifikasi live akan tampil setelah sistem bandara terhubung.</p>
            </div>
          )}

          {openPanel === "profile" && (
            <div className={cn("absolute right-4 w-72 glass-panel rounded-2xl p-4 border border-white/10 z-50", isScrolled ? "top-[4.75rem]" : "top-[4.25rem]")}>
              <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Akun penumpang</p>
              <p className="text-sm text-white font-medium">Mode tamu</p>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Login tidak diperlukan untuk informasi bandara. Akun pribadi akan tersedia pada rilis berikutnya.
              </p>
            </div>
          )}

          {openPanel === "lang" && (
            <div className={cn("absolute right-4 w-72 glass-panel rounded-2xl p-4 border border-white/10 z-50", isScrolled ? "top-[4.75rem]" : "top-[4.25rem]")}>
              <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Bahasa</p>
              <p className="text-sm text-cyan-300 font-medium">Bahasa Indonesia (aktif)</p>
              <p className="text-xs text-slate-400 mt-1">English dan bahasa lain belum tersedia.</p>
            </div>
          )}
        </div>
      </header>

      <div className="flex-1 flex mt-16 pb-[80px] lg:pb-0 relative z-10">
        <aside className="hidden lg:flex flex-col glass-sidebar fixed left-0 top-16 h-[calc(100vh-64px)] w-[320px] pt-7 pb-6 px-4 z-40">
          <div className="mb-6 px-4">
            <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
              <span className="text-[#00d2ff]">✦</span> Asisten Bandara
            </h2>
            <p className="text-xs text-cyan-400 font-mono mt-1">{AIRPORT_CONFIG.name}</p>
            <p className="text-xs text-slate-400 mt-0.5">Terminal {AIRPORT_CONFIG.code} · Gates 1–4</p>
          </div>

          <Link
            href="/flights"
            className="mx-2 mb-6 bg-gradient-to-r from-[#00d2ff]/20 to-[#3a7bd5]/20 border border-cyan-400/30 text-cyan-300 font-semibold text-sm py-3 px-5 rounded-full flex items-center justify-center gap-2.5 shadow-[0_4px_16px_rgba(0,210,255,0.15)] hover:bg-cyan-500/30 hover:border-cyan-400 transition-all backdrop-blur-md cursor-pointer"
          >
            <Plane className="size-4 -rotate-45 text-[#00d2ff]" />
            Lacak Penerbangan
          </Link>

          <nav className="flex-1 flex flex-col gap-1.5 px-2 overflow-y-auto custom-scrollbar">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = isNavActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-full text-sm font-medium transition-all",
                    isActive
                      ? "bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 shadow-[0_0_15px_rgba(0,210,255,0.2)] scale-[0.98]"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <Icon className={cn("size-4.5", isActive ? "text-[#00d2ff]" : "text-slate-400")} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto border-t border-white/10 pt-4 px-2 flex flex-col gap-1 text-xs text-slate-400">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-3 px-4 py-2 rounded-full hover:bg-white/10 hover:text-white transition-all"
            >
              <Settings className="size-4" />
              <span>Admin Portal</span>
            </Link>
            <button
              type="button"
              onClick={() => togglePanel("lang")}
              className="flex items-center gap-3 px-4 py-2 rounded-full hover:bg-white/10 hover:text-white transition-all text-left"
            >
              <Globe className="size-4" />
              <span>Bahasa Indonesia (ID)</span>
            </button>
          </div>
        </aside>

        <main className="flex-1 lg:ml-[320px] min-h-[calc(100vh-64px)] flex flex-col relative">{children}</main>
      </div>

      <nav aria-label="Navigasi utama" className="mobile-bottom-nav lg:hidden glass-header fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-1 py-2 border-t border-white/10 rounded-t-2xl shadow-[0_-8px_32px_rgba(0,0,0,0.5)]">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = isNavActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center p-1.5 rounded-xl text-[10px] transition-all flex-1 min-w-0",
                isActive
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 scale-95 shadow-[0_0_12px_rgba(0,210,255,0.2)]"
                  : "text-slate-400 hover:text-white"
              )}
            >
              <Icon className="size-4.5 mb-1" />
              <span className="truncate max-w-[52px]">{item.label.split(" ")[0]}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
