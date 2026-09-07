"use client";

import { useState } from "react";
import {
  MessageSquare,
  CheckCircle,
  Star,
  Zap,
  TrendingUp,
  Search,
  RefreshCw,
  Clock,
  Radio,
  FileQuestion,
} from "lucide-react";
import {
  ADMIN_STATS_DATA,
  ADMIN_TOPIC_DISTRIBUTION,
  ADMIN_RECENT_LOGS,
} from "@/lib/admin-data";
import { AIRPORT_CONFIG } from "@/lib/airport-config";
import { MetricCardsSkeleton, TableSkeleton } from "./admin-skeletons";
import { AdminErrorState } from "./admin-error-state";
import { AdminEmptyState } from "./admin-empty-state";
import { AdminStateSwitch, AdminViewMode } from "./admin-state-switch";

export function AdminDashboardView() {
  const [viewMode, setViewMode] = useState<AdminViewMode>("data");
  const [period, setPeriod] = useState<"today" | "7days" | "30days">("today");
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const filteredLogs = ADMIN_RECENT_LOGS.filter((log) => {
    const q = searchQuery.toLowerCase();
    return (
      log.passenger.toLowerCase().includes(q) ||
      log.query.toLowerCase().includes(q) ||
      log.topic.toLowerCase().includes(q) ||
      log.channel.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header & State Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold tracking-widest text-[#00d2ff] uppercase">
              {AIRPORT_CONFIG.code} · TERMINAL CONCIERGE
            </span>
            <span className="text-slate-500">·</span>
            <span className="text-xs text-slate-400 font-mono">Data demo</span>
          </div>
          <h1 className="font-display mt-1 text-2xl sm:text-3xl font-extrabold text-white">
            Dashboard Analitik {AIRPORT_CONFIG.shortName}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Ringkasan performa AI Concierge, volume interaksi penumpang, dan SLA respon sistem.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <AdminStateSwitch
            currentMode={viewMode}
            onModeChange={(m) => setViewMode(m)}
          />
          <button
            type="button"
            onClick={handleRefresh}
            title="Segarkan tampilan data demo"
            className="p-2.5 rounded-xl glass-panel text-slate-300 hover:text-white border border-white/10 hover:border-cyan-400/40 transition active:scale-95 cursor-pointer"
          >
            <RefreshCw className={`size-4 text-cyan-400 ${isRefreshing ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* RENDER VIEW ACCORDING TO STATE */}
      {viewMode === "loading" ? (
        <div className="space-y-6">
          <MetricCardsSkeleton />
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="glass-panel rounded-2xl p-6 border border-white/10 lg:col-span-1 space-y-4">
              <div className="h-5 w-40 bg-white/5 rounded-lg animate-pulse" />
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="h-3.5 w-full bg-white/5 rounded animate-pulse" />
                    <div className="h-2.5 w-3/4 bg-white/5 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2">
              <TableSkeleton rows={4} />
            </div>
          </div>
        </div>
      ) : viewMode === "error" ? (
        <AdminErrorState
          title="Gagal Memuat Metrik Dashboard"
          description="Sistem analitik bandara MDC tidak dapat mengambil ringkasan data percakapan real-time."
          onRetry={() => setViewMode("data")}
        />
      ) : viewMode === "empty" ? (
        <AdminEmptyState
          icon={FileQuestion}
          title="Belum Ada Data Percakapan Hari Ini"
          description="Sistem AI Concierge belum mencatat interaksi penumpang pada rentang waktu yang dipilih."
          actionText="Kembalikan ke Mode Data"
          onAction={() => setViewMode("data")}
        />
      ) : (
        /* NORMAL DATA VIEW */
        <div className="space-y-6 sm:space-y-8">
          {/* Period Filter Tabs */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 p-1 glass-panel rounded-xl border border-white/10 text-xs">
              {[
                { id: "today", label: "Hari Ini" },
                { id: "7days", label: "7 Hari Terakhir" },
                { id: "30days", label: "30 Hari Terakhir" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setPeriod(tab.id as typeof period)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                    period === tab.id
                      ? "bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-400/40 shadow-[0_0_10px_rgba(0,210,255,0.15)]"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 font-mono">
              <Radio className="size-3.5 text-emerald-400 animate-pulse" />
              <span>Pembaruan manual · data demo</span>
            </div>
          </div>

          {/* 4 Metric Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="glass-panel glass-panel-hover rounded-2xl p-5 sm:p-6 border border-white/10 shadow-xl relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  Total Percakapan
                </p>
                <span className="grid size-9 place-items-center rounded-xl bg-cyan-500/20 text-[#00d2ff] border border-cyan-400/30">
                  <MessageSquare className="size-4.5" />
                </span>
              </div>
              <p className="mt-3 text-3xl font-display font-extrabold text-white tracking-tight">
                {ADMIN_STATS_DATA.totalConversations.toLocaleString("id-ID")}
              </p>
              <p className="mt-2 text-xs font-semibold text-cyan-300 flex items-center gap-1">
                <TrendingUp className="size-3.5" />
                {ADMIN_STATS_DATA.conversationsChange}
              </p>
            </div>

            <div className="glass-panel glass-panel-hover rounded-2xl p-5 sm:p-6 border border-white/10 shadow-xl relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  Pertanyaan Terjawab
                </p>
                <span className="grid size-9 place-items-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30">
                  <CheckCircle className="size-4.5" />
                </span>
              </div>
              <p className="mt-3 text-3xl font-display font-extrabold text-white tracking-tight">
                {ADMIN_STATS_DATA.answeredRate}
              </p>
              <p className="mt-2 text-xs font-medium text-emerald-300">
                {ADMIN_STATS_DATA.answeredDetail}
              </p>
            </div>

            <div className="glass-panel glass-panel-hover rounded-2xl p-5 sm:p-6 border border-white/10 shadow-xl relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  Kepuasan Penumpang
                </p>
                <span className="grid size-9 place-items-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-400/30">
                  <Star className="size-4.5" />
                </span>
              </div>
              <p className="mt-3 text-3xl font-display font-extrabold text-white tracking-tight">
                {ADMIN_STATS_DATA.satisfactionScore}
              </p>
              <p className="mt-2 text-xs font-medium text-amber-300">
                {ADMIN_STATS_DATA.satisfactionDetail}
              </p>
            </div>

            <div className="glass-panel glass-panel-hover rounded-2xl p-5 sm:p-6 border border-white/10 shadow-xl relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  Rata-rata Respon
                </p>
                <span className="grid size-9 place-items-center rounded-xl bg-purple-500/20 text-purple-300 border border-purple-400/30">
                  <Zap className="size-4.5" />
                </span>
              </div>
              <p className="mt-3 text-3xl font-display font-extrabold text-white tracking-tight">
                {ADMIN_STATS_DATA.avgResponseTime}
              </p>
              <p className="mt-2 text-xs font-medium text-purple-300">
                {ADMIN_STATS_DATA.responseTimeDetail}
              </p>
            </div>
          </div>

          {/* 2-Column Section: Topics Distribution & Live Recent Activity */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Topic Distribution Card */}
            <div className="glass-panel rounded-2xl p-6 border border-white/10 shadow-xl lg:col-span-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-bold text-base text-white">
                    Distribusi Topik
                  </h3>
                  <span className="text-[11px] font-mono text-cyan-400 font-semibold">
                    100% Total
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-5">
                  Kategori pertanyaan paling sering ditanyakan penumpang di bandara.
                </p>

                <div className="space-y-4">
                  {ADMIN_TOPIC_DISTRIBUTION.map((item) => (
                    <div key={item.topic} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-300 font-medium">{item.topic}</span>
                        <span className="font-mono font-semibold text-white">
                          {item.percentage}% ({item.count})
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden border border-white/5">
                        <div
                          className={`h-full rounded-full ${item.color}`}
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span>Topik terbanyak:</span>
                <span className="text-cyan-300 font-semibold">Jadwal & Gate</span>
              </div>
            </div>

            {/* Recent Activity Table */}
            <div className="glass-panel rounded-2xl p-6 border border-white/10 shadow-xl lg:col-span-2 flex flex-col">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                <div>
                  <h3 className="font-display font-bold text-base text-white">
                    Aktivitas Interaksi Terkini
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Log pertanyaan real-time dari terminal dan kanal digital bandara
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="size-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Cari log..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-slate-900/60 border border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/50 w-36 sm:w-48"
                    />
                  </div>
                </div>
              </div>

              {filteredLogs.length === 0 ? (
                <div className="py-8">
                  <AdminEmptyState
                    title="Tidak Ada Log yang Cocok"
                    description={`Tidak ditemukan log aktivitas dengan kata kunci "${searchQuery}".`}
                    actionText="Reset Pencarian"
                    onAction={() => setSearchQuery("")}
                  />
                </div>
              ) : (
                <div className="overflow-x-auto -mx-6 px-6">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/10 text-slate-400 font-mono uppercase tracking-wider text-[11px]">
                        <th className="pb-3 font-semibold">Waktu & Penumpang</th>
                        <th className="pb-3 font-semibold hidden md:table-cell">Kanal</th>
                        <th className="pb-3 font-semibold">Pertanyaan</th>
                        <th className="pb-3 font-semibold text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-white/5 transition-colors group">
                          <td className="py-3.5 pr-3">
                            <p className="font-semibold text-white group-hover:text-cyan-300 transition">
                              {log.passenger}
                            </p>
                            <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                              <Clock className="size-3 text-slate-500" />
                              {log.time}
                            </p>
                          </td>
                          <td className="py-3.5 pr-3 hidden md:table-cell">
                            <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300 text-[11px]">
                              {log.channel}
                            </span>
                          </td>
                          <td className="py-3.5 pr-3 max-w-xs">
                            <p className="text-slate-200 line-clamp-1">{log.query}</p>
                            <p className="text-[10px] text-cyan-400/80 font-mono mt-0.5">{log.topic}</p>
                          </td>
                          <td className="py-3.5 text-right whitespace-nowrap">
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-mono text-[10px] font-semibold border ${
                                log.status === "Selesai"
                                  ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                                  : log.status === "Ditangani Staf"
                                  ? "bg-cyan-500/15 text-cyan-300 border-cyan-400/30"
                                  : "bg-amber-500/15 text-amber-300 border-amber-500/30"
                              }`}
                            >
                              <span
                                className={`size-1.5 rounded-full ${
                                  log.status === "Selesai"
                                    ? "bg-emerald-400"
                                    : log.status === "Ditangani Staf"
                                    ? "bg-cyan-400"
                                    : "bg-amber-400"
                                }`}
                              />
                              {log.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
