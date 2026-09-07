import Link from "next/link";
import { MapPinned, PlaneTakeoff, Luggage, Bus } from "lucide-react";
import { AIRPORT_CONFIG } from "@/lib/airport-config";

const items = [
  {
    icon: PlaneTakeoff,
    title: `Lacak Penerbangan ${AIRPORT_CONFIG.code}`,
    text: "Pantau jadwal live, status keberangkatan, dan gate di bandara Manado.",
    href: "/flights",
  },
  {
    icon: MapPinned,
    title: "Peta & Fasilitas Terminal",
    text: "Temukan lounge, gerai oleh-oleh khas Manado, dan restoran.",
    href: "/facilities",
  },
  {
    icon: Luggage,
    title: "Layanan Bagasi & Lost/Found",
    text: "Panduan pelacakan bagasi dan pelaporan barang tertinggal.",
    href: "/baggage",
  },
  {
    icon: Bus,
    title: "Transportasi & Taksi",
    text: "Informasi DAMRI, taksi resmi, dan titik jemput ride-hailing.",
    href: "/transport",
  },
];

export function QuickActions() {
  return (
    <section className="mx-auto max-w-[1200px] px-4 py-12 sm:px-8">
      <div className="mb-8">
        <p className="font-mono text-xs font-bold tracking-widest text-[#00d2ff] uppercase">
          LAYANAN TERPADU · {AIRPORT_CONFIG.code}
        </p>
        <h2 className="font-display mt-2 text-2xl sm:text-3xl font-extrabold text-white">
          Bantuan untuk setiap tahap perjalanan Anda di Manado.
        </h2>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              href={item.href}
              key={item.title}
              className="glass-panel glass-panel-hover group rounded-2xl p-5 sm:p-6 flex flex-col justify-between border border-white/10 hover:border-cyan-400/40 transition-all shadow-lg"
            >
              <div>
                <div className="relative mb-5 inline-grid size-12 place-items-center rounded-xl bg-cyan-500/15 text-[#00d2ff] border border-cyan-400/30 shadow-[0_0_12px_rgba(0,210,255,0.2)] group-hover:scale-110 transition-transform">
                  <Icon className="size-6" />
                </div>
                <h3 className="font-display text-base font-bold text-white group-hover:text-[#00d2ff] transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  {item.text}
                </p>
              </div>
              <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-cyan-300">
                <span>Buka fitur</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
