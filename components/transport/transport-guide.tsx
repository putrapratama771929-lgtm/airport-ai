"use client";

import { FormEvent, useMemo, useState } from "react";
import { Bus, Car, MapPin, Navigation, Bot, User, Send, Ticket, Map, Compass, SearchX } from "lucide-react";
import { AIRPORT_CONFIG, PARKING_RATES } from "@/lib/airport-config";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";

type InfoPanel = "none" | "damri" | "shelter" | "parking";

const OPTIONS = [
  {
    id: "shuttle-damri",
    title: "DAMRI Express Shuttle",
    icon: Bus,
    badge: "Tercepat",
    badgeColor: "bg-emerald-500 text-black",
    estTime: "25-30 menit",
    nextDept: "11:15 WITA",
    location: `Area Parkir Terminal ${AIRPORT_CONFIG.code} - Shelter Bus`,
    keywords: "damri bus shuttle kota pasar 45",
  },
  {
    id: "official-taxi",
    title: "Taksi Resmi Bandara (Kokapura)",
    icon: Car,
    badge: "Siaga Langsung",
    badgeColor: "bg-cyan-500 text-black",
    estTime: "35-45 menit",
    nextDept: "Tersedia langsung",
    location: "Lobby Kedatangan Lantai 1 · Pintu Keluar 3",
    keywords: "taksi kokapura bluebird argo",
  },
  {
    id: "rideshare-point",
    title: "Online Ride-Hailing (Grab / Gojek)",
    icon: Car,
    badge: "Populer",
    badgeColor: "bg-blue-500 text-white",
    estTime: "35-45 menit",
    nextDept: "Tunggu 5-8 menit",
    location: "Titik jemput khusus Parkir Timur",
    keywords: "grab gojek ojek online",
  },
  {
    id: "rental-car",
    title: "Rental Mobil & Travel Wisata",
    icon: Navigation,
    badge: "Fleksibel",
    badgeColor: "bg-amber-400 text-black",
    estTime: "Sesuai rute",
    nextDept: "Reservasi 24 jam",
    location: "Counter area komersial Lantai 1",
    keywords: "rental mobil travel bunaken",
  },
];

function chipClass(active: boolean) {
  return cn(
    "whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium flex items-center gap-2 cursor-pointer",
    active ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50" : "glass-chip text-cyan-300"
  );
}

export function TransportGuide() {
  const [panel, setPanel] = useState<InfoPanel>("none");
  const [query, setQuery] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");

  const options = useMemo(() => {
    const q = appliedQuery.trim().toLowerCase();
    if (!q) return OPTIONS;
    return OPTIONS.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.keywords.includes(q)
    );
  }, [appliedQuery]);

  function handleSearch(event: FormEvent) {
    event.preventDefault();
    setAppliedQuery(query);
    if (query.toLowerCase().includes("parkir")) setPanel("parking");
    if (query.toLowerCase().includes("damri") || query.toLowerCase().includes("tiket")) setPanel("damri");
    if (query.toLowerCase().includes("shelter") || query.toLowerCase().includes("rute")) setPanel("shelter");
  }

  function togglePanel(next: InfoPanel) {
    setPanel((current) => (current === next ? "none" : next));
  }

  return (
    <div className="flex-1 flex flex-col h-full relative">
      <div className="px-4 sm:px-8 pt-4 pb-2 max-w-[840px] mx-auto w-full">
        <div className="w-full h-32 rounded-2xl glass-panel relative overflow-hidden flex items-end p-4 border border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(0,210,255,0.15),transparent_70%)]" />
          <div className="relative z-10">
            <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <Compass className="size-5 text-[#00d2ff]" />
              {AIRPORT_CONFIG.name} Ground Transport Hub
            </h2>
            <p className="text-xs text-slate-300 font-mono mt-0.5">Rute transportasi Manado & sekitarnya ({AIRPORT_CONFIG.code})</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar px-4 sm:px-8 md:px-12 py-4 flex flex-col gap-5 max-w-[840px] mx-auto w-full pb-32">
        <div className="flex items-start justify-end gap-3.5 w-full">
          <div className="chat-bubble-user p-4 rounded-2xl rounded-tr-none text-white max-w-[78%]">
            <p className="text-sm font-medium">Bagaimana opsi transportasi tercepat dari bandara menuju pusat kota Manado?</p>
          </div>
          <div className="w-9 h-9 rounded-full glass-panel flex items-center justify-center shrink-0 text-slate-200">
            <User className="size-5" />
          </div>
        </div>

        <div className="flex items-start gap-3.5 w-full">
          <div className="w-9 h-9 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center shrink-0 text-cyan-300">
            <Bot className="size-5" />
          </div>
          <div className="w-full flex flex-col gap-4">
            <div className="chat-bubble-bot p-4 rounded-2xl rounded-tl-none">
              <p className="text-sm text-slate-200 leading-relaxed">
                Pusat kota Manado berjarak sekitar 13 km. Pilih moda di bawah, atau buka panel tiket DAMRI, rute shelter, dan tarif parkir.
              </p>
            </div>

            <div className="flex overflow-x-auto gap-2.5 hide-scrollbar">
              <button type="button" className={chipClass(panel === "damri")} onClick={() => togglePanel("damri")}>
                <Ticket className="size-3.5 text-[#00d2ff]" />
                Pesan tiket DAMRI
              </button>
              <button type="button" className={chipClass(panel === "shelter")} onClick={() => togglePanel("shelter")}>
                <Map className="size-3.5 text-[#00d2ff]" />
                Rute menuju shelter
              </button>
              <button type="button" className={chipClass(panel === "parking")} onClick={() => togglePanel("parking")}>
                <Car className="size-3.5 text-[#00d2ff]" />
                Tarif parkir inap
              </button>
            </div>

            {panel === "damri" && (
              <div className="glass-panel rounded-2xl p-5 border border-cyan-400/30">
                <h3 className="font-display font-bold text-white">Tiket DAMRI (bukan pemesanan online)</h3>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  Tiket dibeli tunai di shelter bus area parkir terminal. Rute Bandara → Pasar 45 / Boulevard sekitar Rp 25.000. Operasi sekitar 06:00–20:00 WITA.
                </p>
                <p className="text-xs text-slate-400 mt-3">Aplikasi ini tidak menjual tiket. Ini panduan lokasi pembelian.</p>
              </div>
            )}

            {panel === "shelter" && (
              <div className="glass-panel rounded-2xl p-5 border border-cyan-400/30">
                <h3 className="font-display font-bold text-white">Menuju shelter bus</h3>
                <ol className="mt-3 space-y-2 text-sm text-slate-300 list-decimal pl-4">
                  <li>Keluar pintu kedatangan Lantai 1.</li>
                  <li>Belok kiri melewati konter taksi resmi.</li>
                  <li>Ikuti papan “Bus DAMRI / Shelter” ke area parkir luar.</li>
                  <li>Antri di marka kuning di depan shelter beratap.</li>
                </ol>
              </div>
            )}

            {panel === "parking" && (
              <div className="glass-panel rounded-2xl p-5 border border-cyan-400/30">
                <h3 className="font-display font-bold text-white">Tarif parkir {AIRPORT_CONFIG.code} (contoh)</h3>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {PARKING_RATES.map((rate) => (
                    <div key={rate.type} className="rounded-xl bg-white/5 border border-white/10 p-4">
                      <p className="font-semibold text-white">{rate.type}</p>
                      <p className="text-xs text-slate-400 mt-2">{rate.hourly}</p>
                      <p className="text-sm text-cyan-300 mt-1">{rate.daily}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {options.length === 0 ? (
              <EmptyState
                icon={SearchX}
                title="Tidak ada moda yang cocok"
                description="Coba kata “DAMRI”, “taksi”, atau “Grab”."
                action={
                  <button type="button" className="text-xs font-semibold text-cyan-300" onClick={() => { setQuery(""); setAppliedQuery(""); }}>
                    Tampilkan semua
                  </button>
                }
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {options.map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <article key={opt.id} className="glass-panel rounded-2xl p-4 sm:p-5 border border-white/10">
                      <div className="flex justify-between items-start border-b border-white/10 pb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-300 border border-cyan-400/30">
                            <Icon className="size-4.5" />
                          </div>
                          <h4 className="font-display text-sm font-bold text-white">{opt.title}</h4>
                        </div>
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${opt.badgeColor}`}>{opt.badge}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                        <div>
                          <p className="font-mono text-[10px] uppercase text-slate-400">Estimasi</p>
                          <p className="font-semibold text-white mt-0.5">{opt.estTime}</p>
                        </div>
                        <div>
                          <p className="font-mono text-[10px] uppercase text-slate-400">Ketersediaan</p>
                          <p className="font-semibold text-cyan-300 mt-0.5">{opt.nextDept}</p>
                        </div>
                      </div>
                      <p className="mt-3 pt-2.5 border-t border-white/5 text-xs text-slate-300 flex items-start gap-1.5">
                        <MapPin className="size-3.5 text-[#00d2ff] shrink-0 mt-0.5" />
                        {opt.location}
                      </p>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mobile-search-bar glass-header fixed bottom-[72px] lg:bottom-0 left-0 lg:left-[320px] right-0 p-4 z-30 bg-[#0A0F1C]/80 backdrop-blur-xl border-t border-white/10">
        <form className="max-w-[800px] mx-auto relative flex items-center" onSubmit={handleSearch}>
          <input
            aria-label="Cari pilihan transportasi"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari DAMRI, taksi, Grab, parkir..."
            className="w-full glass-input rounded-full py-3.5 pl-5 pr-14 text-sm text-white focus:outline-none placeholder:text-slate-400"
          />
          <button
            type="submit"
            aria-label="Cari transportasi"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 w-10 h-10 bg-gradient-to-r from-[#00d2ff] to-[#3a7bd5] text-[#0A0F1C] rounded-full flex items-center justify-center cursor-pointer"
          >
            <Send className="size-4.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
