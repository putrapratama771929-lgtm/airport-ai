import { ArrowRight, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AIRPORT_CONFIG } from "@/lib/airport-config";

export function InfoSection() {
  return (
    <section className="mx-auto grid max-w-[1200px] gap-6 px-4 pb-16 sm:px-8 lg:grid-cols-12">
      {/* Dark Glass Card 1 */}
      <article className="glass-panel relative overflow-hidden rounded-3xl p-6 sm:p-10 lg:col-span-7 border border-white/10 shadow-2xl">
        <div className="pointer-events-none absolute -right-10 -top-10 size-64 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="relative inline-grid size-12 place-items-center rounded-xl bg-cyan-500/20 border border-cyan-400/30 text-[#00d2ff] shadow-sm">
          <Navigation className="size-6" />
        </div>
        <p className="relative mt-6 font-mono text-xs font-bold tracking-widest text-[#00d2ff] uppercase">
          PANDUAN PINTAR TERMINAL {AIRPORT_CONFIG.code}
        </p>
        <h2 className="font-display relative mt-2 text-2xl sm:text-3xl font-extrabold text-white">
          Peta terminal {AIRPORT_CONFIG.shortName} yang memudahkan arah Anda.
        </h2>
        <p className="relative mt-3 text-sm leading-relaxed text-slate-300">
          Cari gate keberangkatan, Concordia Lounge, toko oleh-oleh khas Manado, atau tempat kuliner. {AIRPORT_CONFIG.brandName} memberi estimasi waktu dan rute tercepat.
        </p>
        <Button href="/facilities" variant="secondary" className="relative mt-7">
          Buka Peta Terminal <ArrowRight className="ml-2 size-4" />
        </Button>
      </article>

      {/* Dark Glass Card 2 */}
      <article className="glass-panel relative overflow-hidden rounded-3xl p-6 sm:p-10 text-white lg:col-span-5 border border-white/10 shadow-2xl bg-gradient-to-br from-slate-900/90 to-[#0A0F1C]/90">
        <div className="pointer-events-none absolute -left-10 -bottom-10 size-56 rounded-full bg-blue-600/20 blur-3xl" />
        <p className="font-mono text-xs font-bold tracking-widest text-[#00d2ff] uppercase">
          INFORMASI REAL-TIME
        </p>
        <h2 className="font-display mt-2 text-2xl sm:text-3xl font-extrabold">
          Tetap selangkah lebih siap di Manado.
        </h2>
        <div className="mt-8 space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
            <p className="font-mono text-xs font-semibold text-cyan-300 tracking-wider">
              REAL-TIME FLIGHT STATUS
            </p>
            <p className="mt-1 text-xs text-slate-300 leading-relaxed">
              Perubahan jadwal, estimasi boarding, dan gate {AIRPORT_CONFIG.code} tersinkronisasi otomatis.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
            <p className="font-mono text-xs font-semibold text-cyan-300 tracking-wider">
              AI CONTEXTUAL GUIDANCE
            </p>
            <p className="mt-1 text-xs text-slate-300 leading-relaxed">
              Jawaban cerdas dan rute navigasi yang disesuaikan dengan posisi Anda di terminal bandara.
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}
