import { ArrowRight, Bot, PlaneTakeoff, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AIRPORT_CONFIG } from "@/lib/airport-config";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-10 sm:py-16">
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-4 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative z-10">
          {/* Dark Glass Pill Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-1.5 backdrop-blur-xl shadow-[0_0_15px_rgba(0,210,255,0.2)]">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-[#00d2ff]" />
            </span>
            <span className="font-mono text-xs font-bold tracking-widest text-cyan-300 uppercase">
              ASISTEN DIGITAL {AIRPORT_CONFIG.code} · {AIRPORT_CONFIG.city.toUpperCase()}
            </span>
          </div>

          <h1 className="font-display max-w-2xl text-3xl sm:text-5xl lg:text-5xl font-extrabold leading-[1.15] tracking-tight text-white">
            {AIRPORT_CONFIG.name},{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d2ff] via-[#38d4f6] to-[#3a7bd5] drop-shadow-[0_0_15px_rgba(0,210,255,0.3)]">
              lebih cerdas.
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm sm:text-base leading-relaxed text-slate-300">
            Dari jadwal penerbangan real-time, panduan gate, hingga fasilitas & transportasi di Manado, {AIRPORT_CONFIG.brandName} menyajikan informasi akurat dengan sentuhan asisten cerdas.
          </p>

          <div className="mt-7 flex flex-wrap gap-3.5">
            <Button href="/chat" variant="primary">
              Buka {AIRPORT_CONFIG.brandName} <ArrowRight className="ml-2 size-4" />
            </Button>
            <Button href="/flights" variant="secondary">
              <PlaneTakeoff className="mr-2 size-4 text-[#00d2ff]" />
              Lihat Penerbangan
            </Button>
          </div>

          {/* Dark Glass Stat Strip */}
          <div className="mt-10 grid grid-cols-3 gap-3 rounded-2xl glass-panel p-4 border border-white/10 text-slate-200">
            <div className="border-r border-white/10 pr-2">
              <b className="block font-display text-lg sm:text-xl font-bold text-white">24/7</b>
              <span className="text-[11px] text-slate-400 font-mono">Asisten Siaga</span>
            </div>
            <div className="border-r border-white/10 pr-2 pl-2">
              <b className="block font-display text-lg sm:text-xl font-bold text-cyan-300">{AIRPORT_CONFIG.code} Live</b>
              <span className="text-[11px] text-slate-400 font-mono">Jadwal Terkini</span>
            </div>
            <div className="pl-2">
              <b className="block font-display text-lg sm:text-xl font-bold text-white">Instan</b>
              <span className="text-[11px] text-slate-400 font-mono">Panduan Rute</span>
            </div>
          </div>
        </div>

        {/* Dark Glass Chat Simulator Preview Card */}
        <div className="relative mx-auto w-full max-w-[500px]">
          <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-r from-cyan-500/20 to-blue-600/20 blur-xl opacity-60 pointer-events-none" />

          <div className="glass-panel relative overflow-hidden rounded-3xl p-5 sm:p-6 border border-white/15 shadow-2xl">
            {/* Header of Preview */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-xl bg-cyan-500/20 text-[#00d2ff] border border-cyan-400/30">
                  <Bot className="size-5" />
                </span>
                <div>
                  <p className="font-semibold text-sm text-white">{AIRPORT_CONFIG.brandName}</p>
                  <p className="flex items-center gap-1.5 text-[11px] text-cyan-300 font-mono">
                    <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online · Terminal {AIRPORT_CONFIG.code}
                  </p>
                </div>
              </div>
              <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-cyan-300">
                TERMINAL ASSIST
              </span>
            </div>

            {/* Chat Bubble Simulation */}
            <div className="space-y-3 py-4 text-xs sm:text-sm">
              <div className="max-w-[90%] rounded-2xl rounded-tl-sm chat-bubble-bot p-3.5 text-slate-200">
                Halo! Selamat datang di {AIRPORT_CONFIG.shortName}. Ada jadwal atau fasilitas yang ingin Anda ketahui?
              </div>

              <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm chat-bubble-user p-3.5 text-white font-medium shadow-md">
                Penerbangan Garuda GA 607 ke Jakarta boarding jam berapa dan di gate mana?
              </div>

              <div className="max-w-[92%] rounded-2xl rounded-tl-sm chat-bubble-bot p-3.5 text-slate-200">
                <span className="mb-1 flex items-center gap-1.5 font-bold text-xs text-cyan-300">
                  <PlaneTakeoff className="size-3.5 text-[#00d2ff]" />
                  GA 607 · Gate 3 · Status: Boarding
                </span>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Boarding dimulai 06:30 WITA di Lantai 2 area keberangkatan. Estimasi jalan kaki 3 menit.
                </p>
              </div>
            </div>

            {/* Simulated Input Field */}
            <div className="glass-input flex items-center gap-3 rounded-full px-4 py-2.5 text-xs text-slate-400">
              <Sparkles className="size-4 text-cyan-400" />
              <span>Tanyakan apa saja seputar {AIRPORT_CONFIG.code}…</span>
              <span className="ml-auto grid size-7 place-items-center rounded-full bg-gradient-to-r from-[#00d2ff] to-[#3a7bd5] text-[#0A0F1C] font-bold">
                ↑
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
