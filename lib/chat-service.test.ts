import { describe, expect, it } from "vitest";
import { getDemoReply } from "./chat-service";

describe("getDemoReply", () => {
  it("returns flight information for a GA 607 query", () => {
    expect(getDemoReply("Gate GA 607 di mana?")).toMatchObject({
      source: "demo",
      text: expect.stringContaining("Gate 3"),
    });
  });

  it("keeps an unknown query identifiable as demo data", () => {
    expect(getDemoReply("Apa cuaca di Manado?")).toEqual({
      source: "demo",
      text: expect.stringContaining("data contoh MDC"),
    });
  });
});
