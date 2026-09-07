import { AIRPORT_CONFIG } from "@/lib/airport-config";
import { Button } from "@/components/ui/button";
import { ArrowRight, HelpCircle, Sparkles } from "lucide-react";

const faqs = [
  {
    q: `Di mana lokasi Bandara Internasional Sam Ratulangi?`,
    a: `Bandara Sam Ratulangi (${AIRPORT_CONFIG.code}) berlokasi di Jl. AA Maramis, Mapanget, Kota Manado, Sulawesi Utara, sekitar 13 km arah timur laut dari pusat kota Manado.`,
  },
  {
    q: `Berapa jam sebelum keberangkatan saya harus tiba di bandara?`,
    a: `Untuk penerbangan domestik, disarankan tiba minimal 2 jam sebelum jadwal keberangkatan. Untuk penerbangan internasional, disarankan tiba minimal 3 jam sebelumnya.`,
  },
  {
    q: `Apakah ada lounge eksekutif di Bandara Sam Ratulangi?`,
    a: `Ya, tersedia Concordia Executive Lounge di Lantai 2 area ruang tunggu keberangkatan (dekat Gate 2 & 3).`,
  },
  {
    q: `Bagaimana cara mengecek status penerbangan live?`,
    a: `Anda dapat membuka halaman Flights di aplikasi ini atau langsung bertanya kepada ${AIRPORT_CONFIG.brandName} melalui fitur chat.`,
  },
  {
    q: `Di mana saya bisa membeli oleh-oleh khas Manado di dalam bandara?`,
    a: `Gerai oleh-oleh khas Manado (seperti Klappertaart, Cakalang Fufu, dan kue kering khas Minahasa) tersedia di Lantai 1 area komersial dan Lantai 2 area tunggu keberangkatan.`,
  },
];

export default function FaqPage() {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar px-4 sm:px-8 md:px-12 py-8 max-w-[840px] mx-auto w-full pb-28">
      <div className="mb-6">
        <p className="font-mono text-xs font-bold tracking-widest text-[#00d2ff] uppercase">
          PUSAT BANTUAN & FAQ · {AIRPORT_CONFIG.code}
        </p>
        <h1 className="font-display mt-2 text-2xl sm:text-3xl font-extrabold text-white">
          Pertanyaan Umum ({AIRPORT_CONFIG.shortName})
        </h1>
        <p className="mt-2 text-sm text-slate-300">
          Jawaban cepat untuk pertanyaan perjalanan yang paling sering ditanyakan seputar {AIRPORT_CONFIG.name}.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((item, index) => (
          <article key={index} className="glass-panel glass-panel-hover rounded-2xl p-5 sm:p-6 border border-white/10">
            <h2 className="flex items-start gap-3 font-display font-bold text-base sm:text-lg text-white">
              <span className="grid size-8 place-items-center rounded-xl bg-cyan-500/20 text-[#00d2ff] border border-cyan-400/30 shrink-0 mt-0.5">
                <HelpCircle className="size-4.5" />
              </span>
              <span>{item.q}</span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300 pl-11">{item.a}</p>
          </article>
        ))}
      </div>

      <div className="glass-panel rounded-2xl border border-cyan-400/30 p-6 sm:p-8 text-white shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 bg-gradient-to-r from-blue-950/60 to-slate-900/60">
        <div>
          <div className="flex items-center gap-2 text-cyan-300 text-xs font-mono font-semibold uppercase">
            <Sparkles className="size-4 text-[#00d2ff]" />
            ASISTEN AI SIAP MEMBANTU
          </div>
          <h3 className="font-display font-bold text-lg mt-1">Punya pertanyaan lain seputar {AIRPORT_CONFIG.code}?</h3>
          <p className="text-xs text-slate-300 mt-1">
            Tanyakan langsung ke asisten AI kami untuk panduan rute dan jadwal.
          </p>
        </div>
        <Button href="/chat" variant="primary" className="shrink-0 w-full sm:w-auto">
          Chat {AIRPORT_CONFIG.brandName} <ArrowRight className="ml-2 size-4" />
        </Button>
      </div>
    </div>
  );
}
