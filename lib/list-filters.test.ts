import { describe, expect, it } from "vitest";
import { filterItems } from "./list-filters";

const conversations = [
  { id: "1", category: "Penerbangan", status: "Selesai", text: "Gate GA 607" },
  { id: "2", category: "Bagasi", status: "Eskalasi", text: "Bagasi belum tiba" },
];

describe("filterItems", () => {
  it("combines free-text, category, and status filters", () => {
    const result = filterItems({
      items: conversations,
      query: "bagasi",
      category: "Bagasi",
      status: "Eskalasi",
      matchesQuery: (item, query) => item.text.toLowerCase().includes(query),
      getCategory: (item) => item.category,
      getStatus: (item) => item.status,
    });

    expect(result).toEqual([conversations[1]]);
  });

  it("treats Semua as an unfiltered category or status", () => {
    const result = filterItems({
      items: conversations,
      query: "",
      category: "Semua",
      status: "Semua",
      matchesQuery: (item, query) => item.text.toLowerCase().includes(query),
      getCategory: (item) => item.category,
      getStatus: (item) => item.status,
    });

    expect(result).toEqual(conversations);
  });
});
