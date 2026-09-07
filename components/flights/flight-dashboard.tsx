"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Bot, MapPin, PlaneLanding, PlaneTakeoff, SearchX, Send, Sparkles, User, Utensils } from "lucide-react";
import { FlightCard } from "@/components/flights/flight-card";
import { EmptyState } from "@/components/ui/empty-state";
import { AIRPORT_CONFIG, FLIGHTS } from "@/lib/airport-config";

type FilterTab = "departures" | "arrivals";

function matchesQuery(values: string[], query: string) {
  const normalizedQuery = query.toLocaleLowerCase("id-ID");
  return values.some((value) => value.toLocaleLowerCase("id-ID").includes(normalizedQuery));
}

export function FlightDashboard() {
  const searchParams = useSearchParams();
  const initialSearchQuery = searchParams.get("q") ?? "";
  return <FlightDashboardContent key={initialSearchQuery} initialSearchQuery={initialSearchQuery} />;
}

function FlightDashboardContent({ initialSearchQuery }: { initialSearchQuery: string }) {
  const [activeTab, setActiveTab] = useState<FilterTab>("departures");
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const kind = activeTab === "departures" ? "departure" : "arrival";
  const rows = useMemo(() => FLIGHTS.filter((flight) => flight.kind === kind && matchesQuery([flight.route, flight.code, flight.location], searchQuery)), [kind, searchQuery]);

  return (
    <div className="flex flex-1 flex-col relative h-full">
      <div className="glass-header z-20 flex shrink-0 items-center gap-3 overflow-x-auto px-4 py-3.5 sm:px-8 hide-scrollbar">
        <TabButton active={activeTab === "departures"} onClick={() => setActiveTab("departures")} icon={<PlaneTakeoff className="size-4" />}>Departures</TabButton>
        <TabButton active={activeTab === "arrivals"} onClick={() => setActiveTab("arrivals")} icon={<PlaneLanding className="size-4" />}>Arrivals</TabButton>
        <Link href="/facilities" className="glass-panel flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-slate-300 transition-all hover:text-white hover:border-cyan-400/30 sm:text-sm"><MapPin className="size-4" /> Cari gate</Link>
        <Link href="/facilities" className="glass-panel flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-slate-300 transition-all hover:text-white hover:border-cyan-400/30 sm:text-sm"><Utensils className="size-4" /> Kuliner terdekat</Link>
      </div>

      <div className="custom-scrollbar mx-auto flex w-full max-w-[840px] flex-1 flex-col gap-6 overflow-y-auto px-4 py-6 pb-32 sm:px-8 md:px-12">
        <Bubble icon={<Bot className="size-5" />}><p>Halo! Saya asisten digital {AIRPORT_CONFIG.name} ({AIRPORT_CONFIG.code}). Periksa keberangkatan, kedatangan, atau cari nomor penerbangan di bawah.</p></Bubble>
        <div className="flex w-full items-start justify-end gap-3.5"><div className="chat-bubble-user max-w-[75%] rounded-2xl rounded-tr-none p-4 text-white shadow-lg"><p className="text-sm font-medium">Tampilkan jadwal {activeTab === "departures" ? "keberangkatan" : "kedatangan"} hari ini.</p></div><div className="glass-panel flex size-9 shrink-0 items-center justify-center rounded-full text-slate-200"><User className="size-5" /></div></div>
        <div className="mt-2 flex w-full items-start gap-3.5">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-500/20 text-cyan-300"><Sparkles className="size-5" /></div>
          <div className="flex w-full flex-col gap-4">
            <div className="flex items-center justify-between"><span className="font-mono text-xs font-semibold uppercase tracking-wider text-cyan-300">{activeTab === "departures" ? "JADWAL KEBERANGKATAN" : "JADWAL KEDATANGAN"} · {AIRPORT_CONFIG.code}</span><span className="text-xs text-slate-400">Data demo · bukan jadwal real-time</span></div>
            {rows.length === 0 ? <EmptyState icon={SearchX} title="Tidak ada penerbangan yang cocok" description={`Tidak ditemukan hasil untuk “${searchQuery}”. Coba kode penerbangan, kota, atau kosongkan pencarian.`} action={<button type="button" onClick={() => setSearchQuery("")} className="text-xs font-semibold text-cyan-300 hover:text-white">Hapus pencarian</button>} /> : rows.map((flight) => <FlightCard key={flight.code} flight={flight} />)}
          </div>
        </div>
      </div>

      <div className="mobile-search-bar glass-header fixed right-0 bottom-[72px] left-0 z-30 border-t border-white/10 bg-[#0A0F1C]/80 p-4 backdrop-blur-xl lg:left-[320px] lg:bottom-0">
        <form className="relative mx-auto flex max-w-[800px] items-center" onSubmit={(event) => event.preventDefault()}><input aria-label="Cari penerbangan berdasarkan nomor atau kota tujuan" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Ketik nomor penerbangan (cth: GA 607) atau kota tujuan..." className="glass-input w-full rounded-full py-3.5 pr-14 pl-5 text-sm text-white outline-none placeholder:text-slate-400" /><button type="submit" aria-label="Cari penerbangan" className="absolute top-1/2 right-1.5 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-r from-[#00d2ff] to-[#3a7bd5] text-[#0A0F1C]"><Send className="size-4.5" /></button></form>
        <p className="mx-auto mt-2 max-w-[800px] text-center font-mono text-[11px] text-slate-400" aria-live="polite">Menampilkan {rows.length} hasil {activeTab === "departures" ? "keberangkatan" : "kedatangan"} dari data demo.</p>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, children }: { active: boolean; onClick: () => void; icon: React.ReactNode; children: React.ReactNode }) {
  return <button type="button" onClick={onClick} className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all cursor-pointer sm:text-sm ${active ? "border border-cyan-400/50 bg-cyan-500/20 text-[#00d2ff]" : "glass-panel text-slate-300 hover:text-white hover:border-cyan-400/30"}`}>{icon}{children}</button>;
}

function Bubble({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return <div className="flex w-full items-start gap-3.5"><div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-500/20 text-cyan-300">{icon}</div><div className="chat-bubble-bot max-w-[80%] rounded-2xl rounded-tl-none p-4 text-sm leading-relaxed text-slate-200 sm:p-5">{children}</div></div>;
}
