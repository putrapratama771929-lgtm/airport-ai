import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AIRPORT_CONFIG } from "@/lib/airport-config";

export function Cta() {
  return (
    <section className="px-4 pb-16 sm:px-8">
      <div className="glass-panel relative mx-auto max-w-[1200px] overflow-hidden rounded-3xl border border-cyan-400/30 px-6 py-12 text-center text-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] sm:px-12 bg-gradient-to-r from-blue-950/40 via-slate-900/60 to-blue-950/40">
        <div className="pointer-events-none absolute -left-10 top-0 size-72 rounded-full bg-cyan-500/15 blur-[80px]" />
        <div className="pointer-events-none absolute -right-10 bottom-0 size-72 rounded-full bg-blue-600/15 blur-[80px]" />

        <div className="relative z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-1 font-mono text-xs font-bold tracking-widest text-cyan-300 backdrop-blur-md">
            <Sparkles className="size-3.5 text-[#00d2ff]" />
            {AIRPORT_CONFIG.brandName.toUpperCase()} SIAP MEMBANTU
          </span>
          <h2 className="font-display mx-auto mt-4 max-w-xl text-2xl sm:text-4xl font-extrabold">
            Ada pertanyaan sebelum berangkat dari Manado?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-slate-300">
            Buka percakapan dengan asisten digital {AIRPORT_CONFIG.shortName} untuk panduan perjalanan cepat dan akurat.
          </p>
          <Button href="/chat" variant="primary" className="mt-7">
            Mulai Percakapan <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
