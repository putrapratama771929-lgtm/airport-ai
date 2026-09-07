import { describe, expect, it } from "vitest";
import { FLIGHTS } from "./airport-config";

describe("FLIGHTS", () => {
  it("normalizes a departure while retaining its gate and schedule", () => {
    expect(FLIGHTS.find((flight) => flight.code === "GA 607")).toMatchObject({
      kind: "departure",
      route: "Jakarta (CGK)",
      locationLabel: "Gate",
      location: "Gate 3",
      time: "07:00",
    });
  });

  it("normalizes an arrival while retaining its carousel and schedule", () => {
    expect(FLIGHTS.find((flight) => flight.code === "GA 606")).toMatchObject({
      kind: "arrival",
      route: "Jakarta (CGK)",
      locationLabel: "Belt",
      location: "Carousel 1",
      time: "06:40",
    });
  });
});
