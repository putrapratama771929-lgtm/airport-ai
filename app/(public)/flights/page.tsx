import { Suspense } from "react";
import { FlightDashboard } from "@/components/flights/flight-dashboard";

export default function FlightsPage() {
  return (
    <Suspense fallback={<div className="flex-1 p-8 text-sm text-slate-400">Memuat jadwal penerbangan…</div>}>
      <FlightDashboard />
    </Suspense>
  );
}
