# Laporan Pengembangan Frontend Airport AI

## 1. Ringkasan Proyek

Airport AI adalah antarmuka web informasi Bandara Internasional Sam Ratulangi (MDC), Manado. Aplikasi ini membantu penumpang menemukan informasi penerbangan, fasilitas terminal, transportasi, layanan bagasi, FAQ, dan bantuan percakapan berbasis AI dalam bentuk demonstrasi.

Versi saat ini berfokus pada frontend. Seluruh jadwal, respons chat, knowledge base, dan data administratif masih memakai data contoh lokal sehingga tidak boleh dipakai sebagai sumber informasi operasional bandara.

## 2. Tujuan

- Menyediakan navigasi informasi bandara yang cepat dan mudah dipahami.
- Menampilkan desain dark-glass yang konsisten pada web publik dan dashboard admin.
- Menyediakan prototype dashboard untuk mengelola knowledge base dan meninjau log percakapan.
- Menyiapkan struktur UI agar dapat dihubungkan ke backend pada tahap berikutnya.

## 3. Teknologi

| Teknologi | Peran |
|---|---|
| Next.js 16 App Router | Kerangka aplikasi, routing, dan build produksi |
| React 19 | Komponen dan state interaktif |
| TypeScript | Keamanan tipe dan kontrak data |
| Tailwind CSS 4 | Styling responsif dan sistem desain |
| Lucide React | Ikon antarmuka |
| Vitest | Pengujian unit untuk logika murni |

## 4. Struktur Frontend

```text
app/
  (public)/             Halaman untuk penumpang
  admin/                Halaman dashboard administrasi
components/
  admin/                Filter, dialog detail, state visual admin
  chat/                 Antarmuka percakapan
  flights/              Jadwal dan kartu penerbangan
  facilities/           Panduan fasilitas dan denah terminal
  transport/            Informasi moda transportasi
  baggage/              Layanan pelaporan dan pelacakan bagasi
  layout/               Shell navigasi aplikasi
  ui/                   Komponen UI reusable
lib/
  airport-config.ts     Konfigurasi bandara dan data demo
  admin-data.ts         Data contoh dashboard admin
  chat-service.ts       Logika balasan chat demo
  list-filters.ts       Utilitas filter daftar
```

## 5. Fitur Utama

### Halaman publik

- Beranda dengan quick actions dan CTA.
- Chat assistant berbasis respons demo untuk informasi gate, lounge, bagasi, dan fasilitas.
- Daftar keberangkatan/kedatangan dengan pencarian berbasis nomor penerbangan, rute, atau lokasi.
- Panduan fasilitas dengan kategori, pencarian, dan denah terminal skematis.
- Panduan transportasi DAMRI, taksi, shelter, dan parkir.
- Layanan pelaporan serta pelacakan bagasi berbasis data contoh.
- FAQ dan navigasi responsif untuk desktop maupun perangkat mobile.

### Dashboard admin

- Tampilan metrik dan tabel data contoh.
- Log percakapan dengan pencarian, kategori, status, serta detail transkrip.
- Knowledge base dengan pencarian, filter kategori/status, dan detail artikel.
- Mode demonstrasi loading, error, empty, dan data untuk validasi keadaan UI.

## 6. Refactor dan Clean Code

Refactor dilakukan untuk mengurangi duplikasi dan memperjelas tanggung jawab komponen.

- `AdminFilterBar` digunakan bersama oleh daftar percakapan dan knowledge base.
- `AdminDetailDialog` menyatukan perilaku modal pada dashboard admin.
- `filter-state.ts` menyimpan nilai default filter dan pemeriksaan filter aktif yang dapat diuji.
- Abstraksi pass-through `syncSearchQuery` dihapus; state pencarian penerbangan diinisialisasi langsung dari query URL.
- Implementasi balasan chat lama yang dikomentari dihapus; `lib/chat-service.ts` menjadi satu sumber logika respons demo.
- Ketergantungan font Google pada waktu build dihapus agar build produksi dapat berjalan pada lingkungan tanpa internet.

## 7. Aksesibilitas dan UX

- Kartu admin yang membuka detail kini menggunakan elemen `button`, sehingga dapat diakses dengan keyboard.
- Dialog detail mendukung tombol Escape, klik di luar dialog, dan fokus awal pada tombol tutup.
- Fokus keyboard dibatasi di dalam dialog dengan Tab/Shift+Tab lalu dikembalikan ke kartu pemicu saat dialog ditutup.
- Input pencarian dan filter memiliki label yang dapat dibaca screen reader.
- Tombol icon memiliki `aria-label` pada aksi yang tidak memiliki teks visual.

## 8. Pengujian dan Verifikasi

Perintah verifikasi yang dijalankan setelah refactor:

```bash
pnpm lint
pnpm test
pnpm build
```

Hasil terakhir:

- ESLint: berhasil tanpa error.
- Vitest: 5 file test dan 10 test berhasil.
- Next.js production build: berhasil; 14 route diprerender sebagai konten statis.

## 9. Batasan Saat Ini

- Tidak ada autentikasi pengguna maupun admin.
- Tidak ada database; seluruh data berada dalam file TypeScript lokal.
- Chat belum menggunakan model AI, retrieval knowledge base, atau penyimpanan percakapan nyata.
- Jadwal penerbangan, status bagasi, fasilitas, dan tarif tidak terhubung dengan sumber operasional bandara.
- Aksi laporan bagasi dan pengelolaan knowledge base masih bersifat simulasi UI.

## 10. Rencana Pengembangan Berikutnya

Ketika backend siap, tahap yang disarankan adalah:

1. Menambahkan database PostgreSQL dan model data penerbangan, artikel knowledge, percakapan, serta laporan bagasi.
2. Menambahkan autentikasi dan role-based access untuk dashboard admin.
3. Menghubungkan dashboard admin ke Server Actions untuk perubahan data internal.
4. Membuat Route Handler untuk chat, integrasi jadwal penerbangan, dan webhook pihak ketiga.
5. Menambahkan audit log, validasi input, rate limiting, dan monitoring.

## 11. Kesimpulan

Frontend Airport AI telah menyediakan prototype antarmuka bandara yang responsif, modular, dan siap dikembangkan. Refactor terbaru mengurangi duplikasi pada halaman admin, meningkatkan aksesibilitas dialog dan kartu interaktif, serta memastikan lint, test, dan build produksi berjalan dengan baik. Tahap berikutnya adalah mengganti data demo dengan layanan backend yang aman dan terintegrasi.
