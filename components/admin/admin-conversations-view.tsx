"use client";

import { useRef, useState } from "react";
import {
  MessageSquare,
  Clock,
  User,
  Plane,
  ChevronRight,
  MessageCircleOff,
  Sparkles,
} from "lucide-react";
import {
  ADMIN_CONVERSATIONS_DATA,
  ConversationItem,
} from "@/lib/admin-data";
import { filterItems } from "@/lib/list-filters";
import { ConversationListSkeleton } from "./admin-skeletons";
import { AdminErrorState } from "./admin-error-state";
import { AdminEmptyState } from "./admin-empty-state";
import { AdminStateSwitch, AdminViewMode } from "./admin-state-switch";
import { AdminDetailDialog } from "./admin-detail-dialog";
import { AdminFilterBar } from "./admin-filter-bar";
import { createDefaultFilters } from "@/lib/filter-state";

export function AdminConversationsView() {
  const [viewMode, setViewMode] = useState<AdminViewMode>("data");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [selectedStatus, setSelectedStatus] = useState<string>("Semua");
  const [activeSession, setActiveSession] = useState<ConversationItem | null>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const categories = ["Semua", "Penerbangan", "Fasilitas", "Bagasi", "Transportasi"];
  const statuses = ["Semua", "Selesai", "Ditangani Staf", "Eskalasi"];

  const filteredConversations = filterItems({
    items: ADMIN_CONVERSATIONS_DATA,
    query: searchQuery,
    category: selectedCategory,
    status: selectedStatus,
    matchesQuery: (conversation, query) =>
      [
        conversation.sessionId,
        conversation.passengerName,
        conversation.previewQuery,
        conversation.previewAnswer,
        conversation.flightRef ?? "",
      ].some((value) => value.toLocaleLowerCase("id-ID").includes(query)),
    getCategory: (conversation) => conversation.category,
    getStatus: (conversation) => conversation.status,
  });

  const handleResetFilters = () => {
    const filters = createDefaultFilters();
    setSearchQuery(filters.query);
    setSelectedCategory(filters.category);
    setSelectedStatus(filters.status);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header & State Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold tracking-widest text-[#00d2ff] uppercase">
              LOG INTERAKSI AI · SESI REAL-TIME
            </span>
            <span className="text-slate-500">·</span>
            <span className="text-xs text-slate-400 font-mono">Sam Ratulangi Airport</span>
          </div>
          <h1 className="font-display mt-1 text-2xl sm:text-3xl font-extrabold text-white">
            Log Percakapan Penumpang
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Riwayat transkrip tanya-jawab penumpang dengan AI Concierge, status eskalasi, dan evaluasi respon.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <AdminStateSwitch
            currentMode={viewMode}
            onModeChange={(m) => setViewMode(m)}
          />
        </div>
      </div>

      {/* RENDER VIEW ACCORDING TO STATE */}
      {viewMode === "loading" ? (
        <div className="space-y-6">
          <div className="h-12 w-full glass-panel rounded-2xl border border-white/10 animate-pulse" />
          <ConversationListSkeleton count={4} />
        </div>
      ) : viewMode === "error" ? (
        <AdminErrorState
          title="Gagal Mengambil Log Percakapan"
          description="Koneksi database session log concierge mengalami batas waktu. Silakan muat ulang halaman."
          onRetry={() => setViewMode("data")}
        />
      ) : viewMode === "empty" ? (
        <AdminEmptyState
          icon={MessageCircleOff}
          title="Belum Ada Log Percakapan"
          description="Tidak ada riwayat percakapan yang tercatat dalam sistem untuk periode ini."
          actionText="Kembali ke Mode Data"
          onAction={() => setViewMode("data")}
        />
      ) : (
        /* NORMAL DATA VIEW */
        <div className="space-y-6">
          <AdminFilterBar categories={categories} category={selectedCategory} onCategoryChange={setSelectedCategory} onQueryChange={setSearchQuery} onReset={handleResetFilters} onStatusChange={setSelectedStatus} placeholder="Cari ID sesi, pertanyaan, penerbangan (contoh: GA 607)..." query={searchQuery} statuses={statuses} status={selectedStatus} />

          {/* Conversation List */}
          {filteredConversations.length === 0 ? (
            <AdminEmptyState
              title="Percakapan Tidak Ditemukan"
              description={`Tidak ada percakapan yang cocok dengan filter atau kata kunci yang Anda masukkan.`}
              actionText="Reset Pencarian & Filter"
              onAction={handleResetFilters}
            />
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400 px-1 font-mono">
                <span>Menampilkan {filteredConversations.length} percakapan</span>
                <span>Klik kartu untuk melihat transkrip penuh</span>
              </div>

              {filteredConversations.map((conv) => (
                <button
                  key={conv.id}
                  type="button"
                  onClick={(event) => { lastTriggerRef.current = event.currentTarget; setActiveSession(conv); }}
                  className="glass-panel glass-panel-hover w-full text-left rounded-2xl p-5 border border-white/10 shadow-xl cursor-pointer transition-all hover:border-cyan-400/40 group relative"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-xl bg-cyan-500/15 border border-cyan-400/30 grid place-items-center text-[#00d2ff] group-hover:scale-105 transition-transform">
                        <MessageSquare className="size-4.5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-white group-hover:text-cyan-300 transition">
                            {conv.passengerName}
                          </p>
                          <span className="text-[11px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-400/20">
                            {conv.sessionId}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                          <span>{conv.channel}</span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <Clock className="size-3 text-slate-500" />
                            {conv.timestamp}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      {conv.flightRef && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-500/15 text-blue-300 border border-blue-400/30 text-[11px] font-mono">
                          <Plane className="size-3 -rotate-45" />
                          {conv.flightRef}
                        </span>
                      )}

                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold border ${
                          conv.status === "Selesai"
                            ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                            : conv.status === "Ditangani Staf"
                            ? "bg-cyan-500/15 text-cyan-300 border-cyan-400/30"
                            : "bg-amber-500/15 text-amber-300 border-amber-500/30"
                        }`}
                      >
                        <span
                          className={`size-1.5 rounded-full ${
                            conv.status === "Selesai"
                              ? "bg-emerald-400"
                              : conv.status === "Ditangani Staf"
                              ? "bg-cyan-400"
                              : "bg-amber-400"
                          }`}
                        />
                        {conv.status}
                      </span>
                    </div>
                  </div>

                  {/* Query & Answer Preview */}
                  <div className="mt-3.5 space-y-2 text-sm">
                    <div className="flex items-start gap-2 text-slate-300">
                      <User className="size-4 text-slate-400 shrink-0 mt-0.5" />
                      <p className="font-medium text-white">{conv.previewQuery}</p>
                    </div>
                    <div className="flex items-start gap-2 text-slate-400 pl-6">
                      <p className="text-xs text-slate-300 line-clamp-2 bg-slate-900/40 p-2.5 rounded-xl border border-white/5 w-full">
                        <span className="text-[#00d2ff] font-semibold mr-1">AI Concierge:</span>
                        {conv.previewAnswer}
                      </p>
                    </div>
                  </div>

                  {/* Footer Bar */}
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-3">
                      <span>Durasi: <strong className="text-slate-300">{conv.duration}</strong></span>
                      <span>·</span>
                      <span>Total Pesan: <strong className="text-slate-300">{conv.messagesCount}</strong></span>
                    </div>

                    <span className="text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform font-medium">
                      Buka Transkrip
                      <ChevronRight className="size-3.5" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Transcript Detail Modal */}
      {activeSession && (
        <AdminDetailDialog labelledBy="conversation-dialog-title" onClose={() => setActiveSession(null)} returnFocusRef={lastTriggerRef}>
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2">
                  <h3 id="conversation-dialog-title" className="font-display text-lg font-bold text-white">
                    Transkrip Sesi Percakapan
                  </h3>
                  <span className="font-mono text-xs text-cyan-400 bg-cyan-500/15 px-2 py-0.5 rounded border border-cyan-400/20">
                    {activeSession.sessionId}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {activeSession.passengerName} · {activeSession.channel} · {activeSession.timestamp}
                </p>
              </div>

            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto custom-scrollbar my-4 space-y-3.5 pr-2">
              {activeSession.fullTranscript.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-1 px-1">
                    {msg.sender === "user" ? (
                      <>
                        <span>{msg.time}</span>
                        <User className="size-3 text-cyan-400" />
                        <span className="font-semibold text-slate-300">Penumpang</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="size-3 text-[#00d2ff]" />
                        <span className="font-semibold text-[#00d2ff]">Sam Ratulangi AI</span>
                        <span>{msg.time}</span>
                      </>
                    )}
                  </div>

                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-cyan-600/30 text-white border border-cyan-400/40 rounded-tr-sm"
                        : "bg-slate-800/80 text-slate-100 border border-white/10 rounded-tl-sm shadow-md"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono">Status: <strong className="text-emerald-400">{activeSession.status}</strong></span>
              <button
                type="button"
                onClick={() => setActiveSession(null)}
                className="px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition font-medium cursor-pointer"
              >
                Tutup
              </button>
            </div>
        </AdminDetailDialog>
      )}
    </div>
  );
}
