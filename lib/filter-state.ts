export interface ListFilters {
  query: string;
  category: string;
  status: string;
}

export function createDefaultFilters(): ListFilters {
  return { query: "", category: "Semua", status: "Semua" };
}

export function hasActiveFilters({ query, category, status }: ListFilters): boolean {
  return query.trim().length > 0 || category !== "Semua" || status !== "Semua";
}
