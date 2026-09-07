"use client";

import { RotateCcw, Search, X } from "lucide-react";
import { hasActiveFilters } from "@/lib/filter-state";

interface AdminFilterBarProps {
  categories: readonly string[];
  category: string;
  onCategoryChange: (value: string) => void;
  onQueryChange: (value: string) => void;
  onReset: () => void;
  onStatusChange: (value: string) => void;
  placeholder: string;
  query: string;
  statuses: readonly string[];
  status: string;
}

export function AdminFilterBar({ categories, category, onCategoryChange, onQueryChange, onReset, onStatusChange, placeholder, query, statuses, status }: AdminFilterBarProps) {
  return (
    <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-white/10 shadow-xl space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search aria-hidden className="size-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <label className="sr-only" htmlFor="admin-list-search">Cari daftar</label>
          <input id="admin-list-search" type="search" value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder={placeholder} className="w-full bg-slate-900/70 border border-white/10 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/50 transition" />
          {query && <button type="button" onClick={() => onQueryChange("")} aria-label="Hapus pencarian" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"><X className="size-4" /></button>}
        </div>
        <div className="sm:w-48">
          <label className="sr-only" htmlFor="admin-list-status">Filter status</label>
          <select id="admin-list-status" value={status} onChange={(event) => onStatusChange(event.target.value)} className="w-full bg-slate-900/70 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400/50 cursor-pointer">
            {statuses.map((item) => <option key={item} value={item} className="bg-slate-900 text-white">Status: {item}</option>)}
          </select>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5">
        <span className="text-xs text-slate-400 font-mono mr-1">Kategori:</span>
        {categories.map((item) => <button key={item} type="button" aria-pressed={category === item} onClick={() => onCategoryChange(item)} className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${category === item ? "bg-cyan-500/20 text-[#00d2ff] border border-cyan-400/40 shadow-[0_0_10px_rgba(0,210,255,0.2)] font-semibold" : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-transparent"}`}>{item}</button>)}
        {hasActiveFilters({ query, category, status }) && <button type="button" onClick={onReset} className="ml-auto text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium cursor-pointer"><RotateCcw className="size-3" />Reset Filter</button>}
      </div>
    </div>
  );
}
