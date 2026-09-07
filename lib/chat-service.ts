import { AIRPORT_CONFIG } from "./airport-config";

export interface ChatReply {
  text: string;
  source: "demo";
}

export function getDemoReply(userText: string): ChatReply {
  const normalizedText = userText.toLocaleLowerCase("id-ID");

  if (/(jakarta|ga 607|penerbangan|flight|gate)/.test(normalizedText)) {
    return { source: "demo", text: "Penerbangan Garuda Indonesia GA 607 menuju Jakarta (CGK) dijadwalkan pukul 07:00 WITA melalui Gate 3. Status saat ini: Boarding. Silakan menuju lantai 2 area keberangkatan." };
  }
  if (/(lounge|concordia)/.test(normalizedText)) {
    return { source: "demo", text: "Concordia Executive Lounge terletak di Lantai 2 area ruang tunggu keberangkatan, tepat di dekat Gate 2 & 3. Tersedia Wi-Fi cepat, hidangan prasmanan, dan ruang istirahat." };
  }
  if (/(oleh-oleh|makan|kuliner|klappertaart)/.test(normalizedText)) {
    return { source: "demo", text: "Tersedia gerai Klappertaart & Souvenir Khas Manado di Lantai 2 area keberangkatan dan Lantai 1 area publik. Estimasi waktu tempuh dari posisi Anda adalah 3 menit." };
  }
  if (/(bagasi|baggage|hilang)/.test(normalizedText)) {
    return { source: "demo", text: "Untuk layanan bagasi dan klaim barang tertinggal, counter Lost & Found Bandara Sam Ratulangi terletak di area Kedatangan Lantai 1. Anda juga dapat menggunakan menu Layanan Bagasi kami." };
  }

  return {
    source: "demo",
    text: `Terima kasih. Mengenai “${userText}”, saya masih memakai data contoh ${AIRPORT_CONFIG.code}. Coba tanyakan gate, lounge, oleh-oleh, atau bagasi — atau buka menu di atas.`,
  };
}
