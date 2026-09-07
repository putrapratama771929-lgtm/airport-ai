export const AIRPORT_CONFIG = {
  name: "Bandara Internasional Sam Ratulangi",
  shortName: "Bandara Sam Ratulangi",
  brandName: "Asisten Bandara Sam Ratulangi",
  code: "MDC",
  city: "Manado",
  province: "Sulawesi Utara",
  tagline: "Navigasi perjalanan Anda di Manado lebih cerdas dan mudah.",
  description: "Asisten resmi informasi penerbangan, peta terminal, dan fasilitas Bandara Internasional Sam Ratulangi (MDC) Manado.",
  currentYear: 2026,
  terminals: ["Terminal Keberangkatan", "Terminal Kedatangan", "Area Komersial"],
} as const;

export type FlightStatus = "Boarding" | "Tepat waktu" | "Tertunda" | "Mendarat";

export interface Flight {
  code: string;
  time: string;
  oldTime?: string;
  route: string;
  kind: "departure" | "arrival";
  locationLabel: "Gate" | "Belt";
  location: string;
  status: FlightStatus;
}

export const FLIGHTS: Flight[] = [
  { code: "GA 607", time: "07:00", route: "Jakarta (CGK)", kind: "departure", locationLabel: "Gate", location: "Gate 3", status: "Boarding" },
  { code: "JT 775", time: "08:30", route: "Makassar (UPG)", kind: "departure", locationLabel: "Gate", location: "Gate 1", status: "Tepat waktu" },
  { code: "ID 6271", time: "09:45", oldTime: "09:00", route: "Surabaya (SUB)", kind: "departure", locationLabel: "Gate", location: "Gate 2", status: "Tertunda" },
  { code: "TR 217", time: "11:15", route: "Singapura (SIN)", kind: "departure", locationLabel: "Gate", location: "Gate 4", status: "Tepat waktu" },
  { code: "IU 782", time: "13:20", route: "Denpasar (DPS)", kind: "departure", locationLabel: "Gate", location: "Gate 2", status: "Tepat waktu" },
  { code: "GA 606", time: "06:40", route: "Jakarta (CGK)", kind: "arrival", locationLabel: "Belt", location: "Carousel 1", status: "Mendarat" },
  { code: "JT 774", time: "08:05", route: "Makassar (UPG)", kind: "arrival", locationLabel: "Belt", location: "Carousel 2", status: "Tepat waktu" },
  { code: "ID 6270", time: "10:20", oldTime: "09:55", route: "Surabaya (SUB)", kind: "arrival", locationLabel: "Belt", location: "Carousel 1", status: "Tertunda" },
  { code: "IU 781", time: "12:50", route: "Denpasar (DPS)", kind: "arrival", locationLabel: "Belt", location: "Carousel 2", status: "Tepat waktu" },
];

export const BAGGAGE_CAROUSELS = [
  { id: "1", name: "Carousel 1", flights: "GA 606, ID 6270", status: "Beroperasi" },
  { id: "2", name: "Carousel 2", flights: "JT 774, IU 781", status: "Beroperasi" },
];

export const BAGGAGE_ALLOWANCES = [
  { cabin: "Domestik ekonomi", cabinKg: "7 kg", checkedKg: "20 kg" },
  { cabin: "Internasional ekonomi", cabinKg: "7 kg", checkedKg: "30 kg" },
];

export const PARKING_RATES = [
  { type: "Motor", hourly: "Rp 2.000 / jam", daily: "Rp 15.000 / 24 jam" },
  { type: "Mobil", hourly: "Rp 5.000 / jam", daily: "Rp 40.000 / 24 jam" },
];

export const QUICK_PROMPTS = [
  "Gate penerbangan saya di mana?",
  "Apakah penerbangan ke Jakarta terlambat?",
  "Cari oleh-oleh khas Manado di terminal",
  "Di mana lokasi Concordia Lounge?",
];
