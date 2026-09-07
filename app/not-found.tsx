import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { AIRPORT_CONFIG } from "@/lib/airport-config";

export default function NotFound() {
  return (
    <AppShell>
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="glass-panel max-w-lg w-full rounded-3xl border border-white/10 p-8 text-center">
          <p className="font-mono text-xs font-bold tracking-widest text-[#00d2ff] uppercase">404 · {AIRPORT_CONFIG.code}</p>
          <h1 className="font-display mt-3 text-2xl font-extrabold text-white">Halaman tidak ditemukan</h1>
          <p className="mt-2 text-sm text-slate-400">
            Tautan ini tidak tersedia di asisten {AIRPORT_CONFIG.shortName}. Kembali ke beranda atau tanyakan lewat chat.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button href="/" variant="primary">
              Ke beranda
            </Button>
            <Link href="/chat" className="inline-flex h-11 items-center justify-center px-5 text-sm font-semibold rounded-full border border-white/15 text-white hover:bg-white/10">
              Buka chat
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
