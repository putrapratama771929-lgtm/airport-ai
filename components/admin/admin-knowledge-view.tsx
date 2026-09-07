"use client";

import { useRef, useState } from "react";
import {
  Tag,
  Calendar,
  Eye,
  FileQuestion,
} from "lucide-react";
import {
  ADMIN_KNOWLEDGE_DATA,
  KnowledgeItem,
} from "@/lib/admin-data";
import { filterItems } from "@/lib/list-filters";
import { KnowledgeListSkeleton } from "./admin-skeletons";
import { AdminErrorState } from "./admin-error-state";
import { AdminEmptyState } from "./admin-empty-state";
import { AdminStateSwitch, AdminViewMode } from "./admin-state-switch";
import { AdminDetailDialog } from "./admin-detail-dialog";
import { AdminFilterBar } from "./admin-filter-bar";
import { createDefaultFilters } from "@/lib/filter-state";

export function AdminKnowledgeView() {
  const [viewMode, setViewMode] = useState<AdminViewMode>("data");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [selectedStatus, setSelectedStatus] = useState<string>("Semua");
  const [activeItem, setActiveItem] = useState<KnowledgeItem | null>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const categories = [
    "Semua",
    "Gate & Terminal",
    "Bagasi & Check-in",
    "Fasilitas & Lounge",
    "Transportasi Bandara",
    "Darurat & Medis",
  ];

  const statuses = ["Semua", "Aktif", "Draft"];

  const filteredItems = filterItems({
    items: ADMIN_KNOWLEDGE_DATA,
    query: searchQuery,
    category: selectedCategory,
    status: selectedStatus,
    matchesQuery: (item, query) =>
      [item.title, item.summary, item.content, item.id, ...item.tags].some((value) =>
        value.toLocaleLowerCase("id-ID").includes(query)
      ),
    getCategory: (item) => item.category,
    getStatus: (item) => item.status,
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
              RAG & KNOWLEDGE BASE · SISTEM AI
            </span>
            <span className="text-slate-500">·</span>
            <span className="text-xs text-slate-400 font-mono">Bandara Sam Ratulangi</span>
          </div>
          <h1 className="font-display mt-1 text-2xl sm:text-3xl font-extrabold text-white">
            Knowledge Base Concierge
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Basis data informasi terminal, regulasi penerbangan, dan pedoman jawaban yang diakses oleh AI.
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
          <KnowledgeListSkeleton count={4} />
        </div>
      ) : viewMode === "error" ? (
        <AdminErrorState
          title="Gagal Mengakses Knowledge Base"
          description="Sistem RAG (Retrieval-Augmented Generation) tidak dapat memuat indeks pengetahuan terminal."
          onRetry={() => setViewMode("data")}
        />
      ) : viewMode === "empty" ? (
        <AdminEmptyState
          icon={FileQuestion}
          title="Basis Pengetahuan Kosong"
          description="Belum ada artikel atau aturan pengetahuan bandara yang terdaftar dalam sistem."
          actionText="Kembali ke Mode Data"
          onAction={() => setViewMode("data")}
        />
      ) : (
        /* NORMAL DATA VIEW */
        <div className="space-y-6">
          <AdminFilterBar categories={categories} category={selectedCategory} onCategoryChange={setSelectedCategory} onQueryChange={setSearchQuery} onReset={handleResetFilters} onStatusChange={setSelectedStatus} placeholder="Cari judul artikel, regulasi, tag (contoh: check-in, bagasi)..." query={searchQuery} statuses={statuses} status={selectedStatus} />

          {/* Cards Grid */}
          {filteredItems.length === 0 ? (
            <AdminEmptyState
              title="Artikel Knowledge Base Tidak Ditemukan"
              description="Tidak ada dokumen pengetahuan bandara yang cocok dengan kriteria pencarian Anda."
              actionText="Reset Pencarian & Filter"
              onAction={handleResetFilters}
            />
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400 px-1 font-mono">
                <span>Menampilkan {filteredItems.length} dokumen pengetahuan AI</span>
                <span>Klik kartu untuk melihat detail instruksi AI</span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {filteredItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={(event) => { lastTriggerRef.current = event.currentTarget; setActiveItem(item); }}
                    className="glass-panel glass-panel-hover w-full text-left rounded-2xl p-5 border border-white/10 shadow-xl flex flex-col justify-between cursor-pointer transition-all hover:border-cyan-400/40 group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-400/30 text-[11px] font-mono font-medium">
                            {item.category}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">
                            {item.id}
                          </span>
                        </div>

                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold border ${
                            item.status === "Aktif"
                              ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                              : "bg-slate-700/40 text-slate-400 border-slate-600/40"
                          }`}
                        >
                          <span
                            className={`size-1.5 rounded-full ${
                              item.status === "Aktif"
                                ? "bg-emerald-400"
                                : "bg-slate-500"
                            }`}
                          />
                          {item.status}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-base text-white mt-3 group-hover:text-cyan-300 transition">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-xs text-slate-300 line-clamp-3 leading-relaxed">
                        {item.summary}
                      </p>

                      {/* Tags */}
                      <div className="mt-3.5 flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] text-slate-400"
                          >
                            <Tag className="size-2.5 text-cyan-400/80" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                      <div className="flex items-center gap-1 text-slate-400">
                        <Calendar className="size-3 text-slate-500" />
                        <span>Update: {item.updatedAt}</span>
                      </div>

                      <div className="flex items-center gap-1 text-cyan-400 font-medium group-hover:underline">
                        <Eye className="size-3" />
                        <span>Lihat Dokumen</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Detail Modal */}
      {activeItem && (
        <AdminDetailDialog labelledBy="knowledge-dialog-title" onClose={() => setActiveItem(null)} returnFocusRef={lastTriggerRef}>
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-400/30 text-xs font-mono">
                    {activeItem.category}
                  </span>
                  <span className="font-mono text-xs text-slate-400">
                    {activeItem.id}
                  </span>
                </div>
                <h3 id="knowledge-dialog-title" className="font-display text-lg font-bold text-white mt-1.5">
                  {activeItem.title}
                </h3>
              </div>

            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar my-4 space-y-4 pr-2 text-sm text-slate-200">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-1">
                  Ringkasan Panduan
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3.5 rounded-xl border border-white/10">
                  {activeItem.summary}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-1">
                  Konten Instruksi Sistem AI (Prompt Context)
                </h4>
                <div className="text-xs text-slate-200 leading-relaxed bg-slate-950/80 p-4 rounded-xl border border-cyan-500/20 whitespace-pre-wrap font-sans">
                  {activeItem.content}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-1.5">
                  Kata Kunci Relevansi (RAG Tags)
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeItem.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-cyan-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-slate-400">
                <div>
                  <span className="block text-slate-500">Penulis / Unit:</span>
                  <span className="text-white font-medium">{activeItem.author}</span>
                </div>
                <div>
                  <span className="block text-slate-500">Terakhir Diperbarui:</span>
                  <span className="text-white font-medium">{activeItem.updatedAt}</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono">
                Status: <strong className="text-emerald-400">{activeItem.status}</strong>
              </span>
              <button
                type="button"
                onClick={() => setActiveItem(null)}
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
