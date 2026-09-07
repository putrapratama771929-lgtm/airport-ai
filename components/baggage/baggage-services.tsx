"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  Luggage,
  Search,
  AlertCircle,
  ShieldCheck,
  Bot,
  Send,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  SearchX,
} from "lucide-react";
import { AIRPORT_CONFIG, BAGGAGE_ALLOWANCES, BAGGAGE_CAROUSELS } from "@/lib/airport-config";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";

type BaggageView = "track" | "report" | "carousel" | "allowances";

const SAMPLE_TAGS: Record<string, { flight: string; carousel: string; status: string }> = {
  "GA 491029": { flight: "GA 606 · Jakarta", carousel: "Carousel 1", status: "Sudah di belt, silakan ambil" },
  "JT 220441": { flight: "JT 774 · Makassar", carousel: "Carousel 2", status: "Dalam pembongkaran kontainer" },
};

function chipClass(active: boolean) {
  return cn(
    "shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-medium flex items-center gap-2 transition-all cursor-pointer",
    active
      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_12px_rgba(0,210,255,0.25)]"
      : "glass-chip text-cyan-300"
  );
}

export function BaggageServices() {
  const [view, setView] = useState<BaggageView>("report");
  const [activeReportStep, setActiveReportStep] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [tagQuery, setTagQuery] = useState("");
  const [lookupTag, setLookupTag] = useState("");
  const [form, setForm] = useState({ tag: "", flight: "", color: "", contact: "" });

  const lookup = useMemo(() => {
    const key = lookupTag.trim().toUpperCase();
    if (!key) return null;
    return SAMPLE_TAGS[key] ?? undefined;
  }, [lookupTag]);

  function handleTrackSubmit(event: FormEvent) {
    event.preventDefault();
    setView("track");
    setLookupTag(tagQuery);
  }

  function handleReportSubmit(event: FormEvent) {
    event.preventDefault();
    if (!form.tag.trim() || !form.flight.trim()) return;
    setSubmittedRef(`MDC-PIR-${Date.now().toString().slice(-6)}`);
    setFormOpen(false);
  }

  return (
    <div className="flex-1 flex flex-col h-full relative">
      <div className="text-center pt-5 pb-3 px-4 shrink-0">
        <h1 className="font-display text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00d2ff] to-[#3a7bd5]">
          Baggage Concierge
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md mx-auto">
          Layanan pelacakan bagasi, klaim barang tertinggal, dan informasi carousel {AIRPORT_CONFIG.name}.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar px-4 sm:px-8 md:px-12 py-4 flex flex-col gap-6 max-w-[840px] mx-auto w-full pb-32">
        <div className="flex overflow-x-auto gap-3 pb-2 hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          <button type="button" className={chipClass(view === "track")} onClick={() => setView("track")}>
            <Search className="size-4 text-[#00d2ff]" />
            Track Bag
          </button>
          <button type="button" className={chipClass(view === "report")} onClick={() => setView("report")}>
            <AlertCircle className="size-4 text-[#00d2ff]" />
            Report Lost Item
          </button>
          <button type="button" className={chipClass(view === "carousel")} onClick={() => setView("carousel")}>
            <Luggage className="size-4 text-[#00d2ff]" />
            Claim Carousel (MDC)
          </button>
          <button type="button" className={chipClass(view === "allowances")} onClick={() => setView("allowances")}>
            <ShieldCheck className="size-4 text-[#00d2ff]" />
            Size Allowances
          </button>
        </div>

        <div className="flex items-start gap-3.5 w-full">
          <div className="w-9 h-9 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center shrink-0 text-cyan-300">
            <Bot className="size-5" />
          </div>
          <div className="chat-bubble-bot p-4 sm:p-5 rounded-2xl rounded-tl-none max-w-[80%]">
            <p className="text-sm text-slate-200 leading-relaxed">
              Halo! Pilih menu di atas untuk lacak tag, buat laporan PIR, lihat carousel kedatangan, atau cek batas berat bagasi.
            </p>
          </div>
        </div>

        {view === "track" && (
          <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-white/10">
            <h2 className="font-display font-bold text-white">Lacak nomor tag</h2>
            <p className="text-xs text-slate-400 mt-1">Contoh yang ada di data demo: GA 491029 atau JT 220441.</p>
            {!lookupTag ? (
              <EmptyState
                className="mt-4"
                icon={Search}
                title="Belum ada pencarian"
                description="Masukkan nomor tag bagasi di kolom bawah, lalu kirim."
              />
            ) : lookup ? (
              <div className="mt-4 rounded-xl border border-cyan-400/30 bg-cyan-500/10 p-4">
                <p className="font-mono text-xs text-cyan-300">{lookupTag.toUpperCase()}</p>
                <p className="mt-2 text-sm text-white font-semibold">{lookup.flight}</p>
                <p className="text-sm text-slate-300 mt-1">{lookup.carousel} · {lookup.status}</p>
              </div>
            ) : (
              <EmptyState
                className="mt-4"
                icon={SearchX}
                title="Tag tidak ditemukan"
                description={`Tidak ada data demo untuk “${lookupTag}”. Coba GA 491029.`}
                action={
                  <button type="button" className="text-xs font-semibold text-cyan-300" onClick={() => { setLookupTag(""); setTagQuery(""); }}>
                    Hapus pencarian
                  </button>
                }
              />
            )}
          </div>
        )}

        {view === "report" && (
          <div className="flex items-start gap-3.5 w-full">
            <div className="w-9 h-9 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center shrink-0 text-cyan-300">
              <Sparkles className="size-5" />
            </div>
            <div className="glass-panel rounded-2xl p-5 sm:p-6 w-full border border-white/10">
              {submittedRef ? (
                <div className="flex flex-col items-start gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30">
                    <CheckCircle2 className="size-5" />
                  </span>
                  <h3 className="font-display font-bold text-white">Laporan tercatat (demo)</h3>
                  <p className="text-sm text-slate-300">
                    Nomor referensi: <span className="font-mono text-cyan-300">{submittedRef}</span>. Ini belum terkirim ke WorldTracer. Serahkan juga ke Lost & Found Lantai 1.
                  </p>
                  <button
                    type="button"
                    className="text-xs font-semibold text-cyan-300"
                    onClick={() => {
                      setSubmittedRef(null);
                      setForm({ tag: "", flight: "", color: "", contact: "" });
                    }}
                  >
                    Buat laporan baru
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-sm text-slate-200 mb-4 leading-relaxed font-medium">
                    Ikuti tiga langkah ini, lalu isi formulir singkat. Data hanya tersimpan di browser.
                  </p>
                  <div className="flex flex-col gap-3">
                    {[
                      { n: 1, title: "Siapkan informasi bagasi", body: "Nomor tag (claim sticker) dan boarding pass." },
                      { n: 2, title: "Isi formulir laporan (PIR)", body: "Ciri koper, nomor penerbangan, dan kontak di Manado." },
                      { n: 3, title: "Terima nomor referensi", body: "Kode demo untuk ditunjukkan ke petugas Lost & Found." },
                    ].map((step) => (
                      <button
                        key={step.n}
                        type="button"
                        onClick={() => setActiveReportStep(step.n)}
                        className={`text-left flex items-start gap-3.5 p-4 rounded-xl border transition-all cursor-pointer ${
                          activeReportStep === step.n
                            ? "bg-cyan-500/10 border-cyan-400/40"
                            : "bg-white/5 border-white/10 hover:bg-white/10"
                        }`}
                      >
                        <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 flex items-center justify-center font-bold text-xs shrink-0">
                          {step.n}
                        </div>
                        <div>
                          <h4 className="font-display text-sm font-bold text-white">{step.title}</h4>
                          <p className="text-xs text-slate-300 mt-1">{step.body}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  {!formOpen ? (
                    <div className="mt-5 pt-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3">
                      <span className="text-xs text-slate-400">Lost & Found Sam Ratulangi · Lantai 1 Kedatangan</span>
                      <button
                        type="button"
                        onClick={() => {
                          setFormOpen(true);
                          setActiveReportStep(2);
                        }}
                        className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-[#00d2ff] to-[#3a7bd5] text-[#0A0F1C] rounded-full text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                      >
                        Mulai buat laporan <ArrowRight className="size-4" />
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleReportSubmit} className="mt-5 pt-4 border-t border-white/10 grid gap-3">
                      <label className="text-xs text-slate-400">
                        Nomor tag
                        <input
                          required
                          value={form.tag}
                          onChange={(e) => setForm((f) => ({ ...f, tag: e.target.value }))}
                          className="mt-1 w-full glass-input rounded-xl px-3 py-2.5 text-sm text-white"
                          placeholder="GA 491029"
                        />
                      </label>
                      <label className="text-xs text-slate-400">
                        Nomor penerbangan
                        <input
                          required
                          value={form.flight}
                          onChange={(e) => setForm((f) => ({ ...f, flight: e.target.value }))}
                          className="mt-1 w-full glass-input rounded-xl px-3 py-2.5 text-sm text-white"
                          placeholder="JT 774"
                        />
                      </label>
                      <label className="text-xs text-slate-400">
                        Warna / jenis koper
                        <input
                          value={form.color}
                          onChange={(e) => setForm((f) => ({ ...f, color: e.target.value }))}
                          className="mt-1 w-full glass-input rounded-xl px-3 py-2.5 text-sm text-white"
                          placeholder="Hitam, hardcase"
                        />
                      </label>
                      <label className="text-xs text-slate-400">
                        Kontak
                        <input
                          value={form.contact}
                          onChange={(e) => setForm((f) => ({ ...f, contact: e.target.value }))}
                          className="mt-1 w-full glass-input rounded-xl px-3 py-2.5 text-sm text-white"
                          placeholder="Nomor HP di Manado"
                        />
                      </label>
                      <button
                        type="submit"
                        className="mt-2 h-11 rounded-full bg-gradient-to-r from-[#00d2ff] to-[#3a7bd5] text-[#0A0F1C] text-sm font-bold"
                      >
                        Kirim laporan demo
                      </button>
                    </form>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {view === "carousel" && (
          <div className="grid gap-3">
            {BAGGAGE_CAROUSELS.map((item) => (
              <article key={item.id} className="glass-panel rounded-2xl p-5 border border-white/10">
                <h3 className="font-display font-bold text-white">{item.name}</h3>
                <p className="text-xs text-slate-400 mt-1 font-mono">{item.status}</p>
                <p className="text-sm text-slate-300 mt-2">Penerbangan: {item.flights}</p>
                <p className="text-xs text-slate-400 mt-2">Lokasi: Lantai 1 Terminal Kedatangan {AIRPORT_CONFIG.code}</p>
              </article>
            ))}
          </div>
        )}

        {view === "allowances" && (
          <div className="grid gap-3">
            {BAGGAGE_ALLOWANCES.map((item) => (
              <article key={item.cabin} className="glass-panel rounded-2xl p-5 border border-white/10">
                <h3 className="font-display font-bold text-white">{item.cabin}</h3>
                <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-[10px] font-mono uppercase text-slate-400">Kabin</p>
                    <p className="text-cyan-300 font-semibold">{item.cabinKg}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase text-slate-400">Tercatat</p>
                    <p className="text-white font-semibold">{item.checkedKg}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-3">Batas maskapai bisa berbeda. Cek tiket Anda.</p>
              </article>
            ))}
          </div>
        )}
      </div>

      <div className="mobile-search-bar glass-header fixed bottom-[72px] lg:bottom-0 left-0 lg:left-[320px] right-0 p-4 z-30 bg-[#0A0F1C]/80 backdrop-blur-xl border-t border-white/10">
        <form className="max-w-[800px] mx-auto relative flex items-center" onSubmit={handleTrackSubmit}>
          <input
            aria-label="Masukkan nomor tag bagasi"
            value={tagQuery}
            onChange={(e) => setTagQuery(e.target.value)}
            placeholder="Masukkan nomor tag bagasi (cth: GA 491029)..."
            className="w-full glass-input rounded-full py-3.5 pl-5 pr-14 text-sm text-white focus:outline-none placeholder:text-slate-400"
          />
          <button
            type="submit"
            aria-label="Lacak tag bagasi"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 w-10 h-10 bg-gradient-to-r from-[#00d2ff] to-[#3a7bd5] text-[#0A0F1C] rounded-full flex items-center justify-center hover:opacity-90 cursor-pointer"
          >
            <Send className="size-4.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
