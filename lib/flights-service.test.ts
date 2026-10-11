import { afterEach, describe, expect, it, vi } from "vitest";
import { getFlights } from "./flights-service";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("getFlights", () => {
  it("returns valid demo flights from the API", async () => {
    const flights = [{
      code: "GA 607",
      time: "07:00",
      route: "Jakarta (CGK)",
      kind: "departure",
      locationLabel: "Gate",
      location: "Gate 3",
      status: "Boarding",
    }];
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ source: "demo", flights }),
    }));

    await expect(getFlights()).resolves.toEqual(flights);
  });

  it("throws when the API responds with an error", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 503 }));

    await expect(getFlights()).rejects.toThrow("HTTP 503");
  });

  it("rejects malformed API data", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ source: "live", flights: [] }),
    }));

    await expect(getFlights()).rejects.toThrow("Format data jadwal");
  });
});
