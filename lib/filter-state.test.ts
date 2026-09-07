import { describe, expect, it } from "vitest";
import { createDefaultFilters, hasActiveFilters } from "./filter-state";

describe("createDefaultFilters", () => {
  it("resets every list filter to its neutral value", () => {
    expect(createDefaultFilters()).toEqual({
      query: "",
      category: "Semua",
      status: "Semua",
    });
  });
});

describe("hasActiveFilters", () => {
  it("treats whitespace-only queries and Semua selections as inactive", () => {
    expect(hasActiveFilters({ query: "  ", category: "Semua", status: "Semua" })).toBe(false);
  });

  it("recognizes any non-default query, category, or status", () => {
    expect(hasActiveFilters({ query: "gate", category: "Semua", status: "Semua" })).toBe(true);
    expect(hasActiveFilters({ query: "", category: "Bagasi", status: "Semua" })).toBe(true);
    expect(hasActiveFilters({ query: "", category: "Semua", status: "Eskalasi" })).toBe(true);
  });
});
