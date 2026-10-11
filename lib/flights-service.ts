import type { Flight } from "./airport-config";

const flightStatuses = ["Boarding", "Tepat waktu", "Tertunda", "Mendarat"];

function isFlight(value: unknown): value is Flight {
  if (typeof value !== "object" || value === null) return false;

  const flight = value as Record<string, unknown>;
  return (
    typeof flight.code === "string" &&
    typeof flight.time === "string" &&
    (flight.oldTime === undefined || typeof flight.oldTime === "string") &&
    typeof flight.route === "string" &&
    (flight.kind === "departure" || flight.kind === "arrival") &&
    (flight.locationLabel === "Gate" || flight.locationLabel === "Belt") &&
    typeof flight.location === "string" &&
    typeof flight.status === "string" &&
    flightStatuses.includes(flight.status)
  );
}

export async function getFlights(signal?: AbortSignal): Promise<Flight[]> {
  const response = await fetch("/api/flights", { cache: "no-store", signal });
  if (!response.ok) {
    throw new Error(`Gagal memuat jadwal penerbangan (HTTP ${response.status}).`);
  }

  const payload: unknown = await response.json();
  if (
    typeof payload !== "object" ||
    payload === null ||
    !("source" in payload) ||
    payload.source !== "demo" ||
    !("flights" in payload) ||
    !Array.isArray(payload.flights) ||
    !payload.flights.every(isFlight)
  ) {
    throw new Error("Format data jadwal penerbangan tidak valid.");
  }

  return payload.flights;
}
