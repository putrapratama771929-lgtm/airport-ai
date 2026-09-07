"use client";

import { FormEvent, useMemo, useState } from "react";
import { MapPin, Coffee, Armchair, ShoppingBag, Clock, Bot, Send, Map, Compass, SearchX } from "lucide-react";
import { AIRPORT_CONFIG } from "@/lib/airport-config";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";

type FacilityCategory = "all" | "lounge" | "coffee" | "retail";

const FACILITIES = [
  {
    id: "concordia-lounge",
    category: "lounge" as const,
    name: "Concordia Executive Lounge",
    badge: "Premium",
    time: "3 min",
    location: `Lantai 2 · Dekat Gate 2 & 3 (${AIRPORT_CONFIG.code})`,
    zone: "L2 Gate 2–3",
    tags: ["WI-FI CEPAT", "WORK PODS", "BARISTA & PRASMANAN", "RUANG ISTIRAHAT"],
    description: "Lounge eksekutif dengan sofa nyaman, stasiun kerja privat, dan hidangan hangat lengkap.",
    gradient: "from-blue-600/30 to-cyan-500/20",
  },
  {
    id: "roasters-manado",
    category: "coffee" as const,
    name: "Excelso & Kopi Kenangan",
    badge: "Public",
    time: "5 min",
    location: "Lantai 2 · Area Ruang Tunggu Gate 1",
    zone: "L2 Gate 1",
    tags: ["FREE WI-FI", "POWER OUTLETS", "PASTRIES & SNACKS", "TAKEAWAY"],
    description: "Kopi segar dan camilan ringan dengan meja kerja luas dan colokan daya di setiap kursi.",
    gradient: "from-amber-600/30 to-orange-500/20",
  },
  {
    id: "oleh-oleh-manado",
    category: "retail" as const,
    name: "Klappertaart & Souvenir Minahasa",
    badge: "Retail",
    time: "2 min",
    location: "Lantai 1 & 2 · Area Komersial Keberangkatan",
    zone: "L1–L2 Komersial",
    tags: ["KLAPPERTAART ASLI", "CAKALANG FUFU", "SOUVENIR", "KEMASAN VAKUM"],
    description: "Pusat oleh-oleh khas Manado lengkap siap bawa ke kabin pesawat.",
    gradient: "from-purple-600/30 to-pink-500/20",
  },
];

const ZONES = [
  { id: "L1–L2 Komersial", label: "Komersial", x: "12%", y: "58%" },
  { id: "L2 Gate 1", label: "Gate 1", x: "42%", y: "28%" },
  { id: "L2 Gate 2–3", label: "Gate 2–3", x: "68%", y: "32%" },
];

function chipClass(active: boolean) {
  return cn(
    "whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium flex items-center gap-2 cursor-pointer transition-all",
    active ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50" : "glass-chip text-cyan-300"
  );
}

export function FacilityMap() {
  const [category, setCategory] = useState<FacilityCategory>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");

  const selected = FACILITIES.find((item) => item.id === selectedId) ?? null;

  const visible = useMemo(() => {
    return FACILITIES.filter((item) => {
      const byCat = category === "all" || item.category === category;
      const q = appliedQuery.trim().toLowerCase();
      const byQ = !q || item.name.toLowerCase().includes(q) || item.location.toLowerCase().includes(q) || item.tags.join(" ").toLowerCase().includes(q);
      return byCat && byQ;
    });
  }, [category, appliedQuery]);

  function handleSearch(event: FormEvent) {
    event.preventDefault();
    setAppliedQuery(query);
    setSelectedId(null);
  }

  return (
    <div className="flex-1 flex flex-col h-full relative">
      <div className="glass-header px-4 sm:px-8 py-3 flex items-center justify-between z-20">
        <div className="flex items-center gap-2">
          <Compass className="size-4 text-[#00d2ff]" />
          <span className="font-mono text-xs font-semibold text-cyan-300 uppercase tracking-wider">
            {AIRPORT_CONFIG.code} Facilities & terminal guide
          </span>
        </div>
        <span className="font-mono text-xs text-slate-400">Denah skema (bukan GIS)</span>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar px-4 sm:px-8 md:px-12 py-6 flex flex-col gap-6 max-w-[840px] mx-auto w-full pb-32">
        <div className="flex items-start gap-3.5 w-full">
          <div className="w-9 h-9 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center shrink-0 text-cyan-300">
            <Bot className="size-5" />
          </div>
          <div className="chat-bubble-bot p-4 sm:p-5 rounded-2xl rounded-tl-none max-w-[82%]">
            <p className="text-sm text-slate-200 leading-relaxed">
              Selamat datang di {AIRPORT_CONFIG.name}. Filter lounge, kopi, atau oleh-oleh, lalu buka denah skema untuk melihat zona.
            </p>
          </div>
        </div>

        <div className="flex overflow-x-auto gap-2.5 hide-scrollbar">
          <button type="button" className={chipClass(category === "all")} onClick={() => setCategory("all")}>
            Semua
          </button>
          <button type="button" className={chipClass(category === "coffee")} onClick={() => setCategory("coffee")}>
            <Coffee className="size-3.5 text-[#00d2ff]" />
            Kedai kopi
          </button>
          <button type="button" className={chipClass(category === "lounge")} onClick={() => setCategory("lounge")}>
            <Armchair className="size-3.5 text-[#00d2ff]" />
            Lounges
          </button>
          <button type="button" className={chipClass(category === "retail")} onClick={() => setCategory("retail")}>
            <ShoppingBag className="size-3.5 text-[#00d2ff]" />
            Oleh-oleh
          </button>
        </div>

        {selected && (
          <div className="glass-panel rounded-2xl p-4 border border-cyan-400/30">
            <div className="flex items-center justify-between gap-2 mb-3">
              <p className="text-sm font-semibold text-white">{selected.name}</p>
              <button type="button" className="text-xs text-slate-400 hover:text-white" onClick={() => setSelectedId(null)}>
                Tutup denah
              </button>
            </div>
            <div className="relative h-40 rounded-xl bg-slate-900/80 border border-white/10 overflow-hidden">
              <div className="absolute inset-3 rounded-lg border border-dashed border-white/15" />
              <p className="absolute left-4 top-3 text-[10px] font-mono text-slate-500">L1 kedatangan</p>
              <p className="absolute left-4 bottom-3 text-[10px] font-mono text-slate-500">L2 keberangkatan</p>
              {ZONES.map((zone) => {
                const active = zone.id === selected.zone;
                return (
                  <span
                    key={zone.id}
                    className={cn(
                      "absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-2 py-1 text-[10px] font-mono border",
                      active ? "bg-cyan-500/30 text-cyan-200 border-cyan-400/60" : "bg-white/10 text-slate-400 border-white/10"
                    )}
                    style={{ left: zone.x, top: zone.y }}
                  >
                    {zone.label}
                  </span>
                );
              })}
            </div>
            <p className="text-xs text-slate-400 mt-3 flex items-center gap-1.5">
              <MapPin className="size-3.5 text-[#00d2ff]" />
              {selected.location} · jalan kaki {selected.time}
            </p>
          </div>
        )}

        {visible.length === 0 ? (
          <EmptyState
            icon={SearchX}
            title="Tidak ada fasilitas yang cocok"
            description="Ubah filter atau kata kunci. Coba “lounge”, “kopi”, atau “klappertaart”."
            action={
              <button
                type="button"
                className="text-xs font-semibold text-cyan-300"
                onClick={() => {
                  setCategory("all");
                  setQuery("");
                  setAppliedQuery("");
                }}
              >
                Tampilkan semua
              </button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {visible.map((item) => (
              <article key={item.id} className="glass-panel glass-panel-hover rounded-2xl p-5 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className={`relative h-24 w-full rounded-xl overflow-hidden mb-4 bg-gradient-to-tr ${item.gradient} border border-white/10 flex items-center justify-center`}>
                    <span className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-black/60 text-[11px] font-mono text-cyan-300 flex items-center gap-1">
                      <Clock className="size-3" />
                      {item.time}
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-base font-bold text-white">{item.name}</h3>
                    <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full border border-white/10 text-slate-300">{item.badge}</span>
                  </div>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-1.5">
                    <MapPin className="size-3.5 text-[#00d2ff] shrink-0" />
                    {item.location}
                  </p>
                  <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">{item.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  className="mt-5 w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-cyan-500/20 border border-white/15 text-xs font-semibold text-cyan-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Map className="size-3.5" />
                  {selectedId === item.id ? "Denah terbuka" : "Lihat di denah"}
                </button>
              </article>
            ))}
          </div>
        )}
      </div>

      <div className="mobile-search-bar glass-header fixed bottom-[72px] lg:bottom-0 left-0 lg:left-[320px] right-0 p-4 z-30 bg-[#0A0F1C]/80 backdrop-blur-xl border-t border-white/10">
        <form className="max-w-[800px] mx-auto relative flex items-center" onSubmit={handleSearch}>
          <input
            aria-label="Cari fasilitas bandara"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari gate, lounge, toilet, atau tempat makan..."
            className="w-full glass-input rounded-full py-3.5 pl-5 pr-14 text-sm text-white focus:outline-none placeholder:text-slate-400"
          />
          <button
            type="submit"
            aria-label="Cari fasilitas"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 w-10 h-10 bg-gradient-to-r from-[#00d2ff] to-[#3a7bd5] text-[#0A0F1C] rounded-full flex items-center justify-center cursor-pointer"
          >
            <Send className="size-4.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
