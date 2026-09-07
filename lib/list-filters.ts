export interface FilterItemsOptions<T> {
  items: readonly T[];
  query: string;
  category: string;
  status: string;
  matchesQuery: (item: T, normalizedQuery: string) => boolean;
  getCategory: (item: T) => string;
  getStatus: (item: T) => string;
}

export function filterItems<T>({
  items,
  query,
  category,
  status,
  matchesQuery,
  getCategory,
  getStatus,
}: FilterItemsOptions<T>): T[] {
  const normalizedQuery = query.trim().toLocaleLowerCase("id-ID");

  return items.filter((item) =>
    matchesQuery(item, normalizedQuery) &&
    (category === "Semua" || getCategory(item) === category) &&
    (status === "Semua" || getStatus(item) === status)
  );
}
