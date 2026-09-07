export interface DashboardStats {
  totalConversations: number;
  conversationsChange: string;
  answeredRate: string;
  answeredDetail: string;
  satisfactionScore: string;
  satisfactionDetail: string;
  avgResponseTime: string;
  responseTimeDetail: string;
}

export interface TopicDistribution {
  topic: string;
  percentage: number;
  count: number;
  color: string;
}

export interface ActivityLog {
  id: string;
  time: string;
  passenger: string;
  channel: "Kiosk Terminal" | "Mobile Web" | "QR Boarding";
  topic: string;
  status: "Selesai" | "Ditangani Staf" | "Eskalasi";
  sentiment: "Positif" | "Netral" | "Perlu Perhatian";
  query: string;
}

export interface ConversationItem {
  id: string;
  sessionId: string;
  timestamp: string;
  passengerName: string;
  channel: "Kiosk Terminal 1" | "Mobile Web" | "QR Boarding Pass" | "Lounge Info Stand";
  category: "Penerbangan" | "Fasilitas" | "Bagasi" | "Transportasi" | "Umum";
  status: "Selesai" | "Ditangani Staf" | "Eskalasi";
  sentiment: "Positif" | "Netral" | "Perlu Perhatian";
  flightRef?: string;
  duration: string;
  messagesCount: number;
  previewQuery: string;
  previewAnswer: string;
  fullTranscript: Array<{
    sender: "user" | "bot" | "system";
    text: string;
    time: string;
  }>;
}

export interface KnowledgeItem {
  id: string;
  title: string;
  category: "Gate & Terminal" | "Bagasi & Check-in" | "Fasilitas & Lounge" | "Transportasi Bandara" | "Darurat & Medis";
  summary: string;
  content: string;
  tags: string[];
  status: "Aktif" | "Draft";
  updatedAt: string;
  author: string;
  usageCount: number;
}

export const ADMIN_STATS_DATA: DashboardStats = {
  totalConversations: 1248,
  conversationsChange: "+14.2% minggu ini",
  answeredRate: "98.6%",
  answeredDetail: "Respon otomatis instan",
  satisfactionScore: "4.88 / 5.0",
  satisfactionDetail: "Berdasarkan 850 rating",
  avgResponseTime: "0.85 detik",
  responseTimeDetail: "Model LLM Edge Gateway",
};

export const ADMIN_TOPIC_DISTRIBUTION: TopicDistribution[] = [
  { topic: "Jadwal & Gate Penerbangan", percentage: 42, count: 524, color: "bg-cyan-400" },
  { topic: "Lokasi Fasilitas & Kuliner", percentage: 26, count: 324, color: "bg-blue-500" },
  { topic: "Layanan & Klaim Bagasi", percentage: 18, count: 225, color: "bg-emerald-400" },
  { topic: "Transportasi & Taksi Bandara", percentage: 14, count: 175, color: "bg-amber-400" },
];

export const ADMIN_RECENT_LOGS: ActivityLog[] = [
  {
    id: "LOG-8821",
    time: "2 menit lalu",
    passenger: "Penumpang GA-607",
    channel: "Mobile Web",
    topic: "Jadwal Penerbangan",
    status: "Selesai",
    sentiment: "Positif",
    query: "Gate keberangkatan Garuda GA-607 ke Jakarta di mana ya?",
  },
  {
    id: "LOG-8820",
    time: "6 menit lalu",
    passenger: "Tamu Kiosk Gate 2",
    channel: "Kiosk Terminal",
    topic: "Fasilitas Bandara",
    status: "Selesai",
    sentiment: "Positif",
    query: "Lokasi Concordia Lounge dan apakah menerima kartu prioritas?",
  },
  {
    id: "LOG-8819",
    time: "12 menit lalu",
    passenger: "Penumpang JT-774",
    channel: "QR Boarding",
    topic: "Layanan Bagasi",
    status: "Ditangani Staf",
    sentiment: "Perlu Perhatian",
    query: "Bagasi penerbangan JT-774 dari Makassar belum keluar di Carousel 2",
  },
  {
    id: "LOG-8818",
    time: "18 menit lalu",
    passenger: "Pengunjung Kedatangan",
    channel: "Mobile Web",
    topic: "Transportasi Bandara",
    status: "Selesai",
    sentiment: "Netral",
    query: "Tarif taksi resmi bandara ke pusat kota Manado berapa?",
  },
  {
    id: "LOG-8817",
    time: "25 menit lalu",
    passenger: "Penumpang ID-6271",
    channel: "Mobile Web",
    topic: "Jadwal Penerbangan",
    status: "Selesai",
    sentiment: "Netral",
    query: "Batik Air ID-6271 delay berapa lama?",
  },
];

export const ADMIN_CONVERSATIONS_DATA: ConversationItem[] = [
  {
    id: "conv-01",
    sessionId: "MDC-SES-9941",
    timestamp: "10:42 WITA · Hari ini",
    passengerName: "Penumpang GA 607",
    channel: "Mobile Web",
    category: "Penerbangan",
    status: "Selesai",
    sentiment: "Positif",
    flightRef: "GA 607 (CGK)",
    duration: "1m 15s",
    messagesCount: 4,
    previewQuery: "Gate keberangkatan Garuda GA-607 ke Jakarta di mana ya?",
    previewAnswer: "Penerbangan Garuda Indonesia GA 607 menuju Jakarta (CGK) dijadwalkan pukul 07:00 melalui Gate 3. Status saat ini: Boarding.",
    fullTranscript: [
      { sender: "user", text: "Halo, gate keberangkatan Garuda GA-607 ke Jakarta di mana ya?", time: "10:42:05" },
      { sender: "bot", text: "Halo! Penerbangan Garuda Indonesia GA 607 tujuan Jakarta (CGK) berangkat dari Gate 3, Lantai 2 Terminal Keberangkatan. Status saat ini Boarding.", time: "10:42:06" },
      { sender: "user", text: "Apakah sudah panggilan terakhir?", time: "10:42:40" },
      { sender: "bot", text: "Saat ini masih panggilan umum boarding pertama. Silakan segera menuju Gate 3 untuk proses pemeriksaan boarding pass.", time: "10:42:41" },
    ],
  },
  {
    id: "conv-02",
    sessionId: "MDC-SES-9940",
    timestamp: "10:35 WITA · Hari ini",
    passengerName: "Tamu Terminal Gate 2",
    channel: "Kiosk Terminal 1",
    category: "Fasilitas",
    status: "Selesai",
    sentiment: "Positif",
    duration: "48s",
    messagesCount: 2,
    previewQuery: "Dimana lokasi Concordia Lounge dan apakah buka sekarang?",
    previewAnswer: "Concordia Lounge terletak di Lantai 2 Area Keberangkatan Domestik, tepat di dekat Gate 2. Buka setiap hari 05:00 - 21:00 WITA.",
    fullTranscript: [
      { sender: "user", text: "Dimana lokasi Concordia Lounge dan apakah buka sekarang?", time: "10:35:10" },
      { sender: "bot", text: "Concordia Lounge terletak di Lantai 2 Area Keberangkatan Domestik, tepat di dekat Gate 2. Buka setiap hari pukul 05:00 - 21:00 WITA dan menerima kartu akses lounge serta pembayaran langsung.", time: "10:35:11" },
    ],
  },
  {
    id: "conv-03",
    sessionId: "MDC-SES-9939",
    timestamp: "10:18 WITA · Hari ini",
    passengerName: "Penumpang JT 774",
    channel: "QR Boarding Pass",
    category: "Bagasi",
    status: "Ditangani Staf",
    sentiment: "Perlu Perhatian",
    flightRef: "JT 774 (UPG)",
    duration: "3m 40s",
    messagesCount: 6,
    previewQuery: "Bagasi saya belum keluar di carousel padahal sudah 30 menit",
    previewAnswer: "Informasi penanganan bagasi JT 774 telah kami teruskan ke petugas Ground Handling Lion Air di Lost & Found Kedatangan.",
    fullTranscript: [
      { sender: "user", text: "Bagasi saya belum keluar di carousel padahal sudah 30 menit dari mendarat", time: "10:18:02" },
      { sender: "bot", text: "Mohon maaf atas ketidaknyamanannya. Untuk penerbangan Lion Air JT 774 dari Makassar, bongkar muat bagasi dialokasikan di Carousel 2. Tim ground handling sedang menyelesaikan pembongkaran kontainer terakhir.", time: "10:18:03" },
      { sender: "user", text: "Bisa panggilkan staf di area baggage claim?", time: "10:19:15" },
      { sender: "bot", text: "Tentu. Kami telah meneruskan notifikasi bantuan ke meja Lost & Found Lion Air di samping Carousel 2. Petugas kami atas nama Bpk. Ronald sedang menuju lokasi Anda.", time: "10:19:17" },
    ],
  },
  {
    id: "conv-04",
    sessionId: "MDC-SES-9938",
    timestamp: "09:55 WITA · Hari ini",
    passengerName: "Pengunjung Kedatangan",
    channel: "Lounge Info Stand",
    category: "Transportasi",
    status: "Selesai",
    sentiment: "Netral",
    duration: "1m 02s",
    messagesCount: 4,
    previewQuery: "Pilihan taksi resmi dan tarif ke arah Malalayang berapa ya?",
    previewAnswer: "Tersedia Taksi Bluebird, Kokapura, dan DAMRI. Tarif argo resmi ke Malalayang berkisar antara Rp 90.000 - Rp 120.000.",
    fullTranscript: [
      { sender: "user", text: "Pilihan taksi resmi dan tarif ke arah Malalayang berapa ya?", time: "09:55:00" },
      { sender: "bot", text: "Di Bandara Sam Ratulangi (MDC) tersedia taksi resmi bandara (Kokapura & Bluebird) serta Bus DAMRI. Untuk tujuan Malalayang, estimasi argo sekitar Rp 90.000 - Rp 120.000.", time: "09:55:01" },
      { sender: "user", text: "Lokasi konter taksinya di mana?", time: "09:55:35" },
      { sender: "bot", text: "Konter pemesanan taksi resmi berada di area luar pintu keluar Terminal Kedatangan, tepat di sebelah kiri shelter Bus DAMRI.", time: "09:55:36" },
    ],
  },
  {
    id: "conv-05",
    sessionId: "MDC-SES-9937",
    timestamp: "09:20 WITA · Hari ini",
    passengerName: "Penumpang ID 6271",
    channel: "Mobile Web",
    category: "Penerbangan",
    status: "Eskalasi",
    sentiment: "Perlu Perhatian",
    flightRef: "ID 6271 (SUB)",
    duration: "2m 10s",
    messagesCount: 5,
    previewQuery: "Batik Air ID 6271 delay, apakah ada kompensasi snack/makan?",
    previewAnswer: "Penerbangan tertunda 45 menit. Sesuai PM 89/2015, kompensasi minuman/makanan ringan dapat diambil di Gate 2.",
    fullTranscript: [
      { sender: "user", text: "Batik Air ID 6271 delay, apakah ada kompensasi snack/makan?", time: "09:20:10" },
      { sender: "bot", text: "Penerbangan Batik Air ID 6271 tujuan Surabaya mengalami penundaan dari jadwal 09:00 menjadi 09:45 WITA (keterlambatan 45 menit). Berdasarkan regulasi PM 89/2015 Kategori 1, penumpang berhak atas minuman ringan.", time: "09:20:12" },
      { sender: "user", text: "Di mana saya bisa klaim kompensasi ini?", time: "09:21:00" },
      { sender: "bot", text: "Distribusi refreshment disediakan langsung oleh staf Batik Air di meja pemeriksaan Gate 2. Silakan tunjukkan boarding pass Anda.", time: "09:21:02" },
    ],
  },
];

export const ADMIN_KNOWLEDGE_DATA: KnowledgeItem[] = [
  {
    id: "KB-MDC-01",
    title: "Alur Check-in & Keberangkatan Domestik",
    category: "Gate & Terminal",
    summary: "Panduan batas waktu check-in konter fisik (2 jam sebelum keberangkatan), security check point 1 & 2, dan gate boarding 1–4.",
    content: "Konter check-in domestik dibuka 2 jam sebelum jadwal keberangkatan dan ditutup 45 menit sebelum boarding. Pemeriksaan keamanan SCP 1 berada di pintu masuk lobi keberangkatan dan SCP 2 di area steril sebelum ruang tunggu Gate 1–4.",
    tags: ["Check-in", "Security", "Gate 1-4", "Keberangkatan"],
    status: "Aktif",
    updatedAt: "18 Agu 2026",
    author: "Terminal Ops",
    usageCount: 1420,
  },
  {
    id: "KB-MDC-02",
    title: "Kebijakan Bagasi Kabin & Bagasi Tercatat",
    category: "Bagasi & Check-in",
    summary: "Aturan berat maksimum bagasi kabin 7kg, pembatasan cairan (LAGs) max 100ml, dan alur pengambilan bagasi di Carousel 1 & 2.",
    content: "Setiap penumpang diizinkan membawa 1 tas jinjing kabin maks 7 kg. Cairan, aerosol, dan gel (LAGs) untuk penerbangan dibatasi 100ml per kemasan. Pengambilan bagasi kedatangan berada di Lantai 1 dengan Carousel 1 (GA/ID) dan Carousel 2 (JT/IU).",
    tags: ["Bagasi", "Kabin", "Carousel", "Lost & Found"],
    status: "Aktif",
    updatedAt: "15 Agu 2026",
    author: "Ground Handling",
    usageCount: 980,
  },
  {
    id: "KB-MDC-03",
    title: "Lokasi Concordia Lounge & Fasilitas Difabel",
    category: "Fasilitas & Lounge",
    summary: "Fasilitas ruang tunggu VIP, nursery room, musholla lantai 1 & 2, serta layanan kursi roda khusus difabel.",
    content: "Concordia Lounge berada di Lantai 2 dekat Gate 2. Nursery room tersedia di area tunggu keberangkatan dan kedatangan. Kursi roda dan pendamping khusus difabel dapat diminta langsung di konter customer service lobi utama.",
    tags: ["Lounge", "VIP", "Difabel", "Musholla", "Nursery"],
    status: "Aktif",
    updatedAt: "12 Agu 2026",
    author: "Customer Experience",
    usageCount: 650,
  },
  {
    id: "KB-MDC-04",
    title: "Transportasi Resmi: Taksi Bandara & Bus DAMRI",
    category: "Transportasi Bandara",
    summary: "Daftar operator taksi terverifikasi (Bluebird & Kokapura), rute Bus DAMRI ke Pusat Kota Manado dan Pelabuhan Bitung.",
    content: "Layanan taksi resmi bandara menggunakan argo meter tersedia di shelter kedatangan luar. Bus DAMRI beroperasi mulai pukul 06:00 hingga 20:00 WITA dengan rute Bandara - Pasar 45 Manado (Rp 25.000) dan Bandara - Bitung (Rp 40.000).",
    tags: ["Taksi", "DAMRI", "Tarif", "Shelter"],
    status: "Aktif",
    updatedAt: "10 Agu 2026",
    author: "Landside Transport",
    usageCount: 890,
  },
  {
    id: "KB-MDC-05",
    title: "Protokol Darurat Medis & Posko Kesehatan",
    category: "Darurat & Medis",
    summary: "Lokasi Kantor Kesehatan Pelabuhan (KKP), ketersediaan AED defibrillator, dan nomor kontak gawat darurat bandara.",
    content: "Posko Kesehatan KKP terletak di Lantai 1 Sayap Kiri Terminal Kedatangan, siap siaga 24 jam dengan fasilitas ambulans. Unit AED (Automated External Defibrillator) terpasang di dekat Gate 2 dan lobi kedatangan.",
    tags: ["Medis", "Darurat", "KKP", "Ambulans", "AED"],
    status: "Aktif",
    updatedAt: "05 Agu 2026",
    author: "Airport Safety",
    usageCount: 230,
  },
  {
    id: "KB-MDC-06",
    title: "Gerai Oleh-Oleh Khas Manado & Komersial",
    category: "Fasilitas & Lounge",
    summary: "Daftar tenant makanan khas (Klappertaart, Cakalang Fufu) dan jam operasional tenant di area keberangkatan.",
    content: "Pusat oleh-oleh khas Manado (Klappertaart, Kue Bagea, Cakalang Fufu kemasan vakum) berada di koridor komersial sebelum Gate 1. Jam operasional tenant mengikuti jadwal penerbangan pertama hingga terakhir.",
    tags: ["Kuliner", "Oleh-oleh", "Klappertaart", "Tenant"],
    status: "Draft",
    updatedAt: "02 Agu 2026",
    author: "Commercial Dept",
    usageCount: 110,
  },
];
