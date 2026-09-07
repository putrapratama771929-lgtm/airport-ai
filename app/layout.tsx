import type { Metadata } from "next";
import "./globals.css";
import { AIRPORT_CONFIG } from "@/lib/airport-config";
import { LiquidGlassFilterDefs } from "@/components/ui/liquid-glass";

export const metadata: Metadata = {
  title: `${AIRPORT_CONFIG.brandName} | ${AIRPORT_CONFIG.name} (${AIRPORT_CONFIG.code})`,
  description: AIRPORT_CONFIG.description,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className="h-full antialiased dark">
      <body className="min-h-full bg-[#0A0F1C] text-white font-sans overflow-x-hidden">
        <LiquidGlassFilterDefs />
        {children}
      </body>
    </html>
  );
}
