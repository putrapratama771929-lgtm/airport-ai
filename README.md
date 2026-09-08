# Airport AI

Airport AI adalah prototype frontend untuk informasi Bandara Internasional Sam Ratulangi (MDC), Manado. Aplikasi menyediakan panduan penerbangan, fasilitas, transportasi, bagasi, FAQ, chat assistant demo, dan dashboard administrasi.

> Seluruh data penerbangan, tarif, knowledge base, dan respons chat saat ini adalah data demo—bukan data operasional bandara.

## Teknologi

- Next.js 16 dan React 19
- TypeScript dan Tailwind CSS 4
- Vitest dan ESLint

## Memulai

```bash
pnpm install
pnpm dev
```

Buka `http://localhost:3000` untuk antarmuka publik atau `http://localhost:3000/admin` untuk dashboard admin demo.

## Quality checks

```bash
pnpm lint
pnpm test
pnpm build
```

## Struktur penting

```text
app/          Routing halaman publik dan admin
components/   Komponen UI per fitur
lib/          Konfigurasi, data demo, serta utilitas domain
docs/         Laporan frontend dan dokumen refactor
```

## Dokumentasi

- [Laporan frontend](docs/laporan-frontend-airport-ai.md)
- [Desain refactor](docs/superpowers/specs/2026-09-07-clean-code-refactor-design.md)
